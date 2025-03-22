import { Suspense } from "react"
import { getCategories, getDestinations } from "@/lib/airtable"
import { CategoriesProvider } from "./categories-provider"

export const metadata = {
  title: "Categories | Red Sea Quest",
  description: "Browse all categories of marine experiences in the Red Sea region",
}

export default async function CategoriesPage() {
  // Fetch data
  const categories = await getCategories().catch(() => [])
  const destinations = await getDestinations().catch(() => [])

  return (
    <Suspense fallback={<div className="py-12 text-center">Loading categories...</div>}>
      <CategoriesProvider categories={categories} destinations={destinations} />
    </Suspense>
  )
}

