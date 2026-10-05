import { isCloudinaryImage } from "./blog-input";

export type GalleryBlogImage = {
  id: string;
  title: string;
  slug: string;
  thumbnail: string;
  full: string;
};

export function cloudinaryGalleryImage(source: string, width: number) {
  if (!isCloudinaryImage(source)) return null;
  return source.replace("/image/upload/", `/image/upload/c_limit,w_${width},h_${width},f_auto,q_auto/`);
}
