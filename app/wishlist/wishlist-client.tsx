"use client"

import { useWishlist } from "@/hooks/use-wishlist"
import { WishlistProvider } from "@/context/wishlist-provider"
import { TourCard } from "@/components/tours/tour-card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { EmptyState } from "@/components/empty-state"

function WishlistContent() {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist()
  const router = useRouter()

  if (!wishlist || wishlist.length === 0) {
    return (
      <EmptyState
        title="Your wishlist is empty"
        description="You haven't added any tours to your wishlist yet."
        action={<Button onClick={() => router.push("/tours")}>Browse Tours</Button>}
      />
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <p className="text-muted-foreground">
          {wishlist.length} {wishlist.length === 1 ? "item" : "items"} in your wishlist
        </p>
        <Button variant="outline" onClick={clearWishlist}>
          Clear Wishlist
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlist.map((tour) => (
          <TourCard
            key={tour.id}
            tour={tour}
            actions={
              <Button variant="outline" size="sm" onClick={() => removeFromWishlist(tour.id)}>
                Remove
              </Button>
            }
          />
        ))}
      </div>
    </div>
  )
}

export default function WishlistClient() {
  return (
    <WishlistProvider>
      <WishlistContent />
    </WishlistProvider>
  )
}

