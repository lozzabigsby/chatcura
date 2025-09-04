"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Bot,
  Plus,
  Search,
  Moon,
  Sun,
  User,
  Settings,
  FileText,
  Palette,
  Code,
  Save,
  Eye,
  CopySlash as Publish,
  Copy,
  Check,
  Upload,
  Trash2,
  AlertTriangle,
  Menu,
  X,
  Info,
  Brain,
  MessageSquare,
  MapPin,
  CreditCard,
  ExternalLink,
  Crown,
  Calendar,
  Package,
  Shield,
  BarChart3,
  Zap,
  Sparkles,
  Trash,
  RotateCcw,
} from "lucide-react"

interface BotData {
  id: string
  name: string
  publicSite?: string
  welcomeMessage: string
  systemPrompt: string
  persona: string
  tone: string
  knowledgeSource: "upload" | "text" | "url"
  knowledgeContent: string
  safetySettings: {
    refusalStyle: boolean
    guardedTopics: boolean
    maxAnswerLength: number
  }
  llmControls: {
    temperature: number
    maxTokens: number
    topP: number
    frequencyPenalty: number
    presencePenalty: number
    stopSequences: string
  }
  behavior: {
    responseLength: "concise" | "normal" | "detailed"
    formatPreference: "bullets" | "paragraphs" | "steps"
    whenUnsure: "clarify" | "admit" | "escalate"
    escalationMessage: string
    emoji: "never" | "sparingly" | "allowed"
    bookingIntents: string[]
    orderIntents: string[]
  }
  appearance: {
    backgroundColor: string
    primaryColor: string
    fontSize: "sm" | "md" | "lg"
    chatAvatar: string
    botName: string
    userBubbleColor: string
    userTextColor: string
    botBubbleColor: string
    botTextColor: string
    cornerRadius: number
    messageSpacing: "compact" | "cozy" | "roomy"
    fontStack: "default" | "large" | "xl"
    showTypingIndicator: boolean
    showLauncher: boolean
  }
  branding: {
    showBranding: boolean
    brandingText: string
    brandingUrl: string
  }
  position: {
    corner: "top-left" | "top-right" | "bottom-left" | "bottom-right"
    offsetX: number
    offsetY: number
    zIndex: number
    mobileOverride: boolean
    mobileCorner: "top-left" | "top-right" | "bottom-left" | "bottom-right"
    mobileOffsetX: number
    mobileOffsetY: number
  }
  integrations: {
    booking: {
      platform: "booksy" | "fresha" | "timely" | "other"
      bookingUrl: string
      widgetScript: string
      openMode: "modal" | "tab"
      prefillName: string
      prefillEmail: string
      prefillService: string
    }
    orders: {
      platform: "shopify" | "woocommerce" | "etsy" | "custom"
      ordersEndpoint: string
      trackingEndpoint: string
      requireIdentity: boolean
      useAfterShip: boolean
    }
  }
  snippets: Array<{
    id: string
    title: string
    content: string
  }>
  privacy: {
    gdprMode: boolean
  }
  localization: {
    language: "auto" | "en" | "fr" | "es" | "de" | "it" | "pt" | "pl"
    locale: string
  }
  accessibility: {
    reducedMotion: boolean
  }
  analytics: {
    enabled: boolean
  }
  handoff: {
    email: string
    whatsapp: string
    phone: string
    calendlyUrl: string
  }
  settings: {
    status: "draft" | "live"
    visibility: "public" | "private"
    dataRetention: boolean
    plan: "launch" | "scale" | "custom"
  }
  createdDate: string
  lastUpdated: string
}

