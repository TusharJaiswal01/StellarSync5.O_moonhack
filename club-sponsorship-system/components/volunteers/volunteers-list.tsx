"use client"

import { useState } from "react"
import type { Volunteer } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { EditVolunteerDialog } from "@/components/volunteers/edit-volunteer-dialog"
import { deleteVolunteer } from "@/lib/data-utils"
import { MoreHorizontal, Mail, Award } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/components/ui/use-toast"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"

interface VolunteersListProps {
  volunteers: Volunteer[]
  onVolunteerUpdated: () => void
}

export function VolunteersList({ volunteers, onVolunteerUpdated }: VolunteersListProps) {
  const [editingVolunteer, setEditingVolunteer] = useState<Volunteer | null>(null)
  const { toast } = useToast()

  const handleDelete = (volunteer: Volunteer) => {
    deleteVolunteer(volunteer.id)
    onVolunteerUpdated()
    toast({
      title: "Volunteer deleted",
      description: `${volunteer.name} has been removed from your volunteers.`,
    })
  }

  const handleSendEmail = (volunteer: Volunteer) => {
    toast({
      title: "Email Drafted",
      description: `An email draft for ${volunteer.name} has been prepared.`,
    })
  }

  const handleReward = (volunteer: Volunteer) => {
    toast({
      title: "Reward Issued",
      description: `A reward has been issued to ${volunteer.name} for their contributions.`,
    })
  }

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Sponsors Acquired</TableHead>
            <TableHead>Total Amount</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {volunteers.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center h-24">
                No volunteers found
              </TableCell>
            </TableRow>
          ) : (
            volunteers.map((volunteer, index) => (
              <motion.tr
                key={volunteer.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
              >
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={volunteer.avatar || "/placeholder.svg?height=32&width=32"} />
                      <AvatarFallback>{volunteer.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{volunteer.name}</span>
                  </div>
                </TableCell>
                <TableCell>{volunteer.email}</TableCell>
                <TableCell>{volunteer.phone}</TableCell>
                <TableCell>
                  <Badge variant={volunteer.sponsorsAcquired > 0 ? "default" : "outline"}>
                    {volunteer.sponsorsAcquired}
                  </Badge>
                </TableCell>
                <TableCell className="font-medium">${volunteer.totalAmountAcquired.toLocaleString()}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setEditingVolunteer(volunteer)}>Edit</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleSendEmail(volunteer)}>
                        <Mail className="mr-2 h-4 w-4" />
                        Send Email
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleReward(volunteer)}>
                        <Award className="mr-2 h-4 w-4" />
                        Issue Reward
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-destructive focus:text-destructive"
                        onClick={() => handleDelete(volunteer)}
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

      {editingVolunteer && (
        <EditVolunteerDialog
          volunteer={editingVolunteer}
          open={!!editingVolunteer}
          onOpenChange={(open) => {
            if (!open) setEditingVolunteer(null)
          }}
          onVolunteerUpdated={onVolunteerUpdated}
        />
      )}
    </div>
  )
}

