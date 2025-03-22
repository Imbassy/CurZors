import { NextResponse } from "next/server"
import Airtable from "airtable"

export async function GET() {
  // Only allow in development mode
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json({ error: "This endpoint is only available in development mode" }, { status: 403 })
  }

  try {
    // Initialize Airtable with API key
    const airtable = new Airtable({
      apiKey: process.env.AIRTABLE_API_KEY,
    })

    // Get the base
    const base = airtable.base(process.env.AIRTABLE_BASE_ID as string)

    // Test access to tables
    const tableResults = {}
    const tables = [
      "BlogPosts",
      "BlogCategories",
      "BlogTags",
      "BlogAuthors",
      "Listings",
      "Destinations",
      "Categories",
      "Amenities",
      "Reviews",
      "Bookings",
    ]

    for (const tableName of tables) {
      try {
        const table = base.table(tableName)
        const records = await table.select({ maxRecords: 1 }).all()
        tableResults[tableName] = {
          accessible: true,
          recordCount: records.length,
          sample: records.length > 0 ? Object.keys(records[0].fields).slice(0, 5) : [],
        }
      } catch (error) {
        tableResults[tableName] = {
          accessible: false,
          error: error.message || "Unknown error",
          statusCode: error.statusCode,
          errorType: error.error,
        }
      }
    }

    // Return the results
    return NextResponse.json({
      success: true,
      apiKeyPresent: !!process.env.AIRTABLE_API_KEY,
      baseIdPresent: !!process.env.AIRTABLE_BASE_ID,
      apiKeyLength: process.env.AIRTABLE_API_KEY?.length || 0,
      baseIdLength: process.env.AIRTABLE_BASE_ID?.length || 0,
      tables: tableResults,
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Unknown error",
        stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
      },
      { status: 500 },
    )
  }
}

