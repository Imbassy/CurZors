import { Award, Clock, CreditCard, Globe, Heart, LifeBuoy, Shield, ThumbsUp } from "lucide-react"

export function WhyChooseUs() {
  const reasons = [
    {
      icon: <Shield className="h-10 w-10 text-primary" />,
      title: "Verified Local Operators",
      description:
        "We partner exclusively with trusted local operators who meet our rigorous safety and quality standards",
    },
    {
      icon: <CreditCard className="h-10 w-10 text-primary" />,
      title: "Secure Booking",
      description: "Book with confidence using our secure payment system with multiple payment options",
    },
    {
      icon: <Clock className="h-10 w-10 text-primary" />,
      title: "24/7 Support",
      description: "Our dedicated support team is available around the clock to assist with any questions or concerns",
    },
    {
      icon: <Award className="h-10 w-10 text-primary" />,
      title: "Marine Conservation",
      description: "5% of our profits go directly to Red Sea coral reef conservation and marine protection initiatives",
    },
    {
      icon: <ThumbsUp className="h-10 w-10 text-primary" />,
      title: "Best Price Guarantee",
      description: "Find the same tour for a lower price? We'll match it and give you 10% off your next booking",
    },
    {
      icon: <LifeBuoy className="h-10 w-10 text-primary" />,
      title: "Certified Guides",
      description: "All our diving and snorkeling guides are professionally certified with years of local experience",
    },
    {
      icon: <Heart className="h-10 w-10 text-primary" />,
      title: "Personalized Experiences",
      description: "We tailor each experience to your preferences, skill level, and special requirements",
    },
    {
      icon: <Globe className="h-10 w-10 text-primary" />,
      title: "Multilingual Services",
      description: "Our guides and support staff speak multiple languages to serve our international guests",
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Choose Red Sea Quest?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We're dedicated to providing exceptional marine experiences while protecting the Red Sea's unique ecosystem
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 rounded-lg hover:bg-primary/5 transition-colors"
            >
              <div className="mb-4">{reason.icon}</div>
              <h3 className="font-bold text-lg mb-2">{reason.title}</h3>
              <p className="text-sm text-muted-foreground">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

