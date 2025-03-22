"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Star } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { submitReview } from "./actions"
import { cn } from "@/lib/utils"
import { z } from "zod"

// Validation schema
const reviewSchema = z.object({
  rating: z.number().min(1, "Please select a rating").max(5),
  title: z.string().min(3, "Title must be at least 3 characters").max(100),
  review: z.string().min(10, "Review must be at least 10 characters").max(1000),
})

type ReviewFormData = z.infer<typeof reviewSchema>

interface ReviewFormProps {
  listingId?: string
}

export function ReviewForm({ listingId = "default" }: ReviewFormProps) {
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [title, setTitle] = useState("")
  const [review, setReview] = useState("")
  const [isPending, setIsPending] = useState(false)
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null)

  const handleRatingClick = (selectedRating: number) => {
    setRating(selectedRating)
  }

  const handleRatingHover = (hoveredRating: number) => {
    setHoveredRating(hoveredRating)
  }

  const handleRatingLeave = () => {
    setHoveredRating(0)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    try {
      // Validate form data
      reviewSchema.parse({
        rating,
        title,
        review,
      })
    } catch (error) {
      if (error instanceof z.ZodError) {
        setMessage({ text: error.errors[0].message, type: "error" })
        return
      }
    }

    setIsPending(true)
    setMessage(null)

    try {
      const result = await submitReview({
        listingId,
        rating,
        title,
        reviewText: review,
      })

      if (result.success) {
        setMessage({
          text: "Thank you for your review! It will be visible after admin approval.",
          type: "success",
        })
        setReview("")
        setTitle("")
        setRating(0)
      } else {
        setMessage({ text: result.message || "An error occurred", type: "error" })
      }
    } catch (error) {
      setMessage({
        text: "An error occurred while submitting your review. Please try again.",
        type: "error",
      })
    } finally {
      setIsPending(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {message && (
        <Alert
          variant={message.type === "error" ? "destructive" : "default"}
          className={
            message.type === "success" ? "bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-400" : ""
          }
        >
          <AlertDescription>{message.text}</AlertDescription>
        </Alert>
      )}

      <div>
        <Label htmlFor="rating" className="block mb-2">
          Your rating
        </Label>
        <div className="flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => handleRatingClick(star)}
              onMouseEnter={() => handleRatingHover(star)}
              onMouseLeave={handleRatingLeave}
              className="p-1"
            >
              <Star
                className={cn(
                  "h-6 w-6",
                  star <= (hoveredRating || rating) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground",
                )}
              />
            </button>
          ))}
        </div>
      </div>

      <div>
        <Label htmlFor="title" className="block mb-2">
          Review title
        </Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Summarize your experience"
          required
        />
      </div>

      <div>
        <Label htmlFor="review" className="block mb-2">
          Your review
        </Label>
        <Textarea
          id="review"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Share your experience with this tour..."
          rows={4}
          className="resize-none"
          required
        />
      </div>

      <Button type="submit" disabled={isPending}>
        {isPending ? "Submitting..." : "Submit Review"}
      </Button>
    </form>
  )
}

