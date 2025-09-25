"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import FloatingButtons from "@/components/FloatingButtons";
import Footer from "@/components/Footer";

async function getBlogPosts() {
  const posts = [
    {
      slug: "the-best-multilingual-seo-tools",
      title: "The Best Multilingual SEO Tools",
      excerpt:
        "Discover the top tools to optimize your website for a global audience and expand your brand's reach.",
      date: "September 15, 2025",
      image: "/images/seo-tools.jpg",
      category: "Tech & Business",
    },
    {
      slug: "a-foodies-guide-to-sapporo",
      title: "A Foodie's Guide to Sapporo",
      excerpt:
        "From ramen to fresh seafood, explore the culinary delights of Sapporo, Hokkaido, with this comprehensive guide.",
      date: "September 10, 2025",
      image: "/images/sapporo-food.jpg",
      category: "Travel & Culture",
    },
    {
      slug: "choosing-your-first-skis",
      title: "Choosing Your First Skis",
      excerpt:
        "Confused about ski gear? This guide will help you pick the perfect pair of skis for your first time on the slopes.",
      date: "September 1, 2025",
      image: "/images/first-skis.jpg",
      category: "Ski & Snow",
    },
  ];
  return posts;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<string>("Tech & Business");

  useEffect(() => {
    getBlogPosts().then((data) => setPosts(data));
  }, []);

  const categories = ["Tech & Business", "Travel & Culture", "Ski & Snow"];

  // Filter posts based on active tab
  const filteredPosts = posts.filter((post) => post.category === activeTab);

  // Videos for each category
  const videoSources: Record<string, string> = {
    "Tech & Business": "/videos/tech.mp4",
    "Travel & Culture": "/videos/travel.mp4",
    "Ski & Snow": "/videos/ski.mp4",
  };

  return (
    <>
      <FloatingButtons />
      <div className="container mx-auto px-4 py-8">
        {/* Header with video background */}
        <header className="relative w-full h-[300px] md:h-[400px] rounded-2xl overflow-hidden mb-12">
          <video
            key={activeTab} // re-render when tab changes
            className="absolute top-0 left-0 w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src={videoSources[activeTab]} type="video/mp4" />
          </video>

          {/* Overlay for readability */}
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center px-6">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
              Stories, Guides, & Insights: The Blog
            </h1>
            <p className="text-lg md:text-xl text-gray-200 max-w-2xl">
              This is where I share my passions for technology, travel, and the mountains. 
              You&apos;ll find practical advice for building a global brand, inspiring stories from my travels, 
              and tips for your next ski trip.
            </p>
          </div>
        </header>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              className={`px-4 py-2 font-semibold rounded-full transition-colors cursor-none hover:scale-110 ${
                activeTab === category
                  ? "bg-blue-600 text-white"
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
              key={post.slug}
              className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 transition-transform transform hover:scale-105"
            >
              <Link href={`/blog/${post.slug}`}>
                <div className="relative w-full h-48">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    style={{ objectFit: "cover" }}
                    className="rounded-t-lg"
                  />
                </div>
              </Link>
              <div className="p-6">
                <span className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
                  {post.category}
                </span>
                <h2 className="text-xl font-bold mt-2 mb-2">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="hover:text-blue-600 transition-colors"
                  >
                    {post.title}
                  </Link>
                </h2>
                <p className="text-gray-700 text-base mb-4">{post.excerpt}</p>
                <div className="text-sm text-gray-500">{post.date}</div>
              </div>
            </article>
          ))}
        </section>

        {/* Call to Action */}
        <section className="text-center mt-12 py-8 bg-gray-100 rounded-lg">
          <h3 className="text-2xl font-bold mb-4">
            Have a question? Leave a comment!
          </h3>
          <p className="text-lg mb-4">
            Or, join my mailing list for exclusive tips and updates.
          </p>
          <button className="bg-blue-600 text-white font-bold py-3 px-6 rounded-full hover:bg-blue-700 transition-colors">
            Join the Newsletter
          </button>
        </section>
      </div>
      <Footer />
    </>
  );
}
