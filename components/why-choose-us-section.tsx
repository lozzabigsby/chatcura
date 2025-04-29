import { Check, ShieldCheck, Zap, BarChart } from "lucide-react"

const features = [
  {
    icon: Check,
    title: "No-Code Options",
    description: "Update and manage your chatbot without technical knowledge.",
  },
  {
    icon: ShieldCheck,
    title: "Enterprise Security",
    description: "GDPR, HIPAA, and SOC 2 compliant solutions for sensitive data.",
  },
  {
    icon: Zap,
    title: "2-Week Launch Guarantee",
    description: "Get your custom chatbot up and running in record time.",
  },
  {
    icon: BarChart,
    title: "Live Analytics Dashboard",
    description: "Track performance and optimize in real-time.",
  },
]

const WhyChooseUsSection = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container mx-auto container-padding">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="section-title">Built for Scale, Designed for Humans</h2>
          <p className="section-subtitle">What makes our chatbot solutions different from the rest.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex gap-6 items-start group hover:translate-x-1 transition-transform duration-300"
            >
              <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="h-7 w-7 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground text-base">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUsSection
