import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { blogPosts, getBlogPostBySlug } from '@/lib/data/blog';
import BlogArticleClient from './BlogArticleClient';

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return { title: 'Article Not Found' };
  return { title: `${post.title} | ZS Soft Tech Blog`, description: post.excerpt, keywords: post.tags.join(', ') };
}

export default async function BlogArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();
  const relatedPosts = blogPosts.filter((p) => p.category === post.category && p.id !== post.id).slice(0, 3);
  return <BlogArticleClient post={post} relatedPosts={relatedPosts} />;
}
