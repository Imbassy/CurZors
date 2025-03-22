"use client"

import { FilterProvider } from "@/contexts/filter-context"
import { AttractionsClient } from "./attractions-client"

interface AttractionsProviderProps {
  attractions: any[]
  categories: any[]
  destinations: any[]
}

export function AttractionsProvider({ attractions, categories, destinations }: AttractionsProviderProps) {
  return (
    <FilterProvider>
      <AttractionsClient attractions={attractions} categories={categories} destinations={destinations} />
    </FilterProvider>
  )
}

