import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin } from "lucide-react"
import { getDestinations, getListings } from "@/lib/airtable"

export default async function DestinationPage({ params }: { params: { name: string } }) {
  const destinationName = decodeURIComponent(params.name)

  // Get all destinations and find the one that matches
  const destinations = await getDestinations().catch(() => [])
  const destination = destinations.find((d) => d.fields["Destination Name"] === destinationName)

  if (!destination) {
    notFound()
  }

  // Get listings in this destination
  const listings = await getListings({
    filterByField: "Destination",
    filterValue: destinationName,
    limit: 20,
  }).catch(() => [])

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="flex flex-col gap-8">
        <div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <Link href="/destinations" className="hover:underline">
              Destinations
            </Link>
            <span>/</span>
            <span>{destinationName}</span>
          </div>

          <div className="relative aspect-[21/9] rounded-xl overflow-hidden mb-6">
            {destination.fields.Photo && destination.fields.Photo.length > 0 ? (
              <Image
                src={destination.fields.Photo[0].url || "/placeholder.svg"}
                alt={destinationName}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <Image
                src="/placeholder.svg?height=400&width=800"
                alt="Placeholder"
                width={800}
                height={400}
                className="object-cover w-full h-full"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end">
              <div className="p-6 text-white">
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{destinationName}</h1>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>
                    {destination.fields.City}, {destination.fields.Country}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-3xl">
            <p className="text-muted-foreground">
              {destination.fields.Description ||
                `Explore the beautiful ${destinationName} and discover amazing experiences. 
                With crystal clear waters and stunning marine life, ${destinationName} offers 
                unforgettable adventures for all types of travelers.`}
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6">Experiences in {destinationName}</h2>

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
                  We couldn't find any experiences in {destinationName} at the moment.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

