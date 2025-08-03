"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Download, Filter, MessageSquare, User, Bot } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ChatLog {
  id: string
  sessionId: string
  timestamp: string
  userMessage: string
  botResponse: string
  sentiment: "positive" | "neutral" | "negative"
  resolved: boolean
  userId?: string
}

export default function ChatLogs() {
  const [logs, setLogs] = useState<ChatLog[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterSentiment, setFilterSentiment] = useState<string>("all")
  const [filterResolved, setFilterResolved] = useState<string>("all")

  useEffect(() => {
    // Load dummy chat logs
    const dummyLogs: ChatLog[] = [
      {
        id: "1",
        sessionId: "sess_001",
        timestamp: "2024-01-20T10:30:00Z",
        userMessage: "Hello, I need help with my order",
        botResponse: "Hello! I'd be happy to help you with your order. Could you please provide your order number?",
        sentiment: "neutral",
        resolved: true,
        userId: "user_123",
      },
      {
        id: "2",
        sessionId: "sess_001",
        timestamp: "2024-01-20T10:31:00Z",
        userMessage: "My order number is ORD-12345",
        botResponse:
          "Thank you! I can see your order ORD-12345. It was dispatched yesterday and should arrive tomorrow.",
        sentiment: "positive",
        resolved: true,
        userId: "user_123",
      },
      {
        id: "3",
        sessionId: "sess_002",
        timestamp: "2024-01-20T11:15:00Z",
        userMessage: "Your service is terrible!",
        botResponse:
          "I'm sorry to hear you're having a poor experience. Let me connect you with a human agent who can help resolve this issue.",
        sentiment: "negative",
        resolved: false,
        userId: "user_456",
      },
    ]
    setLogs(dummyLogs)
  }, [])

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.userMessage.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.botResponse.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSentiment = filterSentiment === "all" || log.sentiment === filterSentiment
    const matchesResolved =
      filterResolved === "all" ||
      (filterResolved === "resolved" && log.resolved) ||
      (filterResolved === "unresolved" && !log.resolved)

    return matchesSearch && matchesSentiment && matchesResolved
  })

  const getSentimentColour = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return "bg-green-500"
      case "negative":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const exportLogs = () => {
    const csvContent = [
      ["ID", "Session ID", "Timestamp", "User Message", "Bot Response", "Sentiment", "Resolved"],
      ...filteredLogs.map((log) => [
        log.id,
        log.sessionId,
        log.timestamp,
        log.userMessage,
        log.botResponse,
        log.sentiment,
        log.resolved.toString(),
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "chat-logs.csv"
    a.click()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Chat Logs</h2>
          <p className="text-muted-foreground">View and analyse all chat conversations</p>
        </div>
        <Button onClick={exportLogs}>
          <Download className="h-4 w-4 mr-2" />
          Export Logs
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Filter className="h-5 w-5 mr-2" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Search Messages</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search conversations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Sentiment</label>
              <Select value={filterSentiment} onValueChange={setFilterSentiment}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sentiments</SelectItem>
                  <SelectItem value="positive">Positive</SelectItem>
                  <SelectItem value="neutral">Neutral</SelectItem>
                  <SelectItem value="negative">Negative</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <Select value={filterResolved} onValueChange={setFilterResolved}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                  <SelectItem value="unresolved">Unresolved</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Chat Logs */}
      <div className="space-y-4">
        {filteredLogs.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No chat logs found</h3>
              <p className="text-muted-foreground">Try adjusting your filters or search terms</p>
            </CardContent>
          </Card>
        ) : (
          filteredLogs.map((log) => (
            <Card key={log.id} className="card-hover">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">Session: {log.sessionId}</Badge>
                    <Badge className={`${getSentimentColour(log.sentiment)} text-white`}>{log.sentiment}</Badge>
                    <Badge variant={log.resolved ? "default" : "destructive"}>
                      {log.resolved ? "Resolved" : "Unresolved"}
                    </Badge>
                  </div>
                  <span className="text-sm text-muted-foreground">{new Date(log.timestamp).toLocaleString()}</span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium mb-1">User</p>
                      <p className="text-sm text-muted-foreground">{log.userMessage}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                      <Bot className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium mb-1">Bot</p>
                      <p className="text-sm text-muted-foreground">{log.botResponse}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
