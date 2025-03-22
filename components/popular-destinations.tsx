import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { getDestinations } from "@/lib/airtable"

export async function PopularDestinations() {
  // In a real app, you'd fetch this from Airtable
  // For now, we'll use placeholder data
  const destinations = await getDestinations(6).catch(() => []) // Fallback to empty array if fetch fails

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {destinations.length > 0
        ? destinations.map((destination) => (
            <Link
              href={`/destinations/${encodeURIComponent(destination.fields["Destination Name"])}`}
              key={destination.id}
            >
              <Card className="overflow-hidden hover:shadow-md transition-shadow h-full">
                <div className="aspect-[3/2] relative">
                  {destination.fields.Photo && destination.fields.Photo.length > 0 ? (
                    <Image
                      src={destination.fields.Photo[0].url || "/placeholder.svg"}
                      alt={destination.fields["Destination Name"]}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <Image
                      src="/placeholder.svg?height=200&width=300"
                      alt="Placeholder"
                      width={300}
                      height={200}
                      className="object-cover w-full h-full"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/20 flex items-end">
                    <CardContent className="p-4 text-white">
                      <h3 className="font-bold text-xl">{destination.fields["Destination Name"]}</h3>
                      <p className="text-sm opacity-90">
                        {destination.fields.City}, {destination.fields.Country}
                      </p>
                      <p className="text-sm mt-1">{destination.fields["Number of Listings"] || 0} experiences</p>
                    </CardContent>
                  </div>
                </div>
              </Card>
            </Link>
          ))
        : // Fallback placeholders if no destinations are available
          Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="overflow-hidden h-full">
              <div className="aspect-[3/2] relative">
                <Image
                  src="/placeholder.svg?height=200&width=300"
                  alt="Placeholder"
                  width={300}
                  height={200}
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-black/20 flex items-end">
                  <CardContent className="p-4 text-white">
                    <h3 className="font-bold text-xl">Hurghada</h3>
                    <p className="text-sm opacity-90">Hurghada, Egypt</p>
                    <p className="text-sm mt-1">24 experiences</p>
                  </CardContent>
                </div>
              </div>
            </Card>
          ))}
    </div>
  )
}

