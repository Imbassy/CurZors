interface EnvVariable {
  key: string
  required: boolean
}

const requiredEnvVariables: EnvVariable[] = [
  { key: "AIRTABLE_API_KEY", required: true },
  { key: "AIRTABLE_BASE_ID", required: true },
  { key: "JWT_SECRET", required: true },
  { key: "NEXT_PUBLIC_SITE_URL", required: false },
]

export function validateEnv(): { valid: boolean; missing: string[] } {
  const missing: string[] = []

  for (const envVar of requiredEnvVariables) {
    if (envVar.required && !process.env[envVar.key]) {
      missing.push(envVar.key)
    }
  }

  return {
    valid: missing.length === 0,
    missing,
  }
}

// Call this function early in the application lifecycle
export function initEnv() {
  const { valid, missing } = validateEnv()

  if (!valid) {
    console.error(`Missing required environment variables: ${missing.join(", ")}`)
    if (process.env.NODE_ENV === "production") {
      throw new Error("Application cannot start due to missing environment variables")
    }
  }
}

