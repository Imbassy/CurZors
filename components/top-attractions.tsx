import Link from "next/link"
import Image from "next/image"
import { Card } from "@/components/ui/card"

export function TopAttractions() {
  const attractions = [
    {
      id: "1",
      name: "Giftun Island",
      image: "/placeholder.svg?height=200&width=200",
      location: "Hurghada",
      description: "Crystal clear waters and pristine beaches",
    },
    {
      id: "2",
      name: "Ras Mohammed",
      image: "/placeholder.svg?height=200&width=200",
      location: "Sharm El Sheikh",
      description: "World-famous national park with stunning coral reefs",
    },
    {
      id: "3",
      name: "Blue Hole",
      image: "/placeholder.svg?height=200&width=200",
      location: "Dahab",
      description: "Legendary diving spot for experienced divers",
    },
    {
      id: "4",
      name: "Tiran Island",
      image: "/placeholder.svg?height=200&width=200",
      location: "Sharm El Sheikh",
      description: "Spectacular snorkeling and diving location",
    },
    {
      id: "5",
      name: "Abu Galum",
      image: "/placeholder.svg?height=200&width=200",
      location: "Dahab",
      description: "Protected area with unique marine and desert ecosystems",
    },
    {
      id: "6",
      name: "Mahmya Island",
      image: "/placeholder.svg?height=200&width=200",
      location: "Hurghada",
      description: "Eco-tourism paradise with white sand beaches",
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {attractions.map((attraction) => (
        <Link href={`/attractions/${attraction.id}`} key={attraction.id}>
          <Card className="overflow-hidden hover:shadow-md transition-shadow h-full">
            <div className="aspect-square relative overflow-hidden">
              <Image
                src={attraction.image || "/placeholder.svg"}
                alt={attraction.name}
                fill
                className="object-cover transition-transform hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-3">
                <h3 className="font-medium text-white text-sm">{attraction.name}</h3>
                <p className="text-xs text-white/80">{attraction.location}</p>
              </div>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  )
}

