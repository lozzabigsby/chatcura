"use client"

import type React from "react"
import { Code } from "lucide-react" // Import Code component

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Save, Eye, Upload, X, FileText, Loader2 } from "lucide-react" // Added FileText, Loader2 icons
import ChatbotPreview from "./chatbot-preview"
import ColourCustomiser from "./color-customizer"

interface BotConfig {
  id: string
  name: string
  description: string
  personality: string
  welcomeMessage: string
  fallbackMessage: string
  systemPrompt: string
  instructions: string
  dataSource: "text" | "file" | "url"
  dataContent: string
  enableMemory: boolean
  contextAwareness: boolean
  allowFileUploads: boolean
  enableSearch: boolean
  headerImage: string | null
  colours: {
    userBubble: string
    botBubble: string
    userText: string
    botText: string
    widgetBackground: string
    chatBackground: string
  }
  trainingDataSource: string | null // Stores file name
  trainingDataContentPreview: string | null // Stores a preview of file content
}

type ActiveView =
  | "chat-logs"
  | "leads"
  | "chats"
  | "topics"
  | "sentiment"
  | "files"
  | "text"
  | "website"
  | "qa"
  | "notion"
  | "available-actions"
  | "integrations"
  | "contacts"
  | "embed"
  | "share"
  | "deploy-integrations"
  | "help-page"
  | "settings"
  | "my-bots"
  | "bot-editor"

interface BotEditorProps {
  botId?: string | null
  onNavigate: (view: "my-bots" | "embed", botId?: string) => void
}

