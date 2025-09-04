"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, Minimize2, Maximize2, RotateCcw } from "lucide-react"

interface BotConfig {
  name: string
  welcomeMessage: string
  fallbackMessage: string
  instructions?: string
  headerImage?: string | null
  colours: {
    userBubble: string
    botBubble: string
    userText: string
    botText: string
    widgetBackground: string
    chatBackground: string
  }
  trainingDataContentPreview?: string | null // Added to potentially influence bot response
}

interface Message {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

interface ChatbotPreviewProps {
  config: BotConfig
}

export default function ChatbotPreview({ config }: ChatbotPreviewProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isMinimized, setIsMinimized] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Initialize with welcome message
  useEffect(() => {
    if (config.welcomeMessage) {
      setMessages([
        {
          id: "welcome",
          text: config.welcomeMessage,
          sender: "bot",
          timestamp: new Date(),
        },
      ])
    }
  }, [config.welcomeMessage])

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputValue),
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botResponse])
    }, 1000)
  }

  const getBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase()

    // If instructions are provided, use them to guide responses
    if (config.instructions) {
      // Simple response logic that considers instructions
      if (input.includes("hello") || input.includes("hi")) {
        return config.instructions.includes("emoji") || config.instructions.includes("friendly")
          ? "Hello! 👋 How can I assist you today?"
          : "Hello! How can I assist you today?"
      } else if (input.includes("help")) {
        return config.instructions.includes("follow-up") || config.instructions.includes("question")
          ? "I'm here to help! What specific area do you need assistance with? Is it about our services, pricing, or something else?"
          : "I'm here to help! What do you need assistance with?"
      } else if (input.includes("price") || input.includes("cost")) {
        if (config.instructions.includes("consultation") || config.instructions.includes("free")) {
          return "Our pricing varies depending on your needs. I'd be happy to schedule a free consultation to discuss your specific requirements. Would that work for you?"
        }
        return "Our pricing varies depending on your needs. Would you like me to connect you with our sales team?"
      } else if (input.includes("hours") || input.includes("open")) {
        return config.instructions.includes("emoji")
          ? "We're available 24/7 through this chat! 🕐 Our office hours are Monday-Friday, 9 AM to 6 PM."
          : "We're available 24/7 through this chat. Our office hours are Monday-Friday, 9 AM to 6 PM."
      } else if (config.trainingDataContentPreview && input.includes("data")) {
        // Simulate response based on training data presence
        return `I have access to training data. Here's a snippet: "${config.trainingDataContentPreview.substring(0, 50)}..." How can I help you with this information?`
      } else {
        // Use fallback but consider instructions for tone
        if (config.instructions.includes("friendly") || config.instructions.includes("helpful")) {
          return "I'd be happy to help with that! Could you please provide a bit more detail about what you're looking for?"
        }
        return config.fallbackMessage || "I'm sorry, I didn't understand that. Could you please rephrase?"
      }
    }

    // Default responses when no instructions
    if (input.includes("hello") || input.includes("hi")) {
      return "Hello! How can I assist you today?"
    } else if (input.includes("help")) {
      return "I'm here to help! What do you need assistance with?"
    } else if (input.includes("price") || input.includes("cost")) {
      return "Our pricing varies depending on your needs. Would you like me to connect you with our sales team?"
    } else if (input.includes("hours") || input.includes("open")) {
      return "We're available 24/7 through this chat. Our office hours are Monday-Friday, 9 AM to 6 PM."
    } else if (config.trainingDataContentPreview && input.includes("data")) {
      return `I have access to training data. Here's a snippet: "${config.trainingDataContentPreview.substring(0, 50)}..."`
    } else {
      return config.fallbackMessage || "I'm sorry, I didn't understand that. Could you please rephrase?"
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const resetChat = () => {
    setMessages([
      {
        id: "welcome",
        text: config.welcomeMessage,
        sender: "bot",
        timestamp: new Date(),
      },
    ])
  }

  return (
    <div
      className="rounded-2xl overflow-hidden shadow-2xl border border-gray-800"
      style={{ backgroundColor: config.colours.widgetBackground }}
    >
      {/* Modern Header */}
      <div className="px-4 py-3 border-b border-gray-800" style={{ backgroundColor: config.colours.widgetBackground }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {config.headerImage ? (
              <img
                src={config.headerImage || "/placeholder.svg"}
                alt="Bot"
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  {config.name
                    ?.split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase() || "CB"}
                </span>
              </div>
            )}
            <div>
              <h4 className="font-semibold text-sm" style={{ color: config.colours.botText }}>
                {config.name || "Chatbot"}
              </h4>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-xs text-gray-400">Online</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={resetChat}
              className="text-gray-400 hover:text-white hover:bg-gray-800 h-8 w-8 p-0"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMinimized(!isMinimized)}
              className="text-gray-400 hover:text-white hover:bg-gray-800 h-8 w-8 p-0"
            >
              {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      {!isMinimized && (
        <>
          <div
            className="h-96 overflow-y-auto p-4 space-y-4"
            style={{ backgroundColor: config.colours.chatBackground }}
          >
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div className="max-w-[85%]">
                  {message.sender === "bot" && (
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                        <span className="text-white text-xs font-medium">
                          {config.name
                            ?.split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase() || "CB"}
                        </span>
                      </div>
                      <span className="text-xs text-gray-400 font-medium">{config.name || "Chatbot"}</span>
                    </div>
                  )}
                  <div
                    className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                      message.sender === "user" ? "rounded-br-md ml-8" : "rounded-bl-md"
                    }`}
                    style={{
                      backgroundColor: message.sender === "user" ? config.colours.userBubble : config.colours.botBubble,
                      color: message.sender === "user" ? config.colours.userText : config.colours.botText,
                    }}
                  >
                    {message.text}
                  </div>
                  <div className="text-xs mt-1 px-1" style={{ color: config.colours.botText, opacity: 0.7 }}>
                    {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Modern Input Area */}
          <div className="p-4 border-t border-gray-800" style={{ backgroundColor: config.colours.widgetBackground }}>
            <div className="flex gap-3 items-end">
              <div className="flex-1 relative">
                <Input
                  placeholder="Enter message here..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="border border-gray-300 rounded-xl px-4 py-3 pr-12 focus:border-primary focus:ring-1 focus:ring-primary resize-none min-h-[44px]"
                  style={{
                    backgroundColor: config.colours.widgetBackground,
                    color: config.colours.botText,
                  }}
                />
              </div>
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl h-11 w-11 p-0 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Modern Branding Footer */}
          <div
            className="px-4 py-2 border-t border-gray-800"
            style={{ backgroundColor: config.colours.widgetBackground }}
          >
            <div className="flex items-center justify-center">
              <p className="text-xs" style={{ color: config.colours.botText, opacity: 0.7 }}>
                Powered by{" "}
                <a
                  href="https://chatcura.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
                >
                  Chatcura.com
                </a>
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
