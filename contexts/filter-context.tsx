"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// Define the filter state interface
export interface FilterState {
  search: string
  categories: string[]
  destinations: string[]
  priceRange: [number, number]
  rating: number | null
  dateRange: [Date | null, Date | null]
  sortBy: string
  page: number
  perPage: number
  attractionTypes: string[]
  amenities: string[]
  duration: [number, number] // in hours
  languages: string[]
  accessibility: string[]
  timeOfDay: string[]
}

// Define the filter context interface
interface FilterContextType {
  filters: FilterState
  setFilter: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void
  resetFilters: () => void
  clearFilter: <K extends keyof FilterState>(key: K) => void
  toggleFilterValue: <K extends keyof FilterState>(
    key: K,
    value: FilterState[K] extends Array<infer U> ? U : never,
  ) => void
}

// Default filter state
const defaultFilterState: FilterState = {
  search: "",
  categories: [],
  destinations: [],
  priceRange: [0, 1000],
  rating: null,
  dateRange: [null, null],
  sortBy: "recommended",
  page: 1,
  perPage: 12,
  attractionTypes: [],
  amenities: [],
  duration: [0, 24],
  languages: [],
  accessibility: [],
  timeOfDay: [],
}

// Create the context
const FilterContext = createContext<FilterContextType | undefined>(undefined)

// Provider component
export function FilterProvider({ children }: { children: ReactNode }) {
  const [filters, setFilters] = useState<FilterState>(defaultFilterState)

  // Load filters from URL on initial load
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search)
      const newFilters = { ...defaultFilterState }

      // Parse search params into filter state
      if (params.has("search")) newFilters.search = params.get("search") || ""
      if (params.has("categories")) newFilters.categories = params.getAll("categories")
      if (params.has("destinations")) newFilters.destinations = params.getAll("destinations")
      if (params.has("minPrice") && params.has("maxPrice"))
        newFilters.priceRange = [Number(params.get("minPrice")), Number(params.get("maxPrice"))]
      if (params.has("rating")) newFilters.rating = Number(params.get("rating"))
      if (params.has("sortBy")) newFilters.sortBy = params.get("sortBy") || "recommended"
      if (params.has("page")) newFilters.page = Number(params.get("page"))
      if (params.has("perPage")) newFilters.perPage = Number(params.get("perPage"))
      if (params.has("attractionTypes")) newFilters.attractionTypes = params.getAll("attractionTypes")
      if (params.has("amenities")) newFilters.amenities = params.getAll("amenities")
      if (params.has("minDuration") && params.has("maxDuration"))
        newFilters.duration = [Number(params.get("minDuration")), Number(params.get("maxDuration"))]
      if (params.has("languages")) newFilters.languages = params.getAll("languages")
      if (params.has("accessibility")) newFilters.accessibility = params.getAll("accessibility")
      if (params.has("timeOfDay")) newFilters.timeOfDay = params.getAll("timeOfDay")

      setFilters(newFilters)
    }
  }, [])

  // Update URL when filters change
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams()

      // Only add non-default values to URL
      if (filters.search) params.set("search", filters.search)
      filters.categories.forEach((cat) => params.append("categories", cat))
      filters.destinations.forEach((dest) => params.append("destinations", dest))
      if (filters.priceRange[0] !== defaultFilterState.priceRange[0])
        params.set("minPrice", filters.priceRange[0].toString())
      if (filters.priceRange[1] !== defaultFilterState.priceRange[1])
        params.set("maxPrice", filters.priceRange[1].toString())
      if (filters.rating !== null) params.set("rating", filters.rating.toString())
      if (filters.sortBy !== defaultFilterState.sortBy) params.set("sortBy", filters.sortBy)
      if (filters.page !== defaultFilterState.page) params.set("page", filters.page.toString())
      if (filters.perPage !== defaultFilterState.perPage) params.set("perPage", filters.perPage.toString())
      filters.attractionTypes.forEach((type) => params.append("attractionTypes", type))
      filters.amenities.forEach((amenity) => params.append("amenities", amenity))
      if (filters.duration[0] !== defaultFilterState.duration[0])
        params.set("minDuration", filters.duration[0].toString())
      if (filters.duration[1] !== defaultFilterState.duration[1])
        params.set("maxDuration", filters.duration[1].toString())
      filters.languages.forEach((lang) => params.append("languages", lang))
      filters.accessibility.forEach((access) => params.append("accessibility", access))
      filters.timeOfDay.forEach((time) => params.append("timeOfDay", time))

      // Update URL without page reload
      const newUrl = `${window.location.pathname}${params.toString() ? `?${params.toString()}` : ""}`
      window.history.replaceState({}, "", newUrl)
    }
  }, [filters])

  // Set a specific filter
  const setFilter = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    setFilters((prev) => {
      // Reset to page 1 when changing filters (except when changing page)
      if (key !== "page") {
        return { ...prev, [key]: value, page: 1 }
      }
      return { ...prev, [key]: value }
    })
  }

  // Reset all filters to default
  const resetFilters = () => {
    setFilters(defaultFilterState)
  }

  // Clear a specific filter
  const clearFilter = <K extends keyof FilterState>(key: K) => {
    setFilters((prev) => ({
      ...prev,
      [key]: defaultFilterState[key],
      page: 1, // Reset to page 1 when clearing filters
    }))
  }

  // Toggle a value in an array filter
  const toggleFilterValue = <K extends keyof FilterState>(
    key: K,
    value: FilterState[K] extends Array<infer U> ? U : never,
  ) => {
    setFilters((prev) => {
      const currentValues = prev[key] as any[]
      const newValues = currentValues.includes(value)
        ? currentValues.filter((v) => v !== value)
        : [...currentValues, value]

      return {
        ...prev,
        [key]: newValues,
        page: 1, // Reset to page 1 when changing filters
      }
    })
  }

  return (
    <FilterContext.Provider value={{ filters, setFilter, resetFilters, clearFilter, toggleFilterValue }}>
      {children}
    </FilterContext.Provider>
  )
}

// Custom hook to use the filter context
export function useFilters() {
  const context = useContext(FilterContext)
  if (context === undefined) {
    throw new Error("useFilters must be used within a FilterProvider")
  }
  return context
}

