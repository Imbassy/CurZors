import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Clock } from "lucide-react"
import type { BlogPost } from "@/lib/airtable"

interface RelatedPostsProps {
  posts: BlogPost[]
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {posts.map((post) => (
        <Link key={post.id} href={`/blog/${post.fields.Slug}`}>
          <Card className="h-full overflow-hidden hover:shadow-md transition-shadow">
            <div className="aspect-[16/9] relative overflow-hidden">
              {post.fields["Featured Image"] && post.fields["Featured Image"].length > 0 ? (
                <Image
                  src={post.fields["Featured Image"][0].url || "/placeholder.svg"}
                  alt={post.fields.Title}
                  fill
                  className="object-cover transition-transform hover:scale-105"
                />
              ) : (
                <div className="w-full h-full bg-muted flex items-center justify-center">
                  <span className="text-muted-foreground">No image</span>
                </div>
              )}
            </div>

            <CardContent className="p-4">
              <h3 className="font-semibold text-base line-clamp-2 mb-2">{post.fields.Title}</h3>

              <div className="flex items-center text-xs text-muted-foreground">
                <Clock className="h-3 w-3 mr-1" />
                <span>{post.fields["Read Time"]} min read</span>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}

