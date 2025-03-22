"'use client'

import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, MapPin } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"

export function ListingsGrid({ listings }: { listings: any[] }) {
  const [sortOrder, setSortOrder] = useState("recommended")

  // Sort listings based on selected order
  const sortedListings = [...listings].sort((a, b) => {
    if (sortOrder === "price-low") {
      return a.fields.Price - b.fields.Price
    } else if (sortOrder === "price-high") {
      return b.fields.Price - a.fields.Price
    } else if (sortOrder === "rating") {
      return (b.fields["Average Rating"] || 0) - (a.fields["Average Rating"] || 0)
    }
    // Default: recommended
    return 0
  })

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Experiences</h1>
        <Select value={sortOrder} onValueChange={setSortOrder}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recommended">Recommended</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
            <SelectItem value="rating">Highest Rated</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedListings.map((listing) => (
          <Card key={listing.id} className="h-full overflow-hidden hover:shadow-md transition-shadow">
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
              <div className="absolute top-2 left-2 flex flex-wrap gap-1">
                {listing.fields.Category &&
                  listing.fields.Category.map((category: string, idx: number) => (
                    <Badge key={idx} className="bg-black/70 text-white hover:bg-black/80">
                      {category}
                    </Badge>
                  ))}
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                <Badge className="bg-primary text-primary-foreground">${listing.fields.Price}</Badge>
              </div>
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg line-clamp-1">{listing.fields.Title}</h3>
              {listing.fields.Destination && listing.fields.Destination.length > 0 && (
                <div className="flex items-center mt-1 text-sm text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5 mr-1" />
                  <span>{listing.fields.Destination[0]}</span>
                </div>
              )}
              <p className="text-muted-foreground text-sm line-clamp-2 mt-1">
                {listing.fields["Listing Summary"] || listing.fields.Description}
              </p>
              <div className="flex items-center mt-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "h-4 w-4",
                      i < Math.floor(listing.fields["Average Rating"] || 0)
                        ? "fill-[#ffd935] text-[#ffd935]"
                        : "text-muted-foreground",
                    )}
                  />
                ))}
                <span className="text-sm font-medium ml-1">
                  {listing.fields["Average Rating"] || 0} ({listing.fields["Total Reviews"] || 0})
                </span>
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Button className="w-full" asChild>
                <Link href={`/listings/${listing.fields["Listing ID"]}`}>Check Availability</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

