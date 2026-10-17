import { cn } from "cn";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-11 w-full min-w-0 rounded-none border-0 border-b border-foreground/35 bg-transparent px-0 py-2 font-ui text-[15px] shadow-none transition-colors outline-none",
        "placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground",
        "hover:border-foreground focus-visible:border-brand-blue",
        "aria-invalid:border-destructive",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

export { Input };