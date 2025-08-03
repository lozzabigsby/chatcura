"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Save, Eye, Upload, X } from "lucide-react"
import ChatbotPreview from "../chatbot-preview"
import ColourCustomiser from "../color-customizer"

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
}

export default function BotPlayground() {
  const [config, setConfig] = useState<BotConfig>({
    id: Date.now().toString(),
    name: "My Chatbot",
    description: "A helpful AI assistant",
    personality: "Friendly and professional",
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
  })

  const [activeTab, setActiveTab] = useState("basic")
  const [isSaving, setIsSaving] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleSave = async () => {
    setIsSaving(true)
    // Save logic here
    setTimeout(() => {
      setIsSaving(false)
      alert("Bot configuration saved successfully!")
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Bot Playground</h2>
          <p className="text-muted-foreground">Test and configure your chatbot in real-time</p>
        </div>
        <Button onClick={handleSave} disabled={isSaving}>
          <Save className="h-4 w-4 mr-2" />
          {isSaving ? "Saving..." : "Save Configuration"}
        </Button>
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
    </div>
  )
}
