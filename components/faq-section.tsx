"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

const generalFaqs = [
  {
    question: "How much does a chatbot cost?",
    answer:
      "Our chatbots start at £199 with a small monthly fee for updates and support. Custom or advanced bots are quoted based on your needs. We also offer a one-time lifetime option for £1,500.",
  },
  {
    question: "Can I update the chatbot myself?",
    answer:
      "Yes! We provide a no-code dashboard for content updates, or we can handle it for you with our managed service plans.",
  },
  {
    question: "How long does it take to build a chatbot?",
    answer:
      "Our standard timeline is 2-4 weeks from kickoff to launch, depending on complexity. With our 2-Week Launch Guarantee, we can expedite simple implementations.",
  },
  {
    question: "Do you offer ongoing support?",
    answer:
      "Yes, all our plans include technical support. We also offer premium support packages with dedicated response times and regular optimization.",
  },
]

const technicalFaqs = [
  {
    question: "What languages do you support?",
    answer:
      "Our chatbots support 50+ languages with multi-language switching capabilities. We can train your bot to understand industry-specific terminology in any supported language.",
  },
  {
    question: "Do you work with sensitive data (HIPAA/GDPR)?",
    answer:
      "Yes—we offer on-premise deployment options and compliance audits for healthcare, financial, and other regulated industries. Our enterprise solutions are HIPAA, GDPR, and SOC 2 compliant.",
  },
  {
    question: "Can the chatbot integrate with our existing systems?",
    answer:
      "Absolutely. We integrate with CRMs, help desks, e-commerce platforms, and custom databases. Our API-first approach ensures compatibility with virtually any system.",
  },
  {
    question: "How do you measure chatbot performance?",
    answer:
      "Our analytics dashboard tracks key metrics like resolution rate, user satisfaction, conversation length, and handoff rates. We provide regular reports and optimization recommendations.",
  },
]

const FaqSection = () => {
  return (
    <section className="section-padding bg-card">
      <div className="container mx-auto container-padding">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="section-title">Your Questions, Answered</h2>
          <p className="section-subtitle">Everything you need to know about our chatbot solutions.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
          <div>
            <h3 className="text-2xl font-semibold mb-6">General</h3>
            <Accordion type="single" collapsible className="w-full">
              {generalFaqs.map((faq, index) => (
                <AccordionItem key={index} value={`general-item-${index}`} className="border-border">
                  <AccordionTrigger className="text-left text-lg py-4 hover:text-primary">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-base text-muted-foreground">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-6">Technical</h3>
            <Accordion type="single" collapsible className="w-full">
              {technicalFaqs.map((faq, index) => (
                <AccordionItem key={index} value={`technical-item-${index}`} className="border-border">
                  <AccordionTrigger className="text-left text-lg py-4 hover:text-primary">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-base text-muted-foreground">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>

        <div className="text-center mt-16">
          <p className="text-xl mb-4">Still curious?</p>
          <Link
            href="/contact"
            className="text-primary hover:text-primary/80 font-medium text-lg transition-colors inline-flex items-center group"
          >
            Talk to an Expert
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default FaqSection
