import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Eye, ArrowLeft, Share2 } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import CommentsSection from '@/components/CommentsSection'
import LikeButton from '@/components/LikeButton'

async function getBlogPost(slug: string) {
  const { data, error } = await supabase
    .from('blog_posts')
    .select(`
      *,
      categories (
        name,
        color,
        slug
      )
    `)
    .eq('slug', slug)
    .eq('published', true)
    .single()

  if (error || !data) {
    return null
  }

  // Increment view count
  await supabase
    .from('blog_posts')
    .update({ views: data.views + 1 })
    .eq('id', data.id)

  return data
}

async function getRelatedPosts(categoryId: string, currentPostId: string) {
  const { data, error } = await supabase
    .from('blog_posts')
    .select(`
      id,
      title,
      slug,
      excerpt,
      featured_image,
      created_at,
      categories (
        name,
        color
      )
    `)
    .eq('category_id', categoryId)
    .eq('published', true)
    .neq('id', currentPostId)
    .order('created_at', { ascending: false })
    .limit(3)

  if (error) {
    console.error('Error fetching related posts:', error)
    return []
  }
  return data || []
}

export default async function BlogDetailPage({
  params,
}: {
  params: { slug: string }
}) {
  const blogPost = await getBlogPost(params.slug)

  if (!blogPost) {
    notFound()
  }

  const relatedPosts = await getRelatedPosts(blogPost.category_id, blogPost.id)

  return (
    <div className="min-h-screen py-8">
      <div className="container max-w-4xl">
        {/* Back Button */}
        <Link 
          href="/blog" 
          className="inline-flex items-center text-primary-400 hover:text-primary-300 mb-8 transition-colors"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Blog
        </Link>

        {/* Article Header */}
        <header className="mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <span 
              className="px-3 py-1 text-sm font-medium rounded-full"
              style={{ 
                backgroundColor: blogPost.categories?.color + '20',
                color: blogPost.categories?.color 
              }}
            >
              {blogPost.categories?.name}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            {blogPost.title}
          </h1>
          
          <div className="flex items-center justify-between text-gray-400 mb-6">
            <div className="flex items-center space-x-6">
              <time dateTime={blogPost.created_at} className="flex items-center">
                <Calendar size={16} className="mr-2" />
                {new Date(blogPost.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
              <span className="flex items-center">
                <Eye size={16} className="mr-2" />
                {blogPost.views} views
              </span>
            </div>
            <button className="flex items-center text-gray-400 hover:text-white transition-colors">
              <Share2 size={16} className="mr-2" />
              Share
            </button>
          </div>
        </header>

        {/* Featured Image */}
        {blogPost.featured_image && (
          <div className="relative h-64 md:h-96 mb-8 rounded-xl overflow-hidden">
            <Image
              src={blogPost.featured_image}
              alt={blogPost.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Article Content */}
        <article className="prose prose-invert prose-lg max-w-none mb-12">
          <div 
            className="text-gray-300 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: blogPost.content }}
          />
        </article>

        {/* Tags */}
        {blogPost.tags && blogPost.tags.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {blogPost.tags.map((tag: string, index: number) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm hover:bg-gray-700 transition-colors"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Like Button */}
        <div className="mb-8">
          <LikeButton blogPostId={blogPost.id} initialLikes={blogPost.likes} />
        </div>

        {/* Comments Section */}
        <CommentsSection blogPostId={blogPost.id} />

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold mb-8">Related Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((post) => (
                <article key={post.id} className="card hover:bg-gray-800/50 transition-colors">
                  {post.featured_image && (
                    <div className="relative h-40 mb-4 rounded-lg overflow-hidden">
                      <Image
                        src={post.featured_image}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="space-y-3">
                    <span 
                      className="px-2 py-1 text-xs font-medium rounded-full"
                      style={{ 
                        backgroundColor: post.categories?.color + '20',
                        color: post.categories?.color 
                      }}
                    >
                      {post.categories?.name}
                    </span>
                    <h3 className="text-lg font-semibold line-clamp-2">
                      <Link href={`/blog/${post.slug}`} className="hover:text-primary-400 transition-colors">
                        {post.title}
                      </Link>
                    </h3>
                    <p className="text-gray-400 text-sm line-clamp-3">
                      {post.excerpt}
                    </p>
                    <time dateTime={post.created_at} className="text-gray-500 text-sm">
                      {new Date(post.created_at).toLocaleDateString()}
                    </time>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
