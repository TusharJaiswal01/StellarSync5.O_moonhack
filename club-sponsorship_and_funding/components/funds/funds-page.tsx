"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search, Download, Filter } from "lucide-react"
import { FundsList } from "@/components/funds/funds-list"
import { AddFundDialog } from "@/components/funds/add-fund-dialog"
import type { Fund } from "@/lib/types"
import { getAllFunds } from "@/lib/data-utils"
import { exportToCSV } from "@/lib/export-utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function FundsPage() {
  const [funds, setFunds] = useState<Fund[]>([])
  const [filteredFunds, setFilteredFunds] = useState<Fund[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [selectedTypes, setSelectedTypes] = useState<string[]>(["income", "expense"])

  useEffect(() => {
    // Load funds from localStorage
    const loadFunds = () => {
      const allFunds = getAllFunds()
      setFunds(allFunds)
      filterFunds(allFunds, searchQuery, selectedTypes)
    }

    loadFunds()

    // Set up event listener for storage changes
    window.addEventListener("storage", loadFunds)

    return () => {
      window.removeEventListener("storage", loadFunds)
    }
  }, [searchQuery, selectedTypes])

  const filterFunds = (fundsList: Fund[], query: string, types: string[]) => {
    const filtered = fundsList.filter((fund) => {
      const matchesQuery = fund.description.toLowerCase().includes(query.toLowerCase())
      const matchesType = types.includes(fund.type)
      return matchesQuery && matchesType
    })

    setFilteredFunds(filtered)
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearchQuery(query)
    filterFunds(funds, query, selectedTypes)
  }

  const handleTypeToggle = (type: string) => {
    setSelectedTypes((prev) => {
      if (prev.includes(type)) {
        return prev.filter((t) => t !== type)
      } else {
        return [...prev, type]
      }
    })
  }

  const handleExportData = () => {
    exportToCSV(filteredFunds, "funds_data")
  }

  const handleFundAdded = () => {
    // Refresh the funds list
    const allFunds = getAllFunds()
    setFunds(allFunds)
    filterFunds(allFunds, searchQuery, selectedTypes)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Funds</h1>
        <div className="flex space-x-2">
          <Button onClick={handleExportData} variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button onClick={() => setIsAddDialogOpen(true)} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Transaction
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Funds Management</CardTitle>
          <CardDescription>Track income and expenses for your club</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search transactions..."
                className="pl-8"
                value={searchQuery}
                onChange={handleSearch}
              />
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
                  checked={selectedTypes.includes("income")}
                  onCheckedChange={() => handleTypeToggle("income")}
                >
                  Income
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={selectedTypes.includes("expense")}
                  onCheckedChange={() => handleTypeToggle("expense")}
                >
                  Expense
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <FundsList funds={filteredFunds} onFundUpdated={handleFundAdded} />
        </CardContent>
      </Card>

      <AddFundDialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen} onFundAdded={handleFundAdded} />
    </div>
  )
}

