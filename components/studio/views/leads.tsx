"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Download, Filter, UserPlus, Mail, Phone, Calendar } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Lead {
  id: string
  name: string
  email: string
  phone?: string
  source: string
  status: "new" | "contacted" | "qualified" | "converted"
  createdAt: string
  lastContact?: string
  notes: string
}

export default function Leads() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [filterSource, setFilterSource] = useState<string>("all")

  useEffect(() => {
    // Load dummy leads
    const dummyLeads: Lead[] = [
      {
        id: "1",
        name: "Sarah Johnson",
        email: "sarah@example.com",
        phone: "+44 7700 900123",
        source: "Website Chat",
        status: "new",
        createdAt: "2024-01-20T10:30:00Z",
        notes: "Interested in premium package, asked about pricing",
      },
      {
        id: "2",
        name: "Mike Chen",
        email: "mike.chen@company.com",
        source: "Contact Form",
        status: "contacted",
        createdAt: "2024-01-19T14:15:00Z",
        lastContact: "2024-01-20T09:00:00Z",
        notes: "B2B lead, needs enterprise solution",
      },
      {
        id: "3",
        name: "Emma Wilson",
        email: "emma.w@email.com",
        phone: "+44 7700 900456",
        source: "Website Chat",
        status: "qualified",
        createdAt: "2024-01-18T16:45:00Z",
        lastContact: "2024-01-19T11:30:00Z",
        notes: "Ready to purchase, waiting for proposal",
      },
    ]
    setLeads(dummyLeads)
  }, [])

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || lead.status === filterStatus
    const matchesSource = filterSource === "all" || lead.source === filterSource

    return matchesSearch && matchesStatus && matchesSource
  })

  const getStatusColour = (status: string) => {
    switch (status) {
      case "new":
        return "bg-blue-500"
      case "contacted":
        return "bg-yellow-500"
      case "qualified":
        return "bg-green-500"
      case "converted":
        return "bg-purple-500"
      default:
        return "bg-gray-500"
    }
  }

  const exportLeads = () => {
    const csvContent = [
      ["Name", "Email", "Phone", "Source", "Status", "Created", "Last Contact", "Notes"],
      ...filteredLeads.map((lead) => [
        lead.name,
        lead.email,
        lead.phone || "",
        lead.source,
        lead.status,
        lead.createdAt,
        lead.lastContact || "",
        lead.notes,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "leads.csv"
    a.click()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Leads</h2>
          <p className="text-muted-foreground">Manage and track your potential customers</p>
        </div>
        <Button onClick={exportLeads}>
          <Download className="h-4 w-4 mr-2" />
          Export Leads
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Leads</p>
                <p className="text-2xl font-bold">{leads.length}</p>
              </div>
              <UserPlus className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">New Leads</p>
                <p className="text-2xl font-bold">{leads.filter((l) => l.status === "new").length}</p>
              </div>
              <Badge className="bg-blue-500 text-white">New</Badge>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Qualified</p>
                <p className="text-2xl font-bold">{leads.filter((l) => l.status === "qualified").length}</p>
              </div>
              <Badge className="bg-green-500 text-white">Qualified</Badge>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Converted</p>
                <p className="text-2xl font-bold">{leads.filter((l) => l.status === "converted").length}</p>
              </div>
              <Badge className="bg-purple-500 text-white">Converted</Badge>
            </div>
          </CardContent>
        </Card>
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
              <label className="text-sm font-medium">Search Leads</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="contacted">Contacted</SelectItem>
                  <SelectItem value="qualified">Qualified</SelectItem>
                  <SelectItem value="converted">Converted</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Source</label>
              <Select value={filterSource} onValueChange={setFilterSource}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sources</SelectItem>
                  <SelectItem value="Website Chat">Website Chat</SelectItem>
                  <SelectItem value="Contact Form">Contact Form</SelectItem>
                  <SelectItem value="Social Media">Social Media</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Leads List */}
      <div className="space-y-4">
        {filteredLeads.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <UserPlus className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No leads found</h3>
              <p className="text-muted-foreground">Try adjusting your filters or search terms</p>
            </CardContent>
          </Card>
        ) : (
          filteredLeads.map((lead) => (
            <Card key={lead.id} className="card-hover">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="font-medium text-primary">
                        {lead.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-medium">{lead.name}</h3>
                      <p className="text-sm text-muted-foreground">{lead.source}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={`${getStatusColour(lead.status)} text-white`}>
                      {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{lead.email}</span>
                  </div>
                  {lead.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{lead.phone}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Created: {new Date(lead.createdAt).toLocaleDateString()}</span>
                  </div>
                  {lead.lastContact && (
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Last contact: {new Date(lead.lastContact).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>

                {lead.notes && (
                  <div className="bg-muted/50 rounded-lg p-3">
                    <p className="text-sm">{lead.notes}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
