import { Check } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="pt-20">
      <section className="section-padding bg-background">
        <div className="container mx-auto container-padding">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Chatcura – About Us</h1>

            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-primary">Built to Talk. Designed to Work.</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Chatcura is an independent UK-based AI chatbot agency that helps small and growing businesses automate
                their customer support, lead capture, and website engagement — all without losing the human touch.
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                We're not here to overwhelm you with buzzwords or sell over-complicated tech. We believe in clear
                communication, clean design, and smart automation that actually makes your life easier.
              </p>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-4">Who We Help</h2>
              <p className="text-lg text-muted-foreground mb-6">
                From beauty salons to service providers, online stores to solo founders — we help time-strapped business
                owners turn their websites into 24/7 customer assistants.
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                Whether you need a simple FAQ bot, a booking assistant, or a branded AI that guides visitors toward
                action, we'll build it for you — and make sure it works.
              </p>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-4">Why Chatcura?</h2>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="h-6 w-6 text-primary mr-2 mt-1 flex-shrink-0" />
                  <span className="text-lg">No coding needed</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-6 w-6 text-primary mr-2 mt-1 flex-shrink-0" />
                  <span className="text-lg">Fully custom chatbot builds</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-6 w-6 text-primary mr-2 mt-1 flex-shrink-0" />
                  <span className="text-lg">Fast turnaround</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-6 w-6 text-primary mr-2 mt-1 flex-shrink-0" />
                  <span className="text-lg">Affordable and transparent pricing</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-6 w-6 text-primary mr-2 mt-1 flex-shrink-0" />
                  <span className="text-lg">Ongoing support and updates if you need them</span>
                </li>
              </ul>
              <p className="text-lg text-muted-foreground mt-6">
                We're building this to be the most accessible and helpful AI chatbot service for small businesses —
                without the bloated fees, the corporate attitude, or the DIY stress.
              </p>
            </div>

            <div className="bg-card border border-border rounded-xl p-8 mb-8">
              <h2 className="text-2xl font-bold mb-4">From the Founder</h2>
              <blockquote className="text-lg italic text-muted-foreground mb-4">
                "I started Chatcura because I saw too many small businesses being left behind by automation. This isn't
                about hype — it's about giving real people the same tools big companies use to save time and grow. And
                doing it simply."
              </blockquote>
              <p className="text-right font-medium">— Laurence Bigsby, Founder of Chatcura</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