export default function AdminBotsPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loginError, setLoginError] = useState("")
  const [darkMode, setDarkMode] = useState(true)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [activeView, setActiveView] = useState("overview")
  const [selectedBotId, setSelectedBotId] = useState<string | null>(null)
  const [bots, setBots] = useState<BotData[]>([])
  const [currentBot, setCurrentBot] = useState<BotData | null>(null)
  const [embedCode, setEmbedCode] = useState("")
  const [copySuccess, setCopySuccess] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [showOrderForm, setShowOrderForm] = useState(false)
  const [orderFormData, setOrderFormData] = useState({ orderId: "", email: "" })
  const [themePresets] = useState({
    dark: {
      backgroundColor: "#0b0b0f",
      primaryColor: "#8b5cf6",
      userBubbleColor: "#3b82f6",
      userTextColor: "#ffffff",
      botBubbleColor: "#22252b",
      botTextColor: "#ffffff",
      cornerRadius: 16,
    },
    minimal: {
      backgroundColor: "#ffffff",
      primaryColor: "#000000",
      userBubbleColor: "#f3f4f6",
      userTextColor: "#111827",
      botBubbleColor: "#f9fafb",
      botTextColor: "#374151",
      cornerRadius: 8,
    },
    highContrast: {
      backgroundColor: "#000000",
      primaryColor: "#ffffff",
      userBubbleColor: "#ffffff",
      userTextColor: "#000000",
      botBubbleColor: "#1f2937",
      botTextColor: "#ffffff",
      cornerRadius: 4,
    },
  })
  const [previousTheme, setPreviousTheme] = useState<any>(null)
  const { toast } = useToast()

  // Utility functions for position and direction classes
  const setDirectionClasses = (corner: string, element: HTMLElement) => {
    element.classList.remove("cc-pos-right", "cc-pos-left", "cc-pos-top", "cc-pos-bottom")
    if (corner.includes("right")) element.classList.add("cc-pos-right")
    if (corner.includes("left")) element.classList.add("cc-pos-left")
    if (corner.includes("top")) element.classList.add("cc-pos-top")
    if (corner.includes("bottom")) element.classList.add("cc-pos-bottom")
  }

  const applyPosition = (
    config: {
      corner: string
      offX: number
      offY: number
      z: number
      mobileOverride?: boolean
      mCorner?: string
      mX?: number
      mY?: number
    },
    element: HTMLElement,
  ) => {
    const root = element.closest(".preview-container") as HTMLElement
    if (!root) return

    root.style.setProperty("--cc-off-x", `${config.offX}px`)
    root.style.setProperty("--cc-off-y", `${config.offY}px`)
    root.style.setProperty("--cc-z", config.z.toString())

    element.classList.remove("cc-pos-top-left", "cc-pos-top-right", "cc-pos-bottom-left", "cc-pos-bottom-right")
    element.classList.add(`cc-pos-${config.corner}`)

    if (config.mobileOverride && config.mCorner && config.mX !== undefined && config.mY !== undefined) {
      root.style.setProperty("--cc-m-off-x", `${config.mX}px`)
      root.style.setProperty("--cc-m-off-y", `${config.mY}px`)
      element.classList.add("cc-use-mobile")
    } else {
      element.classList.remove("cc-use-mobile")
    }

    setDirectionClasses(config.corner, element)
  }

  const appendUTMParams = (url: string, params: {
    botId?: string
    plan?: string
    position?: string
    source?: string
    medium?: string
    campaign?: string
  }) => {
    const urlObj = new URL(url)
    urlObj.searchParams.set("utm_source", params.source || "widget")
    urlObj.searchParams.set("utm_medium", params.medium || "link")
    urlObj.searchParams.set("utm_campaign", params.campaign || "chatbot")
    if (params.botId) urlObj.searchParams.set("bot_id", params.botId)
    if (params.plan) urlObj.searchParams.set("plan", params.plan)
    if (params.position) urlObj.searchParams.set("pos", params.position)
    return urlObj.toString()
  }

  const setBrandingLinkHref = (config: {
    baseUrl?: string
    botId?: string
    plan?: string
    position?: string
  }) => {
    return appendUTMParams(config.baseUrl || "https://chatcura.com", {
      botId: config.botId,
      plan: config.plan,
      position: config.position,
      source: "widget",
      medium: "brandlink",
      campaign: "branding",
    })
  }

  // Check authentication on mount
  useEffect(() => {
    const authStatus = localStorage.getItem("chatcura_admin_auth")
    if (authStatus === "true") {
      setIsAuthenticated(true)
      loadBots()
    }
  }, [])

  // Apply dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  // Calculate contrast ratio
  const getContrastRatio = (color1: string, color2: string): number => {
    const getLuminance = (color: string): number => {
      const hex = color.replace("#", "")
      const r = Number.parseInt(hex.substr(0, 2), 16) / 255
      const g = Number.parseInt(hex.substr(2, 2), 16) / 255
      const b = Number.parseInt(hex.substr(4, 2), 16) / 255

      const sRGB = [r, g, b].map((c) => {
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
      })

      return 0.2126 * sRGB[0] + 0.7152 * sRGB[1] + 0.0722 * sRGB[2]
    }

    const lum1 = getLuminance(color1)
    const lum2 = getLuminance(color2)
    const brightest = Math.max(lum1, lum2)
    const darkest = Math.min(lum1, lum2)

    return (brightest + 0.05) / (darkest + 0.05)
  }

  // Generate bot response based on behavior settings
  const generateBotResponse = (question: string, bot: BotData): string => {
    const { responseLength, formatPreference, whenUnsure, emoji, bookingIntents, orderIntents } = bot.behavior

    let baseResponse = ""

    // Check for booking intents
    const isBookingIntent = bookingIntents.some(intent => 
      question.toLowerCase().includes(intent.toLowerCase())
    )

    // Check for order intents
    const isOrderIntent = orderIntents.some(intent => 
      question.toLowerCase().includes(intent.toLowerCase())
    )

    if (isBookingIntent) {
      baseResponse = "I can help you book an appointment! Let me open our booking system for you."
      if (emoji === "allowed") baseResponse += " 📅"
      return baseResponse
    }

    if (isOrderIntent) {
      baseResponse = "I can help you track your order! Please provide your order number and email address."
      if (emoji === "allowed") baseResponse += " 📦"
      return baseResponse
    }

    if (question.toLowerCase().includes("install") || question.toLowerCase().includes("widget")) {
      switch (responseLength) {
        case "concise":
          baseResponse = "Copy the embed code and paste it before </body> in your HTML."
          break
        case "normal":
          baseResponse =
            "To install the widget, copy the embed code from the Embed & Install section and paste it into your website's HTML just before the closing </body> tag. The widget will appear automatically."
          break
        case "detailed":
          baseResponse =
            "Installing the ChatCura widget is straightforward. First, navigate to the Embed & Install section in your dashboard. Copy the provided embed code, which includes all your customization settings. Then, open your website's HTML file and locate the closing </body> tag. Paste the embed code just before this tag. Save your file and refresh your website - the chat widget will now appear in the bottom-right corner, ready to assist your visitors."
          break
      }

      // Apply format preference
      switch (formatPreference) {
        case "bullets":
          if (responseLength === "detailed") {
            baseResponse =
              "Installing the ChatCura widget:\n• Navigate to Embed & Install section\n• Copy the provided embed code\n• Open your website's HTML file\n• Paste code before </body> tag\n• Save and refresh your website"
          } else if (responseLength === "normal") {
            baseResponse =
              "To install:\n• Copy embed code from dashboard\n• Paste before </body> tag\n• Widget appears automatically"
          }
          break
        case "steps":
          if (responseLength === "detailed") {
            baseResponse =
              "Step 1: Navigate to the Embed & Install section in your dashboard.\nStep 2: Copy the provided embed code with your settings.\nStep 3: Open your website's HTML file.\nStep 4: Locate the closing </body> tag.\nStep 5: Paste the code just before this tag.\nStep 6: Save your file and refresh your website."
          } else if (responseLength === "normal") {
            baseResponse =
              "Step 1: Copy embed code from dashboard\nStep 2: Paste before </body> tag\nStep 3: Widget appears on your site"
          }
          break
      }

      // Add emoji if allowed
      if (emoji === "allowed") {
        baseResponse = baseResponse.replace("widget", "widget 🤖").replace("ready", "ready ✨")
      } else if (emoji === "sparingly") {
        baseResponse += " 👍"
      }

      // Handle uncertainty (simulate low confidence scenario occasionally)
      if (Math.random() < 0.3) {
        // 30% chance to trigger uncertainty
        switch (whenUnsure) {
          case "clarify":
            baseResponse +=
              "\n\nJust to clarify - are you looking to install this on a specific platform like WordPress, or a custom HTML site?"
            break
          case "admit":
            baseResponse +=
              "\n\nI don't have specific details about your setup. Here are 3 next steps: 1) Check our documentation, 2) Test on a staging site first, 3) Contact support if you encounter issues."
            break
          case "escalate":
            baseResponse += `\n\n${bot.behavior.escalationMessage || "Let me connect you with a human agent who can provide more specific guidance."}`
            break
        }
      }
    } else {
      // Default response for other questions
      baseResponse =
        responseLength === "concise"
          ? "I can help with that!"
          : responseLength === "normal"
            ? "I'd be happy to help you with that question."
            : "I'd be delighted to assist you with that question. Let me provide you with a comprehensive answer."

      if (emoji === "allowed") {
        baseResponse += " 😊"
      }
    }

    return baseResponse
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError("")

    if (email === "admin@chatcura.com" && password === "Cur@2025!") {
      localStorage.setItem("chatcura_admin_auth", "true")
      setIsAuthenticated(true)
      loadBots()
      toast({
        title: "Login successful",
        description: "Welcome to ChatCura Bot Builder",
      })
    } else {
      setLoginError("Invalid credentials")
      toast({
        title: "Login failed",
        description: "Please check your credentials and try again",
        variant: "destructive",
      })
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("chatcura_admin_auth")
    setIsAuthenticated(false)
    setEmail("")
    setPassword("")
    setBots([])
    setCurrentBot(null)
    setSelectedBotId(null)
    setActiveView("overview")
  }

  const loadBots = () => {
    const savedBots = localStorage.getItem("chatcura_admin_bots")
    if (savedBots) {
      setBots(JSON.parse(savedBots))
    } else {
      // Initialize with sample bot using new defaults
      const sampleBot: BotData = {
        id: "sample_bot_001",
        name: "Customer Support Bot",
        publicSite: "https://chatcura.com",
        welcomeMessage: "Hi! I'm your ChatCura assistant. How can I help?",
        systemPrompt: `You are {{bot_name}}, the ChatCura assistant for {{brand}}.
Follow the STYLE and SAFETY below strictly.

STYLE
- Tone: {{tone}}.
- Length: {{style_length}}. Format: {{style_format}}.
- Emoji policy: {{emoji_policy}} (never use if "never").
- Keep answers directly useful; avoid fluff.

UNCERTAINTY
If confidence is low or sources are weak, follow "{{when_unsure}}":
- clarify → ask one focused question; 
- admit → say you don't know and give 3 next steps; 
- escalate → use this message: {{escalation_message}}.

GENERATION SETTINGS (hints for the model)
temp={{temp}}, top_p={{top_p}}, max_tokens={{max_tokens}}, 
frequency_penalty={{freq_penalty}}, presence_penalty={{pres_penalty}},
stop_sequences={{stop_sequences}}.

CONSTRAINTS
Be accurate; do not invent facts or prices. Prefer GBP and UK spellings.
If a request is out of scope or unsafe, refuse briefly and suggest a safe alternative.`,
        persona: "support",
        tone: "professional",
        knowledgeSource: "text",
        knowledgeContent:
          "ChatCura is a premium bot-building platform that helps businesses create intelligent chatbots for their websites. We offer customizable appearance, knowledge base integration, and easy embed options.",
        safetySettings: {
          refusalStyle: true,
          guardedTopics: true,
          maxAnswerLength: 300,
        },
        llmControls: {
          temperature: 0.7,
          maxTokens: 150,
          topP: 0.9,
          frequencyPenalty: 0.1,
          presencePenalty: 0.1,
          stopSequences: "---END---",
        },
        behavior: {
          responseLength: "normal",
          formatPreference: "paragraphs",
          whenUnsure: "clarify",
          escalationMessage: "Let me connect you with a human agent who can provide more specific guidance.",
          emoji: "sparingly",
          bookingIntents: ["book", "booking", "appointment", "schedule", "reserve", "availability"],
          orderIntents: ["order", "status", "track", "parcel", "delivery"],
        },
        appearance: {
          backgroundColor: "#0b0b0f",
          primaryColor: "#8b5cf6",
          fontSize: "md",
          chatAvatar: "",
          botName: "Support Assistant",
          userBubbleColor: "#3b82f6",
          userTextColor: "#ffffff",
          botBubbleColor: "#22252b",
          botTextColor: "#ffffff",
          cornerRadius: 16,
          messageSpacing: "cozy",
          fontStack: "default",
          showTypingIndicator: true,
          showLauncher: true,
        },
        branding: {
          showBranding: true,
          brandingText: "Powered by ChatCura.com",
          brandingUrl: "https://chatcura.com",
        },
        position: {
          corner: "bottom-right",
          offsetX: 24,
          offsetY: 24,
          zIndex: 99999,
          mobileOverride: false,
          mobileCorner: "bottom-right",
          mobileOffsetX: 16,
          mobileOffsetY: 16,
        },
        integrations: {
          booking: {
            platform: "booksy",
            bookingUrl: "",
            widgetScript: "",
            openMode: "modal",
            prefillName: "",
            prefillEmail: "",
            prefillService: "",
          },
          orders: {
            platform: "shopify",
            ordersEndpoint: "/api/order-status",
            trackingEndpoint: "/api/track",
            requireIdentity: true,
            useAfterShip: false,
          },
        },
        snippets: [
          { id: "1", title: "Refund Policy", content: "Our refund policy allows returns within 30 days of purchase." },
          { id: "2", title: "Booking Prep", content: "Please arrive 10 minutes early and bring a valid ID." },
          { id: "3", title: "Directions", content: "We're located at 123 Main Street, easily accessible by public transport." },
        ],
        privacy: {
          gdprMode: false,
        },
        localization: {
          language: "auto",
          locale: "auto",
        },
        accessibility: {
          reducedMotion: false,
        },
        analytics: {
          enabled: true,
        },
        handoff: {
          email: "support@chatcura.com",
          whatsapp: "+44XXXXXXXXXX",
          phone: "+44XXXXXXXXXX",
          calendlyUrl: "https://calendly.com/chatcura",
        },
        settings: {
          status: "live",
          visibility: "public",
          dataRetention: true,
          plan: "launch",
        },
        createdDate: "2024-01-15",
        lastUpdated: "2024-01-20",
      }
      setBots([sampleBot])
      localStorage.setItem("chatcura_admin_bots", JSON.stringify([sampleBot]))
    }
  }

  const saveBots = (updatedBots: BotData[]) => {
    setBots(updatedBots)
    localStorage.setItem("chatcura_admin_bots", JSON.stringify(updatedBots))
  }

  const createNewBot = () => {
    const newBot: BotData = {
      id: `bot_${Date.now()}`,
      name: "New Bot",
      welcomeMessage: "Hi! I'm your ChatCura assistant. How can I help?",
      systemPrompt: `You are {{bot_name}}, the ChatCura assistant for {{brand}}.
Follow the STYLE and SAFETY below strictly.

STYLE
- Tone: {{tone}}.
- Length: {{style_length}}. Format: {{style_format}}.
- Emoji policy: {{emoji_policy}} (never use if "never").
- Keep answers directly useful; avoid fluff.

UNCERTAINTY
If confidence is low or sources are weak, follow "{{when_unsure}}":
- clarify → ask one focused question; 
- admit → say you don't know and give 3 next steps; 
- escalate → use this message: {{escalation_message}}.

GENERATION SETTINGS (hints for the model)
temp={{temp}}, top_p={{top_p}}, max_tokens={{max_tokens}}, 
frequency_penalty={{freq_penalty}}, presence_penalty={{pres_penalty}},
stop_sequences={{stop_sequences}}.

CONSTRAINTS
Be accurate; do not invent facts or prices. Prefer GBP and UK spellings.
If a request is out of scope or unsafe, refuse briefly and suggest a safe alternative.`,
      persona: "helpful",
      tone: "friendly",
      knowledgeSource: "text",
      knowledgeContent: "",
      safetySettings: {
        refusalStyle: true,
        guardedTopics: true,
        maxAnswerLength: 500,
      },
      llmControls: {
        temperature: 0.7,
        maxTokens: 150,
        topP: 0.9,
        frequencyPenalty: 0.1,
        presencePenalty: 0.1,
        stopSequences: "---END---",
      },
      behavior: {
        responseLength: "normal",
        formatPreference: "paragraphs",
        whenUnsure: "clarify",
        escalationMessage: "Let me connect you with a human agent who can provide more specific guidance.",
        emoji: "sparingly",
        bookingIntents: ["book", "booking", "appointment", "schedule", "reserve", "availability"],
        orderIntents: ["order", "status", "track", "parcel", "delivery"],
      },
      appearance: {
        backgroundColor: "#0b0b0f",
        primaryColor: "#8b5cf6",
        fontSize: "md",
        chatAvatar: "",
        botName: "Assistant",
        userBubbleColor: "#3b82f6",
        userTextColor: "#ffffff",
        botBubbleColor: "#22252b",
        botTextColor: "#ffffff",
        cornerRadius: 16,
        messageSpacing: "cozy",
        fontStack: "default",
        showTypingIndicator: true,
        showLauncher: true,
      },
      branding: {
        showBranding: true,
        brandingText: "Powered by ChatCura.com",
        brandingUrl: "https://chatcura.com",
      },
      position: {
        corner: "bottom-right",
        offsetX: 24,
        offsetY: 24,
        zIndex: 99999,
        mobileOverride: false,
        mobileCorner: "bottom-right",
        mobileOffsetX: 16,
        mobileOffsetY: 16,
      },
      integrations: {
        booking: {
          platform: "booksy",
          bookingUrl: "",
          widgetScript: "",
          openMode: "modal",
          prefillName: "",
          prefillEmail: "",
          prefillService: "",
        },
        orders: {
          platform: "shopify",
          ordersEndpoint: "/api/order-status",
          trackingEndpoint: "/api/track",
          requireIdentity: true,
          useAfterShip: false,
        },
      },
      snippets: [],
      privacy: {
        gdprMode: false,
      },
      localization: {
        language: "auto",
        locale: "auto",
      },
      accessibility: {
        reducedMotion: false,
      },
      analytics: {
        enabled: true,
      },
      handoff: {
        email: "",
        whatsapp: "",
        phone: "",
        calendlyUrl: "",
      },
      settings: {
        status: "draft",
        visibility: "public",
        dataRetention: true,
        plan: "launch",
      },
      createdDate: new Date().toISOString().split("T")[0],
      lastUpdated: new Date().toISOString().split("T")[0],
    }

    const updatedBots = [...bots, newBot]
    saveBots(updatedBots)
    setSelectedBotId(newBot.id)
    setCurrentBot(newBot)
    setActiveView("create-edit")
    generateEmbedCode(newBot)
  }

  const selectBot = (botId: string) => {
    const bot = bots.find((b) => b.id === botId)
    if (bot) {
      setSelectedBotId(botId)
      setCurrentBot(bot)
      generateEmbedCode(bot)
    }
  }

  const updateCurrentBot = (updates: Partial<BotData>) => {
    if (!currentBot) return

    const updatedBot = { ...currentBot, ...updates, lastUpdated: new Date().toISOString().split("T")[0] }

    // Handle plan-based branding logic
    if (updates.settings?.plan) {
      const plan = updates.settings.plan
      if (plan === "launch") {
        updatedBot.branding = { ...updatedBot.branding, showBranding: true }
      } else if (plan === "scale" || plan === "custom") {
        updatedBot.branding = { ...updatedBot.branding, showBranding: false }
      }
    }

    setCurrentBot(updatedBot)

    const updatedBots = bots.map((bot) => (bot.id === updatedBot.id ? updatedBot : bot))
    saveBots(updatedBots)
    generateEmbedCode(updatedBot)

    // Validate settings and show warnings
    if (updatedBot.llmControls.maxTokens < 80 && updatedBot.behavior.responseLength === "detailed") {
      toast({
        title: "Configuration Warning",
        description: "Max tokens is low for detailed responses. Consider increasing to 200+.",
        variant: "destructive",
      })
    }
  }

  const generateEmbedCode = (bot: BotData) => {
    const stopSequences = bot.llmControls.stopSequences
      .split(",")
      .map((s) => s.trim())
      .join(",")

    const scriptCode = `<script src="https://cdn.chatcura.com/widget.js"
  data-bot-id="${bot.id}"
  data-primary="${bot.appearance.primaryColor}"
  data-bg="${bot.appearance.backgroundColor}"
  data-bot-bubble="${bot.appearance.botBubbleColor}"
  data-bot-text="${bot.appearance.botTextColor}"
  data-user-bubble="${bot.appearance.userBubbleColor}"
  data-user-text="${bot.appearance.userTextColor}"
  data-avatar-url="${bot.appearance.chatAvatar}"
  data-radius="${bot.appearance.cornerRadius}"
  data-temp="${bot.llmControls.temperature}"
  data-top-p="${bot.llmControls.topP}"
  data-max-tokens="${bot.llmControls.maxTokens}"
  data-freq-penalty="${bot.llmControls.frequencyPenalty}"
  data-pres-penalty="${bot.llmControls.presencePenalty}"
  data-stop="${stopSequences}"
  data-style-length="${bot.behavior.responseLength}"
  data-style-format="${bot.behavior.formatPreference}"
  data-when-unsure="${bot.behavior.whenUnsure}"
  data-emoji="${bot.behavior.emoji}"
  data-branding="${bot.branding.showBranding ? "on" : "off"}"
  data-branding-text="${bot.branding.brandingText}"
  data-branding-url="${bot.branding.brandingUrl}"
  data-plan="${bot.settings.plan}"
  data-position="${bot.position.corner}"
  data-offset-x="${bot.position.offsetX}"
  data-offset-y="${bot.position.offsetY}"
  data-z-index="${bot.position.zIndex}"
  data-mobile-override="${bot.position.mobileOverride ? "on" : "off"}"
  data-mobile-position="${bot.position.mobileCorner}"
  data-mobile-offset-x="${bot.position.mobileOffsetX}"
  data-mobile-offset-y="${bot.position.mobileOffsetY}"
  data-booking-platform="${bot.integrations.booking.platform}"
  data-booking-url="${bot.integrations.booking.bookingUrl}"
  data-booking-open="${bot.integrations.booking.openMode}"
  data-orders-provider="${bot.integrations.orders.platform}"
  data-orders-endpoint="${bot.integrations.orders.ordersEndpoint}"
  data-tracking-endpoint="${bot.integrations.orders.trackingEndpoint}"
  data-require-identity="${bot.integrations.orders.requireIdentity ? "on" : "off"}"
  data-analytics="${bot.analytics.enabled ? "on" : "off"}"
  data-lang="${bot.localization.language}"
  data-locale="${bot.localization.locale}"
  data-handoff-email="${bot.handoff.email}"
  data-handoff-whatsapp="${bot.handoff.whatsapp}"
  data-handoff-phone="${bot.handoff.phone}"
  data-handoff-calendly-url="${bot.handoff.calendlyUrl}">
</script>`

    const iframeCode = `<iframe
  src="https://chatcura.com/embed/${bot.id}"
  width="400"
  height="600"
  frameborder="0"
  style="border-radius: ${bot.appearance.cornerRadius}px; box-shadow: 0 4px 20px rgba(0,0,0,0.1);"
></iframe>`

    setEmbedCode(`<!-- ChatCura Bot Embed - Script Version -->
${scriptCode}

<!-- Alternative: iframe embed -->
${iframeCode}`)
  }

  const copyEmbedCode = () => {
    navigator.clipboard.writeText(embedCode)
    setCopySuccess(true)
    setTimeout(() => setCopySuccess(false), 2000)
    toast({
      title: "Copied to clipboard",
      description: "Embed code has been copied successfully",
    })
  }

  const deleteBot = (botId: string) => {
    if (confirm("Are you sure you want to delete this bot? This action cannot be undone.")) {
      const updatedBots = bots.filter((bot) => bot.id !== botId)
      saveBots(updatedBots)
      if (selectedBotId === botId) {
        setSelectedBotId(null)
        setCurrentBot(null)
        setActiveView("overview")
      }
      toast({
        title: "Bot deleted",
        description: "The bot has been permanently deleted",
      })
    }
  }

  const publishBot = () => {
    if (!currentBot) return

    // Check contrast ratios before publishing
    const userContrast = getContrastRatio(currentBot.appearance.userBubbleColor, currentBot.appearance.userTextColor)
    const botContrast = getContrastRatio(currentBot.appearance.botBubbleColor, currentBot.appearance.botTextColor)

    if (userContrast < 4.5 || botContrast < 4.5) {
      toast({
        title: "Cannot publish",
        description: "Increase contrast for accessibility before publishing (WCAG AA requires 4.5:1)",
        variant: "destructive",
      })
      return
    }

    updateCurrentBot({
      settings: { ...currentBot.settings, status: "live" },
    })

    toast({
      title: "Bot published",
      description: "Your bot is now live and ready to use",
    })
  }

  const saveTheme = () => {
    if (!currentBot) return

    updateCurrentBot(currentBot)
    toast({
      title: "Theme saved",
      description: "Your appearance changes have been saved",
    })
  }

  const applyThemePreset = (presetName: keyof typeof themePresets) => {
    if (!currentBot) return

    // Save current theme for revert
    setPreviousTheme({
      backgroundColor: currentBot.appearance.backgroundColor,
      primaryColor: currentBot.appearance.primaryColor,
      userBubbleColor: currentBot.appearance.userBubbleColor,
      userTextColor: currentBot.appearance.userTextColor,
      botBubbleColor: currentBot.appearance.botBubbleColor,
      botTextColor: currentBot.appearance.botTextColor,
      cornerRadius: currentBot.appearance.cornerRadius,
    })

    const preset = themePresets[presetName]
    updateCurrentBot({
      appearance: {
        ...currentBot.appearance,
        ...preset,
      },
    })

    toast({
      title: "Theme preset applied",
      description: `${presetName.charAt(0).toUpperCase() + presetName.slice(1)} theme has been applied`,
    })
  }

  const revertTheme = () => {
    if (!currentBot || !previousTheme) return

    updateCurrentBot({
      appearance: {
        ...currentBot.appearance,
        ...previousTheme,
      },
    })

    setPreviousTheme(null)
    toast({
      title: "Theme reverted",
      description: "Previous theme has been restored",
    })
  }

  const handleBookingOpen = () => {
    if (!currentBot) return

    setShowBookingModal(true)
    
    // Dispatch analytics event
    if (currentBot.analytics.enabled) {
      window.dispatchEvent(new CustomEvent("cc-booking-opened", {
        detail: { platform: currentBot.integrations.booking.platform }
      }))
    }
  }

  const handleOrderLookup = async () => {
    if (!currentBot || !orderFormData.orderId || !orderFormData.email) return

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Dispatch analytics event
      if (currentBot.analytics.enabled) {
        window.dispatchEvent(new CustomEvent("cc-order-lookup", {
          detail: { ok: true, provider: currentBot.integrations.orders.platform }
        }))
      }

      toast({
        title: "Order found",
        description: `Order #${orderFormData.orderId} - Status: Shipped`,
      })
      
      setShowOrderForm(false)
      setOrderFormData({ orderId: "", email: "" })
    } catch (error) {
      toast({
        title: "Order lookup failed",
        description: "Please check your order number and email address",
        variant: "destructive",
      })
    }
  }

  const addSnippet = () => {
    if (!currentBot) return

    const newSnippet = {
      id: Date.now().toString(),
      title: "New Snippet",
      content: "Enter your snippet content here...",
    }

    updateCurrentBot({
      snippets: [...currentBot.snippets, newSnippet],
    })
  }

  const updateSnippet = (id: string, updates: Partial<{ title: string; content: string }>) => {
    if (!currentBot) return

    updateCurrentBot({
      snippets: currentBot.snippets.map(snippet =>
        snippet.id === id ? { ...snippet, ...updates } : snippet
      ),
    })
  }

  const deleteSnippet = (id: string) => {
    if (!currentBot) return

    updateCurrentBot({
      snippets: currentBot.snippets.filter(snippet => snippet.id !== id),
    })
  }

  const purgeGDPRData = () => {
    if (!currentBot) return

    // Simulate purging PII data
    toast({
      title: "GDPR data purged",
      description: "All stored emails, phone numbers, and order IDs have been cleared",
    })
  }

  const redactTranscripts = () => {
    if (!currentBot) return

    // Simulate redacting transcripts
    toast({
      title: "Transcripts redacted",
      description: "16-digit patterns, emails, and UK postcodes have been masked",
    })
  }

  const filteredBots = bots.filter(
    (bot) =>
      bot.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bot.id.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const getMessageSpacingValue = (spacing: string) => {
    switch (spacing) {
      case "compact":
        return "8px"
      case "cozy":
        return "12px"
      case "roomy":
        return "16px"
      default:
        return "12px"
    }
  }

  const getFontSizeValue = (fontStack: string) => {
    switch (fontStack) {
      case "large":
        return "16px"
      case "xl":
        return "18px"
      default:
        return "14px"
    }
  }

  const getLocalizedText = (language: string, key: string) => {
    const translations: Record<string, Record<string, string>> = {
      en: {
        welcome: "Hi! I'm your ChatCura assistant. How can I help?",
        install: "To install the widget, copy the embed code and paste it before </body> in your HTML.",
        booking: "I can help you book an appointment! Let me open our booking system for you.",
        order: "I can help you track your order! Please provide your order number and email address.",
      },
      fr: {
        welcome: "Salut ! Je suis votre assistant ChatCura. Comment puis-je vous aider ?",
        install: "Pour installer le widget, copiez le code d'intégration et collez-le avant </body> dans votre HTML.",
        booking: "Je peux vous aider à prendre rendez-vous ! Laissez-moi ouvrir notre système de réservation.",
        order: "Je peux vous aider à suivre votre commande ! Veuillez fournir votre numéro de commande et votre email.",
      },
      es: {
        welcome: "¡Hola! Soy tu asistente ChatCura. ¿Cómo puedo ayudarte?",
        install: "Para instalar el widget, copia el código de inserción y pégalo antes de </body> en tu HTML.",
        booking: "¡Puedo ayudarte a reservar una cita! Déjame abrir nuestro sistema de reservas.",
        order: "¡Puedo ayudarte a rastrear tu pedido! Por favor proporciona tu número de pedido y email.",
      },
      de: {
        welcome: "Hallo! Ich bin Ihr ChatCura-Assistent. Wie kann ich Ihnen helfen?",
        install: "Um das Widget zu installieren, kopieren Sie den Einbettungscode und fügen Sie ihn vor </body> in Ihr HTML ein.",
        booking: "Ich kann Ihnen bei der Terminbuchung helfen! Lassen Sie mich unser Buchungssystem öffnen.",
        order: "Ich kann Ihnen bei der Sendungsverfolgung helfen! Bitte geben Sie Ihre Bestellnummer und E-Mail an.",
      },
    }

    const lang = language === "auto" ? "en" : language
    return translations[lang]?.[key] || translations.en[key] || key
  }

  // Login screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-800 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mb-4">
              <Bot className="h-8 w-8 text-blue-400" />
            </div>
            <CardTitle className="text-2xl font-bold text-white">ChatCura Bot Builder</CardTitle>
            <CardDescription className="text-gray-300">Admin Access Required</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-400 focus:ring-blue-400"
                  placeholder="admin@chatcura.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-400 focus:ring-blue-400"
                  placeholder="Enter password"
                  required
                />
              </div>
              {loginError && (
                <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-lg">
                  <p className="text-red-300 text-sm text-center">{loginError}</p>
                </div>
              )}
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5">
                Sign In
              </Button>
            </form>
            <div className="mt-6 pt-4 border-t border-white/10">
              <p className="text-xs text-gray-400 text-center">Demo credentials: admin@chatcura.com / Cur@2025!</p>
            </div>
          </CardContent>
        </Card>
        <Toaster />
      </div>
    )
  }

  // Main dashboard
  return (
    <TooltipProvider>
      <div className={`min-h-screen ${darkMode ? "dark" : ""}`}>
        <div className="flex h-screen bg-background">
          {/* Sidebar */}
          <div
            className={`${
              sidebarCollapsed ? "w-16" : "w-64"
            } bg-card/50 backdrop-blur-sm border-r border-border/50 transition-all duration-300 flex flex-col shadow-lg`}
          >
            <div className="p-4 border-b border-border/50">
              <div className="flex items-center justify-between">
                {!sidebarCollapsed && (
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                      <Bot className="h-5 w-5 text-primary" />
                    </div>
                    <span className="font-bold text-lg bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                      Bot Builder
                    </span>
                  </div>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                  className="h-8 w-8 p-0 hover:bg-primary/10"
                >
                  {sidebarCollapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <nav className="flex-1 p-4 space-y-2">
              <Button
                variant={activeView === "overview" ? "default" : "ghost"}
                className="w-full justify-start transition-all duration-200 hover:scale-105"
                onClick={() => setActiveView("overview")}
              >
                <Bot className="h-4 w-4 mr-2" />
                {!sidebarCollapsed && "Overview"}
              </Button>
              <Button
                variant={activeView === "create-edit" ? "default" : "ghost"}
                className="w-full justify-start transition-all duration-200 hover:scale-105"
                onClick={() => setActiveView("create-edit")}
                disabled={!currentBot}
              >
                <Plus className="h-4 w-4 mr-2" />
                {!sidebarCollapsed && "Create/Edit Bot"}
              </Button>
              <Button
                variant={activeView === "knowledge" ? "default" : "ghost"}
                className="w-full justify-start transition-all duration-200 hover:scale-105"
                onClick={() => setActiveView("knowledge")}
                disabled={!currentBot}
              >
                <FileText className="h-4 w-4 mr-2" />
                {!sidebarCollapsed && "Knowledge Base"}
              </Button>
              <Button
                variant={activeView === "integrations" ? "default" : "ghost"}
                className="w-full justify-start transition-all duration-200 hover:scale-105"
                onClick={() => setActiveView("integrations")}
                disabled={!currentBot}
              >
                <Zap className="h-4 w-4 mr-2" />
                {!sidebarCollapsed && "Integrations"}
              </Button>
              <Button
                variant={activeView === "appearance" ? "default" : "ghost"}
                className="w-full justify-start transition-all duration-200 hover:scale-105"
                onClick={() => setActiveView("appearance")}
                disabled={!currentBot}
              >
                <Palette className="h-4 w-4 mr-2" />
                {!sidebarCollapsed && "Appearance"}
              </Button>
              <Button
                variant={activeView === "embed" ? "default" : "ghost"}
                className="w-full justify-start transition-all duration-200 hover:scale-105"
                onClick={() => setActiveView("embed")}
                disabled={!currentBot}
              >
                <Code className="h-4 w-4 mr-2" />
                {!sidebarCollapsed && "Embed & Install"}
              </Button>
              <Button
                variant={activeView === "settings" ? "default" : "ghost"}
                className="w-full justify-start transition-all duration-200 hover:scale-105"
                onClick={() => setActiveView("settings")}
                disabled={!currentBot}
              >
                <Settings className="h-4 w-4 mr-2" />
                {!sidebarCollapsed && "Settings"}
              </Button>
            </nav>

            <div className="p-4 border-t border-border/50">
              <div className="text-xs text-muted-foreground text-center">ChatCura v2.0.1</div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col">
            {/* Header */}
            <header className="h-16 bg-card/30 backdrop-blur-sm border-b border-border/50 px-6 flex items-center justify-between shadow-sm">
              <div className="flex items-center space-x-4">
                <h1 className="text-xl font-semibold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                  ChatCura Bot Builder
                </h1>
                {currentBot && (
                  <div className="flex items-center space-x-2">
                    <Badge
                      variant={currentBot.settings.status === "live" ? "default" : "secondary"}
                      className="animate-pulse"
                    >
                      {currentBot.settings.status}
                    </Badge>
                    {currentBot.privacy.gdprMode && (
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        <Shield className="h-3 w-3 mr-1" />
                        GDPR
                      </Badge>
                    )}
                  </div>
                )}
              </div>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search bots..."
                    className="pl-10 w-64 bg-background/50 backdrop-blur-sm border-border/50"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setDarkMode(!darkMode)}
                  className="h-8 w-8 p-0 hover:bg-primary/10 transition-all duration-200"
                >
                  {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="h-8 w-8 p-0 hover:bg-primary/10 transition-all duration-200"
                >
                  <User className="h-4 w-4" />
                </Button>
              </div>
            </header>

            {/* Content Area */}
            <main className="flex-1 overflow-auto bg-gradient-to-br from-background via-background to-muted/20">
              {activeView === "overview" && (
                <div className="p-6 space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                        Bot Overview
                      </h2>
                      <p className="text-muted-foreground mt-1">Manage and monitor your chatbots</p>
                    </div>
                    <Button
                      onClick={createNewBot}
                      className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      New Bot
                    </Button>
                  </div>

                  <div className="grid gap-4">
                    {filteredBots.length === 0 ? (
                      <Card className="p-8 text-center bg-card/50 backdrop-blur-sm border-border/50 shadow-lg">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Bot className="h-8 w-8 text-primary" />
                        </div>
                        <h3 className="text-lg font-semibold mb-2">{searchQuery ? "No bots found" : "No bots yet"}</h3>
                        <p className="text-muted-foreground mb-4">
                          {searchQuery ? "Try adjusting your search terms" : "Create your first bot to get started"}
                        </p>
                        {!searchQuery && (
                          <Button onClick={createNewBot} className="bg-gradient-to-r from-primary to-blue-600">
                            <Plus className="h-4 w-4 mr-2" />
                            Create Bot
                          </Button>
                        )}
                      </Card>
                    ) : (
                      filteredBots.map((bot) => (
                        <Card
                          key={bot.id}
                          className="p-4 hover:shadow-lg transition-all duration-200 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/20 hover:scale-[1.02]"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-blue-500/20 rounded-xl flex items-center justify-center">
                                <Bot className="h-6 w-6 text-primary" />
                              </div>
                              <div>
                                <h3 className="font-semibold text-lg">{bot.name}</h3>
                                <p className="text-sm text-muted-foreground">
                                  Created {bot.createdDate} • Updated {bot.lastUpdated}
                                </p>
                                {bot.publicSite && (
                                  <p className="text-xs text-blue-600 dark:text-blue-400">{bot.publicSite}</p>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge
                                variant={bot.settings.status === "live" ? "default" : "secondary"}
                                className={bot.settings.status === "live" ? "bg-green-500 hover:bg-green-600" : ""}
                              >
                                {bot.settings.status}
                              </Badge>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  selectBot(bot.id)
                                  setActiveView("create-edit")
                                }}
                                className="hover:bg-primary/10 transition-all duration-200"
                              >
                                Edit
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => deleteBot(bot.id)}
                                className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </Card>
                      ))
                    )}
                  </div>
                </div>
              )}

              {activeView === "create-edit" && currentBot && (
                <div className="p-6 space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                        Edit Bot
                      </h2>
                      <p className="text-muted-foreground mt-1">Configure your bot's behavior and personality</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        onClick={() => setActiveView("appearance")}
                        className="hover:bg-primary/10"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Preview
                      </Button>
                      <Button
                        onClick={() => {
                          updateCurrentBot(currentBot)
                          toast({
                            title: "Bot saved",
                            description: "Your changes have been saved successfully",
                          })
                        }}
                        className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                      >
                        <Save className="h-4 w-4 mr-2" />
                        Save
                      </Button>
                      {currentBot.settings.status === "draft" && (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              onClick={publishBot}
                              disabled={
                                getContrastRatio(
                                  currentBot.appearance.userBubbleColor,
                                  currentBot.appearance.userTextColor,
                                ) < 4.5 ||
                                getContrastRatio(
                                  currentBot.appearance.botBubbleColor,
                                  currentBot.appearance.botTextColor,
                                ) < 4.5
                              }
                              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:opacity-50"
                            >
                              <Publish className="h-4 w-4 mr-2" />
                              Publish
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            {getContrastRatio(
                              currentBot.appearance.userBubbleColor,
                              currentBot.appearance.userTextColor,
                            ) < 4.5 ||
                            getContrastRatio(currentBot.appearance.botBubbleColor, currentBot.appearance.botTextColor) <
                              4.5
                              ? "Increase contrast for accessibility (WCAG AA requires 4.5:1)"
                              : "Publish your bot"}
                          </TooltipContent>
                        </Tooltip>
                      )}
                    </div>
                  </div>

                  <div className="grid lg:grid-cols-2 gap-6">
                    <div className="space-y-6">
                      <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-lg">
                        <CardHeader>
                          <CardTitle className="flex items-center space-x-2">
                            <Bot className="h-5 w-5 text-primary" />
                            <span>Basic Information</span>
                          </CardTitle>
                          <CardDescription>Configure your bot's basic settings</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="bot-name">Bot Name</Label>
                            <Input
                              id="bot-name"
                              value={currentBot.name}
                              onChange={(e) => updateCurrentBot({ name: e.target.value })}
                              placeholder="Enter bot name"
                              className="bg-background/50 border-border/50 focus:border-primary"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="public-site">Public Site/Brand (optional)</Label>
                            <Input
                              id="public-site"
                              value={currentBot.publicSite || ""}
                              onChange={(e) => updateCurrentBot({ publicSite: e.target.value })}
                              placeholder="https://example.com"
                              className="bg-background/50 border-border/50 focus:border-primary"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="welcome-message">Welcome Message</Label>
                            <Textarea
                              id="welcome-message"
                              value={currentBot.welcomeMessage}
                              onChange={(e) => updateCurrentBot({ welcomeMessage: e.target.value })}
                              placeholder="Short greeting users see on first open"
                              rows={3}
                              className="bg-background/50 border-border/50 focus:border-primary resize-none"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="system-prompt">System Prompt / Instructions</Label>
                            <Textarea
                              id="system-prompt"
                              value={currentBot.systemPrompt}
                              onChange={(e) => updateCurrentBot({ systemPrompt: e.target.value })}
                              placeholder="Define how your bot should behave and respond"
                              rows={8}
                              className="bg-background/50 border-border/50 focus:border-primary resize-y font-mono text-sm"
                            />
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-lg">
                        <CardHeader>
                          <CardTitle className="flex items-center space-x-2">
                            <User className="h-5 w-5 text-primary" />
                            <span>Personality & Tone</span>
                          </CardTitle>
                          <CardDescription>Define your bot's communication style</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-2">
                            <Label>Persona Preset</Label>
                            <Select
                              value={currentBot.persona}
                              onValueChange={(value) => updateCurrentBot({ persona: value })}
                            >
                              <SelectTrigger className="bg-background/50 border-border/50 focus:border-primary">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="helpful">Helpful Assistant</SelectItem>
                                <SelectItem value="sales">Sales Representative</SelectItem>
                                <SelectItem value="support">Customer Support</SelectItem>
                                <SelectItem value="booking">Booking Agent</SelectItem>
                                <SelectItem value="custom">Custom</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label>Tone</Label>
                            <Select
                              value={currentBot.tone}
                              onValueChange={(value) => updateCurrentBot({ tone: value })}
                            >
                              <SelectTrigger className="bg-background/50 border-border/50 focus:border-primary">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="professional">Professional</SelectItem>
                                <SelectItem value="friendly">Friendly</SelectItem>
                                <SelectItem value="playful">Playful</SelectItem>
                                <SelectItem value="technical">Technical</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Enhanced LLM Controls */}
                      <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-lg">
                        <CardHeader>
                          <CardTitle className="flex items-center space-x-2">
                            <Brain className="h-5 w-5 text-primary" />
                            <span>LLM Controls</span>
                          </CardTitle>
                          <CardDescription>Fine-tune AI behavior and generation parameters</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label>Temperature: {currentBot.llmControls.temperature}</Label>
                              <Slider
                                value={[currentBot.llmControls.temperature]}
                                onValueChange={([value]) =>
                                  updateCurrentBot({
                                    llmControls: { ...currentBot.llmControls, temperature: value },
                                  })
                                }
                                max={1}
                                min={0}
                                step={0.1}
                                className="w-full"
                              />
                              <p className="text-xs text-muted-foreground">
                                Lower = more focused, Higher = more creative
                              </p>
                            </div>
                            <div className="space-y-2">
                              <Label>Top-p: {currentBot.llmControls.topP}</Label>
                              <Slider
                                value={[currentBot.llmControls.topP]}
                                onValueChange={([value]) =>
                                  updateCurrentBot({
                                    llmControls: { ...currentBot.llmControls, topP: value },
                                  })
                                }
                                max={1}
                                min={0.1}
                                step={0.1}
                                className="w-full"
                              />
                              <p className="text-xs text-muted-foreground">Controls diversity of word choices</p>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label>Frequency Penalty: {currentBot.llmControls.frequencyPenalty}</Label>
                              <Slider
                                value={[currentBot.llmControls.frequencyPenalty]}
                                onValueChange={([value]) =>
                                  updateCurrentBot({
                                    llmControls: { ...currentBot.llmControls, frequencyPenalty: value },
                                  })
                                }
                                max={1}
                                min={0}
                                step={0.1}
                                className="w-full"
                              />
                              <p className="text-xs text-muted-foreground">Reduces repetition of frequent words</p>
                            </div>
                            <div className="space-y-2">
                              <Label>Presence Penalty: {currentBot.llmControls.presencePenalty}</Label>
                              <Slider
                                value={[currentBot.llmControls.presencePenalty]}
                                onValueChange={([value]) =>
                                  updateCurrentBot({
                                    llmControls: { ...currentBot.llmControls, presencePenalty: value },
                                  })
                                }
                                max={1}
                                min={0}
                                step={0.1}
                                className="w-full"
                              />
                              <p className="text-xs text-muted-foreground">Encourages talking about new topics</p>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label>Max Tokens: {currentBot.llmControls.maxTokens}</Label>
                            <Slider
                              value={[currentBot.llmControls.maxTokens]}
                              onValueChange={([value]) =>
                                updateCurrentBot({
                                  llmControls: { ...currentBot.llmControls, maxTokens: value },
                                })
                              }
                              max={500}
                              min={50}
                              step={10}
                              className="w-full"
                            />
                            <p className="text-xs text-muted-foreground">Maximum response length</p>
                          </div>

                          <div className="space-y-2">
                            <Label>Stop Sequences</Label>
                            <Input
                              value={currentBot.llmControls.stopSequences}
                              onChange={(e) =>
                                updateCurrentBot({
                                  llmControls: { ...currentBot.llmControls, stopSequences: e.target.value },
                                })
                              }
                              placeholder="---END---"
                              className="bg-background/50 border-border/50 focus:border-primary"
                            />
                            <p className="text-xs text-muted-foreground">
                              Comma-separated sequences that stop generation
                            </p>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Enhanced Behavior Card with Triggers */}
                      <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-lg">
                        <CardHeader>
                          <CardTitle className="flex items-center space-x-2">
                            <MessageSquare className="h-5 w-5 text-primary" />
                            <span>Behavior & Triggers</span>
                          </CardTitle>
                          <CardDescription>Configure response style, uncertainty handling, and intent triggers</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          <div className="space-y-3">
                            <Label>Response Length</Label>
                            <Select
                              value={currentBot.behavior.responseLength}
                              onValueChange={(value: "concise" | "normal" | "detailed") =>
                                updateCurrentBot({
                                  behavior: { ...currentBot.behavior, responseLength: value },
                                })
                              }
                            >
                              <SelectTrigger className="bg-background/50 border-border/50 focus:border-primary">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="concise">Concise</SelectItem>
                                <SelectItem value="normal">Normal</SelectItem>
                                <SelectItem value="detailed">Detailed</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-3">
                            <Label>Format Preference</Label>
                            <Select
                              value={currentBot.behavior.formatPreference}
                              onValueChange={(value: "bullets" | "paragraphs" | "steps") =>
                                updateCurrentBot({
                                  behavior: { ...currentBot.behavior, formatPreference: value },
                                })
                              }
                            >
                              <SelectTrigger className="bg-background/50 border-border/50 focus:border-primary">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="bullets">Bullets</SelectItem>
                                <SelectItem value="paragraphs">Paragraphs</SelectItem>
                                <SelectItem value="steps">Step-by-step</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-3">
                            <Label>When Unsure</Label>
                            <RadioGroup
                              value={currentBot.behavior.whenUnsure}
                              onValueChange={(value: "clarify" | "admit" | "escalate") =>
                                updateCurrentBot({
                                  behavior: { ...currentBot.behavior, whenUnsure: value },
                                })
                              }
                              className="space-y-2"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="clarify" id="clarify" />
                                <Label htmlFor="clarify" className="text-sm">
                                  Ask 1 clarifying question
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="admit" id="admit" />
                                <Label htmlFor="admit" className="text-sm">
                                  Admit unknown + give 3 next steps
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="escalate" id="escalate" />
                                <Label htmlFor="escalate" className="text-sm">
                                  Escalate to human
                                </Label>
                              </div>
                            </RadioGroup>

                            {currentBot.behavior.whenUnsure === "escalate" && (
                              <div className="mt-3 space-y-2">
                                <Label>Escalation Message</Label>
                                <Textarea
                                  value={currentBot.behavior.escalationMessage}
                                  onChange={(e) =>
                                    updateCurrentBot({
                                      behavior: { ...currentBot.behavior, escalationMessage: e.target.value },
                                    })
                                  }
                                  placeholder="Let me connect you with a human agent..."
                                  rows={2}
                                  className="bg-background/50 border-border/50 focus:border-primary resize-none"
                                />
                              </div>
                            )}
                          </div>

                          <div className="space-y-3">
                            <Label>Emoji</Label>
                            <Select
                              value={currentBot.behavior.emoji}
                              onValueChange={(value: "never" | "sparingly" | "allowed") =>
                                updateCurrentBot({
                                  behavior: { ...currentBot.behavior, emoji: value },
                                })
                              }
                            >
                              <SelectTrigger className="bg-background/50 border-border/50 focus:border-primary">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="never">Never</SelectItem>
                                <SelectItem value="sparingly">Sparingly</SelectItem>
                                <SelectItem value="allowed">Allowed</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          {/* Intent Triggers */}
                          <div className="space-y-4 p-4 bg-muted/20 rounded-xl border border-muted/30">
                            <h4 className="font-semibold text-sm">Intent Triggers</h4>
                            
                            <div className="space-y-3">
                              <Label>Booking Intents</Label>
                              <Input
                                value={currentBot.behavior.bookingIntents.join(", ")}
                                onChange={(e) =>
                                  updateCurrentBot({
                                    behavior: {
                                      ...currentBot.behavior,
                                      bookingIntents: e.target.value.split(",").map(s => s.trim()).filter(Boolean),
                                    },
                                  })
                                }
                                placeholder="book, booking, appointment, schedule, reserve, availability"
                                className="bg-background/50 border-border/50 focus:border-primary"
                              />
                              <p className="text-xs text-muted-foreground">
                                Comma-separated keywords that trigger booking flow
                              </p>
                            </div>

                            <div className="space-y-3">
                              <Label>Order Status Intents</Label>
                              <Input
                                value={currentBot.behavior.orderIntents.join(", ")}
                                onChange={(e) =>
                                  updateCurrentBot({
                                    behavior: {
                                      ...currentBot.behavior,
                                      orderIntents: e.target.value.split(",").map(s => s.trim()).filter(Boolean),
                                    },
                                  })
                                }
                                placeholder="order, status, track, parcel, delivery"
                                className="bg-background/50 border-border/50 focus:border-primary"
                              />
                              <p className="text-xs text-muted-foreground">
                                Comma-separated keywords that trigger order tracking flow
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="space-y-6">
                      <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-lg">
                        <CardHeader>
                          <CardTitle className="flex items-center space-x-2">
                            <FileText className="h-5 w-5 text-primary" />
                            <span>Knowledge Source</span>
                          </CardTitle>
                          <CardDescription>Configure your bot's knowledge base</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-2">
                            <Label>Source Type</Label>
                            <Select
                              value={currentBot.knowledgeSource}
                              onValueChange={(value: "upload" | "text" | "url") =>
                                updateCurrentBot({ knowledgeSource: value })
                              }
                            >
                              <SelectTrigger className="bg-background/50 border-border/50 focus:border-primary">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="upload">Upload Files</SelectItem>
                                <SelectItem value="text">Paste Text</SelectItem>
                                <SelectItem value="url">Public URL</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          {currentBot.knowledgeSource === "upload" && (
                            <div className="border-2 border-dashed border-border/50 rounded-lg p-8 text-center bg-muted/20 hover:bg-muted/30 transition-colors">
                              <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                              <p className="text-sm text-muted-foreground mb-2">
                                Drag and drop files here or click to browse
                              </p>
                              <Button variant="outline" size="sm" className="bg-background/50">
                                Choose Files
                              </Button>
                              <p className="text-xs text-muted-foreground mt-2">Supports PDF, TXT, CSV files</p>
                            </div>
                          )}

                          {currentBot.knowledgeSource === "text" && (
                            <div className="space-y-2">
                              <Label>Training Text</Label>
                              <Textarea
                                value={currentBot.knowledgeContent}
                                onChange={(e) => updateCurrentBot({ knowledgeContent: e.target.value })}
                                placeholder="Paste your training data here..."
                                rows={8}
                                className="bg-background/50 border-border/50 focus:border-primary resize-y"
                              />
                            </div>
                          )}

                          {currentBot.knowledgeSource === "url" && (
                            <div className="space-y-2">
                              <Label>Website URL</Label>
                              <Input
                                value={currentBot.knowledgeContent}
                                onChange={(e) => updateCurrentBot({ knowledgeContent: e.target.value })}
                                placeholder="https://example.com"
                                className="bg-background/50 border-border/50 focus:border-primary"
                              />
                              <p className="text-xs text-muted-foreground">
                                Bot will crawl and learn from this website
                              </p>
                            </div>
                          )}
                        </CardContent>
                      </Card>

                      <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-lg">
                        <CardHeader>
                          <CardTitle className="flex items-center space-x-2">
                            <AlertTriangle className="h-5 w-5 text-primary" />
                            <span>Safety Settings</span>
                          </CardTitle>
                          <CardDescription>Configure content moderation and safety</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                            <div>
                              <Label>Refusal Style</Label>
                              <p className="text-xs text-muted-foreground">Politely decline inappropriate requests</p>
                            </div>
                            <Switch
                              checked={currentBot.safetySettings.refusalStyle}
                              onCheckedChange={(checked) =>
                                updateCurrentBot({
                                  safetySettings: { ...currentBot.safetySettings, refusalStyle: checked },
                                })
                              }
                            />
                          </div>
                          <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                            <div>
                              <Label>Guarded Topics</Label>
                              <p className="text-xs text-muted-foreground">Avoid sensitive or harmful topics</p>
                            </div>
                            <Switch
                              checked={currentBot.safetySettings.guardedTopics}
                              onCheckedChange={(checked) =>
                                updateCurrentBot({
                                  safetySettings: { ...currentBot.safetySettings, guardedTopics: checked },
                                })
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Max Answer Length: {currentBot.safetySettings.maxAnswerLength}</Label>
                            <Slider
                              value={[currentBot.safetySettings.maxAnswerLength]}
                              onValueChange={([value]) =>
                                updateCurrentBot({
                                  safetySettings: { ...currentBot.safetySettings, maxAnswerLength: value },
                                })
                              }
                              max={1000}
                              min={100}
                              step={50}
                              className="w-full"
                            />
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              )}

              {activeView === "knowledge" && (
                <div className="p-6 space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                        Knowledge Base
                      </h2>
                      <p className="text-muted-foreground mt-1">
                        Manage your bot's training data and knowledge sources
                      </p>
                    </div>
                    <Button className="bg-gradient-to-r from-primary to-blue-600">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Source
                    </Button>
                  </div>

                  <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <FileText className="h-5 w-5 text-primary" />
                        <span>Knowledge Sources</span>
                      </CardTitle>
                      <CardDescription>Manage your bot's training data and knowledge sources</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {currentBot && currentBot.knowledgeContent && (
                          <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                                <FileText className="h-5 w-5 text-blue-500" />
                              </div>
                              <div>
                                <h4 className="font-medium">
                                  {currentBot.knowledgeSource === "text" && "Training Text"}
                                  {currentBot.knowledgeSource === "url" && "Website Content"}
                                  {currentBot.knowledgeSource === "upload" && "Uploaded Files"}
                                </h4>
                                <p className="text-sm text-muted-foreground">
                                  {currentBot.knowledgeContent.length} characters • Indexed
                                </p>
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <Badge
                                variant="default"
                                className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                              >
                                Active
                              </Badge>
                              <Button variant="outline" size="sm" className="hover:bg-primary/10 bg-transparent">
                                Reindex
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 bg-transparent"
                              >
                                Remove
                              </Button>
                            </div>
                          </div>
                        )}

                        {(!currentBot || !currentBot.knowledgeContent) && (
                          <div className="text-center py-12 text-muted-foreground">
                            <div className="w-16 h-16 bg-muted/20 rounded-full flex items-center justify-center mx-auto mb-4">
                              <FileText className="h-8 w-8 opacity-50" />
                            </div>
                            <p className="text-lg font-medium mb-2">No knowledge sources added yet</p>
                            <p className="mb-4">Add training data to improve your bot's responses</p>
                            <Button
                              variant="outline"
                              className="bg-background/50"
                              onClick={() => setActiveView("create-edit")}
                            >
                              Add Your First Source
                            </Button>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeView === "integrations" && currentBot && (
                <div className="p-6 space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                        Integrations
                      </h2>
                      <p className="text-muted-foreground mt-1">Connect your bot with external services and platforms</p>
                    </div>
                  </div>

                  <div className="grid lg:grid-cols-2 gap-6">
                    {/* Booking Integration */}
                    <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-lg">
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <Calendar className="h-5 w-5 text-primary" />
                          <span>Booking</span>
                        </CardTitle>
                        <CardDescription>Connect with booking platforms for appointment scheduling</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label>Platform</Label>
                          <Select
                            value={currentBot.integrations.booking.platform}
                            onValueChange={(value: "booksy" | "fresha" | "timely" | "other") =>
                              updateCurrentBot({
                                integrations: {
                                  ...currentBot.integrations,
                                  booking: { ...currentBot.integrations.booking, platform: value },
                                },
                              })
                            }
                          >
                            <SelectTrigger className="bg-background/50 border-border/50 focus:border-primary">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="booksy">Booksy</SelectItem>
                              <SelectItem value="fresha">Fresha</SelectItem>
                              <SelectItem value="timely">Timely</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label>Booking URL</Label>
                          <Input
                            value={currentBot.integrations.booking.bookingUrl}
                            onChange={(e) =>
                              updateCurrentBot({
                                integrations: {
                                  ...currentBot.integrations,
                                  booking: { ...currentBot.integrations.booking, bookingUrl: e.target.value },
                                },
                              })
                            }
                            placeholder="https://your-booking-link.com"
                            className="bg-background/50 border-border/50 focus:border-primary"
                          />
                          <p className="text-xs text-muted-foreground">Your unique booking link</p>
                        </div>

                        <div className="space-y-2">
                          <Label>Widget Script (optional)</Label>
                          <Textarea
                            value={currentBot.integrations.booking.widgetScript}
                            onChange={(e) =>
                              updateCurrentBot({
                                integrations: {
                                  ...currentBot.integrations,
                                  booking: { ...currentBot.integrations.booking, widgetScript: e.target.value },
                                },
                              })
                            }
                            placeholder="<script>...</script> or <iframe>...</iframe>"
                            rows={3}
                            className="bg-background/50 border-border/50 focus:border-primary resize-none font-mono text-sm"
                          />
                          <p className="text-xs text-muted-foreground">
                            Paste provider script for modal display
                          </p>
                        </div>

                        <div className="space-y-2">
                          <Label>Open Mode</Label>
                          <Select
                            value={currentBot.integrations.booking.openMode}
                            onChange={(value: "modal" | "tab") =>
                              updateCurrentBot({
                                integrations: {
                                  ...currentBot.integrations,
                                  booking: { ...currentBot.integrations.booking, openMode: value },
                                },
                              })
                            }
                          >
                            <SelectTrigger className="bg-background/50 border-border/50 focus:border-primary">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="modal">Modal in-page</SelectItem>
                              <SelectItem value="tab">New tab</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-4 p-4 bg-muted/20 rounded-xl border border-muted/30">
                          <h4 className="font-semibold text-sm">Prefill Options (optional)</h4>
                          
                          <div className="grid grid-cols-1 gap-3">
                            <div className="space-y-2">
                              <Label>Name Field</Label>
                              <Input
                                value={currentBot.integrations.booking.prefillName}
                                onChange={(e) =>
                                  updateCurrentBot({
                                    integrations: {
                                      ...currentBot.integrations,
                                      booking: { ...currentBot.integrations.booking, prefillName: e.target.value },
                                    },
                                  })
                                }
                                placeholder="name"
                                className="bg-background/50 border-border/50 focus:border-primary"
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label>Email Field</Label>
                              <Input
                                value={currentBot.integrations.booking.prefillEmail}
                                onChange={(e) =>
                                  updateCurrentBot({
                                    integrations: {
                                      ...currentBot.integrations,
                                      booking: { ...currentBot.integrations.booking, prefillEmail: e.target.value },
                                    },
                                  })
                                }
                                placeholder="email"
                                className="bg-background/50 border-border/50 focus:border-primary"
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label>Service Field</Label>
                              <Input
                                value={currentBot.integrations.booking.prefillService}
                                onChange={(e) =>
                                  updateCurrentBot({
                                    integrations: {
                                      ...currentBot.integrations,
                                      booking: { ...currentBot.integrations.booking, prefillService: e.target.value },
                                    },
                                  })
                                }
                                placeholder="service"
                                className="bg-background/50 border-border/50 focus:border-primary"
                              />
                            </div>
                          </div>
                          
                          <p className="text-xs text-muted-foreground">
                            Map chat fields to booking form using query parameters
                          </p>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Orders & Tracking Integration */}
                    <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-lg">
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <Package className="h-5 w-5 text-primary" />
                          <span>Orders & Tracking</span>
                        </CardTitle>
                        <CardDescription>Connect with e-commerce platforms for order status and tracking</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label>Commerce Platform</Label>
                          <Select
                            value={currentBot.integrations.orders.platform}
                            onValueChange={(value: "shopify" | "woocommerce" | "etsy" | "custom") =>
                              updateCurrentBot({
                                integrations: {
                                  ...currentBot.integrations,
                                  orders: { ...currentBot.integrations.orders, platform: value },
                                },
                              })
                            }
                          >
                            <SelectTrigger className="bg-background/50 border-border/50 focus:border-primary">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="shopify">Shopify</SelectItem>
                              <SelectItem value="woocommerce">WooCommerce</SelectItem>
                              <SelectItem value="etsy">Etsy</SelectItem>
                              <SelectItem value="custom">Custom</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label>Orders Endpoint</Label>
                          <Input
                            value={currentBot.integrations.orders.ordersEndpoint}
                            readOnly
                            className="bg-muted/50 border-border/50 text-muted-foreground"
                          />
                          <p className="text-xs text-muted-foreground">Read-only hint for developers</p>
                        </div>

                        <div className="space-y-2">
                          <Label>Tracking Endpoint</Label>
                          <Input
                            value={currentBot.integrations.orders.trackingEndpoint}
                            readOnly
                            className="bg-muted/50 border-border/50 text-muted-foreground"
                          />
                          <p className="text-xs text-muted-foreground">Read-only hint for developers</p>
                        </div>

                        <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                          <div>
                            <Label>Require Identity</Label>
                            <p className="text-xs text-muted-foreground">Collect order # and email for verification</p>
                          </div>
                          <Switch
                            checked={currentBot.integrations.orders.requireIdentity}
                            onCheckedChange={(checked) =>
                              updateCurrentBot({
                                integrations: {
                                  ...currentBot.integrations,
                                  orders: { ...currentBot.integrations.orders, requireIdentity: checked },
                                },
                              })
                            }
                          />
                        </div>

                        <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                          <div>
                            <Label>Use AfterShip for tracking</Label>
                            <p className="text-xs text-muted-foreground">Configure API key on the server</p>
                          </div>
                          <Switch
                            checked={currentBot.integrations.orders.useAfterShip}
                            onCheckedChange={(checked) =>
                              updateCurrentBot({
                                integrations: {
                                  ...currentBot.integrations,
                                  orders: { ...currentBot.integrations.orders, useAfterShip: checked },
                                },
                              })
                            }
                          />
                        </div>

                        <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                          <div className="flex items-center space-x-2">
                            <Shield className="h-4 w-4 text-amber-600" />
                            <span className="text-sm font-medium text-amber-700 dark:text-amber-300">
                              Security Note
                            </span>
                          </div>
                          <p className="text-xs text-amber-700 dark:text-amber-300 mt-1">
                            API keys live on the server (env vars). Don't paste secrets here.
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}

              {activeView === "appearance" && currentBot && (
                <div className="p-8">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h2 className="text-4xl font-bold bg-gradient-to-r from-[#8b5cf6] to-blue-600 bg-clip-text text-transparent">
                        Appearance
                      </h2>
                      <p className="text-muted-foreground mt-2 text-lg">
                        Customize your bot's visual design and branding
                      </p>
                    </div>
                    <Button
                      onClick={saveTheme}
                      className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-lg hover:shadow-xl transition-all duration-180 ease-out"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                  </div>

                  <div className="grid lg:grid-cols-2 gap-8">
                    <div className="space-y-8">
                      {/* Theme Presets Card */}
                      <Card className="bg-white/5 backdrop-blur-xl border-white/10 shadow-2xl hover:shadow-3xl transition-all duration-180 ease-out">
                        <CardHeader className="pb-6">
                          <CardTitle className="flex items-center space-x-3 text-xl">
                            <Sparkles className="h-6 w-6 text-[#8b5cf6]" />
                            <span className="bg-gradient-to-r from-[#8b5cf6] to-blue-600 bg-clip-text text-transparent">
                              Theme Presets
                            </span>
                          </CardTitle>
                          <CardDescription className="text-base">Quick theme presets for common styles</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid grid-cols-3 gap-3">
                            <Button
                              variant="outline"
                              onClick={() => applyThemePreset("dark")}
                              className="h-20 flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 text-white border-gray-700 hover:border-[#8b5cf6]"
                            >
                              <div className="w-6 h-6 bg-[#8b5cf6] rounded mb-1"></div>
                              <span className="text-xs">Dark</span>
                            </Button>
                            
                            <Button
                              variant="outline"
                              onClick={() => applyThemePreset("minimal")}
                              className="h-20 flex flex-col items-center justify-center bg-gradient-to-br from-white to-gray-50 text-gray-900 border-gray-200 hover:border-[#8b5cf6]"
                            >
                              <div className="w-6 h-6 bg-black rounded mb-1"></div>
                              <span className="text-xs">Minimal</span>
                            </Button>
                            
                            <Button
                              variant="outline"
                              onClick={() => applyThemePreset("highContrast")}
                              className="h-20 flex flex-col items-center justify-center bg-gradient-to-br from-black to-gray-900 text-white border-white hover:border-[#8b5cf6]"
                            >
                              <div className="w-6 h-6 bg-white rounded mb-1"></div>
                              <span className="text-xs">High Contrast</span>
                            </Button>
                          </div>
                          
                          {previousTheme && (
                            <Button
                              variant="outline"
                              onClick={revertTheme}
                              className="w-full bg-background/50 hover:bg-[#8b5cf6]/10 transition-all duration-180"
                            >
                              <RotateCcw className="h-4 w-4 mr-2" />
                              Revert to Previous
                            </Button>
                          )}
                        </CardContent>
                      </Card>

                      {/* Theme Card */}
                      <Card className="bg-white/5 backdrop-blur-xl border-white/10 shadow-2xl hover:shadow-3xl transition-all duration-180 ease-out">
                        <CardHeader className="pb-6">
                          <CardTitle className="flex items-center space-x-3 text-xl">
                            <Palette className="h-6 w-6 text-[#8b5cf6]" />
                            <span className="bg-gradient-to-r from-[#8b5cf6] to-blue-600 bg-clip-text text-transparent">
                              Theme
                            </span>
                          </CardTitle>
                          <CardDescription className="text-base">Customize colors and styling</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-3">
                              <div className="flex items-center space-x-2">
                                <Label className="text-sm font-medium">Background Color</Label>
                                <Tooltip>
                                  <TooltipTrigger>
                                    <Info className="h-3 w-3 text-muted-foreground" />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Affects chat widget only; webpage theme unchanged</p>
                                  </TooltipContent>
                                </Tooltip>
                              </div>
                              <div className="flex space-x-3">
                                <Input
                                  type="color"
                                  value={currentBot.appearance.backgroundColor}
                                  onChange={(e) =>
                                    updateCurrentBot({
                                      appearance: { ...currentBot.appearance, backgroundColor: e.target.value },
                                    })
                                  }
                                  className="w-14 h-12 p-1 border-border/50 rounded-lg cursor-pointer transition-all duration-180 hover:scale-105"
                                />
                                <Input
                                  value={currentBot.appearance.backgroundColor}
                                  onChange={(e) =>
                                    updateCurrentBot({
                                      appearance: { ...currentBot.appearance, backgroundColor: e.target.value },
                                    })
                                  }
                                  className="flex-1 bg-background/50 border-border/50 focus:border-[#8b5cf6] focus:ring-2 focus:ring-[#8b5cf6]/20 transition-all duration-180"
                                />
                              </div>
                            </div>
                            <div className="space-y-3">
                              <div className="flex items-center space-x-2">
                                <Label className="text-sm font-medium">Primary Color</Label>
                                <Tooltip>
                                  <TooltipTrigger>
                                    <Info className="h-3 w-3 text-muted-foreground" />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Affects chat widget only; webpage theme unchanged</p>
                                  </TooltipContent>
                                </Tooltip>
                              </div>
                              <div className="flex space-x-3">
                                <Input
                                  type="color"
                                  value={currentBot.appearance.primaryColor}
                                  onChange={(e) =>
                                    updateCurrentBot({
                                      appearance: { ...currentBot.appearance, primaryColor: e.target.value },
                                    })
                                  }
                                  className="w-14 h-12 p-1 border-border/50 rounded-lg cursor-pointer transition-all duration-180 hover:scale-105"
                                />
                                <Input
                                  value={currentBot.appearance.primaryColor}
                                  onChange={(e) =>
                                    updateCurrentBot({
                                      appearance: { ...currentBot.appearance, primaryColor: e.target.value },
                                    })
                                  }
                                  className="flex-1 bg-background/50 border-border/50 focus:border-[#8b5cf6] focus:ring-2 focus:ring-[#8b5cf6]/20 transition-all duration-180"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="space-y-3">
                            <Label className="text-sm font-medium">Font Stack</Label>
                            <Select
                              value={currentBot.appearance.fontStack}
                              onValueChange={(value: "default" | "large" | "xl") =>
                                updateCurrentBot({
                                  appearance: { ...currentBot.appearance, fontStack: value },
                                })
                              }
                            >
                              <SelectTrigger className="bg-background/50 border-border/50 focus:border-[#8b5cf6] focus:ring-2 focus:ring-[#8b5cf6]/20 transition-all duration-180">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="default">Default (14px)</SelectItem>
                                <SelectItem value="large">Large (16px)</SelectItem>
                                <SelectItem value="xl">XL (18px)</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Branding Card */}
                      <Card className="bg-white/5 backdrop-blur-xl border-white/10 shadow-2xl hover:shadow-3xl transition-all duration-180 ease-out">
                        <CardHeader className="pb-6">
                          <CardTitle className="flex items-center space-x-3 text-xl">
                            <Crown className="h-6 w-6 text-[#8b5cf6]" />
                            <span className="bg-gradient-to-r from-[#8b5cf6] to-blue-600 bg-clip-text text-transparent">
                              Branding
                            </span>
                          </CardTitle>
                          <CardDescription className="text-base">Configure branding and attribution</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          <div className="flex items-center justify-between p-4 bg-muted/20 rounded-xl hover:bg-muted/30 transition-all duration-180">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-[#8b5cf6]/20 rounded-full flex items-center justify-center">
                                <Crown className="h-4 w-4 text-[#8b5cf6]" />
                              </div>
                              <div>
                                <Label className="text-sm font-medium">Show "Powered by ChatCura.com" banner</Label>
                                <p className="text-xs text-muted-foreground">
                                  Branding removed on Scale & Custom plans
                                </p>
                              </div>
                            </div>
                            <div className="relative">
                              <Switch
                                checked={currentBot.branding.showBranding}
                                onChange={(checked) =>
                                  updateCurrentBot({
                                    branding: { ...currentBot.branding, showBranding: checked },
                                  })
                                }
                                disabled={currentBot.settings.plan !== "launch"}
                                className="data-[state=checked]:bg-[#8b5cf6] transition-all duration-180 disabled:opacity-50"
                              />
                            </div>
                          </div>

                          <div className="space-y-3">
                            <Label className="text-sm font-medium">Branding Text</Label>
                            <Input
                              value={currentBot.branding.brandingText}
                              readOnly
                              className="bg-muted/50 border-border/50 text-muted-foreground"
                            />
                          </div>

                          <div className="space-y-3">
                            <Label className="text-sm font-medium">Branding Link</Label>
                            <div className="flex space-x-2">
                              <Input
                                value={currentBot.branding.brandingUrl}
                                readOnly
                                className="flex-1 bg-muted/50 border-border/50 text-muted-foreground"
                              />
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  window.open(
                                    setBrandingLinkHref({
                                      baseUrl: currentBot.branding.brandingUrl,
                                      botId: currentBot.id,
                                      plan: currentBot.settings.plan,
                                      position: currentBot.position.corner,
                                    }),
                                    "_blank",
                                  )
                                }
                                className="bg-background/50 hover:bg-[#8b5cf6]/10 transition-all duration-180"
                              >
                                <ExternalLink className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>

                          {currentBot.settings.plan !== "launch" && (
                            <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                              <div className="flex items-center space-x-2">
                                <Crown className="h-4 w-4 text-green-600" />
                                <span className="text-sm font-medium text-green-700 dark:text-green-300">
                                  White-label enabled - No branding required
                                </span>
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>

                      {/* Position Card */}
                      <Card className="bg-white/5 backdrop-blur-xl border-white/10 shadow-2xl hover:shadow-3xl transition-all duration-180 ease-out">
                        <CardHeader className="pb-6">
                          <CardTitle className="flex items-center space-x-3 text-xl">
                            <MapPin className="h-6 w-6 text-[#8b5cf6]" />
                            <span className="bg-gradient-to-r from-[#8b5cf6] to-blue-600 bg-clip-text text-transparent">
                              Position
                            </span>
                          </CardTitle>
                          <CardDescription className="text-base">
                            Configure widget positioning and offsets
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          <div className="space-y-3">
                            <Label className="text-sm font-medium">Corner</Label>
                            <Select
                              value={currentBot.position.corner}
                              onChange={(value: "top-left" | "top-right" | "bottom-left" | "bottom-right") =>
                                updateCurrentBot({
                                  position: { ...currentBot.position, corner: value },
                                })
                              }
                            >
                              <SelectTrigger className="bg-background/50 border-border/50 focus:border-[#8b5cf6] focus:ring-2 focus:ring-[#8b5cf6]/20 transition-all duration-180">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="top-left">Top-Left</SelectItem>
                                <SelectItem value="top-right">Top-Right</SelectItem>
                                <SelectItem value="bottom-left">Bottom-Left</SelectItem>
                                <SelectItem value="bottom-right">Bottom-Right</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-3">
                              <Label className="text-sm font-medium">X Offset (px)</Label>
                              <Input
                                type="number"
                                value={currentBot.position.offsetX}
                                onChange={(e) =>
                                  updateCurrentBot({
                                    position: { ...currentBot.position, offsetX: Number(e.target.value) },
                                  })
                                }
                                className="bg-background/50 border-border/50 focus:border-[#8b5cf6] focus:ring-2 focus:ring-[#8b5cf6]/20 transition-all duration-180"
                              />
                            </div>
                            <div className="space-y-3">
                              <Label className="text-sm font-medium">Y Offset (px)</Label>
                              <Input
                                type="number"
                                value={currentBot.position.offsetY}
                                onChange={(e) =>
                                  updateCurrentBot({
                                    position: { ...currentBot.position, offsetY: Number(e.target.value) },
                                  })
                                }
                                className="bg-background/50 border-border/50 focus:border-[#8b5cf6] focus:ring-2 focus:ring-[#8b5cf6]/20 transition-all duration-180"
                              />
                            </div>
                          </div>

                          <div className="space-y-3">
                            <Label className="text-sm font-medium">Z-Index</Label>
                            <Input
                              type="number"
                              value={currentBot.position.zIndex}
                              onChange={(e) =>
                                updateCurrentBot({
                                  position: { ...currentBot.position, zIndex: Number(e.target.value) },
                                })
                              }
                              className="bg-background/50 border-border/50 focus:border-[#8b5cf6] focus:ring-2 focus:ring-[#8b5cf6]/20 transition-all duration-180"
                            />
                          </div>

                          <div className="flex items-center justify-between p-4 bg-muted/20 rounded-xl hover:bg-muted/30 transition-all duration-180">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-[#8b5cf6]/20 rounded-full flex items-center justify-center">
                                <MapPin className="h-4 w-4 text-[#8b5cf6]" />
                              </div>
                              <div>
                                <Label className="text-sm font-medium">Mobile Override</Label>
                                <p className="text-xs text-muted-foreground">
                                  Use different settings for mobile devices
                                </p>
                              </div>
                            </div>
                            <div className="relative">
                              <Switch
                                checked={currentBot.position.mobileOverride}
                                onChange={(checked) =>
                                  updateCurrentBot({
                                    position: { ...currentBot.position, mobileOverride: checked },
                                  })
                                }
                                className="data-[state=checked]:bg-[#8b5cf6] transition-all duration-180"
                              />
                            </div>
                          </div>

                          {currentBot.position.mobileOverride && (
                            <div className="space-y-4 p-4 bg-blue-500/5 rounded-xl border border-blue-500/10">
                              <h4 className="font-semibold text-blue-600 dark:text-blue-400">Mobile Settings</h4>

                              <div className="space-y-3">
                                <Label className="text-sm font-medium">Mobile Corner</Label>
                                <Select
                                  value={currentBot.position.mobileCorner}
                                  onChange={(value: "top-left" | "top-right" | "bottom-left" | "bottom-right") =>
                                    updateCurrentBot({
                                      position: { ...currentBot.position, mobileCorner: value },
                                    })
                                  }
                                >
                                  <SelectTrigger className="bg-background/50 border-border/50 focus:border-[#8b5cf6] focus:ring-2 focus:ring-[#8b5cf6]/20 transition-all duration-180">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="top-left">Top-Left</SelectItem>
                                    <SelectItem value="top-right">Top-Right</SelectItem>
                                    <SelectItem value="bottom-left">Bottom-Left</SelectItem>
                                    <SelectItem value="bottom-right">Bottom-Right</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>

                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-3">
                                  <Label className="text-sm font-medium">Mobile X Offset (px)</Label>
                                  <Input
                                    type="number"
                                    value={currentBot.position.mobileOffsetX}
                                    onChange={(e) =>
                                      updateCurrentBot({
                                        position: { ...currentBot.position, mobileOffsetX: Number(e.target.value) },
                                      })
                                    }
                                    className="bg-background/50 border-border/50 focus:border-[#8b5cf6] focus:ring-2 focus:ring-[#8b5cf6]/20 transition-all duration-180"
                                  />
                                </div>
                                <div className="space-y-3">
                                  <Label className="text-sm font-medium">Mobile Y Offset (px)</Label>
                                  <Input
                                    type="number"
                                    value={currentBot.position.mobileOffsetY}
                                    onChange={(e) =>
                                      updateCurrentBot({
                                        position: { ...currentBot.position, mobileOffsetY: Number(e.target.value) },
                                      })
                                    }
                                    className="bg-background/50 border-border/50 focus:border-[#8b5cf6] focus:ring-2 focus:ring-[#8b5cf6]/20 transition-all duration-180"
                                  />
                                </div>
                              </div>
                            </div>
                          )}

                          <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                            <p className="text-xs text-amber-700 dark:text-amber-300">
                              Offsets apply from chosen edges. Increase Y to clear cookie banners.
                            </p>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Bubble Styles Card */}
                      <Card className="bg-white/5 backdrop-blur-xl border-white/10 shadow-2xl hover:shadow-3xl transition-all duration-180 ease-out">
                        <CardHeader className="pb-6">
                          <CardTitle className="flex items-center space-x-3 text-xl">
                            <Bot className="h-6 w-6 text-[#8b5cf6]" />
                            <span className="bg-gradient-to-r from-[#8b5cf6] to-blue-600 bg-clip-text text-transparent">
                              Bubble Styles
                            </span>
                          </CardTitle>
                          <CardDescription className="text-base">Configure message bubble appearance</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-8">
                          {/* User Bubble Group */}
                          <div className="space-y-4 p-4 bg-blue-500/5 rounded-xl border border-blue-500/10">
                            <h4 className="font-semibold text-blue-600 dark:text-blue-400">User Messages</h4>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-3">
                                <div className="flex items-center space-x-2">
                                  <Label className="text-sm font-medium">Bubble Background</Label>
                                  <Tooltip>
                                    <TooltipTrigger>
                                      <Info className="h-3 w-3 text-muted-foreground" />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>Background color for user message bubbles</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </div>
                                <div className="flex space-x-3">
                                  <Input
                                    type="color"
                                    value={currentBot.appearance.userBubbleColor}
                                    onChange={(e) =>
                                      updateCurrentBot({
                                        appearance: { ...currentBot.appearance, userBubbleColor: e.target.value },
                                      })
                                    }
                                    className="w-14 h-12 p-1 border-border/50 rounded-lg cursor-pointer transition-all duration-180 hover:scale-105"
                                  />
                                  <Input
                                    value={currentBot.appearance.userBubbleColor}
                                    onChange={(e) =>
                                      updateCurrentBot({
                                        appearance: { ...currentBot.appearance, userBubbleColor: e.target.value },
                                      })
                                    }
                                    className="flex-1 bg-background/50 border-border/50 focus:border-[#8b5cf6] focus:ring-2 focus:ring-[#8b5cf6]/20 transition-all duration-180"
                                  />
                                </div>
                              </div>
                              <div className="space-y-3">
                                <div className="flex items-center space-x-2">
                                  <Label className="text-sm font-medium">Text Color</Label>
                                  <Tooltip>
                                    <TooltipTrigger>
                                      <Info className="h-3 w-3 text-muted-foreground" />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>Text color for user messages</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </div>
                                <div className="flex space-x-3">
                                  <Input
                                    type="color"
                                    value={currentBot.appearance.userTextColor}
                                    onChange={(e) =>
                                      updateCurrentBot({
                                        appearance: { ...currentBot.appearance, userTextColor: e.target.value },
                                      })
                                    }
                                    className="w-14 h-12 p-1 border-border/50 rounded-lg cursor-pointer transition-all duration-180 hover:scale-105"
                                  />
                                  <Input
                                    value={currentBot.appearance.userTextColor}
                                    onChange={(e) =>
                                      updateCurrentBot({
                                        appearance: { ...currentBot.appearance, userTextColor: e.target.value },
                                      })
                                    }
                                    className="flex-1 bg-background/50 border-border/50 focus:border-[#8b5cf6] focus:ring-2 focus:ring-[#8b5cf6]/20 transition-all duration-180"
                                  />
                                </div>
                              </div>
                            </div>
                            {/* User Contrast Warning */}
                            {getContrastRatio(
                              currentBot.appearance.userBubbleColor,
                              currentBot.appearance.userTextColor,
                            ) < 4.5 && (
                              <div className="flex items-center space-x-2 text-amber-600 dark:text-amber-400 text-sm">
                                <AlertTriangle className="h-4 w-4" />
                                <span>
                                  ⚠ Low contrast (
                                  {getContrastRatio(
                                    currentBot.appearance.userBubbleColor,
                                    currentBot.appearance.userTextColor,
                                  ).toFixed(1)}
                                  :1). Consider darker text or lighter bubble.
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Bot Bubble Group */}
                          <div className="space-y-4 p-4 bg-gray-500/5 rounded-xl border border-gray-500/10">
                            <h4 className="font-semibold text-gray-600 dark:text-gray-400">Bot Messages</h4>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-3">
                                <div className="flex items-center space-x-2">
                                  <Label className="text-sm font-medium">Bubble Background</Label>
                                  <Tooltip>
                                    <TooltipTrigger>
                                      <Info className="h-3 w-3 text-muted-foreground" />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>Background color for bot message bubbles</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </div>
                                <div className="flex space-x-3">
                                  <Input
                                    type="color"
                                    value={currentBot.appearance.botBubbleColor}
                                    onChange={(e) =>
                                      updateCurrentBot({
                                        appearance: { ...currentBot.appearance, botBubbleColor: e.target.value },
                                      })
                                    }
                                    className="w-14 h-12 p-1 border-border/50 rounded-lg cursor-pointer transition-all duration-180 hover:scale-105"
                                  />
                                  <Input
                                    value={currentBot.appearance.botBubbleColor}
                                    onChange={(e) =>
                                      updateCurrentBot({
                                        appearance: { ...currentBot.appearance, botBubbleColor: e.target.value },
                                      })
                                    }
                                    className="flex-1 bg-background/50 border-border/50 focus:border-[#8b5cf6] focus:ring-2 focus:ring-[#8b5cf6]/20 transition-all duration-180"
                                  />
                                </div>
                              </div>
                              <div className="space-y-3">
                                <div className="flex items-center space-x-2">
                                  <Label className="text-sm font-medium">Text Color</Label>
                                  <Tooltip>
                                    <TooltipTrigger>
                                      <Info className="h-3 w-3 text-muted-foreground" />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>Text color for bot messages</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </div>
                                <div className="flex space-x-3">
                                  <Input
                                    type="color"
                                    value={currentBot.appearance.botTextColor}
                                    onChange={(e) =>
                                      updateCurrentBot({
                                        appearance: { ...currentBot.appearance, botTextColor: e.target.value },
                                      })
                                    }
                                    className="w-14 h-12 p-1 border-border/50 rounded-lg cursor-pointer transition-all duration-180 hover:scale-105"
                                  />
                                  <Input
                                    value={currentBot.appearance.botTextColor}
                                    onChange={(e) =>
                                      updateCurrentBot({
                                        appearance: { ...currentBot.appearance, botTextColor: e.target.value },
                                      })
                                    }
                                    className="flex-1 bg-background/50 border-border/50 focus:border-[#8b5cf6] focus:ring-2 focus:ring-[#8b5cf6]/20 transition-all duration-180"
                                  />
                                </div>
                              </div>
                            </div>
                            {/* Bot Contrast Warning */}
                            {getContrastRatio(
                              currentBot.appearance.botBubbleColor,
                              currentBot.appearance.botTextColor,
                            ) < 4.5 && (
                              <div className="flex items-center space-x-2 text-amber-600 dark:text-amber-400 text-sm">
                                <AlertTriangle className="h-4 w-4" />
                                <span>
                                  ⚠ Low contrast (
                                  {getContrastRatio(
                                    currentBot.appearance.botBubbleColor,
                                    currentBot.appearance.botTextColor,
                                  ).toFixed(1)}
                                  :1). Consider darker text or lighter bubble.
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Bubble Settings */}
                          <div className="space-y-6">
                            <div className="space-y-3">
                              <Label className="text-sm font-medium">
                                Bubble Corner Radius: {currentBot.appearance.cornerRadius}px
                              </Label>
                              <Slider
                                value={[currentBot.appearance.cornerRadius]}
                                onChange={([value]) =>
                                  updateCurrentBot({
                                    appearance: { ...currentBot.appearance, cornerRadius: value },
                                  })
                                }
                                max={24}
                                min={4}
                                step={2}
                                className="w-full"
                              />
                            </div>
                            <div className="space-y-3">
                              <Label className="text-sm font-medium">Message Spacing</Label>
                              <Select
                                value={currentBot.appearance.messageSpacing}
                                onChange={(value: "compact" | "cozy" | "roomy") =>
                                  updateCurrentBot({
                                    appearance: { ...currentBot.appearance, messageSpacing: value },
                                  })
                                }
                              >
                                <SelectTrigger className="bg-background/50 border-border/50 focus:border-[#8b5cf6] focus:ring-2 focus:ring-[#8b5cf6]/20 transition-all duration-180">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="compact">Compact</SelectItem>
                                  <SelectItem value="cozy">Cozy</SelectItem>
                                  <SelectItem value="roomy">Roomy</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Widget Settings Card */}
                      <Card className="bg-white/5 backdrop-blur-xl border-white/10 shadow-2xl hover:shadow-3xl transition-all duration-180 ease-out">
                        <CardHeader className="pb-6">
                          <CardTitle className="flex items-center space-x-3 text-xl">
                            <Settings className="h-6 w-6 text-[#8b5cf6]" />
                            <span className="bg-gradient-to-r from-[#8b5cf6] to-blue-600 bg-clip-text text-transparent">
                              Widget Settings
                            </span>
                          </CardTitle>
                          <CardDescription className="text-base">Configure chat widget behavior</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          <div className="space-y-3">
                            <Label className="text-sm font-medium">Chat Avatar URL</Label>
                            <Input
                              value={currentBot.appearance.chatAvatar}
                              onChange={(e) =>
                                updateCurrentBot({
                                  appearance: { ...currentBot.appearance, chatAvatar: e.target.value },
                                })
                              }
                              placeholder="https://example.com/avatar.png"
                              className="bg-background/50 border-border/50 focus:border-[#8b5cf6] focus:ring-2 focus:ring-[#8b5cf6]/20 transition-all duration-180"
                            />
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full bg-background/50 hover:bg-[#8b5cf6]/10 transition-all duration-180"
                            >
                              <Upload className="h-4 w-4 mr-2" />
                              Upload Image
                            </Button>
                          </div>
                          <div className="space-y-3">
                            <Label className="text-sm font-medium">Bot Name</Label>
                            <Input
                              value={currentBot.appearance.botName}
                              onChange={(e) =>
                                updateCurrentBot({
                                  appearance: { ...currentBot.appearance, botName: e.target.value },
                                })
                              }
                              placeholder="Assistant"
                              className="bg-background/50 border-border/50 focus:border-[#8b5cf6] focus:ring-2 focus:ring-[#8b5cf6]/20 transition-all duration-180"
                            />
                          </div>
                          <div className="space-y-6">
                            <div className="flex items-center justify-between p-4 bg-muted/20 rounded-xl hover:bg-muted/30 transition-all duration-180">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-[#8b5cf6]/20 rounded-full flex items-center justify-center">
                                  <Eye className="h-4 w-4 text-[#8b5cf6]" />
                                </div>
                                <div>
                                  <Label className="text-sm font-medium">Show Typing Indicator</Label>
                                  <p className="text-xs text-muted-foreground">
                                    Display animated dots when bot is typing
                                  </p>
                                </div>
                              </div>
                              <div className="relative">
                                <Switch
                                  checked={currentBot.appearance.showTypingIndicator}
                                  onChange={(checked) =>
                                    updateCurrentBot({
                                      appearance: { ...currentBot.appearance, showTypingIndicator: checked },
                                    })
                                  }
                                  className="data-[state=checked]:bg-[#8b5cf6] transition-all duration-180"
                                />
                              </div>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-muted/20 rounded-xl hover:bg-muted/30 transition-all duration-180">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-[#8b5cf6]/20 rounded-full flex items-center justify-center">
                                  <Bot className="h-4 w-4 text-[#8b5cf6]" />
                                </div>
                                <div>
                                  <Label className="text-sm font-medium">Show Launcher Button</Label>
                                  <p className="text-xs text-muted-foreground">
                                    Display floating chat button on website
                                  </p>
                                </div>
                              </div>
                              <div className="relative">
                                <Switch
                                  checked={currentBot.appearance.showLauncher}
                                  onChange={(checked) =>
                                    updateCurrentBot({
                                      appearance: { ...currentBot.appearance, showLauncher: checked },
                                    })
                                  }
                                  className="data-[state=checked]:bg-[#8b5cf6] transition-all duration-180"
                                />
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Live Preview with Glassmorphism and Gradient Halo */}
                    <div className="lg:sticky lg:top-6">
                      <div className="relative">
                        {/* Dual Gradient Halo */}
                        <div className="absolute -inset-6 opacity-60 transition-all duration-220">
                          <div className="absolute inset-0 bg-gradient-radial from-[#8b5cf6]/30 via-transparent to-transparent rounded-3xl blur-2xl"></div>
                          <div className="absolute inset-0 bg-gradient-radial from-blue-500/20 via-transparent to-transparent rounded-3xl blur-xl"></div>
                        </div>

                        <Card
                          className="relative bg-white/5 backdrop-blur-xl border-white/10 shadow-2xl hover:shadow-3xl transition-all duration-180 ease-out preview-container"
                          style={
                            {
                              "--glass-surface": "rgba(255,255,255,0.06)",
                              "--glass-border": "rgba(255,255,255,0.14)",
                              "--glass-blur": "16px",
                              "--glass-shadow": "0 12px 30px rgba(0,0,0,.40)",
                              "--glass-inset": "inset 0 1px 0 rgba(255,255,255,.06)",
                              "--bubble-glass": "linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.02))",
                              "--bubble-border": "rgba(255,255,255,.12)",
                              "--cc-off-x": `${currentBot.position.offsetX}px`,
                              "--cc-off-y": `${currentBot.position.offsetY}px`,
                              "--cc-z": currentBot.position.zIndex.toString(),
                              "--cc-m-off-x": `${currentBot.position.mobileOffsetX}px`,
                              "--cc-m-off-y": `${currentBot.position.mobileOffsetY}px`,
                            } as React.CSSProperties
                          }
                        >
                          <CardHeader className="pb-6">
                            <CardTitle className="flex items-center space-x-3 text-xl">
                              <Eye className="h-6 w-6 text-[#8b5cf6]" />
                              <span className="bg-gradient-to-r from-[#8b5cf6] to-blue-600 bg-clip-text text-transparent">
                                Live Preview
                              </span>
                            </CardTitle>
                            <CardDescription className="text-base">See how your bot will look to users</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div
                              className="border rounded-2xl p-6 transition-all duration-180"
                              style={{
                                background: `linear-gradient(135deg, ${currentBot.appearance.backgroundColor}10, ${currentBot.appearance.primaryColor}05)`,
                              }}
                            >
                              <div
                                className={`w-full max-w-sm mx-auto rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-3xl cc-widget-root cc-pos-${currentBot.position.corner} ${currentBot.position.mobileOverride ? "cc-use-mobile" : ""}`}
                                style={
                                  {
                                    backgroundColor: "var(--glass-surface)",
                                    backdropFilter: "blur(var(--glass-blur)) saturate(140%)",
                                    border: "1px solid var(--glass-border)",
                                    boxShadow: "var(--glass-shadow), var(--glass-inset)",
                                    borderRadius: "18px",
                                    "--cc-bg": currentBot.appearance.backgroundColor,
                                    "--cc-primary": currentBot.appearance.primaryColor,
                                    "--cc-bot-bubble": currentBot.appearance.botBubbleColor,
                                    "--cc-bot-text": currentBot.appearance.botTextColor,
                                    "--cc-user-bubble": currentBot.appearance.userBubbleColor,
                                    "--cc-user-text": currentBot.appearance.userTextColor,
                                    "--cc-radius": `${currentBot.appearance.cornerRadius}px`,
                                  } as React.CSSProperties
                                }
                              >
                                {/* Header with Glassmorphism */}
                                <div
                                  className="p-4 text-white shadow-lg"
                                  style={{
                                    background: `linear-gradient(180deg, ${currentBot.appearance.primaryColor}, ${currentBot.appearance.primaryColor}dd)`,
                                    backdropFilter: "blur(var(--glass-blur)) saturate(140%)",
                                    border: "1px solid var(--glass-border)",
                                    boxShadow: "var(--glass-inset)",
                                    borderRadius: "16px 16px 0 0",
                                  }}
                                >
                                  <div className="flex items-center space-x-3">
                                    {currentBot.appearance.chatAvatar ? (
                                      <img
                                        src={currentBot.appearance.chatAvatar || "/placeholder.svg"}
                                        alt="Bot"
                                        className="w-8 h-8 rounded-full border-2 border-white/20"
                                      />
                                    ) : (
                                      <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                                        <Bot className="h-4 w-4" />
                                      </div>
                                    )}
                                    <div>
                                      <h4 className="font-semibold text-sm">{currentBot.appearance.botName}</h4>
                                      <div className="flex items-center space-x-1">
                                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                        <span className="text-xs opacity-90">Online</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {/* Messages with Glassmorphism Bubbles */}
                                <div
                                  className="p-4 h-80 overflow-y-auto"
                                  style={{
                                    background: `linear-gradient(to bottom, transparent, ${currentBot.appearance.backgroundColor}05)`,
                                    gap: getMessageSpacingValue(currentBot.appearance.messageSpacing),
                                  }}
                                >
                                  <div className="space-y-4">
                                    {/* Bot Message 1 */}
                                    <div className="flex justify-start">
                                      <div
                                        className="max-w-xs px-4 py-3 rounded-2xl shadow-sm animate-in slide-in-from-left-2 duration-300"
                                        style={{
                                          backgroundColor: currentBot.appearance.botBubbleColor,
                                          backgroundImage: "var(--bubble-glass)",
                                          color: currentBot.appearance.botTextColor,
                                          borderRadius: `${currentBot.appearance.cornerRadius}px`,
                                          fontSize: getFontSizeValue(currentBot.appearance.fontStack),
                                          marginBottom: getMessageSpacingValue(currentBot.appearance.messageSpacing),
                                          border: "1px solid var(--bubble-border)",
                                          boxShadow: "var(--glass-inset)",
                                        }}
                                      >
                                        {getLocalizedText(currentBot.localization.language, "welcome")}
                                      </div>
                                    </div>

                                    {/* User Message 1 */}
                                    <div className="flex justify-end">
                                      <div
                                        className="max-w-xs px-4 py-3 rounded-2xl shadow-sm animate-in slide-in-from-right-2 duration-300"
                                        style={{
                                          backgroundColor: currentBot.appearance.userBubbleColor,
                                          backgroundImage: "var(--bubble-glass)",
                                          color: currentBot.appearance.userTextColor,
                                          borderRadius: `${currentBot.appearance.cornerRadius}px`,
                                          fontSize: getFontSizeValue(currentBot.appearance.fontStack),
                                          marginBottom: getMessageSpacingValue(currentBot.appearance.messageSpacing),
                                          border: "1px solid var(--bubble-border)",
                                          boxShadow: "var(--glass-inset)",
                                        }}
                                      >
                                        How do I install the widget?
                                      </div>
                                    </div>

                                    {/* Bot Message 2 - Dynamic based on behavior settings */}
                                    <div className="flex justify-start">
                                      <div
                                        className="max-w-xs px-4 py-3 rounded-2xl shadow-sm animate-in slide-in-from-left-2 duration-300 whitespace-pre-line"
                                        style={{
                                          backgroundColor: currentBot.appearance.botBubbleColor,
                                          backgroundImage: "var(--bubble-glass)",
                                          color: currentBot.appearance.botTextColor,
                                          borderRadius: `${currentBot.appearance.cornerRadius}px`,
                                          fontSize: getFontSizeValue(currentBot.appearance.fontStack),
                                          marginBottom: getMessageSpacingValue(currentBot.appearance.messageSpacing),
                                          border: "1px solid var(--bubble-border)",
                                          boxShadow: "var(--glass-inset)",
                                        }}
                                      >
                                        {generateBotResponse("How do I install the widget?", currentBot)}
                                      </div>
                                    </div>

                                    {/* Quick Action Buttons */}
                                    <div className="flex justify-start">
                                      <div className="space-y-2">
                                        {currentBot.integrations.booking.bookingUrl && (
                                          <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={handleBookingOpen}
                                            className="bg-white/10 border-white/20 text-white hover:bg-white/20 transition-all duration-180"
                                          >
                                            <Calendar className="h-4 w-4 mr-2" />
                                            Book Appointment
                                          </Button>
                                        )}
                                        {currentBot.integrations.orders.requireIdentity && (
                                          <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setShowOrderForm(true)}
                                            className="bg-white/10 border-white/20 text-white hover:bg-white/20 transition-all duration-180 ml-2"
                                          >
                                            <Package className="h-4 w-4 mr-2" />
                                            Track Order
                                          </Button>
                                        )}
                                      </div>
                                    </div>

                                    {/* Typing Indicator */}
                                    {currentBot.appearance.showTypingIndicator && (
                                      <div className="flex justify-start">
                                        <div
                                          className="px-4 py-3 rounded-2xl flex space-x-1 shadow-sm"
                                          style={{
                                            backgroundColor: currentBot.appearance.botBubbleColor,
                                            backgroundImage: "var(--bubble-glass)",
                                            borderRadius: `${currentBot.appearance.cornerRadius}px`,
                                            border: "1px solid var(--bubble-border)",
                                            boxShadow: "var(--glass-inset)",
                                          }}
                                        >
                                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                          <div
                                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                            style={{ animationDelay: "0.1s" }}
                                          ></div>
                                          <div
                                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                            style={{ animationDelay: "0.2s" }}
                                          ></div>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </div>

                                {/* Input with Glassmorphism */}
                                <div
                                  className="p-4"
                                  style={{
                                    backgroundColor: "var(--glass-surface)",
                                    backdropFilter: "blur(var(--glass-blur)) saturate(140%)",
                                    border: "1px solid var(--glass-border)",
                                    boxShadow: "var(--glass-inset)",
                                  }}
                                >
                                  <div className="flex space-x-3">
                                    <Input
                                      placeholder="Type a message..."
                                      className="flex-1 text-sm border-border/50 transition-all duration-180 focus:ring-2 focus:ring-primary/20"
                                      style={{
                                        borderRadius: `${currentBot.appearance.cornerRadius}px`,
                                        fontSize: getFontSizeValue(currentBot.appearance.fontStack),
                                        backgroundColor: "var(--glass-surface)",
                                        backdropFilter: "blur(var(--glass-blur)) saturate(140%)",
                                        border: "1px solid var(--glass-border)",
                                      }}
                                    />
                                    <Button
                                      size="sm"
                                      className="shadow-sm transition-all duration-180 hover:scale-105"
                                      style={{
                                        backgroundColor: currentBot.appearance.primaryColor,
                                        borderRadius: `${currentBot.appearance.cornerRadius}px`,
                                      }}
                                    >
                                      Send
                                    </Button>
                                  </div>
                                </div>

                                {/* Branding Banner - Moved below input */}
                                {currentBot.branding.showBranding && currentBot.settings.plan === "launch" && (
                                  <div
                                    className="cc-branding px-4 py-2 text-center border-t"
                                    style={{
                                      borderTop: "1px solid var(--glass-border)",
                                      fontSize: "12px",
                                      opacity: 0.92,
                                      backgroundColor: "var(--glass-surface)",
                                      backdropFilter: "blur(var(--glass-blur)) saturate(140%)",
                                    }}
                                    aria-label="Powered by ChatCura.com"
                                  >
                                    Powered by{" "}
                                    <a
                                      className="cc-branding-link font-medium hover:underline transition-colors"
                                      href={setBrandingLinkHref({
                                        baseUrl: currentBot.branding.brandingUrl,
                                        botId: currentBot.id,
                                        plan: currentBot.settings.plan,
                                        position: currentBot.position.corner,
                                      })}
                                      target="_blank"
                                      rel="noreferrer noopener"
                                      style={{ color: currentBot.appearance.primaryColor }}
                                    >
                                      ChatCura.com
                                    </a>
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Settings Caption */}
                            <div className="mt-4 text-center">
                              <p className="text-xs text-muted-foreground">
                                Temp: {currentBot.llmControls.temperature} • Top-p: {currentBot.llmControls.topP} • Max:{" "}
                                {currentBot.llmControls.maxTokens}
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeView === "embed" && currentBot && (
                <div className="p-8">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h2 className="text-4xl font-bold bg-gradient-to-r from-[#8b5cf6] to-blue-600 bg-clip-text text-transparent">
                        Embed & Install
                      </h2>
                      <p className="text-muted-foreground mt-2 text-lg">Generate embed code for your website</p>
                    </div>
                    <Button
                      onClick={copyEmbedCode}
                      className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-lg hover:shadow-xl transition-all duration-180 ease-out"
                    >
                      {copySuccess ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                      {copySuccess ? "Copied!" : "Copy Code"}
                    </Button>
                  </div>

                  <div className="grid lg:grid-cols-2 gap-8">
                    <div className="space-y-8">
                      <Card className="bg-white/5 backdrop-blur-xl border-white/10 shadow-2xl hover:shadow-3xl transition-all duration-180 ease-out">
                        <CardHeader className="pb-6">
                          <CardTitle className="flex items-center space-x-3 text-xl">
                            <Code className="h-6 w-6 text-[#8b5cf6]" />
                            <span className="bg-gradient-to-r from-[#8b5cf6] to-blue-600 bg-clip-text text-transparent">
                              Embed Configuration
                            </span>
                          </CardTitle>
                          <CardDescription className="text-base">Configure your embed settings</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          <div className="space-y-3">
                            <Label className="text-sm font-medium">Bot ID</Label>
                            <Input
                              value={currentBot.id}
                              readOnly
                              className="font-mono text-sm bg-muted/50 border-border/50"
                            />
                          </div>
                          <div className="space-y-3">
                            <Label className="text-sm font-medium">Domain Allowlist (comma-separated)</Label>
                            <Input
                              placeholder="example.com, app.example.com"
                              className="bg-background/50 border-border/50 focus:border-[#8b5cf6] focus:ring-2 focus:ring-[#8b5cf6]/20 transition-all duration-180"
                            />
                            <p className="text-xs text-muted-foreground">Leave empty to allow all domains</p>
                          </div>
                          <div className="space-y-3">
                            <Label className="text-sm font-medium">Theme Override (JSON)</Label>
                            <Textarea
                              placeholder='{"primaryColor": "#8b5cf6"}'
                              rows={4}
                              className="font-mono text-sm bg-background/50 border-border/50 focus:border-[#8b5cf6] focus:ring-2 focus:ring-[#8b5cf6]/20 transition-all duration-180"
                            />
                            <p className="text-xs text-muted-foreground">Optional JSON to override theme settings</p>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="bg-white/5 backdrop-blur-xl border-white/10 shadow-2xl hover:shadow-3xl transition-all duration-180 ease-out">
                        <CardHeader className="pb-6">
                          <CardTitle className="flex items-center space-x-3 text-xl">
                            <FileText className="h-6 w-6 text-[#8b5cf6]" />
                            <span className="bg-gradient-to-r from-[#8b5cf6] to-blue-600 bg-clip-text text-transparent">
                              Installation Steps
                            </span>
                          </CardTitle>
                          <CardDescription className="text-base">How to add the bot to your website</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-6">
                            <div className="flex items-start space-x-4 p-4 bg-gradient-to-r from-[#8b5cf6]/5 to-blue-500/5 rounded-xl border border-[#8b5cf6]/10 hover:border-[#8b5cf6]/20 transition-all duration-180">
                              <div className="w-8 h-8 bg-gradient-to-r from-[#8b5cf6] to-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold shadow-lg">
                                1
                              </div>
                              <div>
                                <h4 className="font-semibold text-base">Copy the embed code</h4>
                                <p className="text-sm text-muted-foreground mt-1">Use the "Copy Code" button above</p>
                              </div>
                            </div>
                            <div className="flex items-start space-x-4 p-4 bg-gradient-to-r from-[#8b5cf6]/5 to-blue-500/5 rounded-xl border border-[#8b5cf6]/10 hover:border-[#8b5cf6]/20 transition-all duration-180">
                              <div className="w-8 h-8 bg-gradient-to-r from-[#8b5cf6] to-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold shadow-lg">
                                2
                              </div>
                              <div>
                                <h4 className="font-semibold text-base">Paste before closing &lt;/body&gt; tag</h4>
                                <p className="text-sm text-muted-foreground mt-1">
                                  Add the code to your website's HTML
                                </p>
                              </div>
                            </div>
                            <div className="flex items-start space-x-4 p-4 bg-gradient-to-r from-[#8b5cf6]/5 to-blue-500/5 rounded-xl border border-[#8b5cf6]/10 hover:border-[#8b5cf6]/20 transition-all duration-180">
                              <div className="w-8 h-8 bg-gradient-to-r from-[#8b5cf6] to-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold shadow-lg">
                                3
                              </div>
                              <div>
                                <h4 className="font-semibold text-base">Test the integration</h4>
                                <p className="text-sm text-muted-foreground mt-1">
                                  Visit your website to see the chat widget
                                </p>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="space-y-8">
                      <Card className="bg-white/5 backdrop-blur-xl border-white/10 shadow-2xl hover:shadow-3xl transition-all duration-180 ease-out">
                        <CardHeader className="pb-6">
                          <CardTitle className="flex items-center space-x-3 text-xl">
                            <Code className="h-6 w-6 text-[#8b5cf6]" />
                            <span className="bg-gradient-to-r from-[#8b5cf6] to-blue-600 bg-clip-text text-transparent">
                              Embed Code
                            </span>
                          </CardTitle>
                          <CardDescription className="text-base">Copy this code to your website</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="relative">
                            <pre className="bg-black/20 backdrop-blur-sm p-6 rounded-xl text-sm overflow-x-auto border border-border/50 max-h-96 hover:border-[#8b5cf6]/30 transition-all duration-180">
                              <code className="text-gray-300 dark:text-gray-300 leading-relaxed">{embedCode}</code>
                            </pre>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={copyEmbedCode}
                              className="absolute top-3 right-3 bg-black/40 backdrop-blur-sm hover:bg-[#8b5cf6]/20 border-white/10 hover:border-[#8b5cf6]/30 transition-all duration-180"
                            >
                              {copySuccess ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Example Preview */}
                      <Card className="bg-white/5 backdrop-blur-xl border-white/10 shadow-2xl hover:shadow-3xl transition-all duration-180 ease-out">
                        <CardHeader className="pb-6">
                          <CardTitle className="flex items-center space-x-3 text-xl">
                            <Eye className="h-6 w-6 text-[#8b5cf6]" />
                            <span className="bg-gradient-to-r from-[#8b5cf6] to-blue-600 bg-clip-text text-transparent">
                              Example Preview
                            </span>
                          </CardTitle>
                          <CardDescription className="text-base">
                            How the widget will appear on your site
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="p-6 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 rounded-xl border border-border/50">
                            <div className="flex justify-end">
                              {currentBot.appearance.showLauncher && (
                                <div
                                  className="w-14 h-14 rounded-full shadow-2xl flex items-center justify-center cursor-pointer hover:scale-110 transition-all duration-180 animate-pulse"
                                  style={{ backgroundColor: currentBot.appearance.primaryColor }}
                                >
                                  <Bot className="h-6 w-6 text-white" />
                                </div>
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground text-center mt-4">
                              Widget will appear as a floating button in the {currentBot.position.corner} corner
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              )}

              {activeView === "settings" && currentBot && (
                <div className="p-6 space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                        Bot Settings
                      </h2>
                      <p className="text-muted-foreground mt-1">Configure advanced bot settings and preferences</p>
                    </div>
                    <Button
                      onClick={() => {
                        updateCurrentBot(currentBot)
                        toast({
                          title: "Settings saved",
                          description: "Your bot settings have been updated",
                        })
                      }}
                      className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Save Settings
                    </Button>
                  </div>

                  <div className="grid lg:grid-cols-2 gap-6">
                    <div className="space-y-6">
                      <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-lg">
                        <CardHeader>
                          <CardTitle className="flex items-center space-x-2">
                            <Settings className="h-5 w-5 text-primary" />
                            <span>Bot Status</span>
                          </CardTitle>
                          <CardDescription>Control your bot's availability</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                            <div>
                              <Label>Status</Label>
                              <p className="text-sm text-muted-foreground">
                                {currentBot.settings.status === "live"
                                  ? "Bot is live and responding"
                                  : "Bot is in draft mode"}
                              </p>
                            </div>
                            <Switch
                              checked={currentBot.settings.status === "live"}
                              onChange={(checked) =>
                                updateCurrentBot({
                                  settings: { ...currentBot.settings, status: checked ? "live" : "draft" },
                                })
                              }
                            />
                          </div>
                          <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                            <div>
                              <Label>Visibility</Label>
                              <p className="text-sm text-muted-foreground">
                                {currentBot.settings.visibility === "public"
                                  ? "Available to all domains"
                                  : "Restricted to allowlisted domains"}
                              </p>
                            </div>
                            <Switch
                              checked={currentBot.settings.visibility === "public"}
                              onChange={(checked) =>
                                updateCurrentBot({
                                  settings: { ...currentBot.settings, visibility: checked ? "public" : "private" },
                                })
                              }
                            />
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-lg">
                        <CardHeader>
                          <CardTitle className="flex items-center space-x-2">
                            <CreditCard className="h-5 w-5 text-primary" />
                            <span>Plan & Billing</span>
                          </CardTitle>
                          <CardDescription>Manage your subscription plan</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-3">
                            <Label>Current Plan</Label>
                            <Select
                              value={currentBot.settings.plan}
                              onChange={(value: "launch" | "scale" | "custom") =>
                                updateCurrentBot({
                                  settings: { ...currentBot.settings, plan: value },
                                })
                              }
                            >
                              <SelectTrigger className="bg-background/50 border-border/50 focus:border-primary">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="launch">Launch</SelectItem>
                                <SelectItem value="scale">Scale</SelectItem>
                                <SelectItem value="custom">Custom Build</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="p-3 bg-muted/20 rounded-lg">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium">Plan Features:</span>
                              <Badge variant={currentBot.settings.plan === "launch" ? "secondary" : "default"}>
                                {currentBot.settings.plan === "launch" && "Branding On"}
                                {currentBot.settings.plan === "scale" && "No Branding"}
                                {currentBot.settings.plan === "custom" && "No Branding"}
                              </Badge>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Snippets Card */}
                      <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-lg">
                        <CardHeader>
                          <CardTitle className="flex items-center space-x-2">
                            <FileText className="h-5 w-5 text-primary" />
                            <span>Saved Replies & Snippets</span>
                          </CardTitle>
                          <CardDescription>Quick responses for common questions</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-3">
                            {currentBot.snippets.map((snippet) => (
                              <div key={snippet.id} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                                <div className="flex-1">
                                  <Input
                                    value={snippet.title}
                                    onChange={(e) => updateSnippet(snippet.id, { title: e.target.value })}
                                    className="font-medium mb-2 bg-background/50 border-border/50"
                                  />
                                  <Textarea
                                    value={snippet.content}
                                    onChange={(e) => updateSnippet(snippet.id, { content: e.target.value })}
                                    rows={2}
                                    className="text-sm bg-background/50 border-border/50 resize-none"
                                  />
                                </div>
                                <div className="flex space-x-2 ml-3">
                                  <Button variant="outline" size="sm" className="bg-transparent">
                                    Insert
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => deleteSnippet(snippet.id)}
                                    className="text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 bg-transparent"
                                  >
                                    <Trash className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                          <Button onClick={addSnippet} variant="outline" className="w-full bg-background/50">
                            <Plus className="h-4 w-4 mr-2" />
                            Add Snippet
                          </Button>
                        </CardContent>
                      </Card>

                      {/* Privacy Card */}
                      <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-lg">
                        <CardHeader>
                          <CardTitle className="flex items-center space-x-2">
                            <Shield className="h-5 w-5 text-primary" />
                            <span>Privacy & GDPR</span>
                          </CardTitle>
                          <CardDescription>Data protection and privacy controls</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                            <div>
                              <Label>GDPR Mode</Label>
                              <p className="text-sm text-muted-foreground">Enhanced privacy protection</p>
                            </div>
                            <Switch
                              checked={currentBot.privacy.gdprMode}
                              onChange={(checked) =>
                                updateCurrentBot({
                                  privacy: { ...currentBot.privacy, gdprMode: checked },
                                })
                              }
                            />
                          </div>
                          
                          {currentBot.privacy.gdprMode && (
                            <div className="space-y-3">
                              <Button onClick={purgeGDPRData} variant="outline" className="w-full bg-background/50">
                                <Trash className="h-4 w-4 mr-2" />
                                Purge PII Data
                              </Button>
                              <Button onClick={redactTranscripts} variant="outline" className="w-full bg-background/50">
                                <Shield className="h-4 w-4 mr-2" />
                                Redact Transcripts
                              </Button>
                            </div>
                          )}
                        </CardContent>
                      </Card>

                      {/* Analytics Card */}
                      <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-lg">
                        <CardHeader>
                          <CardTitle className="flex items-center space-x-2">
                            <BarChart3 className="h-5 w-5 text-primary" />
                            <span>Analytics</span>
                          </CardTitle>
                          <CardDescription>Track bot performance and usage</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                            <div>
                              <Label>Enable Analytics</Label>
                              <p className="text-sm text-muted-foreground">Track key metrics and user behavior</p>
                            </div>
                            <Switch
                              checked={currentBot.analytics.enabled}
                              onChange={(checked) =>
                                updateCurrentBot({
                                  analytics: { ...currentBot.analytics, enabled: checked },
                                })
                              }
                            />
                          </div>\
                        </
