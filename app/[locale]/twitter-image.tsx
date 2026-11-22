import { createPhotoImage } from "@/components/seo/photo-og-image";
import { heroPhoto } from "@/components/seo/og-image-shared";

export {
  alt,
  contentType,
  generateStaticParams,
} from "@/components/seo/og-image-shared";
export default createPhotoImage(heroPhoto);
