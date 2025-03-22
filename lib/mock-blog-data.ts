import type { BlogPost, BlogCategory, BlogTag, BlogAuthor } from "@/lib/airtable"

// Mock blog posts data
export const mockBlogPosts: BlogPost[] = Array.from({ length: 20 }).map((_, index) => ({
  id: `rec${index}`,
  fields: {
    "Post ID": `post_${index}`,
    Title: `Sample Blog Post ${index + 1}`,
    Slug: `sample-blog-post-${index + 1}`,
    Content: `This is the content for sample blog post ${index + 1}. It contains detailed information about marine experiences in the Red Sea.`,
    "Featured Image": [
      {
        url: `https://source.unsplash.com/random/800x600?sea,${index}`,
        filename: `featured-image-${index}.jpg`,
        id: `att${index}`,
      },
    ],
    "Publication Date": new Date(2023, 0, index + 1).toISOString(),
    "Last Updated": new Date(2023, 0, index + 1).toISOString(),
    Status: "Published",
    Author: [`recAuthor${index % 5}`],
    Categories: [`recCategory${index % 3}`],
    Tags: [`recTag${index % 8}`, `recTag${(index + 1) % 8}`],
    Excerpt: `A brief excerpt for sample blog post ${index + 1} about marine experiences in the Red Sea.`,
    "Read Time": 5 + (index % 10),
    "View Count": 100 + index * 10,
    "Featured Post": index === 0,
    "Allow Comments": true,
    "Meta Title": `Sample Blog Post ${index + 1} | Red Sea Quest`,
    "Meta Description": `Learn about marine experiences in the Red Sea in our sample blog post ${index + 1}.`,
    "Meta Keywords": "red sea, marine, diving, snorkeling",
    "Open Graph Title": `Sample Blog Post ${index + 1}`,
    "Open Graph Description": `Learn about marine experiences in the Red Sea in our sample blog post ${index + 1}.`,
    "Open Graph Image": [
      {
        url: `https://source.unsplash.com/random/1200x630?sea,${index}`,
        filename: `og-image-${index}.jpg`,
        id: `attOg${index}`,
      },
    ],
    "Twitter Title": `Sample Blog Post ${index + 1}`,
    "Twitter Description": `Learn about marine experiences in the Red Sea in our sample blog post ${index + 1}.`,
    "Twitter Image": [
      {
        url: `https://source.unsplash.com/random/1200x600?sea,${index}`,
        filename: `twitter-image-${index}.jpg`,
        id: `attTwitter${index}`,
      },
    ],
    "Canonical URL": `https://redseaquest.com/blog/sample-blog-post-${index + 1}`,
    "Related Posts": [],
  },
}))

// Mock blog categories
export const mockBlogCategories: BlogCategory[] = [
  {
    id: "recCategory0",
    fields: {
      "Category ID": "cat_1",
      Name: "Diving",
      Slug: "diving",
      Description: "Articles about diving experiences in the Red Sea",
      "Post Count": 10,
      "Meta Title": "Diving Articles | Red Sea Quest",
      "Meta Description": "Explore our diving articles about the Red Sea",
      "Meta Keywords": "diving, red sea, scuba",
    },
  },
  {
    id: "recCategory1",
    fields: {
      "Category ID": "cat_2",
      Name: "Snorkeling",
      Slug: "snorkeling",
      Description: "Articles about snorkeling experiences in the Red Sea",
      "Post Count": 8,
      "Meta Title": "Snorkeling Articles | Red Sea Quest",
      "Meta Description": "Explore our snorkeling articles about the Red Sea",
      "Meta Keywords": "snorkeling, red sea, marine life",
    },
  },
  {
    id: "recCategory2",
    fields: {
      "Category ID": "cat_3",
      Name: "Marine Life",
      Slug: "marine-life",
      Description: "Articles about marine life in the Red Sea",
      "Post Count": 12,
      "Meta Title": "Marine Life Articles | Red Sea Quest",
      "Meta Description": "Explore our articles about marine life in the Red Sea",
      "Meta Keywords": "marine life, red sea, fish, coral",
    },
  },
]

