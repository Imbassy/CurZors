"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail } from "lucide-react"

export function NewsletterSubscribe() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    // In a real app, you'd send this to your API
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setIsSuccess(true)
      setEmail("")
    } catch (err) {
      setError("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto text-center">
      <div className="inline-block p-3 bg-primary/20 rounded-full mb-6">
        <Mail className="h-6 w-6 text-primary" />
      </div>
      <h2 className="text-3xl font-bold mb-3">Get Insider Travel Tips</h2>
      <p className="text-lg text-muted-foreground mb-6">
        Subscribe to our newsletter for exclusive deals, travel tips, and the latest Red Sea adventures.
      </p>

      {isSuccess ? (
        <div className="bg-green-100 text-green-800 p-4 rounded-lg">
          <p className="font-medium">Thank you for subscribing!</p>
          <p className="text-sm mt-1">We've sent a confirmation email to your inbox.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <Input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-grow"
            aria-label="Email address"
          />
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Subscribing..." : "Subscribe"}
          </Button>
        </form>
      )}

      {error && <p className="text-red-500 mt-2">{error}</p>}

      <p className="text-sm text-muted-foreground mt-4">We respect your privacy. Unsubscribe at any time.</p>
    </div>
  )
}

