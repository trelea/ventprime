"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { Film, ImagePlus, Upload, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

export interface FileUploadLabels {
  title: string;
  subtitle: string;
  dropHint: string;
  constraintsHint: string;
  removeLabel: string;
  /** Aria-label / tooltip for the thumbnail button that opens the enlarged preview. */
  previewLabel?: string;
  /** Accessible label for the enlarged-preview close button. */
  closeLabel?: string;
  countBadge?: string;
}

export interface FileUploadProps {
  accept: string;
  multiple?: boolean;
  maxFiles?: number;
  maxFileSizeMB?: number;
  files: File[];
  onChange: (files: File[]) => void;
  onError?: (errorMessage: string | null) => void;
  variant?: "photo" | "video";
  labels: FileUploadLabels;
  errorMessages?: {
    maxFiles?: string;
    maxSize?: string;
    invalidType?: string;
  };
  className?: string;
}

/**
 * Local `blob:` URL for an in-memory `File`, created on mount and revoked
 * automatically when the file changes or the component unmounts.
 */
function useObjectUrl(file: File): string | null {
  const [objectUrl, setObjectUrl] = useState<string | null>(null);

  useEffect(() => {
    const url = URL.createObjectURL(file);
    // Storing the created resource in state is intentional: the blob URL is an
    // external resource that only exists after the effect runs, and re-rendering
    // with it is the whole point of this hook.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setObjectUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  return objectUrl;
}

function isImageFile(file: File): boolean {
  return file.type.startsWith("image/");
}

/**
 * Small square thumbnail for an uploaded image. Falls back to the generic
 * icon when the browser cannot decode the format (e.g. HEIC on Chrome).
 */
function FileThumbnail({ file }: { file: File }) {
  const objectUrl = useObjectUrl(file);
  const [failed, setFailed] = useState(false);

  if (!objectUrl || failed) {
    return (
      <ImagePlus
        className="text-muted-foreground size-4 shrink-0"
        strokeWidth={1.75}
      />
    );
  }

  return (
    // Blob previews cannot be routed through next/image — plain img is intentional.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={objectUrl}
      alt={file.name}
      onError={() => setFailed(true)}
      className="border-border size-10 shrink-0 rounded-[4px] border object-cover"
    />
  );
}

/** Enlarged image shown inside the preview dialog. */
function PreviewImage({ file }: { file: File }) {
  const objectUrl = useObjectUrl(file);
  const [failed, setFailed] = useState(false);

  if (!objectUrl || failed) {
    return (
      <p className="text-muted-foreground font-ui text-sm">{file.name}</p>
    );
  }

  return (
    // Blob previews cannot be routed through next/image — plain img is intentional.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={objectUrl}
      alt={file.name}
      onError={() => setFailed(true)}
      className="bg-muted max-h-[75vh] w-full rounded-[4px] object-contain"
    />
  );
}

/**
 * Sleek minimal upload row — a single underline drop target with an inline
 * file list separated by hairlines. No boxed dropzone, no grid pattern.
 */
export function FileUpload({
  accept,
  multiple = true,
  maxFiles = 10,
  maxFileSizeMB = 50,
  files,
  onChange,
  onError,
  variant = "photo",
  labels,
  errorMessages,
  className,
}: FileUploadProps) {
  const inputId = useId();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragActive, setIsDragActive] = useState(false);
  /** Index of the image open in the enlarged-preview dialog (`null` = closed). */
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);
  const previewFile =
    previewIndex !== null ? (files[previewIndex] ?? null) : null;

  const acceptedTokens = accept
    .split(",")
    .map((token) => token.trim().toLowerCase())
    .filter(Boolean);

  const isFileTypeAccepted = (file: File) => {
    if (acceptedTokens.length === 0) return true;
    const fileType = file.type.toLowerCase();
    const fileName = file.name.toLowerCase();

    return acceptedTokens.some((token) => {
      if (token.endsWith("/*")) {
        const prefix = token.slice(0, -1);
        return fileType.startsWith(prefix);
      }
      if (token.startsWith(".")) {
        return fileName.endsWith(token);
      }
      return fileType === token;
    });
  };

  const handleIncomingFiles = (incoming: File[]) => {
    if (incoming.length === 0) return;
    onError?.(null);

    const maxBytes = maxFileSizeMB * 1024 * 1024;
    const validFiles: File[] = [];

    for (const file of incoming) {
      if (!isFileTypeAccepted(file)) {
        onError?.(errorMessages?.invalidType ?? labels.constraintsHint);
        continue;
      }
      if (file.size > maxBytes) {
        onError?.(errorMessages?.maxSize ?? labels.constraintsHint);
        continue;
      }
      validFiles.push(file);
    }

    if (validFiles.length === 0) return;

    const combined = multiple ? [...files, ...validFiles] : validFiles.slice(0, 1);
    if (combined.length > maxFiles) {
      onError?.(errorMessages?.maxFiles ?? labels.constraintsHint);
      onChange(combined.slice(0, maxFiles));
      return;
    }

    onChange(combined);
  };

  const handleRemove = (indexToRemove: number, e: React.MouseEvent) => {
    e.stopPropagation();
    onError?.(null);
    setPreviewIndex(null);
    onChange(files.filter((_, index) => index !== indexToRemove));
  };

  const Icon = variant === "video" ? Film : ImagePlus;

  return (
    <div
      className={cn("w-full", className)}
      onDragOver={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragActive(true);
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragActive(false);
      }}
      onDrop={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragActive(false);
        handleIncomingFiles(Array.from(e.dataTransfer.files ?? []));
      }}
    >
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className={cn(
          "group flex w-full items-center gap-3 border-b border-foreground/35 bg-transparent py-3 text-left transition-colors outline-none",
          "hover:border-muted-foreground/50 focus-visible:border-brand-blue",
          isDragActive && "border-emerald-500",
        )}
      >
        <span
          className={cn(
            "flex size-9 shrink-0 items-center justify-center transition-colors",
            isDragActive
              ? "text-emerald-500"
              : "text-muted-foreground group-hover:text-foreground",
          )}
        >
          {isDragActive ? (
            <Upload className="size-4" />
          ) : (
            <Icon className="size-4" strokeWidth={1.75} />
          )}
        </span>

        <span className="min-w-0 flex-1">
          <span className="flex flex-wrap items-baseline gap-x-2">
            <span className="font-ui text-sm font-medium text-foreground">
              {isDragActive ? labels.dropHint : labels.title}
            </span>
            {labels.countBadge ? (
              <span className="font-mono text-[11px] tracking-wide text-muted-foreground">
                {labels.countBadge}
              </span>
            ) : null}
          </span>
          <span className="text-muted-foreground mt-0.5 block truncate font-ui text-xs">
            {labels.constraintsHint}
          </span>
        </span>

        <span className="font-mono text-[11px] tracking-[0.12em] text-muted-foreground uppercase group-hover:text-foreground">
          +
        </span>
      </button>

      <input
        ref={fileInputRef}
        id={inputId}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={(e) => {
          handleIncomingFiles(Array.from(e.target.files ?? []));
          e.target.value = "";
        }}
        className="hidden"
      />

      {files.length > 0 ? (
        <ul className="divide-y divide-border border-b border-border">
          {files.map((file, idx) => (
            <li
              key={`${file.name}-${file.lastModified}-${idx}`}
              className="flex items-center justify-between gap-3 py-2"
            >
              <div className="flex min-w-0 items-center gap-2.5">
                {isImageFile(file) ? (
                  <button
                    type="button"
                    title={labels.previewLabel}
                    aria-label={
                      labels.previewLabel
                        ? `${labels.previewLabel}: ${file.name}`
                        : file.name
                    }
                    onClick={(e) => {
                      e.stopPropagation();
                      setPreviewIndex(idx);
                    }}
                    className="focus-visible:outline-brand-blue shrink-0 cursor-zoom-in rounded-[4px] transition-opacity hover:opacity-85 focus-visible:outline-2 focus-visible:outline-offset-2"
                  >
                    <FileThumbnail file={file} />
                  </button>
                ) : (
                  <Icon
                    className="text-muted-foreground size-4 shrink-0"
                    strokeWidth={1.75}
                  />
                )}
                <div className="min-w-0">
                  <p className="truncate font-ui text-[13px] font-normal text-foreground">
                    {file.name}
                  </p>
                  <p className="font-mono text-[11px] text-muted-foreground">
                    {(file.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>
              </div>

              <button
                type="button"
                aria-label={`${labels.removeLabel}: ${file.name}`}
                onClick={(e) => handleRemove(idx, e)}
                className="text-muted-foreground hover:text-destructive flex size-7 shrink-0 items-center justify-center transition-colors"
              >
                <X className="size-4" strokeWidth={1.75} />
              </button>
            </li>
          ))}
        </ul>
      ) : null}
      {previewFile ? (
        <Dialog
          open
          onOpenChange={(open) => {
            if (!open) setPreviewIndex(null);
          }}
        >
          <DialogContent
            className="sm:max-w-3xl lg:max-w-5xl"
            closeLabel={labels.closeLabel ?? "Close"}
          >
            <DialogTitle className="font-ui text-muted-foreground truncate text-sm font-medium">
              {previewFile.name}
            </DialogTitle>
            <PreviewImage file={previewFile} />
          </DialogContent>
        </Dialog>
      ) : null}
    </div>
  );
}
