import type { Metadata } from 'next';
import { blogPosts, getAllCategories } from '@/lib/data/blog';
import BlogList from '@/components/BlogList';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Technical articles, career guidance, and industry insights on Full Stack Development, AI/ML, DevOps, Data Science, and more from ZS Soft Tech, Nandyal.',
};

export default function BlogPage() {
  const categories = getAllCategories();

  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative h-48 sm:h-60 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&q=70"
          alt="ZS Soft Tech Blog"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-dark-bg/92 via-dark-bg/72 to-brand-deep/45" />
        <div className="relative z-10 h-full flex flex-col items-start justify-center container mx-auto px-6">
          <p className="banner-eyebrow mb-2">
            Knowledge Hub
          </p>
          <h1 className="page-heading hero-copy max-w-xl">
            Insights for Your <span className="text-primary">Tech Career</span>
          </h1>
          <p className="hero-copy-muted text-sm sm:text-base mt-2 max-w-lg">
            Tutorials, career guidance, and industry notes from ZS Soft Tech
          </p>
        </div>
      </section>

      <BlogList posts={blogPosts} categories={categories} />
    </main>
  );
}
