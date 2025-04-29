import { MessageSquare, Lightbulb } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

const steps = [
  {
    icon: MessageSquare,
    title: "Consultation",
    description: "We audit your needs, goals, and existing systems to create a tailored chatbot strategy.",
    number: "01",
  },
  {
    icon: Lightbulb,
    title: "Design",
    description: "Our team designs conversational UI/UX flows that feel natural and align with your brand.",
    number: "02",
  },
]

const HowItWorksPreview = () => {
  return (
    <section className="section-padding bg-card">
      <div className="container mx-auto container-padding">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="section-title">From Zero to AI in 4 Steps</h2>
          <p className="section-subtitle">Our proven process delivers custom chatbots in as little as two weeks.</p>
        </div>

        {/* Desktop Preview */}
        <div className="hidden md:block relative">
          <div className="absolute left-0 right-0 top-1/2 h-1 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20 -translate-y-1/2 rounded-full" />

          <div className="grid grid-cols-2 gap-6 relative max-w-4xl mx-auto">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {/* Circle with number */}
                <div className="absolute left-1/2 -translate-x-1/2 -top-8 w-16 h-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg z-10 shadow-lg shadow-primary/20">
                  {step.number}
                </div>

                {/* Card */}
                <div className="pt-14 pb-8 px-6 bg-background rounded-xl border border-border mt-8 text-center card-hover">
                  <div className="flex justify-center mb-4">
                    <step.icon className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Preview */}
        <div className="md:hidden space-y-10">
          {steps.map((step, index) => (
            <div key={index} className="relative pl-16 border-l-2 border-primary/30 pb-10 last:pb-0">
              <div className="absolute left-0 top-0 -translate-x-1/2 w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm shadow-lg shadow-primary/20">
                {step.number}
              </div>
              <div className="bg-background rounded-xl border border-border p-6 card-hover">
                <div className="flex items-center mb-4">
                  <step.icon className="h-6 w-6 text-primary mr-3" />
                  <h3 className="text-xl font-semibold">{step.title}</h3>
                </div>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/how-it-works">
            <Button variant="outline" className="group px-8 py-6 text-base">
              See Full Process
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default HowItWorksPreview
