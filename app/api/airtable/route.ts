import { NextResponse } from "next/server"
import tables from "@/lib/airtable"
import { logError } from "@/lib/error-handler"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const table = searchParams.get("table")
  const id = searchParams.get("id")

  if (!table || !tables[table as keyof typeof tables]) {
    return NextResponse.json({ error: "Invalid table" }, { status: 400 })
  }

  try {
    if (id) {
      // Fetch a single record
      const record = await tables[table as keyof typeof tables].find(id)
      return NextResponse.json({ record })
    } else {
      // Fetch all records (with pagination)
      const records = await tables[table as keyof typeof tables]
        .select({
          maxRecords: 100,
        })
        .all()

      return NextResponse.json({ records })
    }
  } catch (error) {
    logError({
      message: `Error fetching from ${table}`,
      source: "airtable",
      context: { table, id },
      originalError: error,
    })

    return NextResponse.json(
      { error: "Failed to fetch data", details: process.env.NODE_ENV === "development" ? error : undefined },
      { status: 500 },
    )
  }
}

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url)
  const table = searchParams.get("table")

  if (!table || !tables[table as keyof typeof tables]) {
    return NextResponse.json({ error: "Invalid table" }, { status: 400 })
  }

  try {
    const data = await request.json()

    // Create a new record
    const record = await tables[table as keyof typeof tables].create(data)

    return NextResponse.json({ record })
  } catch (error) {
    logError({
      message: `Error creating record in ${table}`,
      source: "airtable",
      context: { table },
      originalError: error,
    })
    return NextResponse.json(
      { error: "Failed to create record", details: process.env.NODE_ENV === "development" ? error : undefined },
      { status: 500 },
    )
  }
}

export async function PATCH(request: Request) {
  const { searchParams } = new URL(request.url)
  const table = searchParams.get("table")
  const id = searchParams.get("id")

  if (!table || !tables[table as keyof typeof tables] || !id) {
    return NextResponse.json({ error: "Invalid table or ID" }, { status: 400 })
  }

  try {
    const data = await request.json()

    // Update an existing record
    const record = await tables[table as keyof typeof tables].update(id, data)

    return NextResponse.json({ record })
  } catch (error) {
    logError({
      message: `Error updating record in ${table}`,
      source: "airtable",
      context: { table, id },
      originalError: error,
    })
    return NextResponse.json(
      { error: "Failed to update record", details: process.env.NODE_ENV === "development" ? error : undefined },
      { status: 500 },
    )
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url)
  const table = searchParams.get("table")
  const id = searchParams.get("id")

  if (!table || !tables[table as keyof typeof tables] || !id) {
    return NextResponse.json({ error: "Invalid table or ID" }, { status: 400 })
  }

  try {
    // Delete a record
    const record = await tables[table as keyof typeof tables].destroy(id)

    return NextResponse.json({ record })
  } catch (error) {
    logError({
      message: `Error deleting record from ${table}`,
      source: "airtable",
      context: { table, id },
      originalError: error,
    })
    return NextResponse.json(
      { error: "Failed to delete record", details: process.env.NODE_ENV === "development" ? error : undefined },
      { status: 500 },
    )
  }
}

