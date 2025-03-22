import type { FilterState } from "@/contexts/filter-context"

// Function to filter attractions based on filter state
export function filterAttractions(attractions: any[], filters: FilterState) {
  return attractions.filter((attraction) => {
    // Search filter
    if (filters.search && !matchesSearch(attraction, filters.search)) {
      return false
    }

    // Categories filter
    if (filters.categories.length > 0 && !matchesCategories(attraction, filters.categories)) {
      return false
    }

    // Destinations filter
    if (filters.destinations.length > 0 && !matchesDestinations(attraction, filters.destinations)) {
      return false
    }

    // Price filter
    if (!matchesPriceRange(attraction, filters.priceRange)) {
      return false
    }

    // Rating filter
    if (filters.rating !== null && !matchesRating(attraction, filters.rating)) {
      return false
    }

    // Attraction types filter
    if (filters.attractionTypes.length > 0 && !matchesAttractionTypes(attraction, filters.attractionTypes)) {
      return false
    }

    // Amenities filter
    if (filters.amenities.length > 0 && !matchesAmenities(attraction, filters.amenities)) {
      return false
    }

    // Duration filter
    if (!matchesDuration(attraction, filters.duration)) {
      return false
    }

    // Languages filter
    if (filters.languages.length > 0 && !matchesLanguages(attraction, filters.languages)) {
      return false
    }

    // Accessibility filter
    if (filters.accessibility.length > 0 && !matchesAccessibility(attraction, filters.accessibility)) {
      return false
    }

    // Time of day filter
    if (filters.timeOfDay.length > 0 && !matchesTimeOfDay(attraction, filters.timeOfDay)) {
      return false
    }

    // Date filter
    if (!matchesDateRange(attraction, filters.dateRange)) {
      return false
    }

    return true
  })
}

// Function to sort attractions based on sort option
export function sortAttractions(attractions: any[], sortBy: string) {
  return [...attractions].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return getPrice(a) - getPrice(b)
      case "price-high":
        return getPrice(b) - getPrice(a)
      case "rating":
        return getRating(b) - getRating(a)
      case "newest":
        return getDate(b) - getDate(a)
      case "oldest":
        return getDate(a) - getDate(b)
      case "duration-short":
        return getDuration(a) - getDuration(b)
      case "duration-long":
        return getDuration(b) - getDuration(a)
      case "recommended":
      default:
        // For recommended, prioritize featured items, then rating
        if (isFeatured(a) && !isFeatured(b)) return -1
        if (!isFeatured(a) && isFeatured(b)) return 1
        return getRating(b) - getRating(a)
    }
  })
}

// Helper functions for filtering
function matchesSearch(attraction: any, search: string) {
  const searchLower = search.toLowerCase()
  const name = attraction.fields["Attraction Name"]?.toLowerCase() || ""
  const description = attraction.fields.Description?.toLowerCase() || ""
  const shortDescription = attraction.fields["Short Description"]?.toLowerCase() || ""
  const location = attraction.fields.Location?.toLowerCase() || ""

  return (
    name.includes(searchLower) ||
    description.includes(searchLower) ||
    shortDescription.includes(searchLower) ||
    location.includes(searchLower)
  )
}

function matchesCategories(attraction: any, categories: string[]) {
  const attractionCategories = attraction.fields["Attraction Type"] || []
  return categories.some((category) => attractionCategories.includes(category))
}

function matchesDestinations(attraction: any, destinations: string[]) {
  const attractionDestinations = attraction.fields.Destination || []
  return destinations.some((destination) => attractionDestinations.includes(destination))
}

function matchesPriceRange(attraction: any, priceRange: [number, number]) {
  const price = getPrice(attraction)
  return price >= priceRange[0] && price <= priceRange[1]
}

function matchesRating(attraction: any, rating: number) {
  return getRating(attraction) >= rating
}

function matchesAttractionTypes(attraction: any, types: string[]) {
  const attractionTypes = attraction.fields["Attraction Type"] || []
  return types.some((type) => attractionTypes.includes(type))
}

function matchesAmenities(attraction: any, amenities: string[]) {
  const attractionAmenities = attraction.fields.Amenities || []
  return amenities.some((amenity) => attractionAmenities.includes(amenity))
}

function matchesDuration(attraction: any, duration: [number, number]) {
  const attractionDuration = getDuration(attraction)
  return attractionDuration >= duration[0] && attractionDuration <= duration[1]
}

function matchesLanguages(attraction: any, languages: string[]) {
  const attractionLanguages = attraction.fields.Languages || []
  return languages.some((language) => attractionLanguages.includes(language))
}

