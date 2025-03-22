"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Users, BarChart3, Cpu, Zap, BrainCircuit, Search } from "lucide-react"
import { ResourcesPanel } from "./resources-panel"
import { CollaboratorsPanel } from "./collaborators-panel"
import { AnalyticsPanel } from "./analytics-panel"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AIAssistant } from "./ai-assistant"

export function CollaborationDashboard() {
  const [activeTab, setActiveTab] = useState("resources")
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false)

  const renderPanel = () => {
    switch (activeTab) {
      case "resources":
        return <ResourcesPanel />
      case "collaborators":
        return <CollaboratorsPanel />
      case "analytics":
        return <AnalyticsPanel />
      default:
        return <ResourcesPanel />
    }
  }

  return (
    <div className="container mx-auto p-4 text-white">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="flex items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mr-2"
          >
            <Zap className="h-8 w-8 text-cyan-400" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text"
          >
            NexusCollab
          </motion.h1>
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Input
              placeholder="Search resources, partners..."
              className="bg-slate-900/50 border-slate-700 pl-10 h-10 w-full text-sm"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
          </div>

       
        </div>
      </header>

      {/* Main Navigation */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <NavButton
          icon={<Cpu />}
          label="Resources"
          active={activeTab === "resources"}
          onClick={() => setActiveTab("resources")}
        />
        <NavButton
          icon={<Users />}
          label="Collaborators"
          active={activeTab === "collaborators"}
          onClick={() => setActiveTab("collaborators")}
        />
        <NavButton
          icon={<BarChart3 />}
          label="Analytics"
          active={activeTab === "analytics"}
          onClick={() => setActiveTab("analytics")}
        />
      </div>

      {/* Main Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="min-h-[calc(100vh-220px)]"
      >
        {renderPanel()}
      </motion.div>

      {/* AI Assistant Modal */}
      {aiAssistantOpen && <AIAssistant onClose={() => setAiAssistantOpen(false)} />}
    </div>
  )
}

interface NavButtonProps {
  icon: React.ReactNode
  label: string
  active: boolean
  onClick: () => void
}

function NavButton({ icon, label, active, onClick }: NavButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`flex items-center justify-center gap-2 p-3 rounded-lg transition-all duration-300 ${
        active
          ? "bg-gradient-to-r from-red-500/20 to-blue-500/20 border-b border-white/10 backdrop-blur-md shadow-[0_0_15px_rgba(6,182,212,0.3)]"
          : "bg-slate-900/50 border border-slate-800 hover:border-slate-700"
      }`}
    >
      <div className={`${active ? "text-cyan-400" : "text-slate-400"}`}>{icon}</div>
      <span className={`${active ? "text-white" : "text-slate-300"}`}>{label}</span>
    </motion.button>
  )
}

