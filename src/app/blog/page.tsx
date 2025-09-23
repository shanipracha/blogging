import { Suspense } from 'react'
import { Search, Filter } from 'lucide-react'
import BlogList from '@/components/BlogList'
import CategoryFilter from '@/components/CategoryFilter'
import { supabase } from '@/lib/supabase'

async function getCategories() {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name')

  if (error) {
    console.error('Error fetching categories:', error)
    return []
  }
  return data || []
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: { search?: string; category?: string }
}) {
  const categories = await getCategories()

  return (
    <div className="min-h-screen py-8">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Blog Posts</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Discover amazing content from our community of writers and thought leaders.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search blog posts..."
                className="input-field pl-10"
                defaultValue={searchParams.search || ''}
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center space-x-2">
              <Filter size={20} className="text-gray-400" />
              <CategoryFilter categories={categories} selectedCategory={searchParams.category} />
            </div>
          </div>
        </div>

        {/* Blog List */}
        <Suspense fallback={<BlogListSkeleton />}>
          <BlogList 
            search={searchParams.search}
            category={searchParams.category}
          />
        </Suspense>
      </div>
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
