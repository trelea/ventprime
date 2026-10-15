"use client";

import { Dialog } from "@base-ui/react/dialog";
import { XIcon } from "lucide-react";
import { cn } from "cn";

const Sheet = Dialog.Root;
const SheetTrigger = Dialog.Trigger;
const SheetClose = Dialog.Close;

function SheetContent({
  className,
  children,
  side = "right",
  ...props
}: Dialog.Popup.Props & { side?: "right" | "left" | "bottom" }) {
  return (
    <Dialog.Portal>
      <Dialog.Backdrop
        className={cn(
          "fixed inset-0 z-50 bg-brand-blue-dark/40 backdrop-blur-[2px]",
          "transition-opacity duration-200 ease-out data-ending:opacity-0 data-starting:opacity-0",
        )}
      />
      <Dialog.Popup
        data-slot="sheet-content"
        data-side={side}
        className={cn(
          "bg-background fixed z-50 flex flex-col gap-4 shadow-xl transition ease-out",
          "data-ending:opacity-0 data-starting:opacity-0",
          side === "right" &&
            "inset-y-0 right-0 h-full w-full max-w-sm border-l data-[ending]:translate-x-full data-[starting]:translate-x-full",
          side === "left" &&
            "inset-y-0 left-0 h-full w-full max-w-sm border-r data-[ending]:-translate-x-full data-[starting]:-translate-x-full",
          side === "bottom" &&
            "inset-x-0 bottom-0 max-h-[85vh] rounded-t-2xl border-t data-[ending]:translate-y-full data-[starting]:translate-y-full",
          className,
        )}
        {...props}
      >
        {children}
        <Dialog.Close
          aria-label="Close"
          className="ring-offset-background focus-visible:ring-ring absolute top-4 right-4 rounded-md p-1 opacity-70 transition-opacity hover:opacity-100 focus-visible:ring-2 focus-visible:outline-none"
        >
          <XIcon className="size-5" />
        </Dialog.Close>
      </Dialog.Popup>
    </Dialog.Portal>
  );
}

function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-header"
      className={cn("flex flex-col gap-1.5 p-6 pb-2", className)}
      {...props}
    />
  );
}

function SheetFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-footer"
      className={cn("mt-auto flex flex-col gap-3 p-6", className)}
      {...props}
    />
  );
}

function SheetTitle({ className, ...props }: Dialog.Title.Props) {
  return (
    <Dialog.Title
      data-slot="sheet-title"
      className={cn("text-brand-blue-dark text-lg font-semibold", className)}
      {...props}
    />
  );
}

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
};