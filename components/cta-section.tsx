import { Button } from "@/components/ui/button"
import Link from "next/link"

const CtaSection = () => {
  return (
    <section className="section-padding bg-background relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-500/20 opacity-70" />

      <div className="container mx-auto container-padding relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
            Ready to Automate—Without Losing the Human Touch?
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground mb-10">
            Let's build your AI chatbot in 14 days or less.
          </p>
          <Link href="/pricing">
            <Button size="lg" className="glow-on-hover animate-pulse-glow px-10 py-7 text-lg">
              Start Free Trial
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default CtaSection
