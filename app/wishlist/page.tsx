import { Suspense } from "react"
import WishlistClient from "./wishlist-client"
import { PageHeader } from "@/components/page-header"

export const metadata = {
  title: "My Wishlist | Red Sea Quest",
  description: "View and manage your saved tours and experiences.",
}

export default function WishlistPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader title="My Wishlist" description="Your saved tours and experiences" />

      <Suspense fallback={<div className="text-center py-10">Loading your wishlist...</div>}>
        <WishlistClient />
      </Suspense>
    </div>
  )
}

