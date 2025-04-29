import { MessageSquare, Lightbulb, Code, Rocket } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const steps = [
  {
    icon: MessageSquare,
    title: "Consultation & Strategy Call",
    description:
      "We start with understanding your business. You tell us your goals, audience, and current challenges. We identify exactly where a chatbot can automate customer service, generate leads, or streamline operations. You'll get a simple, actionable AI plan — no tech jargon.",
    number: "01",
    color: "bg-purple-500/10",
    textColor: "text-purple-500",
  },
  {
    icon: Lightbulb,
    title: "Custom Chatbot Design",
    description:
      "Your bot should sound like you — not a robot. We design your chatbot's personality, questions, and response flows based on real conversations your business has every day. Whether you're in beauty, trades, fitness, or ecommerce, your AI bot will feel human, smart, and on-brand.",
    number: "02",
    color: "bg-pink-500/10",
    textColor: "text-pink-500",
  },
  {
    icon: Code,
    title: "AI Bot Development & Training",
    description:
      "We build and train your bot to perform. Using GPT-4, natural language flows, and no-code automation tools like Zapier, Notion, or Google Sheets — we train your chatbot on your content (FAQs, documents, workflows) so it answers with real knowledge.",
    number: "03",
    color: "bg-indigo-500/10",
    textColor: "text-indigo-500",
  },
  {
    icon: Rocket,
    title: "Launch, Integrate & Optimize",
    description:
      "We deploy your bot to your site, WhatsApp, or Messenger. We handle the technical side — embed the chatbot on your site or socials, connect automations, and provide ongoing support. You walk away with a fully working, revenue-ready AI assistant.",
    number: "04",
    color: "bg-cyan-500/10",
    textColor: "text-cyan-500",
  },
]

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="section-padding bg-card">
      <div className="container mx-auto container-padding">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="section-title">How Our AI Chatbot Systems Work — From Consultation to Launch</h2>
          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-muted-foreground mb-4">
              At ChatCura, we design, build, and launch custom AI chatbots for small businesses, e-commerce stores,
              local service providers, and personal brands.
            </p>
            <p className="text-lg text-muted-foreground mb-8">
              Our 4-step process is fast, simple, and fully tailored to your business — no coding, no confusion, just
              real automation that saves you time and drives results.
            </p>
          </div>
        </div>

        {/* Desktop Timeline */}
        <div className="hidden md:block relative mb-16">
          <div className="absolute left-0 right-0 top-1/2 h-1 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20 -translate-y-1/2 rounded-full" />

          <div className="grid grid-cols-4 gap-6 relative">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {/* Circle with number */}
                <div
                  className={`absolute left-1/2 -translate-x-1/2 -top-8 w-16 h-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg z-10 shadow-lg shadow-primary/20`}
                >
                  <span className="text-white">🟣</span>
                </div>

                {/* Card */}
                <div
                  className={`pt-14 pb-8 px-6 bg-background rounded-xl border border-border mt-8 text-center card-hover`}
                >
                  <div className="flex justify-center mb-4">
                    <step.icon className={`h-10 w-10 text-primary`} />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground text-sm">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Timeline */}
        <div className="md:hidden space-y-10 mb-12">
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

        {/* CTA Buttons */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 mt-8">
          <Link href="/try-a-bot">
            <Button size="lg" className="glow-on-hover px-8 py-6">
              Try Our Live Demos
            </Button>
          </Link>
          <Link href="/contact">
            <Button size="lg" variant="outline" className="px-8 py-6">
              Get Your AI Setup Plan
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default HowItWorksSection
