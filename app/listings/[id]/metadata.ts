import type { Metadata } from "next"
import { getListingById } from "@/lib/airtable"

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  try {
    const listing = await getListingById(params.id)

    if (!listing) {
      return {
        title: "Tour Not Found | Red Sea Quest",
        description: "The requested tour could not be found.",
      }
    }

    const title = listing.fields.Title
    const description =
      listing.fields.Description?.substring(0, 160) || "Book this amazing marine experience with Red Sea Quest."

    return {
      title: `${title} | Red Sea Quest`,
      description,
      openGraph: {
        title: `${title} | Red Sea Quest`,
        description,
        images: listing.fields.Photos?.[0]?.url ? [listing.fields.Photos[0].url] : [],
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: `${title} | Red Sea Quest`,
        description,
        images: listing.fields.Photos?.[0]?.url ? [listing.fields.Photos[0].url] : [],
      },
    }
  } catch (error) {
    console.error("Error generating metadata:", error)
    return {
      title: "Marine Tours & Experiences | Red Sea Quest",
      description: "Book unforgettable marine tours and experiences in the Red Sea region.",
    }
  }
}

