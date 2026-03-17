'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useCursor } from '@/components/providers/CursorProvider'
import Link from 'next/link'
import { Github, ExternalLink, Play, FileText } from 'lucide-react'
import { createClient } from '@/utils/supabase/client'
import { type Project } from '@/lib/supabase'

const supabase = createClient()

const fallbackProjects: Project[] = [
  {
    id: '1',
    title: 'AI-Powered Code Assistant',
    description: 'An intelligent code completion and generation tool using transformer models that understands context and suggests relevant code snippets.',
    long_description: 'An intelligent code completion and generation tool using transformer models...',
    image_url: '/projects/code-assistant.png',
    video_url: null,
    tags: ['Python', 'PyTorch', 'Transformers', 'NLP'],
    github_url: 'https://github.com/amirunoel/ai-code-assistant',
    live_url: 'https://ai-code-assistant.vercel.app',
    huggingface_url: 'https://huggingface.co/amirunoel/code-assistant',
    wiki_url: null,
    architecture_details: null,
    tech_stack: [],
    achievements: [],
    challenges: [],
    is_featured: true,
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Real-time Object Detection System',
    description: 'High-performance computer vision system for detecting and tracking objects in video streams with 99% accuracy.',
    long_description: 'High-performance computer vision system...',
    image_url: '/projects/object-detection.png',
    video_url: null,
    tags: ['Python', 'TensorFlow', 'OpenCV', 'YOLO'],
    github_url: 'https://github.com/amirunoel/object-detection',
    live_url: 'https://object-detection-demo.vercel.app',
    huggingface_url: null,
    wiki_url: null,
    architecture_details: null,
    tech_stack: [],
    achievements: [],
    challenges: [],
    is_featured: true,
    created_at: new Date().toISOString()
  },
]

export default function ProjectsPage() {
  const { setIsHovering } = useCursor()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  const [filter, setFilter] = useState<'all' | 'featured'>('all')
  const [projects, setProjects] = useState<Project[]>(fallbackProjects)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProjects() {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('created_at', { ascending: false })
        
        if (data && data.length > 0) {
          setProjects(data)
        }
      } catch (err) {
        console.error('Error fetching projects:', err)
      } finally {
        setLoading(false)
      }
    }
    
    fetchProjects()
  }, [])

  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter(p => p.is_featured)

  const allTags = Array.from(
    new Set(projects.flatMap(p => p.tags))
  ).sort()

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
            My <span className="gradient-text">Projects</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Explore my portfolio of AI and machine learning projects. Each project represents a unique challenge and solution in the field of artificial intelligence.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-center mb-12"
        >
          <div className="inline-flex p-1 bg-gray-900 rounded-full border border-gray-800">
            {(['all', 'featured'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  filter === tab
                    ? 'bg-white text-black'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {tab === 'all' ? 'All Projects' : 'Featured'}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <div ref={ref} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <Link href={`/projects/${project.id}`}>
                <div className="group relative h-full rounded-2xl overflow-hidden border border-gray-800 hover:border-white/50 transition-all duration-300 bg-gradient-to-b from-gray-900 to-black">
                  {/* Image */}
                  <div className="aspect-video relative overflow-hidden bg-gray-800">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                    <img
                      src={project.image_url || '/placeholder.jpg'}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {project.is_featured && (
                      <div className="absolute top-4 right-4 z-20 px-3 py-1 bg-yellow-500 text-black text-xs font-bold rounded-full">
                        Featured
                      </div>
                    )}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                      <Play className="w-12 h-12 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-white transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-white/10 rounded-full text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 3 && (
                        <span className="px-2 py-1 bg-white/10 rounded-full text-xs">
                          +{project.tags.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Links */}
                    <div className="flex gap-3 mt-auto">
                      {project.github_url && (
                        <a
                          href={project.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          onMouseEnter={(e) => {
                            e.stopPropagation()
                            setIsHovering(true)
                          }}
                          onMouseLeave={(e) => {
                            e.stopPropagation()
                            setIsHovering(false)
                          }}
                          className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                      {project.live_url && (
                        <a
                          href={project.live_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          onMouseEnter={(e) => {
                            e.stopPropagation()
                            setIsHovering(true)
                          }}
                          onMouseLeave={(e) => {
                            e.stopPropagation()
                            setIsHovering(false)
                          }}
                          className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                      {project.huggingface_url && (
                        <a
                          href={project.huggingface_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          onMouseEnter={(e) => {
                            e.stopPropagation()
                            setIsHovering(true)
                          }}
                          onMouseLeave={(e) => {
                            e.stopPropagation()
                            setIsHovering(false)
                          }}
                          className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                        >
                          🤗
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}