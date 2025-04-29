import { Brain, Workflow } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

const services = [
  {
    icon: Brain,
    title: "AI Chatbot Creation",
    description: "We design and build GPT-powered chatbots trained on your content, FAQs, and tone of voice.",
  },
  {
    icon: Workflow,
    title: "Workflow Automation",
    description: "We connect your chatbot to forms, CRMs, emails, calendars, and more for seamless automation.",
  },
]

const ServicesPreview = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container mx-auto container-padding">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="section-title">End-to-End Chatbot Expertise</h2>
          <p className="section-subtitle">
            Everything you need to build, deploy, and optimize AI chatbots that deliver results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
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
          <Link href="/services">
            <Button variant="outline" className="group px-8 py-6 text-base">
              View All Services
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default ServicesPreview