function matchesAccessibility(attraction: any, accessibility: string[]) {
  const attractionAccessibility = attraction.fields["Accessibility Info"] || ""
  return accessibility.some((option) => attractionAccessibility.includes(option))
}

function matchesTimeOfDay(attraction: any, timeOfDay: string[]) {
  const attractionTimeOfDay = attraction.fields["Best Time to Visit"] || ""
  return timeOfDay.some((time) => attractionTimeOfDay.includes(time))
}

function matchesDateRange(attraction: any, dateRange: [Date | null, Date | null]) {
  // If no date range is selected, all attractions match
  if (dateRange[0] === null && dateRange[1] === null) {
    return true
  }

  // If attraction has no availability dates, it matches all date ranges
  if (!attraction.fields.AvailableDates || attraction.fields.AvailableDates.length === 0) {
    return true
  }

  // Check if any of the attraction's available dates fall within the selected range
  const availableDates = attraction.fields.AvailableDates.map((dateStr: string) => new Date(dateStr))

  if (dateRange[0] !== null && dateRange[1] !== null) {
    // Both start and end dates are selected
    return availableDates.some((date: Date) => date >= dateRange[0] && date <= dateRange[1])
  } else if (dateRange[0] !== null) {
    // Only start date is selected
    return availableDates.some((date: Date) => date >= dateRange[0])
  } else if (dateRange[1] !== null) {
    // Only end date is selected
    return availableDates.some((date: Date) => date <= dateRange[1])
  }

  return true
}

// Helper functions for sorting
function getPrice(attraction: any) {
  return attraction.fields["price/retailPrice/amount"] || attraction.fields.Price || 0
}

function getRating(attraction: any) {
  return attraction.fields["rating/score"] || attraction.fields["Average Rating"] || 0
}

function getDate(attraction: any) {
  const dateStr = attraction.fields["Created At"] || attraction.fields["Updated At"]
  return dateStr ? new Date(dateStr).getTime() : 0
}

function getDuration(attraction: any) {
  // Try to get duration in hours from various fields
  const days = attraction.fields["displayDuration/duration/days"] || 0
  const hours = attraction.fields["displayDuration/duration/hours"] || 0
  const minutes = attraction.fields["displayDuration/duration/minutes"] || 0

  // Convert to hours
  return days * 24 + hours + minutes / 60
}

function isFeatured(attraction: any) {
  return attraction.fields["behaviours/isFeatured"] || attraction.fields.Featured || false
}

// Function to paginate attractions
export function paginateAttractions(attractions: any[], page: number, perPage: number) {
  const startIndex = (page - 1) * perPage
  const endIndex = startIndex + perPage
  return attractions.slice(startIndex, endIndex)
}

// Function to get unique attraction types from attractions
export function getUniqueAttractionTypes(attractions: any[]) {
  const types = new Set<string>()

  attractions.forEach((attraction) => {
    const attractionTypes = attraction.fields["Attraction Type"] || []
    attractionTypes.forEach((type: string) => types.add(type))
  })

  return Array.from(types)
}

// Function to get unique languages from attractions
export function getUniqueLanguages(attractions: any[]) {
  const languages = new Set<string>()

  attractions.forEach((attraction) => {
    const attractionLanguages = attraction.fields.Languages || []
    attractionLanguages.forEach((language: string) => languages.add(language))
  })

  return Array.from(languages)
}

// Function to get unique accessibility options from attractions
export function getUniqueAccessibilityOptions(attractions: any[]) {
  const options = new Set<string>()

  attractions.forEach((attraction) => {
    const accessibilityInfo = attraction.fields["Accessibility Info"] || ""
    if (accessibilityInfo) {
      // Split by commas or semicolons and trim whitespace
      accessibilityInfo.split(/[,;]/).forEach((option: string) => {
        const trimmed = option.trim()
        if (trimmed) options.add(trimmed)
      })
    }
  })

  return Array.from(options)
}

// Function to get unique time of day options from attractions
export function getUniqueTimeOfDayOptions(attractions: any[]) {
  const options = new Set<string>()
  const timeOfDayOptions = ["Morning", "Afternoon", "Evening", "Night"]

  attractions.forEach((attraction) => {
    const bestTime = attraction.fields["Best Time to Visit"] || ""
    if (bestTime) {
      timeOfDayOptions.forEach((option) => {
        if (bestTime.includes(option)) options.add(option)
      })
    }
  })

  return Array.from(options)
}

