"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { Star, ThumbsUp, MessageSquare } from "lucide-react"
import { getReviewsByUser } from "@/lib/airtable"

export default function ReviewsPage() {
  const { user } = useAuth()
  const [reviews, setReviews] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchReviews() {
      if (!user) return

      try {
        const userReviews = await getReviewsByUser(user.id)
        setReviews(userReviews)
      } catch (error) {
        console.error("Error fetching reviews:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchReviews()
  }, [user])

  if (!user) {
    return (
      <div className="container px-4 py-8 md:px-6 md:py-12">
        <div className="text-center py-12">
          <h3 className="text-lg font-medium mb-2">Please log in to view your reviews</h3>
          <p className="text-muted-foreground mb-6">You need to be logged in to access this page</p>
          <Button asChild>
            <Link href="/auth/login">Login</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Reviews</h1>
          <p className="text-muted-foreground">Manage your reviews and see what others are saying</p>
        </div>

        <Tabs defaultValue="my-reviews">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="my-reviews">My Reviews</TabsTrigger>
            <TabsTrigger value="recent">Recent Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="my-reviews">
            {isLoading ? (
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Card key={i}>
                    <CardHeader>
                      <Skeleton className="h-6 w-3/4" />
                    </CardHeader>
                    <CardContent>
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-4 w-2/3" />
                    </CardContent>
                    <CardFooter>
                      <Skeleton className="h-4 w-24" />
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : reviews.length > 0 ? (
              <div className="space-y-6">
                {reviews.map((review) => (
                  <Card key={review.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <Link href={`/listings/${review.fields.Listing?.[0] || "#"}`}>
                          <CardTitle className="text-lg hover:underline">
                            {review.fields["Listing Title"] || "Experience"}
                          </CardTitle>
                        </Link>
                        <div className="flex">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`h-5 w-5 ${
                                i < review.fields.Rating ? "fill-primary text-primary" : "text-muted-foreground"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground whitespace-pre-line">{review.fields["Review Text"]}</p>

                      {review.fields.Photos && review.fields.Photos.length > 0 && (
                        <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                          {review.fields.Photos.map((photo: any, index: number) => (
                            <div key={index} className="relative h-20 w-20 flex-shrink-0 rounded-md overflow-hidden">
                              <Image
                                src={photo.url || "/placeholder.svg"}
                                alt={`Review photo ${index + 1}`}
                                fill
                                className="object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      )}

                      {review.fields["Sentiment Analysis"] && (
                        <div className="mt-4 text-xs inline-flex items-center px-2.5 py-0.5 rounded-full bg-primary/10 text-primary">
                          {review.fields["Sentiment Analysis"]}
                        </div>
                      )}
                    </CardContent>
                    <CardFooter className="pt-0 text-xs text-muted-foreground flex justify-between">
                      <span>Posted on {review.fields["Review Date"]}</span>
                      <div className="flex gap-4">
                        <button className="flex items-center gap-1 hover:text-foreground">
                          <ThumbsUp className="h-3 w-3" />
                          <span>Edit</span>
                        </button>
                        <button className="flex items-center gap-1 hover:text-foreground">
                          <MessageSquare className="h-3 w-3" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium mb-2">No reviews yet</h3>
                <p className="text-muted-foreground mb-6">You haven't written any reviews yet</p>
                <Button asChild>
                  <Link href="/bookings">Review Your Experiences</Link>
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="recent">
            <div className="text-center py-12">
              <h3 className="text-lg font-medium mb-2">Coming Soon</h3>
              <p className="text-muted-foreground mb-6">
                We're working on bringing you the latest reviews from other travelers
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

