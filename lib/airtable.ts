import Airtable from "airtable"
import { v4 as uuidv4 } from "uuid"
import { logError } from "@/lib/error-handler"

// Initialize Airtable with API key
const airtable = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY,
})

// Get the base
const base = airtable.base(process.env.AIRTABLE_BASE_ID as string)

// Add the new tables to the tables object
const tables = {
  users: base.table("Users"),
  listings: base.table("Listings"),
  bookings: base.table("Bookings"),
  reviews: base.table("Reviews"),
  payments: base.table("Payments"),
  destinations: base.table("Destinations"),
  serviceProviders: base.table("ServiceProviders"),
  attractions: base.table("Attractions"),
  userHistory: base.table("UserHistory"),
  categories: base.table("Categories"),
  amenities: base.table("Amenities"),
  promotions: base.table("Promotions"),
  favorites: base.table("Favorites"),
  // New blog-related tables
  blogPosts: base.table("BlogPosts"),
  blogCategories: base.table("BlogCategories"),
  blogTags: base.table("BlogTags"),
  blogAuthors: base.table("BlogAuthors"),
}

// Types for Airtable records
// Update the Listing interface to match the new Airtable schema for Tours
export interface Listing {
  id: string
  fields: {
    code: string // Primary field
    title: string
    location: string
    category: string
    description: string
    "badges/0"?: string
    "behaviours/hasFreeCancellation"?: boolean
    "behaviours/hasUnlimitedReschedule"?: boolean
    "behaviours/shouldHideFromCrawlers"?: string
    "behaviours/isFeatured"?: boolean // Add this field
    "displayDuration/duration/days"?: number
    "displayDuration/duration/hours"?: number
    "displayDuration/duration/minutes"?: number
    "displayDuration/fromDuration/days"?: number
    "displayDuration/fromDuration/hours"?: number
    "displayDuration/fromDuration/minutes"?: number
    "displayDuration/isFlexible"?: string
    "displayDuration/isFullyFlexible"?: boolean
    "displayDuration/isSingleTimeUnit"?: string
    "displayDuration/toDuration/days"?: number
    "displayDuration/toDuration/hours"?: number
    "displayDuration/toDuration/minutes"?: number
    "geolocation/latitude"?: number
    "geolocation/longitude"?: number
    "image/alt"?: string
    "image/sizes"?: string
    "image/src"?: string
    "image/srcSet"?: string
    isPrivateTour?: boolean
    "languages/0"?: string
    maxTravelersAllowed?: number
    maxTravelersPerUnit?: number
    noFollow?: string
    "price/discountAmount/amount"?: number
    "price/discountAmount/currencyCode"?: string
    "price/discountAmount/currencySymbol"?: string
    "price/discountedPrice/amount"?: number
    "price/discountedPrice/currencyCode"?: string
    "price/discountedPrice/currencySymbol"?: string
    "price/hasTieredPricing"?: boolean
    "price/hasUnitPricing"?: string
    "price/isDiscounted"?: string
    "price/retailPrice/amount"?: number
    "price/retailPrice/currencyCode"?: string
    "price/retailPrice/currencySymbol"?: string
    primaryLabel?: string
    "qualityBadges/isBestConversion"?: string
    "qualityBadges/isExcellent"?: string
    "rating/exactScore"?: number
    "rating/reviewCount"?: number
    "rating/score"?: number
    "toptour/frontpage"?: boolean
    url?: string
    videoCount?: number
    // Keep backward compatibility with existing fields
    "Listing ID"?: string
    Photos?: Array<{ url: string; filename: string; id: string }>
    Price?: number
    "Average Rating"?: number
    "Total Reviews"?: number
    "Total Bookings"?: number
    Destination?: string[]
    "Service Provider"?: string[]
    Amenities?: string[]
  }
}

// Update the Destination interface with additional fields
export interface Destination {
  id: string
  fields: {
    "Destination Name": string
    Country: string
    City: string
    Description: string
    "Short Description"?: string
    Photo: Array<{ url: string; filename: string; id: string }>
    "Number of Listings": number
    Featured?: boolean
    Popular?: boolean
    Coordinates?: string
    "Best Time to Visit"?: string
    "Local Tips"?: string
    "Weather Info"?: string
    Currency?: string
    Language?: string
    "Travel Requirements"?: string
    "SEO Title"?: string
    "SEO Description"?: string
    "SEO Keywords"?: string
    "Created At"?: string
    "Updated At"?: string
  }
}

