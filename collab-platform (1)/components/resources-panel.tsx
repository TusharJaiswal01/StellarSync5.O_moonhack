"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Server, Database, Laptop, Users, Calendar, Clock, ArrowRight, Plus, X, Check, AlertCircle } from "lucide-react"
import { GlassmorphicCard } from "./ui/glassmorphic-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

type Resource = {
  id: number
  name: string
  provider: string
  type: string
  icon: JSX.Element
  availability: string
  capacity: number
  usedCapacity: number
  tags: string[]
}

const initialResources: Resource[] = [
  {
    id: 1,
    name: "Lab with 80 computers",
    provider: "Engineering College",
    type: "hardware",
    icon: <Laptop />,
    availability: "Weekdays 6-9pm",
    capacity: 80,
    usedCapacity: 23,
    tags: ["Computing", "Workshop"],
  },
  {
    id: 2,
    name: "Cloud Server Cluster",
    provider: "CS Department",
    type: "computing",
    icon: <Server />,
    availability: "24/7 Access",
    capacity: 100,
    usedCapacity: 45,
    tags: ["High Performance", "Research"],
  },
  {
    id: 3,
    name: "Database Infrastructure",
    provider: "Tech Startup Hub",
    type: "software",
    icon: <Database />,
    availability: "Unlimited Access",
    capacity: 100,
    usedCapacity: 60,
    tags: ["Storage", "Enterprise"],
  },
  {
    id: 4,
    name: "Conference Hall",
    provider: "Business School",
    type: "venue",
    icon: <Users />,
    availability: "Weekends",
    capacity: 200,
    usedCapacity: 0,
    tags: ["Events", "Presentations"],
  },
]

const upcomingEvents = [
  {
    id: 1,
    name: "AI Hackathon",
    date: "March 25, 2025",
    time: "10:00 AM - 6:00 PM",
    resources: ["Lab with 80 computers"],
    participants: 45,
  },
  {
    id: 2,
    name: "Startup Networking",
    date: "March 28, 2025",
    time: "5:00 PM - 8:00 PM",
    resources: ["Conference Hall"],
    participants: 120,
  },
]

type RequestFormData = {
  resourceId: number
  purpose: string
  date: string
  startTime: string
  endTime: string
  participants: number
  additionalNotes: string
}

type AddResourceFormData = {
  name: string
  provider: string
  type: string
  availability: string
  capacity: number
  tags: string
}

