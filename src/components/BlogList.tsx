'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Eye, Heart, Calendar } from 'lucide-react'
import { supabase, BlogPost } from '@/lib/supabase'

interface BlogListProps {
  search?: string
  category?: string
}

export default function BlogList({ search, category }: BlogListProps) {
  const [blogs, setBlogs] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchBlogs()
  }, [search, category])

  async function fetchBlogs() {
    try {
      setLoading(true)
      setError(null)

      let query = supabase
        .from('blog_posts')
        .select(`
          *,
          categories (
            name,
            color
          )
        `)
        .eq('published', true)
        .order('created_at', { ascending: false })

      if (search) {
        query = query.or(`title.ilike.%${search}%,content.ilike.%${search}%,excerpt.ilike.%${search}%`)
      }

      if (category) {
        query = query.eq('category_id', category)
      }

      const { data, error } = await query

      if (error) {
        throw error
      }

      setBlogs(data || [])
    } catch (err) {
      setError('Failed to fetch blog posts')
      console.error('Error fetching blogs:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <BlogListSkeleton />
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-400 mb-4">{error}</p>
        <button 
          onClick={fetchBlogs}
          className="btn-primary"
        >
          Try Again
        </button>
      </div>
    )
  }

  if (blogs.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400 text-lg mb-4">No blog posts found</p>
        <p className="text-gray-500">
          {search ? `No posts match your search "${search}"` : 'No posts available at the moment'}
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {blogs.map((blog) => (
        <article key={blog.id} className="card hover:bg-gray-800/50 transition-colors group">
          {blog.featured_image && (
            <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
              <Image
                src={blog.featured_image}
                alt={blog.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          )}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <span 
                className="px-2 py-1 text-xs font-medium rounded-full"
                style={{ 
                  backgroundColor: blog.categories?.color + '20',
                  color: blog.categories?.color 
                }}
              >
                {blog.categories?.name}
              </span>
            </div>
            <h3 className="text-xl font-semibold line-clamp-2 group-hover:text-primary-400 transition-colors">
              <Link href={`/blog/${blog.slug}`}>
                {blog.title}
              </Link>
            </h3>
            <p className="text-gray-400 text-sm line-clamp-3">
              {blog.excerpt}
            </p>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center space-x-4">
                <span className="flex items-center">
                  <Eye size={14} className="mr-1" />
                  {blog.views}
                </span>
                <span className="flex items-center">
                  <Heart size={14} className="mr-1" />
                  {blog.likes}
                </span>
              </div>
              <time dateTime={blog.created_at} className="flex items-center">
                <Calendar size={14} className="mr-1" />
                {new Date(blog.created_at).toLocaleDateString()}
              </time>
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}

function BlogListSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="card animate-pulse">
          <div className="h-48 bg-gray-700 rounded-lg mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-700 rounded w-1/4"></div>
            <div className="h-6 bg-gray-700 rounded"></div>
            <div className="h-4 bg-gray-700 rounded w-3/4"></div>
            <div className="h-4 bg-gray-700 rounded w-1/2"></div>
          </div>
        </div>
      ))}
    </div>
  )
}
