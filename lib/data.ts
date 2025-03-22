import { cache } from "react"
import {
  getListings,
  getDestinations,
  getCategories,
  getFeaturedDestinations,
  getListingById,
  getBlogPosts,
  getAttractions,
} from "./airtable"

export const getCachedListings = cache(getListings)
export const getCachedDestinations = cache(getDestinations)
export const getCachedCategories = cache(getCategories)
export const getCachedFeaturedDestinations = cache(getFeaturedDestinations)
export const getCachedListingById = cache(getListingById)
export const getCachedBlogPosts = cache(getBlogPosts)
export const getCachedAttractions = cache(getAttractions)

