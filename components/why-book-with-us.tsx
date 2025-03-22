import { Clock, Award, Star, Calendar } from "lucide-react"

export function WhyBookWithUs() {
  const benefits = [
    {
      icon: <Clock className="h-8 w-8 text-primary" />,
      title: "24/7 customer support",
      description: "Contact our help team anytime you need assistance with your booking",
    },
    {
      icon: <Award className="h-8 w-8 text-primary" />,
      title: "Earn rewards",
      description: "Collect Red Sea Quest points and get discounts on future bookings",
    },
    {
      icon: <Star className="h-8 w-8 text-primary" />,
      title: "Millions of reviews",
      description: "Read verified reviews from travelers who've experienced our tours",
    },
    {
      icon: <Calendar className="h-8 w-8 text-primary" />,
      title: "Plan your way",
      description: "Book tickets and tours with cancellation options for maximum flexibility",
    },
  ]

  return (
    <section className="bg-background py-12">
      <div className="container px-4 md:px-6">
        <h2 className="text-2xl font-bold text-center mb-8">Why book with Red Sea Quest?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="mb-4">{benefit.icon}</div>
              <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
              <p className="text-sm text-muted-foreground">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