// New interfaces for blog-related tables
export interface BlogPost {
  id: string
  fields: {
    "Post ID": string
    Title: string
    Slug: string
    Content: string
    "Featured Image": Array<{ url: string; filename: string; id: string }>
    "Publication Date": string
    "Last Updated": string
    Status: "Draft" | "Published" | "Archived"
    Author: string[]
    Categories: string[]
    Tags: string[]
    Excerpt: string
    "Read Time": number
    "View Count": number
    "Featured Post": boolean
    "Allow Comments": boolean
    "Meta Title": string
    "Meta Description": string
    "Meta Keywords": string
    "Open Graph Title": string
    "Open Graph Description": string
    "Open Graph Image": Array<{ url: string; filename: string; id: string }>
    "Twitter Title": string
    "Twitter Description": string
    "Twitter Image": Array<{ url: string; filename: string; id: string }>
    "Canonical URL": string
    "Related Posts": string[]
  }
}

export interface BlogCategory {
  id: string
  fields: {
    "Category ID": string
    Name: string
    Slug: string
    Description: string
    "Parent Category"?: string[]
    "Featured Image"?: Array<{ url: string; filename: string; id: string }>
    "Post Count": number
    "Meta Title": string
    "Meta Description": string
    "Meta Keywords": string
  }
}

export interface BlogTag {
  id: string
  fields: {
    "Tag ID": string
    Name: string
    Slug: string
    Description?: string
    "Post Count": number
    "Meta Title": string
    "Meta Description": string
    "Meta Keywords": string
  }
}

export interface BlogAuthor {
  id: string
  fields: {
    "Author ID": string
    Name: string
    Slug: string
    Email: string
    Bio: string
    "Profile Image": Array<{ url: string; filename: string; id: string }>
    "Social Media": {
      Twitter?: string
      LinkedIn?: string
      Facebook?: string
      Instagram?: string
    }
    User: string[]
    "Post Count": number
    "Meta Title": string
    "Meta Description": string
    "Meta Keywords": string
  }
}

export interface Category {
  id: string
  fields: {
    "Category Name": string
    Description: string
    "Number of Listings": number
    "Average Price"?: number
    "Category Summary"?: string
  }
}

export interface Amenity {
  id: string
  fields: {
    "Amenity Name": string
    Description: string
    Photo?: Array<{ url: string; filename: string; id: string }>
    "Number of Listings"?: number
    "Listings Summary"?: string
    "Amenity Impact"?: string
  }
}

// Update the Review interface to include admin approval fields
export interface Review {
  id: string
  fields: {
    "Review ID": string
    User: string[]
    Listing: string[]
    Rating: number
    "Review Text": string
    "Review Title"?: string
    Photos?: Array<{ url: string; filename: string; id: string }>
    "Review Date": string
    "Sentiment Analysis"?: string
    "Review Summary"?: string
    "Days Since Review"?: number
    Booking?: string[]
    "Service Provider"?: string[]
    "User Full Name"?: string
    "Listing Title"?: string
    "Approval Status": "Pending" | "Approved" | "Rejected"
    "Admin Notes"?: string
    "Approved Date"?: string
    Featured?: boolean
  }
}

export interface Booking {
  id: string
  fields: {
    "Booking ID": string
    User: string[]
    Listing: string[]
    "Booking Date": string
    "Check-in Date": string
    "Check-out Date": string
    "Number of Guests": number
    "Total Price": number
    "Payment Status": string
    "Start Time"?: string
    "Contact Name"?: string
    "Contact Email"?: string
    "Contact Phone"?: string
    "Special Requests"?: string
    "Needs Pickup"?: boolean
    "Pickup Location"?: string
    Reviews?: string[]
    Messages?: string[]
    Payments?: string[]
    "Promotion Applied"?: string[]
    "Duration of Stay"?: number
    "Booking Summary"?: string
    "Review Sentiment"?: string
    "User Email"?: string
    "Listing Title"?: string
  }
}

// Blog-related functions

// Update the getBlogPosts function to match the exact schema and add better error logging

