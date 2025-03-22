"use client"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Star, MapPin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useFilters } from "@/contexts/filter-context"
import { FilterSidebar } from "@/components/filters/filter-sidebar"
import { SortDropdown } from "@/components/filters/sort-dropdown"
import { MobileFilterDrawer } from "@/components/filters/mobile-filter-drawer"
import {
  filterAttractions,
  sortAttractions,
  paginateAttractions,
  getUniqueAttractionTypes,
  getUniqueLanguages,
  getUniqueAccessibilityOptions,
  getUniqueTimeOfDayOptions,
} from "@/lib/filter-utils"
import { cn } from "@/lib/utils"

interface AttractionsClientProps {
  attractions: any[]
  categories: any[]
  destinations: any[]
}

export function AttractionsClient({ attractions, categories, destinations }: AttractionsClientProps) {
  const { filters, setFilter } = useFilters()

  // Get unique filter options from attractions
  const attractionTypes = getUniqueAttractionTypes(attractions)
  const languages = getUniqueLanguages(attractions)
  const accessibilityOptions = getUniqueAccessibilityOptions(attractions)
  const timeOfDayOptions = getUniqueTimeOfDayOptions(attractions)

  // Apply filters and sorting
  const filteredAttractions = filterAttractions(attractions, filters)
  const sortedAttractions = sortAttractions(filteredAttractions, filters.sortBy)
  const paginatedAttractions = paginateAttractions(sortedAttractions, filters.page, filters.perPage)

  // Calculate total pages
  const totalPages = Math.ceil(sortedAttractions.length / filters.perPage)

  // Sort options
  const sortOptions = [
    { label: "Recommended", value: "recommended" },
    { label: "Price: Low to High", value: "price-low" },
    { label: "Price: High to Low", value: "price-high" },
    { label: "Highest Rated", value: "rating" },
    { label: "Newest", value: "newest" },
    { label: "Oldest", value: "oldest" },
    { label: "Duration: Shortest", value: "duration-short" },
    { label: "Duration: Longest", value: "duration-long" },
  ]

  // Generate pagination items
  const paginationItems = []
  const maxPagesToShow = 5

  if (totalPages <= maxPagesToShow) {
    // Show all pages if there are few
    for (let i = 1; i <= totalPages; i++) {
      paginationItems.push(i)
    }
  } else {
    // Show a subset of pages with ellipsis
    if (filters.page <= 3) {
      // Near the start
      for (let i = 1; i <= 3; i++) {
        paginationItems.push(i)
      }
      paginationItems.push("ellipsis")
      paginationItems.push(totalPages)
    } else if (filters.page >= totalPages - 2) {
      // Near the end
      paginationItems.push(1)
      paginationItems.push("ellipsis")
      for (let i = totalPages - 2; i <= totalPages; i++) {
        paginationItems.push(i)
      }
    } else {
      // In the middle
      paginationItems.push(1)
      paginationItems.push("ellipsis")
      paginationItems.push(filters.page - 1)
      paginationItems.push(filters.page)
      paginationItems.push(filters.page + 1)
      paginationItems.push("ellipsis")
      paginationItems.push(totalPages)
    }
  }

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters sidebar - hidden on mobile */}
        <div className="hidden md:block">
          <FilterSidebar
            categories={categories}
            destinations={destinations}
            attractionTypes={attractionTypes}
            languages={languages}
            accessibilityOptions={accessibilityOptions}
            timeOfDayOptions={timeOfDayOptions}
          />
        </div>

        {/* Main content */}
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div>
              <h1 className="text-2xl font-bold">Attractions</h1>
              <p className="text-muted-foreground">
                {sortedAttractions.length} {sortedAttractions.length === 1 ? "attraction" : "attractions"} found
              </p>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              {/* Mobile filter drawer */}
              <MobileFilterDrawer
                categories={categories}
                destinations={destinations}
                attractionTypes={attractionTypes}
                languages={languages}
                accessibilityOptions={accessibilityOptions}
                timeOfDayOptions={timeOfDayOptions}
              />

              {/* Sort dropdown */}
              <SortDropdown options={sortOptions} />
            </div>
          </div>

          {/* Attractions grid */}
          {paginatedAttractions.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedAttractions.map((attraction) => (
                <Link
                  href={`/attractions/${encodeURIComponent(attraction.fields["Attraction ID"] || attraction.id)}`}
                  key={attraction.id}
                >
                  <Card className="h-full overflow-hidden hover:shadow-md transition-shadow">
                    <div className="aspect-[4/3] relative overflow-hidden">
                      {attraction.fields.Photos && attraction.fields.Photos.length > 0 ? (
                        <Image
                          src={attraction.fields.Photos[0].url || "/placeholder.svg"}
                          alt={attraction.fields["Attraction Name"]}
                          fill
                          className="object-cover transition-transform group-hover:scale-105"
                        />
                      ) : (
                        <Image
                          src="/placeholder.svg?height=300&width=400"
                          alt="Placeholder"
                          width={400}
                          height={300}
                          className="object-cover w-full h-full"
                        />
                      )}

                      {/* Price badge */}
                      {attraction.fields.Price && (
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                          <Badge className="bg-primary text-primary-foreground">${attraction.fields.Price}</Badge>
                        </div>
                      )}

                      {/* Attraction type badges */}
                      <div className="absolute top-2 left-2 flex flex-wrap gap-1">
                        {attraction.fields["Attraction Type"] &&
                          attraction.fields["Attraction Type"].slice(0, 2).map((type: string, idx: number) => (
                            <Badge key={idx} className="bg-black/70 text-white hover:bg-black/80">
                              {type}
                            </Badge>
                          ))}
                      </div>
                    </div>

                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg line-clamp-1">{attraction.fields["Attraction Name"]}</h3>

                      {/* Location */}
                      {attraction.fields.Location && (
                        <div className="flex items-center mt-1 text-sm text-muted-foreground">
                          <MapPin className="h-3.5 w-3.5 mr-1" />
                          <span className="line-clamp-1">{attraction.fields.Location}</span>
                        </div>
                      )}

                      {/* Description */}
                      <p className="text-muted-foreground text-sm line-clamp-2 mt-1">
                        {attraction.fields["Short Description"] || attraction.fields.Description}
                      </p>

                      {/* Rating */}
                      <div className="flex items-center mt-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={cn(
                              "h-4 w-4",
                              i < Math.floor(attraction.fields["Average Rating"] || 0)
                                ? "fill-[#ffd935] text-[#ffd935]"
                                : "text-muted-foreground",
                            )}
                          />
                        ))}
                        <span className="text-sm font-medium ml-1">
                          {attraction.fields["Average Rating"] || 0} ({attraction.fields["Total Reviews"] || 0})
                        </span>
                      </div>
                    </CardContent>

                    <CardFooter className="p-4 pt-0">
                      <Button className="w-full">View Details</Button>
                    </CardFooter>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 border rounded-lg">
              <h3 className="text-lg font-medium mb-2">No attractions found</h3>
              <p className="text-muted-foreground mb-6">Try adjusting your filters or search query</p>
              <Button onClick={() => setFilter("search", "")}>Clear search</Button>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination className="mt-8">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      if (filters.page > 1) {
                        setFilter("page", filters.page - 1)
                        window.scrollTo({ top: 0, behavior: "smooth" })
                      }
                    }}
                    className={filters.page <= 1 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>

                {paginationItems.map((item, index) => (
                  <PaginationItem key={index}>
                    {item === "ellipsis" ? (
                      <span className="px-4 py-2">...</span>
                    ) : (
                      <PaginationLink
                        href="#"
                        onClick={(e) => {
                          e.preventDefault()
                          setFilter("page", item as number)
                          window.scrollTo({ top: 0, behavior: "smooth" })
                        }}
                        isActive={filters.page === item}
                      >
                        {item}
                      </PaginationLink>
                    )}
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      if (filters.page < totalPages) {
                        setFilter("page", filters.page + 1)
                        window.scrollTo({ top: 0, behavior: "smooth" })
                      }
                    }}
                    className={filters.page >= totalPages ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </div>
      </div>
    </div>
  )
}

