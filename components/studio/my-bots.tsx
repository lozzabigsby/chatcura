"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Edit, Copy, Trash2, Eye, MoreVertical } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Bot {
  id: string
  name: string
  description: string
  status: "active" | "draft" | "paused"
  createdAt: string
  lastModified: string
  messageCount: number
}

interface MyBotsProps {
  onEditBot: (botId: string) => void
}

export default function MyBots({ onEditBot }: MyBotsProps) {
  const [bots, setBots] = useState<Bot[]>([])

  useEffect(() => {
    // Load bots from localStorage
    const savedBots = localStorage.getItem("chatcura_bots")
    if (savedBots) {
      setBots(JSON.parse(savedBots))
    } else {
      // Add some dummy data
      const dummyBots: Bot[] = [
        {
          id: "1",
          name: "E-commerce Assistant",
          description: "Helps customers with product inquiries and order tracking",
          status: "active",
          createdAt: "2024-01-15",
          lastModified: "2024-01-20",
          messageCount: 1247,
        },
        {
          id: "2",
          name: "Salon Booking Bot",
          description: "Handles appointment bookings and service inquiries",
          status: "active",
          createdAt: "2024-01-10",
          lastModified: "2024-01-18",
          messageCount: 892,
        },
        {
          id: "3",
          name: "Support Helper",
          description: "General customer support chatbot",
          status: "draft",
          createdAt: "2024-01-22",
          lastModified: "2024-01-22",
          messageCount: 0,
        },
      ]
      setBots(dummyBots)
      localStorage.setItem("chatcura_bots", JSON.stringify(dummyBots))
    }
  }, [])

  const handleCloneBot = (bot: Bot) => {
    const clonedBot: Bot = {
      ...bot,
      id: Date.now().toString(),
      name: `${bot.name} (Copy)`,
      status: "draft",
      createdAt: new Date().toISOString().split("T")[0],
      lastModified: new Date().toISOString().split("T")[0],
      messageCount: 0,
    }

    const updatedBots = [...bots, clonedBot]
    setBots(updatedBots)
    localStorage.setItem("chatcura_bots", JSON.stringify(updatedBots))
  }

  const handleDeleteBot = (botId: string) => {
    const updatedBots = bots.filter((bot) => bot.id !== botId)
    setBots(updatedBots)
    localStorage.setItem("chatcura_bots", JSON.stringify(updatedBots))
  }

  const getStatusColor = (status: Bot["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-500"
      case "draft":
        return "bg-yellow-500"
      case "paused":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">My Bots</h2>
        <p className="text-muted-foreground">Manage your chatbots and view their performance</p>
      </div>

      {bots.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <div className="text-6xl mb-4">🤖</div>
            <h3 className="text-xl font-semibold mb-2">No bots yet</h3>
            <p className="text-muted-foreground mb-4">Create your first chatbot to get started</p>
            <Button onClick={() => onEditBot("")}>Create Your First Bot</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bots.map((bot) => (
            <Card key={bot.id} className="card-hover">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{bot.name}</CardTitle>
                    <CardDescription className="mt-1">{bot.description}</CardDescription>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onEditBot(bot.id)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleCloneBot(bot)}>
                        <Copy className="h-4 w-4 mr-2" />
                        Clone
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Eye className="h-4 w-4 mr-2" />
                        Preview
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDeleteBot(bot.id)} className="text-red-600">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className={`${getStatusColor(bot.status)} text-white`}>
                      {bot.status.charAt(0).toUpperCase() + bot.status.slice(1)}
                    </Badge>
                    <span className="text-sm text-muted-foreground">{bot.messageCount} messages</span>
                  </div>

                  <div className="text-xs text-muted-foreground">
                    <div>Created: {bot.createdAt}</div>
                    <div>Modified: {bot.lastModified}</div>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1" onClick={() => onEditBot(bot.id)}>
                      <Edit className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleCloneBot(bot)}>
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
