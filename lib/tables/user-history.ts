import tables from "@/lib/airtable"
import { v4 as uuidv4 } from "uuid"

export interface UserHistoryEntry {
  id: string
  fields: {
    "History ID": string
    User: string[]
    "Action Type": "View" | "Search" | "Booking" | "Review" | "Favorite" | "Other"
    "Action Details": string
    "Related Listing"?: string[]
    "Related Destination"?: string[]
    "Related Category"?: string[]
    Timestamp: string
    "IP Address"?: string
    "Device Info"?: string
    "Session ID"?: string
  }
}

export async function createUserHistoryEntry(data: {
  userId: string
  actionType: "View" | "Search" | "Booking" | "Review" | "Favorite" | "Other"
  actionDetails: string
  relatedListingId?: string
  relatedDestinationId?: string
  relatedCategoryId?: string
  ipAddress?: string
  deviceInfo?: string
  sessionId?: string
}) {
  try {
    // Generate a unique history ID
    const historyId = `hist_${uuidv4().substring(0, 8)}`

    // Create the history record fields
    const fields: any = {
      "History ID": historyId,
      User: [data.userId],
      "Action Type": data.actionType,
      "Action Details": data.actionDetails,
      Timestamp: new Date().toISOString(),
    }

    // Add optional fields if provided
    if (data.relatedListingId) fields["Related Listing"] = [data.relatedListingId]
    if (data.relatedDestinationId) fields["Related Destination"] = [data.relatedDestinationId]
    if (data.relatedCategoryId) fields["Related Category"] = [data.relatedCategoryId]
    if (data.ipAddress) fields["IP Address"] = data.ipAddress
    if (data.deviceInfo) fields["Device Info"] = data.deviceInfo
    if (data.sessionId) fields["Session ID"] = data.sessionId

    // Create the record in Airtable
    const record = await tables.userHistory.create(fields)

    return record
  } catch (error) {
    console.error("Error creating user history entry:", error)
    throw error
  }
}

export async function getUserHistory(userId: string, limit = 50) {
  try {
    const records = await tables.userHistory
      .select({
        filterByFormula: `FIND("${userId}", {User})`,
        maxRecords: limit,
        sort: [{ field: "Timestamp", direction: "desc" }],
      })
      .all()

    return records.map((record) => ({
      id: record.id,
      fields: record.fields,
    })) as UserHistoryEntry[]
  } catch (error) {
    console.error("Error fetching user history:", error)
    throw error
  }
}

