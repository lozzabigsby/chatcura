"use client"

import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import Link from "next/link"
import { useEffect, useState, useRef } from "react"

// Chat messages for the bubbles
const chatMessages = [
  { text: "Hi, how can I help you today?", type: "bot", color: "bg-purple-500" },
  { text: "I'd like to book an appointment", type: "user", color: "bg-blue-500" },
  { text: "How much does a manicure cost?", type: "user", color: "bg-indigo-500" },
  { text: "Our basic manicure is £25", type: "bot", color: "bg-pink-500" },
  { text: "What are your opening hours?", type: "user", color: "bg-cyan-500" },
  { text: "We're open 9am-7pm weekdays", type: "bot", color: "bg-violet-500" },
  { text: "Do you offer refunds?", type: "user", color: "bg-emerald-500" },
  { text: "Yes, within 30 days of purchase", type: "bot", color: "bg-rose-500" },
  { text: "Can you help track my order?", type: "user", color: "bg-blue-500" },
  { text: "Please provide your order number", type: "bot", color: "bg-purple-500" },
]

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const bubblesRef = useRef<any[]>([])
  const [, forceUpdate] = useState({})
  const animationFrameRef = useRef<number>()
  const initialized = useRef(false)

  // Initialize bubbles with random positions and velocities
  useEffect(() => {
    if (!containerRef.current || initialized.current) return

    initialized.current = true

    const containerWidth = containerRef.current.clientWidth
    const containerHeight = containerRef.current.clientHeight

    bubblesRef.current = chatMessages.map((message, index) => {
      // Calculate bubble width based on text length
      const width = message.text.length > 25 ? 250 : 200
      const height = 60 // approximate height

      return {
        id: index,
        message,
        x: Math.random() * (containerWidth - width),
        y: Math.random() * (containerHeight - height),
        // Further reduced speed
        vx: (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 0.8 + 0.8), // 0.8-1.6 px per frame
        vy: (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 0.8 + 0.8), // 0.8-1.6 px per frame
        width,
        height,
        element: null,
      }
    })

    forceUpdate({})

    // Start animation after initialization
    startAnimation()
  }, [])

  // Animation function using DOM manipulation for better performance
  const startAnimation = () => {
    if (!containerRef.current) return

    const containerWidth = containerRef.current.clientWidth
    const containerHeight = containerRef.current.clientHeight

    const updateBubblePositions = () => {
      let needsUpdate = false

      bubblesRef.current.forEach((bubble) => {
        if (!bubble.element) return

        let newX = bubble.x + bubble.vx
        let newY = bubble.y + bubble.vy
        let newVx = bubble.vx
        let newVy = bubble.vy

        // Bounce off edges
        if (newX <= 0 || newX + bubble.width >= containerWidth) {
          newVx = -newVx
          newX = newX <= 0 ? 0 : containerWidth - bubble.width
          needsUpdate = true
        }

        if (newY <= 0 || newY + bubble.height >= containerHeight) {
          newVy = -newVy
          newY = newY <= 0 ? 0 : containerHeight - bubble.height
          needsUpdate = true
        }

        // Update position directly in the DOM for better performance
        bubble.element.style.transform = `translate(${newX}px, ${newY}px)`

        // Update bubble data
        bubble.x = newX
        bubble.y = newY
        bubble.vx = newVx
        bubble.vy = newVy
      })

      // Only force React update when directions change
      if (needsUpdate) {
        forceUpdate({})
      }

      animationFrameRef.current = requestAnimationFrame(updateBubblePositions)
    }

    animationFrameRef.current = requestAnimationFrame(updateBubblePositions)
  }

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current) return

      const containerWidth = containerRef.current.clientWidth
      const containerHeight = containerRef.current.clientHeight

      bubblesRef.current = bubblesRef.current.map((bubble) => {
        // Keep bubbles within new container dimensions
        const newX = Math.min(bubble.x, containerWidth - bubble.width)
        const newY = Math.min(bubble.y, containerHeight - bubble.height)

        return {
          ...bubble,
          x: newX,
          y: newY,
        }
      })

      forceUpdate({})
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Cleanup animation on unmount
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Chat Bubbles Background */}
      <div ref={containerRef} className="absolute inset-0 z-0 overflow-hidden">
        {bubblesRef.current.map((bubble) => (
          <div
            key={bubble.id}
            ref={(el) => (bubble.element = el)}
            className="absolute"
            style={{
              transform: `translate(${bubble.x}px, ${bubble.y}px)`,
              width: `${bubble.width}px`,
            }}
          >
            <div
              className={`
                ${bubble.message.color} 
                ${
                  bubble.message.type === "user"
                    ? "rounded-tl-2xl rounded-bl-2xl rounded-br-2xl ml-auto"
                    : "rounded-tr-2xl rounded-br-2xl rounded-bl-2xl"
                } 
                p-3 px-4 
                text-white 
                shadow-lg 
                inline-block
                opacity-80
              `}
            >
              <p className="text-sm font-medium whitespace-normal">{bubble.message.text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/70 to-background z-10" />

      {/* Content */}
      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-20">
        <div className="max-w-3xl mx-auto md:mx-0 animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight">
            <span className="gradient-text">Conversations</span> That Convert
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl animate-fade-in-delay-1">
            We design, build, and train AI chatbots that feel human—so you can automate support, sales, and engagement
            without losing the personal touch.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-delay-2">
            <Link href="/try-a-bot">
              <Button size="lg" className="glow-on-hover animate-pulse-glow text-base px-8 py-6">
                🤖 Try Our AI Bot Now
              </Button>
            </Link>
            <Link href="/how-it-works">
              <Button size="lg" variant="outline" className="group text-base px-8 py-6">
                How It Works
                <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