// Replace the existing getBlogPosts function with this updated version:
export async function getBlogPosts(
  options: {
    limit?: number
    page?: number
    category?: string
    tag?: string
    author?: string
    status?: string
    featured?: boolean
    sortField?: string
    sortDirection?: string
    search?: string
  } = {},
) {
  try {
    const {
      limit = 10,
      page = 1,
      category,
      tag,
      author,
      status = "Published", // Default to published posts
      featured,
      sortField = "Publication Date",
      sortDirection = "desc",
      search,
    } = options

    // Calculate offset for pagination - but don't use it directly in the Airtable query
    // We'll handle pagination manually to avoid offset errors
    const calculatedOffset = (page - 1) * limit

    // Build filter formula
    const filterFormulas = []

    // Only add status filter if provided
    if (status) {
      filterFormulas.push(`{Status} = "${status}"`)
    }

    if (category) {
      filterFormulas.push(`FIND("${category}", ARRAYJOIN({Categories}, ","))`)
    }

    if (tag) {
      filterFormulas.push(`FIND("${tag}", ARRAYJOIN({Tags}, ","))`)
    }

    if (author) {
      filterFormulas.push(`FIND("${author}", ARRAYJOIN({Author}, ","))`)
    }

    if (featured) {
      filterFormulas.push(`{Featured Post} = TRUE()`)
    }

    if (search) {
      filterFormulas.push(
        `OR(FIND("${search}", LOWER({Title})), FIND("${search}", LOWER({Content})), FIND("${search}", LOWER({Excerpt})))`,
      )
    }

    // Combine filter formulas with AND if multiple exist
    let filterFormula = ""
    if (filterFormulas.length > 0) {
      filterFormula = filterFormulas.length === 1 ? filterFormulas[0] : `AND(${filterFormulas.join(", ")})`
    }

    // Create the select options object - fetch all records that match the filter
    const selectOptions: any = {
      sort: [
        {
          field: sortField,
          direction: (sortDirection === "desc" ? "desc" : "asc") as "asc" | "desc",
        },
      ],
    }

    // Only add filter formula if we have one
    if (filterFormula) {
      selectOptions.filterByFormula = filterFormula
    }

    console.log("Fetching blog posts with options:", JSON.stringify(selectOptions, null, 2))

    // Try to fetch all records that match the filter
    const records = await tables.blogPosts.select(selectOptions).all()

    console.log(`Retrieved ${records.length} blog posts in total`)

    // Manually handle pagination by slicing the results
    const paginatedRecords = records.slice(calculatedOffset, calculatedOffset + limit)

    console.log(`Returning ${paginatedRecords.length} blog posts for page ${page}`)

    return paginatedRecords.map((record) => ({
      id: record.id,
      fields: record.fields,
    })) as BlogPost[]
  } catch (error) {
    console.error("Error fetching blog posts from Airtable:", error)
    logError({
      message: "Error fetching blog posts",
      source: "airtable",
      context: { options },
      originalError: error,
    })

    return []
  }
}

// Update getBlogPostBySlug to use mock data as fallback
export async function getBlogPostBySlug(slug: string) {
  try {
    const records = await tables.blogPosts
      .select({
        filterByFormula: `{Slug} = "${slug}"`,
        maxRecords: 1,
      })
      .all()

    if (records.length === 0) {
      return null
    }

    return {
      id: records[0].id,
      fields: records[0].fields,
    } as BlogPost
  } catch (error) {
    logError({
      message: "Error fetching blog post by slug",
      source: "airtable",
      context: { slug },
      originalError: error,
    })
    return null
  }
}

// Get blog categories
export async function getBlogCategories(limit = 20) {
  try {
    const records = await tables.blogCategories
      .select({
        maxRecords: limit,
        sort: [{ field: "Name", direction: "asc" }],
      })
      .all()

    return records.map((record) => ({
      id: record.id,
      fields: record.fields,
    })) as BlogCategory[]
  } catch (error) {
    logError({
      message: "Error fetching blog categories",
      source: "airtable",
      context: { limit },
      originalError: error,
    })
    return []
  }
}

// Get a single blog category by slug
export async function getBlogCategoryBySlug(slug: string) {
  try {
    const records = await tables.blogCategories
      .select({
        filterByFormula: `{Slug} = "${slug}"`,
        maxRecords: 1,
      })
      .all()

    if (records.length === 0) {
      return null
    }

    return {
      id: records[0].id,
      fields: records[0].fields,
    } as BlogCategory
  } catch (error) {
    logError({
      message: "Error fetching blog category by slug",
      source: "airtable",
      context: { slug },
      originalError: error,
    })
    throw error
  }
}

// Get blog tags
export async function getBlogTags(limit = 50) {
  try {
    const records = await tables.blogTags
      .select({
        maxRecords: limit,
        sort: [{ field: "Post Count", direction: "desc" }],
      })
      .all()

    return records.map((record) => ({
      id: record.id,
      fields: record.fields,
    })) as BlogTag[]
  } catch (error) {
    logError({
      message: "Error fetching blog tags",
      source: "airtable",
      context: { limit },
      originalError: error,
    })
    return []
  }
}

// Get a single blog tag by slug
export async function getBlogTagBySlug(slug: string) {
  try {
    const records = await tables.blogTags
      .select({
        filterByFormula: `{Slug} = "${slug}"`,
        maxRecords: 1,
      })
      .all()

    if (records.length === 0) {
      return null
    }

    return {
      id: records[0].id,
      fields: records[0].fields,
    } as BlogTag
  } catch (error) {
    logError({
      message: "Error fetching blog tag by slug",
      source: "airtable",
      context: { slug },
      originalError: error,
    })
    throw error
  }
}

// Get blog authors
export async function getBlogAuthors(limit = 20) {
  try {
    const records = await tables.blogAuthors
      .select({
        maxRecords: limit,
        sort: [{ field: "Name", direction: "asc" }],
      })
      .all()

    return records.map((record) => ({
      id: record.id,
      fields: record.fields,
    })) as BlogAuthor[]
  } catch (error) {
    logError({
      message: "Error fetching blog authors",
      source: "airtable",
      context: { limit },
      originalError: error,
    })
    return []
  }
}

