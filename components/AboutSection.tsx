'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'
import { useCursor } from '@/components/providers/CursorProvider'
import { ImageSequence } from '@/components/ImageSequence'

export const AboutSection = ({ mousePosition }: { mousePosition?: { x: number; y: number } }) => {
  const { setIsHovering } = useCursor()
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Track the scroll of the entire container (e.g. 300vh tall)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'] // starts when top of container hits top of viewport, ends when bottom hits bottom
  })

  // We can also use scrollYProgress to fade text in and out linearly for that Apple-like presentation
  const textOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [1, 1, 0, 0])
  const textY = useTransform(scrollYProgress, [0, 0.5], [0, -100])

  const skills = [
    'Machine Learning',
    'Deep Learning',
    'Natural Language Processing',
    'Computer Vision',
    'Reinforcement Learning',
    'MLOps',
  ]

  return (
    <section ref={containerRef} id="about" className="relative h-[300vh] bg-black">
      {/* Sticky Container - this stays on screen while the parent 300vh scrolls */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* Apple-style background fade or gradient can be placed here */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/20 to-black pointer-events-none" />

        <div className="container mx-auto px-6 h-full flex flex-col lg:flex-row items-center relative z-10">
          
          {/* Text Content */}
          <motion.div
            style={{ opacity: textOpacity, y: textY }}
            className="w-full lg:w-1/2 space-y-8 z-20"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-8">
              About <span className="gradient-text">Me</span>
            </h2>
            
            <h3 className="text-3xl font-bold">GEN AI Engineer & Innovator</h3>
            <p className="text-lg text-gray-300 leading-relaxed">
              I'm a passionate AI engineer with a deep love for creating intelligent systems that solve real-world problems.
              My journey in artificial intelligence has been driven by curiosity and the desire to push the boundaries of what's possible.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              With expertise spanning from traditional machine learning to cutting-edge generative AI, I thrive on developing
              solutions that not only work but inspire. I believe in the power of AI to transform industries and improve lives.
            </p>

            {/* Skills Pills */}
            <div className="flex flex-wrap gap-3 mt-8">
              {skills.map((skill) => (
                <span
                  key={skill}
                  onMouseEnter={() => { setHoveredSkill(skill); setIsHovering(true); }}
                  onMouseLeave={() => { setHoveredSkill(null); setIsHovering(false); }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-none ${
                    hoveredSkill === skill
                      ? 'bg-white text-black scale-110'
                      : 'border border-gray-600 text-gray-300 hover:bg-white hover:text-black'
                  }`}
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* Quote */}
            <div className="mt-12 p-6 border-l-4 border-white">
              <p className="text-xl text-gray-300 italic">
                "The best way to predict the future is to invent it."
              </p>
              <p className="mt-2 text-gray-400">- Alan Kay</p>
            </div>
          </motion.div>

          {/* 3D Laptop Visualization (Image Sequence Scroll) */}
          <div className="w-full lg:w-1/2 h-[50vh] lg:h-[80vh] relative z-10 mt-12 lg:mt-0">
            {/* The ImageSequence observes the scrollYProgress from Framer Motion */}
            <ImageSequence progress={scrollYProgress} />
            
            {/* Floating Labels */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute top-10 right-10 px-4 py-2 bg-white/10 border border-white/20 backdrop-blur-md rounded-full text-sm hidden md:block"
            >
              AI/ML Expert
            </motion.div>

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1 }}
              className="absolute bottom-10 left-10 px-4 py-2 bg-white/10 border border-white/20 backdrop-blur-md rounded-full text-sm hidden md:block"
            >
              Innovation Driven
            </motion.div>
          </div>
        </div>
        
      </div>
    </section>
  )
}