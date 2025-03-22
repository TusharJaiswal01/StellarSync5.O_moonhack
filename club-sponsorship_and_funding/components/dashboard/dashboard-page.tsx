"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardStats } from "@/components/dashboard/dashboard-stats"
import { FundingChart } from "@/components/dashboard/funding-chart"
import { SponsorDistributionChart } from "@/components/dashboard/sponsor-distribution-chart"
import { RecentTransactions } from "@/components/dashboard/recent-transactions"
import { TopVolunteers } from "@/components/dashboard/top-volunteers"
import { UpcomingRenewals } from "@/components/dashboard/upcoming-renewals"
import { FundAllocationChart } from "@/components/dashboard/fund-allocation-chart"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { exportToCSV } from "@/lib/export-utils"
import { getAllSponsors, getAllFunds, getAllVolunteers } from "@/lib/data-utils"
import type { Sponsor, Fund, Volunteer } from "@/lib/types"
import { motion } from "framer-motion"

export function DashboardPage() {
  const [sponsors, setSponsors] = useState<Sponsor[]>([])
  const [funds, setFunds] = useState<Fund[]>([])
  const [volunteers, setVolunteers] = useState<Volunteer[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load data from localStorage
    const loadData = () => {
      setSponsors(getAllSponsors())
      setFunds(getAllFunds())
      setVolunteers(getAllVolunteers())
      setIsLoading(false)
    }

    loadData()

    // Set up event listener for storage changes
    window.addEventListener("storage", loadData)

    return () => {
      window.removeEventListener("storage", loadData)
    }
  }, [])

  const handleExportData = () => {
    exportToCSV(sponsors, "sponsors_data")
  }

  if (isLoading) {
    return <div className="flex justify-center items-center h-96">Loading dashboard data...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <motion.h1
          className="text-3xl font-bold tracking-tight"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Dashboard
        </motion.h1>
        <Button onClick={handleExportData} className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Export Data
        </Button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <DashboardStats sponsors={sponsors} funds={funds} volunteers={volunteers} />
      </motion.div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 md:w-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="sponsors">Sponsors</TabsTrigger>
          <TabsTrigger value="funds">Funds</TabsTrigger>
          <TabsTrigger value="volunteers">Volunteers</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <motion.div
            className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="col-span-2 overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
                <CardTitle>Funding Overview</CardTitle>
                <CardDescription>Monthly funding trends for the current year</CardDescription>
              </CardHeader>
              <CardContent className="h-80 p-4">
                <FundingChart funds={funds} />
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-950/20 dark:to-yellow-950/20">
                <CardTitle>Sponsor Distribution</CardTitle>
                <CardDescription>By sponsorship level</CardDescription>
              </CardHeader>
              <CardContent className="h-80 p-4">
                <SponsorDistributionChart sponsors={sponsors} />
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            className="grid gap-4 md:grid-cols-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>Last 5 transactions</CardDescription>
              </CardHeader>
              <CardContent className="p-4">
                <RecentTransactions funds={funds} />
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-violet-50 dark:from-purple-950/20 dark:to-violet-950/20">
                <CardTitle>Top Volunteers</CardTitle>
                <CardDescription>By sponsorship amount brought</CardDescription>
              </CardHeader>
              <CardContent className="p-4">
                <TopVolunteers volunteers={volunteers} />
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="sponsors" className="space-y-4">
          <motion.div
            className="grid gap-4 md:grid-cols-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-950/20 dark:to-yellow-950/20">
                <CardTitle>Sponsor Distribution</CardTitle>
                <CardDescription>By sponsorship level</CardDescription>
              </CardHeader>
              <CardContent className="h-80 p-4">
                <SponsorDistributionChart sponsors={sponsors} />
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-950/20 dark:to-rose-950/20">
                <CardTitle>Upcoming Renewals</CardTitle>
                <CardDescription>Sponsorships due for renewal</CardDescription>
              </CardHeader>
              <CardContent className="p-4">
                <UpcomingRenewals sponsors={sponsors} />
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="funds" className="space-y-4">
          <motion.div
            className="grid gap-4 md:grid-cols-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
                <CardTitle>Funding Overview</CardTitle>
                <CardDescription>Monthly funding trends</CardDescription>
              </CardHeader>
              <CardContent className="h-80 p-4">
                <FundingChart funds={funds} />
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
                <CardTitle>Fund Allocation</CardTitle>
                <CardDescription>How funds are being used</CardDescription>
              </CardHeader>
              <CardContent className="h-80 p-4">
                <FundAllocationChart funds={funds} />
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="volunteers" className="space-y-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <Card className="overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-violet-50 dark:from-purple-950/20 dark:to-violet-950/20">
                <CardTitle>Top Volunteers</CardTitle>
                <CardDescription>By sponsorship amount brought</CardDescription>
              </CardHeader>
              <CardContent className="p-4">
                <TopVolunteers volunteers={volunteers} />
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

