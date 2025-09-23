import { Check, X, MessageCircle, User, Mail, Calendar } from 'lucide-react'
import { createClient } from '@/lib/supabase-server'

async function getComments() {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('comments')
    .select(`
      *,
      blog_posts (
        title,
        slug
      )
    `)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching comments:', error)
    return []
  }
  return data || []
}

export default async function AdminCommentsPage() {
  const comments = await getComments()

  return (
    <div className="min-h-screen py-8">
      <div className="container">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Comments</h1>
          <p className="text-gray-400">Moderate and manage user comments</p>
        </div>

        {/* Comments List */}
        <div className="space-y-6">
          {comments.length === 0 ? (
            <div className="text-center py-12">
              <MessageCircle className="mx-auto text-gray-600 mb-4" size={48} />
              <h3 className="text-lg font-semibold mb-2">No comments yet</h3>
              <p className="text-gray-400">Comments will appear here when users start engaging with your content</p>
            </div>
          ) : (
            comments.map((comment) => (
              <div key={comment.id} className="card">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center">
                      <User size={18} className="text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{comment.author_name}</h4>
                      <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <span className="flex items-center">
                          <Mail size={14} className="mr-1" />
                          {comment.author_email}
                        </span>
                        <span className="flex items-center">
                          <Calendar size={14} className="mr-1" />
                          {new Date(comment.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    comment.approved 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {comment.approved ? 'Approved' : 'Pending'}
                  </span>
                </div>

                <div className="mb-4">
                  <p className="text-gray-300 mb-2">{comment.content}</p>
                  <div className="text-sm text-gray-500">
                    <span className="font-medium">On:</span> {comment.blog_posts?.title}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <button className="flex items-center space-x-1 px-3 py-1 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors">
                      <Check size={16} />
                      <span>Approve</span>
                    </button>
                    <button className="flex items-center space-x-1 px-3 py-1 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors">
                      <X size={16} />
                      <span>Reject</span>
                    </button>
                  </div>
                  <a 
                    href={`/blog/${comment.blog_posts?.slug}`}
                    className="text-primary-400 hover:text-primary-300 text-sm"
                  >
                    View Post →
                  </a>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
