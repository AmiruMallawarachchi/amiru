'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useScroll } from 'framer-motion'
import { Sparkles, Download, Mail, Github, Linkedin, Twitter } from 'lucide-react'
import { useCursor } from '@/components/providers/CursorProvider'
import { Hero } from '@/components/Hero'
import { AboutSection } from '@/components/AboutSection'
import { SkillsSection } from '@/components/SkillsSection'
import { ExperienceSection } from '@/components/ExperienceSection'
import { EducationSection } from '@/components/EducationSection'
import { InterestsSection } from '@/components/InterestsSection'

export default function Home() {
  const { setIsHovering } = useCursor()
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isMounted, setIsMounted] = useState(false)
  const [floatingPoints, setFloatingPoints] = useState<{ left: string; top: string; duration: number; delay: number }[]>([])

  useEffect(() => {
    setIsMounted(true)
    const points = [...Array(20)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: 3 + Math.random() * 2,
      delay: Math.random() * 2,
    }))
    setFloatingPoints(points)

    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 2 - 1,
          y: ((e.clientY - rect.top) / rect.height) * 2 - 1,
        })
      }
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('mousemove', handleMouseMove)
      return () => window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <div ref={containerRef} className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Hero Section */}
      <Hero />

      {/* About Section with 3D Laptop */}
      <AboutSection mousePosition={mousePosition} />

      {/* Skills Section */}
      <SkillsSection />

      {/* Experience Section */}
      <ExperienceSection />

      {/* Education Section */}
      <EducationSection />

      {/* Interests Section */}
      <InterestsSection />

      {/* Floating Elements */}
      <div className="fixed inset-0 pointer-events-none">
        {isMounted && floatingPoints.map((point, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            initial={{ opacity: 0 }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: point.duration,
              repeat: Infinity,
              delay: point.delay,
            }}
            style={{
              left: point.left,
              top: point.top,
            }}
          />
        ))}
      </div>

      {/* Fixed Download Button */}
      <motion.a
        href="/Amiru_Mallawa_Arachchi_Resume.pdf"
        download
        className="fixed bottom-8 right-8 p-4 bg-white text-black rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-30"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <Download className="w-6 h-6" />
      </motion.a>

      {/* Social Links */}
      <div className="fixed left-8 bottom-1/2 transform translate-y-1/2 flex flex-col space-y-4 z-30">
        {[
          { icon: Mail, href: 'mailto:amirunoel8@gmail.com', label: 'Email' },
          { icon: Github, href: 'https://github.com/amirunoel', label: 'GitHub' },
          { icon: Linkedin, href: 'https://linkedin.com/in/amirumallawaarachchi', label: 'LinkedIn' },
          { icon: Twitter, href: 'https://twitter.com/amirunoel', label: 'Twitter' },
        ].map((social) => (
          <motion.a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative"
            whileHover={{ scale: 1.2 }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <social.icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
            <span className="absolute left-full ml-3 px-2 py-1 bg-gray-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {social.label}
            </span>
          </motion.a>
        ))}
      </div>
    </div>
  )
}