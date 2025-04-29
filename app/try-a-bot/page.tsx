import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

const botCards = [
  {
    emoji: "🛒",
    title: "E-commerce",
    description: "Help customers browse products, track orders, and get instant support 24/7.",
    buttonText: "Try E-commerce Bot",
    link: "/bots/ecommerce",
  },
  {
    emoji: "💇",
    title: "Beauty Salon",
    description: "Book appointments, cancel bookings, and answer FAQs automatically.",
    buttonText: "Try Salon Bot",
    link: "/bots/salon",
  },
  {
    emoji: "🏥",
    title: "Healthcare",
    description: "Answer patient questions, schedule appointments, and provide care information.",
    buttonText: "Try Healthcare Bot",
    link: "/bots/healthcare",
  },
  {
    emoji: "🛠️",
    title: "Trades",
    description: "For plumbers, electricians, and more — automate quotes and job requests.",
    buttonText: "Try Trades Bot",
    link: "/bots/trades",
  },
]

export default function TryABotPage() {
  return (
    <div className="pt-20">
      <section className="section-padding bg-background">
        <div className="container mx-auto container-padding">
          <div className="text-center mb-12 md:mb-16">
            <h1 className="section-title">Try Our AI Bot – Built for Your Industry</h1>
            <p className="section-subtitle">Pick a business type below and try a real chatbot in action.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {botCards.map((card, index) => (
              <Card key={index} className="bg-card border border-border overflow-hidden card-hover flex flex-col">
                <CardHeader>
                  <div className="text-4xl mb-4">{card.emoji}</div>
                  <CardTitle className="text-2xl">{card.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <CardDescription className="text-muted-foreground text-base">{card.description}</CardDescription>
                </CardContent>
                <CardFooter>
                  <Link href={card.link} className="w-full">
                    <Button className="w-full group" variant="outline">
                      {card.buttonText}
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
