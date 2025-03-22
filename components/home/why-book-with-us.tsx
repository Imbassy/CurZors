import { Clock, Award, CreditCard, ShieldCheck } from "lucide-react"

export function WhyBookWithUs() {
  const benefits = [
    {
      icon: <Clock className="h-8 w-8 text-primary" />,
      title: "24/7 customer support",
      description: "No matter the time zone, we're here to help",
    },
    {
      icon: <Award className="h-8 w-8 text-primary" />,
      title: "Earn rewards",
      description: "Explore, earn, redeem, and travel with our loyalty program",
    },
    {
      icon: <ShieldCheck className="h-8 w-8 text-primary" />,
      title: "Millions of reviews",
      description: "Plan your book with confidence using reviews from fellow travelers",
    },
    {
      icon: <CreditCard className="h-8 w-8 text-primary" />,
      title: "Plan your way",
      description: "Stay flexible with free cancellation and pay later options",
    },
  ]

  return (
    <section className="py-12 bg-white border-b">
      <div className="container px-4 md:px-6">
        <h2 className="text-2xl font-bold text-center mb-10">Why book with Red Sea Quest?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-primary/10 p-4">{benefit.icon}</div>
              <h3 className="font-bold text-lg mb-2">{benefit.title}</h3>
              <p className="text-sm text-muted-foreground">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

