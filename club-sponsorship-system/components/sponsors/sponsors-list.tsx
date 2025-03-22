"use client"

import { useState } from "react"
import type { Sponsor } from "@/lib/types"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { EditSponsorDialog } from "@/components/sponsors/edit-sponsor-dialog"
import { deleteSponsor } from "@/lib/data-utils"
import { MoreHorizontal, Mail, FileText } from "lucide-react"
import { cn } from "@/lib/utils"
import { useToast } from "@/components/ui/use-toast"
import { motion } from "framer-motion"

interface SponsorsListProps {
  sponsors: Sponsor[]
  onSponsorUpdated: () => void
}

export function SponsorsList({ sponsors, onSponsorUpdated }: SponsorsListProps) {
  const [editingSponsor, setEditingSponsor] = useState<Sponsor | null>(null)
  const { toast } = useToast()

  const handleDelete = (sponsor: Sponsor) => {
    deleteSponsor(sponsor.id)
    onSponsorUpdated()
    toast({
      title: "Sponsor deleted",
      description: `${sponsor.name} has been removed from your sponsors.`,
    })
  }

  const handleGenerateProposal = (sponsor: Sponsor) => {
    toast({
      title: "Proposal Generated",
      description: `Proposal for ${sponsor.name} has been generated and is ready to download.`,
    })
  }

  const handleSendEmail = (sponsor: Sponsor) => {
    toast({
      title: "Email Drafted",
      description: `An email draft for ${sponsor.name} has been prepared.`,
    })
  }

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Level</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Renewal Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sponsors.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center h-24">
                No sponsors found
              </TableCell>
            </TableRow>
          ) : (
            sponsors.map((sponsor, index) => (
              <motion.tr
                key={sponsor.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
              >
                <TableCell className="font-medium">{sponsor.name}</TableCell>
                <TableCell>{sponsor.company}</TableCell>
                <TableCell>
                  <Badge
                    className={cn(
                      sponsor.level === "gold" && "gold-sponsor",
                      sponsor.level === "silver" && "silver-sponsor",
                      sponsor.level === "bronze" && "bronze-sponsor",
                    )}
                  >
                    {sponsor.level.charAt(0).toUpperCase() + sponsor.level.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell>${sponsor.amount.toLocaleString()}</TableCell>
                <TableCell>{new Date(sponsor.renewalDate).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      sponsor.status === "active" ? "default" : sponsor.status === "pending" ? "outline" : "destructive"
                    }
                  >
                    {sponsor.status.charAt(0).toUpperCase() + sponsor.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setEditingSponsor(sponsor)}>Edit</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleGenerateProposal(sponsor)}>
                        <FileText className="mr-2 h-4 w-4" />
                        Generate Proposal
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleSendEmail(sponsor)}>
                        <Mail className="mr-2 h-4 w-4" />
                        Send Email
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-destructive focus:text-destructive"
                        onClick={() => handleDelete(sponsor)}
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

      {editingSponsor && (
        <EditSponsorDialog
          sponsor={editingSponsor}
          open={!!editingSponsor}
          onOpenChange={(open) => {
            if (!open) setEditingSponsor(null)
          }}
          onSponsorUpdated={onSponsorUpdated}
        />
      )}
    </div>
  )
}

