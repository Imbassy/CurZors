"use client"

import { Button } from "@/components/ui/button"
import { Facebook, Twitter, Linkedin, Link2 } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

interface ShareButtonsProps {
  title: string
  slug: string
}

export function ShareButtons({ title, slug }: ShareButtonsProps) {
  const baseUrl = typeof window !== "undefined" ? window.location.origin : "https://redseaquest.com"

  const url = `${baseUrl}/blog/${slug}`

  const handleShare = (platform: string) => {
    let shareUrl = ""

    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
        break
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`
        break
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
        break
      case "copy":
        navigator.clipboard.writeText(url).then(() => {
          toast({
            title: "Link copied!",
            description: "The article link has been copied to your clipboard.",
          })
        })
        return
    }

    if (shareUrl) {
      window.open(shareUrl, "_blank", "width=600,height=400")
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm font-medium mb-2">Share</p>

      <Button variant="outline" size="icon" onClick={() => handleShare("facebook")} aria-label="Share on Facebook">
        <Facebook className="h-4 w-4" />
      </Button>

      <Button variant="outline" size="icon" onClick={() => handleShare("twitter")} aria-label="Share on Twitter">
        <Twitter className="h-4 w-4" />
      </Button>

      <Button variant="outline" size="icon" onClick={() => handleShare("linkedin")} aria-label="Share on LinkedIn">
        <Linkedin className="h-4 w-4" />
      </Button>

      <Button variant="outline" size="icon" onClick={() => handleShare("copy")} aria-label="Copy link">
        <Link2 className="h-4 w-4" />
      </Button>
    </div>
  )
}

