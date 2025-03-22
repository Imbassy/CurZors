import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { SocialLinks } from "@/components/blog/social-links"
import { getBlogAuthorBySlug } from "@/lib/airtable"

interface BlogAuthorCardProps {
  authorId: string
}

export async function BlogAuthorCard({ authorId }: BlogAuthorCardProps) {
  const author = await getBlogAuthorBySlug(authorId)

  if (!author) {
    return null
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-start">
          {author.fields["Profile Image"] && author.fields["Profile Image"].length > 0 && (
            <div className="w-20 h-20 relative rounded-full overflow-hidden flex-shrink-0">
              <Image
                src={author.fields["Profile Image"][0].url || "/placeholder.svg"}
                alt={author.fields.Name}
                fill
                className="object-cover"
              />
            </div>
          )}

          <div className="text-center sm:text-left">
            <Link href={`/blog/author/${author.fields.Slug}`} className="hover:underline">
              <h3 className="font-bold text-lg mb-1">{author.fields.Name}</h3>
            </Link>

            <p className="text-sm text-muted-foreground mb-3 line-clamp-3">{author.fields.Bio}</p>

            {/* Social Links */}
            {author.fields["Social Media"] && <SocialLinks socialMedia={author.fields["Social Media"]} />}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

