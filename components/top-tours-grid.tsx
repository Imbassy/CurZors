import { getListings } from "@/lib/airtable"
import Link from "next/link"

export async function TopToursGrid() {
  // Use a direct formula instead of filterByField/filterValue for boolean fields
  const tours = await getListings({
    limit: 4, // Limit to 4 tours for the 4-column layout
    customFilterFormula: "{behaviours/isFeatured} = TRUE()",
    sortField: "rating/score", // Sort by rating as a fallback
    sortDirection: "desc",
  }).catch((error) => {
    console.error("Error fetching top tours:", error)
    return []
  })

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {tours.map((tour) => (
        <div key={tour.id} className="bg-white rounded-lg shadow-md overflow-hidden">
          <Link href={`/listings/${tour.fields.code}`}>
            <div className="relative h-48">
              {/* Category badge - added to top left */}
              <div className="absolute top-0 left-0 bg-primary/80 text-white px-2 py-1 m-2 rounded-md text-xs font-medium z-10">
                {tour.fields.category || tour.fields["Category"] || "Tour"}
              </div>

              {tour.fields.Photos && tour.fields.Photos.length > 0 ? (
                <img
                  src={tour.fields.Photos[0].url || "/placeholder.svg"}
                  alt={tour.fields.title}
                  className="w-full h-full object-cover"
                />
              ) : tour.fields["image/src"] ? (
                <img
                  src={tour.fields["image/src"] || "/placeholder.svg"}
                  alt={tour.fields["image/alt"] || tour.fields.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400">No image available</span>
                </div>
              )}
            </div>

            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2 line-clamp-2">{tour.fields.title}</h3>

              <div className="flex items-center mb-2">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-4 w-4 ${
                        i < Math.round(tour.fields["rating/score"] || tour.fields["Average Rating"] || 0)
                          ? "fill-current"
                          : "text-gray-300"
                      }`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-gray-600 ml-1">
                  ({tour.fields["rating/reviewCount"] || tour.fields["Total Reviews"] || 0})
                </span>
              </div>

              <div className="flex items-center text-sm text-gray-600 mb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {tour.fields["displayDuration/duration/hours"]
                  ? `${tour.fields["displayDuration/duration/hours"]} hours`
                  : tour.fields["displayDuration/duration/days"]
                    ? `${tour.fields["displayDuration/duration/days"]} days`
                    : "Duration not specified"}
              </div>

              {/* Price moved to bottom of card */}
              <div className="mt-auto pt-2 border-t border-gray-100">
                <div className="font-bold text-primary">
                  {tour.fields["price/retailPrice/currencySymbol"] || "$"}
                  {tour.fields["price/retailPrice/amount"] || tour.fields.Price || 0}
                </div>
              </div>
            </div>
          </Link>
        </div>
      ))}

      {tours.length === 0 && (
        <div className="col-span-full text-center py-10">
          <p className="text-gray-500">
            No top tours found. Please add tours with the "behaviours/isFeatured" checkbox enabled in Airtable.
          </p>
        </div>
      )}
    </div>
  )
}

