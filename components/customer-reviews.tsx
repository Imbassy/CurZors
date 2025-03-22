import { Star } from "lucide-react"

export function CustomerReviews() {
  const reviews = [
    {
      id: "1",
      rating: 5,
      title: "Amazing experience!",
      content:
        "The snorkeling tour was incredible. We saw so many colorful fish and the guides were very professional.",
      author: "Sarah from Germany",
      date: "March 2025",
    },
    {
      id: "2",
      rating: 5,
      title: "Exceeded expectations",
      content: "The boat was clean, the staff was friendly, and the food was delicious. Would definitely book again!",
      author: "Michael from UK",
      date: "February 2025",
    },
    {
      id: "3",
      rating: 4,
      title: "Great day out",
      content: "We had a wonderful time on our diving trip. The only small issue was that it started a bit late.",
      author: "David from USA",
      date: "January 2025",
    },
  ]

  return (
    <section className="bg-primary/5 py-12">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">Excellent</h2>
          <div className="flex justify-center mb-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-6 w-6 fill-[#ffd935] text-[#ffd935]" />
            ))}
          </div>
          <p className="text-sm text-muted-foreground">Based on 10,000+ reviews</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div key={review.id} className="bg-background p-6 rounded-lg shadow-sm">
              <div className="flex mb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < review.rating ? "fill-[#ffd935] text-[#ffd935]" : "text-muted-foreground"
                    }`}
                  />
                ))}
              </div>
              <h3 className="font-semibold mb-2">{review.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{review.content}</p>
              <div className="text-xs text-muted-foreground">
                <span>{review.author}</span> • <span>{review.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

