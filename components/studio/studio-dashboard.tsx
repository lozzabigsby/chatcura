"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import StudioSidebar from "./studio-sidebar"
import BotPlayground from "./views/bot-playground"
import ChatLogs from "./views/chat-logs"
import Leads from "./views/leads"
import StudioSettings from "./studio-settings"

type ActiveView =
  | "playground"
  | "chat-logs"
  | "leads"
  | "chats"
  | "topics"
  | "sentiment"
  | "files"
  | "text"
  | "website"
  | "qa"
  | "notion"
  | "available-actions"
  | "integrations"
  | "contacts"
  | "embed"
  | "share"
  | "deploy-integrations"
  | "help-page"
  | "settings"

export default function StudioDashboard() {
  const [activeView, setActiveView] = useState<ActiveView>("playground")
  const [selectedBotId, setSelectedBotId] = useState<string | null>(null)

  const handleLogout = () => {
    localStorage.removeItem("studio_auth")
    window.location.reload()
  }

  const renderMainContent = () => {
    switch (activeView) {
      case "playground":
        return <BotPlayground />
      case "chat-logs":
        return <ChatLogs />
      case "leads":
        return <Leads />
      case "settings":
        return <StudioSettings />
      default:
        return (
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <h3 className="text-lg font-medium mb-2">Coming Soon</h3>
              <p className="text-muted-foreground">This feature is currently under development</p>
            </div>
          </div>
        )
    }
  }

  const getPageTitle = () => {
    switch (activeView) {
      case "playground":
        return "Playground"
      case "chat-logs":
        return "Chat Logs"
      case "leads":
        return "Leads"
      case "chats":
        return "Chat Analytics"
      case "topics":
        return "Topics"
      case "sentiment":
        return "Sentiment Analysis"
      case "files":
        return "File Sources"
      case "text":
        return "Text Sources"
      case "website":
        return "Website Sources"
      case "qa":
        return "Q&A Sources"
      case "notion":
        return "Notion Sources"
      case "available-actions":
        return "Available Actions"
      case "integrations":
        return "Integrations"
      case "contacts":
        return "Contacts"
      case "embed":
        return "Embed Code"
      case "share":
        return "Share Bot"
      case "deploy-integrations":
        return "Deploy Integrations"
      case "help-page":
        return "Help Page"
      case "settings":
        return "Settings"
      default:
        return "Playground"
    }
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <StudioSidebar activeView={activeView} onViewChange={setActiveView} onLogout={handleLogout} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="border-b border-border bg-card px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">
                <span className="gradient-text">Chat</span>cura Studio
              </h1>
              <p className="text-sm text-muted-foreground">{getPageTitle()}</p>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </header>

        {/* Main Panel */}
        <main className="flex-1 p-6 overflow-auto">{renderMainContent()}</main>

        {/* Footer */}
        <footer className="border-t border-border bg-card px-6 py-3">
          <p className="text-xs text-muted-foreground text-center">
            Private builder tool – Chatcura.com (Admin Access Only)
          </p>
        </footer>
      </div>
    </div>
  )
}
