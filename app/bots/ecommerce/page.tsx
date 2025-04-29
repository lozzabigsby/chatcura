import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import EcommerceChatbotEmbed from "@/components/ecommerce-chatbot-embed"

export default function EcommerceBotPage() {
  return (
    <div className="pt-20">
      <section className="section-padding bg-background">
        <div className="container mx-auto container-padding">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="section-title">E-commerce AI Chatbot Demo</h1>
              <p className="text-lg text-muted-foreground mt-4 mb-8">
                This chatbot helps customers browse products, track orders, and get instant answers — all without
                lifting a finger.
              </p>
            </div>

            <div className="mb-12">
              <EcommerceChatbotEmbed />
            </div>

            <div className="text-center">
              <Link href="/pricing">
                <Button size="lg" className="glow-on-hover px-8 py-6 text-lg">
                  Want a bot like this? View Packages
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
