'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useCursor } from '@/components/providers/CursorProvider'
import { Code, Database, Brain, Cloud, Cpu, BarChart } from 'lucide-react'

const skillsCategories = [
  {
    icon: Brain,
    title: 'AI & Machine Learning',
    skills: ['TensorFlow', 'PyTorch', 'Keras', 'Scikit-learn', 'Hugging Face', 'OpenAI APIs', 'LangChain', 'Vector Databases'],
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Code,
    title: 'Programming',
    skills: ['Python', 'TypeScript', 'JavaScript', 'Go', 'SQL', 'Bash'],
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Cloud,
    title: 'Cloud & DevOps',
    skills: ['AWS', 'GCP', 'Azure', 'Docker', 'Kubernetes', 'CI/CD', 'Terraform'],
    color: 'from-green-500 to-teal-500',
  },
  {
    icon: Database,
    title: 'Data & Analytics',
    skills: ['PostgreSQL', 'MongoDB', 'Redis', 'BigQuery', 'Spark', 'Databricks'],
    color: 'from-orange-500 to-red-500',
  },
  {
    icon: Cpu,
    title: 'Frameworks & Tools',
    skills: ['Next.js', 'React', 'Node.js', 'FastAPI', 'Django', 'Git'],
    color: 'from-indigo-500 to-purple-500',
  },
  {
    icon: BarChart,
    title: 'Specializations',
    skills: ['Computer Vision', 'NLP', 'Reinforcement Learning', 'MLOps', 'Prompt Engineering', 'RAG'],
    color: 'from-yellow-500 to-orange-500',
  },
]

export const SkillsSection = () => {
  const { setIsHovering } = useCursor()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section ref={ref} className="relative py-20 px-6 bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="container mx-auto max-w-7xl">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold text-center mb-16"
        >
          Technical <span className="gradient-text">Skills</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillsCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              className="group relative overflow-hidden rounded-xl border border-gray-800 bg-gray-900/50 backdrop-blur-sm p-6"
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

              {/* Icon and Title */}
              <div className="flex items-center mb-6">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className={`p-3 rounded-lg bg-gradient-to-br ${category.color}`}
                >
                  <category.icon className="w-6 h-6 text-white" />
                </motion.div>
                <h3 className="ml-4 text-xl font-bold">{category.title}</h3>
              </div>

              {/* Skills Grid */}
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <motion.span
                    key={skill}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="px-3 py-1 text-xs font-medium bg-white/10 rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>

              {/* Glow Effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur opacity-0 group-hover:opacity-20 transition duration-1000" />
            </motion.div>
          ))}
        </div>

        {/* Achievement Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 grid md:grid-cols-3 gap-8"
        >
          {[
            { number: '3+', label: 'Years of Experience' },
            { number: '50+', label: 'AI Projects' },
            { number: '10+', label: 'Technologies Mastered' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              whileHover={{ scale: 1.05 }}
              className="text-center p-8 rounded-2xl bg-gradient-to-b from-gray-800 to-gray-900 border border-gray-700"
            >
              <div className="text-5xl font-bold gradient-text mb-2">{stat.number}</div>
              <div className="text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}