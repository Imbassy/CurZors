import { getListings } from "@/lib/airtable"
import { TopRatedToursCarousel } from "./top-rated-tours-carousel"

export async function TopRatedTours() {
  // Fetch top-rated tours from Airtable
  const listings = await getListings({
    limit: 8, // Increased to 8 for a better carousel experience
    sortField: "rating/score",
    sortDirection: "desc",
    // Only include listings with a rating score of at least 4.5
    filterByField: "rating/score",
    filterValue: ">=4.5",
  }).catch(() => []) // Fallback to empty array if fetch fails

  return <TopRatedToursCarousel listings={listings} />
}

