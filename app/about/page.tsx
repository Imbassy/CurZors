import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Anchor, Compass, Fish, Ship, SnailIcon as Snorkel, Waves } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="flex flex-col gap-12">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-4 md:text-4xl lg:text-5xl">About Red Sea Quest</h1>
          <p className="text-xl text-muted-foreground">
            Connecting travelers with unforgettable marine experiences in the Red Sea region
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl font-bold mb-4">Our Story</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Red Sea Quest was founded in 2023 by a group of passionate divers and marine enthusiasts who wanted to
                share the beauty of the Red Sea with the world.
              </p>
              <p>
                Our mission is to connect travelers with authentic, high-quality marine experiences while promoting
                sustainable tourism practices that protect the delicate ecosystem of the Red Sea.
              </p>
              <p>
                We partner with local operators who share our values of sustainability, safety, and exceptional service
                to offer a curated selection of the best marine experiences in the region.
              </p>
            </div>
          </div>
          <div className="relative aspect-video rounded-lg overflow-hidden">
            <Image src="/placeholder.svg?height=400&width=600" alt="Red Sea Quest Team" fill className="object-cover" />
          </div>
        </div>

        <div className="bg-primary/5 rounded-lg p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">What We Offer</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We provide a wide range of marine experiences for all levels of adventure seekers
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="rounded-full bg-primary/10 p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <Snorkel className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2">Diving Adventures</h3>
                <p className="text-muted-foreground">
                  Explore vibrant coral reefs and encounter diverse marine life with our professional diving guides.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="rounded-full bg-primary/10 p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <Ship className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2">Boat Tours</h3>
                <p className="text-muted-foreground">
                  Cruise the crystal-clear waters of the Red Sea and discover hidden coves and pristine beaches.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="rounded-full bg-primary/10 p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <Fish className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2">Snorkeling Trips</h3>
                <p className="text-muted-foreground">
                  Perfect for all ages, our snorkeling trips offer an accessible way to experience the underwater world.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="rounded-full bg-primary/10 p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <Anchor className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2">Fishing Expeditions</h3>
                <p className="text-muted-foreground">
                  Join experienced local fishermen for traditional and sport fishing adventures in rich fishing grounds.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="rounded-full bg-primary/10 p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <Waves className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2">Water Sports</h3>
                <p className="text-muted-foreground">
                  Get your adrenaline pumping with jet skiing, parasailing, wakeboarding, and more exciting water
                  activities.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="rounded-full bg-primary/10 p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <Compass className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2">Custom Experiences</h3>
                <p className="text-muted-foreground">
                  Looking for something special? We can arrange custom experiences tailored to your preferences.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Our Commitment to Sustainability</h2>
          <p className="text-muted-foreground mb-6">
            We believe in responsible tourism that preserves the natural beauty of the Red Sea for future generations.
            That's why we partner only with operators who follow sustainable practices and contribute to marine
            conservation efforts.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
            <div className="p-4">
              <div className="font-bold text-3xl text-primary mb-2">5%</div>
              <p className="text-sm text-muted-foreground">of our profits go to marine conservation</p>
            </div>
            <div className="p-4">
              <div className="font-bold text-3xl text-primary mb-2">100+</div>
              <p className="text-sm text-muted-foreground">eco-friendly experiences available</p>
            </div>
            <div className="p-4">
              <div className="font-bold text-3xl text-primary mb-2">0</div>
              <p className="text-sm text-muted-foreground">single-use plastics on our partner boats</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

