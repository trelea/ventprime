"use client";

import { useMemo, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { CheckIcon, ChevronDownIcon } from "lucide-react";
import {
  getLocalityLabel,
  getLocalityRaion,
  LOCALITIES,
} from "@/lib/localities";
import { cn } from "@/lib/utils";

/** Diacritic- and case-insensitive match so ro/ru/en queries all hit. */
function normalizeForSearch(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

/**
 * Locality autocomplete — the field itself IS the search box. Typing filters
 * the dropdown across all three languages; rows render only the
 * current-locale name. The visible input carries exactly the shared input
 * styling (44px underline) so its line matches the neighboring fields.
 */
export function LocalityCombobox({
  id,
  value,
  onChange,
  invalid,
}: {
  id: string;
  value: string;
  onChange: (value: string) => void;
  invalid?: boolean;
}) {
  const locale = useLocale();
  const t = useTranslations("Form");
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState<string | null>(null);
  const [highlight, setHighlight] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const listId = `${id}-localities`;
  /** Set when we blur programmatically right after a select/cancel,
      so the blur handler doesn't mistake it for abandoning typed text. */
  const skipBlurCheck = useRef(false);

  const selectedLabel = useMemo(
    () => getLocalityLabel(value, locale),
    [value, locale],
  );

  const selectedRaion = useMemo(
    () => (value ? getLocalityRaion(value, locale) : ""),
    [value, locale],
  );

  /** Normalized RO names with more than one locality → raion must be shown (§3). */
  const duplicateNames = useMemo(() => {
    const counts = new Map<string, number>();
    for (const locality of LOCALITIES) {
      const key = normalizeForSearch(locality.ro);
      counts.set(key, (counts.get(key) ?? 0) + 1);
    }
    return new Set(
      [...counts.entries()].filter(([, n]) => n > 1).map(([k]) => k),
    );
  }, []);

  const selectedNeedsRaion = useMemo(() => {
    if (!value) return false;
    const found = LOCALITIES.find((l) => l.value === value);
    return found ? duplicateNames.has(normalizeForSearch(found.ro)) : false;
  }, [value, duplicateNames]);

  const selectedInputText =
    selectedNeedsRaion && selectedRaion
      ? `${selectedLabel} · ${selectedRaion}`
      : selectedLabel;

  const query = normalizeForSearch(search ?? "");
  const filtered = useMemo(() => {
    if (!query) return LOCALITIES;
    return LOCALITIES.filter((locality) =>
      normalizeForSearch(
        `${locality.ro} ${locality.ru} ${locality.en} ${locality.raionRo} ${locality.raionRu} ${locality.raionEn}`,
      ).includes(query),
    );
  }, [query]);

  const restoreSelection = () => {
    skipBlurCheck.current = true;
    setSearch(null);
    setOpen(false);
    setHighlight(-1);
  };

  const choose = (next: string) => {
    onChange(next);
    restoreSelection();
    inputRef.current?.blur();
  };

  const scrollActiveIntoView = (index: number) => {
    const target = filtered[index];
    if (!target) return;
    requestAnimationFrame(() => {
      document
        .getElementById(`${listId}-${target.value}`)
        ?.scrollIntoView({ block: "nearest" });
    });
  };

  const moveHighlight = (direction: 1 | -1) => {
    if (filtered.length === 0) return;
    const next =
      highlight < 0
        ? direction === 1
          ? 0
          : filtered.length - 1
        : (highlight + direction + filtered.length) % filtered.length;
    setHighlight(next);
    scrollActiveIntoView(next);
  };

  return (
    <div
      className="relative w-full min-w-0"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          if (skipBlurCheck.current) {
            skipBlurCheck.current = false;
          } else if (
            // Leave the typed text as-is (normal input behavior); if it no
            // longer matches the selection, drop the selection so submit
            // validation catches the missing locality.
            search !== null &&
            search !== selectedInputText &&
            search !== selectedLabel
          ) {
            onChange("");
          }
          setOpen(false);
          setHighlight(-1);
        }
      }}
    >
      <input
        ref={inputRef}
        id={id}
        role="combobox"
        aria-expanded={open}
        aria-controls={listId}
        aria-autocomplete="list"
        aria-activedescendant={
          open && highlight >= 0 && filtered[highlight]
            ? `${listId}-${filtered[highlight].value}`
            : undefined
        }
        aria-invalid={invalid || undefined}
        autoComplete="off"
        value={search ?? selectedInputText}
        placeholder={t("combobox.searchPlaceholder")}
        onFocus={() => {
          setOpen(true);
          inputRef.current?.select();
        }}
        onChange={(event) => {
          const next = event.target.value;
          setSearch(next);
          if (next === "") onChange("");
          setOpen(true);
          setHighlight(next ? 0 : -1);
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown") {
            event.preventDefault();
            if (!open) setOpen(true);
            moveHighlight(1);
          } else if (event.key === "ArrowUp") {
            event.preventDefault();
            if (open) moveHighlight(-1);
          } else if (event.key === "Enter") {
            if (open && highlight >= 0 && filtered[highlight]) {
              event.preventDefault();
              choose(filtered[highlight].value);
            }
          } else if (event.key === "Escape") {
            event.stopPropagation();
            restoreSelection();
            inputRef.current?.blur();
          }
        }}
        className="flex h-11 w-full min-w-0 rounded-none border-0 border-b border-foreground/35 bg-transparent py-2 pr-8 font-ui text-[15px] shadow-none transition-colors outline-none placeholder:text-muted-foreground hover:border-foreground focus-visible:border-brand-blue aria-invalid:border-destructive"
      />
      <ChevronDownIcon className="pointer-events-none absolute top-1/2 right-0 size-4 -translate-y-1/2 opacity-50" />

      {open ? (
        <div className="absolute inset-x-0 top-full z-50 mt-1 overflow-hidden rounded-md bg-[#f8f9fa] shadow-md ring-1 ring-foreground/10">
          <ul
            id={listId}
            role="listbox"
            aria-label={t("fields.locality")}
            className="max-h-72 overflow-y-auto p-1"
            onMouseDown={(event) => event.preventDefault()}
          >
            {filtered.length === 0 ? (
              <li className="py-6 text-center font-ui text-sm text-muted-foreground">
                {t("combobox.empty")}
              </li>
            ) : (
              filtered.map((locality, index) => {
                const isSelected = value === locality.value;
                const raion = getLocalityRaion(locality.value, locale);
                const needsRaion = duplicateNames.has(
                  normalizeForSearch(locality.ro),
                );

                return (
                  <li
                    key={locality.value}
                    id={`${listId}-${locality.value}`}
                    role="option"
                    aria-selected={isSelected}
                    onMouseEnter={() => setHighlight(index)}
                    onClick={() => choose(locality.value)}
                    className={cn(
                      "flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 font-ui text-sm select-none",
                      index === highlight
                        ? "bg-muted text-foreground"
                        : "text-foreground",
                    )}
                  >
                    <span className="min-w-0 truncate">
                      {getLocalityLabel(locality.value, locale)}
                      {needsRaion && raion ? (
                        <span className="text-muted-foreground">
                          {" "}
                          · {raion}
                        </span>
                      ) : null}
                    </span>
                    <CheckIcon
                      className={cn(
                        "ml-auto shrink-0",
                        isSelected ? "opacity-100" : "opacity-0",
                      )}
                    />
                  </li>
                );
              })
            )}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
