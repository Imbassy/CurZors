import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Heart } from "lucide-react"
import { cn } from "@/lib/utils"

export function RecentlyViewed() {
  // In a real app, this would be fetched from user's history
  const recentlyViewed = [
    {
      id: "1",
      title: "Dolphin Watching and Snorkeling Tour",
      image: "/placeholder.svg?height=200&width=300",
      price: 89,
      rating: 4.8,
      reviews: 124,
      location: "Hurghada, Egypt",
      category: "Boat Tours",
    },
    {
      id: "2",
      title: "Scuba Diving Experience for Beginners",
      image: "/placeholder.svg?height=200&width=300",
      price: 129,
      rating: 4.9,
      reviews: 86,
      location: "Sharm El Sheikh, Egypt",
      category: "Diving",
    },
    {
      id: "3",
      title: "Luxury Yacht Day Trip with Lunch",
      image: "/placeholder.svg?height=200&width=300",
      price: 199,
      rating: 4.7,
      reviews: 52,
      location: "Hurghada, Egypt",
      category: "Sailing",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {recentlyViewed.map((item) => (
        <Card key={item.id} className="overflow-hidden group">
          <div className="aspect-[3/2] relative">
            <Image
              src={item.image || "/placeholder.svg"}
              alt={item.title}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
            <button className="absolute top-2 right-2 p-1.5 bg-white/80 rounded-full">
              <Heart className="h-4 w-4 text-muted-foreground hover:text-red-500" />
            </button>
            <div className="absolute top-2 left-2">
              <Badge className="bg-black/70 text-white hover:bg-black/80">{item.category}</Badge>
            </div>
          </div>
          <CardContent className="p-4">
            <div className="flex items-center text-sm text-muted-foreground mb-1">
              <span>{item.location}</span>
            </div>
            <h3 className="font-semibold line-clamp-2 mb-1">{item.title}</h3>
            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "h-4 w-4",
                    i < Math.floor(item.rating) ? "fill-[#ffd935] text-[#ffd935]" : "text-muted-foreground",
                  )}
                />
              ))}
              <span className="text-sm ml-1">
                {item.rating} ({item.reviews})
              </span>
            </div>
          </CardContent>
          <CardFooter className="p-4 pt-0 flex justify-between items-center">
            <div>
              <span className="font-semibold">${item.price}</span>
              <span className="text-sm text-muted-foreground"> per adult</span>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

