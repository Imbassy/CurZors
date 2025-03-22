"use server"

import { revalidatePath } from "next/cache"
import { createReview, getListingById } from "@/lib/airtable"
import { v4 as uuidv4 } from "uuid"
import { logError } from "@/lib/error-handler"

// Update this interface to match the createReview function parameters
interface ReviewData {
  listingId: string
  rating: number
  title?: string
  reviewText: string
  userId?: string
}

export async function submitReview(data: ReviewData) {
  try {
    // Get the listing to ensure it exists
    const listing = await getListingById(data.listingId)

    if (!listing) {
      return {
        success: false,
        message: "Listing not found",
      }
    }

    // In a real app, you would get the user ID from the session
    // For now, we'll create a placeholder user ID
    const userId = data.userId || `user_${uuidv4().substring(0, 8)}`

    // Create the review with pending status for admin approval
    await createReview({
      userId,
      listingId: listing.id, // Use the actual Airtable record ID
      rating: data.rating,
      reviewText: data.reviewText,
      pendingApproval: true, // Add this field to createReview function
      title: data.title,
    })

    // Revalidate the listing page to update reviews count (though new review won't show until approved)
    revalidatePath(`/listings/${data.listingId}`)

    return {
      success: true,
      message: "Review submitted successfully and is pending approval",
    }
  } catch (error) {
    logError({
      message: "Error submitting review",
      source: "review",
      context: { listingId: data.listingId },
      originalError: error,
    })

    return {
      success: false,
      message: "Failed to submit review. Please try again.",
    }
  }
}

