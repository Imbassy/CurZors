"use client"

import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Clock, Users } from "lucide-react"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { useEffect, useState } from "react"
import type { Listing } from "@/lib/airtable"

export function TopRatedToursCarousel({ listings = [] }: { listings: Listing[] }) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // If no listings are provided, create placeholder listings
  const displayListings =
    listings.length > 0
      ? listings
      : (Array.from({ length: 8 }).map((_, i) => ({
          id: `placeholder-${i}`,
          fields: {
            title: "Premium Diving Tour",
            description: "Experience the best diving spots in the Red Sea with our expert guides.",
            "price/retailPrice/amount": 149,
            "rating/score": 4.9,
            "rating/reviewCount": 36,
            location: "Sharm El Sheikh",
            "behaviours/hasFreeCancellation": true,
            "displayDuration/duration/hours": 5,
          },
        })) as Listing[])

  if (!isMounted) {
    return null
  }

  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full px-4 sm:px-6"
    >
      <CarouselContent>
        {displayListings.map((listing) => (
          <CarouselItem key={listing.id} className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/4">
            <Link href={`/listings/${listing.fields.code || listing.fields["Listing ID"] || "#"}`}>
              <Card className="h-full overflow-hidden hover:shadow-md transition-shadow">
                <div className="aspect-[4/3] relative overflow-hidden">
                  {listing.fields["image/src"] ? (
                    <Image
                      src={listing.fields["image/src"] || "/placeholder.svg"}
                      alt={listing.fields["image/alt"] || listing.fields.title || "Tour"}
                      fill
                      className="object-cover"
                    />
                  ) : listing.fields.Photos && listing.fields.Photos.length > 0 ? (
                    <Image
                      src={listing.fields.Photos[0].url || "/placeholder.svg"}
                      alt={listing.fields.title || "Tour"}
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

                  {/* Show free cancellation badge if available */}
                  {listing.fields["behaviours/hasFreeCancellation"] && (
                    <div className="absolute top-2 left-2">
                      <Badge className="bg-green-600 text-white">Free Cancellation</Badge>
                    </div>
                  )}

                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                    <Badge className="bg-primary text-primary-foreground">
                      ${listing.fields["price/retailPrice/amount"] || listing.fields.Price || 0}
                      {listing.fields["price/retailPrice/currencySymbol"] || "$"}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg line-clamp-1">{listing.fields.title}</h3>
                  <p className="text-muted-foreground text-sm line-clamp-2 mt-1">{listing.fields.description}</p>

                  {/* Display duration if available */}
                  {(listing.fields["displayDuration/duration/hours"] ||
                    listing.fields["displayDuration/duration/days"]) && (
                    <div className="flex items-center mt-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>
                        {listing.fields["displayDuration/duration/days"]
                          ? `${listing.fields["displayDuration/duration/days"]} days`
                          : ""}
                        {listing.fields["displayDuration/duration/days"] &&
                        listing.fields["displayDuration/duration/hours"]
                          ? " "
                          : ""}
                        {listing.fields["displayDuration/duration/hours"]
                          ? `${listing.fields["displayDuration/duration/hours"]} hours`
                          : ""}
                      </span>
                    </div>
                  )}

                  {/* Display max travelers if available */}
                  {listing.fields.maxTravelersAllowed && (
                    <div className="flex items-center mt-1 text-sm text-muted-foreground">
                      <Users className="h-4 w-4 mr-1" />
                      <span>Up to {listing.fields.maxTravelersAllowed} travelers</span>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="p-4 pt-0 flex justify-between items-center">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-primary text-primary mr-1" />
                    <span className="text-sm font-medium">
                      {listing.fields["rating/score"] || listing.fields["Average Rating"] || 0} (
                      {listing.fields["rating/reviewCount"] || listing.fields["Total Reviews"] || 0})
                    </span>
                  </div>
                  <span className="text-sm text-muted-foreground">{listing.fields.location}</span>
                </CardFooter>
              </Card>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="hidden sm:block">
        <CarouselPrevious className="left-0 bg-white" />
        <CarouselNext className="right-0 bg-white" />
      </div>
    </Carousel>
  )
}

