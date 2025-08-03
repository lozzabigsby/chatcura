"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Activity,
  BarChart3,
  FileText,
  Zap,
  Users,
  Share2,
  Settings,
  ChevronDown,
  ChevronRight,
  Play,
  MessageSquare,
  UserPlus,
  Hash,
  Heart,
  File,
  Type,
  Globe,
  HelpCircle,
  StickyNote,
  Workflow,
  Link,
  Code,
  ExternalLink,
  LogOut,
} from "lucide-react"

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

interface StudioSidebarProps {
  activeView: ActiveView
  onViewChange: (view: ActiveView) => void
  onLogout: () => void
}

export default function StudioSidebar({ activeView, onViewChange, onLogout }: StudioSidebarProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>([
    "activity",
    "analytics",
    "sources",
    "actions",
    "deploy",
  ])

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => (prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section]))
  }

  const menuItems = [
    {
      id: "playground",
      label: "Playground",
      icon: Play,
      view: "playground" as ActiveView,
    },
    {
      id: "activity",
      label: "Activity",
      icon: Activity,
      expandable: true,
      children: [
        { id: "chat-logs", label: "Chat logs", icon: MessageSquare, view: "chat-logs" as ActiveView },
        { id: "leads", label: "Leads", icon: UserPlus, view: "leads" as ActiveView },
      ],
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: BarChart3,
      expandable: true,
      children: [
        { id: "chats", label: "Chats", icon: MessageSquare, view: "chats" as ActiveView },
        { id: "topics", label: "Topics", icon: Hash, view: "topics" as ActiveView },
        { id: "sentiment", label: "Sentiment", icon: Heart, view: "sentiment" as ActiveView },
      ],
    },
    {
      id: "sources",
      label: "Sources",
      icon: FileText,
      expandable: true,
      children: [
        { id: "files", label: "Files", icon: File, view: "files" as ActiveView },
        { id: "text", label: "Text", icon: Type, view: "text" as ActiveView },
        { id: "website", label: "Website", icon: Globe, view: "website" as ActiveView },
        { id: "qa", label: "Q&A", icon: HelpCircle, view: "qa" as ActiveView },
        { id: "notion", label: "Notion", icon: StickyNote, view: "notion" as ActiveView },
      ],
    },
    {
      id: "actions",
      label: "Actions",
      icon: Zap,
      expandable: true,
      children: [
        {
          id: "available-actions",
          label: "Available actions",
          icon: Workflow,
          view: "available-actions" as ActiveView,
        },
        { id: "integrations", label: "Integrations", icon: Link, view: "integrations" as ActiveView },
      ],
    },
    {
      id: "contacts",
      label: "Contacts",
      icon: Users,
      view: "contacts" as ActiveView,
    },
    {
      id: "deploy",
      label: "Deploy",
      icon: Share2,
      expandable: true,
      children: [
        { id: "embed", label: "Embed", icon: Code, view: "embed" as ActiveView },
        { id: "share", label: "Share", icon: ExternalLink, view: "share" as ActiveView },
        { id: "deploy-integrations", label: "Integrations", icon: Link, view: "deploy-integrations" as ActiveView },
        { id: "help-page", label: "Help page", icon: HelpCircle, view: "help-page" as ActiveView, badge: "Beta" },
      ],
    },
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
      view: "settings" as ActiveView,
    },
  ]

  return (
    <div className="w-64 bg-card border-r border-border flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center">
          <span className="text-xl font-bold">
            <span className="gradient-text">Chat</span>cura
          </span>
        </div>
        <p className="text-xs text-muted-foreground mt-1">Studio</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-1">
          {menuItems.map((item) => (
            <div key={item.id}>
              {/* Main Item */}
              <Button
                variant={activeView === item.view ? "default" : "ghost"}
                className="w-full justify-start h-9 px-3"
                onClick={() => {
                  if (item.expandable) {
                    toggleSection(item.id)
                  } else if (item.view) {
                    onViewChange(item.view)
                  }
                }}
              >
                <item.icon className="h-4 w-4 mr-3" />
                <span className="flex-1 text-left">{item.label}</span>
                {item.expandable &&
                  (expandedSections.includes(item.id) ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  ))}
              </Button>

              {/* Children */}
              {item.expandable && expandedSections.includes(item.id) && item.children && (
                <div className="ml-4 mt-1 space-y-1">
                  {item.children.map((child) => (
                    <Button
                      key={child.id}
                      variant={activeView === child.view ? "default" : "ghost"}
                      className="w-full justify-start h-8 px-3 text-sm"
                      onClick={() => onViewChange(child.view)}
                    >
                      <child.icon className="h-3 w-3 mr-3" />
                      <span className="flex-1 text-left">{child.label}</span>
                      {child.badge && (
                        <span className="bg-primary text-primary-foreground text-xs px-1.5 py-0.5 rounded">
                          {child.badge}
                        </span>
                      )}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-border">
        <Button variant="outline" className="w-full justify-start bg-transparent" onClick={onLogout}>
          <LogOut className="h-4 w-4 mr-3" />
          Logout
        </Button>
      </div>
    </div>
  )
}
