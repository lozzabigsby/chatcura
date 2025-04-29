import { Brain, Workflow, PenToolIcon as Tool, RefreshCw } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const services = [
  {
    icon: Brain,
    title: "AI Chatbot Creation",
    description:
      "We design and build GPT-powered chatbots trained on your content, FAQs, and tone of voice. These bots work 24/7 on your website, WhatsApp, Messenger, or wherever your customers are.",
  },
  {
    icon: Workflow,
    title: "Workflow Automation",
    description:
      "We connect your chatbot to forms, CRMs, emails, calendars, Google Sheets, and more - so leads, bookings, and tasks happen automatically while you focus on real work.",
  },
  {
    icon: Tool,
    title: "Custom AI Tools & Internal Assistants",
    description:
      "Need something more specific? We build internal AI tools for quoting, onboarding, customer support, and digital product delivery - tailored to how you work.",
  },
  {
    icon: RefreshCw,
    title: "Ongoing Support & Optimization",
    description:
      "Don't want to manage it all yourself? Our monthly plans keep your system sharp with prompt updates, new features, and priority support whenever you need it.",
  },
]

const ServicesSection = () => {
  return (
    <section id="services" className="section-padding bg-background">
      <div className="container mx-auto container-padding">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="section-title">What We Do</h2>
          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-muted-foreground mb-4">
              We build custom AI chatbot systems and smart automations designed to save you time, generate leads, and
              make your business run smoother - all without needing to touch a single line of code.
            </p>
            <p className="text-lg text-muted-foreground mb-8">
              Whether you're in e-commerce, trades, salons, coaching, or just tired of repeating the same tasks - we've
              got you covered.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <Card key={index} className="bg-card border border-border card-hover">
              <CardHeader>
                <div className="h-14 w-14 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <service.icon className="h-7 w-7 text-primary" />
                </div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground text-base">{service.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-xl font-medium mb-6">💬 Don't just automate your business. Evolve it.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/pricing">
              <Button variant="default" className="px-8 py-6">
                View Pricing
              </Button>
            </Link>
            <Link href="/try-a-bot">
              <Button variant="outline" className="px-8 py-6">
                Try a Demo
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ServicesSection