// Get a single blog author by slug
export async function getBlogAuthorBySlug(slug: string) {
  try {
    const records = await tables.blogAuthors
      .select({
        filterByFormula: `{Slug} = "${slug}"`,
        maxRecords: 1,
      })
      .all()

    if (records.length === 0) {
      return null
    }

    return {
      id: records[0].id,
      fields: records[0].fields,
    } as BlogAuthor
  } catch (error) {
    logError({
      message: "Error fetching blog author by slug",
      source: "airtable",
      context: { slug },
      originalError: error,
    })
    throw error
  }
}

// Create a new blog post
export async function createBlogPost(data: {
  title: string
  content: string
  excerpt: string
  authorId: string
  categoryIds: string[]
  tagIds: string[]
  featuredImage?: Array<{ url: string; filename: string; id: string }>
  status?: "Draft" | "Published" | "Archived"
  featuredPost?: boolean
  allowComments?: boolean
  metaTitle?: string
  metaDescription?: string
  metaKeywords?: string
  openGraphTitle?: string
  openGraphDescription?: string
  openGraphImage?: Array<{ url: string; filename: string; id: string }>
  twitterTitle?: string
  twitterDescription?: string
  twitterImage?: Array<{ url: string; filename: string; id: string }>
  canonicalUrl?: string
  relatedPostIds?: string[]
}) {
  try {
    // Generate a unique post ID and slug
    const postId = `post_${uuidv4().substring(0, 8)}`
    const slug = data.title
      .toLowerCase()
      .replace(/[^\w\s]/gi, "")
      .replace(/\s+/g, "-")
      .substring(0, 60)
      .concat(`-${postId.split("_")[1]}`)

    // Calculate read time (rough estimate: 200 words per minute)
    const wordCount = data.content.split(/\s+/).length
    const readTime = Math.ceil(wordCount / 200)

    // Create the post record fields
    const fields: any = {
      "Post ID": postId,
      Title: data.title,
      Slug: slug,
      Content: data.content,
      Excerpt: data.excerpt,
      "Publication Date": new Date().toISOString(),
      "Last Updated": new Date().toISOString(),
      Status: data.status || "Draft",
      Author: [data.authorId],
      Categories: [data.categoryIds],
      Tags: [data.tagIds],
      "Read Time": readTime,
      "View Count": 0,
      "Featured Post": data.featuredPost || false,
      "Allow Comments": data.allowComments !== undefined ? data.allowComments : true,
    }

    // Add optional fields if provided
    if (data.featuredImage) fields["Featured Image"] = data.featuredImage
    if (data.metaTitle) fields["Meta Title"] = data.metaTitle
    if (data.metaDescription) fields["Meta Description"] = data.metaDescription
    if (data.metaKeywords) fields["Meta Keywords"] = data.metaKeywords
    if (data.openGraphTitle) fields["Open Graph Title"] = data.openGraphTitle
    if (data.openGraphDescription) fields["Open Graph Description"] = data.openGraphDescription
    if (data.openGraphImage) fields["Open Graph Image"] = data.openGraphImage
    if (data.twitterTitle) fields["Twitter Title"] = data.twitterTitle
    if (data.twitterDescription) fields["Twitter Description"] = data.twitterDescription
    if (data.twitterImage) fields["Twitter Image"] = data.twitterImage
    if (data.canonicalUrl) fields["Canonical URL"] = data.canonicalUrl
    if (data.relatedPostIds) fields["Related Posts"] = data.relatedPostIds

    // Create the record in Airtable
    const record = await tables.blogPosts.create(fields)

    return record
  } catch (error) {
    logError({
      message: "Error creating blog post",
      source: "airtable",
      context: { title: data.title },
      originalError: error,
    })
    throw error
  }
}

// Update a blog post
export async function updateBlogPost(postId: string, data: Partial<BlogPost["fields"]>) {
  try {
    // Find the post by Post ID
    const records = await tables.blogPosts
      .select({
        filterByFormula: `{Post ID} = "${postId}"`,
        maxRecords: 1,
      })
      .all()

    if (records.length === 0) {
      throw new Error(`Blog post with ID ${postId} not found`)
    }

    const record = records[0]

    // Update the Last Updated timestamp
    data["Last Updated"] = new Date().toISOString()

    // Update the record
    const updatedRecord = await tables.blogPosts.update(record.id, data)

    return updatedRecord
  } catch (error) {
    logError({
      message: "Error updating blog post",
      source: "airtable",
      context: { postId },
      originalError: error,
    })
    throw error
  }
}

// Increment view count for a blog post
export async function incrementBlogPostViewCount(slug: string) {
  try {
    const post = await getBlogPostBySlug(slug)

    if (!post) {
      return null
    }

    const currentViewCount = post.fields["View Count"] || 0
    const updatedViewCount = currentViewCount + 1

    // Update the post with the new view count
    const records = await tables.blogPosts
      .select({
        filterByFormula: `{Slug} = "${slug}"`,
        maxRecords: 1,
      })
      .all()

    if (records.length === 0) {
      return null
    }

    const updatedRecord = await tables.blogPosts.update(records[0].id, {
      "View Count": updatedViewCount,
    })

    return updatedRecord
  } catch (error) {
    logError({
      message: "Error incrementing blog post view count",
      source: "airtable",
      context: { slug },
      originalError: error,
    })
    // Return null instead of throwing to prevent UI crashes
    return null
  }
}

