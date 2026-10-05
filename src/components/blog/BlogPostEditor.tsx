"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CldUploadWidget } from "next-cloudinary";
import type {
  CloudinaryUploadWidgetResults,
  CloudinaryUploadWidgetInfo,
} from "next-cloudinary";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";
import Link from "next/link";
import type { BlogInput } from "@/lib/blog-input";
import CustomCursor from "@/components/CustomCursor";
import FloatingButtons from "@/components/FloatingButtons";

// Match your BlogPage categories
type CategoryType = "TECH_BUSINESS" | "TRAVEL_CULTURE" | "SKI_SNOW";

export default function BlogPostEditor({ initialPost }: { initialPost?: BlogInput }) {
  const router = useRouter();

  const [title, setTitle] = useState(initialPost?.title ?? "");
  const [slug, setSlug] = useState(initialPost?.slug ?? "");
  const [content, setContent] = useState(initialPost?.content ?? "");
  const [coverImage, setCoverImage] = useState(initialPost?.coverImage ?? "");
  const [videoUrl, setVideoUrl] = useState(initialPost?.videoUrl ?? "");
  const [showInGallery, setShowInGallery] = useState(initialPost?.showInGallery ?? false);
  const [error, setError] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const [category, setCategory] = useState<CategoryType>((initialPost?.category as CategoryType) ?? "TECH_BUSINESS");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setNewTag("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setError("");
    if (showInGallery && !coverImage) { setError("Upload a cover image before showing this post in the gallery."); return; }
    setIsSubmitting(true);

    try {
      const res = await fetch(initialPost ? `/api/blog/${encodeURIComponent(initialPost.slug)}` : "/api/blog", {
        method: initialPost ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          slug,
          content,
          coverImage,
          showInGallery,
          videoUrl,
          tags,
          category, // ✅ added category
        }),
      });

      const result = await res.json();
      if (res.ok) {
        router.push(initialPost ? "/mission-control/blog?saved=1" : "/blog");
        router.refresh();
      } else {
        setError(res.status === 401 ? "Your session expired. Sign in again, then retry saving." : result.error || "The post could not be saved.");
      }
    } catch {
      setError("The post could not be saved. Your draft is still here; please retry.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-8 pb-8 pt-28">
      <CustomCursor />
      <FloatingButtons />
      <h1 className="text-3xl font-bold mb-6 text-purple-500">
        {initialPost ? "Edit Blog Post" : "Create New Blog Post"}
      </h1>

      <Link href="/mission-control/blog" className="block mb-6 underline">Manage blog and gallery</Link>
      <form onSubmit={handleSubmit} className="space-y-4">
        <fieldset disabled={isSubmitting} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block font-semibold mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (!initialPost) setSlug(e.target.value.toLowerCase().replace(/\s+/g, "-"));
            }}
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>

        {/* Slug */}
        <div>
          <label className="block font-semibold mb-1">Slug</label>
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>

        {/* Content */}
        <div>
          <label className="block font-semibold mb-1">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={8}
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>

        {/* Category Dropdown */}
        <div>
          <label className="block font-semibold mb-1">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as CategoryType)}
            className="w-full border border-gray-300 rounded-md p-2 bg-black"
            required
          >
            <option value="TECH_BUSINESS">Tech & Business</option>
            <option value="TRAVEL_CULTURE">Travel & Culture</option>
            <option value="SKI_SNOW">Ski & Snow</option>
          </select>
        </div>

        {/* Cover Image */}
        <div>
          <label className="block font-semibold mb-1">Cover Image</label>
          <CldUploadWidget
            uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!}
            options={{ multiple: false, resourceType: "image" }}
            onSuccess={(result: CloudinaryUploadWidgetResults) => {
              // Only handle successful uploads
              const info = result.info as CloudinaryUploadWidgetInfo;
              setCoverImage(info.secure_url); // ✅ store the URL immediately
            }}
            onError={() => setError("Image upload failed. Please try again.")}
          >
            {({ open }) => (
              <button
                type="button"
                onClick={() => open()}
                className="bg-purple-400 text-white py-2 px-4 rounded-md hover:bg-purple-500 transition"
              >
                Upload Image
              </button>
            )}
          </CldUploadWidget>

          {coverImage && (
            <Image
              height={400}
              width={400}
              src={coverImage}
              alt="Cover"
              className="mt-2 w-full rounded-md"
            />
          )}
        </div>

        <div className="rounded-md border border-purple-400/40 p-4">
          <label className="flex items-center gap-3">
            <input id="show-in-gallery" type="checkbox" checked={showInGallery} onChange={event => setShowInGallery(event.target.checked)} />
            <span className="font-semibold">Show this cover image in gallery</span>
          </label>
          <p className="mt-2 text-sm text-gray-400">Saving this post updates its gallery photo and title. Uncheck this option to remove it from the gallery while keeping the blog post.</p>
        </div>

        {/* Video URL */}
        <div>
          <label className="block font-semibold mb-1">Video URL (Optional)</label>
          <input
            type="text"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2"
            placeholder="https://..."
          />
        </div>

        {/* Tags */}
        <div>
          <label className="block font-semibold mb-1">Tags</label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              className="border border-gray-300 rounded-md p-2 flex-1"
              placeholder="Add tag"
            />
            <button
              type="button"
              onClick={handleAddTag}
              className="bg-blue-500 text-white px-4 rounded-md"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={uuidv4()}
                className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Submit */}
        {error && <p role="alert" className="text-red-400">{error}</p>}
        <button
          type="submit"
          className="bg-purple-500 text-white px-6 py-3 rounded-md font-bold hover:bg-purple-600 transition"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : initialPost ? "Save Changes" : "Create Post"}
        </button>
        </fieldset>
      </form>
    </div>
  );
}
