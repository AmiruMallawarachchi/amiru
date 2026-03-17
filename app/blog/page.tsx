'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useCursor } from '../components/providers/CursorProvider'
import Link from 'next/link'
import { Calendar, Clock, ExternalLink, ArrowRight } from 'lucide-react'

// Mock blog posts - In production, these would come from Medium API
const blogPosts = [
  {
    id: 1,
    title: 'Building Scalable AI Applications with Next.js and Python',
    excerpt: 'Learn how to create production-ready AI applications using Next.js for the frontend and Python for the AI backend. This guide covers everything from setup to deployment.',
    image: '/blog/nextjs-python-ai.jpg',
    publishedAt: '2024-03-15',
    readTime: '8 min read',
    tags: ['Next.js', 'Python', 'AI', 'Tutorial'],
    url: 'https://medium.com/@amirunoel/building-scalable-ai-applications',
    featured: true,
  },
  {
    id: 2,
    title: 'Understanding Transformer Models: A Deep Dive',
    excerpt: 'Explore the architecture and inner workings of transformer models that power modern AI systems like GPT and BERT.',
    image: '/blog/transformer-models.jpg',
    publishedAt: '2024-02-28',
    readTime: '12 min read',
    tags: ['Deep Learning', 'Transformers', 'NLP'],
    url: 'https://medium.com/@amirunoel/understanding-transformer-models',
    featured: false,
  },
  {
    id: 3,
    title: 'Optimizing Neural Networks for Production',
    excerpt: 'Practical techniques for optimizing and deploying neural networks in production environments, including quantization, pruning, and distillation.',
    image: '/blog/optimizing-nn-production.jpg',
    publishedAt: '2024-02-10',
    readTime: '10 min read',
    tags: ['Neural Networks', 'Optimization', 'MLOps'],
    url: 'https://medium.com/@amirunoel/optimizing-neural-networks',
    featured: false,
  },
  {
    id: 4,
    title: 'The Future of Generative AI: Trends and Predictions',
    excerpt: 'An analysis of current trends in generative AI and predictions for where the field is heading in the next few years.',
    image: '/blog/future-gen-ai.jpg',
    publishedAt: '2024-01-25',
    readTime: '6 min read',
    tags: ['Generative AI', 'Future', 'Trends'],
    url: 'https://medium.com/@amirunoel/future-of-generative-ai',
    featured: true,
  },
  {
    id: 5,
    title: 'Implementing RAG Systems with Vector Databases',
    excerpt: 'A comprehensive guide to building Retrieval-Augmented Generation systems using vector databases for efficient knowledge retrieval.',
    image: '/blog/rag-systems.jpg',
    publishedAt: '2024-01-10',
    readTime: '9 min read',
    tags: ['RAG', 'Vector DB', 'LLM'],
    url: 'https://medium.com/@amirunoel/implementing-rag-systems',
    featured: false,
  },
  {
    id: 6,
    title: 'Ethical Considerations in AI Development',
    excerpt: 'Exploring the ethical implications of AI development and how to build responsible AI systems.',
    image: '/blog/ai-ethics.jpg',
    publishedAt: '2023-12-20',
    readTime: '7 min read',
    tags: ['AI Ethics', 'Responsible AI'],
    url: 'https://medium.com/@amirunoel/ethical-considerations-in-ai',
    featured: false,
  },
]