export function ResourcesPanel() {
  const [resources, setResources] = useState<Resource[]>(initialResources)
  const [selectedResource, setSelectedResource] = useState<number | null>(null)
  const [showRequestForm, setShowRequestForm] = useState(false)
  const [showAddResourceForm, setShowAddResourceForm] = useState(false)
  const [requestFormData, setRequestFormData] = useState<RequestFormData>({
    resourceId: 0,
    purpose: "",
    date: "",
    startTime: "",
    endTime: "",
    participants: 0,
    additionalNotes: "",
  })
  const [addResourceFormData, setAddResourceFormData] = useState<AddResourceFormData>({
    name: "",
    provider: "",
    type: "hardware",
    availability: "",
    capacity: 0,
    tags: "",
  })
  const [requestStep, setRequestStep] = useState(1)
  const [showSuccessAlert, setShowSuccessAlert] = useState(false)
  const [showAddSuccessAlert, setShowAddSuccessAlert] = useState(false)
  const [requestedResources, setRequestedResources] = useState<{ id: number; status: string }[]>([])

  const handleRequestResource = (resourceId: number) => {
    setRequestFormData({
      ...requestFormData,
      resourceId,
    })
    setShowRequestForm(true)
    setRequestStep(1)
  }

  const handleRequestFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setRequestFormData({
      ...requestFormData,
      [name]: value,
    })
  }

  const handleRequestFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (requestStep < 3) {
      setRequestStep(requestStep + 1)
    } else {
      // Submit the form
      setRequestedResources([...requestedResources, { id: requestFormData.resourceId, status: "pending" }])
      setShowRequestForm(false)
      setShowSuccessAlert(true)
      setTimeout(() => {
        setShowSuccessAlert(false)
      }, 5000)
    }
  }

  const handleAddResourceFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setAddResourceFormData({
      ...addResourceFormData,
      [name]: value,
    })
  }

  const handleAddResourceTypeChange = (value: string) => {
    setAddResourceFormData({
      ...addResourceFormData,
      type: value,
    })
  }

  const handleAddResourceFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Create a new resource
    const newResource: Resource = {
      id: resources.length + 1,
      name: addResourceFormData.name,
      provider: addResourceFormData.provider,
      type: addResourceFormData.type,
      icon:
        addResourceFormData.type === "hardware" ? (
          <Laptop />
        ) : addResourceFormData.type === "computing" ? (
          <Server />
        ) : addResourceFormData.type === "software" ? (
          <Database />
        ) : (
          <Users />
        ),
      availability: addResourceFormData.availability,
      capacity: addResourceFormData.capacity,
      usedCapacity: 0,
      tags: addResourceFormData.tags.split(",").map((tag) => tag.trim()),
    }

    // Add the new resource to the list
    setResources([...resources, newResource])

    // Reset the form
    setAddResourceFormData({
      name: "",
      provider: "",
      type: "hardware",
      availability: "",
      capacity: 0,
      tags: "",
    })

    // Close the form and show success message
    setShowAddResourceForm(false)
    setShowAddSuccessAlert(true)
    setTimeout(() => {
      setShowAddSuccessAlert(false)
    }, 5000)
  }

  const getResourceById = (id: number) => {
    return resources.find((resource) => resource.id === id)
  }

  const isResourceRequested = (id: number) => {
    return requestedResources.some((r) => r.id === id)
  }

  const getResourceRequestStatus = (id: number) => {
    const request = requestedResources.find((r) => r.id === id)
    return request ? request.status : null
  }

  return (
    <div>
      <AnimatePresence>
        {showSuccessAlert && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-4"
          >
            <Alert className="bg-emerald-500/20 border-emerald-500/50 text-emerald-200">
              <Check className="h-4 w-4 text-emerald-400" />
              <AlertTitle>Success!</AlertTitle>
              <AlertDescription>
                Your resource request has been submitted successfully. You will be notified once it's approved.
              </AlertDescription>
            </Alert>
          </motion.div>
        )}

        {showAddSuccessAlert && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-4"
          >
            <Alert className="bg-cyan-500/20 border-cyan-500/50 text-cyan-200">
              <Check className="h-4 w-4 text-cyan-400" />
              <AlertTitle>Resource Added!</AlertTitle>
              <AlertDescription>
                The new resource has been added successfully and is now available for booking.
              </AlertDescription>
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Resource Request Form Modal */}
      <AnimatePresence>
        {showRequestForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-2xl"
            >
              <GlassmorphicCard className="border-cyan-500/30 shadow-[0_0_30px_rgba(6,182,212,0.2)]">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30">
                      {getResourceById(requestFormData.resourceId)?.icon || <Laptop />}
                    </div>
                    Request Resource
                  </h2>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowRequestForm(false)}
                    className="text-slate-400 hover:text-white"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                <div className="mb-6">
                  <div className="flex justify-between mb-2">
                    {[1, 2, 3].map((step) => (
                      <div
                        key={step}
                        className={`flex flex-col items-center ${requestStep >= step ? "text-cyan-400" : "text-slate-500"}`}
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
                            requestStep > step
                              ? "bg-cyan-500 text-white"
                              : requestStep === step
                                ? "bg-cyan-500/20 border border-cyan-500 text-cyan-400"
                                : "bg-slate-800 border border-slate-700 text-slate-500"
                          }`}
                        >
                          {requestStep > step ? <Check className="h-4 w-4" /> : step}
                        </div>
                        <span className="text-xs">{step === 1 ? "Details" : step === 2 ? "Schedule" : "Confirm"}</span>
                      </div>
                    ))}
                  </div>
                  <div className="w-full bg-slate-800 h-1 mt-2 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300"
                      style={{ width: `${(requestStep / 3) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <form onSubmit={handleRequestFormSubmit}>
                  {requestStep === 1 && (
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="resource" className="text-white mb-2 block">
                          Selected Resource
                        </Label>
                        <div className="p-3 rounded-lg bg-slate-800/80 border border-slate-700/50 text-white">
                          {getResourceById(requestFormData.resourceId)?.name || "Selected Resource"}
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="purpose" className="text-white mb-2 block">
                          Purpose of Request
                        </Label>
                        <Textarea
                          id="purpose"
                          name="purpose"
                          value={requestFormData.purpose}
                          onChange={handleRequestFormChange}
                          placeholder="Describe why you need this resource..."
                          className="bg-slate-800/50 border-slate-700 focus-visible:ring-cyan-500 min-h-[100px]"
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="participants" className="text-white mb-2 block">
                          Number of Participants
                        </Label>
                        <Input
                          id="participants"
                          name="participants"
                          type="number"
                          value={requestFormData.participants}
                          onChange={handleRequestFormChange}
                          placeholder="Enter number of participants"
                          className="bg-slate-800/50 border-slate-700 focus-visible:ring-cyan-500"
                          required
                        />
                      </div>
                    </div>
                  )}

                  {requestStep === 2 && (
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="date" className="text-white mb-2 block">
                          Date
                        </Label>
                        <Input
                          id="date"
                          name="date"
                          type="date"
                          value={requestFormData.date}
                          onChange={handleRequestFormChange}
                          className="bg-slate-800/50 border-slate-700 focus-visible:ring-cyan-500"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="startTime" className="text-white mb-2 block">
                            Start Time
                          </Label>
                          <Input
                            id="startTime"
                            name="startTime"
                            type="time"
                            value={requestFormData.startTime}
                            onChange={handleRequestFormChange}
                            className="bg-slate-800/50 border-slate-700 focus-visible:ring-cyan-500"
                            required
                          />
                        </div>

                        <div>
                          <Label htmlFor="endTime" className="text-white mb-2 block">
                            End Time
                          </Label>
                          <Input
                            id="endTime"
                            name="endTime"
                            type="time"
                            value={requestFormData.endTime}
                            onChange={handleRequestFormChange}
                            className="bg-slate-800/50 border-slate-700 focus-visible:ring-cyan-500"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="additionalNotes" className="text-white mb-2 block">
                          Additional Notes
                        </Label>
                        <Textarea
                          id="additionalNotes"
                          name="additionalNotes"
                          value={requestFormData.additionalNotes}
                          onChange={handleRequestFormChange}
                          placeholder="Any special requirements or notes..."
                          className="bg-slate-800/50 border-slate-700 focus-visible:ring-cyan-500"
                        />
                      </div>
                    </div>
                  )}

                  {requestStep === 3 && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-white mb-4">Confirm Your Request</h3>

                      <div className="space-y-3 bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Resource:</span>
                          <span className="text-white font-medium">
                            {getResourceById(requestFormData.resourceId)?.name}
                          </span>
                        </div>

                        <div className="flex justify-between">
                          <span className="text-slate-400">Date:</span>
                          <span className="text-white">{requestFormData.date}</span>
                        </div>

                        <div className="flex justify-between">
                          <span className="text-slate-400">Time:</span>
                          <span className="text-white">
                            {requestFormData.startTime} - {requestFormData.endTime}
                          </span>
                        </div>

                        <div className="flex justify-between">
                          <span className="text-slate-400">Participants:</span>
                          <span className="text-white">{requestFormData.participants}</span>
                        </div>

                        <div className="pt-2 border-t border-slate-700/50">
                          <span className="text-slate-400 block mb-1">Purpose:</span>
                          <p className="text-white text-sm">{requestFormData.purpose}</p>
                        </div>

                        {requestFormData.additionalNotes && (
                          <div className="pt-2 border-t border-slate-700/50">
                            <span className="text-slate-400 block mb-1">Additional Notes:</span>
                            <p className="text-white text-sm">{requestFormData.additionalNotes}</p>
                          </div>
                        )}
                      </div>

                      <div className="bg-amber-500/10 border border-amber-500/30 p-3 rounded-lg flex items-start gap-2">
                        <AlertCircle className="h-5 w-5 text-amber-400 mt-0.5" />
                        <p className="text-sm text-amber-200">
                          By submitting this request, you agree to the terms of use for this resource. Your request will
                          be reviewed by the resource provider.
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between mt-6">
                    {requestStep > 1 ? (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setRequestStep(requestStep - 1)}
                        className="border-slate-700 text-slate-300 hover:bg-slate-800"
                      >
                        Back
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setShowRequestForm(false)}
                        className="border-slate-700 text-slate-300 hover:bg-slate-800"
                      >
                        Cancel
                      </Button>
                    )}

                    <Button
                      type="submit"
                      className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
                    >
                      {requestStep < 3 ? "Continue" : "Submit Request"}
                    </Button>
                  </div>
                </form>
              </GlassmorphicCard>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Resource Form Modal */}
      <AnimatePresence>
        {showAddResourceForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-2xl"
            >
              <GlassmorphicCard className="border-purple-500/30 shadow-[0_0_30px_rgba(139,92,246,0.2)]">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500/20 to-indigo-500/20 border border-purple-500/30">
                      <Plus className="h-5 w-5 text-purple-400" />
                    </div>
                    Add New Resource
                  </h2>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowAddResourceForm(false)}
                    className="text-slate-400 hover:text-white"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                <form onSubmit={handleAddResourceFormSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name" className="text-white mb-2 block">
                      Resource Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={addResourceFormData.name}
                      onChange={handleAddResourceFormChange}
                      placeholder="Enter resource name"
                      className="bg-slate-800/50 border-slate-700 focus-visible:ring-purple-500"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="provider" className="text-white mb-2 block">
                      Provider
                    </Label>
                    <Input
                      id="provider"
                      name="provider"
                      value={addResourceFormData.provider}
                      onChange={handleAddResourceFormChange}
                      placeholder="Enter provider name"
                      className="bg-slate-800/50 border-slate-700 focus-visible:ring-purple-500"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="type" className="text-white mb-2 block">
                      Resource Type
                    </Label>
                    <Select value={addResourceFormData.type} onValueChange={handleAddResourceTypeChange}>
                      <SelectTrigger className="bg-slate-800/50 border-slate-700 focus:ring-purple-500">
                        <SelectValue placeholder="Select resource type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hardware">Hardware</SelectItem>
                        <SelectItem value="computing">Computing</SelectItem>
                        <SelectItem value="software">Software</SelectItem>
                        <SelectItem value="venue">Venue</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="availability" className="text-white mb-2 block">
                      Availability
                    </Label>
                    <Input
                      id="availability"
                      name="availability"
                      value={addResourceFormData.availability}
                      onChange={handleAddResourceFormChange}
                      placeholder="e.g., Weekdays 9-5pm"
                      className="bg-slate-800/50 border-slate-700 focus-visible:ring-purple-500"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="capacity" className="text-white mb-2 block">
                      Capacity
                    </Label>
                    <Input
                      id="capacity"
                      name="capacity"
                      type="number"
                      value={addResourceFormData.capacity}
                      onChange={handleAddResourceFormChange}
                      placeholder="Enter capacity"
                      className="bg-slate-800/50 border-slate-700 focus-visible:ring-purple-500"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="tags" className="text-white mb-2 block">
                      Tags (comma separated)
                    </Label>
                    <Input
                      id="tags"
                      name="tags"
                      value={addResourceFormData.tags}
                      onChange={handleAddResourceFormChange}
                      placeholder="e.g., Computing, Research, Workshop"
                      className="bg-slate-800/50 border-slate-700 focus-visible:ring-purple-500"
                      required
                    />
                  </div>

                  <div className="flex justify-end mt-6">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowAddResourceForm(false)}
                      className="mr-2 border-slate-700 text-slate-300 bg-slate-800 hover:text-white hover:bg-slate-800"
                    >
                      Cancel
                    </Button>

                    <Button
                      type="submit"
                      className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600"
                    >
                      Add Resource
                    </Button>
                  </div>
                </form>
              </GlassmorphicCard>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-white">Available Resources</h2>
            <Button
              onClick={() => setShowAddResourceForm(true)}
              className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Resource
            </Button>
          </div>

          <Tabs defaultValue="all" className="mb-4">
            <TabsList className="bg-slate-900/50">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="hardware">Hardware</TabsTrigger>
              <TabsTrigger value="computing">Computing</TabsTrigger>
              <TabsTrigger value="software">Software</TabsTrigger>
              <TabsTrigger value="venue">Venue</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {resources.map((resource) => (
                  <ResourceCard
                    key={resource.id}
                    resource={resource}
                    isSelected={selectedResource === resource.id}
                    isRequested={isResourceRequested(resource.id)}
                    requestStatus={getResourceRequestStatus(resource.id)}
                    onSelect={() => setSelectedResource(resource.id === selectedResource ? null : resource.id)}
                    onRequest={() => handleRequestResource(resource.id)}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="hardware" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {resources
                  .filter((r) => r.type === "hardware")
                  .map((resource) => (
                    <ResourceCard
                      key={resource.id}
                      resource={resource}
                      isSelected={selectedResource === resource.id}
                      isRequested={isResourceRequested(resource.id)}
                      requestStatus={getResourceRequestStatus(resource.id)}
                      onSelect={() => setSelectedResource(resource.id === selectedResource ? null : resource.id)}
                      onRequest={() => handleRequestResource(resource.id)}
                    />
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="computing" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {resources
                  .filter((r) => r.type === "computing")
                  .map((resource) => (
                    <ResourceCard
                      key={resource.id}
                      resource={resource}
                      isSelected={selectedResource === resource.id}
                      isRequested={isResourceRequested(resource.id)}
                      requestStatus={getResourceRequestStatus(resource.id)}
                      onSelect={() => setSelectedResource(resource.id === selectedResource ? null : resource.id)}
                      onRequest={() => handleRequestResource(resource.id)}
                    />
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="software" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {resources
                  .filter((r) => r.type === "software")
                  .map((resource) => (
                    <ResourceCard
                      key={resource.id}
                      resource={resource}
                      isSelected={selectedResource === resource.id}
                      isRequested={isResourceRequested(resource.id)}
                      requestStatus={getResourceRequestStatus(resource.id)}
                      onSelect={() => setSelectedResource(resource.id === selectedResource ? null : resource.id)}
                      onRequest={() => handleRequestResource(resource.id)}
                    />
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="venue" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {resources
                  .filter((r) => r.type === "venue")
                  .map((resource) => (
                    <ResourceCard
                      key={resource.id}
                      resource={resource}
                      isSelected={selectedResource === resource.id}
                      isRequested={isResourceRequested(resource.id)}
                      requestStatus={getResourceRequestStatus(resource.id)}
                      onSelect={() => setSelectedResource(resource.id === selectedResource ? null : resource.id)}
                      onRequest={() => handleRequestResource(resource.id)}
                    />
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <h2 className="text-xl font-bold text-white mb-4">Upcoming Events</h2>

          <div className="space-y-4">
            {upcomingEvents.map((event) => (
              <GlassmorphicCard key={event.id} className="border-indigo-500/30">
                <h3 className="font-medium text-white mb-2">{event.name}</h3>

                <div className="space-y-2 mb-3">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <Calendar className="h-3 w-3" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <Clock className="h-3 w-3" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <Users className="h-3 w-3" />
                    <span>{event.participants} participants</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {event.resources.map((resource) => (
                    <Badge key={resource} className="bg-indigo-500/20 text-indigo-300 border-indigo-500/30">
                      {resource}
                    </Badge>
                  ))}
                </div>
              </GlassmorphicCard>
            ))}
          </div>

          <GlassmorphicCard className="mt-4 border-emerald-500/30">
            <h3 className="font-medium text-white mb-3 flex items-center gap-2">
              <div className="p-1.5 rounded-md bg-emerald-500/20 text-emerald-400">
                <Check className="h-4 w-4" />
              </div>
              Your Resource Requests
            </h3>

            {requestedResources.length > 0 ? (
              <div className="space-y-3">
                {requestedResources.map((request) => {
                  const resource = getResourceById(request.id)
                  return resource ? (
                    <div
                      key={request.id}
                      className="flex items-center justify-between p-2 rounded-md bg-slate-800/50 border border-slate-700/50"
                    >
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 rounded-md bg-slate-700">{resource.icon}</div>
                        <span className="text-sm text-white">{resource.name}</span>
                      </div>
                      <Badge
                        className={
                          request.status === "approved"
                            ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                            : request.status === "rejected"
                              ? "bg-red-500/20 text-red-300 border-red-500/30"
                              : "bg-amber-500/20 text-amber-300 border-amber-500/30"
                        }
                      >
                        {request.status === "approved"
                          ? "Approved"
                          : request.status === "rejected"
                            ? "Rejected"
                            : "Pending"}
                      </Badge>
                    </div>
                  ) : null
                })}
              </div>
            ) : (
              <p className="text-sm text-slate-400">You haven't requested any resources yet.</p>
            )}
          </GlassmorphicCard>
        </div>
      </div>
    </div>
  )
}

interface ResourceCardProps {
  resource: Resource
  isSelected: boolean
  isRequested: boolean
  requestStatus: string | null
  onSelect: () => void
  onRequest: () => void
}

function ResourceCard({ resource, isSelected, isRequested, requestStatus, onSelect, onRequest }: ResourceCardProps) {
  return (
    <motion.div whileHover={{ y: -5, scale: 1.01 }} transition={{ duration: 0.2 }} onClick={onSelect}>
      <GlassmorphicCard
        className={`cursor-pointer transition-all duration-300 ${
          isSelected
            ? "border-cyan-500/50 bg-black shadow-[0_0_15px_rgba(6,182,212,0.3)]"
            : "border-slate-700/50 hover:border-slate-500/50"
        }`}
      >
        <div className="flex items-start gap-4">
          <div
            className={`p-3 rounded-lg ${
              resource.type === "hardware"
                ? "bg-emerald-500/20 text-emerald-400"
                : resource.type === "computing"
                  ? "bg-blue-500/20 text-blue-400"
                  : resource.type === "software"
                    ? "bg-purple-500/20 text-purple-400"
                    : "bg-amber-500/20 text-amber-400"
            }`}
          >
            {resource.icon}
          </div>

          <div className="flex-1">
            <h3 className="font-medium text-white mb-1">{resource.name}</h3>
            <p className="text-sm text-slate-400 mb-2">Provided by {resource.provider}</p>

            <div className="flex flex-wrap gap-2 mb-3">
              {resource.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="bg-slate-800/50 text-gray-200 text-xs">
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
              <Calendar className="h-3 w-3" />
              <span>{resource.availability}</span>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Capacity</span>
                <span className="text-white">
                  {resource.usedCapacity}/{resource.capacity}
                </span>
              </div>
              <Progress
                value={(resource.usedCapacity / resource.capacity) * 100}
                className="h-1.5 bg-slate-800"
                indicatorClassName={
                  resource.type === "hardware"
                    ? "bg-emerald-500"
                    : resource.type === "computing"
                      ? "bg-blue-500"
                      : resource.type === "software"
                        ? "bg-purple-500"
                        : "bg-amber-500"
                }
              />
            </div>
          </div>
        </div>

        {isSelected && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.3 }}
            className="mt-4 pt-4 border-t border-slate-700/50"
          >
            {isRequested ? (
              <div className="flex items-center justify-center p-2 rounded-md bg-slate-800/80 border border-slate-700/50">
                <Badge
                  className={
                    requestStatus === "approved"
                      ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                      : requestStatus === "rejected"
                        ? "bg-red-500/20 text-red-300 border-red-500/30"
                        : "bg-amber-500/20 text-amber-300 border-amber-500/30"
                  }
                >
                  {requestStatus === "approved"
                    ? "Request Approved"
                    : requestStatus === "rejected"
                      ? "Request Rejected"
                      : "Request Pending"}
                </Badge>
              </div>
            ) : (
              <Button
                onClick={(e) => {
                  e.stopPropagation()
                  onRequest()
                }}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
              >
                Request Resource
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </motion.div>
        )}
      </GlassmorphicCard>
    </motion.div>
  )
}

