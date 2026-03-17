import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials missing. Check your .env.local file.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Project = {
  id: string
  title: string
  description: string
  long_description: string
  image_url: string
  video_url: string | null
  tags: string[]
  github_url: string | null
  live_url: string | null
  huggingface_url: string | null
  wiki_url: string | null
  architecture_details: string | null
  tech_stack: { name: string; description: string }[]
  achievements: string[]
  challenges: string[]
  is_featured: boolean
  created_at: string
}