// Get related blog posts
export async function getRelatedBlogPosts(postId: string, limit = 3) {
  try {
    const post = await tables.blogPosts
      .select({
        filterByFormula: `{Post ID} = "${postId}"`,
        maxRecords: 1,
      })
      .all()

    if (post.length === 0) {
      return []
    }

    const categories = post[0].fields.Categories || []
    const tags = post[0].fields.Tags || []

    // If the post has explicitly defined related posts, use those
    if (post[0].fields["Related Posts"] && post[0].fields["Related Posts"].length > 0) {
      const relatedPostIds = post[0].fields["Related Posts"]

      // Create a formula to find posts with these IDs
      const relatedPostsFormula = `OR(${relatedPostIds.map((id) => `{Post ID} = "${id}"`).join(", ")})`

      const relatedPosts = await tables.blogPosts
        .select({
          filterByFormula: relatedPostsFormula,
          maxRecords: limit,
        })
        .all()

      return relatedPosts.map((record) => ({
        id: record.id,
        fields: record.fields,
      })) as BlogPost[]
    }

    // Otherwise, find posts with similar categories or tags
    if (categories.length === 0 && tags.length === 0) {
      return []
    }

    let formula = ""

    if (categories.length > 0) {
      const categoryFormulas = categories.map((cat) => `FIND("${cat}", ARRAYJOIN({Categories}, ","))`)
      formula = `OR(${categoryFormulas.join(", ")})`
    }

    if (tags.length > 0) {
      const tagFormulas = tags.map((tag) => `FIND("${tag}", ARRAYJOIN({Tags}, ","))`)
      const tagFormula = `OR(${tagFormulas.join(", ")})`

      formula = formula ? `OR(${formula}, ${tagFormula})` : tagFormula
    }

    // Exclude the current post
    formula = `AND(${formula}, {Post ID} != "${postId}", {Status} = "Published")`

    const relatedPosts = await tables.blogPosts
      .select({
        filterByFormula: formula,
        maxRecords: limit,
        sort: [{ field: "Publication Date", direction: "desc" }],
      })
      .all()

    return relatedPosts.map((record) => ({
      id: record.id,
      fields: record.fields,
    })) as BlogPost[]
  } catch (error) {
    logError({
      message: "Error fetching related blog posts",
      source: "airtable",
      context: { postId },
      originalError: error,
    })
    return []
  }
}

// Fetch listings with optional filters
export async function getListings(
  options: {
    limit?: number
    filterByField?: string
    filterValue?: string
    customFilterFormula?: string // Add support for custom filter formula
    sortField?: string
    sortDirection?: string
    category?: string
    destination?: string
    minPrice?: number
    maxPrice?: number
  } = {},
) {
  try {
    const {
      limit = 10,
      filterByField,
      filterValue,
      customFilterFormula,
      sortField,
      sortDirection = "asc",
      category,
      destination,
      minPrice,
      maxPrice,
    } = options

    // Build filter formula
    const filterFormulas = []

    // If a custom filter formula is provided, use it directly
    if (customFilterFormula) {
      filterFormulas.push(customFilterFormula)
    }
    // Otherwise, use the filterByField and filterValue if provided
    else if (filterByField && filterValue) {
      try {
        // Map old field names to new ones for filtering
        const mappedFilterField = mapFieldName(filterByField)

        // For boolean fields that might be stored as checkboxes in Airtable
        if (filterValue.toLowerCase() === "true") {
          filterFormulas.push(`{${mappedFilterField}} = TRUE()`)
        } else if (filterValue.toLowerCase() === "false") {
          filterFormulas.push(`{${mappedFilterField}} = FALSE()`)
        } else {
          filterFormulas.push(`{${mappedFilterField}} = "${filterValue}"`)
        }
      } catch (error) {
        console.warn(
          `Warning: Filter field "${filterByField}" might not exist in Airtable schema. Ignoring this filter.`,
        )
        // Continue without this filter rather than failing
      }
    }

    if (category) {
      filterFormulas.push(`{category} = "${category}"`)
    }

    if (destination) {
      filterFormulas.push(`FIND("${destination}", {Destination})`)
    }

    if (minPrice !== undefined) {
      // Use the new price field structure or fall back to old Price field
      filterFormulas.push(`OR({price/retailPrice/amount} >= ${minPrice}, {Price} >= ${minPrice})`)
    }

    if (maxPrice !== undefined) {
      // Use the new price field structure or fall back to old Price field
      filterFormulas.push(`OR({price/retailPrice/amount} <= ${maxPrice}, {Price} <= ${maxPrice})`)
    }

    // Combine filter formulas with AND if multiple exist
    let filterFormula = ""
    if (filterFormulas.length > 0) {
      filterFormula = filterFormulas.length === 1 ? filterFormulas[0] : `AND(${filterFormulas.join(", ")})`
    }

    // Create the select options object
    const selectOptions: any = {
      maxRecords: limit,
    }

    // Add filter formula if provided
    if (filterFormula) {
      selectOptions.filterByFormula = filterFormula
    }

    // Add sort if sortField is provided
    if (sortField) {
      // Map old field names to new ones for sorting
      const mappedSortField = mapFieldName(sortField)

      selectOptions.sort = [
        {
          field: mappedSortField,
          direction: (sortDirection === "desc" ? "desc" : "asc") as "asc" | "desc",
        },
      ]
    }

    const records = await tables.listings.select(selectOptions).all()

    return records.map((record) => ({
      id: record.id,
      fields: record.fields,
    })) as Listing[]
  } catch (error) {
    logError({
      message: "Error fetching listings",
      source: "airtable",
      context: { options },
      originalError: error,
    })

    return []
  }
}

