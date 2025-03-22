"use client"
import { FilterProvider } from "@/contexts/filter-context"
import { CategoriesClient } from "./categories-client"

interface CategoriesProviderProps {
  categories: any[]
  destinations: any[]
}

export function CategoriesProvider({ categories, destinations }: CategoriesProviderProps) {
  return (
    <FilterProvider>
      <CategoriesClient categories={categories} destinations={destinations} />
    </FilterProvider>
  )
}

