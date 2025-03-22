import { getListings } from "@/lib/airtable"
import { FeaturedListingsCarousel } from "./featured-listings-carousel"

export async function FeaturedListings() {
  // Fetch featured listings from Airtable
  const listings = await getListings({
    limit: 8, // Increased to 8 for a better carousel experience
    sortField: "rating/score",
    sortDirection: "desc",
  }).catch(() => []) // Fallback to empty array if fetch fails

  return <FeaturedListingsCarousel listings={listings} />
}