// Helper function to map old field names to new ones
function mapFieldName(fieldName: string): string {
  const fieldMap: Record<string, string> = {
    "Average Rating": "rating/score",
    "Total Reviews": "rating/reviewCount",
    Price: "price/retailPrice/amount",
    "Listing ID": "code",
    "toptour/frontpage": "behaviours/isFeatured", // Map the old field to the new one
    // Add more mappings as needed
  }

  return fieldMap[fieldName] || fieldName
}

// Fetch destinations
export async function getDestinations(limit = 10) {
  try {
    const records = await tables.destinations
      .select({
        maxRecords: limit,
      })
      .all()

    return records.map((record) => ({
      id: record.id,
      fields: record.fields,
    })) as Destination[]
  } catch (error) {
    console.error("Error fetching destinations:", error)
    throw error
  }
}

// Add a function to get featured destinations
export async function getFeaturedDestinations(limit = 5) {
  try {
    const records = await tables.destinations
      .select({
        filterByFormula: `{Featured} = TRUE()`,
        maxRecords: limit,
      })
      .all()

    return records.map((record) => ({
      id: record.id,
      fields: record.fields,
    })) as Destination[]
  } catch (error) {
    console.error("Error fetching featured destinations:", error)
    throw error
  }
}

// Add a function to update a destination
export async function updateDestination(destinationId: string, updateData: Partial<Destination["fields"]>) {
  try {
    const records = await tables.destinations
      .select({
        filterByFormula: `{Destination Name} = "${destinationId}"`,
        maxRecords: 1,
      })
      .all()

    if (records.length === 0) {
      throw new Error(`Destination with name ${destinationId} not found`)
    }

    const record = records[0]

    // Update the record
    const updatedRecord = await tables.destinations.update(record.id, updateData)

    return updatedRecord
  } catch (error) {
    console.error("Error updating destination:", error)
    throw error
  }
}

// Fetch categories
export async function getCategories(limit = 20) {
  try {
    const records = await tables.categories
      .select({
        maxRecords: limit,
      })
      .all()

    return records.map((record) => ({
      id: record.id,
      fields: record.fields,
    })) as Category[]
  } catch (error) {
    console.error("Error fetching categories:", error)
    throw error
  }
}

// Fetch amenities
export async function getAmenities(limit = 20) {
  try {
    const records = await tables.amenities
      .select({
        maxRecords: limit,
      })
      .all()

    return records.map((record) => ({
      id: record.id,
      fields: record.fields,
    })) as Amenity[]
  } catch (error) {
    console.error("Error fetching amenities:", error)
    throw error
  }
}

// Fetch reviews for a listing
export async function getReviewsForListing(listingId: string, limit = 10) {
  try {
    const records = await tables.reviews
      .select({
        filterByFormula: `FIND("${listingId}", {Listing})`,
        maxRecords: limit,
        sort: [{ field: "Review Date", direction: "desc" }],
      })
      .all()

    return records.map((record) => ({
      id: record.id,
      fields: record.fields,
    })) as Review[]
  } catch (error) {
    console.error("Error fetching reviews:", error)
    throw error
  }
}

// Fetch reviews by a user
export async function getReviewsByUser(userId: string, limit = 10) {
  try {
    const records = await tables.reviews
      .select({
        filterByFormula: `FIND("${userId}", {User})`,
        maxRecords: limit,
        sort: [{ field: "Review Date", direction: "desc" }],
      })
      .all()

    return records.map((record) => ({
      id: record.id,
      fields: record.fields,
    })) as Review[]
  } catch (error) {
    console.error("Error fetching user reviews:", error)
    throw error
  }
}

