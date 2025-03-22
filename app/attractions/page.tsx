import { Suspense } from "react"
import { getAttractions, getCategories, getDestinations } from "@/lib/airtable"
import { AttractionsProvider } from "./attractions-provider"

export const metadata = {
  title: "Attractions | Red Sea Quest",
  description: "Discover the best attractions in the Red Sea region",
}

export default async function AttractionsPage() {
  // Fetch data
  const attractions = await getAttractions().catch(() => [])
  const categories = await getCategories().catch(() => [])
  const destinations = await getDestinations().catch(() => [])

  return (
    <Suspense fallback={<div className="py-12 text-center">Loading attractions...</div>}>
      <AttractionsProvider attractions={attractions} categories={categories} destinations={destinations} />
    </Suspense>
  )
}

