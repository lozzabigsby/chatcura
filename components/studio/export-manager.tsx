"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Download, Code, FileJson, Copy, ExternalLink } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Bot {
  id: string
  name: string
  description: string
  status: "active" | "draft" | "paused"
}

export default function ExportManager() {
  const [bots, setBots] = useState<Bot[]>([])
  const [selectedBot, setSelectedBot] = useState<Bot | null>(null)
  const [exportType, setExportType] = useState<"iframe" | "script" | "json">("iframe")

  useEffect(() => {
    const savedBots = localStorage.getItem("chatcura_bots")
    if (savedBots) {
      setBots(JSON.parse(savedBots))
    }
  }, [])

  const generateIframeCode = (bot: Bot) => {
    return `<iframe
  src="https://chatcura.com/embed/${bot.id}"
  width="400"
  height="600"
  frameborder="0"
  style="border-radius: 10px; box-shadow: 0 4px 20px rgba(0,0,0,0.1);"
  title="${bot.name}"
></iframe>`
  }

  const generateScriptCode = (bot: Bot) => {
    return `<script>
  (function() {
    var chatbot = document.createElement('div');
    chatbot.id = 'chatcura-widget-${bot.id}';
    chatbot.style.position = 'fixed';
    chatbot.style.bottom = '20px';
    chatbot.style.right = '20px';
    chatbot.style.zIndex = '9999';
    document.body.appendChild(chatbot);
    
    var iframe = document.createElement('iframe');
    iframe.src = 'https://chatcura.com/widget/${bot.id}';
    iframe.style.width = '350px';
    iframe.style.height = '500px';
    iframe.style.border = 'none';
    iframe.style.borderRadius = '10px';
    iframe.style.boxShadow = '0 4px 20px rgba(0,0,0,0.2)';
    chatbot.appendChild(iframe);
  })();
</script>`
  }

  const generateJsonExport = (bot: Bot) => {
    const botConfig = {
      id: bot.id,
      name: bot.name,
      description: bot.description,
      status: bot.status,
      exportedAt: new Date().toISOString(),
      embedUrls: {
        iframe: `https://chatcura.com/embed/${bot.id}`,
        widget: `https://chatcura.com/widget/${bot.id}`,
        api: `https://chatcura.com/api/chat/${bot.id}`,
      },
    }
    return JSON.stringify(botConfig, null, 2)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    alert("Code copied to clipboard!")
  }

  const downloadFile = (content: string, filename: string, type: string) => {
    const blob = new Blob([content], { type })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const getExportCode = () => {
    if (!selectedBot) return ""

    switch (exportType) {
      case "iframe":
        return generateIframeCode(selectedBot)
      case "script":
        return generateScriptCode(selectedBot)
      case "json":
        return generateJsonExport(selectedBot)
      default:
        return ""
    }
  }

  const getFileExtension = () => {
    switch (exportType) {
      case "iframe":
      case "script":
        return "html"
      case "json":
        return "json"
      default:
        return "txt"
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">Export Manager</h2>
        <p className="text-muted-foreground">Generate embed codes and export your chatbots</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bot Selection */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Select Bot to Export</CardTitle>
              <CardDescription>Choose which chatbot you want to export</CardDescription>
            </CardHeader>
            <CardContent>
              {bots.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">No bots available for export</p>
              ) : (
                <div className="space-y-3">
                  {bots.map((bot) => (
                    <div
                      key={bot.id}
                      className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                        selectedBot?.id === bot.id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                      onClick={() => setSelectedBot(bot)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">{bot.name}</h4>
                          <p className="text-sm text-muted-foreground">{bot.description}</p>
                        </div>
                        <Badge variant={bot.status === "active" ? "default" : "secondary"}>{bot.status}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Export Options */}
        <div className="space-y-4">
          {selectedBot ? (
            <Card>
              <CardHeader>
                <CardTitle>Export Options</CardTitle>
                <CardDescription>Choose how you want to export {selectedBot.name}</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={exportType} onValueChange={(value: any) => setExportType(value)}>
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="iframe">Iframe</TabsTrigger>
                    <TabsTrigger value="script">Script</TabsTrigger>
                    <TabsTrigger value="json">JSON</TabsTrigger>
                  </TabsList>

                  <TabsContent value="iframe" className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Iframe Embed</h4>
                      <p className="text-sm text-muted-foreground mb-4">
                        Embed as an iframe - perfect for websites and landing pages
                      </p>
                      <Textarea
                        value={generateIframeCode(selectedBot)}
                        readOnly
                        className="font-mono text-xs"
                        rows={8}
                      />
                      <div className="flex gap-2 mt-3">
                        <Button size="sm" onClick={() => copyToClipboard(generateIframeCode(selectedBot))}>
                          <Copy className="h-4 w-4 mr-2" />
                          Copy Code
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            downloadFile(
                              generateIframeCode(selectedBot),
                              `${selectedBot.name}-iframe.html`,
                              "text/html",
                            )
                          }
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="script" className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">JavaScript Widget</h4>
                      <p className="text-sm text-muted-foreground mb-4">
                        Floating widget that appears in the bottom-right corner
                      </p>
                      <Textarea
                        value={generateScriptCode(selectedBot)}
                        readOnly
                        className="font-mono text-xs"
                        rows={8}
                      />
                      <div className="flex gap-2 mt-3">
                        <Button size="sm" onClick={() => copyToClipboard(generateScriptCode(selectedBot))}>
                          <Copy className="h-4 w-4 mr-2" />
                          Copy Code
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            downloadFile(
                              generateScriptCode(selectedBot),
                              `${selectedBot.name}-widget.html`,
                              "text/html",
                            )
                          }
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="json" className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">JSON Configuration</h4>
                      <p className="text-sm text-muted-foreground mb-4">
                        Export bot configuration as JSON for backup or migration
                      </p>
                      <Textarea
                        value={generateJsonExport(selectedBot)}
                        readOnly
                        className="font-mono text-xs"
                        rows={8}
                      />
                      <div className="flex gap-2 mt-3">
                        <Button size="sm" onClick={() => copyToClipboard(generateJsonExport(selectedBot))}>
                          <Copy className="h-4 w-4 mr-2" />
                          Copy JSON
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            downloadFile(
                              generateJsonExport(selectedBot),
                              `${selectedBot.name}-config.json`,
                              "application/json",
                            )
                          }
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <Code className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Select a Bot</h3>
                <p className="text-muted-foreground">Choose a bot from the left to generate export code</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Export Instructions */}
      <Card>
        <CardHeader>
          <CardTitle>Integration Instructions</CardTitle>
          <CardDescription>How to use your exported chatbot code</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center mb-2">
                <Code className="h-5 w-5 text-primary mr-2" />
                <h4 className="font-medium">Iframe Method</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Paste the iframe code directly into your HTML. Best for simple integrations.
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="flex items-center mb-2">
                <ExternalLink className="h-5 w-5 text-primary mr-2" />
                <h4 className="font-medium">Script Widget</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Add the script tag to your website's HTML. Creates a floating chat widget.
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="flex items-center mb-2">
                <FileJson className="h-5 w-5 text-primary mr-2" />
                <h4 className="font-medium">JSON Export</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Use for backups, migrations, or custom integrations via API.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
