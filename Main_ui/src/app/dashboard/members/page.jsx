"use client"

import { useState } from "react"
import { Award, Check, Download, Filter, MoreHorizontal, Plus, Search, SortAsc, Star, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function MembersPage() {
  const [selectedMembers, setSelectedMembers] = useState<string[]>([])

  const members = [
    {
      id: "1",
      name: "Sarah Johnson",
      email: "sarah.j@university.edu",
      role: "President",
      status: "active",
      points: 245,
      joinDate: "Sep 2023",
    },
    {
      id: "2",
      name: "Michael Lee",
      email: "m.lee@university.edu",
      role: "Vice President",
      status: "active",
      points: 210,
      joinDate: "Oct 2023",
    },
    {
      id: "3",
      name: "Aisha Patel",
      email: "a.patel@university.edu",
      role: "Secretary",
      status: "active",
      points: 185,
      joinDate: "Sep 2023",
    },
    {
      id: "4",
      name: "David Chen",
      email: "d.chen@university.edu",
      role: "Treasurer",
      status: "active",
      points: 170,
      joinDate: "Nov 2023",
    },
    {
      id: "5",
      name: "Emma Wilson",
      email: "e.wilson@university.edu",
      role: "Member",
      status: "active",
      points: 155,
      joinDate: "Jan 2024",
    },
    {
      id: "6",
      name: "James Rodriguez",
      email: "j.rodriguez@university.edu",
      role: "Member",
      status: "inactive",
      points: 120,
      joinDate: "Oct 2023",
    },
    {
      id: "7",
      name: "Olivia Taylor",
      email: "o.taylor@university.edu",
      role: "Member",
      status: "active",
      points: 140,
      joinDate: "Dec 2023",
    },
  ]

  const toggleMember = (id: string) => {
    setSelectedMembers((prev) => (prev.includes(id) ? prev.filter((memberId) => memberId !== id) : [...prev, id]))
  }

  const toggleAllMembers = () => {
    if (selectedMembers.length === members.length) {
      setSelectedMembers([])
    } else {
      setSelectedMembers(members.map((member) => member.id))
    }
  }

  return (
    <div className="flex flex-col h-full text-slate-200 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 ">
      <div className="flex items-center justify-between p-4 border-b">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Members</h1>
          <p className="text-muted-foreground">Manage club members and their roles</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Member
        </Button>
      </div>
      <div className="p-4 md:p-6 space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            {selectedMembers.length > 0 && (
              <>
                <Button variant="outline" size="sm" className="gap-2">
                  <Award className="h-4 w-4" />
                  Assign Role
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <Star className="h-4 w-4" />
                  Award Points
                </Button>
                <Button variant="outline" size="sm" className="gap-2 text-destructive">
                  <X className="h-4 w-4" />
                  Remove
                </Button>
              </>
            )}
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search members..." className="w-full pl-8" />
            </div>
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
            <Select defaultValue="all">
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
              <span className="sr-only">Download</span>
            </Button>
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300"
                      checked={selectedMembers.length === members.length}
                      onChange={toggleAllMembers}
                    />
                  </div>
                </TableHead>
                <TableHead>Member</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">
                  <div className="flex items-center gap-1">
                    Points
                    <SortAsc className="h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead className="hidden md:table-cell">Join Date</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {members.map((member) => (
                <TableRow key={member.id}>
                  <TableCell>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300"
                        checked={selectedMembers.includes(member.id)}
                        onChange={() => toggleMember(member.id)}
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src="/placeholder.svg?height=32&width=32" alt={member.name} />
                        <AvatarFallback>
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{member.name}</div>
                        <div className="text-sm text-muted-foreground">{member.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{member.role}</TableCell>
                  <TableCell>
                    <Badge variant={member.status === "active" ? "default" : "outline"}>
                      {member.status === "active" ? (
                        <div className="flex items-center gap-1">
                          <Check className="h-3 w-3" />
                          Active
                        </div>
                      ) : (
                        "Inactive"
                      )}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{member.points}</TableCell>
                  <TableCell className="hidden md:table-cell">{member.joinDate}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View Profile</DropdownMenuItem>
                        <DropdownMenuItem>Edit Member</DropdownMenuItem>
                        <DropdownMenuItem>Assign Role</DropdownMenuItem>
                        <DropdownMenuItem>Award Points</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">Remove Member</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}

