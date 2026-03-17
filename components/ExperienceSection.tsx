'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useCursor } from '@/components/providers/CursorProvider'
import { Briefcase, Calendar, MapPin } from 'lucide-react'

const experiences = [
  {
    title: 'GEN AI Engineer',
    company: 'Tech Innovations Inc.',
    location: 'San Francisco, CA',
    period: '2022 - Present',
    description: [
      'Leading development of cutting-edge generative AI solutions for enterprise clients',
      'Implementing large language models and fine-tuning for specific domains',
      'Architecting RAG systems and vector databases for knowledge retrieval',
      'Collaborating with cross-functional teams to deploy AI models at scale',
    ],
  },
  {
    title: 'AI Research Engineer',
    company: 'DeepMind Research',
    location: 'London, UK',
    period: '2021 - 2022',
    description: [
      'Conducted research on reinforcement learning algorithms',
      'Published papers on neural network optimization',
      'Developed proof-of-concept AI solutions for real-world problems',
      'Mentored junior researchers and engineers',
    ],
  },
  {
    title: 'Machine Learning Intern',
    company: 'Google AI',
    location: 'Mountain View, CA',
    period: '2020 - 2021',
    description: [
      'Worked on natural language processing projects',
      'Implemented and optimized ML pipelines',
      'Contributed to open-source AI libraries',
      'Participated in internal ML hackathons and competitions',
    ],
  },
]

export const ExperienceSection = () => {
  const { setIsHovering } = useCursor()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section ref={ref} className="relative py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold text-center mb-16"
        >
          Professional <span className="gradient-text">Experience</span>
        </motion.h2>

        <div className="relative">
          {/* Timeline Line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-transparent via-white to-transparent" />

          {experiences.map((exp, index) => (
            <motion.div
              key={exp.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className={`relative flex items-center mb-12 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Timeline Dot */}
              <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white rounded-full border-4 border-black" />

              {/* Content Card */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                className={`w-full md:w-5/12 p-8 rounded-2xl bg-gradient-to-b from-gray-900 to-black border border-gray-800 ${
                  index % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'
                }`}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold mb-1">{exp.title}</h3>
                    <p className="text-lg text-gray-300">{exp.company}</p>
                  </div>
                  <Briefcase className="w-8 h-8 text-gray-400" />
                </div>

                {/* Meta Info */}
                <div className="flex flex-wrap gap-4 mb-6 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{exp.period}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{exp.location}</span>
                  </div>
                </div>

                {/* Description */}
                <ul className="space-y-2 text-gray-300">
                  {exp.description.map((item, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-green-400 mr-2">▸</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-5 blur-3xl"
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              delay: i * 0.5,
            }}
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + i * 15}%`,
            }}
          />
        ))}
      </div>
    </section>
  )
}