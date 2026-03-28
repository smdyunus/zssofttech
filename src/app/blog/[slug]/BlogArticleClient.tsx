'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Calendar, Clock, User, ArrowRight } from 'lucide-react';
import type { BlogPost } from '@/lib/data/blog';

interface Props {
  post: BlogPost;
  relatedPosts: BlogPost[];
}

export default function BlogArticleClient({ post, relatedPosts }: Props) {
  const paragraphs = post.content.split('\n\n').filter(Boolean);

  return (
    <main className="min-h-screen bg-background">
      <section className="relative py-16 bg-gradient-to-b from-card to-background">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-8">
            <Link href="/" className="hover:text-primary">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-primary">Blog</Link>
            <span>/</span>
            <span className="text-primary">{post.category}</span>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto text-center space-y-6">
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold">{post.category}</span>
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground leading-tight">{post.title}</h1>
            <div className="flex flex-wrap justify-center items-center gap-6 text-gray-400 text-sm">
              <span className="flex items-center gap-2"><User className="w-4 h-4 text-primary" />{post.author}</span>
              <span className="flex items-center gap-2"><Calendar className="w-4 h-4 text-primary" />{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-primary" />{post.readTime} read</span>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-8">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-4xl mx-auto relative h-64 lg:h-80 rounded-2xl overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
          </motion.div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <article className="text-gray-300 leading-relaxed space-y-4">
              {paragraphs.map((para, i) => {
                if (para.startsWith('## ')) {
                  return <h2 key={i} className="text-xl font-bold text-foreground mt-8 mb-2">{para.replace('## ', '')}</h2>;
                }
                return <p key={i} className="text-base">{para}</p>;
              })}
            </article>
          </div>
        </div>
      </section>

      <section className="py-16 bg-card/30">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Related Articles</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {relatedPosts.map((p) => (
              <Link key={p.id} href={`/blog/${p.slug}`} className="group p-6 rounded-2xl border border-border hover:border-primary bg-card/50 transition-all">
                <h3 className="font-bold text-foreground group-hover:text-primary transition-colors mb-2 line-clamp-2">{p.title}</h3>
                <p className="text-sm text-gray-400 line-clamp-2 mb-4">{p.excerpt}</p>
                <span className="text-primary text-sm font-medium flex items-center gap-1">Read More <ArrowRight className="w-3 h-3" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
