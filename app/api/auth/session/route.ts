import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { verifyJWT } from "@/lib/auth"
import tables from "@/lib/airtable"

export async function GET() {
  try {
    // Get token from cookies
    const token = cookies().get("auth_token")?.value

    if (!token) {
      return NextResponse.json({ user: null })
    }

    // Verify token
    const payload = verifyJWT(token)
    if (!payload || !payload.userId) {
      return NextResponse.json({ user: null })
    }

    // Get fresh user data from Airtable
    const users = await tables.users
      .select({
        filterByFormula: `{User ID} = "${payload.userId}"`,
        maxRecords: 1,
      })
      .all()

    if (users.length === 0) {
      return NextResponse.json({ user: null })
    }

    const userRecord = users[0]
    const userData = userRecord.fields

    // Check if account is still active
    if (userData["Account Status"] !== "Active") {
      // Clear cookie if account is not active
      cookies().set("auth_token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        expires: new Date(0),
        path: "/",
      })
      return NextResponse.json({ user: null })
    }

    // Return user data (without sensitive information)
    const user = {
      id: userRecord.id,
      userId: userData["User ID"] as string,
      email: userData["Email"] as string,
      fullName: userData["Full Name"] as string,
      userType: userData["User Type"] as "Traveler" | "Service Provider",
      phoneNumber: userData["Phone Number"] as string,
      accountStatus: userData["Account Status"] as string,
      joinDate: userData["Join Date"] as string,
      profilePhoto: userData["Profile Photo"]?.[0]?.url,
    }

    return NextResponse.json({ user })
  } catch (error) {
    console.error("Session error:", error)
    return NextResponse.json({ user: null })
  }
}

