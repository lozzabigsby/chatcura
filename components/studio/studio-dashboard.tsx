"use client"

import { useState, useEffect } from "react"
import {
  LayoutDashboard,
  MessageSquare,
  Users,
  FileText,
  Bot,
  Code,
  Share2,
  Plug,
  Zap,
  Lightbulb,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarInset,
} from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

// Import your view components
import AnalyticsOverview from "./views/analytics-overview"
import ChatLogs from "./views/chat-logs"
import Leads from "./views/leads"
import DataSourceManager from "./views/data-source-manager"
import ActionsManager from "./views/actions-manager"
import DeployIntegrations from "./views/deploy-integrations"
import ShareBot from "./views/share-bot"
import MyBots from "./my-bots" // Corrected import path
import BotEditor from "./bot-editor" // Renamed from bot-builder
import HelpCenter from "./help-center"
import StudioSettings from "./studio-settings"
import ExportManager from "./export-manager"

type ActiveView =
  | "analytics-overview"
  | "chat-logs"
  | "leads"
  | "data-source"
  | "actions"
  | "deploy-integrations"
  | "share-bot"
  | "my-bots"
  | "bot-editor"
  | "help-center"
  | "settings"
  | "embed"
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

interface StudioDashboardProps {
  initialView?: ActiveView
  initialBotId?: string | null
}

export default function StudioDashboard({ initialView = "my-bots", initialBotId = null }: StudioDashboardProps) {
  const [activeView, setActiveView] = useState<ActiveView>(initialView)
  const [selectedBotId, setSelectedBotId] = useState<string | null>(initialBotId)

  useEffect(() => {
    if (initialView) {
      setActiveView(initialView)
    }
    if (initialBotId) {
      setSelectedBotId(initialBotId)
    }
  }, [initialView, initialBotId])

  const handleNavigate = (view: ActiveView, botId?: string) => {
    setActiveView(view)
    setSelectedBotId(botId || null)
  }

  const renderView = () => {
    switch (activeView) {
      case "analytics-overview":
        return <AnalyticsOverview />
      case "chat-logs":
        return <ChatLogs />
      case "leads":
        return <Leads />
      case "data-source":
        return <DataSourceManager />
      case "actions":
        return <ActionsManager />
      case "deploy-integrations":
        return <DeployIntegrations />
      case "share-bot":
        return <ShareBot />
      case "my-bots":
        return <MyBots onNavigate={handleNavigate} />
      case "bot-editor":
        return <BotEditor botId={selectedBotId} onNavigate={handleNavigate} />
      case "help-center":
        return <HelpCenter />
      case "settings":
        return <StudioSettings />
      case "embed":
        return <ExportManager initialSelectedBotId={selectedBotId} />
      // Placeholder views
      case "chats":
        return <div className="p-6 text-center text-muted-foreground">Chats View - Coming Soon!</div>
      case "topics":
        return <div className="p-6 text-center text-muted-foreground">Topics View - Coming Soon!</div>
      case "sentiment":
        return <div className="p-6 text-center text-muted-foreground">Sentiment View - Coming Soon!</div>
      case "files":
        return <div className="p-6 text-center text-muted-foreground">Files Data Source - Coming Soon!</div>
      case "text":
        return <div className="p-6 text-center text-muted-foreground">Text Data Source - Coming Soon!</div>
      case "website":
        return <div className="p-6 text-center text-muted-foreground">Website Data Source - Coming Soon!</div>
      case "qa":
        return <div className="p-6 text-center text-muted-foreground">Q&A Data Source - Coming Soon!</div>
      case "notion":
        return <div className="p-6 text-center text-muted-foreground">Notion Integration - Coming Soon!</div>
      case "available-actions":
        return <div className="p-6 text-center text-muted-foreground">Available Actions - Coming Soon!</div>
      case "integrations":
        return <div className="p-6 text-center text-muted-foreground">Integrations - Coming Soon!</div>
      case "contacts":
        return <div className="p-6 text-center text-muted-foreground">Contacts - Coming Soon!</div>
      default:
        return <AnalyticsOverview />
    }
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <Sidebar collapsible="icon" variant="inset">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton>
                    Select Workspace
                    <ChevronDown className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[--radix-popper-anchor-width]">
                  <DropdownMenuItem>
                    <span>Chatcura Inc</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>My Personal Workspace</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarSeparator />
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Overview</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={() => handleNavigate("analytics-overview")}
                    isActive={activeView === "analytics-overview"}
                  >
                    <LayoutDashboard />
                    <span>Dashboard</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton onClick={() => handleNavigate("chat-logs")} isActive={activeView === "chat-logs"}>
                    <MessageSquare />
                    <span>Chat Logs</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton onClick={() => handleNavigate("leads")} isActive={activeView === "leads"}>
                    <Users />
                    <span>Leads</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel>Bot Management</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton onClick={() => handleNavigate("my-bots")} isActive={activeView === "my-bots"}>
                    <Bot />
                    <span>My Bots</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={() => handleNavigate("bot-editor")}
                    isActive={activeView === "bot-editor"}
                  >
                    <Lightbulb />
                    <span>Bot Editor</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <Collapsible defaultOpen className="group/collapsible">
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton
                        isActive={["data-source", "files", "text", "website", "qa", "notion"].includes(activeView)}
                      >
                        <FileText />
                        <span>Data Sources</span>
                        <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenu>
                        <SidebarMenuItem>
                          <SidebarMenuButton
                            onClick={() => handleNavigate("data-source")}
                            isActive={activeView === "data-source"}
                          >
                            <span>Manage Sources</span>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                          <SidebarMenuButton onClick={() => handleNavigate("files")} isActive={activeView === "files"}>
                            <span>Files</span>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                          <SidebarMenuButton onClick={() => handleNavigate("text")} isActive={activeView === "text"}>
                            <span>Text</span>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                          <SidebarMenuButton
                            onClick={() => handleNavigate("website")}
                            isActive={activeView === "website"}
                          >
                            <span>Website</span>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                          <SidebarMenuButton onClick={() => handleNavigate("qa")} isActive={activeView === "qa"}>
                            <span>Q&A</span>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                          <SidebarMenuButton
                            onClick={() => handleNavigate("notion")}
                            isActive={activeView === "notion"}
                          >
                            <span>Notion</span>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      </SidebarMenu>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
                <Collapsible defaultOpen className="group/collapsible">
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton isActive={["actions", "available-actions"].includes(activeView)}>
                        <Zap />
                        <span>Actions</span>
                        <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenu>
                        <SidebarMenuItem>
                          <SidebarMenuButton
                            onClick={() => handleNavigate("actions")}
                            isActive={activeView === "actions"}
                          >
                            <span>Manage Actions</span>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                          <SidebarMenuButton
                            onClick={() => handleNavigate("available-actions")}
                            isActive={activeView === "available-actions"}
                          >
                            <span>Available Actions</span>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      </SidebarMenu>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel>Deployment</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton onClick={() => handleNavigate("embed")} isActive={activeView === "embed"}>
                    <Code />
                    <span>Embed Code</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton onClick={() => handleNavigate("share-bot")} isActive={activeView === "share-bot"}>
                    <Share2 />
                    <span>Share Bot</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={() => handleNavigate("deploy-integrations")}
                    isActive={activeView === "deploy-integrations"}
                  >
                    <Plug />
                    <span>Integrations</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton>
                    <Users /> Username
                    <ChevronUp className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="top" className="w-[--radix-popper-anchor-width]">
                  <DropdownMenuItem>
                    <span>Account</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Billing</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <div className="flex-1 p-6 overflow-auto">{renderView()}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}
