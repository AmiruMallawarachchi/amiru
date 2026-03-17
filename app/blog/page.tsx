'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useCursor } from '@/components/providers/CursorProvider'
import Link from 'next/link'
import { Calendar, Clock, ExternalLink, ArrowRight } from 'lucide-react'

interface MediumPost {
  title: string;
  pubDate: string;
  link: string;
  guid: string;
  author: string;
  thumbnail: string;
  description: string;
  content: string;
  categories: string[];
}

export default function BlogPage() {
  const { setIsHovering } = useCursor()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  
  const [posts, setPosts] = useState<MediumPost[]>([])
  const [filter, setFilter] = useState<string>('all')
  const [loading, setLoading] = useState(true)

  // Fetch Medium posts via RSS-to-JSON
  import('react').then((React) => {
    React.useEffect(() => {
      async function fetchMediumPosts() {
        try {
          const res = await fetch('https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@amirunoel8')
          const data = await res.json()
          if (data.status === 'ok') {
            setPosts(data.items)
          }
        } catch (error) {
          console.error("Failed to fetch Medium posts:", error)
        } finally {
          setLoading(false)
        }
      }
      fetchMediumPosts()
    }, [])
  })

  // Extract unique tags/categories
  const allTags = Array.from(
    new Set(posts.flatMap(p => p.categories))
  ).sort()

  const filteredPosts = filter === 'all'
    ? posts
    : posts.filter(p => p.categories.includes(filter))

  // Treat first post as featured if any exist
  const featuredPosts = posts.length > 0 ? [posts[0]] : []
  // Remaining posts for standard grid
  const gridPosts = posts.length > 0 ? filteredPosts.filter(p => p.guid !== posts[0].guid) : filteredPosts

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
        {loading ? (
           <div className="flex justify-center items-center h-64">
              <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
           </div>
        ) : featuredPosts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-16"
          >
            <h2 className="text-2xl font-bold mb-8">Latest Article</h2>
            <div className="grid md:grid-cols-1 gap-8 max-w-4xl mx-auto">
              {featuredPosts.map((post) => (
                <FeaturedPostCard key={post.guid} post={post} />
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
          {!loading && gridPosts.map((post, index) => (
            <motion.div
              key={post.guid}
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
            href="https://medium.com/@amirunoel8"
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

// Function to extract text content from Medium HTML description
const getTextFromHtml = (html: string) => {
  if (typeof window === 'undefined') return html.replace(/<[^>]+>/g, '').substring(0, 150) + '...';
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const text = doc.body.textContent || "";
  return text.substring(0, 150) + '...';
};

// Featured Post Card Component
function FeaturedPostCard({ post }: { post: MediumPost }) {
  const { setIsHovering } = useCursor()

  // Find the first image in the description if thumbnail is empty
  let imageUrl = post.thumbnail;
  if (!imageUrl || imageUrl.includes("stat?event=post.login")) {
     const imgMatch = post.description.match(/<img[^>]+src="([^">]+)"/);
     imageUrl = imgMatch ? imgMatch[1] : '/placeholder.jpg';
  }

  return (
    <motion.a
      href={post.link}
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
          src={imageUrl}
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
            {new Date(post.pubDate).toLocaleDateString()}
          </div>
        </div>

        <h3 className="text-2xl font-bold mb-4 group-hover:text-white transition-colors line-clamp-2">
          {post.title}
        </h3>

        <p className="text-gray-400 mb-6 line-clamp-3">
          {getTextFromHtml(post.description)}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {post.categories.slice(0, 3).map((tag: string) => (
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
function BlogPostCard({ post }: { post: MediumPost }) {
  const { setIsHovering } = useCursor()

  let imageUrl = post.thumbnail;
  if (!imageUrl || imageUrl.includes("stat?event=post.login")) {
     const imgMatch = post.description.match(/<img[^>]+src="([^">]+)"/);
     imageUrl = imgMatch ? imgMatch[1] : '/placeholder.jpg';
  }

  return (
    <motion.a
      href={post.link}
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
          src={imageUrl}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
          <span>{new Date(post.pubDate).toLocaleDateString()}</span>
        </div>

        <h3 className="text-lg font-bold mb-2 group-hover:text-white transition-colors line-clamp-2">
          {post.title}
        </h3>

        <p className="text-gray-400 text-sm mb-4 line-clamp-3">
          {getTextFromHtml(post.description)}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {post.categories.slice(0, 2).map((tag: string) => (
            <span
              key={tag}
              className="px-2 py-1 bg-white/10 rounded-full text-xs"
            >
              {tag}
            </span>
          ))}
          {post.categories.length > 2 && (
            <span className="px-2 py-1 bg-white/10 rounded-full text-xs">
              +{post.categories.length - 2}
            </span>
          )}
        </div>
      </div>
    </motion.a>
  )
}