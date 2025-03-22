"use client"

import type { Sponsor } from "@/lib/types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Chart, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

interface SponsorshipReportProps {
  sponsors: Sponsor[]
}

export function SponsorshipReport({ sponsors }: SponsorshipReportProps) {
  // Calculate total sponsorship amount
  const totalAmount = sponsors.reduce((total, sponsor) => total + sponsor.amount, 0)

  // Count sponsors by level
  const sponsorsByLevel = sponsors.reduce(
    (acc, sponsor) => {
      acc[sponsor.level] = (acc[sponsor.level] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  // Calculate amount by level
  const amountByLevel = sponsors.reduce(
    (acc, sponsor) => {
      acc[sponsor.level] = (acc[sponsor.level] || 0) + sponsor.amount
      return acc
    },
    {} as Record<string, number>,
  )

  // Count sponsors by status
  const sponsorsByStatus = sponsors.reduce(
    (acc, sponsor) => {
      acc[sponsor.status] = (acc[sponsor.status] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  // Prepare data for the pie chart
  const levelData = [
    { name: "Gold", value: amountByLevel["gold"] || 0, color: "#FFD700" },
    { name: "Silver", value: amountByLevel["silver"] || 0, color: "#C0C0C0" },
    { name: "Bronze", value: amountByLevel["bronze"] || 0, color: "#CD7F32" },
  ]

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Sponsors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{sponsors.length}</div>
            <p className="text-xs text-muted-foreground">
              Gold: {sponsorsByLevel["gold"] || 0}, Silver: {sponsorsByLevel["silver"] || 0}, Bronze:{" "}
              {sponsorsByLevel["bronze"] || 0}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Amount</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalAmount.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Active: {sponsorsByStatus["active"] || 0}, Pending: {sponsorsByStatus["pending"] || 0}, Expired:{" "}
              {sponsorsByStatus["expired"] || 0}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Sponsorship</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${sponsors.length > 0 ? Math.round(totalAmount / sponsors.length).toLocaleString() : 0}
            </div>
            <p className="text-xs text-muted-foreground">Per sponsor</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Sponsorship by Level</CardTitle>
            <CardDescription>Distribution of sponsorship amounts by level</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ChartContainer className="h-full w-full">
              <Chart>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={levelData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      labelLine={false}
                    >
                      {levelData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <ChartTooltip>
                              <ChartTooltipContent className="p-2">
                                <div className="flex flex-col gap-1">
                                  <p className="text-sm font-medium">{payload[0]?.name}</p>
                                  <p className="text-sm">Amount: ${payload[0]?.value.toLocaleString()}</p>
                                  <p className="text-sm">
                                    Percentage: {((payload[0]?.value / totalAmount) * 100).toFixed(0)}%
                                  </p>
                                </div>
                              </ChartTooltipContent>
                            </ChartTooltip>
                          )
                        }
                        return null
                      }}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </Chart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Sponsors</CardTitle>
            <CardDescription>Highest contributing sponsors</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sponsors.length === 0 ? (
                <p className="text-center text-muted-foreground">No sponsors found</p>
              ) : (
                [...sponsors]
                  .sort((a, b) => b.amount - a.amount)
                  .slice(0, 5)
                  .map((sponsor, index) => (
                    <div key={sponsor.id} className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">{sponsor.name}</p>
                        <p className="text-xs text-muted-foreground">{sponsor.company}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge
                          className={cn(
                            sponsor.level === "gold" && "gold-sponsor",
                            sponsor.level === "silver" && "silver-sponsor",
                            sponsor.level === "bronze" && "bronze-sponsor",
                          )}
                        >
                          {sponsor.level.charAt(0).toUpperCase() + sponsor.level.slice(1)}
                        </Badge>
                        <span className="font-medium">${sponsor.amount.toLocaleString()}</span>
                      </div>
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

