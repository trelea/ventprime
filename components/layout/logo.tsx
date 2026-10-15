import Image from "next/image";
import { images } from "@/lib/images";
import { site } from "@/lib/site";
import { cn } from "cn";

/**
 * VENTPRIME logo.
 *
 * The artwork is the client's own 3D render, prepared once into transparent
 * WebP/PNG by removing the white background (see `public/logo.png`). Because it
 * is raster, it is served through `next/image` rather than inlined as paths.
 *
 * Variants:
 *   - default  — mark + wordmark (`logo-nav`); the full lockup's taglines are
 *                unreadable at navbar height
 *   - `full`   — the complete lockup including both taglines, for large or
 *                print placements
 *
 * `onDark` puts the logo on a white plate, because the wordmark is navy and
 * would disappear against the dark navy footer.
 */
export function Logo({
  className,
  onDark = false,
  variant = "nav",
  priority = false,
  alt,
}: {
  className?: string;
  onDark?: boolean;
  variant?: "nav" | "full";
  priority?: boolean;
  alt?: string;
}) {
  const source = variant === "full" ? images.logo : images["logo-nav"];

  const image = (
    <Image
      src={source.src}
      alt={alt ?? ""}
      width={source.width}
      height={source.height}
      priority={priority}
      // Served as-is: the optimizer's JPEG fallback would drop the alpha
      // channel and render the logo on a black box for older clients.
      unoptimized
      className={cn("h-auto w-auto", className)}
    />
  );

  if (!onDark) return image;

  return (
    <span className="inline-flex w-fit rounded-xl bg-white p-3 shadow-sm">
      {image}
    </span>
  );
}

/** Screen-reader friendly name, since the lockup image is decorative here. */
export function LogoLabel() {
  return <span className="sr-only">{site.name}</span>;
}