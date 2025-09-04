"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Copy, Check } from "lucide-react"

interface Bot {
  id: string
  name: string
  embedCode: string
}

interface ExportManagerProps {
  initialSelectedBotId?: string | null
}

export default function ExportManager({ initialSelectedBotId }: ExportManagerProps) {
  const [bots, setBots] = useState<Bot[]>([])
  const [selectedBotId, setSelectedBotId] = useState<string | undefined>(initialSelectedBotId || undefined)
  const [embedCode, setEmbedCode] = useState("")
  const [copySuccess, setCopySuccess] = useState(false)

  useEffect(() => {
    const savedBots = localStorage.getItem("chatcura_bots")
    if (savedBots) {
      const parsedBots: Bot[] = JSON.parse(savedBots)
      setBots(parsedBots)

      // If an initial bot ID is provided, select it. Otherwise, select the first bot.
      if (initialSelectedBotId && parsedBots.some((bot) => bot.id === initialSelectedBotId)) {
        setSelectedBotId(initialSelectedBotId)
        const bot = parsedBots.find((b) => b.id === initialSelectedBotId)
        setEmbedCode(bot?.embedCode || "")
      } else if (parsedBots.length > 0) {
        setSelectedBotId(parsedBots[0].id)
        setEmbedCode(parsedBots[0].embedCode)
      }
    }
  }, [initialSelectedBotId])

  const handleBotSelect = (botId: string) => {
    setSelectedBotId(botId)
    const bot = bots.find((b) => b.id === botId)
    setEmbedCode(bot?.embedCode || "")
    setCopySuccess(false) // Reset copy success message
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(embedCode)
    setCopySuccess(true)
    setTimeout(() => setCopySuccess(false), 2000) // Reset after 2 seconds
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Export & Embed</h2>
      <Tabs defaultValue="embed-code" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="embed-code">Embed Code</TabsTrigger>
          <TabsTrigger value="customer-websites">Customer Websites</TabsTrigger>
        </TabsList>
        <TabsContent value="embed-code" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Embed Chatbot on Your Website</CardTitle>
              <CardDescription>
                Select a bot and copy the iframe code to embed it directly into your website.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="select-bot">Select Bot to Embed</Label>
                {bots.length > 0 ? (
                  <Select value={selectedBotId} onValueChange={handleBotSelect}>
                    <SelectTrigger id="select-bot">
                      <SelectValue placeholder="Select a bot" />
                    </SelectTrigger>
                    <SelectContent>
                      {bots.map((bot) => (
                        <SelectItem key={bot.id} value={bot.id}>
                          {bot.name || `Untitled Bot (${bot.id.substring(0, 4)}...)`}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <p className="text-muted-foreground">No bots available. Please create a bot first.</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="embed-code-textarea">Iframe Embed Code</Label>
                <div className="relative">
                  <Textarea
                    id="embed-code-textarea"
                    value={embedCode}
                    readOnly
                    rows={8}
                    className="font-mono text-sm pr-12"
                    placeholder="Select a bot to generate its embed code..."
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={copyToClipboard}
                    disabled={!embedCode}
                  >
                    {copySuccess ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                    <span className="sr-only">Copy code</span>
                  </Button>
                </div>
                {copySuccess && <p className="text-sm text-green-500">Copied to clipboard!</p>}
                <p className="text-sm text-muted-foreground">
                  Copy and paste this code into your website's HTML where you want the chatbot to appear.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="customer-websites" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Customer Websites</CardTitle>
              <CardDescription>Manage where your bots are deployed.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                This section will list the websites where your chatbots are currently embedded.
              </p>
              {/* Placeholder for customer website list */}
              <div className="mt-4 p-4 border rounded-md bg-muted/50 text-muted-foreground">
                No customer websites added yet.
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
