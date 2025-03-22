import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import bcrypt from "bcryptjs"
import tables from "@/lib/airtable"
import { createJWT } from "@/lib/auth"

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    // Validate input
    if (!email || !password) {
      return NextResponse.json({ message: "Email and password are required" }, { status: 400 })
    }

    // Find user by email
    const users = await tables.users
      .select({
        filterByFormula: `{Email} = "${email}"`,
        maxRecords: 1,
      })
      .all()

    if (users.length === 0) {
      return NextResponse.json({ message: "Invalid email or password" }, { status: 401 })
    }

    const userRecord = users[0]
    const userData = userRecord.fields

    // Check account status
    if (userData["Account Status"] !== "Active") {
      return NextResponse.json({ message: "Account is not active" }, { status: 403 })
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, userData["Password"] as string)

    if (!isPasswordValid) {
      return NextResponse.json({ message: "Invalid email or password" }, { status: 401 })
    }

    // Create user object (without sensitive data)
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

    // Create JWT token
    const token = createJWT(user)

    // Set cookie
    cookies().set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    })

    return NextResponse.json({ user })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ message: "Login failed" }, { status: 500 })
  }
}

