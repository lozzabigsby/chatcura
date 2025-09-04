import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Download, MessageSquare, User } from "lucide-react"

export default function ChatLogs() {
  // Dummy data for chat logs
  const chatLogs = [
    {
      id: "1",
      user: "Alice Smith",
      bot: "Support Bot",
      lastMessage: "Thank you for your help!",
      timestamp: "2024-07-20 14:30",
      messages: [
        { sender: "user", text: "Hi, I have a question about my order." },
        { sender: "bot", text: "Hello Alice! What is your order number?" },
        { sender: "user", text: "It's #12345." },
        {
          sender: "bot",
          text: "Thank you. I see your order is being processed. Is there anything else I can help with?",
        },
        { sender: "user", text: "No, that's all. Thank you!" },
      ],
    },
    {
      id: "2",
      user: "Bob Johnson",
      bot: "Sales Bot",
      lastMessage: "I'm interested in your premium plan.",
      timestamp: "2024-07-19 10:15",
      messages: [
        { sender: "user", text: "Tell me about your pricing." },
        { sender: "bot", text: "We have several plans. Are you interested in personal or business use?" },
        { sender: "user", text: "Business." },
        { sender: "bot", text: "Great! Our business plans start at $X/month. Would you like a detailed quote?" },
        { sender: "user", text: "Yes, please. I'm interested in your premium plan." },
      ],
    },
    {
      id: "3",
      user: "Charlie Brown",
      bot: "FAQ Bot",
      lastMessage: "Where can I find your return policy?",
      timestamp: "2024-07-18 09:00",
      messages: [
        { sender: "user", text: "Return policy?" },
        { sender: "bot", text: "Our return policy can be found on our website under the 'Support' section." },
        { sender: "user", text: "Thanks!" },
      ],
    },
  ]

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Chat Logs</h2>
      <Card>
        <CardHeader>
          <CardTitle>Recent Conversations</CardTitle>
          <CardDescription>Review and analyze past chatbot interactions.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <Input placeholder="Search chat logs..." className="max-w-sm" />
            <Button variant="outline">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
          <div className="space-y-4">
            {chatLogs.map((log) => (
              <div key={log.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <User className="h-4 w-4" />
                    <span>{log.user}</span>
                    <span className="text-muted-foreground">vs</span>
                    <MessageSquare className="h-4 w-4" />
                    <span>{log.bot}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{log.timestamp}</span>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-1">Last message: {log.lastMessage}</p>
                <details className="mt-2">
                  <summary className="text-sm text-blue-600 cursor-pointer hover:underline">
                    View Full Transcript
                  </summary>
                  <div className="mt-2 space-y-2 text-sm bg-gray-50 p-3 rounded-md">
                    {log.messages.map((msg, index) => (
                      <p
                        key={index}
                        className={msg.sender === "user" ? "text-right text-blue-800" : "text-left text-gray-800"}
                      >
                        <strong>{msg.sender === "user" ? "You" : log.bot}:</strong> {msg.text}
                      </p>
                    ))}
                  </div>
                </details>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
