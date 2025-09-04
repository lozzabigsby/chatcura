"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface StudioAuthProps {
  onLoginSuccess: () => void
}

export default function StudioAuth({ onLoginSuccess }: StudioAuthProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Check localStorage for a token or authenticated state
    // This is a client-side check and should be paired with server-side validation
    const storedAuth = localStorage.getItem("chatcura_auth")
    if (storedAuth === "true") {
      setIsAuthenticated(true)
      onLoginSuccess()
    }
  }, [onLoginSuccess])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Simple client-side validation for demonstration purposes
    if (email === "user@example.com" && password === "password") {
      localStorage.setItem("chatcura_auth", "true")
      setIsAuthenticated(true)
      onLoginSuccess()
    } else {
      setError("Invalid email or password.")
    }
  }

  if (isAuthenticated) {
    return null // Don't render anything if already authenticated
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-950">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">Login to Chatcura Studio</CardTitle>
          <CardDescription>Enter your credentials to access your chatbot dashboard.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="user@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && <p className="text-sm text-red-500 text-center">{error}</p>}
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
