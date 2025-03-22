"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search, Download, Filter } from "lucide-react"
import { SponsorsList } from "@/components/sponsors/sponsors-list"
import { AddSponsorDialog } from "@/components/sponsors/add-sponsor-dialog"
import type { Sponsor } from "@/lib/types"
import { getAllSponsors } from "@/lib/data-utils"
import { exportToCSV } from "@/lib/export-utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function SponsorsPage() {
  const [sponsors, setSponsors] = useState<Sponsor[]>([])
  const [filteredSponsors, setFilteredSponsors] = useState<Sponsor[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [selectedLevels, setSelectedLevels] = useState<string[]>(["gold", "silver", "bronze"])

  useEffect(() => {
    // Load sponsors from localStorage
    const loadSponsors = () => {
      const allSponsors = getAllSponsors()
      setSponsors(allSponsors)
      filterSponsors(allSponsors, searchQuery, selectedLevels)
    }

    loadSponsors()

    // Set up event listener for storage changes
    window.addEventListener("storage", loadSponsors)

    return () => {
      window.removeEventListener("storage", loadSponsors)
    }
  }, [searchQuery, selectedLevels])

  const filterSponsors = (sponsorsList: Sponsor[], query: string, levels: string[]) => {
    const filtered = sponsorsList.filter((sponsor) => {
      const matchesQuery =
        sponsor.name.toLowerCase().includes(query.toLowerCase()) ||
        sponsor.company.toLowerCase().includes(query.toLowerCase())
      const matchesLevel = levels.includes(sponsor.level)
      return matchesQuery && matchesLevel
    })

    setFilteredSponsors(filtered)
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearchQuery(query)
    filterSponsors(sponsors, query, selectedLevels)
  }

  const handleLevelToggle = (level: string) => {
    setSelectedLevels((prev) => {
      if (prev.includes(level)) {
        return prev.filter((l) => l !== level)
      } else {
        return [...prev, level]
      }
    })
  }

  const handleExportData = () => {
    exportToCSV(filteredSponsors, "sponsors_data")
  }

  const handleSponsorAdded = () => {
    // Refresh the sponsors list
    const allSponsors = getAllSponsors()
    setSponsors(allSponsors)
    filterSponsors(allSponsors, searchQuery, selectedLevels)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Sponsors</h1>
        <div className="flex space-x-2">
          <Button onClick={handleExportData} variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button onClick={() => setIsAddDialogOpen(true)} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Sponsor
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Sponsors Management</CardTitle>
          <CardDescription>Manage your sponsors and their contributions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search sponsors..." className="pl-8" value={searchQuery} onChange={handleSearch} />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuCheckboxItem
                  checked={selectedLevels.includes("gold")}
                  onCheckedChange={() => handleLevelToggle("gold")}
                >
                  Gold
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={selectedLevels.includes("silver")}
                  onCheckedChange={() => handleLevelToggle("silver")}
                >
                  Silver
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={selectedLevels.includes("bronze")}
                  onCheckedChange={() => handleLevelToggle("bronze")}
                >
                  Bronze
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <SponsorsList sponsors={filteredSponsors} onSponsorUpdated={handleSponsorAdded} />
        </CardContent>
      </Card>

      <AddSponsorDialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen} onSponsorAdded={handleSponsorAdded} />
    </div>
  )
}

