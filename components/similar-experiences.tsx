import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"
import type { Listing } from "@/lib/airtable"

interface SimilarExperiencesProps {
  listings: Listing[]
}

export function SimilarExperiences({ listings }: SimilarExperiencesProps) {
  if (listings.length === 0) {
    return null
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {listings.map((listing) => (
        <Link href={`/listings/${listing.fields.code || listing.fields["Listing ID"]}`} key={listing.id}>
          <Card className="h-full overflow-hidden hover:shadow-md transition-shadow">
            <div className="aspect-[4/3] relative overflow-hidden">
              {listing.fields["image/src"] ? (
                <Image
                  src={listing.fields["image/src"] || "/placeholder.svg"}
                  alt={listing.fields["image/alt"] || listing.fields.title}
                  fill
                  className="object-cover"
                />
              ) : listing.fields.Photos && listing.fields.Photos.length > 0 ? (
                <Image
                  src={listing.fields.Photos[0].url || "/placeholder.svg"}
                  alt={listing.fields.title}
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
                <Badge className="bg-primary text-primary-foreground">
                  ${listing.fields["price/retailPrice/amount"] || listing.fields.Price || 0}
                  {listing.fields["price/retailPrice/currencySymbol"] || "$"}
                </Badge>
              </div>
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg line-clamp-1">{listing.fields.title}</h3>
              <p className="text-muted-foreground text-sm line-clamp-2 mt-1">{listing.fields.description}</p>
              <div className="flex items-center mt-2">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                <span className="text-sm font-medium">
                  {listing.fields["rating/score"] || listing.fields["Average Rating"] || 0} (
                  {listing.fields["rating/reviewCount"] || listing.fields["Total Reviews"] || 0})
                </span>
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Button className="w-full">View Details</Button>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  )
}

