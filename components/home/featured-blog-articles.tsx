import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CalendarDays, User } from "lucide-react"
import type { BlogPost } from "@/lib/airtable"

interface FeaturedBlogArticlesProps {
  posts: BlogPost[]
}

export function FeaturedBlogArticles({ posts = [] }: FeaturedBlogArticlesProps) {
  // Fallback data in case no posts are provided
  const fallbackPosts = [
    {
      id: "1",
      fields: {
        "Post ID": "post_1",
        Title: "10 Hidden Gems in Hurghada Only Locals Know About",
        Excerpt:
          "Discover secret spots and local favorites that most tourists never see in this beautiful Red Sea destination.",
        "Featured Image": [{ url: "/placeholder.svg?height=200&width=400" }],
        "Publication Date": "2025-05-15",
        Slug: "hidden-gems-hurghada",
        Author: ["auth_1"],
        "Author Name": "Sarah Johnson",
      },
    },
    {
      id: "2",
      fields: {
        "Post ID": "post_2",
        Title: "The Ultimate Guide to Diving in the Red Sea",
        Excerpt:
          "Everything you need to know before your first (or fiftieth) dive in these crystal waters with incredible marine life.",
        "Featured Image": [{ url: "/placeholder.svg?height=200&width=400" }],
        "Publication Date": "2025-04-28",
        Slug: "ultimate-diving-guide",
        Author: ["auth_2"],
        "Author Name": "Michael Chen",
      },
    },
    {
      id: "3",
      fields: {
        "Post ID": "post_3",
        Title: "Best Time to Visit: Red Sea Weather Guide",
        Excerpt:
          "Plan your perfect trip with our month-by-month breakdown of weather patterns, water temperatures, and tourist seasons.",
        "Featured Image": [{ url: "/placeholder.svg?height=200&width=400" }],
        "Publication Date": "2025-06-03",
        Slug: "red-sea-weather-guide",
        Author: ["auth_3"],
        "Author Name": "Ahmed Hassan",
      },
    },
  ]

  // Use provided posts or fallback if empty
  const displayPosts = posts.length > 0 ? posts : fallbackPosts

  // Format date function
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(date)
    } catch (e) {
      return dateString
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {displayPosts.map((post) => (
        <Card key={post.id} className="overflow-hidden hover:shadow-md transition-shadow h-full flex flex-col">
          <div className="relative aspect-[2/1] overflow-hidden">
            <Image
              src={post.fields["Featured Image"]?.[0]?.url || "/placeholder.svg?height=200&width=400"}
              alt={post.fields.Title}
              fill
              className="object-cover transition-transform hover:scale-105 duration-300"
            />
          </div>
          <CardContent className="flex-grow p-5">
            <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
              <div className="flex items-center">
                <CalendarDays className="h-4 w-4 mr-1" />
                <span>{formatDate(post.fields["Publication Date"])}</span>
              </div>
              {post.fields["Author Name"] && (
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-1" />
                  <span>{post.fields["Author Name"]}</span>
                </div>
              )}
            </div>
            <h3 className="font-semibold text-lg mb-2 line-clamp-2">{post.fields.Title}</h3>
            <p className="text-muted-foreground line-clamp-3">{post.fields.Excerpt}</p>
          </CardContent>
          <CardFooter className="p-5 pt-0">
            <Button asChild variant="outline" className="w-full">
              <Link href={`/blog/${post.fields.Slug}`}>Read More</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