// Mock blog tags
export const mockBlogTags: BlogTag[] = Array.from({ length: 8 }).map((_, index) => ({
  id: `recTag${index}`,
  fields: {
    "Tag ID": `tag_${index + 1}`,
    Name: `Tag ${index + 1}`,
    Slug: `tag-${index + 1}`,
    Description: `Description for Tag ${index + 1}`,
    "Post Count": 5 + index,
    "Meta Title": `Tag ${index + 1} | Red Sea Quest`,
    "Meta Description": `Explore articles tagged with Tag ${index + 1}`,
    "Meta Keywords": `tag ${index + 1}, red sea`,
  },
}))

// Mock blog authors
export const mockBlogAuthors: BlogAuthor[] = Array.from({ length: 5 }).map((_, index) => ({
  id: `recAuthor${index}`,
  fields: {
    "Author ID": `author_${index + 1}`,
    Name: `Author ${index + 1}`,
    Slug: `author-${index + 1}`,
    Email: `author${index + 1}@example.com`,
    Bio: `Bio for Author ${index + 1}`,
    "Profile Image": [
      {
        url: `https://source.unsplash.com/random/200x200?person,${index}`,
        filename: `author-${index}.jpg`,
        id: `attAuthor${index}`,
      },
    ],
    "Social Media": {
      Twitter: `https://twitter.com/author${index + 1}`,
      LinkedIn: `https://linkedin.com/in/author${index + 1}`,
    },
    User: [`recUser${index}`],
    "Post Count": 4 + index,
    "Meta Title": `Author ${index + 1} | Red Sea Quest`,
    "Meta Description": `Explore articles by Author ${index + 1}`,
    "Meta Keywords": `author ${index + 1}, red sea`,
  },
}))

// Function to filter and paginate mock blog posts
export function getMockBlogPosts(
  options: {
    limit?: number
    page?: number
    category?: string
    tag?: string
    author?: string
    status?: string
    featured?: boolean
    sortField?: string
    sortDirection?: string
    search?: string
  } = {},
) {
  const {
    limit = 10,
    page = 1,
    category,
    tag,
    author,
    status = "Published",
    featured,
    sortField = "Publication Date",
    sortDirection = "desc",
    search,
  } = options

  // Filter posts
  let filteredPosts = [...mockBlogPosts]

  // Filter by status
  if (status) {
    filteredPosts = filteredPosts.filter((post) => post.fields.Status === status)
  }

  // Filter by category
  if (category) {
    filteredPosts = filteredPosts.filter((post) =>
      post.fields.Categories.some((cat) => {
        const categoryObj = mockBlogCategories.find((c) => c.id === cat)
        return categoryObj?.fields.Slug === category || categoryObj?.fields.Name === category
      }),
    )
  }

  // Filter by tag
  if (tag) {
    filteredPosts = filteredPosts.filter((post) =>
      post.fields.Tags.some((t) => {
        const tagObj = mockBlogTags.find((tagItem) => tagItem.id === t)
        return tagObj?.fields.Slug === tag || tagObj?.fields.Name === tag
      }),
    )
  }

  // Filter by author
  if (author) {
    filteredPosts = filteredPosts.filter((post) =>
      post.fields.Author.some((a) => {
        const authorObj = mockBlogAuthors.find((authorItem) => authorItem.id === a)
        return authorObj?.fields.Slug === author || authorObj?.fields.Name === author
      }),
    )
  }

  // Filter by featured
  if (featured) {
    filteredPosts = filteredPosts.filter((post) => post.fields["Featured Post"])
  }

  // Filter by search
  if (search) {
    const searchLower = search.toLowerCase()
    filteredPosts = filteredPosts.filter(
      (post) =>
        post.fields.Title.toLowerCase().includes(searchLower) ||
        post.fields.Content.toLowerCase().includes(searchLower) ||
        post.fields.Excerpt.toLowerCase().includes(searchLower),
    )
  }

  // Sort posts
  filteredPosts.sort((a, b) => {
    const fieldA = a.fields[sortField as keyof typeof a.fields]
    const fieldB = b.fields[sortField as keyof typeof b.fields]

    if (typeof fieldA === "string" && typeof fieldB === "string") {
      return sortDirection === "asc" ? fieldA.localeCompare(fieldB) : fieldB.localeCompare(fieldA)
    }

    if (typeof fieldA === "number" && typeof fieldB === "number") {
      return sortDirection === "asc" ? fieldA - fieldB : fieldB - fieldA
    }

    return 0
  })

  // Paginate posts
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const paginatedPosts = filteredPosts.slice(startIndex, endIndex)

  return paginatedPosts
}

