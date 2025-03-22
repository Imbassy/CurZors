"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Star, CheckCircle, XCircle, AlertCircle, Loader2 } from "lucide-react"
import { getPendingReviews, updateReviewApproval } from "@/lib/airtable"
import { cn } from "@/lib/utils"

export default function AdminReviewsPage() {
  const [pendingReviews, setPendingReviews] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [adminNotes, setAdminNotes] = useState<Record<string, string>>({})
  const [processingReviews, setProcessingReviews] = useState<Record<string, boolean>>({})

  useEffect(() => {
    async function fetchPendingReviews() {
      try {
        const reviews = await getPendingReviews()
        setPendingReviews(reviews)
      } catch (error) {
        console.error("Error fetching pending reviews:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPendingReviews()
  }, [])

  const handleAdminNotesChange = (reviewId: string, notes: string) => {
    setAdminNotes((prev) => ({
      ...prev,
      [reviewId]: notes,
    }))
  }

  const handleApproveReview = async (reviewId: string) => {
    setProcessingReviews((prev) => ({
      ...prev,
      [reviewId]: true,
    }))

    try {
      await updateReviewApproval(reviewId, "Approved", adminNotes[reviewId])

      // Remove the approved review from the list
      setPendingReviews((prev) => prev.filter((review) => review.fields["Review ID"] !== reviewId))
    } catch (error) {
      console.error("Error approving review:", error)
    } finally {
      setProcessingReviews((prev) => ({
        ...prev,
        [reviewId]: false,
      }))
    }
  }

  const handleRejectReview = async (reviewId: string) => {
    if (!adminNotes[reviewId]) {
      alert("Please provide admin notes explaining why this review is being rejected.")
      return
    }

    setProcessingReviews((prev) => ({
      ...prev,
      [reviewId]: true,
    }))

    try {
      await updateReviewApproval(reviewId, "Rejected", adminNotes[reviewId])

      // Remove the rejected review from the list
      setPendingReviews((prev) => prev.filter((review) => review.fields["Review ID"] !== reviewId))
    } catch (error) {
      console.error("Error rejecting review:", error)
    } finally {
      setProcessingReviews((prev) => ({
        ...prev,
        [reviewId]: false,
      }))
    }
  }

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Review Management</h1>
          <p className="text-muted-foreground">Approve or reject customer reviews before they are published</p>
        </div>

        <Tabs defaultValue="pending">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="pending">Pending Reviews</TabsTrigger>
            <TabsTrigger value="approved">Approved Reviews</TabsTrigger>
            <TabsTrigger value="rejected">Rejected Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="pending">
            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : pendingReviews.length > 0 ? (
              <div className="space-y-6">
                {pendingReviews.map((review) => (
                  <Card key={review.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg flex items-center gap-2">
                            {review.fields["Review Title"] || "Review"}
                            <Badge variant="outline" className="ml-2">
                              Pending
                            </Badge>
                          </CardTitle>
                          <p className="text-sm text-muted-foreground">
                            For: {review.fields["Listing Title"] || "Unknown Listing"}
                          </p>
                        </div>
                        <div className="flex">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={cn(
                                "h-5 w-5",
                                i < review.fields.Rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground",
                              )}
                            />
                          ))}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-4">
                        <p className="text-sm font-medium mb-1">Review Content:</p>
                        <p className="text-muted-foreground whitespace-pre-line border p-3 rounded-md bg-muted/30">
                          {review.fields["Review Text"]}
                        </p>
                      </div>

                      <div className="mb-4">
                        <p className="text-sm font-medium mb-1">Admin Notes:</p>
                        <Textarea
                          placeholder="Add notes about this review (required for rejection)"
                          value={adminNotes[review.fields["Review ID"]] || ""}
                          onChange={(e) => handleAdminNotesChange(review.fields["Review ID"], e.target.value)}
                          rows={2}
                        />
                      </div>

                      <div className="text-xs text-muted-foreground">
                        <p>Submitted by: {review.fields["User Full Name"] || "Anonymous"}</p>
                        <p>Date: {review.fields["Review Date"]}</p>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                        onClick={() => handleRejectReview(review.fields["Review ID"])}
                        disabled={processingReviews[review.fields["Review ID"]]}
                      >
                        {processingReviews[review.fields["Review ID"]] ? (
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        ) : (
                          <XCircle className="h-4 w-4 mr-2" />
                        )}
                        Reject
                      </Button>
                      <Button
                        variant="outline"
                        className="border-green-200 text-green-600 hover:bg-green-50 hover:text-green-700"
                        onClick={() => handleApproveReview(review.fields["Review ID"])}
                        disabled={processingReviews[review.fields["Review ID"]]}
                      >
                        {processingReviews[review.fields["Review ID"]] ? (
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        ) : (
                          <CheckCircle className="h-4 w-4 mr-2" />
                        )}
                        Approve
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No pending reviews</h3>
                <p className="text-muted-foreground">All reviews have been processed</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="approved">
            <div className="text-center py-12">
              <h3 className="text-lg font-medium mb-2">Approved Reviews</h3>
              <p className="text-muted-foreground mb-6">This section will show all approved reviews</p>
              <Button variant="outline">View All Approved Reviews</Button>
            </div>
          </TabsContent>

          <TabsContent value="rejected">
            <div className="text-center py-12">
              <h3 className="text-lg font-medium mb-2">Rejected Reviews</h3>
              <p className="text-muted-foreground mb-6">This section will show all rejected reviews</p>
              <Button variant="outline">View All Rejected Reviews</Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

