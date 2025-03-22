export type MenuSection = {
  title: string
  items: {
    name: string
    href: string
    icon?: string
    description?: string
  }[]
}

export type MenuCategory = {
  name: string
  sections: MenuSection[]
}

// Define the actual site structure here
export const menuData: MenuCategory[] = [
  {
    name: "Places to see",
    sections: [
      {
        title: "Popular Destinations",
        items: [
          {
            name: "Hurghada",
            href: "/destinations/hurghada",
            icon: "/placeholder.svg?height=40&width=40",
          },
          {
            name: "Sharm El Sheikh",
            href: "/destinations/sharm-el-sheikh",
            icon: "/placeholder.svg?height=40&width=40",
          },
          {
            name: "Dahab",
            href: "/destinations/dahab",
            icon: "/placeholder.svg?height=40&width=40",
          },
          {
            name: "Marsa Alam",
            href: "/destinations/marsa-alam",
            icon: "/placeholder.svg?height=40&width=40",
          },
        ],
      },
      {
        title: "Islands & Reefs",
        items: [
          {
            name: "Giftun Islands",
            href: "/destinations/giftun-islands",
            icon: "/placeholder.svg?height=40&width=40",
          },
          {
            name: "Tiran Island",
            href: "/destinations/tiran-island",
            icon: "/placeholder.svg?height=40&width=40",
          },
          {
            name: "Ras Mohammed",
            href: "/destinations/ras-mohammed",
            icon: "/placeholder.svg?height=40&width=40",
          },
          {
            name: "Abu Galawa",
            href: "/destinations/abu-galawa",
            icon: "/placeholder.svg?height=40&width=40",
          },
        ],
      },
    ],
  },
  {
    name: "Things to do",
    sections: [
      {
        title: "Top experiences",
        items: [
          {
            name: "Diving",
            href: "/activities/diving",
            icon: "/placeholder.svg?height=40&width=40",
          },
          {
            name: "Snorkeling",
            href: "/activities/snorkeling",
            icon: "/placeholder.svg?height=40&width=40",
          },
          {
            name: "Dolphin & whale watching",
            href: "/activities/dolphin-watching",
            icon: "/placeholder.svg?height=40&width=40",
          },
          {
            name: "Submarine tours",
            href: "/activities/submarine-tours",
            icon: "/placeholder.svg?height=40&width=40",
          },
        ],
      },
      {
        title: "Water Activities",
        items: [
          {
            name: "Swim with dolphins",
            href: "/activities/swim-with-dolphins",
            icon: "/placeholder.svg?height=40&width=40",
          },
          {
            name: "Glass bottom boats",
            href: "/activities/glass-bottom-boats",
            icon: "/placeholder.svg?height=40&width=40",
          },
          {
            name: "Parasailing",
            href: "/activities/parasailing",
            icon: "/placeholder.svg?height=40&width=40",
          },
          {
            name: "Water parks",
            href: "/activities/water-parks",
            icon: "/placeholder.svg?height=40&width=40",
          },
        ],
      },
      {
        title: "Land Activities",
        items: [
          {
            name: "Quad & ATV tours",
            href: "/activities/quad-atv-tours",
            icon: "/placeholder.svg?height=40&width=40",
          },
          {
            name: "Camel riding tours",
            href: "/activities/camel-riding",
            icon: "/placeholder.svg?height=40&width=40",
          },
          {
            name: "Horse riding",
            href: "/activities/horse-riding",
            icon: "/placeholder.svg?height=40&width=40",
          },
          {
            name: "Desert safaris",
            href: "/activities/desert-safaris",
            icon: "/placeholder.svg?height=40&width=40",
          },
        ],
      },
    ],
  },
]

export const filterCategories = [
  { name: "Top experiences", href: "/experiences" },
  { name: "Interests", href: "/interests" },
  { name: "Traveler type", href: "/traveler-types" },
  { name: "Outside Red Sea", href: "/outside-red-sea" },
]