// Update the createReview function to include approval status
export async function createReview(reviewData: {
  userId: string
  listingId: string
  rating: number
  reviewText: string
  title?: string
  photos?: Array<{ url: string; filename: string; id: string }>
  bookingId?: string
  pendingApproval?: boolean
}) {
  try {
    // Generate a unique review ID
    const reviewId = `rev_${uuidv4().substring(0, 8)}`

    // Create the review record
    const fields: any = {
      "Review ID": reviewId,
      User: [reviewData.userId],
      Listing: [reviewData.listingId],
      Rating: reviewData.rating,
      "Review Text": reviewData.reviewText,
      "Review Date": new Date().toISOString().split("T")[0],
      "Approval Status": reviewData.pendingApproval ? "Pending" : "Approved",
    }

    if (reviewData.title) {
      fields["Review Title"] = reviewData.title
    }

    if (reviewData.photos) {
      fields.Photos = reviewData.photos
    }

    if (reviewData.bookingId) {
      fields.Booking = [reviewData.bookingId]
    }

    const record = await tables.reviews.create(fields)

    return record
  } catch (error) {
    console.error("Error creating review:", error)
    throw error
  }
}

// Add a new function to get pending reviews for admin approval
export async function getPendingReviews(limit = 50) {
  try {
    const records = await tables.reviews
      .select({
        filterByFormula: `{Approval Status} = "Pending"`,
        maxRecords: limit,
        sort: [{ field: "Review Date", direction: "desc" }],
      })
      .all()

    return records.map((record) => ({
      id: record.id,
      fields: record.fields,
    })) as Review[]
  } catch (error) {
    console.error("Error fetching pending reviews:", error)
    throw error
  }
}

// Add a new function to approve or reject a review
export async function updateReviewApproval(reviewId: string, status: "Approved" | "Rejected", adminNotes?: string) {
  try {
    const records = await tables.reviews
      .select({
        filterByFormula: `{Review ID} = "${reviewId}"`,
        maxRecords: 1,
      })
      .all()

    if (records.length === 0) {
      throw new Error(`Review with ID ${reviewId} not found`)
    }

    const record = records[0]
    const updateData: any = {
      "Approval Status": status,
    }

    if (status === "Approved") {
      updateData["Approved Date"] = new Date().toISOString().split("T")[0]
    }

    if (adminNotes) {
      updateData["Admin Notes"] = adminNotes
    }

    const updatedRecord = await tables.reviews.update(record.id, updateData)

    return updatedRecord
  } catch (error) {
    console.error("Error updating review approval:", error)
    throw error
  }
}

// Create a new booking
export async function createBooking(bookingData: {
  bookingId: string
  userId?: string
  listingId: string
  checkInDate: string
  checkOutDate: string
  numberOfGuests: number
  totalPrice: number
  paymentStatus: string
  startTime?: string
  contactName?: string
  contactEmail?: string
  contactPhone?: string
  specialRequests?: string
  needsPickup?: boolean
  pickupLocation?: string
  promotionId?: string
}) {
  try {
    // First, get the actual Airtable record ID for the listing using the friendly ID
    let listingRecordId = bookingData.listingId

    // Check if the listingId is a friendly ID (not starting with "rec")
    if (!bookingData.listingId.startsWith("rec")) {
      const listing = await getListingById(bookingData.listingId)
      if (!listing) {
        throw new Error(`Listing with ID ${bookingData.listingId} not found`)
      }
      listingRecordId = listing.id // Use the actual Airtable record ID
    }

    // Create the booking record fields
    const fields: any = {
      "Booking ID": bookingData.bookingId,
      Listing: [listingRecordId],
      "Booking Date": new Date().toISOString().split("T")[0],
      "Check-in Date": bookingData.checkInDate,
      "Check-out Date": bookingData.checkOutDate,
      "Number of Guests": bookingData.numberOfGuests,
      "Total Price": bookingData.totalPrice,
      "Payment Status": bookingData.paymentStatus,
    }

    // Add optional fields if provided
    if (bookingData.startTime) fields["Start Time"] = bookingData.startTime
    if (bookingData.contactName) fields["Contact Name"] = bookingData.contactName
    if (bookingData.contactEmail) fields["Contact Email"] = bookingData.contactEmail
    if (bookingData.contactPhone) fields["Contact Phone"] = bookingData.contactPhone
    if (bookingData.specialRequests) fields["Special Requests"] = bookingData.specialRequests
    if (bookingData.needsPickup !== undefined) fields["Needs Pickup"] = bookingData.needsPickup
    if (bookingData.pickupLocation) fields["Pickup Location"] = bookingData.pickupLocation
    if (bookingData.promotionId) fields["Promotion Applied"] = [bookingData.promotionId]

    // Only add the User field if we have a valid userId
    if (bookingData.userId) {
      // Check if the userId is a valid Airtable record ID
      if (bookingData.userId.startsWith("rec")) {
        fields["User"] = [bookingData.userId]
      } else {
        console.log("Warning: Invalid user ID format. User will not be linked to this booking.")
      }
    }

    const record = await tables.bookings.create(fields)

    return record
  } catch (error) {
    console.error("Error creating booking:", error)
    throw error
  }
}

