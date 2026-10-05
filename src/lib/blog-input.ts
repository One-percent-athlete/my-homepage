export type BlogInput = {
  title: string;
  slug: string;
  content: string;
  coverImage: string;
  videoUrl: string;
  category: string;
  showInGallery: boolean;
};

export function isCloudinaryImage(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" && url.hostname === "res.cloudinary.com" &&
      !url.username && !url.password && url.pathname.includes("/image/upload/");
  } catch { return false; }
}

export function validateBlogInput(body: unknown): { data: BlogInput; error?: never } | { error: string; data?: never } {
  if (!body || typeof body !== "object") return { error: "Invalid post" };
  const input = body as Record<string, unknown>;
  const { title, slug, content, category } = input;
  if (typeof title !== "string" || title.trim().length < 3 || title.length > 180 ||
      typeof slug !== "string" || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) || slug.length > 255 ||
      typeof content !== "string" || content.trim().length < 10 || content.length > 100000 ||
      typeof category !== "string" || !["TECH_BUSINESS", "TRAVEL_CULTURE", "SKI_SNOW"].includes(category)) {
    return { error: "Check the title, slug, content and category." };
  }
  const coverImage = input.coverImage ?? "";
  const videoUrl = input.videoUrl ?? "";
  const showInGallery = input.showInGallery ?? false;
  if (typeof showInGallery !== "boolean" || typeof coverImage !== "string" || typeof videoUrl !== "string" ||
      coverImage.length > 2048 || videoUrl.length > 2048) return { error: "Invalid image or gallery selection." };
  if (coverImage && !isCloudinaryImage(coverImage)) return { error: "Upload a cover image using the image uploader." };
  if (showInGallery && !coverImage) return { error: "Upload a cover image before showing this post in the gallery." };
  return { data: { title: title.trim(), slug, content, category, coverImage, videoUrl, showInGallery } };
}

export function isDuplicateSlug(error: unknown): boolean {
  if (!error || typeof error !== "object") return false;
  const detail = error as { code?: string; cause?: unknown };
  return detail.code === "23505" || (detail.cause ? isDuplicateSlug(detail.cause) : false);
}
