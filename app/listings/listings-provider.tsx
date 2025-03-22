"use client"

import { FilterProvider } from "@/contexts/filter-context"
import { ListingsClient } from "./listings-client"

interface ListingsProviderProps {
  listings: any[]
  categories: any[]
  destinations: any[]
}

export function ListingsProvider({ listings, categories, destinations }: ListingsProviderProps) {
  return (
    <FilterProvider>
      <ListingsClient listings={listings} categories={categories} destinations={destinations} />
    </FilterProvider>
  )
}

