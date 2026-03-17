'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useCursor } from '@/components/providers/CursorProvider'
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter } from 'lucide-react'
import emailjs from '@emailjs/browser'

export default function ContactPage() {
  const { setIsHovering } = useCursor()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Initialize EmailJS with your credentials
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;

      if (!publicKey || !serviceId || !templateId) {
        throw new Error('EmailJS credentials are not configured.');
      }

      emailjs.init(publicKey)

      // Send email
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_email: 'amirunoel8@gmail.com',
        }
      )

      setSubmitted(true)
      setFormData({ name: '', email: '', message: '' })

      // Reset success message after 5 seconds
      setTimeout(() => setSubmitted(false), 5000)
    } catch (error) {
      console.error('Error sending email:', error)
      alert('Failed to send message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen bg-black text-white px-6 py-20">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Get in <span className="gradient-text">Touch</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Have a project in mind? Want to collaborate? Or just want to say hello?
            Feel free to reach out. I'm always excited to connect with fellow developers and AI enthusiasts.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-2xl font-bold mb-6">Let's Connect</h2>
              <p className="text-gray-300 mb-8">
                I'm open to discussing new opportunities, interesting projects,
                or just having a chat about AI and technology. Whether you have
                a specific project in mind or just want to connect, I'd love to hear from you.
              </p>
            </div>

            {/* Contact Methods */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="p-3 bg-white/10 rounded-full"
                >
                  <Mail className="w-6 h-6" />
                </motion.div>
                <div>
                  <p className="font-semibold">Email</p>
                  <a
                    href="mailto:amirunoel8@gmail.com"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    amirunoel8@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="p-3 bg-white/10 rounded-full"
                >
                  <MapPin className="w-6 h-6" />
                </motion.div>
                <div>
                  <p className="font-semibold">Location</p>
                  <p className="text-gray-300">San Francisco, CA</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="font-semibold mb-4">Follow Me</h3>
              <div className="flex gap-4">
                {[
                  { icon: Github, href: 'https://github.com/amirunoel', label: 'GitHub' },
                  { icon: Linkedin, href: 'https://linkedin.com/in/amirumallawaarachchi', label: 'LinkedIn' },
                  { icon: Twitter, href: 'https://twitter.com/amirunoel8', label: 'Twitter' },
                ].map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2, y: -5 }}
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                    className="p-3 bg-gray-900 rounded-full border border-gray-800 hover:border-white/50 transition-all duration-300"
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div className="p-6 rounded-2xl bg-gradient-to-b from-gray-900 to-black border border-gray-800">
              <h3 className="font-semibold mb-3">Current Availability</h3>
              <p className="text-green-400 font-medium mb-2">✓ Open to opportunities</p>
              <p className="text-gray-400 text-sm">
                I'm currently available for freelance projects, consulting, and full-time opportunities in AI/ML.
              </p>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center p-12 rounded-2xl bg-gradient-to-b from-green-900/20 to-black border border-green-500/30"
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.5 }}
                  className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-6"
                >
                  <svg
                    className="w-10 h-10 text-black"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </motion.div>
                <h3 className="text-2xl font-bold mb-3">Message Sent!</h3>
                <p className="text-gray-300 text-center">
                  Thanks for reaching out! I'll get back to you as soon as possible.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:border-white/50 focus:outline-none transition-colors"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:border-white/50 focus:outline-none transition-colors"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:border-white/50 focus:outline-none transition-colors resize-none"
                    placeholder="Tell me about your project or just say hi..."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                  className="w-full py-3 bg-white text-black rounded-lg font-semibold hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </motion.button>

                <p className="text-xs text-gray-400 text-center">
                  Your message will be sent directly to my email.
                </p>
              </form>
            )}
          </motion.div>
        </div>

        {/* Floating Elements */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-32 h-32 rounded-full"
              style={{
                background: `radial-gradient(circle, rgba(255,255,255,0.02) 0%, transparent 70%)`,
                left: `${10 + i * 15}%`,
                bottom: `${10 + i * 15}%`,
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
      </div>
    </div>
  )
}