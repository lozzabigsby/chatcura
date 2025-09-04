import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

const pricingPlans = [
  {
    name: "🚀 Launch",
    description: "Perfect for small businesses just starting with automation",
    setupPrice: "£249.99",
    monthlyPrice: "£29.99",
    features: [
      "1 chatbot",
      "Up to 10 FAQ replies",
      "Basic branding",
      "Email notifications",
      "Ongoing hosting and basic maintenance",
    ],
    brandingStatus: "on",
    cta: "Get Started",
    ctaLink: "https://buy.stripe.com/test_28ocOSabQ0gh7eMaEE",
    popular: false,
  },
  {
    name: "📈 Scale",
    description: "For businesses that want a more powerful setup",
    setupPrice: "£499.99",
    monthlyPrice: "£49.99",
    features: [
      "Up to 3 bots",
      "Calendar/forms/CRM integration",
      "Monthly optimisations",
      "Branded styling",
      "Priority support",
    ],
    brandingStatus: "off",
    cta: "Time to Scale",
    ctaLink: "https://buy.stripe.com/test_5kAaGKbfU7IJ9mU7st",
    popular: true,
  },
  {
    name: "🔧 Custom Build",
    description: "For ecommerce, complex logic, multi-language, etc.",
    features: [
      "Advanced integrations",
      "Custom development",
      "Multi-language support",
      "Dedicated account manager",
      "Custom analytics dashboard",
    ],
    brandingStatus: "off",
    cta: "Contact Us",
    ctaLink: "/contact",
    popular: false,
  },
]

export default function PricingPage() {
  return (
    <div className="pt-20">
      <section className="section-padding bg-background">
        <div className="container mx-auto container-padding">
          <div className="text-center mb-16">
            <h1 className="section-title">Simple, Transparent Pricing</h1>
            <p className="section-subtitle">
              Choose the plan that's right for your business. All plans include ongoing support and updates.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <Card
                key={index}
                className={`relative overflow-hidden border-border ${
                  plan.popular ? "border-primary shadow-lg shadow-primary/20" : "border"
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0">
                    <div className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-bl-lg">
                      Most Popular
                    </div>
                  </div>
                )}

                <CardHeader>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription className="text-muted-foreground">{plan.description}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  {plan.setupPrice && (
                    <div>
                      <div className="flex items-baseline">
                        <span className="text-3xl font-bold">{plan.setupPrice}</span>
                        <span className="text-muted-foreground ml-1">setup</span>
                      </div>
                      <div className="flex items-baseline mt-1">
                        <span className="text-xl font-semibold">+</span>
                        <span className="text-2xl font-bold ml-2">{plan.monthlyPrice}</span>
                        <span className="text-muted-foreground ml-1">/month</span>
                      </div>
                    </div>
                  )}

                  <div className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <div key={i} className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 text-primary">
                          <Check className="h-5 w-5" />
                        </div>
                        <p className="ml-3 text-muted-foreground">{feature}</p>
                      </div>
                    ))}
                  </div>

                  {/* Branding Status */}
                  <div className="pt-4 border-t border-border/50">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Branding:</span>
                      <Badge
                        variant={plan.brandingStatus === "on" ? "secondary" : "default"}
                        className={
                          plan.brandingStatus === "on"
                            ? "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
                            : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                        }
                      >
                        {plan.brandingStatus === "on" ? "🔖 Branding On" : "🟣 No Branding"}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {plan.brandingStatus === "on" ? "ChatCura branding displayed" : "Full white-label solution"}
                    </p>
                  </div>
                </CardContent>

                <CardFooter>
                  <Link href={plan.ctaLink} className="w-full">
                    <Button
                      className={`w-full ${plan.popular ? "glow-on-hover animate-pulse-glow" : ""}`}
                      variant={plan.popular ? "default" : "outline"}
                    >
                      {plan.cta}
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="mt-16 max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Need Something Custom?</h2>
            <p className="text-muted-foreground mb-6">
              We understand that every business has unique needs. Contact us for a custom solution tailored to your
              specific requirements.
            </p>
            <Link href="/contact">
              <Button size="lg" className="px-8 py-6">
                Book a Consultation
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
