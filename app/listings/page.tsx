import { Suspense } from "react"
import { getListings, getCategories, getDestinations } from "@/lib/airtable"
import { ListingsProvider } from "./listings-provider"

export const metadata = {
  title: "Tours & Experiences | Red Sea Quest",
  description: "Discover the best tours and experiences in the Red Sea region",
}

export default async function ListingsPage() {
  // Fetch data
  const listings = await getListings().catch(() => [])
  const categories = await getCategories().catch(() => [])
  const destinations = await getDestinations().catch(() => [])

  return (
    <Suspense fallback={<div className="py-12 text-center">Loading tours and experiences...</div>}>
      <ListingsProvider listings={listings} categories={categories} destinations={destinations} />
    </Suspense>
  )
}

