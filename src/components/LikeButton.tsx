'use client'

import { useState } from 'react'
import { Heart } from 'lucide-react'
import { supabase } from '@/lib/supabase'

interface LikeButtonProps {
  blogPostId: string
  initialLikes: number
}

export default function LikeButton({ blogPostId, initialLikes }: LikeButtonProps) {
  const [likes, setLikes] = useState(initialLikes)
  const [isLiked, setIsLiked] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleLike = async () => {
    if (isLoading) return

    setIsLoading(true)
    
    try {
      // Check if user has already liked this post (using IP as identifier)
      const userIP = await fetch('/api/get-ip').then(res => res.text()).catch(() => 'anonymous')
      
      const { data: existingLike } = await supabase
        .from('likes')
        .select('id')
        .eq('blog_post_id', blogPostId)
        .eq('user_ip', userIP)
        .single()

      if (existingLike) {
        // Unlike
        await supabase
          .from('likes')
          .delete()
          .eq('id', existingLike.id)
        
        setLikes(prev => prev - 1)
        setIsLiked(false)
      } else {
        // Like
        await supabase
          .from('likes')
          .insert({
            blog_post_id: blogPostId,
            user_ip: userIP
          })
        
        setLikes(prev => prev + 1)
        setIsLiked(true)
      }

      // Update the blog post likes count
      await supabase
        .from('blog_posts')
        .update({ likes: isLiked ? likes - 1 : likes + 1 })
        .eq('id', blogPostId)

    } catch (error) {
      console.error('Error toggling like:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <button
      onClick={handleLike}
      disabled={isLoading}
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
        isLiked 
          ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30' 
          : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
      } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      <Heart 
        size={18} 
        className={isLiked ? 'fill-current' : ''} 
      />
      <span>{likes}</span>
    </button>
  )
}

