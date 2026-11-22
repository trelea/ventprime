import { createPhotoImage } from "@/components/seo/photo-og-image";
import { aboutPhoto } from "@/components/seo/og-image-shared";

export {
  alt,
  contentType,
  generateStaticParams,
} from "@/components/seo/og-image-shared";
export default createPhotoImage(aboutPhoto);
