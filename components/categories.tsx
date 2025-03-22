import type React from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Anchor, Compass, Fish, Ship, SnailIcon as Snorkel, Waves } from "lucide-react"
import { getCategories } from "@/lib/airtable"

export async function Categories() {
  // In a real app, you'd fetch this from Airtable
  // For now, we'll use placeholder data with icons
  const categories = await getCategories().catch(() => []) // Fallback to empty array if fetch fails

  // Map of category names to icons
  const categoryIcons: Record<string, React.ReactNode> = {
    Diving: <Snorkel className="h-6 w-6" />,
    Snorkeling: <Fish className="h-6 w-6" />,
    "Boat Tours": <Ship className="h-6 w-6" />,
    Fishing: <Anchor className="h-6 w-6" />,
    Sailing: <Waves className="h-6 w-6" />,
    Adventure: <Compass className="h-6 w-6" />,
  }

  // Fallback categories if none are available from Airtable
  const fallbackCategories = [
    { name: "Diving", icon: <Snorkel className="h-6 w-6" />, count: 15 },
    { name: "Snorkeling", icon: <Fish className="h-6 w-6" />, count: 12 },
    { name: "Boat Tours", icon: <Ship className="h-6 w-6" />, count: 8 },
    { name: "Fishing", icon: <Anchor className="h-6 w-6" />, count: 6 },
    { name: "Sailing", icon: <Waves className="h-6 w-6" />, count: 4 },
    { name: "Adventure", icon: <Compass className="h-6 w-6" />, count: 10 },
  ]

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
      {categories.length > 0
        ? categories.map((category) => {
            const categoryName = category.fields["Category Name"]
            const icon = categoryIcons[categoryName] || <Compass className="h-6 w-6" />

            return (
              <Link href={`/categories/${encodeURIComponent(categoryName)}`} key={category.id}>
                <Card className="hover:shadow-md transition-shadow h-full">
                  <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                    <div className="rounded-full bg-primary/10 p-3 mb-3">{icon}</div>
                    <h3 className="font-medium">{categoryName}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {category.fields["Number of Listings"] || 0} listings
                    </p>
                  </CardContent>
                </Card>
              </Link>
            )
          })
        : // Fallback placeholders if no categories are available
          fallbackCategories.map((category, i) => (
            <Card key={i} className="hover:shadow-md transition-shadow h-full">
              <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                <div className="rounded-full bg-primary/10 p-3 mb-3">{category.icon}</div>
                <h3 className="font-medium">{category.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{category.count} listings</p>
              </CardContent>
            </Card>
          ))}
    </div>
  )
}

