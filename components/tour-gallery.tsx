"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface TourGalleryProps {
  photos: Array<{ url: string; filename: string; id: string }>
  title: string
}

export function TourGallery({ photos, title }: TourGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showFullscreen, setShowFullscreen] = useState(false)

  // Use placeholder if no photos
  const displayPhotos =
    photos.length > 0
      ? photos
      : [{ url: "/placeholder.svg?height=600&width=800", filename: "Placeholder", id: "placeholder" }]

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? displayPhotos.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === displayPhotos.length - 1 ? 0 : prev + 1))
  }

  const handleThumbnailClick = (index: number) => {
    setCurrentIndex(index)
  }

  const toggleFullscreen = () => {
    setShowFullscreen((prev) => !prev)
  }

  return (
    <div className="relative">
      {/* Main image */}
      <div className="relative aspect-[16/9] rounded-lg overflow-hidden">
        <Image
          src={displayPhotos[currentIndex].url || "/placeholder.svg"}
          alt={`${title} - Photo ${currentIndex + 1}`}
          fill
          className="object-cover"
          priority
        />

        {/* Navigation buttons */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 text-white hover:bg-black/50 h-10 w-10 rounded-full"
          onClick={handlePrevious}
          aria-label="Previous photo"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 text-white hover:bg-black/50 h-10 w-10 rounded-full"
          onClick={handleNext}
          aria-label="Next photo"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>

        {/* Fullscreen button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-2 bg-black/30 text-white hover:bg-black/50 h-8 w-8 rounded-full"
          onClick={toggleFullscreen}
          aria-label="View fullscreen"
        >
          <Expand className="h-4 w-4" />
        </Button>

        {/* Photo counter */}
        <div className="absolute left-2 bottom-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
          {currentIndex + 1} / {displayPhotos.length}
        </div>
      </div>

      {/* Thumbnails */}
      <div className="flex mt-2 gap-2 overflow-x-auto pb-2">
        {displayPhotos.map((photo, index) => (
          <button
            key={photo.id}
            onClick={() => handleThumbnailClick(index)}
            className={cn(
              "relative h-16 w-24 flex-shrink-0 rounded overflow-hidden border-2",
              index === currentIndex ? "border-primary" : "border-transparent",
            )}
          >
            <Image
              src={photo.url || "/placeholder.svg"}
              alt={`${title} - Thumbnail ${index + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>

      {/* Fullscreen modal */}
      {showFullscreen && (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4 bg-black/30 text-white hover:bg-black/50 h-10 w-10 rounded-full"
            onClick={toggleFullscreen}
            aria-label="Close fullscreen"
          >
            <X className="h-6 w-6" />
          </Button>

          <div className="relative w-full h-full max-w-7xl max-h-screen p-4">
            <Image
              src={displayPhotos[currentIndex].url || "/placeholder.svg"}
              alt={`${title} - Photo ${currentIndex + 1}`}
              fill
              className="object-contain"
            />

            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 text-white hover:bg-black/50 h-12 w-12 rounded-full"
              onClick={handlePrevious}
              aria-label="Previous photo"
            >
              <ChevronLeft className="h-8 w-8" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 text-white hover:bg-black/50 h-12 w-12 rounded-full"
              onClick={handleNext}
              aria-label="Next photo"
            >
              <ChevronRight className="h-8 w-8" />
            </Button>

            <div className="absolute left-1/2 -translate-x-1/2 bottom-4 bg-black/50 text-white text-sm px-3 py-1 rounded-full">
              {currentIndex + 1} / {displayPhotos.length}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

