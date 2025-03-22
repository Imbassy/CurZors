"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Search, X } from "lucide-react"
import { useFilters } from "@/contexts/filter-context"

export function SearchFilter() {
  const { filters, setFilter } = useFilters()
  const [searchValue, setSearchValue] = useState(filters.search)

  // Update local value when the filter value changes
  useEffect(() => {
    setSearchValue(filters.search)
  }, [filters.search])

  // Debounce the filter update to avoid too many rerenders
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchValue !== filters.search) {
        setFilter("search", searchValue)
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [searchValue, setFilter, filters.search])

  return (
    <div className="relative">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="text"
        placeholder="Search..."
        className="pl-8 pr-8"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      {searchValue && (
        <button
          type="button"
          onClick={() => setSearchValue("")}
          className="absolute right-2.5 top-2.5 text-muted-foreground hover:text-foreground"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Clear search</span>
        </button>
      )}
    </div>
  )
}