// Update the getListingById function to only use the 'code' field which is the primary field in the new schema
// The error occurs because 'Listing ID' is no longer a valid field name

// Find this function:
// Update the getListingById function to handle the new schema
export async function getListingById(listingId: string) {
  try {
    // Only use the 'code' field which is the primary field in the new schema
    const records = await tables.listings
      .select({
        filterByFormula: `{code} = "${listingId}"`,
        maxRecords: 1,
      })
      .all()

    if (records.length === 0) {
      return null
    }

    return {
      id: records[0].id,
      fields: records[0].fields,
    } as Listing
  } catch (error) {
    console.error("Error fetching listing:", error)
    throw error
  }
}

// Get a single category by name
export async function getCategoryByName(categoryName: string) {
  try {
    const records = await tables.categories
      .select({
        filterByFormula: `{Category Name} = "${categoryName}"`,
        maxRecords: 1,
      })
      .all()

    if (records.length === 0) {
      return null
    }

    return {
      id: records[0].id,
      fields: records[0].fields,
    } as Category
  } catch (error) {
    console.error("Error fetching category:", error)
    throw error
  }
}

// Get a single amenity by name
export async function getAmenityByName(amenityName: string) {
  try {
    const records = await tables.amenities
      .select({
        filterByFormula: `{Amenity Name} = "${amenityName}"`,
        maxRecords: 1,
      })
      .all()

    if (records.length === 0) {
      return null
    }

    return {
      id: records[0].id,
      fields: records[0].fields,
    } as Amenity
  } catch (error) {
    console.error("Error fetching amenity:", error)
    throw error
  }
}

// Get bookings for a user
export async function getUserBookings(userId: string) {
  try {
    // Check if the userId is a valid Airtable record ID
    if (!userId.startsWith("rec")) {
      console.log("Warning: Invalid user ID format. Returning empty bookings array.")
      return []
    }

    const records = await tables.bookings
      .select({
        filterByFormula: `FIND("${userId}", {User})`,
        sort: [{ field: "Check-in Date", direction: "desc" }],
      })
      .all()

    return records.map((record) => ({
      id: record.id,
      fields: record.fields,
    })) as Booking[]
  } catch (error) {
    console.error("Error fetching user bookings:", error)
    throw error
  }
}

// Get a single booking by ID
export async function getBookingById(bookingId: string) {
  try {
    const records = await tables.bookings
      .select({
        filterByFormula: `{Booking ID} = "${bookingId}"`,
        maxRecords: 1,
      })
      .all()

    if (records.length === 0) {
      return null
    }

    return {
      id: records[0].id,
      fields: records[0].fields,
    } as Booking
  } catch (error) {
    console.error("Error fetching booking:", error)
    throw error
  }
}

// Fetch attractions with optional filters
export async function getAttractions(
  options: {
    limit?: number
    destination?: string
    type?: string
    featured?: boolean
  } = {},
) {
  try {
    const { limit = 10, destination, type, featured } = options

    // Build filter formula
    const filterFormulas = []

    if (destination) {
      filterFormulas.push(`FIND("${destination}", {Destination})`)
    }

    if (type) {
      filterFormulas.push(`FIND("${type}", {Attraction Type})`)
    }

    if (featured) {
      filterFormulas.push(`{Featured} = TRUE()`)
    }

    // Combine filter formulas with AND if multiple exist
    let filterFormula = ""
    if (filterFormulas.length > 0) {
      filterFormula = filterFormulas.length === 1 ? filterFormulas[0] : `AND(${filterFormulas.join(", ")})`
    }

    // Create the select options object
    const selectOptions: any = {
      maxRecords: limit,
    }

    // Add filter formula if provided
    if (filterFormula) {
      selectOptions.filterByFormula = filterFormula
    }

    const records = await tables.attractions.select(selectOptions).all()

    return records.map((record) => ({
      id: record.id,
      fields: record.fields,
    })) as Attraction[]
  } catch (error) {
    console.error("Error fetching attractions:", error)
    throw error
  }
}

export interface Attraction {
  id: string
  fields: {
    "Attraction ID": string
    "Attraction Name": string
    Description: string
    "Short Description"?: string
    Location: string
    Destination: string[]
    Coordinates?: string
    Photos: Array<{ url: string; filename: string; id: string }>
    "Featured Image"?: Array<{ url: string; filename: string; id: string }>
    "Average Rating"?: number
    "Total Reviews"?: number
    "Related Listings"?: string[]
    "Attraction Type"?: string[]
    "Best Time to Visit"?: string
    "Visitor Tips"?: string
    "Accessibility Info"?: string
    "Created At": string
    "Updated At": string
    "SEO Title"?: string
    "SEO Description"?: string
    "SEO Keywords"?: string
  }
}

export default tables

