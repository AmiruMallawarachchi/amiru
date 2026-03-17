'use client'

import React, { createContext, useContext, useEffect, useRef, useState } from 'react'

interface CursorContextType {
  mousePosition: { x: number; y: number }
  isHovering: boolean
  setIsHovering: (value: boolean) => void
}

const CursorContext = createContext<CursorContextType>({
  mousePosition: { x: 0, y: 0 },
  isHovering: false,
  setIsHovering: () => {},
})

export const useCursor = () => useContext(CursorContext)

export const CursorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX - 20}px, ${e.clientY - 20}px) scale(${isHovering ? 1.5 : 1})`
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [isHovering])

  return (
    <CursorContext.Provider value={{ mousePosition, isHovering, setIsHovering }}>
      <div
        ref={cursorRef}
        className="cursor-follower fixed w-10 h-10 pointer-events-none z-50 flex items-center justify-center mix-blend-difference"
        style={{
          transition: 'transform 0.15s ease-out',
        }}
      >
        {/* Star Logo Favicon as Cursor */}
        <img 
          src="/favicon.ico" 
          alt="cursor" 
          className="w-full h-full object-contain filter invert" 
          style={{ 
            filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.8))' 
          }}
        />
      </div>
      {children}
    </CursorContext.Provider>
  )
}