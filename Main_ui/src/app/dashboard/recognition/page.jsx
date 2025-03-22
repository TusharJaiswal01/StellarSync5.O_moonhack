"use client"

import { useState } from "react"
import {
  Star,
  Trophy,
  Users,
  Gift,
  Plus,
  Search,
  Filter,
  Medal,
  Crown,
  Sparkles,
  Zap,
  CheckCircle,
  UserPlus,
  Calendar,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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

export default function RecognitionPage() {
  const [selectedTab, setSelectedTab] = useState("leaderboard")

  const topMembers = [
    {
      id: "1",
      name: "Sarah Johnson",
      role: "President",
      points: 245,
      badges: ["Event Organizer", "Workshop Leader", "Top Contributor"],
      avatar: "/placeholder.svg?height=40&width=40",
      level: 5,
    },
    {
      id: "2",
      name: "Michael Lee",
      role: "Vice President",
      points: 210,
      badges: ["Workshop Leader", "Mentor"],
      avatar: "/placeholder.svg?height=40&width=40",
      level: 4,
    },
    {
      id: "3",
      name: "Aisha Patel",
      role: "Secretary",
      points: 185,
      badges: ["Social Media Manager", "Creative"],
      avatar: "/placeholder.svg?height=40&width=40",
      level: 4,
    },
    {
      id: "4",
      name: "David Chen",
      role: "Treasurer",
      points: 170,
      badges: ["Finance Expert"],
      avatar: "/placeholder.svg?height=40&width=40",
      level: 3,
    },
    {
      id: "5",
      name: "Emma Wilson",
      role: "Member",
      points: 155,
      badges: ["Rising Star"],
      avatar: "/placeholder.svg?height=40&width=40",
      level: 3,
    },
  ]

  const achievements = [
    {
      id: "1",
      name: "Event Organizer",
      description: "Organized 3 or more club events",
      icon: <Calendar className="h-5 w-5 text-primary" />,
      points: 50,
      rarity: "Uncommon",
    },
    {
      id: "2",
      name: "Workshop Leader",
      description: "Led a workshop or training session",
      icon: <Users className="h-5 w-5 text-primary" />,
      points: 75,
      rarity: "Rare",
    },
    {
      id: "3",
      name: "Perfect Attendance",
      description: "Attended all club meetings for a semester",
      icon: <CheckCircle className="h-5 w-5 text-primary" />,
      points: 100,
      rarity: "Epic",
    },
    {
      id: "4",
      name: "Social Media Star",
      description: "Created content that reached 1000+ views",
      icon: <Star className="h-5 w-5 text-primary" />,
      points: 60,
      rarity: "Uncommon",
    },
    {
      id: "5",
      name: "Recruitment Champion",
      description: "Brought in 5+ new members",
      icon: <UserPlus className="h-5 w-5 text-primary" />,
      points: 80,
      rarity: "Rare",
    },
  ]

  return (
    <div className="flex flex-col h-full bg-black">
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <div className="text-blue-100">
          <h1 className="text-2xl font-bold tracking-tight ">AI-Driven Recognition System</h1>
          <p className="text-muted-foreground">Track contributions and reward active members</p>
        </div>
        <Dialog >
          <DialogTrigger asChild>
            <Button className="gap-2 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600">
              <Plus className="h-4 w-4" />
              Award Points
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px] bg-slate-900/95">
            <DialogHeader>
              <DialogTitle className="text-blue-100">Award Points to Member</DialogTitle>
              <DialogDescription className="text-blue-200">Recognize member contributions by awarding points.</DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="member" className="text-sm font-medium text-blue-200">
                  Select Member
                </label>
                <Select>
                  <SelectTrigger className="text-blue-100 bg-slate-800 border-slate-700 hover:bg-slate-700/5">
                    <SelectValue placeholder="Select a member" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-900 text-blue-100">
                    {topMembers.map((member) => (
                      <SelectItem key={member.id} value={member.id} className="hover:bg-slate-800">
                        {member.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <label htmlFor="points" className="text-sm font-medium text-blue-200">
                  Points to Award
                </label>
                <Input
                  id="points"
                  type="number"
                  min="1"
                  placeholder="Enter points"
                  className="bg-slate-800 text-blue-100 border-slate-700 placeholder:text-blue-300 focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="grid gap-2">
                <label htmlFor="reason" className="text-sm font-medium text-blue-200">
                  Reason
                </label>
                <Select className="bg-slate-800 text-blue-100 border-slate-700 hover:bg-slate-700/5">
                  <SelectTrigger>
                    <SelectValue placeholder="Select a reason" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-900 text-blue-100">
                    <SelectItem value="event">Event Organization</SelectItem>
                    <SelectItem value="workshop">Workshop Leadership</SelectItem>
                    <SelectItem value="attendance">Perfect Attendance</SelectItem>
                    <SelectItem value="content">Content Creation</SelectItem>
                    <SelectItem value="recruitment">Member Recruitment</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <label htmlFor="notes" className="text-sm font-medium text-blue-200">
                  Additional Notes
                </label>
                <textarea
                  id="notes"
                  className="min-h-[80px] rounded-md border border-slate-700 bg-slate-800 text-blue-100 placeholder:text-blue-300 focus:ring-2 focus:ring-blue-600"
                  placeholder="Enter additional details"
                ></textarea>
              </div>
            </div>

            <DialogFooter>
              <Button type="submit" className="w-full hover:bg-blue-600 text-blue-100 bg-blue-500">
                Award Points
              </Button>
            </DialogFooter>
          </DialogContent>

        </Dialog>
      </div>

      <div className="p-4 md:p-6 space-y-6">
        <Tabs defaultValue="leaderboard" className="w-full" onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-3 mb-4 bg-slate-900/10">
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="gamification">Gamification</TabsTrigger>
          </TabsList>

          <TabsContent value="leaderboard" className="space-y-6 bg-slate-900/5 text-blue-100">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2">
                <Select defaultValue="month">
                  <SelectTrigger className="w-[150px]  text-blue-100 border-slate-700 hover:bg-slate-700/5">
                    <SelectValue placeholder="Time Period" className="text-blue-100" />
                  </SelectTrigger>
                  <SelectContent className="bg-black text-blue-100 border-slate-700">
                    <SelectItem value="week" className="hover:bg-slate-800">
                      This Week
                    </SelectItem>
                    <SelectItem value="month" className="hover:bg-slate-800">
                      This Month
                    </SelectItem>
                    <SelectItem value="semester" className="hover:bg-slate-800">
                      This Semester
                    </SelectItem>
                    <SelectItem value="all" className="hover:bg-slate-800">
                      All Time
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="Search members..." className="w-full pl-8 border-white/10" />
                </div>
                <Button variant="outline" size="sm" className="gap-2 bg-slate-900/40 border-white/10 text-blue-100 ">
                  <Filter className="h-4 w-4" />
                  Filter
                </Button>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <Card className="md:col-span-2 bg-blue-800/25 hover:bg-blue-800/35 border-white/10">
                <CardHeader >
                  <CardTitle className="text-blue-100">Top Contributors</CardTitle>
                  <CardDescription className="text-muted-foreground">Members with the highest points this month</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {topMembers.map((member, index) => (
                    <div key={member.id} className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-black border font-medium">
                        {index === 0 ? (
                          <Crown className="h-5 w-5 text-yellow-500  " />
                        ) : index === 1 ? (
                          <Medal className="h-5 w-5 text-gray-400" />
                        ) : index === 2 ? (
                          <Medal className="h-5 w-5 text-amber-700" />
                        ) : (
                          <div className="text-white">  {index + 1} </div>
                         
                        )}
                      </div>
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={member.avatar} alt={member.name} />
                        <AvatarFallback className={"text-white  border bg-black"}>
                          {member.name.split(" ").map((n) => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center">
                          <p className="font-medium text-blue-100">{member.name}</p>
                          <Badge variant="outline" className="ml-2 text-black backdrop-brightness-90 bg-amber-200">{member.role}</Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className={"bg-green-400"}>Level {member.level}</Badge>
                          <div className="flex gap-1">
                            {member.badges.slice(0, 2).map((badge, i) => (
                              <Badge key={i} variant="outline" className="text-xs text-blue-50">
                                {badge}
                              </Badge>
                            ))}
                            {member.badges.length > 2 && (
                              <Badge variant="outline" className="text-xs text-blue-50">
                                +{member.badges.length - 2}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-lg text-yellow-200">{member.points}</div>
                        <div className="text-xs text-muted-foreground">points</div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-blue-800/25 hover:bg-blue-800/35 border-white/10">
                <CardHeader>
                  <CardTitle className="text-blue-100">Points Distribution</CardTitle>
                  <CardDescription className="text-muted-foreground">How points are earned</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-blue-100">
                      <span>Event Organization</span>
                      <span className="font-medium">35%</span>
                    </div>
                    <Progress value={35} className="h-2 " />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-blue-100">
                      <span>Workshop Leadership</span>
                      <span className="font-medium">25%</span>
                    </div>
                    <Progress value={25} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-blue-100">
                      <span>Attendance</span>
                      <span className="font-medium">20%</span>
                    </div>
                    <Progress value={20} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-blue-100">
                      <span>Content Creation</span>
                      <span className="font-medium">15%</span>
                    </div>
                    <Progress value={15} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-blue-100">
                      <span>Other</span>
                      <span className="font-medium">5%</span>
                    </div>
                    <Progress value={5} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>


          <TabsContent value="achievements" className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <h3 className="text-lg font-medium text-white">Available Achievements</h3>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-white" />
                  <Input
                    type="search"
                    placeholder="Search achievements..."
                    className="w-full pl-8 bg-black text-white border-white/10 "
                  />
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-full sm:w-40 bg-black text-white border-white/10 hover:bg-slate-700/5">
                    <SelectValue placeholder="Rarity" />
                  </SelectTrigger>
                  <SelectContent className="bg-black text-blue-100 border-slate-700">
                    <SelectItem value="all" className="hover:bg-slate-800">All Rarities</SelectItem>
                    <SelectItem value="common" className="hover:bg-slate-800">Common</SelectItem>
                    <SelectItem value="uncommon" className="hover:bg-slate-800">Uncommon</SelectItem>
                    <SelectItem value="rare" className="hover:bg-slate-800">Rare</SelectItem>
                    <SelectItem value="epic" className="hover:bg-slate-800">Epic</SelectItem>
                    <SelectItem value="legendary" className="hover:bg-slate-800">Legendary</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {achievements.map((achievement) => (
                <Card key={achievement.id} className="bg-gradient-to-r from-blue-500/20 border-white/10 to-purple-500/20 backdrop-blur-md transition duration-300">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <Badge
                        // className="text-blue-100"
                        variant={
                          achievement.rarity === "Common"
                            ? ""
                            : achievement.rarity === "Uncommon"
                              ? ""
                              : achievement.rarity === "Rare"
                                ? ""
                                : achievement.rarity === "Epic"
                                  ? ""
                                  : "outline"
                        }
                        className={achievement.rarity=== "Common" ? "border-green-500/50 text-green-400" :
                          achievement.rarity === "Uncommon" ? "border-blue-500/50 text-blue-400" : 
                          achievement.rarity === "Rare" ? "border-red-500/50 text-red-400" : 
                          achievement.rarity === "Epic" ? "border-purple-500/50 text-purple-500" : 
                          "border-white"


                          
                        }
                      >
                        {achievement.rarity}
                      </Badge>
                      <div className="text-sm font-medium text-yellow-300">{achievement.points} pts</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-full  bg-amber-300">{achievement.icon}</div>
                      <CardTitle className="text-lg text-blue-100 ">{achievement.name}</CardTitle>
                    </div>
                    <CardDescription className="text-muted-foreground">{achievement.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">
                        <span>{achievement.members ? achievement.members.length : 0} members earned this</span>
                      </div>
                      <div className="flex -space-x-2">
                        {(achievement.members || []).slice(0, 3).map((member, idx) => (
                          <Avatar key={idx} className="h-6 w-6 border-2 border-background">
                            <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                            <AvatarFallback className="text-[10px]">
                              {member.name.split(" ").map((n) => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

            </div>
          </TabsContent>

          <TabsContent value="gamification" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card className="bg-blue-800/25 hover:bg-blue-800/35 text-white hover:shadow-lg border-white/10 transition-all duration-300 rounded-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Trophy className="h-5 w-5 text-orange-400" />
                    Levels & Progression
                  </CardTitle>
                  <CardDescription className="text-gray-400">Member progression system</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <h4 className="text-sm font-medium text-gray-300">Level Requirements</h4>
                    </div>
                    <div className="space-y-2 text-sm text-gray-400">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="bg-orange-300">Level 1</Badge>
                          <span>Novice</span>
                        </div>
                        <span>0-50 points</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="bg-orange-400">Level 2</Badge>
                          <span>Apprentice</span>
                        </div>
                        <span>51-100 points</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="bg-orange-500">Level 3</Badge>
                          <span>Enthusiast</span>
                        </div>
                        <span>101-175 points</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="bg-orange-600">Level 4</Badge>
                          <span>Expert</span>
                        </div>
                        <span>176-250 points</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="bg-orange-700">Level 5</Badge>
                          <span>Master</span>
                        </div>
                        <span>251+ points</span>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-4 border-slate-600">
                    <h4 className="text-sm font-medium text-gray-300 mb-2">Level Benefits</h4>
                    <ul className="space-y-2 text-sm text-gray-400">
                      <li className="flex items-start gap-2">
                        <Sparkles className="h-4 w-4  mt-0.5" />
                        <span>Access to exclusive club events</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Sparkles className="h-4 w-4 mt-0.5" />
                        <span>Leadership opportunities</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Sparkles className="h-4 w-4  mt-0.5" />
                        <span>Special recognition at club meetings</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Sparkles className="h-4 w-4  mt-0.5" />
                        <span>Priority access to equipment and resources</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-blue-800/25 hover:bg-blue-800/35 border-white/10 hover:shadow-lg transition-all duration-300 rounded-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Gift className="h-5 w-5 text-orange-400" />
                    Rewards & Incentives
                  </CardTitle>
                  <CardDescription className="text-gray-400">Tangible rewards for active members</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="border rounded-lg p-3 space-y-2 border-white/10 bg-slate-700/5">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium text-gray-300">Club T-Shirt</h4>
                        <Badge className="bg-transparent border-green-500 border text-green-500 ">150 points</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">Custom designed club t-shirt</p>
                      <Button variant="outline" size="sm" className="bg-green-400 hover:bg-green-700">
                        Redeem
                      </Button>
                    </div>

                    <div className="border rounded-lg p-3 space-y-2 border-white/10 bg-slate-700/5">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium text-gray-300">Photography Workshop</h4>
                        <Badge className="bg-transparent border-green-500 border text-green-500 ">200 points</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">Free entry to premium workshop</p>
                      <Button variant="outline" size="sm" className="bg-green-400 hover:bg-green-700">
                        Redeem
                      </Button>
                    </div>

                    <div className="border rounded-lg p-3 space-y-2 border-white/10 bg-slate-700/5">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium text-gray-300">Equipment Rental</h4>
                        <Badge className="bg-transparent border-green-500 border text-green-500 ">100 points</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">Free camera equipment rental for a weekend</p>
                      <Button variant="outline" size="sm" className="bg-green-400 hover:bg-green-700">
                        Redeem
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-blue-800/25 hover:bg-blue-800/35 border-white/10 hover:shadow-lg transition-all duration-300 rounded-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Zap className="h-5 w-5 text-orange-400" />
                    Challenges & Quests
                  </CardTitle>
                  <CardDescription className="text-gray-400">Special tasks to earn bonus points</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="border border-white/10 rounded-lg p-3 space-y-2 bg-slate-700/5">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium text-gray-300">New Member Mentor</h4>
                        <Badge variant="secondary" className="bg-transparent text-yellow-200">+50 points</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">Help onboard 3 new members this month</p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">Progress: 1/3</span>
                        <Progress value={33} className="h-2 w-24 bg-primary" />
                      </div>
                    </div>

                    <div className="border border-white/10  rounded-lg p-3 space-y-2 bg-slate-700/5">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium text-gray-300">Content Creator</h4>
                        <Badge variant="secondary" className="bg-transparent text-yellow-200">+75 points</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">Create 5 social media posts for the club</p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">Progress: 3/5</span>
                        <Progress value={60} className="h-2 w-24 bg-primary" />
                      </div>
                    </div>

                    <div className="border border-white/10  rounded-lg p-3 space-y-2 bg-slate-700/5">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium text-gray-300">Perfect Attendance</h4>
                        <Badge variant="secondary" className="bg-transparent text-yellow-200">+100 points</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">Attend all club events this month</p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">Progress: 4/6</span>
                        <Progress value={67} className="h-2 w-24 bg-primary" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

        </Tabs>
      </div>
    </div>
  )
}

