import Image from "next/image";
import { Container } from "@/components/layout/container";

type BlogImagePairProps = {
  images: readonly [string, string];
  alt: readonly [string, string];
};

/** Two equal images side by side (stacked on phones), rounded, 20px gap. */
function BlogImagePair({ images, alt }: BlogImagePairProps) {
  return (
    <Container bgColor="white" height="auto">
      <div className="grid grid-cols-1 gap-[20px] sm:grid-cols-2">
        {images.map((src, index) => (
          <div
            key={src}
            className="relative aspect-[4/3] w-full overflow-hidden rounded-[10px]"
          >
            <Image
              src={src}
              alt={alt[index]}
              fill
              sizes="(max-width: 640px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </Container>
  );
}

export { BlogImagePair };
