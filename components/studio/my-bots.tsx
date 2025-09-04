"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Edit, Trash, BotIcon, MessageSquare, Calendar, TrendingUp } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface MyBot {
  id: string
  name: string
  description: string
  createdAt: string
  lastModified: string
  status: "active" | "draft" | "archived"
  messageCount: number
  embedCode: string
}

interface MyBotsProps {
  onNavigate: (view: "bot-editor" | "embed", botId?: string) => void
}

export default function MyBots({ onNavigate }: MyBotsProps) {
  const [bots, setBots] = useState<MyBot[]>([])
  const [botToDelete, setBotToDelete] = useState<string | null>(null)

  useEffect(() => {
    const savedBots = localStorage.getItem("chatcura_bots")
    if (savedBots) {
      setBots(JSON.parse(savedBots))
    }
  }, [])

  const handleDeleteBot = (id: string) => {
    const updatedBots = bots.filter((bot) => bot.id !== id)
    setBots(updatedBots)
    localStorage.setItem("chatcura_bots", JSON.stringify(updatedBots))
    setBotToDelete(null) // Clear the bot to delete
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">My Bots</h2>
        <Button onClick={() => onNavigate("bot-editor")}>
          <Plus className="h-4 w-4 mr-2" />
          Create New Bot
        </Button>
      </div>

      {bots.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <BotIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-lg font-semibold text-muted-foreground">No bots created yet.</p>
            <p className="text-muted-foreground">Start by creating your first chatbot!</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bots.map((bot) => (
            <Card key={bot.id} className="flex flex-col">
              <CardHeader className="flex-row items-center justify-between pb-2">
                <CardTitle className="text-xl">{bot.name || "Untitled Bot"}</CardTitle>
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      bot.status === "active"
                        ? "bg-green-100 text-green-800"
                        : bot.status === "draft"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {bot.status}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="flex-1 pt-2">
                <CardDescription className="mb-4 line-clamp-2">
                  {bot.description || "No description provided."}
                </CardDescription>
                <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>Created: {bot.createdAt}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>Modified: {bot.lastModified}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageSquare className="h-4 w-4" />
                    <span>Messages: {bot.messageCount}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="h-4 w-4" />
                    <span>Usage: N/A</span>
                  </div>
                </div>
              </CardContent>
              <div className="p-4 border-t flex justify-end gap-2">
                <Button variant="outline" size="sm" onClick={() => onNavigate("bot-editor", bot.id)}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="sm" onClick={() => setBotToDelete(bot.id)}>
                      <Trash className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your bot and remove its data from our
                        servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel onClick={() => setBotToDelete(null)}>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => botToDelete && handleDeleteBot(botToDelete)}>
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