export default function BotEditor({ botId, onNavigate }: BotEditorProps) {
  const [config, setConfig] = useState<BotConfig>({
    id: botId || Date.now().toString(),
    name: "",
    description: "",
    personality: "",
    welcomeMessage: "Hello! How can I help you today?",
    fallbackMessage: "I'm sorry, I didn't understand that. Could you please rephrase?",
    systemPrompt: "You are a helpful AI assistant.",
    instructions: "",
    dataSource: "text",
    dataContent: "",
    enableMemory: true,
    contextAwareness: true,
    allowFileUploads: false,
    enableSearch: false,
    headerImage: null,
    colours: {
      userBubble: "#6E48FF",
      botBubble: "#F1F5F9",
      userText: "#FFFFFF",
      botText: "#1E293B",
      widgetBackground: "#FFFFFF",
      chatBackground: "#F8FAFC",
    },
    trainingDataSource: null,
    trainingDataContentPreview: null,
  })

  const [botName, setBotName] = useState("")
  const [botDescription, setBotDescription] = useState("")
  const [statusMessage, setStatusMessage] = useState("")
  const [activeTab, setActiveTab] = useState("basic")
  const [isSaving, setIsSaving] = useState(false)
  const [isUploadingTrainingData, setIsUploadingTrainingData] = useState(false) // New state for upload loading
  const fileInputRef = useRef<HTMLInputElement>(null)
  const trainingFileInputRef = useRef<HTMLInputElement>(null) // Ref for training file upload

  useEffect(() => {
    if (botId) {
      // Load existing bot configuration
      const savedBots = localStorage.getItem("chatcura_bots")
      if (savedBots) {
        const bots = JSON.parse(savedBots)
        const existingBot = bots.find((bot: any) => bot.id === botId)
        if (existingBot) {
          setConfig((prev) => ({
            ...prev,
            ...existingBot,
            colours: existingBot.colours || prev.colours,
            trainingDataSource: existingBot.trainingDataSource || null,
            trainingDataContentPreview: existingBot.trainingDataContentPreview || null,
          }))
          setBotName(existingBot.name)
          setBotDescription(existingBot.description)
        }
      }
    } else {
      // Reset config for new bot if botId is null
      setConfig({
        id: Date.now().toString(),
        name: "",
        description: "",
        personality: "",
        welcomeMessage: "Hello! How can I help you today?",
        fallbackMessage: "I'm sorry, I didn't understand that. Could you please rephrase?",
        systemPrompt: "You are a helpful AI assistant.",
        instructions: "",
        dataSource: "text",
        dataContent: "",
        enableMemory: true,
        contextAwareness: true,
        allowFileUploads: false,
        enableSearch: false,
        headerImage: null,
        colours: {
          userBubble: "#6E48FF",
          botBubble: "#F1F5F9",
          userText: "#FFFFFF",
          botText: "#1E293B",
          widgetBackground: "#FFFFFF",
          chatBackground: "#F8FAFC",
        },
        trainingDataSource: null,
        trainingDataContentPreview: null,
      })
      setBotName("")
      setBotDescription("")
    }
    setStatusMessage("")
  }, [botId])

  const generateEmbedCode = (id: string) => {
    return `<iframe
  src="https://chatcura.com/embed/${id}"
  width="400"
  height="600"
  frameborder="0"
  style="border-radius: 10px; box-shadow: 0 4px 20px rgba(0,0,0,0.1);"
  title="Chatcura Chatbot"
></iframe>`
  }

  const handleSaveBot = () => {
    if (!botName.trim()) {
      setStatusMessage("Bot name cannot be empty.")
      return
    }

    setIsSaving(true)

    const storedBots = JSON.parse(localStorage.getItem("chatcura_bots") || "[]") as any[]
    const currentBotId = config.id // Use config.id as it's already set for new or existing bots

    const botData = {
      ...config,
      id: currentBotId, // Ensure the ID is consistent
      name: botName,
      description: botDescription,
      lastModified: new Date().toISOString().split("T")[0],
      status: botName ? "active" : "draft", // Set status based on name presence
      embedCode: generateEmbedCode(currentBotId), // Generate embed code on save
    }

    const existingIndex = storedBots.findIndex((bot: any) => bot.id === currentBotId)
    if (existingIndex >= 0) {
      storedBots[existingIndex] = botData
    } else {
      storedBots.push({
        ...botData,
        createdAt: new Date().toISOString().split("T")[0],
        messageCount: 0,
      })
    }

    localStorage.setItem("chatcura_bots", JSON.stringify(storedBots))

    setTimeout(() => {
      setIsSaving(false)
      setStatusMessage("Bot saved successfully!")
      onNavigate("embed", currentBotId) // Navigate to embed section with the saved bot's ID
    }, 1000)
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setConfig((prev) => ({
          ...prev,
          headerImage: e.target?.result as string,
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const removeHeaderImage = () => {
    setConfig((prev) => ({
      ...prev,
      headerImage: null,
    }))
  }

  const handleTrainingFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setIsUploadingTrainingData(true)
      const reader = new FileReader()

      reader.onload = (e) => {
        const fileContent = e.target?.result as string
        const contentPreview = fileContent.substring(0, 500) + (fileContent.length > 500 ? "..." : "") // Take first 500 chars

        setConfig((prev) => ({
          ...prev,
          trainingDataSource: file.name,
          trainingDataContentPreview: contentPreview,
        }))
        setTimeout(() => {
          setIsUploadingTrainingData(false)
          setStatusMessage(`File "${file.name}" uploaded and content preview loaded.`)
        }, 1500) // Simulate upload time
      }

      reader.onerror = () => {
        setIsUploadingTrainingData(false)
        setStatusMessage("Failed to read file.")
      }

      // Read as text for text-based files, or as Data URL for others if needed
      if (file.type.startsWith("text/") || file.type === "application/pdf") {
        reader.readAsText(file)
      } else {
        // For other file types, you might just store the name or a base64 representation
        reader.readAsDataURL(file)
      }
    }
  }

  const removeTrainingFile = () => {
    setConfig((prev) => ({
      ...prev,
      trainingDataSource: null,
      trainingDataContentPreview: null,
    }))
    setStatusMessage("Training file removed.")
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={() => onNavigate("my-bots")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Bots
          </Button>
          <div>
            <h2 className="text-3xl font-bold">{botId ? "Edit Bot" : "Create New Bot"}</h2>
            <p className="text-muted-foreground">{botName || "Untitled Bot"}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => {
              navigator.clipboard.writeText(generateEmbedCode(config.id))
              setStatusMessage("Embed code copied to clipboard!")
            }}
          >
            <Code className="h-4 w-4 mr-2" />
            Get Embed Code
          </Button>
          <Button onClick={handleSaveBot} disabled={isSaving}>
            <Save className="h-4 w-4 mr-2" />
            {isSaving ? "Saving..." : "Save Bot"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Configuration Panel */}
        <div className="space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="basic">Basic</TabsTrigger>
              <TabsTrigger value="behaviour">Behaviour</TabsTrigger>
              <TabsTrigger value="appearance">Appearance</TabsTrigger>
              <TabsTrigger value="advanced">Advanced</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                  <CardDescription>Configure your bot's basic settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Bot Name</Label>
                    <Input
                      id="name"
                      placeholder="e.g., Customer Support Bot"
                      value={botName}
                      onChange={(e) => setBotName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Brief description of what this bot does"
                      value={botDescription}
                      onChange={(e) => setBotDescription(e.target.value)}
                      rows={4}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="personality">Personality</Label>
                    <Textarea
                      id="personality"
                      placeholder="e.g., Friendly, professional, helpful"
                      value={config.personality}
                      onChange={(e) => setConfig((prev) => ({ ...prev, personality: e.target.value }))}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="behaviour" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Messages & Behaviour</CardTitle>
                  <CardDescription>Customise how your bot communicates</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="welcome">Welcome Message</Label>
                    <Textarea
                      id="welcome"
                      value={config.welcomeMessage}
                      onChange={(e) => setConfig((prev) => ({ ...prev, welcomeMessage: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fallback">Fallback Message</Label>
                    <Textarea
                      id="fallback"
                      value={config.fallbackMessage}
                      onChange={(e) => setConfig((prev) => ({ ...prev, fallbackMessage: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="system">System Prompt</Label>
                    <Textarea
                      id="system"
                      value={config.systemPrompt}
                      onChange={(e) => setConfig((prev) => ({ ...prev, systemPrompt: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="instructions">Bot Instructions</Label>
                    <p className="text-sm text-muted-foreground">
                      Provide detailed instructions on how your bot should behave, talk, and respond to users
                    </p>
                    <Textarea
                      id="instructions"
                      placeholder="e.g., Always be friendly and professional. Use emojis occasionally. Ask follow-up questions to understand user needs better. If someone asks about pricing, always mention our free consultation. Keep responses concise but helpful..."
                      className="min-h-[120px]"
                      value={config.instructions || ""}
                      onChange={(e) => setConfig((prev) => ({ ...prev, instructions: e.target.value }))}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Training Data Upload */}
              <Card>
                <CardHeader>
                  <CardTitle>Upload Training Data</CardTitle>
                  <CardDescription>Upload files to train your chatbot's knowledge base.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {config.trainingDataSource ? (
                    <div className="flex items-center justify-between p-3 border rounded-lg bg-muted/50">
                      <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-primary" />
                        <span className="text-sm font-medium">{config.trainingDataSource}</span>
                      </div>
                      <Button variant="destructive" size="sm" onClick={removeTrainingFile}>
                        <X className="h-4 w-4" />
                        <span className="sr-only">Remove file</span>
                      </Button>
                    </div>
                  ) : (
                    <div
                      className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 transition-colors"
                      onClick={() => trainingFileInputRef.current?.click()}
                    >
                      {isUploadingTrainingData ? (
                        <Loader2 className="h-8 w-8 text-muted-foreground mx-auto mb-2 animate-spin" />
                      ) : (
                        <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                      )}
                      <p className="text-muted-foreground">
                        {isUploadingTrainingData ? "Uploading..." : "Click to upload training file"}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">PDF, TXT, DOCX, CSV (max 5MB)</p>
                    </div>
                  )}
                  <input
                    ref={trainingFileInputRef}
                    type="file"
                    accept=".pdf,.txt,.docx,.csv"
                    onChange={handleTrainingFileUpload}
                    className="hidden"
                    disabled={isUploadingTrainingData}
                  />
                  {config.trainingDataContentPreview && (
                    <div className="space-y-2">
                      <Label>Content Preview</Label>
                      <Textarea
                        value={config.trainingDataContentPreview}
                        readOnly
                        rows={5}
                        className="font-mono text-xs"
                      />
                      <p className="text-xs text-muted-foreground">
                        (This is a preview of the file content. For actual training, a backend is required.)
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="appearance" className="space-y-4">
              {/* Header Image Upload */}
              <Card>
                <CardHeader>
                  <CardTitle>Header Image</CardTitle>
                  <CardDescription>Upload a custom image for your chatbot header</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {config.headerImage ? (
                    <div className="relative">
                      <img
                        src={config.headerImage || "/placeholder.svg"}
                        alt="Header"
                        className="w-full h-32 object-cover rounded-lg border"
                      />
                      <Button
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2"
                        onClick={removeHeaderImage}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div
                      className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 transition-colors"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-muted-foreground">Click to upload header image</p>
                      <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 2MB</p>
                    </div>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </CardContent>
              </Card>

              <ColourCustomiser
                colours={config.colours}
                onColoursChange={(colours) => setConfig((prev) => ({ ...prev, colours }))}
              />
            </TabsContent>

            <TabsContent value="advanced" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Advanced Features</CardTitle>
                  <CardDescription>Enable or disable bot capabilities</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Enable Memory</Label>
                      <p className="text-sm text-muted-foreground">Remember conversation context</p>
                    </div>
                    <Switch
                      checked={config.enableMemory}
                      onCheckedChange={(checked) => setConfig((prev) => ({ ...prev, enableMemory: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Context Awareness</Label>
                      <p className="text-sm text-muted-foreground">Understand conversation flow</p>
                    </div>
                    <Switch
                      checked={config.contextAwareness}
                      onCheckedChange={(checked) => setConfig((prev) => ({ ...prev, contextAwareness: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Allow File Uploads</Label>
                      <p className="text-sm text-muted-foreground">Let users upload files</p>
                    </div>
                    <Switch
                      checked={config.allowFileUploads}
                      onCheckedChange={(checked) => setConfig((prev) => ({ ...prev, allowFileUploads: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Enable Search</Label>
                      <p className="text-sm text-muted-foreground">Search through knowledge base</p>
                    </div>
                    <Switch
                      checked={config.enableSearch}
                      onCheckedChange={(checked) => setConfig((prev) => ({ ...prev, enableSearch: checked }))}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Preview Panel */}
        <div className="lg:sticky lg:top-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Eye className="h-5 w-5 mr-2" />
                Live Preview
              </CardTitle>
              <CardDescription>See how your bot will look and behave</CardDescription>
            </CardHeader>
            <CardContent>
              <ChatbotPreview config={config} />
            </CardContent>
          </Card>
        </div>
      </div>
      {statusMessage && <p className="text-sm text-muted-foreground mt-2 text-center">{statusMessage}</p>}
    </div>
  )
}
