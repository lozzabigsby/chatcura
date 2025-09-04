"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

interface ColourCustomiserProps {
  colours: {
    userBubble: string
    botBubble: string
    userText: string
    botText: string
    widgetBackground: string
    chatBackground: string
  }
  onColoursChange: (colours: ColourCustomiserProps["colours"]) => void
}

export default function ColourCustomiser({ colours, onColoursChange }: ColourCustomiserProps) {
  const handleColorChange = (key: keyof ColourCustomiserProps["colours"], value: string) => {
    onColoursChange({ ...colours, [key]: value })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Colour Customisation</CardTitle>
        <CardDescription>Adjust the colours of your chatbot interface.</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="user-bubble-color">User Bubble</Label>
          <Input
            id="user-bubble-color"
            type="color"
            value={colours.userBubble}
            onChange={(e) => handleColorChange("userBubble", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="bot-bubble-color">Bot Bubble</Label>
          <Input
            id="bot-bubble-color"
            type="color"
            value={colours.botBubble}
            onChange={(e) => handleColorChange("botBubble", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="user-text-color">User Text</Label>
          <Input
            id="user-text-color"
            type="color"
            value={colours.userText}
            onChange={(e) => handleColorChange("userText", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="bot-text-color">Bot Text</Label>
          <Input
            id="bot-text-color"
            type="color"
            value={colours.botText}
            onChange={(e) => handleColorChange("botText", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="widget-background-color">Widget Background</Label>
          <Input
            id="widget-background-color"
            type="color"
            value={colours.widgetBackground}
            onChange={(e) => handleColorChange("widgetBackground", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="chat-background-color">Chat Background</Label>
          <Input
            id="chat-background-color"
            type="color"
            value={colours.chatBackground}
            onChange={(e) => handleColorChange("chatBackground", e.target.value)}
          />
        </div>
      </CardContent>
    </Card>
  )
}
