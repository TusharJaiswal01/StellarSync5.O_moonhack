"use client"

import { useEffect, useState } from "react"
import { Activity, Calendar, CreditCard, DollarSign, Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [members, setMembers] = useState<any[]>([])
  const [payments, setPayments] = useState<any[]>([])
  const [notifications, setNotifications] = useState<any[]>([])
  const [stats, setStats] = useState({
    activeMembers: 0,
    pendingApprovals: 0,
    recentActivities: 0,
    totalRevenue: 0,
  })

  useEffect(() => {
    // Load user data
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    }

    // Load members data
    const membersData = localStorage.getItem("members")
    if (membersData) {
      const parsedMembers = JSON.parse(membersData)
      setMembers(parsedMembers)

      // Calculate stats
      setStats((prev) => ({
        ...prev,
        activeMembers: parsedMembers.filter(
          (m: any) => new Date(m.expiryDate) > new Date() && m.paymentStatus !== "Overdue",
        ).length,
        pendingApprovals: parsedMembers.filter((m: any) => m.paymentStatus === "Pending").length,
      }))
    }

    // Load payments data
    const paymentsData = localStorage.getItem("payments")
    if (paymentsData) {
      const parsedPayments = JSON.parse(paymentsData)
      setPayments(parsedPayments)

      // Calculate total revenue
      const totalRevenue = parsedPayments
        .filter((p: any) => p.status === "Completed")
        .reduce((sum: number, p: any) => sum + p.amount, 0)

      setStats((prev) => ({
        ...prev,
        totalRevenue,
      }))
    }

    // Load notifications data
    const notificationsData = localStorage.getItem("notifications")
    if (notificationsData) {
      const parsedNotifications = JSON.parse(notificationsData)
      setNotifications(parsedNotifications)

      // Calculate recent activities
      setStats((prev) => ({
        ...prev,
        recentActivities: parsedNotifications.length,
      }))
    }
  }, [])

  // Calculate days until renewal
  const calculateDaysUntilRenewal = () => {
    if (!user) return 0
    const renewalDate = new Date(user.renewalDate)
    const today = new Date()
    const diffTime = renewalDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const daysUntilRenewal = calculateDaysUntilRenewal()

  // Membership distribution data
  const membershipDistribution = [
    { name: "Basic", value: members.filter((m) => m.tier === "Basic").length },
    { name: "Premium", value: members.filter((m) => m.tier === "Premium").length },
    { name: "VIP", value: members.filter((m) => m.tier === "VIP").length },
  ]

  // Monthly revenue data
  const monthlyRevenueData = [
    { name: "Jan", revenue: 1200 },
    { name: "Feb", revenue: 1900 },
    { name: "Mar", revenue: 1500 },
    { name: "Apr", revenue: 2100 },
    { name: "May", revenue: 2400 },
    { name: "Jun", revenue: 1800 },
  ]

  // Member activity data
  const memberActivityData = [
    { name: "Mon", active: 20 },
    { name: "Tue", active: 25 },
    { name: "Wed", active: 30 },
    { name: "Thu", active: 22 },
    { name: "Fri", active: 28 },
    { name: "Sat", active: 15 },
    { name: "Sun", active: 12 },
  ]

  // Colors for pie chart
  const COLORS = ["#00ff8c", "#00d4ff", "#ff00ff"]

  if (!user) return null

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Welcome Section */}
      <div className=" bg-slate-900/60 border border-slate-700/50 backdrop-blur-md p-6 rounded-lg">
        <h1 className="text-3xl font-bold mb-2 ">Welcome back, {user.name}!</h1>
        <p className="text-muted-foreground">
          Here's an overview of your membership hub. Today is {new Date().toLocaleDateString()}.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-slate-900/60 backdrop-blur-md border-slate-700/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Members</CardTitle>
            <Users className="h-4 w-4 text-neon-green" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-neon-green">{stats.activeMembers}</div>
            <p className="text-xs text-muted-foreground">+2.5% from last month</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/60 backdrop-blur-md border-slate-700/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
            <Activity className="h-4 w-4 text-neon-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-neon-blue">{stats.pendingApprovals}</div>
            <p className="text-xs text-muted-foreground">Requires your attention</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/60 backdrop-blur-md border-slate-700/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Recent Activities</CardTitle>
            <Calendar className="h-4 w-4 text-neon-pink" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-neon-pink">{stats.recentActivities}</div>
            <p className="text-xs text-muted-foreground">In the last 7 days</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/60 backdrop-blur-md border-slate-700/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-neon-purple" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-neon-purple">${stats.totalRevenue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">+18.2% from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Membership Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="border border-slate-700/50 bg-slate-900/60 backdrop-blur-md  lg:col-span-1">
          <CardHeader>
            <CardTitle>Your Membership</CardTitle>
            <CardDescription>Details about your current plan</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Membership Tier</span>
                <span className="font-medium text-neon-blue">{user.membershipTier}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Join Date</span>
                <span className="font-medium">{new Date(user.joinDate).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Renewal Date</span>
                <span className="font-medium">{new Date(user.renewalDate).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Days Until Renewal</span>
                <span className="font-medium text-neon-green">{daysUntilRenewal} days</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Membership Status</span>
                <span className="bg-neon-green/20 text-neon-green px-2 py-0.5 rounded-full text-xs font-medium">
                  Active
                </span>
              </div>
            </div>

            <div className="pt-2">
              <Button
                variant="outline"
                className="w-full border border-neon-blue hover:shadow-neon-blue transition-shadow bg-slate-900"
              >
                <CreditCard className="mr-2 h-4 w-4" />
                Manage Subscription
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-slate-700/50 bg-slate-900/60 backdrop-blur-md lg:col-span-2">
          <CardHeader>
            <CardTitle>Analytics Overview</CardTitle>
            <CardDescription>Membership growth and activity</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="revenue">
              <TabsList className="mb-4 bg-background/20">
                <TabsTrigger className="" value="revenue">Revenue</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
                <TabsTrigger value="distribution">Distribution</TabsTrigger>
              </TabsList>

              <TabsContent value="revenue" className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyRevenueData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" />
                    <YAxis stroke="rgba(255,255,255,0.5)" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(15, 20, 30, 0.9)",
                        borderColor: "rgba(255,255,255,0.1)",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="#00ff8c"
                      strokeWidth={2}
                      dot={{ fill: "#00ff8c" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </TabsContent>

              <TabsContent value="activity" className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={memberActivityData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" />
                    <YAxis stroke="rgba(255,255,255,0.5)" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(15, 20, 30, 0.9)",
                        borderColor: "rgba(255,255,255,0.1)",
                      }}
                    />
                    <Bar dataKey="active" fill="#00d4ff" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </TabsContent>

              <TabsContent value="distribution" className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={membershipDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {membershipDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(15, 20, 30, 0.2)",
                        color : "white",
                        borderColor: "rgba(255,255,255,0.1)",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity and Notifications */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="border border-slate-700/50 bg-slate-900/60 backdrop-blur-md">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest actions in your membership hub</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {payments.slice(0, 3).map((payment) => (
                <div key={payment.id} className="flex items-center">
                  <div className="mr-4 rounded-full p-2 bg-neon-blue/10">
                    <CreditCard className="h-4 w-4 text-neon-blue" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {payment.memberName} - ${payment.amount.toFixed(2)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(payment.date).toLocaleDateString()} • {payment.method}
                    </p>
                  </div>
                  <div>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        payment.status === "Completed"
                          ? "bg-neon-green/20 text-neon-green"
                          : payment.status === "Pending"
                            ? "bg-neon-blue/20 text-neon-blue"
                            : "bg-neon-pink/20 text-neon-pink"
                      }`}
                    >
                      {payment.status}
                    </span>
                  </div>
                </div>
              ))}

              <Button
                variant="outline"
                className="w-full border border-neon-blue hover:shadow-neon-blue transition-shadow"
              >
                View All Activity
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-slate-700/50 bg-slate-900/60 backdrop-blur-md">
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>Stay updated with important alerts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {notifications.slice(0, 3).map((notification) => (
                <div key={notification.id} className="flex items-start">
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
                    <Activity className="h-4 w-4" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium leading-none">{notification.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(notification.date).toLocaleDateString()}
                      </p>
                    </div>
                    <p className="text-xs text-muted-foreground">{notification.message}</p>
                  </div>
                  {!notification.read && <div className="ml-2 h-2 w-2 rounded-full bg-neon-pink" />}
                </div>
              ))}

              <Button
                variant="outline"
                className="w-full border border-neon-blue hover:shadow-neon-blue transition-shadow"
              >
                View All Notifications
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

