"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import FloatingButtons from "@/components/FloatingButtons";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import { useLanguage } from "@/app/context/LanguageContext";

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
  category: CategoryType;
  tags: string[];
};

// ---- Helpers ----
function createExcerpt(content: string, length = 120): string {
  const stripped = content.replace(/<[^>]+>/g, ""); // remove HTML tags
  return stripped.length > length ? stripped.slice(0, length) + "..." : stripped;
}

function mapPost(post: BlogPostAPI): BlogPost {
  return {
    id: post.id,
    slug: post.slug,
    title: post.title,
    excerpt: createExcerpt(post.content),
    date: post.createdAt,
    image: post.coverImage || "/images/astro.jpg",
    category: post.category,
    tags: post.postTags?.map((pt) => pt.tag.name) || [],
  };
}

async function getBlogPosts(): Promise<BlogPost[]> {
  const res = await fetch("/api/blog", { cache: "no-store" });
  if (!res.ok) return [];
  const data: BlogPostAPI[] = await res.json();
  return data.map(mapPost);
}

// ---- Component ----
export default function BlogPage() {
  const { language } = useLanguage();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [activeTab, setActiveTab] = useState<CategoryType | null>(null);
  // For cycling hero videos
  const videoRef = useRef<HTMLVideoElement>(null);
  const videos = ["/videos/ski-video2.mp4", "/videos/travel_hero.mp4", "/videos/bogota.mp4"];
  const [currentVideo, setCurrentVideo] = useState(0);

  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    const handleEnded = () => {
      setCurrentVideo((prev) => (prev + 1) % videos.length);
    };

    videoEl.addEventListener("ended", handleEnded);
    return () => videoEl.removeEventListener("ended", handleEnded);
  }, [videos.length]);


  useEffect(() => {
    getBlogPosts().then(setPosts);
  }, []);

  // Multilingual category labels
  const categoryLabels: Record<CategoryType, Record<string, string>> = {
    TECH_BUSINESS: { en: "Tech & Business", ja: "テック＆ビジネス", zh: "科技与商业" },
    TRAVEL_CULTURE: { en: "Travel & Culture", ja: "旅行＆文化", zh: "旅行与文化" },
    SKI_SNOW: { en: "Ski & Snow", ja: "スキー＆雪", zh: "滑雪与雪" },
  };

  const categories = Object.keys(categoryLabels) as CategoryType[];

  const sortedPosts = [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const filteredPosts = activeTab 
    ? sortedPosts.filter((post) => post.category === activeTab)
    : sortedPosts;
  return (
    <>
      <CustomCursor />
      <FloatingButtons />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="relative w-full h-[300px] md:h-[400px] rounded-2xl overflow-hidden mb-12">
          <Image
            src="/images/astro.jpg"
            alt="Ski Hero Fallback"
            fill
            style={{ objectFit: "cover" }}
            className="absolute inset-0 object-cover"
          />
          <video
            ref={videoRef}
            key={currentVideo}
            autoPlay
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            poster="/images/ski.jpg"
          >
            <source src={videos[currentVideo]} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-opacity-50 flex flex-col items-center justify-center text-center px-6">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg text-purple-400">
              {language === "en" && "Stories, Guides, & Insights: The Blog"}
              {language === "ja" && "ブログ：ストーリー・ガイド・インサイト"}
              {language === "zh" && "博客：故事、指南与见解"}
            </h1>
            <p className="text-lg md:text-xl max-w-2xl text-pink-400">
              {language === "en" &&
                "This is where I share my passions for technology, travel, and the mountains. You'll find practical advice, inspiring stories, and tips for your next adventure."}
              {language === "ja" &&
                "ここでは、テクノロジー、旅行、山への情熱を共有しています。実用的なアドバイス、感動的なストーリー、次の冒険のヒントが見つかります。"}
              {language === "zh" &&
                "在这里，我分享对科技、旅行和山区的热爱。您将找到实用的建议、激励人心的故事以及下一次冒险的提示。"}
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
              {categoryLabels[category][language]}
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
                  {categoryLabels[post.category][language]}
                </span>
                <h2 className="text-xl font-bold mt-2 mb-2">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-purple-400 transition-colors"
                  >
                    {post.title}
                  </Link>
                </h2>
                <p className="text-gray-700 text-base mb-2">{post.excerpt}</p>
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
            {language === "en" ? "Have a question? Leave a comment!" :
             language === "ja" ? "質問がありますか？コメントを残してください！" :
             "有问题吗？请留言！"}
          </h3>
          <p className="text-lg mb-4 text-pink-400">
            {language === "en" ? "Or, join my mailing list for exclusive tips and updates." :
             language === "ja" ? "または、メールリストに登録して限定情報を受け取りましょう。" :
             "或加入我的邮件列表获取独家提示和更新。"}
          </p>
          <button className="bg-lime-400 text-white font-bold py-3 px-6 rounded-full hover:bg-lime-500 transition-colors cursor-none">
            {language === "en" ? "Join the Newsletter" :
             language === "ja" ? "ニュースレターに参加" :
             "加入通讯"}
          </button>
        </section>
      </div>
      <Footer />
    </>
  );
}
