"use client"

import { useEffect, useRef } from "react"

export default function HealthcareChatbotEmbed() {
  const chatContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Only proceed if the container exists
    if (!chatContainerRef.current) return

    // Create a container for the chatbot with specific styling
    const chatbotContainer = document.createElement("div")
    chatbotContainer.style.width = "100%"
    chatbotContainer.style.height = "500px"
    chatbotContainer.style.border = "none"
    chatbotContainer.style.borderRadius = "8px"
    chatbotContainer.style.overflow = "hidden"

    // Create an iframe to isolate the chatbot
    const iframe = document.createElement("iframe")
    iframe.style.width = "100%"
    iframe.style.height = "100%"
    iframe.style.border = "none"
    iframe.src = "https://www.chatbase.co/chatbot-iframe/FpJBLt8LzTNRn4n-iwZ6j"

    // Add the iframe to the container
    chatbotContainer.appendChild(iframe)

    // Clear the ref container and add our new container
    while (chatContainerRef.current.firstChild) {
      chatContainerRef.current.removeChild(chatContainerRef.current.firstChild)
    }
    chatContainerRef.current.appendChild(chatbotContainer)

    // No cleanup needed as we're not adding event listeners or timers
  }, [])

  return (
    <div ref={chatContainerRef} className="w-full h-[500px] rounded-lg bg-card border border-border">
      <div className="flex items-center justify-center h-full">
        <p className="text-muted-foreground">Loading healthcare chatbot...</p>
      </div>
    </div>
  )
}
