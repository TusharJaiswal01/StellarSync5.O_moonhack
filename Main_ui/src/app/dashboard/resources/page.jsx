"use client"

import { useState } from "react"
import {
  FileText,
  Lock,
  Plus,
  Search,
  Settings,
  Shield,
  Upload,
  Download,
  CreditCard,
  Building,
  CheckCircle,
  AlertCircle,
  Clock,
  Calendar,
  Users,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function ResourcesPage() {
  const [selectedTab, setSelectedTab] = useState("funds")

  const transactions = [
    {
      id: "1",
      date: "Mar 10, 2025",
      description: "Photography Equipment Purchase",
      amount: -350.0,
      category: "Equipment",
      status: "completed",
      approvedBy: "David Chen",
    },
    {
      id: "2",
      date: "Mar 5, 2025",
      description: "Workshop Registration Fees",
      amount: 450.0,
      category: "Income",
      status: "completed",
      approvedBy: "Sarah Johnson",
    },
    {
      id: "3",
      date: "Feb 28, 2025",
      description: "Venue Rental for Exhibition",
      amount: -200.0,
      category: "Venue",
      status: "completed",
      approvedBy: "David Chen",
    },
    {
      id: "4",
      date: "Feb 20, 2025",
      description: "Membership Dues",
      amount: 375.0,
      category: "Income",
      status: "completed",
      approvedBy: "Sarah Johnson",
    },
    {
      id: "5",
      date: "Feb 15, 2025",
      description: "Printing Services for Flyers",
      amount: -75.0,
      category: "Marketing",
      status: "completed",
      approvedBy: "David Chen",
    },
  ]

  const resources = [
    {
      id: "1",
      name: "DSLR Camera Kit",
      type: "Equipment",
      status: "Available",
      lastUsed: "Mar 5, 2025",
      accessLevel: "All Members",
    },
    {
      id: "2",
      name: "Lighting Equipment",
      type: "Equipment",
      status: "In Use",
      lastUsed: "Mar 12, 2025",
      accessLevel: "Level 3+",
    },
    {
      id: "3",
      name: "Media Lab",
      type: "Venue",
      status: "Available",
      lastUsed: "Mar 8, 2025",
      accessLevel: "All Members",
    },
    {
      id: "4",
      name: "Adobe Creative Cloud",
      type: "Software",
      status: "Available",
      lastUsed: "Mar 10, 2025",
      accessLevel: "Level 2+",
    },
    {
      id: "5",
      name: "Exhibition Space",
      type: "Venue",
      status: "Reserved",
      lastUsed: "Feb 20, 2025",
      accessLevel: "Officers Only",
    },
  ]

  const pendingApprovals = [
    {
      id: "1",
      type: "Expense",
      description: "Backdrop Purchase for Studio",
      amount: 120.0,
      requestedBy: "Michael Lee",
      date: "Mar 12, 2025",
      status: "pending",
    },
    {
      id: "2",
      type: "Resource",
      description: "Media Lab Reservation",
      requestedBy: "Emma Wilson",
      date: "Mar 20, 2025",
      time: "3:00 PM - 5:00 PM",
      status: "pending",
    },
  ]

  return (
    <div className="flex flex-col h-full bg-black">
      <div className="flex items-center justify-between p-4 border-b border-white/10 text-blue-100">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-blue-100">Secure Resource & Fund Management</h1>
          <p className="text-blue-200">Manage club resources, funds, and access control</p>
        </div>
        <div className="flex gap-2  ">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="gap-2 bg-slate-400/5 border-slate-600">
                <Upload className="h-4 w-4" />
                Request Resource
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] bg-black text-white shadow-md shadow-blue-500">
              <DialogHeader>
                <DialogTitle>Request Club Resource</DialogTitle>
                <DialogDescription>Submit a request to use club resources or venues.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4 ">
                <div className="grid gap-2">
                  <label htmlFor="resource" className="text-sm font-medium">
                    Resource Type
                  </label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select resource type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="equipment">Equipment</SelectItem>
                      <SelectItem value="venue">Venue</SelectItem>
                      <SelectItem value="software">Software</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <label htmlFor="specific" className="text-sm font-medium">
                    Specific Resource
                  </label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select specific resource" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="camera">DSLR Camera Kit</SelectItem>
                      <SelectItem value="lighting">Lighting Equipment</SelectItem>
                      <SelectItem value="lab">Media Lab</SelectItem>
                      <SelectItem value="adobe">Adobe Creative Cloud</SelectItem>
                      <SelectItem value="exhibition">Exhibition Space</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <label htmlFor="date" className="text-sm font-medium">
                      Date
                    </label>
                    <Input id="date" type="date" />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="time" className="text-sm font-medium">
                      Time
                    </label>
                    <Input id="time" type="time" />
                  </div>
                </div>
                <div className="grid gap-2">
                  <label htmlFor="purpose" className="text-sm font-medium">
                    Purpose
                  </label>
                  <textarea
                    id="purpose"
                    className="min-h-[80px] rounded-md border bg-transparent border-input  px-3 py-2 text-sm"
                    placeholder="Explain why you need this resource"
                  ></textarea>
                </div>
              </div>
              <DialogFooter>
                <Button className={"bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600"} type="submit">Submit Request</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button className="gap-2 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600">
                <Plus className="h-4 w-4" />
                Add Expense
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] bg-black text-white shadow-md shadow-blue-600">
              <DialogHeader>
                <DialogTitle>Add New Expense</DialogTitle>
                <DialogDescription>Submit a new expense for approval and reimbursement.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <label htmlFor="description" className="text-sm font-medium">
                    Description
                  </label>
                  <Input id="description" placeholder="Enter expense description" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <label htmlFor="amount" className="text-sm font-medium">
                      Amount
                    </label>
                    <Input id="amount" type="number" min="0.01" step="0.01" placeholder="0.00" />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="category" className="text-sm font-medium">
                      Category
                    </label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="equipment">Equipment</SelectItem>
                        <SelectItem value="venue">Venue</SelectItem>
                        <SelectItem value="marketing">Marketing</SelectItem>
                        <SelectItem value="events">Events</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid gap-2">
                  <label htmlFor="date" className="text-sm font-medium">
                    Date
                  </label>
                  <Input id="date" type="date" />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="receipt" className="text-sm font-medium">
                    Receipt
                  </label>
                  <div className="flex items-center gap-2 text-gray-300">
                    <Input id="receipt" type="file" className="flex-1 text-gray-500 bg-gray-200" />
                    <Button variant="outline" size="sm" className={""}>
                      <Upload className="h-4 w-4 text-black" />
                    </Button>
                  </div>
                </div>
                <div className="grid gap-2">
                  <label htmlFor="notes" className="text-sm font-medium">
                    Additional Notes
                  </label>
                  <textarea
                    id="notes"
                    className="min-h-[80px] rounded-md border border-input bg-transparent px-3 py-2 text-sm"
                    placeholder="Enter any additional details"
                  ></textarea>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" className={"bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600"}>Submit Expense</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="p-4 md:p-6 space-y-6">
        <Tabs defaultValue="funds" className="w-full" onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-3 mb-4 bg-slate-800/20">
            <TabsTrigger value="funds">Funds</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          <TabsContent value="funds" className="space-y-6 bg-slate-900/40  text-blue-100">
            <div className="grid gap-4 md:grid-cols-3 ">
              {/* Current Balance Card */}
              <Card className="bg-blue-800/25 hover:bg-blue-800/35 border-white/10 hover:shadow-lg">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-blue-100">Current Balance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-100">$1,245.00</div>
                  <p className="text-xs text-blue-100">Updated: Mar 12, 2025</p>
                </CardContent>
              </Card>

              {/* Income (This Month) Card */}
              <Card className="bg-blue-800/25 hover:bg-blue-800/35 border-white/10 hover:shadow-lg">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-blue-100">Income (This Month)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">+$825.00</div>
                  <p className="text-xs text-blue-200">From 2 sources</p>
                </CardContent>
              </Card>

              {/* Expenses (This Month) Card */}
              <Card className="bg-blue-800/25 hover:bg-blue-800/35 border-white/10 hover:shadow-lg">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-blue-100">Expenses (This Month)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">-$625.00</div>
                  <p className="text-xs text-blue-200">From 3 categories</p>
                </CardContent>
              </Card>
            </div>

            {/* Budget Overview Card */}
            <Card className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-md border-white/10">
              <CardHeader>
                <div className="flex justify-between items-center text-blue-200">
                  <div>
                    <CardTitle>Budget Overview</CardTitle>
                    <CardDescription className={"text-gray-100"}>Current semester budget allocation</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" className="gap-2 bg-gray-700">
                    <Download className="h-4 w-4" />
                    Export
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Equipment Budget */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-blue-100">
                      <span>Equipment</span>
                      <span className="font-medium">$600 / $800</span>
                    </div>
                    <Progress value={75} className="h-2 bg-blue-900/40 border-white/10 border" />
                    <p className="text-xs text-emerald-400">75% of budget used</p>
                  </div>

                  {/* Events Budget */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-blue-100">
                      <span>Events</span>
                      <span className="font-medium">$450 / $600</span>
                    </div>
                    <Progress value={75} className="h-2 bg-blue-900/40 border-white/10 border" />
                    <p className="text-xs text-emerald-400">75% of budget used</p>
                  </div>

                  {/* Marketing Budget */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-blue-100">
                      <span>Marketing</span>
                      <span className="font-medium">$75 / $200</span>
                    </div>
                    <Progress value={37.5} className="h-2 bg-blue-900/40 border-white/10 border" />
                    <p className="text-xs text-emerald-400">37.5% of budget used</p>
                  </div>

                  {/* Venue Budget */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-blue-100">
                      <span>Venue</span>
                      <span className="font-medium">$200 / $300</span>
                    </div>
                    <Progress value={66.7} className="h-2 bg-blue-900/40 border-white/10 border" />
                    <p className="text-xs text-emerald-400">66.7% of budget used</p>
                  </div>

                  {/* Miscellaneous Budget */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-blue-100">
                      <span>Miscellaneous</span>
                      <span className="font-medium">$30 / $100</span>
                    </div>
                    <Progress value={30} className="h-2 bg-blue-900/40 border-white/10 border" />
                    <p className="text-xs text-emerald-400">30% of budget used</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Transaction History Card */}
            <Card className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-md border-white/10">
              <CardHeader>
                <div className="flex justify-between items-center text-blue-200">
                  <div>
                    <CardTitle>Transaction History</CardTitle>
                    <CardDescription className={"text-gray-100"}>Recent financial activity</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="relative w-full sm:w-64">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-blue-200 " />
                      <Input
                        type="search"
                        placeholder="Search transactions..."
                        className="w-full pl-8 bg-slate-800/20 text-blue-200 placeholder:text-blue-200 border-white/10"
                      />
                    </div>
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[120px] border-white/10">
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent className={"bg-purple-500 text-white "}>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="income">Income</SelectItem>
                        <SelectItem value="expense">Expenses</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table className="">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-blue-200">Date</TableHead>
                      <TableHead className="text-blue-200">Description</TableHead>
                      <TableHead className="text-blue-200">Category</TableHead>
                      <TableHead className="text-right text-blue-200">Amount</TableHead>
                      <TableHead className="text-blue-200">Approved By</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell className="text-blue-200">{transaction.date}</TableCell>
                        <TableCell className="text-blue-200">{transaction.description}</TableCell>
                        <TableCell>
                          <Badge className = { transaction.category === "Income" ? 'bg-slate-900 border-red-500/50 text-red-400' : 'bg-slate-900 border-blue-500/50 text-blue-400'} variant={transaction.category === "Income" ? "outline" : "secondary"} >
                            {transaction.category}
                          </Badge>
                        </TableCell>
                        <TableCell
                          className={`text-right ${transaction.amount > 0 ? "text-green-600" : "text-red-600"
                            } text-blue-200`}
                        >
                          {transaction.amount > 0 ? "+" : ""}
                          {transaction.amount.toFixed(2)}
                        </TableCell>
                        <TableCell className="text-blue-200">{transaction.approvedBy}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button variant="outline" size="sm" className="hover:bg-blue-900 bg-slate-800/20 border-blue-900 text-blue-200 ">
                  Load More
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>


          <TabsContent value="resources" className="space-y-6 bg-black text-blue-100">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <h3 className="text-lg font-medium">Club Resources</h3>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-blue-200" />
                  <Input
                    type="search"
                    placeholder="Search resources..."
                    className="w-full pl-8 bg-slate-800/20 text-blue-200 placeholder:text-blue-200 border-white/10 "
                  />
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-full border-white/10 sm:w-40">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent className={"bg-black text-white"}>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="equipment">Equipment</SelectItem>
                    <SelectItem value="venue">Venue</SelectItem>
                    <SelectItem value="software">Software</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Card className={"bg-blue-800/25"}>
              <CardContent className="p-0 ">
                <Table>
                  <TableHeader>
                    <TableRow className={"text-white"}>
                      <TableHead className={"text-white"}>Resource</TableHead>
                      <TableHead className={"text-white"}>Type</TableHead>
                      <TableHead className={"text-white"}>Status</TableHead>
                      <TableHead className={"text-white"}>Last Used</TableHead>
                      <TableHead className={"text-white"}>Access Level</TableHead>
                      <TableHead className="text-right text-white">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {resources.map((resource) => (
                      <TableRow key={resource.id}>
                        <TableCell className="font-medium text-blue-200">{resource.name}</TableCell>
                        <TableCell className="text-blue-200">{resource.type}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              resource.status === "Available"
                                ? ""
                                : resource.status === "In Use"
                                  ? ""
                                  : "default"
                            }
                            className={`text-blue-200 ${resource.status === "Available"
                                ? "border-green-600 text-green-600"
                                : resource.status === "In Use"
                                  ? "border-red-600 text-red-600 "
                                  : "border-blue-600 text-blue-600"
                              }`}
                          >
                            {resource.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-blue-200">{resource.lastUsed}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1 text-blue-200">
                            {resource.accessLevel === "Officers Only" && <Lock className="h-3 w-3" />}
                            {resource.accessLevel}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="outline"
                            size="sm"
                            disabled={resource.status !== "Available"}
                            className="hover:bg-yellow-500 bg-yellow-300  text-black"
                          >
                            Request
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-2 text-blue-100">
              {/* Upcoming Reservations Card */}
              <Card className={"bg-blue-800/25"}>
                <CardHeader>
                  <CardTitle className={"text-blue-100"}>Upcoming Reservations</CardTitle>
                  <CardDescription>Scheduled resource usage</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 ">
                  <div className="border rounded-lg p-3 space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-blue-200">Media Lab</h4>
                        <p className="text-sm text-blue-200">Reserved by Michael Lee</p>
                      </div>
                      <Badge className="text-red-300 bg-transparent border-red-500">Tomorrow</Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-blue-200">
                      <Calendar className="h-4 w-4" />
                      <span>March 15, 2025</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-blue-200">
                      <Clock className="h-4 w-4" />
                      <span>2:00 PM - 4:00 PM</span>
                    </div>
                  </div>

                  <div className="border rounded-lg p-3 space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-blue-200">DSLR Camera Kit</h4>
                        <p className="text-sm text-blue-200">Reserved by Emma Wilson</p>
                      </div>
                      <Badge variant="outline" className="text-amber-300 border-amber-500">
                        In 3 days
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-blue-200">
                      <Calendar className="h-4 w-4" />
                      <span>March 17, 2025</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-blue-200">
                      <Clock className="h-4 w-4" />
                      <span>All day</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Resource Usage Analytics Card */}
              <Card className={"bg-blue-800/25"}>
                <CardHeader>
                  <CardTitle className={"text-blue-200"}>Resource Usage Analytics</CardTitle>
                  <CardDescription>Most frequently used resources</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 bg-slate-900/40">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-blue-100 text-blue-200">
                      <span>DSLR Camera Kit</span>
                      <span className="font-medium">24 uses</span>
                    </div>
                    <Progress value={80} className="h-2 bg-blue-900/40" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-blue-100 text-blue-200">
                      <span>Media Lab</span>
                      <span className="font-medium">18 uses</span>
                    </div>
                    <Progress value={60} className="h-2 bg-blue-900/40" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-blue-100 text-blue-200">
                      <span>Lighting Equipment</span>
                      <span className="font-medium">15 uses</span>
                    </div>
                    <Progress value={50} className="h-2 bg-blue-900/40" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-blue-100 text-blue-200">
                      <span>Adobe Creative Cloud</span>
                      <span className="font-medium">12 uses</span>
                    </div>
                    <Progress value={40} className="h-2 bg-blue-900/40" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-blue-100 text-blue-200">
                      <span>Exhibition Space</span>
                      <span className="font-medium">5 uses</span>
                    </div>
                    <Progress value={16.7} className="h-2 bg-blue-900/40" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>


          <TabsContent value="security" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 text-blue-100">
              {/* Access Control Card */}
              <Card className="bg-blue-800/25 text-blue-100 border-white/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-orange-400" />
                    Access Control
                  </CardTitle>
                  <CardDescription>Manage role-based permissions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-yellow-400">Role Permissions</h4>
                    <div className="border border-blue-200/10 rounded-lg  divide-y divide-blue-200/10">
                      {["President", "Treasurer", "Secretary", "Member"].map((role, index) => (
                        <div key={index} className="p-3 flex justify-between items-center">
                          <div>
                            <h5 className="font-medium text-blue-200">{role}</h5>
                            <p className="text-xs text-blue-200">
                              {role === "President"
                                ? "Full access to all resources and funds"
                                : role === "Treasurer"
                                  ? "Full access to funds, limited resource access"
                                  : role === "Secretary"
                                    ? "View-only for funds, can request resources"
                                    : "Can request resources, no fund access"}
                            </p>
                          </div>
                          <Button variant="outline" size="sm" className="hover:bg-[#008000] bg-[#5CE65C]  text-black">
                            Edit
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Pending Approvals Card */}
              <Card className="bg-blue-800/25 text-blue-100 border-white/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-blue-100 text-orange-400" />
                    Pending Approvals
                  </CardTitle>
                  <CardDescription>Requests awaiting approval</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {pendingApprovals.map((approval, index) => (
                    <div
                      key={approval.id}
                      className="border border-blue-200/10  rounded-lg p-3 space-y-2 hover:bg-slate-800/20"
                    >
                      <div className="flex justify-between items-start">
                        <Badge className={approval.type === "Expense" ? 'border-gray-100/10 bg-[#509696] text-gray-200' : 'bg-[#509696] text-gray-200'} variant={approval.type === "Expense" ? "" : ""}>
                          {approval.type}
                        </Badge>
                        <Badge className={"border-red-500/50 bg-transparent text-red-400"} variant="">Pending</Badge>
                      </div>
                      <h4 className="font-medium text-blue-200">{approval.description}</h4>
                      <div className="text-sm text-blue-200">Requested by: {approval.requestedBy}</div>
                      <div className="flex items-center gap-2 text-sm text-blue-200">
                        <Calendar className="h-4 w-4" />
                        <span>{approval.date}</span>
                        {approval.time && (
                          <>
                            <Clock className="h-4 w-4 ml-2" />
                            <span>{approval.time}</span>
                          </>
                        )}
                      </div>
                      {approval.amount && (
                        <div className="font-medium text-blue-200">${approval.amount.toFixed(2)}</div>
                      )}
                      <div className="flex gap-2 pt-2">
                        <Button size="sm" className="gap-1  hover:bg-yellow-400 hover:text-black text-yellow-400 border border-yellow-400">
                          <CheckCircle className="h-4 w-4" />
                          Approve
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-1 hover:bg-red-600 border border-red-600 bg-primary text-red-500"
                        >
                          <AlertCircle className="h-4 w-4" />
                          Deny
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Security Settings Card */}
              <Card className="bg-blue-800/25 text-blue-100 border-white/10 ">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5  text-orange-400" />
                    Security Settings
                  </CardTitle>
                  <CardDescription>Configure security options</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Authentication */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-blue-200">Authentication</h4>
                    {[{ label: "Two-Factor Authentication", checked: true },
                    { label: "Officer Approval Required", checked: true }]
                      .map((item, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Lock className="h-4 w-4 text-blue-200" />
                            <span className="text-sm">{item.label}</span>
                          </div>
                          <div className="flex items-center h-5">
                            <input
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300"
                              checked={item.checked}
                            />
                          </div>
                        </div>
                      ))}
                  </div>

                  {/* Expense Approval */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-blue-200">Expense Approval</h4>
                    {[{ label: "Require receipts for all expenses", checked: true },
                    { label: "Dual approval for expenses over $100", checked: true }]
                      .map((item, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <CreditCard className="h-4 w-4 text-blue-200" />
                            <span className="text-sm">{item.label}</span>
                          </div>
                          <div className="flex items-center h-5">
                            <input
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300"
                              checked={item.checked}
                            />
                          </div>
                        </div>
                      ))}
                  </div>

                  {/* Audit Trail */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-blue-200">Audit Trail</h4>
                    {[{ label: "Enable detailed activity logging", checked: true },
                    { label: "Auto-export monthly reports", checked: false }]
                      .map((item, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-blue-200" />
                            <span className="text-sm">{item.label}</span>
                          </div>
                          <div className="flex items-center h-5">
                            <input
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300"
                              checked={item.checked}
                            />
                          </div>
                        </div>
                      ))}
                  </div>

                  {/* Save Button */}
                  <Button className="w-full  bg-yellow-400 border-black text-black">Save Security Settings</Button>
                </CardContent>
              </Card>

            </div>
          </TabsContent>

        </Tabs>
      </div>
    </div>
  )
}

