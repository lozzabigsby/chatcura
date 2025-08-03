"use client"

import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Palette, RotateCcw } from "lucide-react"

interface Colours {
  userBubble: string
  botBubble: string
  userText: string
  botText: string
  widgetBackground: string // Combined background for header/footer/main
  chatBackground: string
}

interface ColourCustomiserProps {
  colours: Colours
  onColoursChange: (colours: Colours) => void
}

export default function ColourCustomiser({ colours, onColoursChange }: ColourCustomiserProps) {
  const handleColourChange = (key: keyof Colours, value: string) => {
    onColoursChange({
      ...colours,
      [key]: value,
    })
  }

  const resetToDefaults = () => {
    onColoursChange({
      userBubble: "#6E48FF",
      botBubble: "#F1F5F9",
      userText: "#FFFFFF",
      botText: "#1E293B",
      widgetBackground: "#FFFFFF",
      chatBackground: "#F8FAFC",
    })
  }

  const colourPresets = [
    {
      name: "Chatcura Purple",
      colours: {
        userBubble: "#6E48FF",
        botBubble: "#F1F5F9",
        userText: "#FFFFFF",
        botText: "#1E293B",
        widgetBackground: "#FFFFFF",
        chatBackground: "#F8FAFC",
      },
    },
    {
      name: "Ocean Blue",
      colours: {
        userBubble: "#0EA5E9",
        botBubble: "#E0F2FE",
        userText: "#FFFFFF",
        botText: "#0C4A6E",
        widgetBackground: "#FFFFFF",
        chatBackground: "#F0F9FF",
      },
    },
    {
      name: "Forest Green",
      colours: {
        userBubble: "#059669",
        botBubble: "#D1FAE5",
        userText: "#FFFFFF",
        botText: "#064E3B",
        widgetBackground: "#FFFFFF",
        chatBackground: "#ECFDF5",
      },
    },
    {
      name: "Dark Mode",
      colours: {
        userBubble: "#6366F1",
        botBubble: "#374151",
        userText: "#FFFFFF",
        botText: "#F9FAFB",
        widgetBackground: "#111827",
        chatBackground: "#1F2937",
      },
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Palette className="h-5 w-5 mr-2" />
          Colour Customisation
        </CardTitle>
        <CardDescription>Customise every aspect of your chatbot's appearance</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Colour Presets */}
        <div className="space-y-3">
          <Label>Quick Presets</Label>
          <div className="grid grid-cols-2 gap-2">
            {colourPresets.map((preset) => (
              <Button
                key={preset.name}
                variant="outline"
                size="sm"
                onClick={() => onColoursChange(preset.colours)}
                className="justify-start"
              >
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full border" style={{ backgroundColor: preset.colours.userBubble }} />
                  {preset.name}
                </div>
              </Button>
            ))}
          </div>
        </div>

        {/* Individual Colour Controls */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Custom Colours</Label>
            <Button variant="outline" size="sm" onClick={resetToDefaults}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>User Message Bubble</Label>
                <p className="text-xs text-muted-foreground">Background colour for user messages</p>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={colours.userBubble}
                  onChange={(e) => handleColourChange("userBubble", e.target.value)}
                  className="w-10 h-8 rounded border cursor-pointer"
                />
                <span className="text-xs font-mono">{colours.userBubble}</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Bot Message Bubble</Label>
                <p className="text-xs text-muted-foreground">Background colour for bot messages</p>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={colours.botBubble}
                  onChange={(e) => handleColourChange("botBubble", e.target.value)}
                  className="w-10 h-8 rounded border cursor-pointer"
                />
                <span className="text-xs font-mono">{colours.botBubble}</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>User Text Colour</Label>
                <p className="text-xs text-muted-foreground">Text colour in user messages</p>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={colours.userText}
                  onChange={(e) => handleColourChange("userText", e.target.value)}
                  className="w-10 h-8 rounded border cursor-pointer"
                />
                <span className="text-xs font-mono">{colours.userText}</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Bot Text Colour</Label>
                <p className="text-xs text-muted-foreground">Text colour in bot messages</p>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={colours.botText}
                  onChange={(e) => handleColourChange("botText", e.target.value)}
                  className="w-10 h-8 rounded border cursor-pointer"
                />
                <span className="text-xs font-mono">{colours.botText}</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Widget Background</Label>
                <p className="text-xs text-muted-foreground">Overall background colour (header, footer, main area)</p>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={colours.widgetBackground}
                  onChange={(e) => handleColourChange("widgetBackground", e.target.value)}
                  className="w-10 h-8 rounded border cursor-pointer"
                />
                <span className="text-xs font-mono">{colours.widgetBackground}</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Chat Area Background</Label>
                <p className="text-xs text-muted-foreground">Background behind messages</p>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={colours.chatBackground}
                  onChange={(e) => handleColourChange("chatBackground", e.target.value)}
                  className="w-10 h-8 rounded border cursor-pointer"
                />
                <span className="text-xs font-mono">{colours.chatBackground}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
