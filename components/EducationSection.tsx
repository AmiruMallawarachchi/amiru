'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useCursor } from '@/components/providers/CursorProvider'
import { GraduationCap, Calendar, Award } from 'lucide-react'

const education = [
  {
    degree: 'Master of Science in Artificial Intelligence',
    school: 'Stanford University',
    location: 'Stanford, CA',
    period: '2020 - 2022',
    gpa: '3.9/4.0',
    achievements: [
      'Dean\'s List all semesters',
      'Published 2 research papers on NLP',
      'Teaching Assistant for Deep Learning Course',
      'Winner of AI Innovation Challenge 2021',
    ],
  },
  {
    degree: 'Bachelor of Science in Computer Science',
    school: 'UC Berkeley',
    location: 'Berkeley, CA',
    period: '2016 - 2020',
    gpa: '3.8/4.0',
    achievements: [
      'Summa Cum Laude',
      'President of AI/ML Club',
      'Completed honors thesis on Computer Vision',
      'NSF Research Fellowship',
    ],
  },
]

const certifications = [
  {
    name: 'AWS Certified Machine Learning - Specialty',
    issuer: 'Amazon Web Services',
    year: '2022',
  },
  {
    name: 'Google Cloud Professional ML Engineer',
    issuer: 'Google Cloud',
    year: '2022',
  },
  {
    name: 'Deep Learning Specialization',
    issuer: 'Coursera - deeplearning.ai',
    year: '2021',
  },
]

export const EducationSection = () => {
  const { setIsHovering } = useCursor()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section ref={ref} className="relative py-20 px-6 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold text-center mb-16"
        >
          Education & <span className="gradient-text">Certifications</span>
        </motion.h2>

        {/* Education Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {education.map((edu, index) => (
            <motion.div
              key={edu.degree}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{ scale: 1.02, y: -5 }}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              className="p-8 rounded-2xl bg-gradient-to-br from-gray-900 to-black border border-gray-800 hover:border-white/50 transition-all duration-300"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold mb-1">{edu.degree}</h3>
                  <p className="text-lg text-gray-300">{edu.school}</p>
                  <p className="text-sm text-gray-400">{edu.location}</p>
                </div>
                <GraduationCap className="w-8 h-8 text-gray-400" />
              </div>

              {/* Meta Info */}
              <div className="flex items-center gap-4 mb-6 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-300">{edu.period}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-300">GPA: {edu.gpa}</span>
                </div>
              </div>

              {/* Achievements */}
              <div className="space-y-2">
                <h4 className="font-semibold text-gray-200 mb-2">Key Achievements</h4>
                <ul className="space-y-1">
                  {edu.achievements.map((achievement, i) => (
                    <li key={i} className="flex items-start text-sm text-gray-300">
                      <span className="text-green-400 mr-2">✓</span>
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <h3 className="text-2xl font-bold mb-8 text-center">Professional Certifications</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.name}
                whileHover={{ scale: 1.05, x: 10 }}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                className="p-6 rounded-xl bg-black/50 backdrop-blur-sm border border-gray-800 hover:border-white/30 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-3">
                  <Award className="w-6 h-6 text-yellow-400" />
                  <span className="text-sm text-gray-400">{cert.year}</span>
                </div>
                <h4 className="font-semibold mb-1">{cert.name}</h4>
                <p className="text-sm text-gray-300">{cert.issuer}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Background Animation */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-64 h-64 rounded-full"
            style={{
              background: `radial-gradient(circle, rgba(255,255,255,0.02) 0%, transparent 70%)`,
              left: `${20 + i * 30}%`,
              top: `${30 + i * 20}%`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.1, 0.3],
            }}
            transition={{
              duration: 5 + i * 2,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
      </div>
    </section>
  )
}