"use client"

import { useEffect, useState } from "react"
import {
  Check,
  Edit,
  MoreHorizontal,
  Search,
  Trash,
  X,
  UserPlus,
  Save,
  Calendar,
  Mail,
  Phone,
  CreditCard,
  FileText,
  User,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export default function MembersPage() {
  const [members, setMembers] = useState<any[]>([])
  const [payments, setPayments] = useState<any[]>([])
  const [filteredMembers, setFilteredMembers] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [tierFilter, setTierFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentMember, setCurrentMember] = useState<any>(null)
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [newMember, setNewMember] = useState({
    name: "",
    email: "",
    phone: "",
    tier: "Basic",
    startDate: new Date().toISOString().split("T")[0],
    expiryDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split("T")[0],
    paymentStatus: "Pending",
    notes: "",
  })

  useEffect(() => {
    // Load members data
    const membersData = localStorage.getItem("members")
    if (membersData) {
      const parsedMembers = JSON.parse(membersData)
      setMembers(parsedMembers)
      setFilteredMembers(parsedMembers)
    }

    // Load payments data
    const paymentsData = localStorage.getItem("payments")
    if (paymentsData) {
      setPayments(JSON.parse(paymentsData))
    }
  }, [])

  useEffect(() => {
    // Apply filters
    let result = [...members]

    // Search filter
    if (searchQuery) {
      result = result.filter(
        (member) =>
          member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          member.phone.includes(searchQuery),
      )
    }

    // Tier filter
    if (tierFilter !== "all") {
      result = result.filter((member) => member.tier === tierFilter)
    }

    // Status filter
    if (statusFilter !== "all") {
      result = result.filter((member) => member.paymentStatus === statusFilter)
    }

    setFilteredMembers(result)
  }, [members, searchQuery, tierFilter, statusFilter])

  const validateForm = (member: any) => {
    const errors: Record<string, string> = {}

    if (!member.name.trim()) {
      errors.name = "Name is required"
    }

    if (!member.email.trim()) {
      errors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(member.email)) {
      errors.email = "Email is invalid"
    }

    if (!member.phone.trim()) {
      errors.phone = "Phone number is required"
    }

    if (!member.startDate) {
      errors.startDate = "Start date is required"
    }

    if (!member.expiryDate) {
      errors.expiryDate = "Expiry date is required"
    } else if (new Date(member.expiryDate) <= new Date(member.startDate)) {
      errors.expiryDate = "Expiry date must be after start date"
    }

    return errors
  }

  const handleAddMember = () => {
    const errors = validateForm(newMember)

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    }

    const id = `mem-${Date.now()}`
    const memberToAdd = {
      id,
      ...newMember,
    }

    const updatedMembers = [...members, memberToAdd]
    setMembers(updatedMembers)
    localStorage.setItem("members", JSON.stringify(updatedMembers))

    // Add a payment record
    const paymentAmount = newMember.tier === "Basic" ? 99.99 : newMember.tier === "Premium" ? 149.99 : 299.99

    const newPayment = {
      id: `pay-${Date.now()}`,
      memberId: id,
      memberName: newMember.name,
      amount: paymentAmount,
      date: new Date().toISOString().split("T")[0],
      status: newMember.paymentStatus,
      method: "Credit Card",
    }

    const updatedPayments = [...payments, newPayment]
    setPayments(updatedPayments)
    localStorage.setItem("payments", JSON.stringify(updatedPayments))

    // Reset form
    setNewMember({
      name: "",
      email: "",
      phone: "",
      tier: "Basic",
      startDate: new Date().toISOString().split("T")[0],
      expiryDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split("T")[0],
      paymentStatus: "Pending",
      notes: "",
    })

    setFormErrors({})
    setIsAddDialogOpen(false)
  }

  const handleEditMember = () => {
    if (!currentMember) return

    const errors = validateForm(currentMember)

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    }

    const updatedMembers = members.map((member) => (member.id === currentMember.id ? currentMember : member))

    setMembers(updatedMembers)
    localStorage.setItem("members", JSON.stringify(updatedMembers))
    setFormErrors({})
    setIsEditDialogOpen(false)
  }

  const handleDeleteMember = () => {
    if (!currentMember) return

    const updatedMembers = members.filter((member) => member.id !== currentMember.id)
    setMembers(updatedMembers)
    localStorage.setItem("members", JSON.stringify(updatedMembers))

    // Also delete related payments
    const updatedPayments = payments.filter((payment) => payment.memberId !== currentMember.id)
    setPayments(updatedPayments)
    localStorage.setItem("payments", JSON.stringify(updatedPayments))

    setIsDeleteDialogOpen(false)
  }

  const getMemberPayments = (memberId: string) => {
    return payments.filter((payment) => payment.memberId === memberId)
  }

  const handleMarkAsPaid = (memberId: string) => {
    // Update member payment status
    const updatedMembers = members.map((member) =>
      member.id === memberId ? { ...member, paymentStatus: "Paid" } : member,
    )

    setMembers(updatedMembers)
    localStorage.setItem("members", JSON.stringify(updatedMembers))

    // Update payment status
    const memberPayments = payments.filter((payment) => payment.memberId === memberId)

    if (memberPayments.length > 0) {
      const latestPayment = memberPayments[memberPayments.length - 1]

      const updatedPayments = payments.map((payment) =>
        payment.id === latestPayment.id ? { ...payment, status: "Completed" } : payment,
      )

      setPayments(updatedPayments)
      localStorage.setItem("payments", JSON.stringify(updatedPayments))
    }
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold ">Membership Management</h1>
          <p className="text-blue-200">Manage your members and their subscriptions</p>
        </div>

        <Button
          onClick={() => setIsAddDialogOpen(true)}
          className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600"
        >
          <UserPlus className="mr-2 h-4 w-4" />
          Add New Member
        </Button>
      </div>

      {/* Filters */}
      <Card className="border border-slate-700/50 bg-slate-900/60 backdrop-blur-md">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-blue-300" />
              <Input
                placeholder="Search members..."
                className="pl-8 bg-slate-900  border-white/10 text-white placeholder:text-gray-200"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="w-full sm:w-40">
                <Select value={tierFilter} onValueChange={setTierFilter}>
                  <SelectTrigger className="bg-slate-900 border-white/10 text-white">
                    <SelectValue placeholder="Filter by tier" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-900 border-white/10 text-white">
                    <SelectItem value="all">All Tiers</SelectItem>
                    <SelectItem value="Basic">Basic</SelectItem>
                    <SelectItem value="Premium">Premium</SelectItem>
                    <SelectItem value="VIP">VIP</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="w-full sm:w-40">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="bg-slate-900 border-white/10 text-white">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-900 border-white/10 text-white">
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="Paid">Paid</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Overdue">Overdue</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                variant="outline"
                size="icon"
                onClick={() => {
                  setSearchQuery("")
                  setTierFilter("all")
                  setStatusFilter("all")
                }}
                className="border-deepblue-300 text-white hover:bg-deepblue-300"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Members Table */}
      <Card className="bg-slate-900 border-white/10">
        <CardHeader>
          <CardTitle className="text-white">Members</CardTitle>
          <CardDescription className="text-blue-200">{filteredMembers.length} members found</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-deepblue-300 overflow-hidden">
            <Table>
              <TableHeader className="bg-slate-800">
                <TableRow>
                  <TableHead className="text-blue-200">Name</TableHead>
                  <TableHead className="text-blue-200">Email</TableHead>
                  <TableHead className="hidden md:table-cell text-blue-200">Tier</TableHead>
                  <TableHead className="hidden md:table-cell text-blue-200">Start Date</TableHead>
                  <TableHead className="hidden md:table-cell text-blue-200">Expiry Date</TableHead>
                  <TableHead className="text-blue-200">Status</TableHead>
                  <TableHead className="text-right text-blue-200">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMembers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-blue-200">
                      No members found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredMembers.map((member) => (
                    <TableRow key={member.id} className="border-b border-deepblue-300 hover:bg-slate-800">
                      <TableCell className="font-medium text-white">{member.name}</TableCell>
                      <TableCell className="text-white">{member.email}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        <Badge
                          variant="outline"
                          className={
                            member.tier === "VIP"
                              ? "bg-purple-500/20 text-purple-300 border-purple-500 hover:bg-purple-500/20 hover:text-purple-300"
                              : member.tier === "Premium"
                                ? "bg-blue-500/20 text-blue-300 border-blue-500 hover:bg-blue-500/20 hover:text-blue-300"
                                : "bg-gray-500/20 text-gray-300 border-gray-500 hover:bg-gray-500/20 hover:text-gray-300"
                          }
                        >
                          {member.tier}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-white">
                        {new Date(member.startDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-white">
                        {new Date(member.expiryDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={
                            member.paymentStatus === "Paid"
                              ? "bg-green-500/20 text-green-300 border-green-500 hover:bg-green-500/20 hover:text-green-300"
                              : member.paymentStatus === "Pending"
                                ? "bg-yellow-500/20 text-yellow-300 border-yellow-500 hover:bg-yellow-500/20 hover:text-yellow-300"
                                : "bg-red-500/20 text-red-300 border-red-500 hover:bg-red-500/20 hover:text-red-300"
                          }
                        >
                          {member.paymentStatus}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="text-white hover:bg-deepblue-300">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-deepblue-200 border-deepblue-300 text-white">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem
                              onClick={() => {
                                setCurrentMember(member)
                                setFormErrors({})
                                setIsEditDialogOpen(true)
                              }}
                              className="hover:bg-deepblue-300"
                            >
                              <Edit className="mr-2 h-4 w-4 text-blue-300" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                setCurrentMember(member)
                                setIsDeleteDialogOpen(true)
                              }}
                              className="hover:bg-deepblue-300"
                            >
                              <Trash className="mr-2 h-4 w-4 text-red-300" />
                              Delete
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="bg-deepblue-300" />
                            <DropdownMenuItem
                              onClick={() => handleMarkAsPaid(member.id)}
                              className="hover:bg-deepblue-300"
                              disabled={member.paymentStatus === "Paid"}
                            >
                              <Check className="mr-2 h-4 w-4 text-green-300" />
                              Mark as Paid
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Payment History */}
      <Card className="bg-slate-900 border-white/10">
        <CardHeader>
          <CardTitle className="text-white">Payment History</CardTitle>
          <CardDescription className="text-blue-200">Recent transactions and payment status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-deepblue-300 overflow-hidden">
            <Table>
              <TableHeader className="bg-slate-800">
                <TableRow>
                  <TableHead className="text-blue-200">Member</TableHead>
                  <TableHead className="text-blue-200">Amount</TableHead>
                  <TableHead className="hidden md:table-cell text-blue-200">Date</TableHead>
                  <TableHead className="hidden md:table-cell text-blue-200">Method</TableHead>
                  <TableHead className="text-blue-200">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payments.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-blue-200">
                      No payment history found
                    </TableCell>
                  </TableRow>
                ) : (
                  payments.map((payment) => (
                    <TableRow key={payment.id} className="border-b border-deepblue-300 hover:bg-slate-800">
                      <TableCell className="font-medium text-white">{payment.memberName}</TableCell>
                      <TableCell className="text-white">${payment.amount.toFixed(2)}</TableCell>
                      <TableCell className="hidden md:table-cell text-white">
                        {new Date(payment.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-white">{payment.method}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            payment.status === "Completed"
                              ? "bg-green-500/20 text-green-300 border-green-500 hover:bg-green-500/20 hover:text-green-300"
                              : payment.status === "Pending"
                                ? "bg-yellow-500/20 text-yellow-300 border-yellow-500 hover:bg-yellow-500/20 hover:text-yellow-300"
                                : "bg-red-500/20 text-red-300 border-red-500 hover:bg-red-500/20 hover:text-red-300"
                          }
                        >
                          {payment.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Add Member Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[700px] bg-slate-950 border-white/10 text-white ">
          <DialogHeader>
            <DialogTitle className="text-white text-xl flex items-center">
              <UserPlus className="mr-2 h-5 w-5 " />
              Add New Member
            </DialogTitle>
            <DialogDescription className="text-blue-200">
              Fill in the details to add a new member to your hub.
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="details" className="w-full">
            <TabsList className="bg-slate-900 w-full">
              <TabsTrigger value="details" className="text-white data-[state=active]:bg-deepblue-50">
                <User className="mr-2 h-4 w-4" />
                Member Details
              </TabsTrigger>
              <TabsTrigger value="membership" className="text-white data-[state=active]:bg-deepblue-50">
                <CreditCard className="mr-2 h-4 w-4" />
                Membership Info
              </TabsTrigger>
              <TabsTrigger value="notes" className="text-white data-[state=active]:bg-deepblue-50">
                <FileText className="mr-2 h-4 w-4" />
                Additional Notes
              </TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white">
                    Full Name
                  </Label>
                  <div className="relative">
                    <User className="absolute left-2.5 top-2.5 h-4 w-4 text-blue-300" />
                    <Input
                      id="name"
                      value={newMember.name}
                      onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                      placeholder="John Smith"
                      className="pl-8 bg-slate-900 border-deepblue-300 text-white placeholder:text-blue-300"
                    />
                  </div>
                  {formErrors.name && <p className="text-red-300 text-xs">{formErrors.name}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-2.5 top-2.5 h-4 w-4 text-blue-300" />
                    <Input
                      id="email"
                      type="email"
                      value={newMember.email}
                      onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                      placeholder="john@example.com"
                      className="pl-8 bg-slate-900 border-deepblue-300 text-white placeholder:text-blue-300"
                    />
                  </div>
                  {formErrors.email && <p className="text-red-300 text-xs">{formErrors.email}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-white">
                    Phone Number
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-2.5 top-2.5 h-4 w-4 text-blue-300" />
                    <Input
                      id="phone"
                      value={newMember.phone}
                      onChange={(e) => setNewMember({ ...newMember, phone: e.target.value })}
                      placeholder="555-123-4567"
                      className="pl-8 bg-slate-900 border-deepblue-300 text-white placeholder:text-blue-300"
                    />
                  </div>
                  {formErrors.phone && <p className="text-red-300 text-xs">{formErrors.phone}</p>}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="membership" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tier" className="text-white">
                    Membership Tier
                  </Label>
                  <Select value={newMember.tier} onValueChange={(value) => setNewMember({ ...newMember, tier: value })}>
                    <SelectTrigger id="tier" className="bg-slate-900 border-deepblue-300 text-white">
                      <SelectValue placeholder="Select tier" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-900 border-deepblue-300 text-white">
                      <SelectItem value="Basic">Basic - $99.99/year</SelectItem>
                      <SelectItem value="Premium">Premium - $149.99/year</SelectItem>
                      <SelectItem value="VIP">VIP - $299.99/year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="paymentStatus" className="text-white">
                    Payment Status
                  </Label>
                  <Select
                    value={newMember.paymentStatus}
                    onValueChange={(value) => setNewMember({ ...newMember, paymentStatus: value })}
                  >
                    <SelectTrigger id="paymentStatus" className="bg-slate-900 border-deepblue-300 text-white">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-900 border-deepblue-300 text-white">
                      <SelectItem value="Paid">Paid</SelectItem>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Overdue">Overdue</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="startDate" className="text-white">
                    Start Date
                  </Label>
                  <div className="relative">
                    <Calendar className="absolute left-2.5 top-2.5 h-4 w-4 text-blue-300" />
                    <Input
                      id="startDate"
                      type="date"
                      value={newMember.startDate}
                      onChange={(e) => setNewMember({ ...newMember, startDate: e.target.value })}
                      className="pl-8 bg-slate-900 border-deepblue-300 text-white"
                    />
                  </div>
                  {formErrors.startDate && <p className="text-red-300 text-xs">{formErrors.startDate}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="expiryDate" className="text-white">
                    Expiry Date
                  </Label>
                  <div className="relative">
                    <Calendar className="absolute left-2.5 top-2.5 h-4 w-4 text-blue-300" />
                    <Input
                      id="expiryDate"
                      type="date"
                      value={newMember.expiryDate}
                      onChange={(e) => setNewMember({ ...newMember, expiryDate: e.target.value })}
                      className="pl-8 bg-slate-900 border-deepblue-300 text-white"
                    />
                  </div>
                  {formErrors.expiryDate && <p className="text-red-300 text-xs">{formErrors.expiryDate}</p>}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="notes" className="mt-4">
              <div className="space-y-2">
                <Label htmlFor="notes" className="text-white">
                  Additional Notes
                </Label>
                <Textarea
                  id="notes"
                  value={newMember.notes}
                  onChange={(e) => setNewMember({ ...newMember, notes: e.target.value })}
                  placeholder="Any additional information about the member"
                  className="min-h-[150px] bg-slate-900 border-deepblue-300 text-white placeholder:text-blue-300"
                />
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter className="mt-4">
            <Button
              variant="outline"
              onClick={() => {
                setIsAddDialogOpen(false)
                setFormErrors({})
              }}
              className="border-deepblue-300 text-white hover:bg-deepblue-300"
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddMember}
              className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600"
            >
              <Save className="mr-2 h-4 w-4" />
              Add Member
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Member Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[700px] bg-deepblue-200 border-deepblue-300 text-white form-card">
          <DialogHeader>
            <DialogTitle className="text-white text-xl flex items-center">
              <Edit className="mr-2 h-5 w-5 text-neon-blue" />
              Edit Member
            </DialogTitle>
            <DialogDescription className="text-blue-200">Update member information.</DialogDescription>
          </DialogHeader>
          {currentMember && (
            <Tabs defaultValue="details" className="w-full">
              <TabsList className="bg-deepblue-100 w-full">
                <TabsTrigger value="details" className="text-white data-[state=active]:bg-deepblue-300">
                  <User className="mr-2 h-4 w-4" />
                  Member Details
                </TabsTrigger>
                <TabsTrigger value="membership" className="text-white data-[state=active]:bg-deepblue-300">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Membership Info
                </TabsTrigger>
                <TabsTrigger value="notes" className="text-white data-[state=active]:bg-deepblue-300">
                  <FileText className="mr-2 h-4 w-4" />
                  Additional Notes
                </TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-name" className="text-white">
                      Full Name
                    </Label>
                    <div className="relative">
                      <User className="absolute left-2.5 top-2.5 h-4 w-4 text-blue-300" />
                      <Input
                        id="edit-name"
                        value={currentMember.name}
                        onChange={(e) => setCurrentMember({ ...currentMember, name: e.target.value })}
                        className="pl-8 bg-deepblue-100 border-deepblue-300 text-white"
                      />
                    </div>
                    {formErrors.name && <p className="text-red-300 text-xs">{formErrors.name}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="edit-email" className="text-white">
                      Email
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-2.5 top-2.5 h-4 w-4 text-blue-300" />
                      <Input
                        id="edit-email"
                        type="email"
                        value={currentMember.email}
                        onChange={(e) => setCurrentMember({ ...currentMember, email: e.target.value })}
                        className="pl-8 bg-deepblue-100 border-deepblue-300 text-white"
                      />
                    </div>
                    {formErrors.email && <p className="text-red-300 text-xs">{formErrors.email}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="edit-phone" className="text-white">
                      Phone Number
                    </Label>
                    <div className="relative">
                      <Phone className="absolute left-2.5 top-2.5 h-4 w-4 text-blue-300" />
                      <Input
                        id="edit-phone"
                        value={currentMember.phone}
                        onChange={(e) => setCurrentMember({ ...currentMember, phone: e.target.value })}
                        className="pl-8 bg-deepblue-100 border-deepblue-300 text-white"
                      />
                    </div>
                    {formErrors.phone && <p className="text-red-300 text-xs">{formErrors.phone}</p>}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="membership" className="mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-tier" className="text-white">
                      Membership Tier
                    </Label>
                    <Select
                      value={currentMember.tier}
                      onValueChange={(value) => setCurrentMember({ ...currentMember, tier: value })}
                    >
                      <SelectTrigger id="edit-tier" className="bg-deepblue-100 border-deepblue-300 text-white">
                        <SelectValue placeholder="Select tier" />
                      </SelectTrigger>
                      <SelectContent className="bg-deepblue-200 border-deepblue-300 text-white">
                        <SelectItem value="Basic">Basic - $99.99/year</SelectItem>
                        <SelectItem value="Premium">Premium - $149.99/year</SelectItem>
                        <SelectItem value="VIP">VIP - $299.99/year</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="edit-paymentStatus" className="text-white">
                      Payment Status
                    </Label>
                    <Select
                      value={currentMember.paymentStatus}
                      onValueChange={(value) => setCurrentMember({ ...currentMember, paymentStatus: value })}
                    >
                      <SelectTrigger id="edit-paymentStatus" className="bg-deepblue-100 border-deepblue-300 text-white">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent className="bg-deepblue-200 border-deepblue-300 text-white">
                        <SelectItem value="Paid">Paid</SelectItem>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="Overdue">Overdue</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="edit-startDate" className="text-white">
                      Start Date
                    </Label>
                    <div className="relative">
                      <Calendar className="absolute left-2.5 top-2.5 h-4 w-4 text-blue-300" />
                      <Input
                        id="edit-startDate"
                        type="date"
                        value={currentMember.startDate}
                        onChange={(e) => setCurrentMember({ ...currentMember, startDate: e.target.value })}
                        className="pl-8 bg-deepblue-100 border-deepblue-300 text-white"
                      />
                    </div>
                    {formErrors.startDate && <p className="text-red-300 text-xs">{formErrors.startDate}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="edit-expiryDate" className="text-white">
                      Expiry Date
                    </Label>
                    <div className="relative">
                      <Calendar className="absolute left-2.5 top-2.5 h-4 w-4 text-blue-300" />
                      <Input
                        id="edit-expiryDate"
                        type="date"
                        value={currentMember.expiryDate}
                        onChange={(e) => setCurrentMember({ ...currentMember, expiryDate: e.target.value })}
                        className="pl-8 bg-deepblue-100 border-deepblue-300 text-white"
                      />
                    </div>
                    {formErrors.expiryDate && <p className="text-red-300 text-xs">{formErrors.expiryDate}</p>}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="notes" className="mt-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-notes" className="text-white">
                    Additional Notes
                  </Label>
                  <Textarea
                    id="edit-notes"
                    value={currentMember.notes}
                    onChange={(e) => setCurrentMember({ ...currentMember, notes: e.target.value })}
                    className="min-h-[150px] bg-deepblue-100 border-deepblue-300 text-white"
                  />
                </div>
              </TabsContent>
            </Tabs>
          )}
          <DialogFooter className="mt-4">
            <Button
              variant="outline"
              onClick={() => {
                setIsEditDialogOpen(false)
                setFormErrors({})
              }}
              className="border-deepblue-300 text-white hover:bg-deepblue-300"
            >
              Cancel
            </Button>
            <Button
              onClick={handleEditMember}
              className="bg-gradient-to-r from-neon-blue to-neon-green hover:shadow-blue-glow transition-shadow"
            >
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Member Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="bg-deepblue-200 border-deepblue-300 text-white form-card">
          <DialogHeader>
            <DialogTitle className="text-white text-xl flex items-center">
              <Trash className="mr-2 h-5 w-5 text-red-300" />
              Confirm Deletion
            </DialogTitle>
            <DialogDescription className="text-blue-200">
              Are you sure you want to delete this member? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {currentMember && (
            <div className="py-4 flex items-center space-x-4">
              <Avatar className="h-12 w-12">
                <AvatarFallback className="bg-deepblue-400 text-white">
                  {currentMember.name
                    .split(" ")
                    .map((n: string) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-white">{currentMember.name}</p>
                <p className="text-sm text-blue-200">{currentMember.email}</p>
                <div className="flex items-center mt-1">
                  <Badge
                    variant="outline"
                    className={
                      currentMember.tier === "VIP"
                        ? "bg-purple-500/20 text-purple-300 border-purple-500"
                        : currentMember.tier === "Premium"
                          ? "bg-blue-500/20 text-blue-300 border-blue-500"
                          : "bg-gray-500/20 text-gray-300 border-gray-500"
                    }
                  >
                    {currentMember.tier}
                  </Badge>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
              className="border-deepblue-300 text-white hover:bg-deepblue-300"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteMember}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              <Trash className="mr-2 h-4 w-4" />
              Delete Member
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

