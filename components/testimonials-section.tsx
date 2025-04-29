"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"

const testimonials = [
  {
    quote: "Chatcura's bot handles 80% of our customer queries—saving us $50k/month.",
    author: "Sarah Johnson",
    position: "CTO, Fintech Startup",
  },
  {
    quote: "The AI chatbot increased our lead conversion rate by 35% in just two months.",
    author: "Michael Chen",
    position: "Marketing Director, SaaS Company",
  },
  {
    quote: "Our support team can now focus on complex issues while the bot handles routine questions.",
    author: "Emily Rodriguez",
    position: "Customer Success Manager, E-commerce",
  },
  {
    quote: "Implementation was seamless and the results were immediate. Best tech investment we've made.",
    author: "David Park",
    position: "COO, Healthcare Provider",
  },
]

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const nextTestimonial = () => {
    if (isAnimating) return

    setIsAnimating(true)
    setActiveIndex((prev) => (prev + 1) % testimonials.length)

    setTimeout(() => {
      setIsAnimating(false)
    }, 500)
  }

  const prevTestimonial = () => {
    if (isAnimating) return

    setIsAnimating(true)
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)

    setTimeout(() => {
      setIsAnimating(false)
    }, 500)
  }

  useEffect(() => {
    // Auto-rotate testimonials
    intervalRef.current = setInterval(() => {
      nextTestimonial()
    }, 8000)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [activeIndex, isAnimating])

  return (
    <section className="section-padding bg-card relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/10 to-transparent opacity-70" />

      <div className="container mx-auto container-padding relative z-10">
        <div className="text-center mb-12">
          <h2 className="section-title">Trusted by 500+ Brands</h2>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Testimonial */}
            <div className="bg-background border border-border rounded-2xl p-10 md:p-12 shadow-xl">
              <div className="flex justify-center mb-8">
                <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center">
                  <Quote className="h-8 w-8 text-primary" />
                </div>
              </div>

              <div className={`transition-opacity duration-500 ${isAnimating ? "opacity-0" : "opacity-100"}`}>
                <blockquote className="text-2xl md:text-3xl text-center font-medium mb-8 leading-relaxed">
                  "{testimonials[activeIndex].quote}"
                </blockquote>

                <div className="text-center">
                  <p className="font-semibold text-lg">{testimonials[activeIndex].author}</p>
                  <p className="text-muted-foreground">{testimonials[activeIndex].position}</p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-center mt-10 gap-4">
              <Button
                variant="outline"
                size="icon"
                onClick={prevTestimonial}
                disabled={isAnimating}
                className="h-12 w-12 rounded-full shadow-md"
              >
                <ChevronLeft className="h-6 w-6" />
                <span className="sr-only">Previous</span>
              </Button>

              <div className="flex items-center gap-3 px-4">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      if (isAnimating) return
                      setIsAnimating(true)
                      setActiveIndex(index)
                      setTimeout(() => setIsAnimating(false), 500)
                    }}
                    className={`h-3 rounded-full transition-all ${
                      activeIndex === index ? "w-10 bg-primary" : "w-3 bg-muted hover:bg-primary/50"
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              <Button
                variant="outline"
                size="icon"
                onClick={nextTestimonial}
                disabled={isAnimating}
                className="h-12 w-12 rounded-full shadow-md"
              >
                <ChevronRight className="h-6 w-6" />
                <span className="sr-only">Next</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection
