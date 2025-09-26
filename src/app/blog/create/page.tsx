"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CldUploadWidget } from "next-cloudinary";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";

export default function CreatePostPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setNewTag("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, slug, content, coverImage, videoUrl, tags }),
      });

      if (res.ok) {
        router.push("/blog"); // redirect to blog list
      } else {
        console.error("Failed to create post");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6 text-purple-500">Create New Blog Post</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setSlug(e.target.value.toLowerCase().replace(/\s+/g, "-"));
            }}
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>

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

        <div>
          <label className="block font-semibold mb-1">Cover Image</label>
          <CldUploadWidget
            uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!}
            onUpload={(result) => setCoverImage((result.info as any).secure_url)}
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
            <Image height={400} width={400} src={coverImage} alt="Cover" className="mt-2 w-full rounded-md" />
          )}
        </div>

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
            <button type="button" onClick={handleAddTag} className="bg-blue-500 text-white px-4 rounded-md">
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span key={uuidv4()} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="bg-purple-500 text-white px-6 py-3 rounded-md font-bold hover:bg-purple-600 transition"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creating..." : "Create Post"}
        </button>
      </form>
    </div>
  );
}
