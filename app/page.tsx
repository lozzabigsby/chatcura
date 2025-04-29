import HeroSection from "@/components/hero-section"
import ServicesPreview from "@/components/services-preview"
import HowItWorksPreview from "@/components/how-it-works-preview"
import WhyChooseUsSection from "@/components/why-choose-us-section"
import CtaSection from "@/components/cta-section"

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <HeroSection />
      <ServicesPreview />
      <HowItWorksPreview />
      <WhyChooseUsSection />
      <CtaSection />
    </div>
  )
}
