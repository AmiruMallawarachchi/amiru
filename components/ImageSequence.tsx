'use client'

import { useEffect, useRef } from 'react'
import { MotionValue } from 'framer-motion'

interface ImageSequenceProps {
  progress: MotionValue<number>
}

export const ImageSequence = ({ progress }: ImageSequenceProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imagesRef = useRef<HTMLImageElement[]>([])
  const frameCount = 192

  useEffect(() => {
    // Preload all frames sequentially
    for (let i = 1; i <= frameCount; i++) {
      const img = new Image()
      // Adjust path for standard NextJS public directory serving
      img.src = `/Laptopimages/${String(i).padStart(4, '0')}.png`
      imagesRef.current.push(img)
    }
  }, [])

  useEffect(() => {
    // Subscribe to Framer Motion's progression directly (keeps React from re-rendering each frame)
    const unsubscribe = progress.on('change', (latest) => {
      const canvas = canvasRef.current
      if (!canvas) return
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      let frameIndex = Math.floor(latest * (frameCount - 1))
      frameIndex = Math.max(0, Math.min(frameCount - 1, frameIndex))

      const img = imagesRef.current[frameIndex]
      if (img && img.complete && img.width > 0) {
        if (canvas.width !== img.width) {
          canvas.width = img.width
          canvas.height = img.height
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      }
    })

    return () => unsubscribe()
  }, [progress])

  return (
    <div className="w-full h-full flex items-center justify-center pointer-events-none">
      <canvas ref={canvasRef} className="w-full max-w-[800px] h-auto object-contain drop-shadow-2xl" />
    </div>
  )
}
