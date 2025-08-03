"use client"

import type React from "react"

import { useState, useEffect } from "react" // Import useEffect
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, EyeOff, Lock } from "lucide-react"
import StudioDashboard from "./studio-dashboard"

export default function StudioAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false) // Initialize to false
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  // Check if already authenticated on component mount (client-side only)
  useEffect(() => {
    const authStatus = localStorage.getItem("studio_auth")
    if (authStatus === "true") {
      setIsAuthenticated(true)
    }
  }, []) // Empty dependency array ensures this runs once after initial render

  // Simple auth - in production, use proper authentication
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    // Simple hardcoded auth (replace with real auth in production)
    if (email === "admin@chatcura.com" && password === "chatcura2024") {
      setIsAuthenticated(true)
      localStorage.setItem("studio_auth", "true")
    } else {
      setError("Invalid credentials")
    }

    setLoading(false)
  }

  if (isAuthenticated) {
    return <StudioDashboard />
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <Lock className="h-8 w-8 text-primary mr-2" />
            <span className="text-2xl font-bold">
              <span className="gradient-text">Chat</span>cura Studio
            </span>
          </div>
          <CardTitle>Admin Access Required</CardTitle>
          <CardDescription>This is a private chatbot builder tool for authorized users only.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@chatcura.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            {error && <div className="text-sm text-red-500 text-center">{error}</div>}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Authenticating..." : "Access Studio"}
            </Button>
          </form>
          <div className="mt-6 text-center text-xs text-muted-foreground">
            Private builder tool – Chatcura.com (Admin Access Only)
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
