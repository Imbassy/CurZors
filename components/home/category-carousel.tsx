"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import type { Category } from "@/lib/airtable"

interface CategoryCarouselProps {
  categories?: Category[]
}

export function CategoryCarousel({ categories = [] }: CategoryCarouselProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Fallback categories if none are provided
  const fallbackCategories = [
    {
      id: "1",
      fields: {
        "Category Name": "Diving",
        Description: "Explore the underwater world of the Red Sea",
        Photo: [{ url: "/placeholder.svg?height=400&width=400&text=Diving" }],
      },
    },
    {
      id: "2",
      fields: {
        "Category Name": "Snorkeling",
        Description: "Discover vibrant coral reefs and marine life",
        Photo: [{ url: "/placeholder.svg?height=400&width=400&text=Snorkeling" }],
      },
    },
    {
      id: "3",
      fields: {
        "Category Name": "Boat Tours",
        Description: "Cruise the crystal waters of the Red Sea",
        Photo: [{ url: "/placeholder.svg?height=400&width=400&text=Boat+Tours" }],
      },
    },
    {
      id: "4",
      fields: {
        "Category Name": "Fishing",
        Description: "Try your hand at catching exotic fish species",
        Photo: [{ url: "/placeholder.svg?height=400&width=400&text=Fishing" }],
      },
    },
    {
      id: "5",
      fields: {
        "Category Name": "Sailing",
        Description: "Experience the thrill of sailing in perfect conditions",
        Photo: [{ url: "/placeholder.svg?height=400&width=400&text=Sailing" }],
      },
    },
    {
      id: "6",
      fields: {
        "Category Name": "Whale Watching",
        Description: "Witness majestic marine mammals in their natural habitat",
        Photo: [{ url: "/placeholder.svg?height=400&width=400&text=Whale+Watching" }],
      },
    },
    {
      id: "7",
      fields: {
        "Category Name": "Sunset Cruises",
        Description: "Enjoy breathtaking sunsets over the Red Sea",
        Photo: [{ url: "/placeholder.svg?height=400&width=400&text=Sunset+Cruises" }],
      },
    },
    {
      id: "8",
      fields: {
        "Category Name": "Photography Tours",
        Description: "Capture stunning underwater and coastal landscapes",
        Photo: [{ url: "/placeholder.svg?height=400&width=400&text=Photography" }],
      },
    },
  ]

  const displayCategories = categories && categories.length > 0 ? categories : fallbackCategories

  if (!isMounted) {
    return null
  }

  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full"
    >
      <CarouselContent>
        {displayCategories.map((category) => {
          const categoryName = category.fields["Category Name"]
          const photoUrl =
            category.fields.Photo?.[0]?.url ||
            `/placeholder.svg?height=400&width=400&text=${encodeURIComponent(categoryName)}`

          return (
            <CarouselItem key={category.id} className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 p-4">
              <Link href={`/categories/${encodeURIComponent(categoryName)}`} className="block text-center">
                <div className="flex flex-col items-center">
                  <div className="relative w-40 h-40 mx-auto mb-3 overflow-hidden rounded-full border-4 border-white shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105">
                    <Image src={photoUrl || "/placeholder.svg"} alt={categoryName} fill className="object-cover" />
                  </div>
                  <h3 className="font-medium text-center mt-2">{categoryName}</h3>
                </div>
              </Link>
            </CarouselItem>
          )
        })}
      </CarouselContent>
      <div className="hidden sm:block">
        <CarouselPrevious className="left-0" />
        <CarouselNext className="right-0" />
      </div>
    </Carousel>
  )
}

