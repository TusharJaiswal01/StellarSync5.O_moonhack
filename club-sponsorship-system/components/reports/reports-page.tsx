"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, FileText, Mail } from "lucide-react"
import { SponsorshipReport } from "@/components/reports/sponsorship-report"
import { FundingReport } from "@/components/reports/funding-report"
import { VolunteerReport } from "@/components/reports/volunteer-report"
import type { Sponsor, Fund, Volunteer } from "@/lib/types"
import { getAllSponsors, getAllFunds, getAllVolunteers } from "@/lib/data-utils"
import { exportToCSV } from "@/lib/export-utils"
import { useToast } from "@/components/ui/use-toast"

export function ReportsPage() {
  const [sponsors, setSponsors] = useState<Sponsor[]>([])
  const [funds, setFunds] = useState<Fund[]>([])
  const [volunteers, setVolunteers] = useState<Volunteer[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

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

  const handleExportData = (type: string) => {
    switch (type) {
      case "sponsors":
        exportToCSV(sponsors, "sponsors_report")
        break
      case "funds":
        exportToCSV(funds, "funds_report")
        break
      case "volunteers":
        exportToCSV(volunteers, "volunteers_report")
        break
    }
  }

  const handleGenerateReport = (type: string) => {
    toast({
      title: "Report Generated",
      description: `The ${type} report has been generated and is ready to download.`,
    })
  }

  const handleEmailReport = (type: string) => {
    toast({
      title: "Email Prepared",
      description: `An email with the ${type} report has been prepared.`,
    })
  }

  if (isLoading) {
    return <div className="flex justify-center items-center h-96">Loading report data...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
      </div>

      <Tabs defaultValue="sponsorship" className="space-y-4">
        <TabsList>
          <TabsTrigger value="sponsorship">Sponsorship</TabsTrigger>
          <TabsTrigger value="funding">Funding</TabsTrigger>
          <TabsTrigger value="volunteer">Volunteer</TabsTrigger>
        </TabsList>

        <TabsContent value="sponsorship" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div>
                <CardTitle>Sponsorship Report</CardTitle>
                <CardDescription>Overview of all sponsorships and their status</CardDescription>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                  onClick={() => handleEmailReport("sponsorship")}
                >
                  <Mail className="h-4 w-4" />
                  Email
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                  onClick={() => handleGenerateReport("sponsorship")}
                >
                  <FileText className="h-4 w-4" />
                  PDF
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                  onClick={() => handleExportData("sponsors")}
                >
                  <Download className="h-4 w-4" />
                  CSV
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <SponsorshipReport sponsors={sponsors} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="funding" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div>
                <CardTitle>Funding Report</CardTitle>
                <CardDescription>Overview of all income and expenses</CardDescription>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                  onClick={() => handleEmailReport("funding")}
                >
                  <Mail className="h-4 w-4" />
                  Email
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                  onClick={() => handleGenerateReport("funding")}
                >
                  <FileText className="h-4 w-4" />
                  PDF
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                  onClick={() => handleExportData("funds")}
                >
                  <Download className="h-4 w-4" />
                  CSV
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <FundingReport funds={funds} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="volunteer" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div>
                <CardTitle>Volunteer Report</CardTitle>
                <CardDescription>Overview of volunteer performance</CardDescription>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                  onClick={() => handleEmailReport("volunteer")}
                >
                  <Mail className="h-4 w-4" />
                  Email
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                  onClick={() => handleGenerateReport("volunteer")}
                >
                  <FileText className="h-4 w-4" />
                  PDF
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                  onClick={() => handleExportData("volunteers")}
                >
                  <Download className="h-4 w-4" />
                  CSV
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <VolunteerReport volunteers={volunteers} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

