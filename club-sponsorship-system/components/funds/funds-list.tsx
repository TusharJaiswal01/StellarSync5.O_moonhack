"use client"

import { useState } from "react"
import type { Fund } from "@/lib/types"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { EditFundDialog } from "@/components/funds/edit-fund-dialog"
import { deleteFund } from "@/lib/data-utils"
import { MoreHorizontal, ArrowUp, ArrowDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { useToast } from "@/components/ui/use-toast"
import { motion } from "framer-motion"

interface FundsListProps {
  funds: Fund[]
  onFundUpdated: () => void
}

export function FundsList({ funds, onFundUpdated }: FundsListProps) {
  const [editingFund, setEditingFund] = useState<Fund | null>(null)
  const { toast } = useToast()

  const handleDelete = (fund: Fund) => {
    deleteFund(fund.id)
    onFundUpdated()
    toast({
      title: "Transaction deleted",
      description: `The transaction has been removed.`,
    })
  }

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Type</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {funds.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center h-24">
                No transactions found
              </TableCell>
            </TableRow>
          ) : (
            funds.map((fund, index) => (
              <motion.tr
                key={fund.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
              >
                <TableCell>
                  <div className="flex items-center">
                    <div
                      className={cn(
                        "mr-2 flex h-8 w-8 items-center justify-center rounded-full",
                        fund.type === "income"
                          ? "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400"
                          : "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400",
                      )}
                    >
                      {fund.type === "income" ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
                    </div>
                    <span className="capitalize">{fund.type}</span>
                  </div>
                </TableCell>
                <TableCell className="font-medium">{fund.description}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="capitalize">
                    {fund.category}
                  </Badge>
                </TableCell>
                <TableCell
                  className={cn(
                    "font-medium",
                    fund.type === "income" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400",
                  )}
                >
                  {fund.type === "income" ? "+" : "-"}${fund.amount.toLocaleString()}
                </TableCell>
                <TableCell>{new Date(fund.date).toLocaleDateString()}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setEditingFund(fund)}>Edit</DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-destructive focus:text-destructive"
                        onClick={() => handleDelete(fund)}
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </motion.tr>
            ))
          )}
        </TableBody>
      </Table>

      {editingFund && (
        <EditFundDialog
          fund={editingFund}
          open={!!editingFund}
          onOpenChange={(open) => {
            if (!open) setEditingFund(null)
          }}
          onFundUpdated={onFundUpdated}
        />
      )}
    </div>
  )
}

