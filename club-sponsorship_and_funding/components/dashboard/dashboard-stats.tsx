"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Sponsor, Fund, Volunteer } from "@/lib/types"
import { DollarSign, Users, TrendingUp } from "lucide-react"
import { motion } from "framer-motion"

interface DashboardStatsProps {
  sponsors: Sponsor[]
  funds: Fund[]
  volunteers: Volunteer[]
}

export function DashboardStats({ sponsors, funds, volunteers }: DashboardStatsProps) {
  // Calculate total sponsorship amount
  const totalSponsorship = sponsors.reduce((total, sponsor) => total + sponsor.amount, 0)

  // Calculate total funds allocated
  const totalAllocated = funds.reduce((total, fund) => {
    if (fund.type === "expense") {
      return total + fund.amount
    }
    return total
  }, 0)

  // Calculate available funds
  const availableFunds = funds.reduce((total, fund) => {
    if (fund.type === "income") {
      return total + fund.amount
    } else {
      return total - fund.amount
    }
  }, 0)

  // Calculate growth rate (dummy calculation for demo)
  const growthRate = 12.5 // Placeholder value

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <Card className="overflow-hidden border-l-4 border-l-blue-500 dark:border-l-blue-400">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-blue-50 to-transparent dark:from-blue-950/20">
            <CardTitle className="text-sm font-medium">Total Sponsorship</CardTitle>
            <DollarSign className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalSponsorship.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">From {sponsors.length} sponsors</p>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <Card className="overflow-hidden border-l-4 border-l-green-500 dark:border-l-green-400">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-green-50 to-transparent dark:from-green-950/20">
            <CardTitle className="text-sm font-medium">Available Funds</CardTitle>
            <DollarSign className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${availableFunds.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">${totalAllocated.toLocaleString()} allocated</p>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <Card className="overflow-hidden border-l-4 border-l-purple-500 dark:border-l-purple-400">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-purple-50 to-transparent dark:from-purple-950/20">
            <CardTitle className="text-sm font-medium">Active Volunteers</CardTitle>
            <Users className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{volunteers.length}</div>
            <p className="text-xs text-muted-foreground">
              {volunteers.filter((v) => v.sponsorsAcquired > 0).length} with sponsors
            </p>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <Card className="overflow-hidden border-l-4 border-l-amber-500 dark:border-l-amber-400">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-amber-50 to-transparent dark:from-amber-950/20">
            <CardTitle className="text-sm font-medium">Growth Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{growthRate}%</div>
            <p className="text-xs text-muted-foreground">Compared to last quarter</p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

