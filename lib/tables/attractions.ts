import tables from "@/lib/airtable"
import { v4 as uuidv4 } from "uuid"

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

export async function getAttractionById(attractionId: string) {
  try {
    const records = await tables.attractions
      .select({
        filterByFormula: `{Attraction ID} = "${attractionId}"`,
        maxRecords: 1,
      })
      .all()

    if (records.length === 0) {
      return null
    }

    return {
      id: records[0].id,
      fields: records[0].fields,
    } as Attraction
  } catch (error) {
    console.error("Error fetching attraction:", error)
    throw error
  }
}

export async function createAttraction(data: {
  name: string
  description: string
  shortDescription?: string
  location: string
  destinationId: string
  coordinates?: string
  photos?: Array<{ url: string; filename: string; id: string }>
  featuredImage?: Array<{ url: string; filename: string; id: string }>
  attractionType?: string[]
  bestTimeToVisit?: string
  visitorTips?: string
  accessibilityInfo?: string
  seoTitle?: string
  seoDescription?: string
  seoKeywords?: string
}) {
  try {
    // Generate a unique attraction ID
    const attractionId = `attr_${uuidv4().substring(0, 8)}`

    // Create the attraction record fields
    const fields: any = {
      "Attraction ID": attractionId,
      "Attraction Name": data.name,
      Description: data.description,
      Location: data.location,
      Destination: [data.destinationId],
      "Created At": new Date().toISOString(),
      "Updated At": new Date().toISOString(),
    }

    // Add optional fields if provided
    if (data.shortDescription) fields["Short Description"] = data.shortDescription
    if (data.coordinates) fields["Coordinates"] = data.coordinates
    if (data.photos) fields["Photos"] = data.photos
    if (data.featuredImage) fields["Featured Image"] = data.featuredImage
    if (data.attractionType) fields["Attraction Type"] = data.attractionType
    if (data.bestTimeToVisit) fields["Best Time to Visit"] = data.bestTimeToVisit
    if (data.visitorTips) fields["Visitor Tips"] = data.visitorTips
    if (data.accessibilityInfo) fields["Accessibility Info"] = data.accessibilityInfo
    if (data.seoTitle) fields["SEO Title"] = data.seoTitle
    if (data.seoDescription) fields["SEO Description"] = data.seoDescription
    if (data.seoKeywords) fields["SEO Keywords"] = data.seoKeywords

    // Create the record in Airtable
    const record = await tables.attractions.create(fields)

    return record
  } catch (error) {
    console.error("Error creating attraction:", error)
    throw error
  }
}

