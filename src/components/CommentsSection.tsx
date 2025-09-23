'use client'

import { useState, useEffect, useCallback } from 'react'
import { MessageCircle, Send, User, Mail } from 'lucide-react'
import { supabase, Comment } from '@/lib/supabase'

interface CommentsSectionProps {
  blogPostId: string
}

export default function CommentsSection({ blogPostId }: CommentsSectionProps) {
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [newComment, setNewComment] = useState({
    author_name: '',
    author_email: '',
    content: ''
  })

  useEffect(() => {
    fetchComments()
  }, [fetchComments])

  const fetchComments = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('comments')
        .select('*')
        .eq('blog_post_id', blogPostId)
        .eq('approved', true)
        .order('created_at', { ascending: true })

      if (error) {
        throw error
      }

      setComments(data || [])
    } catch (error) {
      console.error('Error fetching comments:', error)
    } finally {
      setLoading(false)
    }
  }, [blogPostId])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    
    if (!newComment.author_name || !newComment.author_email || !newComment.content) {
      alert('Please fill in all fields')
      return
    }

    setSubmitting(true)

    try {
      const { error } = await supabase
        .from('comments')
        .insert({
          blog_post_id: blogPostId,
          author_name: newComment.author_name,
          author_email: newComment.author_email,
          content: newComment.content,
          approved: false // Comments need approval
        })

      if (error) {
        throw error
      }

      setNewComment({ author_name: '', author_email: '', content: '' })
      alert('Comment submitted! It will appear after approval.')
    } catch (error) {
      console.error('Error submitting comment:', error)
      alert('Failed to submit comment. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <section className="mt-12">
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <MessageCircle className="mr-2" size={24} />
          Comments
        </h2>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="card animate-pulse">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
                <div className="h-4 bg-gray-700 rounded w-1/4"></div>
              </div>
              <div className="h-4 bg-gray-700 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      </section>
    )
  }

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold mb-6 flex items-center">
        <MessageCircle className="mr-2" size={24} />
        Comments ({comments.length})
      </h2>

      {/* Comments List */}
      <div className="space-y-6 mb-8">
        {comments.length === 0 ? (
          <p className="text-gray-400 text-center py-8">No comments yet. Be the first to comment!</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="card">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                  <User size={16} className="text-white" />
                </div>
                <div>
                  <h4 className="font-semibold">{comment.author_name}</h4>
                  <time className="text-gray-400 text-sm">
                    {new Date(comment.created_at).toLocaleDateString()}
                  </time>
                </div>
              </div>
              <p className="text-gray-300">{comment.content}</p>
            </div>
          ))
        )}
      </div>

      {/* Comment Form */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Leave a Comment</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Name *</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  value={newComment.author_name}
                  onChange={(e) => setNewComment(prev => ({ ...prev, author_name: e.target.value }))}
                  className="input-field pl-10"
                  placeholder="Your name"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email *</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="email"
                  value={newComment.author_email}
                  onChange={(e) => setNewComment(prev => ({ ...prev, author_email: e.target.value }))}
                  className="input-field pl-10"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Comment *</label>
            <textarea
              value={newComment.content}
              onChange={(e) => setNewComment(prev => ({ ...prev, content: e.target.value }))}
              className="input-field h-32 resize-none"
              placeholder="Share your thoughts..."
              required
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="btn-primary flex items-center space-x-2"
          >
            <Send size={18} />
            <span>{submitting ? 'Submitting...' : 'Post Comment'}</span>
          </button>
        </form>
      </div>
    </section>
  )
}
