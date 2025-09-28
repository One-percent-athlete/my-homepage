"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import FloatingButtons from "@/components/FloatingButtons";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";

// ---- Types ----
type CategoryType = "TECH_BUSINESS" | "TRAVEL_CULTURE" | "SKI_SNOW";

type BlogPostAPI = {
  id: string;
  slug: string;
  title: string;
  content: string;
  coverImage?: string | null;
  createdAt: string;
  category: CategoryType;
  postTags?: { tag: { name: string } }[];
};

type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  category: string;
  tags: string[];
};

// ---- Helpers ----
function mapCategory(category: CategoryType): string {
  switch (category) {
    case "TECH_BUSINESS":
      return "Tech & Business";
    case "TRAVEL_CULTURE":
      return "Travel & Culture";
    case "SKI_SNOW":
      return "Ski & Snow";
    default:
      return category;
  }
}

// Strip HTML and create excerpt
function createExcerpt(content: string, length = 120): string {
  const stripped = content.replace(/<[^>]+>/g, ""); // remove HTML tags
  return stripped.length > length ? stripped.slice(0, length) + "..." : stripped;
}

// Map API post → frontend post
function mapPost(post: BlogPostAPI): BlogPost {
  return {
    id: post.id,
    slug: post.slug,
    title: post.title,
    excerpt: createExcerpt(post.content),
    date: post.createdAt,
    image: post.coverImage || "/images/_test.jpg",
    category: mapCategory(post.category),
    tags: post.postTags?.map((pt) => pt.tag.name) || [],
  };
}

// ---- Fetch posts from API ----
async function getBlogPosts(): Promise<BlogPost[]> {
  const res = await fetch("/api/blog", { cache: "no-store" });
  if (!res.ok) return [];
  const data: BlogPostAPI[] = await res.json();
  return data.map(mapPost);
}

// ---- Component ----
export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [activeTab, setActiveTab] = useState("Tech & Business");

  useEffect(() => {
    getBlogPosts().then(setPosts);
  }, []);

  const categories = ["Tech & Business", "Travel & Culture", "Ski & Snow"];

  const filteredPosts = posts.filter((post) => post.category === activeTab);

  const videoSources: Record<string, string> = {
    "Tech & Business": "/videos/tech.mp4",
    "Travel & Culture": "/videos/travel.mp4",
    "Ski & Snow": "/videos/ski.mp4",
  };

  return (
    <>
      <CustomCursor />
      <FloatingButtons />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="relative w-full h-[300px] md:h-[400px] rounded-2xl overflow-hidden mb-12">
          <video
            key={activeTab}
            className="absolute top-0 left-0 w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src={videoSources[activeTab]} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center px-6">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg text-purple-400">
              Stories, Guides, & Insights: The Blog
            </h1>
            <p className="text-lg md:text-xl max-w-2xl text-pink-400">
              This is where I share my passions for technology, travel, and the mountains. 
              You&apos;ll find practical advice, inspiring stories, and tips for your next adventure.
            </p>
          </div>
        </header>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              className={`cursor-none px-4 py-2 font-semibold rounded-full transition-transform hover:scale-110 ${
                activeTab === category
                  ? "bg-purple-400 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Blog Posts Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="bg-gray-50 rounded-lg shadow-lg overflow-hidden border border-gray-200 transition-transform transform hover:scale-105 cursor-none"
            >
              <Link href={`/blog/${post.slug}`}>
                <div className="relative w-full h-48">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    style={{ objectFit: "cover" }}
                    className="rounded-t-lg cursor-none"
                    loading="lazy"
                  />
                </div>
              </Link>
              <div className="p-6">
                <span className="text-sm font-semibold text-purple-400 uppercase tracking-wide">
                  {post.category}
                </span>
                <h2 className="text-xl font-bold mt-2 mb-2">
                  <Link href={`/blog/${post.slug}`} className="text-purple-400 transition-colors">
                    {post.title}
                  </Link>
                </h2>
                <p className="text-gray-700 text-base mb-2">{post.excerpt}</p>
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-purple-100 text-purple-800 text-xs font-semibold px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="text-sm text-gray-500">
                  {new Date(post.date).toLocaleDateString()}
                </div>
              </div>
            </article>
          ))}
        </section>

        {/* Call to Action */}
        <section className="text-center mt-12 py-8 bg-gray-50 rounded-lg">
          <h3 className="text-2xl font-bold mb-4 text-purple-400">
            Have a question? Leave a comment!
          </h3>
          <p className="text-lg mb-4 text-pink-400">
            Or, join my mailing list for exclusive tips and updates.
          </p>
          <button className="bg-lime-400 text-white font-bold py-3 px-6 rounded-full hover:bg-lime-500 transition-colors cursor-none">
            Join the Newsletter
          </button>
        </section>
      </div>
      <Footer />
    </>
  );
}
