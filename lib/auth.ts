import { logError } from "./error-handler"

// Use environment variable with fallback for development only
const JWT_SECRET = process.env.JWT_SECRET || "development-secret-do-not-use-in-production"
const JWT_EXPIRY = "7d" // 7 days

export function createJWT(user: any) {
  if (!user.userId || !user.email) {
    throw new Error("User ID and email are required for JWT creation")
  }

  try {
    // Simple JWT implementation without external libraries
    const payload = {
      userId: user.userId,
      email: user.email,
      userType: user.userType,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60, // 7 days
    }

    // Base64 encode the payload
    const encodedPayload = Buffer.from(JSON.stringify(payload))
      .toString("base64")
      .replace(/=/g, "")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")

    // Create a simple signature (in production, use a proper JWT library)
    const signature = Buffer.from(JWT_SECRET + "." + encodedPayload)
      .toString("base64")
      .replace(/=/g, "")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")

    // Combine to form a JWT-like token
    return `v0jwt.${encodedPayload}.${signature}`
  } catch (error) {
    logError({
      message: "Failed to create JWT",
      source: "auth",
      context: { userId: user.userId },
      originalError: error,
    })
    throw error
  }
}

export function verifyJWT(token: string) {
  try {
    // Simple verification for our custom token format
    if (!token.startsWith("v0jwt.")) {
      return null
    }

    const parts = token.split(".")
    if (parts.length !== 3) {
      return null
    }

    const encodedPayload = parts[1]
    const providedSignature = parts[2]

    // Verify signature
    const expectedSignature = Buffer.from(JWT_SECRET + "." + encodedPayload)
      .toString("base64")
      .replace(/=/g, "")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")

    if (providedSignature !== expectedSignature) {
      return null
    }

    // Decode payload
    const payloadString = Buffer.from(encodedPayload, "base64").toString()
    const payload = JSON.parse(payloadString)

    // Check expiration
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
      return null
    }

    return payload
  } catch (error) {
    logError({
      message: "JWT verification failed",
      source: "auth",
      originalError: error,
    })
    return null
  }
}

