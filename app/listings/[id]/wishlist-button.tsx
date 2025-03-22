"use client"

import { Heart } from "lucide-react"
import { cn } from "@/lib/utils"
import { useWishlist } from "@/contexts/wishlist-context"
import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"

interface WishlistButtonProps {
  listingId: string
  className?: string
}

export function WishlistButton({ listingId, className }: WishlistButtonProps) {
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist()
  const { t } = useLanguage()
  const isWishlisted = isInWishlist(listingId)

  const handleWishlistToggle = () => {
    if (isWishlisted) {
      removeFromWishlist(listingId)
    } else {
      addToWishlist(listingId)
    }
  }

  return (
    <Button
      variant={isWishlisted ? "default" : "outline"}
      size="sm"
      className={cn("gap-1", className)}
      onClick={handleWishlistToggle}
      aria-label={isWishlisted ? t("remove_from_wishlist") : t("add_to_wishlist")}
    >
      <Heart className={cn("h-4 w-4", isWishlisted ? "fill-current" : "")} />
      {isWishlisted ? t("remove_from_wishlist") : t("add_to_wishlist")}
    </Button>
  )
}

