'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ChevronDown } from 'lucide-react'

interface Category {
  id: string
  name: string
  slug: string
  color: string
}

interface CategoryFilterProps {
  categories: Category[]
  selectedCategory?: string
}

export default function CategoryFilter({ categories, selectedCategory }: CategoryFilterProps) {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  const selectedCategoryName = categories.find(cat => cat.id === selectedCategory)?.name || 'All Categories'

  const handleCategoryChange = (categoryId: string | null) => {
    const params = new URLSearchParams(searchParams.toString())
    
    if (categoryId) {
      params.set('category', categoryId)
    } else {
      params.delete('category')
    }
    
    router.push(`/blog?${params.toString()}`)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg transition-colors"
      >
        <span className="text-sm">{selectedCategoryName}</span>
        <ChevronDown size={16} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-10">
          <div className="py-2">
            <button
              onClick={() => handleCategoryChange(null)}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-700 transition-colors ${
                !selectedCategory ? 'text-primary-400' : 'text-gray-300'
              }`}
            >
              All Categories
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-700 transition-colors flex items-center space-x-2 ${
                  selectedCategory === category.id ? 'text-primary-400' : 'text-gray-300'
                }`}
              >
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: category.color }}
                />
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

