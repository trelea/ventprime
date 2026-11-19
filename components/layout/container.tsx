import type { ComponentProps } from "react";
import { cn } from "cn";

type BgColor = "green" | "white" | "grey" | "dark" | "transparent";
type Height = "screen" | "auto";

const backgroundStyles: Record<BgColor, string> = {
  green: "bg-primary text-primary-foreground",
  white: "bg-background text-foreground",
  grey: "bg-secondary text-secondary-foreground",
  dark: "bg-surface-dark text-on-dark",
  transparent: "",
};

type ContainerProps = ComponentProps<"section"> & {
  bgColor: BgColor;
  height?: Height;
  innerClassName?: string;
};

const isDev = process.env.NODE_ENV === "development";

function Container({
  bgColor,
  height = "auto",
  className,
  innerClassName,
  children,
  ...props
}: ContainerProps) {
  return (
    <section
      data-slot="container"
      data-bg-color={bgColor}
      data-height={height}
      className={cn(
        "w-full",
        backgroundStyles[bgColor],
        height === "screen" && "min-h-screen-safe",
        isDev && "border border-red-500",
        className,
      )}
      {...props}
    >
      <div
        data-slot="container-inner"
        // Gutter ramps 16 -> 24 -> 32 -> 40 -> 48 -> 64px across breakpoints.
        // --container-max keeps the 1300px content target intact as the gutter grows.
        className={cn(
          "mx-auto w-full max-w-[var(--container-max)] px-[var(--container-gutter)]",
          innerClassName,
        )}
      >
        {children}
      </div>
    </section>
  );
}

export { Container };
