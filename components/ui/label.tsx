import { cn } from "cn";

function Label({ className, ...props }: React.ComponentProps<"label">) {
  return (
    <label
      data-slot="label"
      className={cn(
        "flex items-center gap-2 font-sans text-[15px] font-bold leading-none text-foreground select-none",
        "group-data-[disabled]:pointer-events-none group-data-[disabled]:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

export { Label };