"use client"

import { useState } from "react"
import { Star, ThumbsUp, MessageSquare, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { ReviewForm } from "@/app/listings/[id]/review-form"

interface TourReviewsProps {
  rating: number
  reviewCount: number
}

export function TourReviews({ rating, reviewCount }: TourReviewsProps) {
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [expandedReviews, setExpandedReviews] = useState<number[]>([])

  // Mock data for rating breakdown
  const ratingBreakdown = [
    { stars: 5, percentage: 75, count: Math.round(reviewCount * 0.75) },
    { stars: 4, percentage: 15, count: Math.round(reviewCount * 0.15) },
    { stars: 3, percentage: 5, count: Math.round(reviewCount * 0.05) },
    { stars: 2, percentage: 3, count: Math.round(reviewCount * 0.03) },
    { stars: 1, percentage: 2, count: Math.round(reviewCount * 0.02) },
  ]

  // Mock reviews
  const reviews = [
    {
      id: 1,
      author: "Sarah J.",
      country: "United States",
      date: "March 2025",
      rating: 5,
      title: "Amazing experience!",
      content:
        "The snorkeling tour was incredible. We saw so many colorful fish and the guides were very professional. The boat was clean and comfortable, and the lunch provided was delicious. I would highly recommend this tour to anyone visiting the area. Our guide was knowledgeable and made sure everyone was safe and having a good time. We'll definitely book again on our next trip!",
      helpful: 12,
    },
    {
      id: 2,
      author: "Michael T.",
      country: "United Kingdom",
      date: "February 2025",
      rating: 4,
      title: "Great day out with minor hiccups",
      content:
        "Overall, we had a wonderful time on our diving trip. The underwater scenery was breathtaking and the equipment provided was in excellent condition. The only small issue was that it started a bit late, which shortened our time at the second dive site. The staff was apologetic and professional about it. The lunch was good and the boat was comfortable. Would recommend but be prepared for possible delays.",
      helpful: 8,
    },
    {
      id: 3,
      author: "Emma L.",
      country: "Australia",
      date: "January 2025",
      rating: 5,
      title: "Exceeded all expectations",
      content:
        "This tour was the highlight of our vacation! The staff was incredibly friendly and knowledgeable. They made sure everyone was comfortable with the equipment before getting in the water. The coral reefs were stunning and we even saw a sea turtle! The photos they took of us underwater were fantastic quality and included in the price. Highly recommend this tour for anyone visiting the area!",
      helpful: 15,
    },
    {
      id: 4,
      author: "David R.",
      country: "Canada",
      date: "December 2024",
      rating: 3,
      title: "Good experience but overpriced",
      content:
        "The diving itself was good and the guides were knowledgeable. However, I felt that the tour was a bit overpriced for what was offered. The lunch was basic and the boat was quite crowded. The underwater experience was nice but not exceptional compared to other diving spots I've visited. Might be worth it for beginners but experienced divers might want to look elsewhere.",
      helpful: 5,
    },
    {
      id: 5,
      author: "Sophia K.",
      country: "Germany",
      date: "November 2024",
      rating: 5,
      title: "Perfect day on the water",
      content:
        "Everything about this tour was perfect from start to finish. The pickup was on time, the staff was friendly and professional, and the diving spots were amazing. We saw so many different species of fish and even a small reef shark! The equipment was in great condition and the safety briefing was thorough. Would definitely book again!",
      helpful: 10,
    },
  ]

  const toggleReviewExpansion = (reviewId: number) => {
    setExpandedReviews((prev) => (prev.includes(reviewId) ? prev.filter((id) => id !== reviewId) : [...prev, reviewId]))
  }

  return (
    <div className="space-y-8">
      {/* Rating summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        <div className="text-center">
          <div className="text-5xl font-bold">{rating.toFixed(1)}</div>
          <div className="flex justify-center my-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "h-5 w-5",
                  i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground",
                )}
              />
            ))}
          </div>
          <div className="text-sm text-muted-foreground">{reviewCount} reviews</div>
        </div>

        <div className="md:col-span-2 space-y-2">
          {ratingBreakdown.map((item) => (
            <div key={item.stars} className="flex items-center gap-2">
              <div className="w-12 text-sm">{item.stars} stars</div>
              <Progress value={item.percentage} className="h-2 flex-1" />
              <div className="w-10 text-sm text-right">{item.count}</div>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Review form toggle */}
      <div>
        <Button variant="outline" onClick={() => setShowReviewForm(!showReviewForm)} className="w-full">
          {showReviewForm ? "Cancel" : "Write a Review"}
        </Button>

        {showReviewForm && (
          <div className="mt-4">
            <ReviewForm />
          </div>
        )}
      </div>

      <Separator />

      {/* Reviews list */}
      <div className="space-y-6">
        {reviews.map((review) => {
          const isExpanded = expandedReviews.includes(review.id)
          const shouldTruncate = review.content.length > 200 && !isExpanded

          return (
            <div key={review.id} className="space-y-2">
              <div className="flex justify-between">
                <div className="flex items-center gap-2">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>{review.author.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{review.author}</div>
                    <div className="text-xs text-muted-foreground">
                      {review.country} • {review.date}
                    </div>
                  </div>
                </div>
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "h-4 w-4",
                        i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground",
                      )}
                    />
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium">{review.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {shouldTruncate ? `${review.content.substring(0, 200)}...` : review.content}
                </p>

                {review.content.length > 200 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-1 h-auto p-0 text-primary"
                    onClick={() => toggleReviewExpansion(review.id)}
                  >
                    {isExpanded ? "Show less" : "Read more"}
                  </Button>
                )}
              </div>

              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <Button variant="ghost" size="sm" className="h-auto p-0 text-xs flex items-center gap-1">
                  <ThumbsUp className="h-3 w-3" />
                  Helpful ({review.helpful})
                </Button>
                <Button variant="ghost" size="sm" className="h-auto p-0 text-xs flex items-center gap-1">
                  <MessageSquare className="h-3 w-3" />
                  Reply
                </Button>
              </div>

              {review.id !== reviews.length && <Separator className="mt-4" />}
            </div>
          )
        })}
      </div>

      <Button variant="outline" className="w-full">
        Show all {reviewCount} reviews
        <ChevronDown className="ml-2 h-4 w-4" />
      </Button>
    </div>
  )
}

