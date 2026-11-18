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
        className,
      )}
      {...props}
    >
      <div
        data-slot="container-inner"
        // 1335 = 1300px content + 2 x 17.5px gutters (375px viewport -> 340px content)
        className={cn(
          "mx-auto w-full max-w-[1335px] px-[17.5px]",
          innerClassName,
        )}
      >
        {children}
      </div>
    </section>
  );
}

export { Container };
