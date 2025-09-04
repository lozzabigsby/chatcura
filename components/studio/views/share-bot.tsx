"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Copy, Share2, QrCode } from "lucide-react"

export default function ShareBot() {
  const shareLink = "https://chatcura.com/share/your-bot-id" // Placeholder
  const qrCodeUrl = "/placeholder.svg?height=200&width=200" // Placeholder

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    alert("Link copied to clipboard!")
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Share Your Bot</h2>
      <Card>
        <CardHeader>
          <CardTitle>Shareable Link</CardTitle>
          <CardDescription>Share your chatbot with a direct link.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="share-link">Direct Share Link</Label>
            <div className="flex space-x-2">
              <Input id="share-link" readOnly value={shareLink} />
              <Button onClick={() => copyToClipboard(shareLink)}>
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </Button>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Anyone with this link can interact with your chatbot in a dedicated web page.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>QR Code</CardTitle>
          <CardDescription>Generate a QR code for easy mobile access.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          <img src={qrCodeUrl || "/placeholder.svg"} alt="QR Code" className="mx-auto border rounded-lg" />
          <p className="text-sm text-muted-foreground">
            Scan this QR code with your mobile device to open the chatbot.
          </p>
          <Button variant="outline">
            <QrCode className="h-4 w-4 mr-2" />
            Download QR Code
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Social Media Sharing</CardTitle>
          <CardDescription>Share your bot directly on popular social platforms.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-4">
          <Button variant="outline">
            <Share2 className="h-4 w-4 mr-2" />
            Share on Facebook
          </Button>
          <Button variant="outline">
            <Share2 className="h-4 w-4 mr-2" />
            Share on Twitter
          </Button>
          <Button variant="outline">
            <Share2 className="h-4 w-4 mr-2" />
            Share on LinkedIn
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
