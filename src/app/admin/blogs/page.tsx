import Link from 'next/link'
import { Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react'
import { createClient } from '@/lib/supabase-server'

async function getBlogPosts() {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('blog_posts')
    .select(`
      *,
      categories (
        name,
        color
      )
    `)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching blog posts:', error)
    return []
  }
  return data || []
}

export default async function AdminBlogsPage() {
  const blogPosts = await getBlogPosts()

  return (
    <div className="min-h-screen py-8">
      <div className="container">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Blog Posts</h1>
            <p className="text-gray-400">Manage your blog content</p>
          </div>
          <Link href="/admin/blogs/new" className="btn-primary flex items-center space-x-2">
            <Plus size={18} />
            <span>New Post</span>
          </Link>
        </div>

        {/* Blog Posts Table */}
        <div className="card">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-3 px-4 font-semibold">Title</th>
                  <th className="text-left py-3 px-4 font-semibold">Category</th>
                  <th className="text-left py-3 px-4 font-semibold">Status</th>
                  <th className="text-left py-3 px-4 font-semibold">Views</th>
                  <th className="text-left py-3 px-4 font-semibold">Likes</th>
                  <th className="text-left py-3 px-4 font-semibold">Created</th>
                  <th className="text-left py-3 px-4 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {blogPosts.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-8 text-gray-400">
                      No blog posts found. Create your first post!
                    </td>
                  </tr>
                ) : (
                  blogPosts.map((post) => (
                    <tr key={post.id} className="border-b border-gray-800 hover:bg-gray-800/50">
                      <td className="py-3 px-4">
                        <div>
                          <h3 className="font-medium line-clamp-1">{post.title}</h3>
                          <p className="text-gray-400 text-sm line-clamp-1">{post.excerpt}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span 
                          className="px-2 py-1 text-xs font-medium rounded-full"
                          style={{ 
                            backgroundColor: post.categories?.color + '20',
                            color: post.categories?.color 
                          }}
                        >
                          {post.categories?.name}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          post.published 
                            ? 'bg-green-500/20 text-green-400' 
                            : 'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {post.published ? 'Published' : 'Draft'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-400">{post.views || 0}</td>
                      <td className="py-3 px-4 text-gray-400">{post.likes || 0}</td>
                      <td className="py-3 px-4 text-gray-400">
                        {new Date(post.created_at).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <Link
                            href={`/blog/${post.slug}`}
                            className="text-gray-400 hover:text-white transition-colors"
                            title="View Post"
                          >
                            <Eye size={16} />
                          </Link>
                          <Link
                            href={`/admin/blogs/${post.id}/edit`}
                            className="text-gray-400 hover:text-primary-400 transition-colors"
                            title="Edit Post"
                          >
                            <Edit size={16} />
                          </Link>
                          <button
                            className="text-gray-400 hover:text-red-400 transition-colors"
                            title="Delete Post"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
