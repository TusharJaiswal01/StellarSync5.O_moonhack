"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Sample data - in a real app, this would come from an API or database
const initialTeams = [
  { id: 1, name: "Alpha Team", mentorId: 1 },
  { id: 2, name: "Beta Team", mentorId: 3 },
  { id: 3, name: "Gamma Team", mentorId: 2 },
  { id: 4, name: "Delta Team", mentorId: null },
  { id: 5, name: "Epsilon Team", mentorId: 4 },
]

const mentors = [
  { id: 1, name: "John Smith" },
  { id: 2, name: "Sarah Johnson" },
  { id: 3, name: "Michael Brown" },
  { id: 4, name: "Emily Davis" },
  { id: 5, name: "Robert Wilson" },
]

export default function DataTable() {
  const [teams, setTeams] = useState(initialTeams)
  const [isOpen, setIsOpen] = useState(false)
  const [selectedTeam, setSelectedTeam] = useState<number | null>(null)
  const [selectedMentor, setSelectedMentor] = useState<number | null>(null)

  const handleUpdateClick = (teamId: number) => {
    const team = teams.find((t) => t.id === teamId)
    setSelectedTeam(teamId)
    setSelectedMentor(team?.mentorId || null)
    setIsOpen(true)
  }

  const handleMentorChange = (mentorId: string) => {
    setSelectedMentor(Number(mentorId))
  }

  const handleSave = () => {
    if (selectedTeam && selectedMentor) {
      setTeams(teams.map((team) => (team.id === selectedTeam ? { ...team, mentorId: selectedMentor } : team)))
    }
    setIsOpen(false)
  }

  const getMentorName = (mentorId: number | null) => {
    if (!mentorId) return "Not assigned"
    const mentor = mentors.find((m) => m.id === mentorId)
    return mentor ? mentor.name : "Unknown"
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="w-full bg-primary py-6 mb-8">
        <div className="container mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold text-primary-foreground">Team Management Dashboard</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Team Mentor Assignments</h2>
          <p className="text-muted-foreground mb-6">Manage mentor assignments for each team by using the update button.</p>

          <div className="rounded-md border bg-card">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="w-[80px] font-bold">S.No</TableHead>
                  <TableHead className="font-bold">Team Name</TableHead>
                  <TableHead className="font-bold">Assigned Mentor</TableHead>
                  <TableHead className="font-bold">Assigned Mentor</TableHead>
                  <TableHead className="font-bold">Assigned Mentor</TableHead>
                  <TableHead className="font-bold">Assigned Mentor</TableHead>
                  <TableHead className="font-bold">Assigned Mentor</TableHead>
                  <TableHead className="text-right font-bold">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {teams.map((team, index) => (
                  <TableRow key={team.id} className="hover:bg-muted/30">
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell className="font-medium">{team.name}</TableCell>
                    <TableCell className="font-medium">{team.name}</TableCell>
                    <TableCell className="font-medium">{team.name}</TableCell>
                    <TableCell className="font-medium">{team.name}</TableCell>
                    <TableCell className="font-medium">{team.name}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${team.mentorId ? 'bg-green-500' : 'bg-amber-500'}`}></div>
                        {getMentorName(team.mentorId)}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        onClick={() => handleUpdateClick(team.id)}
                        className="hover:bg-primary hover:text-primary-foreground"
                      >
                        Update
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Update Mentor Assignment</DialogTitle>
            <DialogDescription>
              Select a mentor to assign to this team.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <h4 className="font-medium">
                Team: {teams.find(t => t.id === selectedTeam)?.name}
              </h4>
              <Select
                value={selectedMentor?.toString() || ""}
                onValueChange={handleMentorChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a mentor" />
                </SelectTrigger>
                <SelectContent>
                  {mentors.map(mentor => (
                    <SelectItem key={mentor.id} value={mentor.id.toString()}>
                      {mentor.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}


