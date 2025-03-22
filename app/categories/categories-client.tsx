"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import { useFilters } from "@/contexts/filter-context"
import { FilterSidebar } from "@/components/filters/filter-sidebar"
import { MobileFilterDrawer } from "@/components/filters/mobile-filter-drawer"
import { SearchFilter } from "@/components/filters/search-filter"
import { slugify } from "@/lib/utils"

interface CategoriesClientProps {
  categories: any[]
  destinations: any[]
}

export function CategoriesClient({ categories, destinations }: CategoriesClientProps) {
  const { filters } = useFilters()

  // Filter categories based on search
  const filteredCategories = categories.filter((category) => {
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      const name = category.fields["Category Name"]?.toLowerCase() || ""
      const description = category.fields.Description?.toLowerCase() || ""
      return name.includes(searchLower) || description.includes(searchLower)
    }
    return true
  })

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters sidebar - hidden on mobile */}
        <div className="hidden md:block">
          <FilterSidebar categories={[]} destinations={destinations} />
        </div>

        {/* Main content */}
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div>
              <h1 className="text-2xl font-bold">Categories</h1>
              <p className="text-muted-foreground">
                {filteredCategories.length} {filteredCategories.length === 1 ? "category" : "categories"} found
              </p>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              {/* Mobile filter drawer */}
              <MobileFilterDrawer categories={[]} destinations={destinations} />

              {/* Search filter */}
              <div className="w-full sm:w-64">
                <SearchFilter />
              </div>
            </div>
          </div>

          {/* Categories grid */}
          {filteredCategories.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredCategories.map((category) => {
                const categoryName = category.fields["Category Name"]
                const categorySlug = slugify(categoryName)
                const listingCount = category.fields["Number of Listings"] || 0

                return (
                  <Link href={`/categories/${categorySlug}`} key={category.id}>
                    <Card className="h-full overflow-hidden hover:shadow-md transition-shadow">
                      <div className="aspect-square relative overflow-hidden">
                        {category.fields.Photo && category.fields.Photo.length > 0 ? (
                          <Image
                            src={category.fields.Photo[0].url || "/placeholder.svg"}
                            alt={categoryName}
                            fill
                            className="object-cover transition-transform hover:scale-105"
                          />
                        ) : (
                          <Image
                            src={`/placeholder.svg?height=300&width=300&text=${encodeURIComponent(categoryName)}`}
                            alt={categoryName}
                            width={300}
                            height={300}
                            className="object-cover w-full h-full"
                          />
                        )}

                        {/* Listing count badge */}
                        <div className="absolute top-2 right-2">
                          <Badge className="bg-primary text-primary-foreground">
                            {listingCount} {listingCount === 1 ? "listing" : "listings"}
                          </Badge>
                        </div>
                      </div>

                      <CardContent className="p-4 text-center">
                        <h3 className="font-semibold text-lg">{categoryName}</h3>
                        {category.fields.Description && (
                          <p className="text-muted-foreground text-sm line-clamp-2 mt-1">
                            {category.fields.Description}
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  </Link>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-12 border rounded-lg">
              <h3 className="text-lg font-medium mb-2">No categories found</h3>
              <p className="text-muted-foreground mb-6">Try adjusting your search query</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

