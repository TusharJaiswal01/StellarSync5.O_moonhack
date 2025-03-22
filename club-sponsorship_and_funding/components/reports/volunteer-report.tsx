"use client"

import type { Volunteer } from "@/lib/types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Chart, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { motion } from "framer-motion"

interface VolunteerReportProps {
  volunteers: Volunteer[]
}

export function VolunteerReport({ volunteers }: VolunteerReportProps) {
  // Calculate total sponsors acquired
  const totalSponsors = volunteers.reduce((total, volunteer) => total + volunteer.sponsorsAcquired, 0)

  // Calculate total amount acquired
  const totalAmount = volunteers.reduce((total, volunteer) => total + volunteer.totalAmountAcquired, 0)

  // Calculate average amount per volunteer
  const avgAmount = volunteers.length > 0 ? totalAmount / volunteers.length : 0

  // Sort volunteers by total amount acquired
  const sortedVolunteers = [...volunteers].sort((a, b) => b.totalAmountAcquired - a.totalAmountAcquired)

  // Prepare data for the bar chart (top 5 volunteers)
  const barChartData = sortedVolunteers.slice(0, 5).map((volunteer) => ({
    name: volunteer.name,
    amount: volunteer.totalAmountAcquired,
    sponsors: volunteer.sponsorsAcquired,
  }))

  // Find the maximum amount for scaling the progress bars
  const maxAmount = Math.max(...volunteers.map((v) => v.totalAmountAcquired), 1)

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Volunteers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{volunteers.length}</div>
            <p className="text-xs text-muted-foreground">
              Active: {volunteers.filter((v) => v.sponsorsAcquired > 0).length}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Sponsors Acquired</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSponsors}</div>
            <p className="text-xs text-muted-foreground">
              Avg: {(totalSponsors / volunteers.length).toFixed(1)} per volunteer
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Amount Acquired</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalAmount.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Avg: ${avgAmount.toFixed(0)} per volunteer</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Top Performers</CardTitle>
            <CardDescription>By amount acquired</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="h-full w-full"
            >
              <ChartContainer className="h-full w-full">
                <Chart>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={barChartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.2} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                      <XAxis
                        dataKey="name"
                        tick={{ fill: "hsl(var(--foreground))" }}
                        axisLine={{ stroke: "hsl(var(--border))" }}
                      />
                      <YAxis
                        tickFormatter={(value) => `$${value}`}
                        width={80}
                        tick={{ fill: "hsl(var(--foreground))" }}
                        axisLine={{ stroke: "hsl(var(--border))" }}
                      />
                      <Tooltip
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            return (
                              <ChartTooltip>
                                <ChartTooltipContent className="p-2">
                                  <div className="flex flex-col gap-1">
                                    <p className="text-sm font-medium">{payload[0]?.payload.name}</p>
                                    <p className="text-sm">Amount: ${payload[0]?.value.toLocaleString()}</p>
                                    <p className="text-sm">Sponsors: {payload[0]?.payload.sponsors}</p>
                                  </div>
                                </ChartTooltipContent>
                              </ChartTooltip>
                            )
                          }
                          return null
                        }}
                      />
                      <Bar
                        dataKey="amount"
                        name="Amount"
                        fill="url(#barGradient)"
                        radius={[4, 4, 0, 0]}
                        animationDuration={1500}
                        animationBegin={300}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </Chart>
              </ChartContainer>
            </motion.div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Volunteer Leaderboard</CardTitle>
            <CardDescription>Ranked by amount acquired</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {volunteers.length === 0 ? (
                <p className="text-center text-muted-foreground">No volunteers found</p>
              ) : (
                sortedVolunteers.slice(0, 5).map((volunteer, index) => (
                  <div key={volunteer.id} className="space-y-2">
                    <div className="flex items-center">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold mr-3">
                        {index + 1}
                      </div>
                      <Avatar className="h-8 w-8 mr-3">
                        <AvatarImage src={volunteer.avatar || "/placeholder.svg?height=32&width=32"} />
                        <AvatarFallback>{volunteer.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">{volunteer.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {volunteer.sponsorsAcquired} sponsors · ${volunteer.totalAmountAcquired.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <Progress value={(volunteer.totalAmountAcquired / maxAmount) * 100} className="h-2" />
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

