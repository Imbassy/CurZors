"use client"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"
import { useFilters } from "@/contexts/filter-context"
import { format } from "date-fns"

export function ActiveFilters() {
  const { filters, clearFilter, toggleFilterValue } = useFilters()

  // Format price range
  const formatPrice = (value: number) => `$${value}`

  // Format date
  const formatDate = (date: Date | null) => {
    if (!date) return ""
    return format(date, "MMM d, yyyy")
  }

  // Format duration
  const formatDuration = (value: number) => `${value}h`

  return (
    <div className="flex flex-wrap gap-2">
      {/* Search filter */}
      {filters.search && (
        <Badge variant="secondary" className="flex items-center gap-1">
          Search: {filters.search}
          <button onClick={() => clearFilter("search")} className="ml-1 hover:text-destructive">
            <X className="h-3 w-3" />
            <span className="sr-only">Remove</span>
          </button>
        </Badge>
      )}

      {/* Categories filters */}
      {filters.categories.map((category) => (
        <Badge key={category} variant="secondary" className="flex items-center gap-1">
          Category: {category}
          <button onClick={() => toggleFilterValue("categories", category)} className="ml-1 hover:text-destructive">
            <X className="h-3 w-3" />
            <span className="sr-only">Remove</span>
          </button>
        </Badge>
      ))}

      {/* Destinations filters */}
      {filters.destinations.map((destination) => (
        <Badge key={destination} variant="secondary" className="flex items-center gap-1">
          Destination: {destination}
          <button
            onClick={() => toggleFilterValue("destinations", destination)}
            className="ml-1 hover:text-destructive"
          >
            <X className="h-3 w-3" />
            <span className="sr-only">Remove</span>
          </button>
        </Badge>
      ))}

      {/* Price range filter */}
      {(filters.priceRange[0] > 0 || filters.priceRange[1] < 1000) && (
        <Badge variant="secondary" className="flex items-center gap-1">
          Price: {formatPrice(filters.priceRange[0])} - {formatPrice(filters.priceRange[1])}
          <button onClick={() => clearFilter("priceRange")} className="ml-1 hover:text-destructive">
            <X className="h-3 w-3" />
            <span className="sr-only">Remove</span>
          </button>
        </Badge>
      )}

      {/* Rating filter */}
      {filters.rating !== null && (
        <Badge variant="secondary" className="flex items-center gap-1">
          Rating: {filters.rating}+
          <button onClick={() => clearFilter("rating")} className="ml-1 hover:text-destructive">
            <X className="h-3 w-3" />
            <span className="sr-only">Remove</span>
          </button>
        </Badge>
      )}

      {/* Date range filter */}
      {(filters.dateRange[0] !== null || filters.dateRange[1] !== null) && (
        <Badge variant="secondary" className="flex items-center gap-1">
          Date: {formatDate(filters.dateRange[0])} - {formatDate(filters.dateRange[1])}
          <button onClick={() => clearFilter("dateRange")} className="ml-1 hover:text-destructive">
            <X className="h-3 w-3" />
            <span className="sr-only">Remove</span>
          </button>
        </Badge>
      )}

      {/* Attraction types filters */}
      {filters.attractionTypes.map((type) => (
        <Badge key={type} variant="secondary" className="flex items-center gap-1">
          Type: {type}
          <button onClick={() => toggleFilterValue("attractionTypes", type)} className="ml-1 hover:text-destructive">
            <X className="h-3 w-3" />
            <span className="sr-only">Remove</span>
          </button>
        </Badge>
      ))}

      {/* Amenities filters */}
      {filters.amenities.map((amenity) => (
        <Badge key={amenity} variant="secondary" className="flex items-center gap-1">
          Amenity: {amenity}
          <button onClick={() => toggleFilterValue("amenities", amenity)} className="ml-1 hover:text-destructive">
            <X className="h-3 w-3" />
            <span className="sr-only">Remove</span>
          </button>
        </Badge>
      ))}

      {/* Duration filter */}
      {(filters.duration[0] > 0 || filters.duration[1] < 24) && (
        <Badge variant="secondary" className="flex items-center gap-1">
          Duration: {formatDuration(filters.duration[0])} - {formatDuration(filters.duration[1])}
          <button onClick={() => clearFilter("duration")} className="ml-1 hover:text-destructive">
            <X className="h-3 w-3" />
            <span className="sr-only">Remove</span>
          </button>
        </Badge>
      )}

      {/* Languages filters */}
      {filters.languages.map((language) => (
        <Badge key={language} variant="secondary" className="flex items-center gap-1">
          Language: {language}
          <button onClick={() => toggleFilterValue("languages", language)} className="ml-1 hover:text-destructive">
            <X className="h-3 w-3" />
            <span className="sr-only">Remove</span>
          </button>
        </Badge>
      ))}

      {/* Accessibility filters */}
      {filters.accessibility.map((option) => (
        <Badge key={option} variant="secondary" className="flex items-center gap-1">
          Accessibility: {option}
          <button onClick={() => toggleFilterValue("accessibility", option)} className="ml-1 hover:text-destructive">
            <X className="h-3 w-3" />
            <span className="sr-only">Remove</span>
          </button>
        </Badge>
      ))}

      {/* Time of day filters */}
      {filters.timeOfDay.map((time) => (
        <Badge key={time} variant="secondary" className="flex items-center gap-1">
          Time: {time}
          <button onClick={() => toggleFilterValue("timeOfDay", time)} className="ml-1 hover:text-destructive">
            <X className="h-3 w-3" />
            <span className="sr-only">Remove</span>
          </button>
        </Badge>
      ))}
    </div>
  )
}

