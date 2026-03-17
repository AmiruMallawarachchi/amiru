import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { CursorProvider } from '@/components/providers/CursorProvider'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { Navigation } from '@/components/Navigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Amiru Mallawa Arachchi - AI Engineer',
  description: 'GEN AI Engineer Portfolio - Specializing in Artificial Intelligence, Machine Learning, and Innovative Solutions',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <ThemeProvider>
          <CursorProvider>
            <Navigation />
            {children}
          </CursorProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}