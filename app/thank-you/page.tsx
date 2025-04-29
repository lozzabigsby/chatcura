import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Mail } from "lucide-react"

export default function ThankYouPage() {
  return (
    <div className="pt-20">
      <section className="section-padding bg-background">
        <div className="container mx-auto container-padding">
          <div className="max-w-3xl mx-auto text-center">
            <div className="text-6xl mb-6">🎉</div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">You're In! Let's Build Your Bot.</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Thanks for joining ChatCura - your AI system is officially in motion.
            </p>
            <p className="text-lg mb-10">
              We've received your setup + subscription, and we'll now start preparing your chatbot build based on your
              selected plan.
            </p>

            <div className="bg-card border border-border rounded-xl p-8 mb-10 text-left">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <span className="mr-2">✅</span> What happens next:
              </h2>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-primary text-sm">1</span>
                  </div>
                  <span>Check your email for a confirmation + next steps</span>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-primary text-sm">2</span>
                  </div>
                  <span>Fill out the onboarding form below to tell us about your business and goals</span>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-primary text-sm">3</span>
                  </div>
                  <span>We'll start building your custom chatbot and keep you updated throughout the process</span>
                </li>
              </ul>
            </div>

            <div className="mb-10">
              <h2 className="text-2xl font-bold mb-4 flex items-center justify-center">
                <span className="mr-2">💬</span> Need anything? Have questions?
              </h2>
              <p className="text-muted-foreground mb-6">
                Reach out to us at{" "}
                <a href="mailto:hello@chatcura.com" className="text-primary hover:underline">
                  hello@chatcura.com
                </a>
              </p>
              <Link href="mailto:hello@chatcura.com">
                <Button className="px-6 py-2">
                  <Mail className="mr-2 h-4 w-4" />
                  Email Us
                </Button>
              </Link>
            </div>

            <p className="text-lg font-medium">Let's automate the boring stuff - and free you up to do what matters.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
