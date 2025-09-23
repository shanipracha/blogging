import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface BlogPost {
  id: string
  title: string
  content: string
  excerpt: string
  slug: string
  featured_image?: string
  category_id: string
  tags: string[]
  published: boolean
  created_at: string
  updated_at: string
  author_id: string
  views: number
  likes: number
}

export interface Event {
  id: string
  name: string
  description: string
  event_date: string
  event_time: string
  location: string
  banner_image?: string
  max_attendees?: number
  current_attendees: number
  created_at: string
  updated_at: string
  organizer_id: string
}

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  color: string
  created_at: string
}

export interface Comment {
  id: string
  blog_post_id: string
  author_name: string
  author_email: string
  content: string
  approved: boolean
  created_at: string
}

export interface Like {
  id: string
  blog_post_id: string
  user_ip: string
  created_at: string
}
