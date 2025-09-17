import Link from 'next/link';
import Image from 'next/image';
import FloatingButtons from "@/components/FloatingButtons";

// This is a placeholder for a function that fetches your blog posts.
// In a real application, you'd fetch this data from a database,
// a headless CMS, or a local Markdown file system.
// For this example, we'll use a simple array.
async function getBlogPosts() {
  const posts = [
    {
      slug: 'the-best-multilingual-seo-tools',
      title: 'The Best Multilingual SEO Tools',
      excerpt: 'Discover the top tools to optimize your website for a global audience and expand your brand\'s reach.',
      date: 'September 15, 2025',
      image: '/images/seo-tools.jpg',
      category: 'Tech & Business',
    },
    {
      slug: 'a-foodies-guide-to-sapporo',
      title: 'A Foodie\'s Guide to Sapporo',
      excerpt: 'From ramen to fresh seafood, explore the culinary delights of Sapporo, Hokkaido, with this comprehensive guide.',
      date: 'September 10, 2025',
      image: '/images/sapporo-food.jpg',
      category: 'Travel & Culture',
    },
    {
      slug: 'choosing-your-first-skis',
      title: 'Choosing Your First Skis',
      excerpt: 'Confused about ski gear? This guide will help you pick the perfect pair of skis for your first time on the slopes.',
      date: 'September 1, 2025',
      image: '/images/first-skis.jpg',
      category: 'Ski & Snow',
    },
  ];
  return posts;
}

// Define metadata for SEO
export const metadata = {
  title: 'Stories, Guides, & Insights: The Blog',
  description: 'Practical advice for building a global brand, inspiring travel stories, and tips for your next ski trip.',
};

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <>
        <FloatingButtons />
            <div className="container mx-auto px-4 py-8">
            {/* Introduction */}
            <header className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-4">Stories, Guides, & Insights: The Blog</h1>
                <p className="text-lg text-gray-600">This is where I share my passions for technology, travel, and the mountains. You&apos;ll find practical advice for building a global brand, inspiring stories from my travels, and tips for your next ski trip.</p>
            </header>
            
            {/* Blog Posts Grid */}
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                <article key={post.slug} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105">
                    <Link href={`/blog/${post.slug}`}>
                    <div className="relative w-full h-48">
                        {/* Image of a blog post preview */}
                        <Image
                        src={post.image}
                        alt={post.title}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-t-lg"
                        />
                    </div>
                    </Link>
                    <div className="p-6">
                    <span className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
                        {post.category}
                    </span>
                    <h2 className="text-xl font-bold mt-2 mb-2">
                        <Link href={`/blog/${post.slug}`} className="hover:text-blue-600 transition-colors">
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
                <h3 className="text-2xl font-bold mb-4">Have a question? Leave a comment!</h3>
                <p className="text-lg mb-4">
                Or, join my mailing list for exclusive tips and updates.
                </p>
                <button className="bg-blue-600 text-white font-bold py-3 px-6 rounded-full hover:bg-blue-700 transition-colors">
                Join the Newsletter
                </button>
            </section>
            </div>
     </>
  );
}