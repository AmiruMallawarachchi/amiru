'use client'

import { motion } from 'framer-motion'
import { useSpring, animated } from '@react-spring/web'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Box, Plane } from '@react-three/drei'
import { useRef, useState } from 'react'
import { useCursor } from './providers/CursorProvider'

// 3D Laptop Component
function Laptop3D({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  const laptopRef = useRef(null)

  return (
    <group ref={laptopRef}>
      {/* Laptop Base */}
      <Box
        args={[3, 0.1, 2]}
        position={[0, 0, 0]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
      </Box>

      {/* Screen */}
      <Box
        args={[2.5, 1.8, 0.05]}
        position={[0, 1.5, -0.8]}
        rotation={[-Math.PI / 6, 0, 0]}
      >
        <meshStandardMaterial color="#000" metalness={0.9} roughness={0.1} />
      </Box>

      {/* Screen Content (glowing code) */}
      <Plane
        args={[2.3, 1.6]}
        position={[0, 1.5, -0.77]}
        rotation={[-Math.PI / 6, 0, 0]}
      >
        <meshBasicMaterial color="#00ff00" opacity={0.8} transparent />
      </Plane>

      {/* Keyboard Area */}
      <Box
        args={[2.8, 0.05, 1.8]}
        position={[0, 0.05, 0]}
      >
        <meshStandardMaterial color="#2a2a2a" metalness={0.6} roughness={0.4} />
      </Box>
    </group>
  )
}

export const AboutSection = ({ mousePosition }: { mousePosition: { x: number; y: number } }) => {
  const { setIsHovering } = useCursor()
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)

  const skills = [
    'Machine Learning',
    'Deep Learning',
    'Natural Language Processing',
    'Computer Vision',
    'Reinforcement Learning',
    'MLOps',
  ]

  return (
    <section id="about" className="relative min-h-screen py-20 px-6">
      <div className="container mx-auto max-w-7xl">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold text-center mb-16"
        >
          About <span className="gradient-text">Me</span>
        </motion.h2>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
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
                <motion.span
                  key={skill}
                  onHoverStart={() => setHoveredSkill(skill)}
                  onHoverEnd={() => setHoveredSkill(null)}
                  whileHover={{ scale: 1.1 }}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    hoveredSkill === skill
                      ? 'bg-white text-black'
                      : 'border border-white text-white hover:bg-white hover:text-black'
                  }`}
                >
                  {skill}
                </motion.span>
              ))}
            </div>

            {/* Quote */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="mt-12 p-6 border-l-4 border-white"
            >
              <p className="text-xl text-gray-300 italic">
                "The best way to predict the future is to invent it."
              </p>
              <p className="mt-2 text-gray-400">- Alan Kay</p>
            </motion.div>
          </motion.div>

          {/* 3D Laptop Visualization */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="h-[500px] relative"
          >
            <div className="w-full h-full rounded-lg overflow-hidden bg-gradient-to-br from-gray-900 to-black shadow-2xl">
              <Canvas camera={{ position: [0, 2, 5], fov: 60 }}>
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
                <pointLight position={[-10, -10, -10]} intensity={0.5} />

                <Laptop3D mousePosition={mousePosition} />

                <OrbitControls
                  enableZoom={false}
                  enablePan={false}
                  autoRotate
                  autoRotateSpeed={2}
                  maxPolarAngle={Math.PI / 2}
                />
              </Canvas>
            </div>

            {/* Floating Labels */}
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
              className="absolute top-10 right-10 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-sm"
            >
              AI/ML Expert
            </motion.div>

            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: 1,
              }}
              className="absolute bottom-10 left-10 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-sm"
            >
              Innovation Driven
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-green-400 rounded-full opacity-30"
            animate={{
              y: [0, -200, 0],
              x: [0, Math.random() * 100 - 50, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
            style={{
              left: `${20 + Math.random() * 60}%`,
              bottom: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>
    </section>
  )
}