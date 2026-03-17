'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useCursor } from '@/components/providers/CursorProvider'
import { Github, ExternalLink, ArrowLeft, Play, FileText, BookOpen, Code } from 'lucide-react'
import { createClient } from '@/utils/supabase/client'
import { type Project } from '@/lib/supabase'

const supabase = createClient()

export default function ProjectDetail() {
  const params = useParams()
  const router = useRouter()
  const { setIsHovering } = useCursor()
  const [activeTab, setActiveTab] = useState<'overview' | 'architecture' | 'tech'>('overview')
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProject() {
      if (!params.id) return
      
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .eq('id', params.id as string)
          .single()
          
        if (data) {
          setProject(data)
        }
      } catch (err) {
        console.error('Error fetching project:', err)
      } finally {
        setLoading(false)
      }
    }
    
    fetchProject()
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-400">Loading project details...</p>
        </div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Project not found</h2>
          <button 
            onClick={() => router.back()}
            className="px-6 py-2 border border-white rounded-full hover:bg-white hover:text-black transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section with Video/Image */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10" />

        {/* Background Video/Image */}
        <div className="absolute inset-0">
          {project.video_url ? (
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            >
              <source src={project.video_url} type="video/mp4" />
            </video>
          ) : (
            <img
              src={project.image_url || '/placeholder.jpg'}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          )}
        </div>

        {/* Content */}
        <div className="relative z-20 text-center px-6 max-w-4xl mx-auto">
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => router.back()}
            whileHover={{ scale: 1.05 }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            className="mb-8 flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Projects
          </motion.button>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            {project.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-gray-300 mb-8"
          >
            {project.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap gap-3 justify-center mb-12"
          >
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            {project.github_url && (
              <motion.a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                className="px-6 py-3 bg-white text-black rounded-full font-semibold flex items-center gap-2"
              >
                <Github className="w-5 h-5" />
                View Code
              </motion.a>
            )}
            {project.live_url && (
              <motion.a
                href={project.live_url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                className="px-6 py-3 border-2 border-white rounded-full font-semibold flex items-center gap-2"
              >
                <Play className="w-5 h-5" />
                Live Demo
              </motion.a>
            )}
            {project.huggingface_url && (
              <motion.a
                href={project.huggingface_url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                className="px-6 py-3 border-2 border-white rounded-full font-semibold"
              >
                🤗 HuggingFace
              </motion.a>
            )}
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        >
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse" />
          </div>
        </motion.div>
      </section>

      {/* Details Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          {/* Tabs */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex p-1 bg-gray-900 rounded-full border border-gray-800">
              {[
                { id: 'overview', label: 'Overview', icon: FileText },
                { id: 'architecture', label: 'Architecture', icon: Code },
                { id: 'tech', label: 'Tech Stack', icon: BookOpen },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                    activeTab === tab.id
                      ? 'bg-white text-black'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {activeTab === 'overview' && (
              <div className="prose prose-invert max-w-none">
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="md:col-span-2">
                    <h3 className="text-2xl font-bold mb-6">About the Project</h3>
                    <div className="space-y-4 text-gray-300 whitespace-pre-wrap">
                      {project.long_description}
                    </div>

                    {project.achievements && project.achievements.length > 0 && (
                      <>
                        <h3 className="text-2xl font-bold mt-12 mb-6">Key Achievements</h3>
                        <ul className="space-y-3">
                          {project.achievements.map((achievement, index) => (
                            <li key={index} className="flex items-center text-gray-300">
                              <span className="text-green-400 mr-3">✓</span>
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </>
                    )}

                    {project.challenges && project.challenges.length > 0 && (
                      <>
                        <h3 className="text-2xl font-bold mt-12 mb-6">Challenges Overcome</h3>
                        <ul className="space-y-3">
                          {project.challenges.map((challenge, index) => (
                            <li key={index} className="flex items-center text-gray-300">
                              <span className="text-yellow-400 mr-3">◆</span>
                              {challenge}
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>

                  <div>
                    <div className="sticky top-8 space-y-6">
                      <div className="p-6 rounded-2xl bg-gradient-to-b from-gray-900 to-black border border-gray-800">
                        <h4 className="font-bold mb-4">Quick Links</h4>
                        <div className="space-y-3">
                          {project.github_url && (
                            <a
                              href={project.github_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-gray-300 hover:text-white"
                            >
                              <Github className="w-4 h-4" />
                              Source Code
                            </a>
                          )}
                          {project.wiki_url && (
                            <a
                              href={project.wiki_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-gray-300 hover:text-white"
                            >
                              <FileText className="w-4 h-4" />
                              Documentation
                            </a>
                          )}
                          {project.live_url && (
                            <a
                              href={project.live_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-gray-300 hover:text-white"
                            >
                              <ExternalLink className="w-4 h-4" />
                              Live Demo
                            </a>
                          )}
                        </div>
                      </div>

                      <div className="p-6 rounded-2xl bg-gradient-to-b from-gray-900 to-black border border-gray-800">
                        <h4 className="font-bold mb-4">Project Stats</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Stars</span>
                            <span>2.5k+</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Forks</span>
                            <span>350+</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Contributors</span>
                            <span>45</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'architecture' && (
              <div>
                <h3 className="text-2xl font-bold mb-6">System Architecture</h3>
                <div className="bg-gray-900 rounded-2xl p-8 mb-8">
                  <pre className="text-gray-300 whitespace-pre-wrap font-mono relative overflow-x-auto text-sm">
                    {project.architecture_details || "Architecture details not provided."}
                  </pre>
                </div>

                {/* Architecture Diagram */}
                <div className="bg-gradient-to-b from-gray-900 to-black rounded-2xl p-8 border border-gray-800">
                  <h4 className="font-bold mb-6 text-center">Architecture Overview</h4>
                  <div className="aspect-video flex items-center justify-center">
                    <div className="text-gray-500 text-center">
                      <Code className="w-16 h-16 mx-auto mb-4" />
                      <p>Architecture diagram would be displayed here</p>
                      <p className="text-sm mt-2">Interactive diagram showing system components and data flow</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'tech' && (
              <div>
                <h3 className="text-2xl font-bold mb-6">Technology Stack</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {project.tech_stack && project.tech_stack.length > 0 ? (
                    project.tech_stack.map((tech, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                        className="p-6 rounded-2xl bg-gradient-to-b from-gray-900 to-black border border-gray-800"
                      >
                        <h4 className="text-lg font-bold mb-2">{tech.name}</h4>
                        <p className="text-gray-400 text-sm">{tech.description}</p>
                      </motion.div>
                    ))
                  ) : (
                    <p className="text-gray-400">Tech stack details not provided.</p>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  )
}