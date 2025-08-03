"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Save, Eye, Code } from "lucide-react"
import ChatbotPreview from "./chatbot-preview"
import ColorCustomizer from "./color-customizer"

interface BotConfig {
  id: string
  name: string
  description: string
  personality: string
  welcomeMessage: string
  fallbackMessage: string
  systemPrompt: string
  dataSource: "text" | "file" | "url"
  dataContent: string
  enableMemory: boolean
  contextAwareness: boolean
  allowFileUploads: boolean
  enableSearch: boolean
  colors: {
    userBubble: string
    botBubble: string
    userText: string
    botText: string
    background: string
    chatBackground: string
  }
}

interface BotBuilderProps {
  botId: string | null
  onBack: () => void
}

export default function BotBuilder({ botId, onBack }: BotBuilderProps) {
  const [config, setConfig] = useState<BotConfig>({
    id: botId || Date.now().toString(),
    name: "",
    description: "",
    personality: "",
    welcomeMessage: "Hello! How can I help you today?",
    fallbackMessage: "I'm sorry, I didn't understand that. Could you please rephrase?",
    systemPrompt: "You are a helpful AI assistant.",
    dataSource: "text",
    dataContent: "",
    enableMemory: true,
    contextAwareness: true,
    allowFileUploads: false,
    enableSearch: false,
    colors: {
      userBubble: "#6E48FF",
      botBubble: "#F1F5F9",
      userText: "#FFFFFF",
      botText: "#1E293B",
      background: "#FFFFFF",
      chatBackground: "#F8FAFC",
    },
  })

  const [activeTab, setActiveTab] = useState("basic")
  const [isSaving, setIsSaving] = useState(false)

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
            colors: existingBot.colors || prev.colors,
          }))
        }
      }
    }
  }, [botId])

  const handleSave = async () => {
    setIsSaving(true)

    // Save to localStorage (in production, save to database)
    const savedBots = localStorage.getItem("chatcura_bots")
    const bots = savedBots ? JSON.parse(savedBots) : []

    const botData = {
      ...config,
      lastModified: new Date().toISOString().split("T")[0],
      status: config.name ? "active" : "draft",
    }

    const existingIndex = bots.findIndex((bot: any) => bot.id === config.id)
    if (existingIndex >= 0) {
      bots[existingIndex] = botData
    } else {
      bots.push({
        ...botData,
        createdAt: new Date().toISOString().split("T")[0],
        messageCount: 0,
      })
    }

    localStorage.setItem("chatcura_bots", JSON.stringify(bots))

    setTimeout(() => {
      setIsSaving(false)
    }, 1000)
  }

  const generateEmbedCode = () => {
    const embedCode = `<iframe
  src="https://chatcura.com/embed/${config.id}"
  width="400"
  height="600"
  frameborder="0"
  style="border-radius: 10px; box-shadow: 0 4px 20px rgba(0,0,0,0.1);"
></iframe>`

    navigator.clipboard.writeText(embedCode)
    alert("Embed code copied to clipboard!")
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Bots
          </Button>
          <div>
            <h2 className="text-3xl font-bold">{botId ? "Edit Bot" : "Create New Bot"}</h2>
            <p className="text-muted-foreground">{config.name || "Untitled Bot"}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={generateEmbedCode}>
            <Code className="h-4 w-4 mr-2" />
            Get Embed Code
          </Button>
          <Button onClick={handleSave} disabled={isSaving}>
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
              <TabsTrigger value="behavior">Behavior</TabsTrigger>
              <TabsTrigger value="data">Data</TabsTrigger>
              <TabsTrigger value="style">Style</TabsTrigger>
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
                      value={config.name}
                      onChange={(e) => setConfig((prev) => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Brief description of what this bot does"
                      value={config.description}
                      onChange={(e) => setConfig((prev) => ({ ...prev, description: e.target.value }))}
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

            <TabsContent value="behavior" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Messages & Behavior</CardTitle>
                  <CardDescription>Customize how your bot communicates</CardDescription>
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
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Features</CardTitle>
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

            <TabsContent value="data" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Data Source</CardTitle>
                  <CardDescription>Configure your bot's knowledge base</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Data Source Type</Label>
                    <Select
                      value={config.dataSource}
                      onValueChange={(value: "text" | "file" | "url") =>
                        setConfig((prev) => ({ ...prev, dataSource: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="text">Paste Text</SelectItem>
                        <SelectItem value="file">Upload File</SelectItem>
                        <SelectItem value="url">Input URL</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>
                      {config.dataSource === "text" && "Training Text"}
                      {config.dataSource === "file" && "File Upload"}
                      {config.dataSource === "url" && "Website URL"}
                    </Label>
                    {config.dataSource === "text" && (
                      <Textarea
                        placeholder="Paste your training data here..."
                        className="min-h-[200px]"
                        value={config.dataContent}
                        onChange={(e) => setConfig((prev) => ({ ...prev, dataContent: e.target.value }))}
                      />
                    )}
                    {config.dataSource === "file" && (
                      <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                        <p className="text-muted-foreground">Drag and drop files here or click to browse</p>
                        <Button variant="outline" className="mt-2 bg-transparent">
                          Choose Files
                        </Button>
                      </div>
                    )}
                    {config.dataSource === "url" && (
                      <Input
                        placeholder="https://example.com"
                        value={config.dataContent}
                        onChange={(e) => setConfig((prev) => ({ ...prev, dataContent: e.target.value }))}
                      />
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="style" className="space-y-4">
              <ColorCustomizer
                colors={config.colors}
                onColorsChange={(colors) => setConfig((prev) => ({ ...prev, colors }))}
              />
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
    </div>
  )
}
