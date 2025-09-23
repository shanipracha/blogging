import Link from 'next/link'
import { ArrowRight, Calendar, Eye, Heart, MessageCircle } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import Image from 'next/image'

async function getLatestBlogs() {
  const { data, error } = await supabase
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
    .limit(3)

  if (error) {
    console.error('Error fetching blogs:', error)
    return []
  }
  return data || []
}

async function getUpcomingEvents() {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .gte('event_date', new Date().toISOString().split('T')[0])
    .order('event_date', { ascending: true })
    .limit(3)

  if (error) {
    console.error('Error fetching events:', error)
    return []
  }
  return data || []
}

export default async function HomePage() {
  const [latestBlogs, upcomingEvents] = await Promise.all([
    getLatestBlogs(),
    getUpcomingEvents()
  ])

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 py-20">
        <div className="container">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Welcome to{' '}
              <span className="text-gradient">BlogHub</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Your ultimate destination for amazing blogs and exciting events. 
              Discover, learn, and connect with our vibrant community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/blog" className="btn-primary text-lg px-8 py-3">
                Explore Blogs
                <ArrowRight className="ml-2 inline" size={20} />
              </Link>
              <Link href="/events" className="btn-secondary text-lg px-8 py-3">
                View Events
                <Calendar className="ml-2 inline" size={20} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Blogs Section */}
      <section className="py-16 bg-gray-900/50">
        <div className="container">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold">Latest Blogs</h2>
            <Link href="/blog" className="text-primary-400 hover:text-primary-300 flex items-center">
              View All
              <ArrowRight className="ml-1" size={16} />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestBlogs.map((blog) => (
              <article key={blog.id} className="card hover:bg-gray-800/50 transition-colors">
                {blog.featured_image && (
                  <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                    <Image
                      src={blog.featured_image}
                      alt={blog.title}
                      fill
                      className="object-cover"
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
                  <h3 className="text-xl font-semibold line-clamp-2">
                    <Link href={`/blog/${blog.slug}`} className="hover:text-primary-400 transition-colors">
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
                    <time dateTime={blog.created_at}>
                      {new Date(blog.created_at).toLocaleDateString()}
                    </time>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-16">
        <div className="container">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold">Upcoming Events</h2>
            <Link href="/events" className="text-primary-400 hover:text-primary-300 flex items-center">
              View All
              <ArrowRight className="ml-1" size={16} />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="card hover:bg-gray-800/50 transition-colors">
                {event.banner_image && (
                  <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                    <Image
                      src={event.banner_image}
                      alt={event.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold">
                    <Link href={`/events/${event.id}`} className="hover:text-primary-400 transition-colors">
                      {event.name}
                    </Link>
                  </h3>
                  <p className="text-gray-400 text-sm line-clamp-3">
                    {event.description}
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center text-gray-500">
                      <Calendar size={14} className="mr-2" />
                      {new Date(event.event_date).toLocaleDateString()} at {event.event_time}
                    </div>
                    <div className="flex items-center text-gray-500">
                      <MessageCircle size={14} className="mr-2" />
                      {event.location}
                    </div>
                    <div className="text-gray-500">
                      {event.current_attendees} / {event.max_attendees || '∞'} attendees
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-accent-600">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join our community and start exploring amazing content and events today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/blog" className="bg-white text-primary-600 hover:bg-gray-100 font-medium py-3 px-8 rounded-lg transition-colors">
              Start Reading
            </Link>
            <Link href="/events" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary-600 font-medium py-3 px-8 rounded-lg transition-colors">
              Join Events
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}