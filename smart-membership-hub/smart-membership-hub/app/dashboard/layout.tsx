"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Bell, Home, LogOut, MessageSquare, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [notifications, setNotifications] = useState<any[]>([])
  const [activeTab, setActiveTab] = useState("dashboard")

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/")
      return
    }

    setUser(JSON.parse(userData))

    // Get notifications
    const notifData = localStorage.getItem("notifications")
    if (notifData) {
      const parsedNotifs = JSON.parse(notifData)
      setNotifications(parsedNotifs)
    }

    // Set active tab based on URL
    const path = window.location.pathname
    if (path.includes("/members")) {
      setActiveTab("members")
    } else if (path.includes("/interactions")) {
      setActiveTab("interactions")
    } else {
      setActiveTab("dashboard")
    }
  }, [router])

  const handleTabChange = (value: string) => {
    setActiveTab(value)
    if (value === "dashboard") {
      router.push("/dashboard")
    } else if (value === "members") {
      router.push("/dashboard/members")
    } else if (value === "interactions") {
      router.push("/dashboard/interactions")
    }
  }

  const handleLogout = () => {
    // Clear user data
    localStorage.removeItem("user")
    router.push("/")
  }

  const unreadNotifications = notifications.filter((n) => !n.read).length

  if (!user) return null

  return (
    <div className="min-h-screen deep-blue-bg flex flex-col text-white">
      {/* Top Navigation */}
      <header className="glass-panel border-b border-deepblue-300 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full bg-pink-600 flex items-center justify-center">
              <span className="text-primary-foreground font-bold">SM</span>
            </div>
            <h1 className="text-xl font-bold ">Smart Membership Hub</h1>
          </div>

          <div className="flex items-center space-x-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative hover:bg-deepblue-300">
                    <Bell className="h-5 w-5 text-white" />
                    {unreadNotifications > 0 && (
                      <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-neon-pink">
                        {unreadNotifications}
                      </Badge>
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Notifications</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <div className="flex items-center space-x-2">
              <Avatar>
                <AvatarImage className="bg-black" src={`https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZmlsZSUyMHBpY3R1cmV8ZW58MHx8MHx8fDA%3D`} alt={user.name} />
                <AvatarFallback className="bg-gradient-to-r from-neon-blue to-neon-pink text-white">
                  {user.name
                    .split(" ")
                    .map((n: string) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="hidden md:block">
                <p className="text-sm font-medium text-white">{user.name}</p>
                <p className="text-xs text-blue-200">{user.membershipTier} Tier</p>
              </div>
            </div>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleLogout}
                    className="hover:bg-deepblue-300 text-white"
                  >
                    <LogOut className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Logout</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </header>

      {/* Main Navigation Tabs */}
      <div className="container mx-auto px-4 py-4">
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid w-full grid-cols-3 h-14 glass-panel">
            <TabsTrigger
              value="dashboard"
              className="flex items-center space-x-2 h-full text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500/20 data-[state=active]:to-blue-500/20 data-[state=active]:text-white data-[state=active]:backdrop-blur-md data-[state=active]:shadow-[0_0_15px_rgba(6,182,212,0.3)]"
            >
              <Home className="h-5 w-5" />
              <span className="hidden sm:inline">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger
              value="members"
              className="flex items-center space-x-2 h-full text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500/20 data-[state=active]:to-blue-500/20 data-[state=active]:text-white   data-[state=active]:backdrop-blur-md data-[state=active]:shadow-[0_0_15px_rgba(6,182,212,0.3)]"
            >
              <Users className="h-5 w-5" />
              <span className="hidden sm:inline">Membership</span>
            </TabsTrigger>
            <TabsTrigger
              value="interactions"
              className="flex items-center space-x-2 h-full text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500/20 data-[state=active]:to-blue-500/20 data-[state=active]:text-white data-[state=active]:backdrop-blur-md data-[state=active]:shadow-[0_0_15px_rgba(6,182,212,0.3)]"
            >
              <MessageSquare className="h-5 w-5" />
              <span className="hidden sm:inline">Interactions</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-6">{children}</main>

      {/* Footer */}
      <footer className="glass-panel border-t border-deepblue-300 py-4">
        <div className="container mx-auto px-4 text-center text-sm text-blue-200">
          <p>© 2025 Smart Membership Hub(Techno X AI). All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

