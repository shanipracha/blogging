import { createClient } from '@/lib/supabase-server'
import { BookOpen, Calendar, MessageCircle, Eye, Heart, Users } from 'lucide-react'

interface BlogPost {
  id: string
  title: string
  slug: string
  published: boolean
  created_at: string
  views: number
  likes: number
  categories: {
    name: string
    color: string
  }[] | null
}

async function getStats() {
  const supabase = createClient()
  
  const [
    { count: totalBlogs },
    { count: publishedBlogs },
    { count: totalEvents },
    { count: totalComments },
    { count: approvedComments }
  ] = await Promise.all([
    supabase.from('blog_posts').select('*', { count: 'exact', head: true }),
    supabase.from('blog_posts').select('*', { count: 'exact', head: true }).eq('published', true),
    supabase.from('events').select('*', { count: 'exact', head: true }),
    supabase.from('comments').select('*', { count: 'exact', head: true }),
    supabase.from('comments').select('*', { count: 'exact', head: true }).eq('approved', true)
  ])

  return {
    totalBlogs: totalBlogs || 0,
    publishedBlogs: publishedBlogs || 0,
    totalEvents: totalEvents || 0,
    totalComments: totalComments || 0,
    approvedComments: approvedComments || 0
  }
}

async function getRecentBlogs(): Promise<BlogPost[]> {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('blog_posts')
    .select(`
      id,
      title,
      slug,
      published,
      created_at,
      views,
      likes,
      categories (
        name,
        color
      )
    `)
    .order('created_at', { ascending: false })
    .limit(5)

  if (error) {
    console.error('Error fetching recent blogs:', error)
    return []
  }
  return data || []
}

async function getRecentEvents() {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(5)

  if (error) {
    console.error('Error fetching recent events:', error)
    return []
  }
  return data || []
}

export default async function AdminDashboard() {
  const [stats, recentBlogs, recentEvents] = await Promise.all([
    getStats(),
    getRecentBlogs(),
    getRecentEvents()
  ])

  return (
    <div className="min-h-screen py-8">
      <div className="container">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-gray-400">Welcome back! Here&apos;s what&apos;s happening with your site.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Blog Posts</p>
                <p className="text-2xl font-bold">{stats.totalBlogs}</p>
                <p className="text-green-400 text-sm">{stats.publishedBlogs} published</p>
              </div>
              <div className="w-12 h-12 bg-primary-600/20 rounded-lg flex items-center justify-center">
                <BookOpen className="text-primary-400" size={24} />
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Events</p>
                <p className="text-2xl font-bold">{stats.totalEvents}</p>
                <p className="text-gray-500 text-sm">All time</p>
              </div>
              <div className="w-12 h-12 bg-accent-600/20 rounded-lg flex items-center justify-center">
                <Calendar className="text-accent-400" size={24} />
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Comments</p>
                <p className="text-2xl font-bold">{stats.totalComments}</p>
                <p className="text-green-400 text-sm">{stats.approvedComments} approved</p>
              </div>
              <div className="w-12 h-12 bg-primary-600/20 rounded-lg flex items-center justify-center">
                <MessageCircle className="text-primary-400" size={24} />
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Views</p>
                <p className="text-2xl font-bold">
                  {recentBlogs.reduce((sum, blog) => sum + (blog.views || 0), 0)}
                </p>
                <p className="text-gray-500 text-sm">Recent posts</p>
              </div>
              <div className="w-12 h-12 bg-accent-600/20 rounded-lg flex items-center justify-center">
                <Eye className="text-accent-400" size={24} />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Blog Posts */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Recent Blog Posts</h2>
              <a href="/admin/blogs" className="text-primary-400 hover:text-primary-300 text-sm">
                View All
              </a>
            </div>
            <div className="space-y-4">
              {recentBlogs.length === 0 ? (
                <p className="text-gray-400 text-center py-4">No blog posts yet</p>
              ) : (
                recentBlogs.map((blog) => (
                  <div key={blog.id} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-medium line-clamp-1">{blog.title}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-400 mt-1">
                        <span className="flex items-center">
                          <Eye size={14} className="mr-1" />
                          {blog.views || 0}
                        </span>
                        <span className="flex items-center">
                          <Heart size={14} className="mr-1" />
                          {blog.likes || 0}
                        </span>
                        <span 
                          className="px-2 py-1 text-xs rounded-full"
                          style={{ 
                            backgroundColor: blog.categories?.[0]?.color + '20',
                            color: blog.categories?.[0]?.color 
                          }}
                        >
                          {blog.categories?.[0]?.name}
                        </span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        blog.published 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {blog.published ? 'Published' : 'Draft'}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Recent Events */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Recent Events</h2>
              <a href="/admin/events" className="text-primary-400 hover:text-primary-300 text-sm">
                View All
              </a>
            </div>
            <div className="space-y-4">
              {recentEvents.length === 0 ? (
                <p className="text-gray-400 text-center py-4">No events yet</p>
              ) : (
                recentEvents.map((event) => (
                  <div key={event.id} className="p-4 bg-gray-800/50 rounded-lg">
                    <h3 className="font-medium mb-2">{event.name}</h3>
                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <span>{new Date(event.event_date).toLocaleDateString()}</span>
                      <span className="flex items-center">
                        <Users size={14} className="mr-1" />
                        {event.current_attendees} / {event.max_attendees || '∞'}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a href="/admin/blogs/new" className="card hover:bg-gray-800/50 transition-colors text-center">
              <BookOpen className="mx-auto mb-3 text-primary-400" size={32} />
              <h3 className="font-semibold mb-2">Create New Blog Post</h3>
              <p className="text-gray-400 text-sm">Write and publish a new blog post</p>
            </a>
            <a href="/admin/events/new" className="card hover:bg-gray-800/50 transition-colors text-center">
              <Calendar className="mx-auto mb-3 text-accent-400" size={32} />
              <h3 className="font-semibold mb-2">Create New Event</h3>
              <p className="text-gray-400 text-sm">Organize and schedule a new event</p>
            </a>
            <a href="/admin/comments" className="card hover:bg-gray-800/50 transition-colors text-center">
              <MessageCircle className="mx-auto mb-3 text-primary-400" size={32} />
              <h3 className="font-semibold mb-2">Manage Comments</h3>
              <p className="text-gray-400 text-sm">Review and approve comments</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
