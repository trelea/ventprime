import Image from "next/image";
import { Container } from "@/components/layout/container";

type BlogImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

/** Full-width image that keeps its natural proportions, with rounded corners. */
function BlogImage({ src, alt, width, height }: BlogImageProps) {
  return (
    <Container bgColor="white" height="auto">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes="(max-width: 1300px) 100vw, 1300px"
        className="h-auto w-full rounded-[10px]"
      />
    </Container>
  );
}

export { BlogImage };
