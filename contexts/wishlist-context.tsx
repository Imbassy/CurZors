"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type WishlistContextType = {
  wishlist: string[]
  addToWishlist: (listingId: string) => void
  removeFromWishlist: (listingId: string) => void
  isInWishlist: (listingId: string) => boolean
  clearWishlist: () => void
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlist, setWishlist] = useState<string[]>([])

  // Load wishlist from localStorage on initial render
  useEffect(() => {
    const savedWishlist = localStorage.getItem("wishlist")
    if (savedWishlist) {
      try {
        setWishlist(JSON.parse(savedWishlist))
      } catch (error) {
        console.error("Failed to parse wishlist from localStorage:", error)
        setWishlist([])
      }
    }
  }, [])

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist))
  }, [wishlist])

  const addToWishlist = (listingId: string) => {
    setWishlist((prev) => {
      if (prev.includes(listingId)) return prev
      return [...prev, listingId]
    })
  }

  const removeFromWishlist = (listingId: string) => {
    setWishlist((prev) => prev.filter((id) => id !== listingId))
  }

  const isInWishlist = (listingId: string) => {
    return wishlist.includes(listingId)
  }

  const clearWishlist = () => {
    setWishlist([])
  }

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist, clearWishlist }}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider")
  }
  return context
}

