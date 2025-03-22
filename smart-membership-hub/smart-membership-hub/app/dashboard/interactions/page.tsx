"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Bell, ChevronRight, ThumbsUp, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

export default function InteractionsPage() {
  const [user, setUser] = useState<any>(null)
  const [members, setMembers] = useState<any[]>([])
  const [notifications, setNotifications] = useState<any[]>([])
  const [feedbackForm, setFeedbackForm] = useState({
    name: "",
    email: "",
    rating: "5",
    message: "",
  })
  const [recommendations, setRecommendations] = useState<any[]>([])

  useEffect(() => {
    // Load user data
    const userData = localStorage.getItem("user")
    if (userData) {
      const parsedUser = JSON.parse(userData)
      setUser(parsedUser)
      setFeedbackForm((prev) => ({
        ...prev,
        name: parsedUser.name,
        email: parsedUser.email,
      }))
    }

    // Load members data
    const membersData = localStorage.getItem("members")
    if (membersData) {
      setMembers(JSON.parse(membersData))
    }

    // Load notifications data
    const notificationsData = localStorage.getItem("notifications")
    if (notificationsData) {
      setNotifications(JSON.parse(notificationsData))
    }

    // Generate recommendations based on user tier
    generateRecommendations()
  }, [])

  const generateRecommendations = () => {
    const userData = localStorage.getItem("user")
    if (!userData) return

    const user = JSON.parse(userData)
    let recommendations = []

    if (user.membershipTier === "Basic") {
      recommendations = [
        {
          id: "rec-1",
          title: "Upgrade to Premium",
          description: "Get access to exclusive content and priority support",
          tier: "Premium",
          price: "$149.99/year",
          benefits: ["Priority Support", "Exclusive Content", "Advanced Features"],
        },
        {
          id: "rec-2",
          title: "Add Family Member",
          description: "Add a family member to your Basic plan at a discounted rate",
          tier: "Basic",
          price: "$49.99/year",
          benefits: ["Share Benefits", "Family Access", "Discounted Rate"],
        },
      ]
    } else if (user.membershipTier === "Premium") {
      recommendations = [
        {
          id: "rec-1",
          title: "Upgrade to VIP",
          description: "Get the ultimate membership experience with VIP benefits",
          tier: "VIP",
          price: "$299.99/year",
          benefits: ["Concierge Service", "Exclusive Events", "All Premium Features"],
        },
        {
          id: "rec-2",
          title: "Add Premium Add-on",
          description: "Enhance your Premium membership with additional features",
          tier: "Premium",
          price: "$49.99/year",
          benefits: ["Advanced Analytics", "Priority Scheduling", "Extended Support"],
        },
      ]
    } else {
      recommendations = [
        {
          id: "rec-1",
          title: "VIP Family Plan",
          description: "Add family members to your VIP plan at an exclusive rate",
          tier: "VIP",
          price: "$199.99/year per member",
          benefits: ["Share VIP Benefits", "Family Access", "Exclusive Rate"],
        },
        {
          id: "rec-2",
          title: "Extended VIP Support",
          description: "Get 24/7 dedicated support for your VIP membership",
          tier: "VIP",
          price: "$99.99/year",
          benefits: ["24/7 Support", "Dedicated Agent", "Priority Resolution"],
        },
      ]
    }

    setRecommendations(recommendations)
  }

  const handleSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault()

    // Simulate feedback submission
    alert("Thank you for your feedback! We appreciate your input.")

    // Reset form
    setFeedbackForm({
      name: user?.name || "",
      email: user?.email || "",
      rating: "5",
      message: "",
    })
  }

  const markAllNotificationsAsRead = () => {
    const updatedNotifications = notifications.map((notification) => ({
      ...notification,
      read: true,
    }))

    setNotifications(updatedNotifications)
    localStorage.setItem("notifications", JSON.stringify(updatedNotifications))
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold ">User Interactions</h1>
        <p className="text-muted-foreground">Manage notifications, get recommendations, and provide feedback</p>
      </div>

      <Tabs defaultValue="notifications" className="space-y-4">
        <TabsList className="glass-panel">
          <TabsTrigger value="notifications" className="flex items-center">
            <Bell className="mr-2 h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="recommendations" className="flex items-center">
            <TrendingUp className="mr-2 h-4 w-4" />
            Recommendations
          </TabsTrigger>
          <TabsTrigger value="feedback" className="flex items-center">
            <ThumbsUp className="mr-2 h-4 w-4" />
            Feedback
          </TabsTrigger>
        </TabsList>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-4">
          <Card className="border border-slate-700/50 bg-slate-900/60 backdrop-blur-md">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>Stay updated with important alerts and information</CardDescription>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={markAllNotificationsAsRead}
                className="border border-neon-blue hover:shadow-neon-blue transition-shadow"
              >
                Mark all as read
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notifications.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">No notifications to display</div>
                ) : (
                  notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`flex items-start p-3 rounded-lg ${
                        notification.read ? "bg-background/20" : "bg-primary/10"
                      }`}
                    >
                      <div
                        className={`mr-4 rounded-full p-2 ${
                          notification.type === "renewal"
                            ? "bg-neon-blue/10 text-neon-blue"
                            : notification.type === "payment"
                              ? "bg-neon-pink/10 text-neon-pink"
                              : notification.type === "new"
                                ? "bg-neon-green/10 text-neon-green"
                                : notification.type === "upgrade"
                                  ? "bg-neon-purple/10 text-neon-purple"
                                  : "bg-gray-500/10 text-gray-500"
                        }`}
                      >
                        <Bell className="h-4 w-4" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium leading-none">{notification.title}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(notification.date).toLocaleDateString()}
                          </p>
                        </div>
                        <p className="text-sm text-muted-foreground">{notification.message}</p>
                      </div>
                      {!notification.read && <div className="ml-2 h-2 w-2 rounded-full bg-primary" />}
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Recommendations Tab */}
        <TabsContent value="recommendations" className="space-y-4">
          <Card className="border border-slate-700/50 bg-slate-900/60 backdrop-blur-md">
            <CardHeader>
              <CardTitle>Smart Recommendations</CardTitle>
              <CardDescription>Personalized suggestions based on your membership activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recommendations.map((recommendation) => (
                  <Card
                    key={recommendation.id}
                    className="overflow-hidden border-2 border-primary/20 hover:border-primary/50 transition-colors glass-panel"
                  >
                    <CardHeader className="bg-primary/10">
                      <Badge className="w-fit mb-2" variant="outline">
                        {recommendation.tier} Tier
                      </Badge>
                      <CardTitle>{recommendation.title}</CardTitle>
                      <CardDescription>{recommendation.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <p className="text-2xl font-bold mb-4 text-neon-green">{recommendation.price}</p>
                      <div className="space-y-2">
                        {recommendation.benefits.map((benefit, index) => (
                          <div key={index} className="flex items-center">
                            <ChevronRight className="h-4 w-4 mr-2 text-primary" />
                            <span className="text-sm">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button
                        variant="outline"
                        className="border border-neon-blue hover:shadow-neon-blue transition-shadow"
                      >
                        Learn More
                      </Button>
                      <Button className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600">
                        Upgrade Now
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Feedback Tab */}
        <TabsContent value="feedback" className="space-y-4">
          <Card className="border border-slate-700/50 bg-slate-900/60 backdrop-blur-md">
            <CardHeader>
              <CardTitle>Feedback Form</CardTitle>
              <CardDescription>We value your opinion. Please share your thoughts with us.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitFeedback} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="feedback-name">Name</Label>
                    <Input
                      id="feedback-name"
                      value={feedbackForm.name}
                      onChange={(e) => setFeedbackForm({ ...feedbackForm, name: e.target.value })}
                      required
                      className="bg-background/30 border-neon-blue/30 focus:border-neon-blue focus:ring-neon-blue/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="feedback-email">Email</Label>
                    <Input
                      id="feedback-email"
                      type="email"
                      value={feedbackForm.email}
                      onChange={(e) => setFeedbackForm({ ...feedbackForm, email: e.target.value })}
                      required
                      className="bg-background/30 border-neon-blue/30 focus:border-neon-blue focus:ring-neon-blue/20"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="feedback-rating">Rating</Label>
                  <Select
                    value={feedbackForm.rating}
                    onValueChange={(value) => setFeedbackForm({ ...feedbackForm, rating: value })}
                  >
                    <SelectTrigger id="feedback-rating" className="bg-background/30 border-neon-blue/30">
                      <SelectValue placeholder="Select rating" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5 - Excellent</SelectItem>
                      <SelectItem value="4">4 - Very Good</SelectItem>
                      <SelectItem value="3">3 - Good</SelectItem>
                      <SelectItem value="2">2 - Fair</SelectItem>
                      <SelectItem value="1">1 - Poor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="feedback-message">Your Feedback</Label>
                  <Textarea
                    id="feedback-message"
                    placeholder="Please share your experience and suggestions..."
                    value={feedbackForm.message}
                    onChange={(e) => setFeedbackForm({ ...feedbackForm, message: e.target.value })}
                    rows={5}
                    required
                    className="bg-background/30 border-neon-blue/30 focus:border-neon-blue focus:ring-neon-blue/20"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-neon-blue to-neon-pink hover:shadow-neon-pink transition-shadow"
                >
                  Submit Feedback
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

