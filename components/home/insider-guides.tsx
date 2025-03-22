import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CalendarDays } from "lucide-react"

export function InsiderGuides() {
  // In a real app, you'd fetch this from your blog posts in Airtable
  const guides = [
    {
      id: "1",
      title: "10 Hidden Gems in Hurghada Only Locals Know About",
      excerpt:
        "Discover secret spots and local favorites that most tourists never see in this beautiful Red Sea destination.",
      image: "/placeholder.svg?height=200&width=400",
      date: "May 15, 2025",
      author: "Sarah Johnson",
      slug: "hidden-gems-hurghada",
    },
    {
      id: "2",
      title: "The Ultimate Guide to Diving in the Red Sea",
      excerpt:
        "Everything you need to know before your first (or fiftieth) dive in these crystal waters with incredible marine life.",
      image: "/placeholder.svg?height=200&width=400",
      date: "April 28, 2025",
      author: "Michael Chen",
      slug: "ultimate-diving-guide",
    },
    {
      id: "3",
      title: "Best Time to Visit: Red Sea Weather Guide",
      excerpt:
        "Plan your perfect trip with our month-by-month breakdown of weather patterns, water temperatures, and tourist seasons.",
      image: "/placeholder.svg?height=200&width=400",
      date: "June 3, 2025",
      author: "Ahmed Hassan",
      slug: "red-sea-weather-guide",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {guides.map((guide) => (
        <Card key={guide.id} className="overflow-hidden hover:shadow-md transition-shadow h-full flex flex-col">
          <div className="relative aspect-[2/1] overflow-hidden">
            <Image
              src={guide.image || "/placeholder.svg"}
              alt={guide.title}
              fill
              className="object-cover transition-transform hover:scale-105 duration-300"
            />
          </div>
          <CardContent className="flex-grow p-5">
            <div className="flex items-center text-sm text-muted-foreground mb-2">
              <CalendarDays className="h-4 w-4 mr-1" />
              <span>{guide.date}</span>
            </div>
            <h3 className="font-semibold text-lg mb-2 line-clamp-2">{guide.title}</h3>
            <p className="text-muted-foreground line-clamp-3">{guide.excerpt}</p>
          </CardContent>
          <CardFooter className="p-5 pt-0">
            <Button asChild variant="outline" className="w-full">
              <Link href={`/blog/${guide.slug}`}>Read More</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

