import { NextResponse } from "next/server"
import Airtable from "airtable"

export async function GET() {
  // Only allow in development mode
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json({ error: "This endpoint is only available in development mode" }, { status: 403 })
  }

  const results: Record<string, any> = {
    environment: {
      apiKey: process.env.AIRTABLE_API_KEY ? "✅ Present" : "❌ Missing",
      baseId: process.env.AIRTABLE_BASE_ID ? "✅ Present" : "❌ Missing",
    },
    tables: {},
    error: null,
  }

  try {
    // Initialize Airtable with API key
    const airtable = new Airtable({
      apiKey: process.env.AIRTABLE_API_KEY,
    })

    // Get the base
    const base = airtable.base(process.env.AIRTABLE_BASE_ID as string)

    // List of tables to check
    const tablesToCheck = [
      "BlogPosts",
      "BlogCategories",
      "BlogTags",
      "BlogAuthors",
      "Listings",
      "Bookings",
      "Reviews",
      "Destinations",
      "Categories",
      "Amenities",
    ]

    // Check each table
    for (const tableName of tablesToCheck) {
      try {
        const table = base.table(tableName)
        const records = await table.select({ maxRecords: 1 }).all()
        results.tables[tableName] = {
          status: "✅ Accessible",
          recordCount: records.length,
          sample: records.length > 0 ? "✅ Sample record found" : "⚠️ No records found",
        }
      } catch (error: any) {
        results.tables[tableName] = {
          status: "❌ Error",
          error: error.message || String(error),
        }
      }
    }

    return NextResponse.json(results)
  } catch (error: any) {
    results.error = error.message || String(error)
    return NextResponse.json(results, { status: 500 })
  }
}

