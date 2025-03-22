import { initEnv } from "./env"
import { logError } from "./error-handler"

export async function initializeApp() {
  try {
    // Validate environment variables
    initEnv()

    // Add any other initialization logic here
    // For example, database connections, cache warming, etc.

    console.log("Application initialized successfully")
    return true
  } catch (error) {
    console.error("Failed to initialize application:", error)
    logError({
      message: "Failed to initialize application",
      source: "general",
      originalError: error,
    })
    // Return true anyway to prevent fatal errors during initialization
    // The app will continue with limited functionality
    return true
  }
}

