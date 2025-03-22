import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, MapPin, Heart } from "lucide-react"
import type { Listing } from "@/lib/airtable"

interface TopToursSectionProps {
  listings: Listing[]
}

export function TopToursSection({ listings }: TopToursSectionProps) {
  // Fallback listings if none are provided
  const fallbackListings = [
    {
      id: "1",
      fields: {
        "Listing ID": "tour-1",
        Title: "Giftun Island Snorkeling Trip",
        Description: "Explore the vibrant coral reefs around Giftun Island with our expert guides.",
        Price: 45,
        Photos: [{ url: "/placeholder.svg?height=300&width=400", filename: "giftun", id: "1" }],
        "Average Rating": 4.8,
        "Total Reviews": 124,
        "Total Bookings": 350,
        Category: ["Snorkeling"],
        Destination: ["Hurghada"],
      },
    },
    {
      id: "2",
      fields: {
        "Listing ID": "tour-2",
        Title: "Ras Mohammed National Park Diving",
        Description:
          "Dive into the crystal clear waters of Ras Mohammed National Park and discover its rich marine life.",
        Price: 85,
        Photos: [{ url: "/placeholder.svg?height=300&width=400", filename: "ras", id: "2" }],
        "Average Rating": 4.9,
        "Total Reviews": 98,
        "Total Bookings": 280,
        Category: ["Diving"],
        Destination: ["Sharm El Sheikh"],
      },
    },
    {
      id: "3",
      fields: {
        "Listing ID": "tour-3",
        Title: "Blue Hole Diving Adventure",
        Description: "Experience the thrill of diving at the world-famous Blue Hole with our certified instructors.",
        Price: 95,
        Photos: [{ url: "/placeholder.svg?height=300&width=400", filename: "blue", id: "3" }],
        "Average Rating": 4.7,
        "Total Reviews": 86,
        "Total Bookings": 210,
        Category: ["Diving"],
        Destination: ["Dahab"],
      },
    },
    {
      id: "4",
      fields: {
        "Listing ID": "tour-4",
        Title: "Luxury Yacht Day Trip",
        Description: "Sail the Red Sea in style on our luxury yacht, with stops for swimming and snorkeling.",
        Price: 120,
        Photos: [{ url: "/placeholder.svg?height=300&width=400", filename: "yacht", id: "4" }],
        "Average Rating": 4.9,
        "Total Reviews": 75,
        "Total Bookings": 180,
        Category: ["Boat Tours"],
        Destination: ["Hurghada"],
      },
    },
  ]

  const displayListings = listings.length > 0 ? listings : fallbackListings

  return (
    <section className="py-12 bg-gray-50">
      <div className="container px-4 md:px-6">
        <h2 className="text-2xl font-bold mb-8">Top Tours</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayListings.map((listing) => (
            <Card
              key={listing.id}
              className="h-full overflow-hidden hover:shadow-md transition-shadow border-0 shadow-sm"
            >
              <div className="relative">
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
                </div>
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute top-2 right-2 bg-white/80 hover:bg-white rounded-full h-8 w-8"
                >
                  <Heart className="h-4 w-4" />
                </Button>
                <div className="absolute bottom-2 left-2">
                  {listing.fields.Category && listing.fields.Category[0] && (
                    <Badge className="bg-white/90 text-primary">{listing.fields.Category[0]}</Badge>
                  )}
                </div>
              </div>
              <CardContent className="p-4">
                <div className="flex items-center gap-1 mb-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">
                    {listing.fields["Average Rating"] || 0} ({listing.fields["Total Reviews"] || 0} reviews)
                  </span>
                </div>
                <h3 className="font-semibold text-lg line-clamp-2 mb-1">{listing.fields.Title}</h3>
                {listing.fields.Destination && listing.fields.Destination.length > 0 && (
                  <div className="flex items-center text-sm text-muted-foreground mb-2">
                    <MapPin className="h-3.5 w-3.5 mr-1" />
                    <span>{listing.fields.Destination[0]}</span>
                  </div>
                )}
                <div className="text-lg font-bold">from ${listing.fields.Price || 0}</div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button asChild className="w-full">
                  <Link href={`/listings/${listing.fields["Listing ID"]}`}>View Deal</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

