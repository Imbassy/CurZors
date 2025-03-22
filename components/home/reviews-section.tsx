import { Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

export function ReviewsSection() {
  const reviews = [
    {
      id: "1",
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=50&width=50",
      location: "United Kingdom",
      rating: 5,
      date: "20 minutes ago",
      title: "It's very easy to book tours with...",
      content:
        "It's very easy to book tours with Red Sea Quest. I have never had any issues. The tours are always as described and the guides are professional and friendly.",
    },
    {
      id: "2",
      name: "Michael Chen",
      avatar: "/placeholder.svg?height=50&width=50",
      location: "United States",
      rating: 5,
      date: "30 minutes ago",
      title: "Unique cultural experience",
      content:
        "My husband and I thoroughly enjoyed our diving trip to the Blue Hole. The equipment was top-notch and our guide was extremely knowledgeable about the marine life.",
    },
    {
      id: "3",
      name: "Emma Schmidt",
      avatar: "/placeholder.svg?height=50&width=50",
      location: "Germany",
      rating: 4,
      date: "45 minutes ago",
      title: "Coming from England we had to take...",
      content:
        "Coming from England we had to take this tour while in Hurghada and it did not disappoint! The snorkeling was amazing and we saw so many colorful fish.",
    },
  ]

  return (
    <section className="py-16 bg-white border-t">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center mb-10">
          <h2 className="text-2xl font-bold mb-2">Excellent</h2>
          <div className="flex mb-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-green-500 text-green-500" />
            ))}
          </div>
          <p className="text-sm text-muted-foreground">Based on 10,000+ verified reviews</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <Card key={review.id} className="h-full border border-gray-200">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "h-4 w-4",
                        i < review.rating ? "fill-green-500 text-green-500" : "text-muted-foreground",
                      )}
                    />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mb-4">{review.date}</p>
                <h3 className="font-semibold text-lg mb-2">{review.title}</h3>
                <p className="text-muted-foreground text-sm line-clamp-4 mb-4">{review.content}</p>
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={review.avatar} alt={review.name} />
                    <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="text-sm font-medium">{review.name}</div>
                    <div className="text-xs text-muted-foreground">{review.location}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <div className="flex items-center">
            <img
              src="https://cdn.trustpilot.net/brand-assets/4.1.0/stars/stars-5.svg"
              alt="Trustpilot 5 stars"
              className="h-6 mr-2"
            />
            <span className="text-sm font-medium">TrustPilot</span>
          </div>
        </div>
      </div>
    </section>
  )
}

