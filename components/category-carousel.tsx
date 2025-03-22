import type React from "react"
import Image from "next/image"

interface Category {
  Id: number
  Name: string
  Photo: string
}

interface CategoryCarouselProps {
  categories: Category[]
}

const CategoryCarousel: React.FC<CategoryCarouselProps> = ({ categories }) => {
  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-semibold mb-4">Explore by Category</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
        {categories.map((category) => (
          <div key={category.Id} className="relative rounded-lg overflow-hidden group">
            <Image
              src={category.Photo || "/placeholder.svg?height=300&width=400"}
              alt={category.Name}
              width={300}
              height={200}
              className="w-full h-48 object-cover"
            />
            {/* Normal state - no overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <h3 className="text-lg font-semibold text-white z-10">{category.Name}</h3>
            </div>
            {/* Hover state - overlay appears */}
            <div className="absolute inset-0 bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CategoryCarousel

