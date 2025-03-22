"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search, Download } from "lucide-react"
import { VolunteersList } from "@/components/volunteers/volunteers-list"
import { AddVolunteerDialog } from "@/components/volunteers/add-volunteer-dialog"
import type { Volunteer } from "@/lib/types"
import { getAllVolunteers } from "@/lib/data-utils"
import { exportToCSV } from "@/lib/export-utils"

export function VolunteersPage() {
  const [volunteers, setVolunteers] = useState<Volunteer[]>([])
  const [filteredVolunteers, setFilteredVolunteers] = useState<Volunteer[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  useEffect(() => {
    // Load volunteers from localStorage
    const loadVolunteers = () => {
      const allVolunteers = getAllVolunteers()
      setVolunteers(allVolunteers)
      filterVolunteers(allVolunteers, searchQuery)
    }

    loadVolunteers()

    // Set up event listener for storage changes
    window.addEventListener("storage", loadVolunteers)

    return () => {
      window.removeEventListener("storage", loadVolunteers)
    }
  }, [searchQuery])

  const filterVolunteers = (volunteersList: Volunteer[], query: string) => {
    const filtered = volunteersList.filter((volunteer) => {
      return (
        volunteer.name.toLowerCase().includes(query.toLowerCase()) ||
        volunteer.email.toLowerCase().includes(query.toLowerCase())
      )
    })

    setFilteredVolunteers(filtered)
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearchQuery(query)
    filterVolunteers(volunteers, query)
  }

  const handleExportData = () => {
    exportToCSV(filteredVolunteers, "volunteers_data")
  }

  const handleVolunteerAdded = () => {
    // Refresh the volunteers list
    const allVolunteers = getAllVolunteers()
    setVolunteers(allVolunteers)
    filterVolunteers(allVolunteers, searchQuery)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Volunteers</h1>
        <div className="flex space-x-2">
          <Button onClick={handleExportData} variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button onClick={() => setIsAddDialogOpen(true)} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Volunteer
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Volunteers Management</CardTitle>
          <CardDescription>Manage your volunteers and track their contributions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search volunteers..." className="pl-8" value={searchQuery} onChange={handleSearch} />
            </div>
          </div>

          <VolunteersList volunteers={filteredVolunteers} onVolunteerUpdated={handleVolunteerAdded} />
        </CardContent>
      </Card>

      <AddVolunteerDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onVolunteerAdded={handleVolunteerAdded}
      />
    </div>
  )
}

