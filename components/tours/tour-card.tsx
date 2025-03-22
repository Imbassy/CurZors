"use client"

import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart } from "lucide-react"
import { useWishlist } from "@/hooks/use-wishlist"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export interface TourCardProps {
  id: string
  title: string
  slug: string
  price: number
  duration: string
  location: string
  image: string
  rating?: number
  reviewCount?: number
  featured?: boolean
  discount?: number
}

export function TourCard({
  id,
  title,
  slug,
  price,
  duration,
  location,
  image,
  rating,
  reviewCount,
  featured,
  discount,
}: TourCardProps) {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const inWishlist = isInWishlist(id)

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (inWishlist) {
      removeFromWishlist(id)
    } else {
      addToWishlist({
        id,
        title,
        slug,
        price,
        image,
        location,
      })
    }
  }

  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price)

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md">
      <div className="relative aspect-[16/9] bg-gray-200 sm:aspect-[2/1] lg:aspect-[3/2]">
        <Image src={image || "/placeholder.svg?height=300&width=400"} alt={title} fill className="object-cover" />
        <button
          onClick={handleWishlistToggle}
          className="absolute right-2 top-2 rounded-full bg-white/80 p-1.5 shadow-sm transition-colors hover:bg-white"
          aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart
            className={`h-5 w-5 ${inWishlist ? "fill-red-500 text-red-500" : "text-gray-500"}`}
            fill={inWishlist ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth={2}
          />
        </button>
        {featured && <Badge className="absolute left-2 top-2 bg-blue-500 text-white">Featured</Badge>}
        {discount && discount > 0 && (
          <Badge className="absolute left-2 bottom-2 bg-red-500 text-white">{discount}% OFF</Badge>
        )}
      </div>

      <Link href={`/tours/${slug}`} className="flex flex-1 flex-col p-4">
        <div className="flex-1">
          <h3 className="font-semibold text-lg text-gray-900">{title}</h3>
          <div className="mt-1 flex items-center text-sm text-gray-500">
            <span className="flex items-center">
              <svg className="mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
              {location}
            </span>
          </div>
          <div className="mt-1 flex items-center text-sm text-gray-500">
            <span className="flex items-center">
              <svg className="mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
                <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
              </svg>
              {duration}
            </span>
          </div>
          {rating && (
            <div className="mt-1 flex items-center">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`h-4 w-4 ${i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              {reviewCount && <span className="ml-1 text-sm text-gray-500">({reviewCount} reviews)</span>}
            </div>
          )}
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-gray-900">{formattedPrice}</span>
            {discount && discount > 0 && (
              <span className="ml-2 text-sm text-gray-500 line-through">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(price / (1 - discount / 100))}
              </span>
            )}
          </div>
          <Button size="sm" variant="outline">
            View Details
          </Button>
        </div>
      </Link>
    </div>
  )
}

