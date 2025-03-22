import Link from "next/link"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import type { Attraction } from "@/lib/airtable"
import { slugify } from "@/lib/utils"

interface TopAttractionsSectionProps {
  attractions: Attraction[]
}

export function TopAttractionsSection({ attractions = [] }: TopAttractionsSectionProps) {
  // Fallback data in case no attractions are provided
  const fallbackAttractions = [
    {
      id: "1",
      fields: {
        "Attraction ID": "attr_1",
        "Attraction Name": "Giftun Island",
        Photos: [{ url: "/placeholder.svg?height=300&width=400" }],
        Location: "Hurghada",
      },
    },
    {
      id: "2",
      fields: {
        "Attraction ID": "attr_2",
        "Attraction Name": "Ras Mohammed",
        Photos: [{ url: "/placeholder.svg?height=300&width=400" }],
        Location: "Sharm El Sheikh",
      },
    },
    {
      id: "3",
      fields: {
        "Attraction ID": "attr_3",
        "Attraction Name": "Blue Hole",
        Photos: [{ url: "/placeholder.svg?height=300&width=400" }],
        Location: "Dahab",
      },
    },
    {
      id: "4",
      fields: {
        "Attraction ID": "attr_4",
        "Attraction Name": "Tiran Island",
        Photos: [{ url: "/placeholder.svg?height=300&width=400" }],
        Location: "Sharm El Sheikh",
      },
    },
    {
      id: "5",
      fields: {
        "Attraction ID": "attr_5",
        "Attraction Name": "Abu Galum",
        Photos: [{ url: "/placeholder.svg?height=300&width=400" }],
        Location: "Dahab",
      },
    },
    {
      id: "6",
      fields: {
        "Attraction ID": "attr_6",
        "Attraction Name": "Mahmya Island",
        Photos: [{ url: "/placeholder.svg?height=300&width=400" }],
        Location: "Hurghada",
      },
    },
  ]

  // Use provided attractions or fallback if empty
  const displayAttractions = attractions.length > 0 ? attractions : fallbackAttractions

  // Helper function to get a valid slug for an attraction
  const getAttractionSlug = (attraction: Attraction) => {
    // First try to use the Slug field if it exists
    if (attraction.fields.Slug) {
      return attraction.fields.Slug
    }

    // If no Slug field, generate one from the attraction name
    if (attraction.fields["Attraction Name"]) {
      return slugify(attraction.fields["Attraction Name"])
    }

    // Last resort, use the Attraction ID
    return attraction.fields["Attraction ID"] || attraction.id
  }

  return (
    <section className="py-12 bg-white">
      <div className="container px-4 md:px-6">
        <h2 className="text-2xl font-bold mb-8">Top Attractions</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {displayAttractions.map((attraction) => (
            <Link href={`/attractions/${getAttractionSlug(attraction)}`} key={attraction.id} className="block group">
              <Card className="overflow-hidden border-0 shadow-sm h-full transition-all duration-200 hover:shadow-md">
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src={attraction.fields.Photos?.[0]?.url || "/placeholder.svg?height=300&width=400"}
                    alt={attraction.fields["Attraction Name"]}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-3">
                  <h3 className="font-medium text-sm line-clamp-1 text-center">
                    {attraction.fields["Attraction Name"]}
                  </h3>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

