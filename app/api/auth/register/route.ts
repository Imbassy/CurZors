import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { v4 as uuidv4 } from "uuid"
import bcrypt from "bcryptjs"
import tables from "@/lib/airtable"
import { createJWT } from "@/lib/auth"

export async function POST(request: Request) {
  try {
    const { email, password, fullName, userType, phoneNumber } = await request.json()

    // Validate input
    if (!email || !password || !fullName || !userType) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
    }

    // Check if user already exists
    const existingUsers = await tables.users
      .select({
        filterByFormula: `{Email} = "${email}"`,
        maxRecords: 1,
      })
      .all()

    if (existingUsers.length > 0) {
      return NextResponse.json({ message: "User with this email already exists" }, { status: 409 })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Generate unique user ID
    const userId = `user_${uuidv4().replace(/-/g, "").substring(0, 16)}`

    // Create user in Airtable
    const newUser = await tables.users.create({
      "User ID": userId,
      Email: email,
      "Full Name": fullName,
      "User Type": userType,
      "Phone Number": phoneNumber || "",
      "Join Date": new Date().toISOString().split("T")[0],
      "Account Status": "Active",
      // Store hashed password in a secure field
      // Note: In a production app, you might want to use a separate table for auth
      Password: hashedPassword,
    })

    // Create user object (without sensitive data)
    const user = {
      id: newUser.id,
      userId: userId,
      email: email,
      fullName: fullName,
      userType: userType,
      phoneNumber: phoneNumber || "",
      accountStatus: "Active",
      joinDate: new Date().toISOString().split("T")[0],
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

    return NextResponse.json({ user }, { status: 201 })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ message: "Registration failed" }, { status: 500 })
  }
}

