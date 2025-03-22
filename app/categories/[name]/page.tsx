import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"
import { getCategoryByName, getListings } from "@/lib/airtable"

export default async function CategoryPage({ params }: { params: { name: string } }) {
  const categoryName = decodeURIComponent(params.name)

  // Get category details
  const category = await getCategoryByName(categoryName).catch(() => null)

  if (!category) {
    notFound()
  }

  // Get listings in this category
  const listings = await getListings({
    filterByField: "Category",
    filterValue: categoryName,
    limit: 20,
  }).catch(() => [])

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="flex flex-col gap-6">
        <div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <Link href="/categories" className="hover:underline">
              Categories
            </Link>
            <span>/</span>
            <span>{categoryName}</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">{categoryName} Experiences</h1>
          <p className="text-muted-foreground max-w-3xl">
            {category.fields.Description ||
              `Explore our selection of ${categoryName.toLowerCase()} experiences in the Red Sea region.`}
          </p>
        </div>

        {category.fields["Category Summary"] && (
          <div className="bg-primary/5 p-4 rounded-lg">
            <p className="text-sm">{category.fields["Category Summary"]}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.length > 0 ? (
            listings.map((listing) => (
              <Link href={`/listings/${listing.fields["Listing ID"]}`} key={listing.id}>
                <Card className="h-full overflow-hidden hover:shadow-md transition-shadow">
                  <div className="aspect-[4/3] relative overflow-hidden">
                    {listing.fields.Photos && listing.fields.Photos.length > 0 ? (
                      <Image
                        src={listing.fields.Photos[0].url || "/placeholder.svg"}
                        alt={listing.fields.Title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <Image
                        src="/placeholder.svg?height=300&width=400"
                        alt="Placeholder"
                        width={400}
                        height={300}
                        className="object-cover w-full h-full"
                      />
                    )}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                      <Badge className="bg-primary text-primary-foreground">${listing.fields.Price}</Badge>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg line-clamp-1">{listing.fields.Title}</h3>
                    <p className="text-muted-foreground text-sm line-clamp-2 mt-1">{listing.fields.Description}</p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex justify-between items-center">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-primary text-primary mr-1" />
                      <span className="text-sm font-medium">
                        {listing.fields["Average Rating"] || 0} ({listing.fields["Total Reviews"] || 0})
                      </span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {listing.fields["Total Bookings"] || 0} booked
                    </span>
                  </CardFooter>
                </Card>
              </Link>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <h3 className="text-lg font-medium mb-2">No listings found</h3>
              <p className="text-muted-foreground mb-6">
                We couldn't find any {categoryName.toLowerCase()} experiences at the moment.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

