import { getCachedDestinations, getCachedBlogPosts, getCachedCategories } from "@/lib/data"
import { HeroSection } from "@/components/home/hero-section"
import { TopDestinations } from "@/components/top-destinations"
import { TopToursGrid } from "@/components/top-tours-grid"
import { FeaturedBlogArticles } from "@/components/home/featured-blog-articles"
import { NewsletterSubscribe } from "@/components/home/newsletter-subscribe"
import { CategoryCarousel } from "@/components/home/category-carousel"

export default async function Home() {
  // Fetch data for the page with proper error handling
  const destinations = await getCachedDestinations(5).catch((error) => {
    console.error("Error fetching destinations:", error)
    return []
  })

  // Fetch categories for the carousel
  const categories = await getCachedCategories().catch((error) => {
    console.error("Error fetching categories:", error)
    return []
  })

  // Fetch featured blog posts
  const blogPosts = await getCachedBlogPosts({
    featured: true,
    limit: 3,
    status: "Published",
  }).catch((error) => {
    console.error("Error fetching blog posts:", error)
    return []
  })

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Explore by Category Carousel - Replacing Featured Destinations */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Explore by Category</h2>
          <CategoryCarousel categories={categories} />
        </div>
      </section>

      {/* Top Destinations */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Top Destinations</h2>
          <TopDestinations destinations={destinations} />
        </div>
      </section>

      {/* Top Tours */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Top Tours</h2>
          <TopToursGrid />
        </div>
      </section>

      {/* Featured Blog Articles */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Featured Blog Articles</h2>
          <FeaturedBlogArticles posts={blogPosts} />
        </div>
      </section>

      {/* Newsletter Subscribe */}
      <section className="py-12 bg-primary/10">
        <div className="container mx-auto px-4">
          <NewsletterSubscribe />
        </div>
      </section>
    </div>
  )
}

