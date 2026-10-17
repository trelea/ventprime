import { cn } from "cn";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex min-h-24 w-full rounded-none border-0 border-b border-foreground/35 bg-transparent px-0 py-2 font-ui text-[15px] shadow-none transition-colors outline-none",
        "placeholder:text-muted-foreground field-sizing-content resize-y",
        "hover:border-foreground focus-visible:border-brand-blue",
        "aria-invalid:border-destructive",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };