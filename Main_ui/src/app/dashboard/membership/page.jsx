"use client"

import { useState } from "react"
import {
  Award,
  Check,
  Download,
  Filter,
  MoreHorizontal,
  Search,
  SortAsc,
  Star,
  X,
  UserPlus,
  Mail,
  MessageSquare,
  Sparkles,
  Users,
  Bell,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function MembershipPage() {
  const [selectedMembers, setSelectedMembers] = useState([])

  const members = [
    {
      id: "1",
      name: "Sarah Johnson",
      email: "sarah.j@university.edu",
      role: "President",
      status: "active",
      points: 245,
      joinDate: "Sep 2023",
      interests: ["Photography", "Leadership", "Event Planning"],
    },
    {
      id: "2",
      name: "Michael Lee",
      email: "m.lee@university.edu",
      role: "Vice President",
      status: "active",
      points: 210,
      joinDate: "Oct 2023",
      interests: ["Landscape Photography", "Teaching", "Hiking"],
    },
    {
      id: "3",
      name: "Aisha Patel",
      email: "a.patel@university.edu",
      role: "Secretary",
      status: "active",
      points: 185,
      joinDate: "Sep 2023",
      interests: ["Portrait Photography", "Social Media", "Design"],
    },
    {
      id: "4",
      name: "David Chen",
      email: "d.chen@university.edu",
      role: "Treasurer",
      status: "active",
      points: 170,
      joinDate: "Nov 2023",
      interests: ["Finance", "Organization", "Street Photography"],
    },
    {
      id: "5",
      name: "Emma Wilson",
      email: "e.wilson@university.edu",
      role: "Member",
      status: "active",
      points: 155,
      joinDate: "Jan 2024",
      interests: ["Wildlife Photography", "Editing", "Travel"],
    },
    {
      id: "6",
      name: "James Rodriguez",
      email: "j.rodriguez@university.edu",
      role: "Member",
      status: "inactive",
      points: 120,
      joinDate: "Oct 2023",
      interests: ["Sports Photography", "Videography"],
    },
    {
      id: "7",
      name: "Olivia Taylor",
      email: "o.taylor@university.edu",
      role: "Member",
      status: "active",
      points: 140,
      joinDate: "Dec 2023",
      interests: ["Macro Photography", "Nature", "Workshops"],
    },
  ]

  const toggleMember = (id) => {
    setSelectedMembers((prev) => (prev.includes(id) ? prev.filter((memberId) => memberId !== id) : [...prev, id]))
  }

  const toggleAllMembers = () => {
    if (selectedMembers.length === members.length) {
      setSelectedMembers([])
    } else {
      setSelectedMembers(members.map((member) => member.id))
    }
  }

  const recommendedEvents = [
    {
      title: "Portrait Photography Workshop",
      date: "March 18, 2025",
      members: ["Sarah Johnson", "Aisha Patel", "Emma Wilson"],
      match: "95% match",
    },
    {
      title: "Nature Photography Hike",
      date: "March 25, 2025",
      members: ["Michael Lee", "Olivia Taylor", "Emma Wilson"],
      match: "87% match",
    },
    {
      title: "Street Photography Walk",
      date: "April 2, 2025",
      members: ["David Chen", "James Rodriguez"],
      match: "82% match",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen h-full bg-black border-white/10 text-blue-100">
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Smart Membership Hub</h1>
          <p className="text-muted-foreground">Manage club members with AI-powered insights</p>
        </div>
        <Button className="gap-2 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600">
          <UserPlus className="h-4 w-4" />
          Add Member
        </Button>
      </div>

      <div className="p-4 md:p-6 space-y-6">
        <Tabs defaultValue="members" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4 bg-slate-900/5">
            <TabsTrigger value="members" >Members</TabsTrigger>
            <TabsTrigger value="insights">AI Insights</TabsTrigger>
            <TabsTrigger value="communication">Communication</TabsTrigger>
          </TabsList>

          <TabsContent value="members" className="space-y-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2">
                {selectedMembers.length > 0 && (
                  <>
                    <Button variant="outline" size="sm" className="gap-2 bg-black text-white border-white/10">
                      <Award className="h-4 w-4" />
                      Assign Role
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2 bg-black text-white border-white/10">
                      <Star className="h-4 w-4" />
                      Award Points
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2 text-destructive bg-black  border-white/10">
                      <X className="h-4 w-4" />
                      Remove
                    </Button>
                  </>
                )}
              </div>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="Search members..." className="w-full pl-8 border-white/10" />
                </div>
                <Button variant="outline" size="sm" className="gap-2 bg-slate-900/50 border-white/10">
                  <Filter className="h-4 w-4" />
                  Filter
                </Button>
                <Select defaultValue="all">
                  <SelectTrigger className="w-full bg-black border-white/10  sm:w-40">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent className="bg-black text-white border-white/10">
                    <SelectItem value="all" className="">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="icon" className={"bg-slate-900/50 border-white/10"}>
                  <Download className="h-4 w-4" />
                  <span className="sr-only">Download</span>
                </Button>
              </div>
            </div>

            <div className="rounded-md border-gray-800 bg-white/5 border-[0.25px]">
              <Table className={""}>
                <TableHeader>
                  <TableRow className={"border-gray-800"}>
                    <TableHead className="w-12 border-gray-800">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          className="h-4 w-4 rounded  "
                          checked={selectedMembers.length === members.length}
                          onChange={toggleAllMembers}
                        />
                      </div>
                    </TableHead>
                    <TableHead className={"text-yellow-300 text-md"}>Member</TableHead>
                    <TableHead className={"text-yellow-300 text-md"}>Role</TableHead>
                    <TableHead className={"text-yellow-300 text-md"}>Status</TableHead>
                    <TableHead className="hidden md:table-cell  text-white text-md">
                      <div className="flex items-center text-yellow-300 gap-1">
                        Points
                        <SortAsc className="h-4 w-4 text-yellow-300" />
                      </div>
                    </TableHead>
                    <TableHead className="hidden md:table-cell text-yellow-300 text-md">Join Date</TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {members.map((member) => (
                    <TableRow className={"border-gray-800"} key={member.id}>
                      <TableCell>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            className="h-4 w-4 rounded border-green-600"
                            checked={selectedMembers.includes(member.id)}
                            onChange={() => toggleMember(member.id)}
                          />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src="/placeholder.svg?height=32&width=32" alt={member.name} />
                            <AvatarFallback className={"bg-black text-white border-[0.15px]"}>
                              {member.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{member.name}</div>
                            <div className="text-sm text-muted-foreground">{member.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{member.role}</TableCell>
                      <TableCell>
                        <Badge className={member.status === "active" ? 'border-green-400' : 'border-red-400'} variant={member.status === "active" ? "default" : "outline"}>
                          {member.status === "active" ? (
                            <div className="flex items-center gap-1 text-green-400   ">
                              <Check className="h-3 w-3" />
                              Active
                            </div>
                          ) : (
                            <div className="text-red-400">Inactive</div>
                          )}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{member.points}</TableCell>
                      <TableCell className="hidden md:table-cell">{member.joinDate}</TableCell>
                      <TableCell>
                        <DropdownMenu className="bg-black ">
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>View Profile</DropdownMenuItem>
                            <DropdownMenuItem>Edit Member</DropdownMenuItem>
                            <DropdownMenuItem>Assign Role</DropdownMenuItem>
                            <DropdownMenuItem>Award Points</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">Remove Member</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card className="border-white/10 bg-white/5 hover:bg-white/10  text-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Sparkles className="h-5 w-5 text-white" />
                    AI Recommendations
                  </CardTitle>
                  <CardDescription className="text-blue-200">Personalized event suggestions based on member interests</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recommendedEvents.map((event, index) => (
                    <div key={index} className="border-white/20 border rounded-lg p-3 space-y-2 bg-slate-900/5">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium text-blue-200">{event.title}</h4>
                        <Badge variant="secondary" className="text-gray-200 bg-[#332911]">{event.match}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">Date: {event.date}</p>
                      <div className="flex flex-wrap gap-1">
                        <p className="text-xs text-muted-foreground">Recommended for:</p>
                        {event.members.map((member, i) => (
                          <Badge key={i} variant="outline" className="text-xs border-orange-500/50 text-orange-400 border">
                            {member}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className=" text-blue-200 border-white/10 bg-white/5 hover:bg-white/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Award className="h-5 w-5 text-white" />
                    Engagement Insights
                  </CardTitle>
                  <CardDescription className="text-blue-200">Member participation and activity trends</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <p className="text-sm font-medium text-yellow-400">Most Active Members</p>
                        <p className="text-sm text-muted-foreground">Last 30 days</p>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <p className="text-sm text-blue-200">Sarah Johnson</p>
                          <div className="w-1/2 h-2 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-[#97ff56]" style={{ width: "85%" }}></div>
                          </div>
                          <p className="text-sm font-medium text-blue-200">85%</p>
                        </div>
                        <div className="flex justify-between items-center">
                          <p className="text-sm text-blue-200">Michael Lee</p>
                          <div className="w-1/2 h-2 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-[#ffcc56]" style={{ width: "72%" }}></div>
                          </div>
                          <p className="text-sm font-medium text-blue-200">72%</p>
                        </div>
                        <div className="flex justify-between items-center">
                          <p className="text-sm text-blue-200">Aisha Patel</p>
                          <div className="w-1/2 h-2 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-[#de4e4e]" style={{ width: "68%" }}></div>
                          </div>
                          <p className="text-sm font-medium text-blue-200">68%</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm font-medium text-yellow-400">Membership Growth</p>
                      <div className="h-32 bg-black border  border-gray-600 rounded-lg flex items-end justify-between p-2">
                        <div className="h-[60%] w-8 bg-[#4BC0C0] rounded"></div>
                        <div className="h-[40%] w-8 bg-[#4BC0C0] rounded"></div>
                        <div className="h-[70%] w-8 bg-[#4BC0C0] rounded"></div>
                        <div className="h-[90%] w-8 bg-[#4BC0C0] rounded"></div>
                        <div className="h-[75%] w-8 bg-[#4BC0C0] rounded"></div>
                        <div className="h-[85%] w-8 bg-[#4BC0C0] rounded"></div>
                      </div>
                      <div className="flex justify-between text-xs text-[#636262]">
                        <span>Oct</span>
                        <span>Nov</span>
                        <span>Dec</span>
                        <span>Jan</span>
                        <span>Feb</span>
                        <span>Mar</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className=" text-white border-white/10 bg-white/5 hover:bg-white/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Users className="h-5 w-5 text-white" />
                    Member Interests
                  </CardTitle>
                  <CardDescription className="text-blue-200">Common interests among members</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      <Badge className="  text-[#FF5555] hover:bg-primary/30 border-[#FF5555]">
                        Photography (7)
                      </Badge>
                      <Badge className=" text-[#FF5555] hover:bg-primary/30 border-[#FF5555]">
                        Event Planning (3)
                      </Badge>
                      <Badge className=" text-[#FF5555] hover:bg-primary/30 border-[#FF5555]">Editing (3)</Badge>
                      <Badge className=" text-[#FF5555] hover:bg-primary/30 border-[#FF5555]">
                        Leadership (2)
                      </Badge>
                      <Badge className=" text-[#FF5555] hover:bg-primary/30 border-[#FF5555]">Teaching (2)</Badge>
                      <Badge className=" text-[#FF5555] hover:bg-primary/30 border-[#FF5555]">Nature (2)</Badge>
                      <Badge className=" text-[#FF5555] hover:bg-primary/30 border-[#FF5555]">Travel (2)</Badge>
                      <Badge className=" text-[#FF5555] hover:bg-primary/30 border-[#FF5555]">Design (1)</Badge>
                      <Badge className=" text-[#FF5555] hover:bg-primary/30 border-[#FF5555]">Finance (1)</Badge>
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm font-medium text-yellow-400">Suggested Activities</p>
                      <ul className="space-y-2">
                        <li className="text-sm flex items-center gap-2 text-blue-200">
                          <Check className="h-4 w-4 text-blue-300" />
                          Photography workshop focusing on nature themes
                        </li>
                        <li className="text-sm flex items-center gap-2 text-blue-200">
                          <Check className="h-4 w-4 text-blue-300" />
                          Leadership and event planning seminar
                        </li>
                        <li className="text-sm flex items-center gap-2 text-blue-200">
                          <Check className="h-4 w-4 text-blue-300" />
                          Photo editing masterclass with professional
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>


          <TabsContent value="communication" className="space-y-4">
            <Card className=" border-white/10 bg-white/5 border text-blue-200">
              <CardHeader>
                <CardTitle className="text-white">Communication Tools</CardTitle>
                <CardDescription className="text-blue-200">Reach out to members efficiently</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-3">
                  <Button className="h-auto py-4 flex flex-col items-center gap-2 border border-white/10  text-blue-200 bg-emerald-400 ">
                    <Mail className="h-6 w-6  text-black" />
                    <span className="text-black">Send Email</span>
                    <span className="text-xs text-gray-800">Reach all members</span>
                  </Button>

                  <Button variant="outline" className="border border-white/10 h-auto py-4 flex flex-col items-center gap-2 bg-slate-900/5 hover:bg-emerald-400 hover:text-black text-blue-200 ">
                    <MessageSquare className="h-6 w-6" />
                    <span>Group Chat</span>
                    <span className="text-xs text-muted-foreground">Real-time discussion</span>
                  </Button>

                  <Button variant="outline" className="hover:bg-emerald-400 border border-white/10 h-auto py-4 flex flex-col items-center gap-2 bg-slate-900/5 text-blue-200 ">
                    <Bell className="h-6 w-6" />
                    <span>Notifications</span>
                    <span className="text-xs text-muted-foreground">Send alerts</span>
                  </Button>
                </div>

                <div className="border border-white/10 rounded-lg p-4 bg-gray-900">
                  <h3 className="font-medium mb-2 text-lime-200">Quick Message</h3>
                  <div className="space-y-4">
                    <Select defaultValue="all" className="bg-slate-900/5 text-blue-200">
                      <SelectTrigger className="text-blue-200">
                        <SelectValue placeholder="Select recipients" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Members</SelectItem>
                        <SelectItem value="active">Active Members</SelectItem>
                        <SelectItem value="inactive">Inactive Members</SelectItem>
                        <SelectItem value="leadership">Leadership Team</SelectItem>
                      </SelectContent>
                    </Select>

                    <Input className="bg-slate-900/5 text-blue-200" placeholder="Subject" />

                    <div className="border rounded-md bg-slate-900/5">
                      <textarea
                        className="w-full h-32 p-2 rounded-md focus:outline-none bg-slate-900/5 text-blue-200"
                        placeholder="Type your message here..."
                      ></textarea>
                    </div>

                    <div className="flex justify-end">
                      <Button className="bg-lime-200 text-black hover:bg-amber-300">Send Message</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

        </Tabs>
      </div>
    </div>
  )
}

