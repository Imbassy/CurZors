import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { getBlogPostBySlug, getRelatedBlogPosts, incrementBlogPostViewCount } from "@/lib/airtable"
import { BlogAuthorCard } from "@/components/blog/blog-author-card"
import { BlogPostMeta } from "@/components/blog/blog-post-meta"
import { RelatedPosts } from "@/components/blog/related-posts"
import { BlogContent } from "@/components/blog/blog-content"
import { ShareButtons } from "@/components/blog/share-buttons"

// Generate metadata for the blog post
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getBlogPostBySlug(params.slug)

  if (!post) {
    return {
      title: "Post Not Found | Red Sea Quest Blog",
      description: "The blog post you're looking for could not be found.",
    }
  }

  return {
    title: post.fields["Meta Title"] || post.fields.Title,
    description: post.fields["Meta Description"] || post.fields.Excerpt,
    keywords: post.fields["Meta Keywords"],
    openGraph: {
      title: post.fields["Open Graph Title"] || post.fields.Title,
      description: post.fields["Open Graph Description"] || post.fields.Excerpt,
      images: post.fields["Open Graph Image"]?.[0]?.url
        ? [post.fields["Open Graph Image"][0].url]
        : post.fields["Featured Image"]?.[0]?.url
          ? [post.fields["Featured Image"][0].url]
          : [],
      type: "article",
      publishedTime: post.fields["Publication Date"],
      modifiedTime: post.fields["Last Updated"],
      authors: post.fields.Author ? [`https://redseaquest.com/blog/author/${post.fields.Author[0]}`] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.fields["Twitter Title"] || post.fields.Title,
      description: post.fields["Twitter Description"] || post.fields.Excerpt,
      images: post.fields["Twitter Image"]?.[0]?.url
        ? [post.fields["Twitter Image"][0].url]
        : post.fields["Featured Image"]?.[0]?.url
          ? [post.fields["Featured Image"][0].url]
          : [],
    },
    alternates: {
      canonical: post.fields["Canonical URL"] || `https://redseaquest.com/blog/${params.slug}`,
    },
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  // Increment view count (don't await to avoid blocking the page render)
  incrementBlogPostViewCount(params.slug)

  // Fetch related posts
  const relatedPosts = await getRelatedBlogPosts(post.fields["Post ID"])

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link href="/" className="hover:text-foreground">
            Home
          </Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-foreground">
            Blog
          </Link>
          <span>/</span>
          <span className="text-foreground">{post.fields.Title}</span>
        </div>

        {/* Post Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.fields.Title}</h1>

          <BlogPostMeta
            date={post.fields["Publication Date"]}
            readTime={post.fields["Read Time"]}
            categories={post.fields.Categories}
          />
        </div>

        {/* Featured Image */}
        {post.fields["Featured Image"] && post.fields["Featured Image"].length > 0 && (
          <div className="relative aspect-[16/9] rounded-lg overflow-hidden mb-8">
            <Image
              src={post.fields["Featured Image"][0].url || "/placeholder.svg"}
              alt={post.fields.Title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Post Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Share buttons (desktop) */}
          <div className="hidden md:block md:col-span-1">
            <div className="sticky top-24">
              <ShareButtons title={post.fields.Title} slug={post.fields.Slug} />
            </div>
          </div>

          {/* Main content */}
          <div className="md:col-span-3">
            <BlogContent content={post.fields.Content} />

            {/* Tags */}
            {post.fields.Tags && post.fields.Tags.length > 0 && (
              <div className="mt-8">
                <h3 className="text-sm font-medium mb-2">Tags:</h3>
                <div className="flex flex-wrap gap-2">
                  {post.fields.Tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/blog/tag/${tag}`}
                      className="px-3 py-1 bg-muted rounded-full text-sm hover:bg-muted/80"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Share buttons (mobile) */}
            <div className="md:hidden mt-8">
              <ShareButtons title={post.fields.Title} slug={post.fields.Slug} />
            </div>

            {/* Author info */}
            <div className="mt-12 border-t pt-8">
              <BlogAuthorCard authorId={post.fields.Author[0]} />
            </div>
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Related Posts</h2>
            <RelatedPosts posts={relatedPosts} />
          </div>
        )}
      </div>
    </div>
  )
}

