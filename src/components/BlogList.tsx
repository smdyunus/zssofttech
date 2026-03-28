'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import type { BlogPost } from '@/lib/data/blog';

interface BlogListProps {
  posts: BlogPost[];
  categories: string[];
}

const POSTS_PER_PAGE = 9;

export default function BlogList({ posts, categories }: BlogListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const allCategories = ['All', ...categories];
  const filteredPosts =
    selectedCategory === 'All'
      ? posts
      : posts.filter((p) => p.category === selectedCategory);
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  return (
    <>
      {/* Category Filter */}
      <section className="py-8 bg-card/50 sticky top-[72px] z-30 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3">
            {allCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setCurrentPage(1);
                }}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                  selectedCategory === cat
                    ? 'bg-gradient-primary text-white'
                    : 'bg-card border border-border text-gray-400 hover:text-primary hover:border-primary'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="text-center mt-4 text-gray-400 text-sm">
            Showing {paginatedPosts.length} of {filteredPosts.length} articles
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginatedPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-card border border-border rounded-2xl overflow-hidden hover:border-primary transition-all group"
              >
                <div className="relative h-48 bg-gradient-to-br from-primary/20 to-secondary/20">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={post.image}
                    alt={post.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-primary/90 text-white text-xs font-semibold rounded-full">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(post.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-gray-400 text-sm line-clamp-3">{post.excerpt}</p>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:gap-3 transition-all"
                  >
                    Read More <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-16 flex justify-center items-center gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-3 rounded-lg bg-card border border-border text-gray-400 hover:text-primary hover:border-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 rounded-lg font-semibold transition-all ${
                    currentPage === page
                      ? 'bg-gradient-primary text-white'
                      : 'bg-card border border-border text-gray-400 hover:text-primary hover:border-primary'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-3 rounded-lg bg-card border border-border text-gray-400 hover:text-primary hover:border-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
