'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useCursor } from './providers/CursorProvider'
import { Heart, Brain, Zap, Globe, BookOpen, Music, Gamepad2, Camera } from 'lucide-react'

const interests = [
  {
    icon: Brain,
    title: 'AI Ethics',
    description: 'Exploring the ethical implications of artificial intelligence and ensuring responsible AI development.',
    color: 'from-purple-500 to-indigo-500',
  },
  {
    icon: Zap,
    title: 'Innovation',
    description: 'Passionate about emerging technologies and their potential to transform industries.',
    color: 'from-yellow-500 to-orange-500',
  },
  {
    icon: Globe,
    title: 'Open Source',
    description: 'Contributing to the open-source community and building collaborative AI solutions.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: BookOpen,
    title: 'Knowledge Sharing',
    description: 'Writing technical blogs and creating educational content about AI/ML concepts.',
    color: 'from-green-500 to-teal-500',
  },
  {
    icon: Music,
    title: 'Music Production',
    description: 'Creating electronic music and exploring AI-generated compositions.',
    color: 'from-pink-500 to-rose-500',
  },
  {
    icon: Gamepad2,
    title: 'Gaming',
    description: 'Enthusiastic about game development and AI in gaming experiences.',
    color: 'from-red-500 to-orange-500',
  },
  {
    icon: Camera,
    title: 'Photography',
    description: 'Capturing moments and exploring computational photography techniques.',
    color: 'from-gray-500 to-gray-300',
  },
  {
    icon: Heart,
    title: 'Wellness',
    description: 'Advocate for mental health awareness and work-life balance in tech.',
    color: 'from-rose-500 to-pink-500',
  },
]

export const InterestsSection = () => {
  const { setIsHovering } = useCursor()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [hearts, setHearts] = useState<{ xRange: number[]; duration: number; delay: number }[]>([])

  useEffect(() => {
    const newHearts = [...Array(5)].map(() => ({
      xRange: [0, Math.random() * 100 - 50, 0],
      duration: 5 + Math.random() * 5,
      delay: Math.random() * 5,
    }))
    setHearts(newHearts)
  }, [])

  return (
    <section ref={ref} className="relative py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold text-center mb-16"
        >
          Beyond <span className="gradient-text">Code</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center text-lg text-gray-300 mb-16 max-w-3xl mx-auto"
        >
          When I'm not building AI solutions, you'll find me exploring these passions that fuel my creativity and drive innovation.
        </motion.p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {interests.map((interest, index) => (
            <motion.div
              key={interest.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -10 }}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              className="group relative p-6 rounded-2xl bg-gradient-to-b from-gray-900 to-black border border-gray-800 hover:border-white/30 transition-all duration-300 overflow-hidden"
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${interest.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

              {/* Icon */}
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className={`mb-4 p-3 rounded-xl bg-gradient-to-br ${interest.color} w-fit`}
              >
                <interest.icon className="w-6 h-6 text-white" />
              </motion.div>

              {/* Content */}
              <h3 className="text-lg font-bold mb-2">{interest.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{interest.description}</p>

              {/* Glow Effect */}
              <div className={`absolute -inset-1 bg-gradient-to-r ${interest.color} rounded-xl blur opacity-0 group-hover:opacity-20 transition duration-500`} />
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 text-center"
        >
          <p className="text-xl text-gray-300 mb-8">
            Always open to collaborating on interesting projects and ideas.
          </p>
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            className="inline-block px-8 py-4 bg-white text-black rounded-full font-semibold hover:shadow-xl hover:shadow-white/50 transition-all duration-300"
          >
            Let's Connect
          </motion.a>
        </motion.div>
      </div>

      {/* Floating Hearts */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {hearts.map((heart, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${10 + i * 15}%`,
              bottom: '0',
            }}
            animate={{
              y: [0, -100, -200],
              opacity: [0, 1, 0],
              x: heart.xRange,
            }}
            transition={{
              duration: heart.duration,
              repeat: Infinity,
              delay: heart.delay,
            }}
          >
            <Heart className="w-4 h-4 text-red-500 opacity-30" fill="white" />
          </motion.div>
        ))}
      </div>
    </section>
  )
}