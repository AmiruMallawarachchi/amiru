'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useCursor } from '../components/providers/CursorProvider'
import Link from 'next/link'
import { Github, ExternalLink, Play, FileText } from 'lucide-react'

const projects = [
  {
    id: 1,
    title: 'AI-Powered Code Assistant',
    description: 'An intelligent code completion and generation tool using transformer models that understands context and suggests relevant code snippets.',
    image: '/projects/code-assistant.png',
    tags: ['Python', 'PyTorch', 'Transformers', 'NLP'],
    github: 'https://github.com/amirunoel/ai-code-assistant',
    live: 'https://ai-code-assistant.vercel.app',
    huggingface: 'https://huggingface.co/amirunoel/code-assistant',
    featured: true,
  },
  {
    id: 2,
    title: 'Real-time Object Detection System',
    description: 'High-performance computer vision system for detecting and tracking objects in video streams with 99% accuracy.',
    image: '/projects/object-detection.png',
    tags: ['Python', 'TensorFlow', 'OpenCV', 'YOLO'],
    github: 'https://github.com/amirunoel/object-detection',
    live: 'https://object-detection-demo.vercel.app',
    featured: true,
  },
  {
    id: 3,
    title: 'Neural Style Transfer API',
    description: 'RESTful API service that applies artistic styles to images using deep neural networks, supporting custom model training.',
    image: '/projects/style-transfer.png',
    tags: ['FastAPI', 'PyTorch', 'Docker', 'AWS'],
    github: 'https://github.com/amirunoel/style-transfer-api',
    live: 'https://style-transfer-api.io',
    featured: false,
  },
  {
    id: 4,
    title: 'LLM Chatbot with RAG',
    description: 'Advanced conversational AI with Retrieval-Augmented Generation for domain-specific question answering.',
    image: '/projects/llm-chatbot.png',
    tags: ['LangChain', 'Vector DB', 'OpenAI', 'Next.js'],
    github: 'https://github.com/amirunoel/llm-chatbot',
    live: 'https://llm-chatbot-demo.vercel.app',
    featured: false,
  },
  {
    id: 5,
    title: 'Sentiment Analysis Dashboard',
    description: 'Real-time sentiment analysis tool for social media monitoring with interactive visualizations.',
    image: '/projects/sentiment-analysis.png',
    tags: ['Python', 'Scikit-learn', 'React', 'D3.js'],
    github: 'https://github.com/amirunoel/sentiment-dashboard',
    featured: false,
  },
  {
    id: 6,
    title: 'AI Music Generator',
    description: 'Generative AI model that creates original music compositions in various styles and genres.',
    image: '/projects/music-generator.png',
    tags: ['PyTorch', 'Magenta', 'MIDI', 'React'],
    github: 'https://github.com/amirunoel/ai-music-generator',
    huggingface: 'https://huggingface.co/amirunoel/music-generator',
    featured: false,
  },
]

export default function ProjectsPage() {
  const { setIsHovering } = useCursor()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  const [filter, setFilter] = useState<'all' | 'featured'>('all')

  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter(p => p.featured)

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
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {project.featured && (
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
                    <div className="flex gap-3">
                      {project.github && (
                        <a
                          href={project.github}
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
                      {project.live && (
                        <a
                          href={project.live}
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
                      {project.huggingface && (
                        <a
                          href={project.huggingface}
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