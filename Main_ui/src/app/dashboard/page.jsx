
"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Bell,
  Calendar,
  ChevronDown,
  CreditCard,
  Home,
  Menu,
  MessageSquare,
  Search,
  Settings,
  Users,
  Award,
  DollarSign,
  Camera,
  Image,
  Bookmark,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Dashboard() {
  const [activeClub, setActiveClub] = useState("Photography Club")

  return (
    <div className="flex min-h-screen flex-col  bg-black text-slate-200">
      <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b border-white/10 bg-black backdrop-blur-lg px-4 md:px-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden border-white/10 bg-blue-950/50 text-blue-400 hover:bg-blue-900/50">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 bg-black border-white/10 text-white">
            <nav className="grid gap-6 text-lg font-medium">
              <Link href="/dashboard" className="flex items-center gap-2 text-lg font-semibold">
                <span className="bg-white text-black p-1 rounded">CM</span>
                <span className="text-white">ClubManager</span>
              </Link>
              <Link href="/dashboard" className="flex items-center gap-2 text-blue-300 hover:text-blue-100">
                <Home className="h-5 w-5" />
                Dashboard
              </Link>
              <Link href="/dashboard/membership" className="flex items-center gap-2 text-blue-300 hover:text-blue-100">
                <Users className="h-5 w-5" />
                Membership Hub
              </Link>
              <Link href="/dashboard/events" className="flex items-center gap-2 text-blue-300 hover:text-blue-100">
                <Calendar className="h-5 w-5" />
                Event Management
              </Link>
              <Link href="/dashboard/recognition" className="flex items-center gap-2 text-blue-300 hover:text-blue-100">
                <Award className="h-5 w-5" />
                Recognition System
              </Link>
              <Link href="/dashboard/resources" className="flex items-center gap-2 text-blue-300 hover:text-blue-100">
                <DollarSign className="h-5 w-5" />
                Resources & Funds
              </Link>
              <Link href="/dashboard/settings" className="flex items-center gap-2 text-blue-300 hover:text-blue-100">
                <Settings className="h-5 w-5" />
                Settings
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <Link href="/dashboard" className="flex items-center gap-2 font-semibold md:text-lg">
          <span className="bg-[#EF4444] text-white p-3 text-sm rounded">CM</span>
          <span className="hidden md:inline text-white">ClubManager</span>
        </Link>
        <div className="relative ml-auto flex-1 md:grow-0 md:w-80">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-blue-400" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-full rounded-lg bg-black border-white/10 text-white focus:border-white/10 pl-8 md:w-80 placeholder:text-slate-400 backdrop-blur-sm"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto gap-2 border-white/10 hover:bg-white/5 hover:text-white bg-black text-white ">
              {activeClub}
              <ChevronDown className="h-4 w-4 text-white" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-black border-white/10 text-slate-200 backdrop-blur-md">
            <DropdownMenuLabel className="text-white">Switch Club</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-pink-200" />
            <DropdownMenuItem onClick={() => setActiveClub("Photography Club")} className="hover:bg-black/80">Photography Club</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setActiveClub("Debate Society")} className="hover:bg-white/5">Debate Society</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setActiveClub("Coding Club")} className="hover:bg-white/10 ">Coding Club</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button variant="outline" size="icon" className="relative border-white/10 bg-black hover:bg-white/5 hover:text-red-400">
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
            3
          </span>
          <span className="sr-only">Notifications</span>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full border border-blue-600/20 bg-blue-950/30 hover:bg-blue-900/50">
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                <AvatarFallback className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-black font-semibold">JD</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-black border-white/10 text-slate-200 backdrop-blur-md">
            <DropdownMenuLabel className="text-blue-300">My Account</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-blue-800/30" />
            <DropdownMenuItem className="hover:bg-blue-900/50 focus:bg-blue-900/50">Profile</DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-blue-900/50 focus:bg-blue-900/50">Settings</DropdownMenuItem>
            <DropdownMenuSeparator className="bg-blue-800/30" />
            <DropdownMenuItem className="hover:bg-blue-900/50 focus:bg-blue-900/50">Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
      <div className="flex flex-1">
        <aside className="hidden w-64 border-r border-white/10 bg-black backdrop-blur-sm md:block">
          <nav className="grid gap-2 p-4 text-sm">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-red-500/20 to-blue-500/20 text-white backdrop-blur-sm px-3 py-2 "
            >
              <Home className="h-5 w-5" />
              Dashboard
            </Link>
            <Link
              href="/dashboard/membership"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-white hover:bg-gray-800 hover:text-white"
            >
              <Users className="h-5 w-5" />
              Membership Hub
            </Link>
            <Link
              href="/dashboard/events"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-white hover:bg-gray-800 hover:text-white"
            >
              <Calendar className="h-5 w-5" />
              Event Management
            </Link>
            <Link
              href="/dashboard/recognition"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-white hover:bg-gray-800 hover:text-white"
            >
              <Award className="h-5 w-5" />
              Recognition System
            </Link>
            <Link
              href="/dashboard/resources"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-white hover:bg-gray-800 hover:text-white"
            >
              <DollarSign className="h-5 w-5" />
              Resources & Funds
            </Link>
            <Link
              href="/dashboard/settings"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-white hover:bg-gray-800 hover:text-white"
            >
              <Settings className="h-5 w-5" />
              Settings
            </Link>
          </nav>
        </aside>
        <main className="flex-1 p-4 md:p-6">
          <div className="flex flex-col gap-4 md:gap-8">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold tracking-tight text-white">
                {activeClub} Dashboard
              </h1>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card className="bg-gradient-to-r from-red-500/20 to-blue-500/20 border-b border-white/10 backdrop-blur-md overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-cyan-600/5 rounded-lg"></div>
                <CardHeader className="flex flex-row items-center justify-between pb-2 relative">
                  <CardTitle className="text-sm font-medium text-blue-200">Total Members</CardTitle>
                  <Users className="h-4 w-4 text-blue-400" />
                </CardHeader>
                <CardContent className="relative">
                  <div className="text-2xl font-bold text-white">127</div>
                  <p className="text-xs text-blue-300">+5 this month</p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-r from-red-500/20 to-blue-500/20 border-b border-white/10 backdrop-blur-md overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-cyan-600/5 rounded-lg"></div>
                <CardHeader className="flex flex-row items-center justify-between pb-2 relative">
                  <CardTitle className="text-sm font-medium text-blue-200">Upcoming Events</CardTitle>
                  <Calendar className="h-4 w-4 text-blue-400" />
                </CardHeader>
                <CardContent className="relative">
                  <div className="text-2xl font-bold text-white">4</div>
                  <p className="text-xs text-blue-300">Next: Photo Walk (2 days)</p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-r from-red-500/20 to-blue-500/20 border-b border-white/10 backdrop-blur-md overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-cyan-600/5 rounded-lg"></div>
                <CardHeader className="flex flex-row items-center justify-between pb-2 relative">
                  <CardTitle className="text-sm font-medium text-blue-200">Budget Remaining</CardTitle>
                  <CreditCard className="h-4 w-4 text-blue-400" />
                </CardHeader>
                <CardContent className="relative">
                  <div className="text-2xl font-bold text-white">$1,245</div>
                  <p className="text-xs text-blue-300">72% of total budget</p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-r from-red-500/20 to-blue-500/20 border-b border-white/10 backdrop-blur-md overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-cyan-600/5 rounded-lg"></div>
                <CardHeader className="flex flex-row items-center justify-between pb-2 relative">
                  <CardTitle className="text-sm font-medium text-blue-200">Active Tasks</CardTitle>
                  <MessageSquare className="h-4 w-4 text-blue-400" />
                </CardHeader>
                <CardContent className="relative">
                  <div className="text-2xl font-bold text-white">7</div>
                  <p className="text-xs text-blue-300">3 due this week</p>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="lg:col-span-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-md border-black overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-cyan-600/5 rounded-lg"></div>
                <CardHeader className="relative">
                  <CardTitle className="text-white">Upcoming Events</CardTitle>
                  <CardDescription className="text-gray-200">Manage your upcoming club events  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="grid place-items-center bg-black rounded-lg  p-2 h-12 w-12">
                        <Calendar className="h-6 text-white  w-6" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-white">Photo Walk Downtown</p>
                          <Badge style={{backgroundColor:"yellow",color:"black"}}>In 2 days</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">Saturday, 10:00 AM - 1:00 PM • 24 attendees</p>
                      </div>
                      <Button variant="outline" className="border-white/10 hover:bg-gray-600 cursor-pointer bg-black text-white" size="sm">
                        Details
                      </Button>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="grid place-items-center rounded-lg bg-black p-2 h-12 w-12">
                        <Calendar className="h-6 text-white w-6" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-white">Portrait Photography Workshop</p>
                          <Badge variant="outline" style={{backgroundColor:"yellow",color:"black"}}>In 5 days</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">Tuesday, 4:00 PM - 6:00 PM • 18 attendees</p>
                      </div>
                      <Button variant="outline" className="bg-black border-white/10 text-white" size="sm">
                        Details
                      </Button>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="grid place-items-center rounded-lg bg-black p-2 h-12 w-12">
                        <Calendar className="h-6 text-white w-6" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-white">Photo Exhibition Planning</p>
                          <Badge variant="outline" style={{backgroundColor:"yellow",color:"black"}}>In 8 days</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">Friday, 5:00 PM - 7:00 PM • 12 attendees</p>
                      </div>
                      <Button variant="outline" className="bg-black border-white/10 text-white" size="sm">
                        Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="lg:col-span-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-black backdrop-blur-md overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-cyan-600/5 rounded-lg"></div>
                <CardHeader className="relative">
                  <CardTitle className="text-white">Top Contributors</CardTitle>
                  <CardDescription className="text-blue-300/80">Members with highest engagement this month</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* First Contributor */}
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                        <AvatarFallback className=" text-black bg-[#EF4444]">SJ</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-1">
                        <p className="font-medium text-white">Sarah Johnson</p>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Badge variant="secondary"  className="mr-2 text-gray-200 bg-black outline-none">
                            245 points
                          </Badge>
                          <span>Event Organizer</span>
                        </div>
                      </div>
                    </div>

                    {/* Second Contributor */}
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                        <AvatarFallback className="text-black bg-[#EF4444]">ML</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-1">
                        <p className="font-medium text-white">Michael Lee</p>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Badge variant="secondary" className="mr-2 text-gray-200 bg-black outline-none">
                            210 points
                          </Badge>
                          <span>Workshop Leader</span>
                        </div>
                      </div>
                    </div>

                    {/* Third Contributor */}
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                        <AvatarFallback className="text-black bg-[#EF4444]">AP</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-1">
                        <p className="font-medium text-white">Aisha Patel</p>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Badge variant="secondary" className="mr-2 text-gray-200 bg-black outline-none">
                            185 points
                          </Badge>
                          <span>Social Media Manager</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
