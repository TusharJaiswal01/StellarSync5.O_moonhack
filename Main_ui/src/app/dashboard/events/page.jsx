"use client"

import { useState } from "react"
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  Filter,
  MapPin,
  Plus,
  Search,
  Users,
  Camera,
  CheckCircle,
  AlertCircle,
  Video,
  Zap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"

export default function EventsPage() {
  const [view, setView] = useState("upcoming")

  return (
    <div className="flex flex-col min-h-screen bg-black text-slate-200">
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Automated Event Management</h1>
          <p className="text-muted-foreground">Schedule and manage events with smart features</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600">
              <Plus className="h-4 w-4" />
              Create Event
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] bg-black text-white shadow-2xl shadow-blue-600">
            <DialogHeader>
              <DialogTitle>Create New Event</DialogTitle>
              <DialogDescription>
                Fill in the details to create a new event. The system will automatically check for conflicts.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="event-title" className="text-sm font-medium">
                  Event Title
                </label>
                <Input id="event-title" placeholder="Enter event title" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label htmlFor="event-date" className="text-sm font-medium">
                    Date
                  </label>
                  <Input id="event-date" type="date" />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="event-time" className="text-sm font-medium">
                    Time
                  </label>
                  <Input id="event-time" type="time" />
                </div>
              </div>
              <div className="grid gap-2">
                <label htmlFor="event-location" className="text-sm font-medium">
                  Location
                </label>
                <Input id="event-location" placeholder="Enter location" />
              </div>
              <div className="grid gap-2">
                <label htmlFor="event-description" className="text-sm font-medium">
                  Description
                </label>
                <textarea
                  id="event-description"
                  className="min-h-[100px] rounded-md border border-input bg-black px-3 py-2 text-sm"
                  placeholder="Enter event description"
                ></textarea>
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">Automated Features</label>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="reminder" />
                    <label
                      htmlFor="reminder"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Send automated reminders
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="attendance" />
                    <label
                      htmlFor="attendance"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Enable attendance tracking
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="conflict" />
                    <label
                      htmlFor="conflict"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Check for scheduling conflicts
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button className={"bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600"} type="submit">Create Event</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="p-4 md:p-6 space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className={"bg-slate-900/5 border-white/10 border backdrop-blur-md0"}>
              <ChevronLeft className="h-4 w-4 " />
              <span className="sr-only">Previous</span>
            </Button>
            <div className="text-sm font-medium">March 2025</div>
            <Button variant="outline" size="icon" className={"bg-slate-900/5 border-white/10 border backdrop-blur-md0"}>
              <ChevronRight className="h-4 w-4 "  />
              <span className="sr-only">Next</span>
            </Button>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-white" />
              <Input type="search" placeholder="Search events..." className="w-full pl-8 border-white/10" />
            </div>
            <Button variant="outline" size="sm" className="gap-2 bg-slate-900/35 border-white/10 backdrop-blur-md0 ">
              <Filter className="h-4 w-4  " />
              Filter
            </Button>
            <Select defaultValue="all">
              <SelectTrigger className="w-full border-white/10  sm:w-40">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent className={"bg-black border-white/10 text-white"}>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="workshop">Workshops</SelectItem>
                <SelectItem value="meeting">Meetings</SelectItem>
                <SelectItem value="social">Social Events</SelectItem>
                <SelectItem value="competition">Competitions</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs defaultValue="upcoming" className="w-full bg-slate-900/5 backdrop-blur-md" onValueChange={setView}>
          <TabsList className="grid w-full grid-cols-4 mb-4 bg-slate-900/5 backdrop-blur-md">
            <TabsTrigger value="upcoming" className="text-blue-300 hover:text-blue-200">
              Upcoming
            </TabsTrigger>
            <TabsTrigger value="past" className="text-blue-300 hover:text-blue-200">
              Past
            </TabsTrigger>
            <TabsTrigger value="calendar" className="text-blue-300 hover:text-blue-200">
              Calendar
            </TabsTrigger>
            <TabsTrigger value="automation" className="text-blue-300 hover:text-blue-200">
              Automation
            </TabsTrigger>
          </TabsList>
          <TabsContent value="upcoming" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card className="bg-gradient-to-br border border-white/30 from-gray-900/40 via-blue-500/20 to-black/50 backdrop-blur-md text-blue-200">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <Badge className="text-orange-400 border border-orange-400">Workshop</Badge>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-300 hover:text-blue-200">
                      <Calendar className="h-4 w-4 text-orange-400" />
                      <span className="sr-only">Add to calendar</span>
                    </Button>
                  </div>
                  <CardTitle className="text-2xl text-blue-300">Photo Walk Downtown</CardTitle>
                  <CardDescription className="text-blue-200">Explore urban photography techniques</CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex items-center gap-2 text-sm text-blue-200 mb-2">
                    <Calendar className="h-4 w-4" />
                    <span>Saturday, March 15, 2025</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-blue-200 mb-2">
                    <Clock className="h-4 w-4" />
                    <span>10:00 AM - 1:00 PM</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-blue-200 mb-4">
                    <MapPin className="h-4 w-4" />
                    <span>City Center Plaza</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-blue-200" />
                    <span className="text-sm text-blue-200">24 attendees</span>
                    <div className="ml-auto flex -space-x-2">
                      <Avatar className="h-6 w-6 border border-background">
                        <AvatarImage src="/placeholder.svg?height=24&width=24" alt="User" />
                        <AvatarFallback className="text-[10px] bg-black">U1</AvatarFallback>
                      </Avatar>
                      <Avatar className="h-6 w-6 border border-background">
                        <AvatarImage src="/placeholder.svg?height=24&width=24" alt="User" />
                        <AvatarFallback className="text-[10px] bg-black">U2</AvatarFallback>
                      </Avatar>
                      <Avatar className="h-6 w-6 border border-background">
                        <AvatarImage src="/placeholder.svg?height=24&width=24" alt="User" />
                        <AvatarFallback className="text-[10px] bg-black">U3</AvatarFallback>
                      </Avatar>
                      <div className="h-6 w-6 bg-black  rounded-full border flex items-center justify-center text-[10px] font-medium">
                        +21
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full bg-purple-900 ">
                    View Details
                  </Button>
                </CardFooter>
              </Card>

              <Card className="bg-gradient-to-br border border-white/30 from-gray-900/40 via-blue-500/20 to-black/50 backdrop-blur-md text-blue-200">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <Badge className="text-orange-400 border border-orange-400">Workshop</Badge>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-300 hover:text-blue-200">
                      <Calendar className="h-4 w-4 text-orange-400" />
                      <span className="sr-only">Add to calendar</span>
                    </Button>
                  </div>
                  <CardTitle className="text-2xl text-blue-300">Portrait Photography Workshop</CardTitle>
                  <CardDescription className="text-blue-200">Learn lighting techniques for portraits</CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex items-center gap-2 text-sm text-blue-200 mb-2">
                    <Calendar className="h-4 w-4" />
                    <span>Tuesday, March 18, 2025</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-blue-200 mb-2">
                    <Clock className="h-4 w-4" />
                    <span>4:00 PM - 6:00 PM</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-blue-200 mb-4">
                    <MapPin className="h-4 w-4" />
                    <span>Media Lab, Building C</span>
                  </div>
                  <div className="flex items-center gap-2 ">
                    <Users className="h-4 w-4 text-blue-200" />
                    <span className="text-sm text-blue-200">18 attendees</span>
                    <div className="ml-auto flex -space-x-2 ">
                      <Avatar className="h-6 w-6 border border-background">
                        <AvatarImage src="/placeholder.svg?height=24&width=24" alt="User" />
                        <AvatarFallback className="text-[10px] bg-black">U1</AvatarFallback>
                      </Avatar>
                      <Avatar className="h-6 w-6 border border-background">
                        <AvatarImage src="/placeholder.svg?height=24&width=24" alt="User" />
                        <AvatarFallback className="text-[10px] bg-black">U2</AvatarFallback>
                      </Avatar>
                      <div className="h-6 w-6 rounded-full bg-black border flex items-center justify-center text-[10px] font-medium">
                        +16
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full text-blue-300 bg-purple-900 backdrop-blur-md ">
                    View Details
                  </Button>
                </CardFooter>
              </Card>

              <Card className="bg-gradient-to-br border border-white/30 from-gray-900/40 via-blue-500/20 to-black/50  backdrop-blur-md text-blue-200">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <Badge className="text-orange-200 border border-orange-200">Meeting</Badge>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-300 hover:text-blue-200">
                      <Calendar className="h-4 w-4 text-orange-400" />
                      <span className="sr-only">Add to calendar</span>
                    </Button>
                  </div>
                  <CardTitle className="text-2xl text-blue-300">Photo Exhibition Planning</CardTitle>
                  <CardDescription className="text-blue-200">Planning session for end-of-semester exhibition</CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex items-center gap-2 text-sm text-blue-200 mb-2">
                    <Calendar className="h-4 w-4" />
                    <span>Friday, March 21, 2025</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-blue-200 mb-2">
                    <Clock className="h-4 w-4" />
                    <span>5:00 PM - 7:00 PM</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-blue-200 mb-4">
                    <MapPin className="h-4 w-4" />
                    <span>Conference Room 2B</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-blue-200" />
                    <span className="text-sm text-blue-200">12 attendees</span>
                    <div className="ml-auto flex -space-x-2">
                      <Avatar className="h-6 w-6 border border-background">
                        <AvatarImage src="/placeholder.svg?height=24&width=24" alt="User" />
                        <AvatarFallback className="text-[10px] bg-black">U1</AvatarFallback>
                      </Avatar>
                      <Avatar className="h-6 w-6 border border-background">
                        <AvatarImage src="/placeholder.svg?height=24&width=24" alt="User" />
                        <AvatarFallback className="text-[10px] bg-black">U2</AvatarFallback>
                      </Avatar>
                      <div className="h-6 w-6 rounded-full bg-black flex border items-center justify-center text-[10px] font-medium">
                        +10
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full text-blue-300 bg-purple-900 backdrop-blur-md ">
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="past" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card className="bg-gradient-to-br border border-white/30 from-gray-900/40 via-blue-500/20 to-black/50
 backdrop-blur-md text-blue-200">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <Badge variant="outline" className="text-orange-400 border border-orange-400">Workshop</Badge>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-300 hover:text-blue-200">
                      <Calendar className="h-4 w-4 text-orange-400" />
                      <span className="sr-only">Add to calendar</span>
                    </Button>
                  </div>
                  <CardTitle className="text-2xl text-blue-300">Nature Photography Walk</CardTitle>
                  <CardDescription className="text-blue-200">Capture wildlife and nature scenes</CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex items-center gap-2 text-sm text-blue-200 mb-2">
                    <Calendar className="h-4 w-4" />
                    <span>Saturday, March 1, 2025</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-blue-200 mb-2">
                    <Clock className="h-4 w-4" />
                    <span>8:00 AM - 11:00 AM</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-blue-200 mb-4">
                    <MapPin className="h-4 w-4" />
                    <span>National Park, Entrance A</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-blue-200" />
                    <span className="text-sm text-blue-200">20 attendees</span>
                    <div className="ml-auto flex -space-x-2">
                      <Avatar className="h-6 w-6 border">
                        <AvatarImage src="/placeholder.svg?height=24&width=24" alt="User" />
                        <AvatarFallback className="text-[10px] bg-black">U1</AvatarFallback>
                      </Avatar>
                      <Avatar className="h-6 w-6 border border-background">
                        <AvatarImage src="/placeholder.svg?height=24&width=24" alt="User" />
                        <AvatarFallback className="text-[10px] bg-black">U2</AvatarFallback>
                      </Avatar>
                      <div className="h-6 w-6 bg-black rounded-full border flex items-center justify-center text-[10px] font-medium">
                        +18
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full text-blue-300 bg-purple-900 backdrop-blur-md ">
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

      </div>
    </div>
  )
}

