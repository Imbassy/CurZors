import Link from "next/link"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import type { Destination } from "@/lib/airtable"

interface TopDestinationsProps {
  destinations?: Destination[]
}

export function TopDestinations({ destinations = [] }: TopDestinationsProps) {
  // Fallback destinations if none are provided
  const fallbackDestinations = [
    {
      id: "1",
      fields: {
        "Destination Name": "Hurghada",
        Country: "Egypt",
        City: "Hurghada",
        Description: "A beautiful beach resort town stretching 40km along Egypt's Red Sea coast.",
        "Number of Listings": 24,
        Photo: [{ url: "/placeholder.svg?height=400&width=600", filename: "hurghada", id: "1" }],
      },
    },
    {
      id: "2",
      fields: {
        "Destination Name": "Sharm El Sheikh",
        Country: "Egypt",
        City: "Sharm El Sheikh",
        Description: "A resort town between the desert of the Sinai Peninsula and the Red Sea.",
        "Number of Listings": 18,
        Photo: [{ url: "/placeholder.svg?height=400&width=600", filename: "sharm", id: "2" }],
      },
    },
    {
      id: "3",
      fields: {
        "Destination Name": "Dahab",
        Country: "Egypt",
        City: "Dahab",
        Description: "Once a Bedouin fishing village, now one of the Red Sea's most treasured diving destinations.",
        "Number of Listings": 12,
        Photo: [{ url: "/placeholder.svg?height=400&width=600", filename: "dahab", id: "3" }],
      },
    },
    {
      id: "4",
      fields: {
        "Destination Name": "Marsa Alam",
        Country: "Egypt",
        City: "Marsa Alam",
        Description: "A town on the west coast of the Red Sea, known for its pristine beaches and coral reefs.",
        "Number of Listings": 10,
        Photo: [{ url: "/placeholder.svg?height=400&width=600", filename: "marsa", id: "4" }],
      },
    },
    {
      id: "5",
      fields: {
        "Destination Name": "El Gouna",
        Country: "Egypt",
        City: "El Gouna",
        Description: "A modern resort town with lagoons, coral reefs and sandy beaches.",
        "Number of Listings": 15,
        Photo: [{ url: "/placeholder.svg?height=400&width=600", filename: "gouna", id: "5" }],
      },
    },
  ]

  const displayDestinations = destinations && destinations.length > 0 ? destinations : fallbackDestinations

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {displayDestinations.map((destination) => (
        <Link
          href={`/destinations/${encodeURIComponent(destination.fields["Destination Name"] || "")}`}
          key={destination.id}
          className="block"
        >
          <Card className="overflow-hidden hover:shadow-md transition-shadow border-0 shadow-sm h-full group">
            <div className="aspect-square relative">
              {destination.fields.Photo && destination.fields.Photo.length > 0 ? (
                <Image
                  src={destination.fields.Photo[0].url || "/placeholder.svg"}
                  alt={destination.fields["Destination Name"]}
                  fill
                  className="object-cover"
                />
              ) : (
                <Image
                  src="/placeholder.svg?height=300&width=300"
                  alt="Placeholder"
                  width={300}
                  height={300}
                  className="object-cover w-full h-full"
                />
              )}
              {/* Overlay that disappears on hover */}
              <div className="absolute inset-0 bg-black/40 transition-opacity duration-300 group-hover:opacity-0"></div>

              {/* Title that stays visible */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <h3
                  className="text-xl md:text-2xl font-semibold text-white text-center z-10"
                  style={{ textShadow: "0 2px 4px rgba(0,0,0,0.8), 0 4px 12px rgba(0,0,0,0.5)" }}
                >
                  {destination.fields["Destination Name"]}
                </h3>
              </div>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  )
}

