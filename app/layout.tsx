import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/contexts/auth-context"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SecondaryMenu } from "@/components/secondary-menu"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Red Sea Quest - Marine Tours & Experiences",
  description: "Book unforgettable marine tours and experiences in the Red Sea region.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider defaultTheme="light" attribute="class">
          <AuthProvider>
            <div className="flex min-h-screen flex-col">
              <Header />
              <SecondaryMenu />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'