import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function HealthcareBotPage() {
  return (
    <div className="pt-20">
      <section className="section-padding bg-background">
        <div className="container mx-auto container-padding">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="section-title">Healthcare AI Chatbot Demo</h1>
              <p className="text-lg text-muted-foreground mt-4 mb-8">
                This bot answers patient questions, schedules appointments, and provides care information — all while
                maintaining privacy and compliance.
              </p>
            </div>

            <div className="bg-card border border-border rounded-xl p-8 mb-12 min-h-[500px] flex items-center justify-center">
              <div className="text-center">
                <p className="text-muted-foreground mb-4">
                  Try asking about services, scheduling an appointment, or getting care information using the chatbot in
                  the bottom right corner!
                </p>
                <p className="text-sm text-muted-foreground">
                  The chatbot will help you experience how our healthcare bot works.
                </p>
              </div>
            </div>

            <div className="text-center">
              <Link href="/pricing">
                <Button size="lg" className="glow-on-hover px-8 py-6 text-lg">
                  Get This Bot
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
