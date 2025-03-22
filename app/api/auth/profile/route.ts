import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { verifyJWT } from "@/lib/auth"
import tables from "@/lib/airtable"

export async function PATCH(request: Request) {
  try {
    // Get token from cookies
    const token = cookies().get("auth_token")?.value

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    // Verify token
    const payload = verifyJWT(token)
    if (!payload || !payload.userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    // Get user data from request
    const userData = await request.json()

    // Find user in Airtable
    const users = await tables.users
      .select({
        filterByFormula: `{User ID} = "${payload.userId}"`,
        maxRecords: 1,
      })
      .all()

    if (users.length === 0) {
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    const userRecord = users[0]

    // Update user in Airtable
    // Only allow updating certain fields
    const allowedFields: Record<string, string> = {
      fullName: "Full Name",
      phoneNumber: "Phone Number",
      // Add other fields that can be updated
    }

    const updateData: Record<string, any> = {}

    Object.entries(userData).forEach(([key, value]) => {
      if (allowedFields[key]) {
        updateData[allowedFields[key]] = value
      }
    })

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({ message: "No valid fields to update" }, { status: 400 })
    }

    const updatedUser = await tables.users.update(userRecord.id, updateData)

    // Return updated user data
    const user = {
      id: updatedUser.id,
      userId: updatedUser.fields["User ID"] as string,
      email: updatedUser.fields["Email"] as string,
      fullName: updatedUser.fields["Full Name"] as string,
      userType: updatedUser.fields["User Type"] as "Traveler" | "Service Provider",
      phoneNumber: updatedUser.fields["Phone Number"] as string,
      accountStatus: updatedUser.fields["Account Status"] as string,
      joinDate: updatedUser.fields["Join Date"] as string,
      profilePhoto: updatedUser.fields["Profile Photo"]?.[0]?.url,
    }

    return NextResponse.json({ user })
  } catch (error) {
    console.error("Profile update error:", error)
    return NextResponse.json({ message: "Profile update failed" }, { status: 500 })
  }
}