export default function BlogPage() {
  const { setIsHovering } = useCursor()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  const [filter, setFilter] = useState<string>('all')

  const allTags = Array.from(
    new Set(blogPosts.flatMap(p => p.tags))
  ).sort()

  const filteredPosts = filter === 'all'
    ? blogPosts
    : blogPosts.filter(p => p.tags.includes(filter))

  const featuredPosts = blogPosts.filter(p => p.featured)

  return (
    <div className="min-h-screen bg-black text-white px-6 py-20">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            My <span className="gradient-text">Blog</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Thoughts, tutorials, and insights about artificial intelligence, machine learning, and software development.
            All articles are published on Medium.
          </p>
        </motion.div>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-16"
          >
            <h2 className="text-2xl font-bold mb-8">Featured Articles</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredPosts.map((post) => (
                <FeaturedPostCard key={post.id} post={post} />
              ))}
            </div>
          </motion.div>
        )}

        {/* Filter Tags */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-wrap gap-3 justify-center mb-12"
        >
          <button
            onClick={() => setFilter('all')}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              filter === 'all'
                ? 'bg-white text-black'
                : 'border border-gray-700 text-gray-400 hover:text-white'
            }`}
          >
            All Posts
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setFilter(tag)}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                filter === tag
                  ? 'bg-white text-black'
                  : 'border border-gray-700 text-gray-400 hover:text-white'
              }`}
            >
              {tag}
            </button>
          ))}
        </motion.div>

        {/* Posts Grid */}
        <div ref={ref} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <BlogPostCard post={post} />
            </motion.div>
          ))}
        </div>

        {/* Load More */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-16"
        >
          <motion.a
            href="https://medium.com/@amirunoel"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            className="inline-flex items-center gap-2 px-8 py-3 border-2 border-white rounded-full font-semibold hover:bg-white hover:text-black transition-all duration-300"
          >
            View All on Medium
            <ExternalLink className="w-5 h-5" />
          </motion.a>
        </motion.div>
      </div>
    </div>
  )
}

// Featured Post Card Component
function FeaturedPostCard({ post }: { post: any }) {
  const { setIsHovering } = useCursor()

  return (
    <motion.a
      href={post.url}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.02 }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className="group relative h-full rounded-2xl overflow-hidden border border-gray-800 hover:border-white/50 transition-all duration-300 bg-gradient-to-b from-gray-900 to-black"
    >
      {/* Image */}
      <div className="aspect-video relative overflow-hidden bg-gray-800">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute top-4 left-4 px-3 py-1 bg-yellow-500 text-black text-xs font-bold rounded-full">
          Featured
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            {new Date(post.publishedAt).toLocaleDateString()}
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            {post.readTime}
          </div>
        </div>

        <h3 className="text-2xl font-bold mb-4 group-hover:text-white transition-colors line-clamp-2">
          {post.title}
        </h3>

        <p className="text-gray-400 mb-6 line-clamp-3">
          {post.excerpt}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {post.tags.slice(0, 3).map((tag: string) => (
            <span
              key={tag}
              className="px-3 py-1 bg-white/10 rounded-full text-xs"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-2 text-white group-hover:gap-3 transition-all duration-300">
          Read More
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>

      {/* Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-purple-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.a>
  )
}

// Blog Post Card Component
function BlogPostCard({ post }: { post: any }) {
  const { setIsHovering } = useCursor()

  return (
    <motion.a
      href={post.url}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.02 }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className="group h-full rounded-2xl overflow-hidden border border-gray-800 hover:border-white/30 transition-all duration-300 bg-gradient-to-b from-gray-900 to-black"
    >
      {/* Image */}
      <div className="aspect-video relative overflow-hidden bg-gray-800">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
          <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
          <span>•</span>
          <span>{post.readTime}</span>
        </div>

        <h3 className="text-lg font-bold mb-2 group-hover:text-white transition-colors line-clamp-2">
          {post.title}
        </h3>

        <p className="text-gray-400 text-sm mb-4 line-clamp-3">
          {post.excerpt}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {post.tags.slice(0, 2).map((tag: string) => (
            <span
              key={tag}
              className="px-2 py-1 bg-white/10 rounded-full text-xs"
            >
              {tag}
            </span>
          ))}
          {post.tags.length > 2 && (
            <span className="px-2 py-1 bg-white/10 rounded-full text-xs">
              +{post.tags.length - 2}
            </span>
          )}
        </div>
      </div>
    </motion.a>
  )
}