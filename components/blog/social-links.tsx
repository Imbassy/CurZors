import { Button } from "@/components/ui/button"
import { Twitter, Linkedin, Facebook, Instagram } from "lucide-react"

interface SocialLinksProps {
  socialMedia: {
    Twitter?: string
    LinkedIn?: string
    Facebook?: string
    Instagram?: string
  }
}

export function SocialLinks({ socialMedia }: SocialLinksProps) {
  return (
    <div className="flex gap-2">
      {socialMedia.Twitter && (
        <Button variant="ghost" size="icon" asChild>
          <a href={socialMedia.Twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <Twitter className="h-4 w-4" />
          </a>
        </Button>
      )}

      {socialMedia.LinkedIn && (
        <Button variant="ghost" size="icon" asChild>
          <a href={socialMedia.LinkedIn} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <Linkedin className="h-4 w-4" />
          </a>
        </Button>
      )}

      {socialMedia.Facebook && (
        <Button variant="ghost" size="icon" asChild>
          <a href={socialMedia.Facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <Facebook className="h-4 w-4" />
          </a>
        </Button>
      )}

      {socialMedia.Instagram && (
        <Button variant="ghost" size="icon" asChild>
          <a href={socialMedia.Instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <Instagram className="h-4 w-4" />
          </a>
        </Button>
      )}
    </div>
  )
}

