"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate login
    setTimeout(() => {
      // Store dummy user data
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: "user-1",
          name: "Alex Johnson",
          email: email,
          role: "admin",
          membershipTier: "Premium",
          joinDate: "2023-05-15",
          renewalDate: "2024-05-15",
        }),
      )

      // Initialize dummy data if not exists
      if (!localStorage.getItem("members")) {
        localStorage.setItem("members", JSON.stringify(generateDummyMembers()))
      }

      if (!localStorage.getItem("notifications")) {
        localStorage.setItem("notifications", JSON.stringify(generateDummyNotifications()))
      }

      if (!localStorage.getItem("payments")) {
        localStorage.setItem("payments", JSON.stringify(generateDummyPayments()))
      }

      router.push("/dashboard")
    }, 1500)
  }

  return (
    <div className="flex min-h-screen items-center justify-center gradient-bg p-4">
      <Card className="w-full max-w-md glass-panel gradient-border glow-effect">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-3xl font-bold tracking-tight neon-text">Smart Membership Hub</CardTitle>
          <CardDescription>Enter your credentials to access your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-background/30 border-neon-blue/30 focus:border-neon-blue focus:ring-neon-blue/20"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-background/30 border-neon-blue/30 focus:border-neon-blue focus:ring-neon-blue/20"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-neon-green to-neon-blue hover:shadow-neon transition-shadow"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Logging in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

// Generate dummy data
function generateDummyMembers() {
  return [
    {
      id: "mem-1",
      name: "John Smith",
      email: "john@example.com",
      phone: "555-123-4567",
      tier: "Basic",
      startDate: "2023-01-15",
      expiryDate: "2024-01-15",
      paymentStatus: "Paid",
      notes: "Interested in group activities",
    },
    {
      id: "mem-2",
      name: "Sarah Johnson",
      email: "sarah@example.com",
      phone: "555-234-5678",
      tier: "Premium",
      startDate: "2023-03-10",
      expiryDate: "2024-03-10",
      paymentStatus: "Paid",
      notes: "Fitness enthusiast",
    },
    {
      id: "mem-3",
      name: "Michael Brown",
      email: "michael@example.com",
      phone: "555-345-6789",
      tier: "VIP",
      startDate: "2023-02-20",
      expiryDate: "2024-02-20",
      paymentStatus: "Paid",
      notes: "Prefers morning sessions",
    },
    {
      id: "mem-4",
      name: "Emily Davis",
      email: "emily@example.com",
      phone: "555-456-7890",
      tier: "Basic",
      startDate: "2023-04-05",
      expiryDate: "2024-04-05",
      paymentStatus: "Pending",
      notes: "Considering upgrade to Premium",
    },
    {
      id: "mem-5",
      name: "David Wilson",
      email: "david@example.com",
      phone: "555-567-8901",
      tier: "Premium",
      startDate: "2023-01-30",
      expiryDate: "2023-12-30",
      paymentStatus: "Overdue",
      notes: "Needs renewal reminder",
    },
  ]
}

function generateDummyNotifications() {
  return [
    {
      id: "notif-1",
      title: "Membership Renewal",
      message: "David Wilson's membership expires in 7 days",
      date: "2023-12-23",
      read: false,
      type: "renewal",
    },
    {
      id: "notif-2",
      title: "Payment Overdue",
      message: "Emily Davis has a pending payment",
      date: "2023-12-20",
      read: true,
      type: "payment",
    },
    {
      id: "notif-3",
      title: "New Member",
      message: "Sarah Johnson joined as a Premium member",
      date: "2023-12-15",
      read: true,
      type: "new",
    },
    {
      id: "notif-4",
      title: "Upgrade Opportunity",
      message: "John Smith is eligible for a tier upgrade",
      date: "2023-12-10",
      read: false,
      type: "upgrade",
    },
    {
      id: "notif-5",
      title: "System Update",
      message: "New features added to the membership portal",
      date: "2023-12-05",
      read: true,
      type: "system",
    },
  ]
}

function generateDummyPayments() {
  return [
    {
      id: "pay-1",
      memberId: "mem-1",
      memberName: "John Smith",
      amount: 99.99,
      date: "2023-01-15",
      status: "Completed",
      method: "Credit Card",
    },
    {
      id: "pay-2",
      memberId: "mem-2",
      memberName: "Sarah Johnson",
      amount: 149.99,
      date: "2023-03-10",
      status: "Completed",
      method: "PayPal",
    },
    {
      id: "pay-3",
      memberId: "mem-3",
      memberName: "Michael Brown",
      amount: 299.99,
      date: "2023-02-20",
      status: "Completed",
      method: "Bank Transfer",
    },
    {
      id: "pay-4",
      memberId: "mem-4",
      memberName: "Emily Davis",
      amount: 99.99,
      date: "2023-04-05",
      status: "Pending",
      method: "Credit Card",
    },
    {
      id: "pay-5",
      memberId: "mem-5",
      memberName: "David Wilson",
      amount: 149.99,
      date: "2023-01-30",
      status: "Overdue",
      method: "PayPal",
    },
  ]
}

