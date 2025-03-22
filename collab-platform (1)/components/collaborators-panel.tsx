"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Building2, Users, Briefcase, Star, MessageSquare, ArrowRight } from "lucide-react"
import { GlassmorphicCard } from "./ui/glassmorphic-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const collaborators = [
  {
    id: 1,
    name: "TechNova Startups",
    type: "Startup Incubator",
    logo: "/placeholder.svg?height=40&width=40",
    description: "A collective of early-stage tech startups looking for academic partnerships.",
    interests: ["AI Research", "Hackathons", "Mentorship"],
    members: 12,
    rating: 4.8,
    recentCollaborations: 8,
  },
  {
    id: 2,
    name: "CodeCraft Solutions",
    type: "Software Development",
    logo: "/placeholder.svg?height=40&width=40",
    description: "Specialized in building custom software solutions for businesses and research projects.",
    interests: ["Web Development", "Mobile Apps", "Cloud Infrastructure"],
    members: 24,
    rating: 4.6,
    recentCollaborations: 15,
  },
  {
    id: 3,
    name: "DataSphere Analytics",
    type: "Data Science Firm",
    logo: "/placeholder.svg?height=40&width=40",
    description: "Experts in data analysis, machine learning, and predictive modeling.",
    interests: ["Big Data", "Machine Learning", "Research Partnerships"],
    members: 18,
    rating: 4.9,
    recentCollaborations: 12,
  },
  {
    id: 4,
    name: "InnoVenture Capital",
    type: "Venture Capital",
    logo: "/placeholder.svg?height=40&width=40",
    description: "Funding innovative projects and startups with high growth potential.",
    interests: ["Funding", "Mentorship", "Networking Events"],
    members: 8,
    rating: 4.7,
    recentCollaborations: 20,
  },
]

const recentPartners = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "Project Lead",
    company: "TechNova Startups",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "Marcus Johnson",
    role: "CTO",
    company: "CodeCraft Solutions",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    name: "Aisha Patel",
    role: "Data Scientist",
    company: "DataSphere Analytics",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export function CollaboratorsPanel() {
  const [selectedCollaborator, setSelectedCollaborator] = useState<number | null>(null)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">Potential Collaborators</h2>
          <Button variant="outline" size="sm" className=" text-white border-slate-700 hover:text-white bg-slate-800 hover:bg-slate-900">
            Filter Results
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {collaborators.map((collaborator) => (
            <motion.div
              key={collaborator.id}
              whileHover={{ y: -3, scale: 1.01 }}
              transition={{ duration: 0.2 }}
              onClick={() => setSelectedCollaborator(collaborator.id === selectedCollaborator ? null : collaborator.id)}
            >
              <GlassmorphicCard
                className={`cursor-pointer transition-all duration-300 ${
                  selectedCollaborator === collaborator.id
                    ? "border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                    : "border-slate-700/50 hover:border-slate-500/50"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-slate-800 rounded-lg">
                    <Avatar className="h-12 w-12 rounded-md">
                      <AvatarImage className="bg-black" src={collaborator.logo} alt={collaborator.name} />
                      <AvatarFallback className="rounded-md bg-black text-slate-200">
                        {collaborator.name.substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-white">{collaborator.name}</h3>
                        <p className="text-sm text-slate-400 flex items-center gap-1 mb-2">
                          <Building2 className="h-3 w-3" />
                          {collaborator.type}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 text-amber-400">
                        <Star className="h-4 w-4 fill-amber-400" />
                        <span className="text-sm font-medium">{collaborator.rating}</span>
                      </div>
                    </div>

                    <p className="text-sm text-slate-300 mb-3">{collaborator.description}</p>

                    <div className="flex flex-wrap gap-2 mb-3">
                      {collaborator.interests.map((interest) => (
                        <Badge key={interest} variant="outline" className="bg-slate-800 text-gray-200 text-xs">
                          {interest}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center gap-4 text-xs text-slate-400">
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        <span>{collaborator.members} members</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Briefcase className="h-3 w-3" />
                        <span>{collaborator.recentCollaborations} collaborations</span>
                      </div>
                    </div>
                  </div>
                </div>

                {selectedCollaborator === collaborator.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 pt-4 border-t border-slate-700/50 flex gap-2"
                  >
                    <Button variant="outline" className="flex-1 border-cyan-500/50 text-cyan-400 hover:bg-cyan-950/30">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Contact
                    </Button>
                    <Button className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600">
                      Propose Collaboration
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </motion.div>
                )}
              </GlassmorphicCard>
            </motion.div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold text-white mb-4">Recent Partners</h2>

        <GlassmorphicCard className="border-indigo-500/30 mb-4">
          <h3 className="font-medium text-white mb-3">Key Contacts</h3>

          <div className="space-y-3">
            {recentPartners.map((partner) => (
              <div key={partner.id} className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={partner.avatar} alt={partner.name} />
                  <AvatarFallback className="bg-slate-700 text-slate-200">
                    {partner.name.substring(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium text-white">{partner.name}</p>
                  <p className="text-xs text-slate-400">
                    {partner.role} at {partner.company}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </GlassmorphicCard>

        <GlassmorphicCard className="border-purple-500/30">
          <h3 className="font-medium text-white mb-3">Collaboration Stats</h3>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-400">Active Partnerships</span>
              <span className="text-sm font-medium text-white">12</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-400">Pending Proposals</span>
              <span className="text-sm font-medium text-white">5</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-400">Completed Projects</span>
              <span className="text-sm font-medium text-white">28</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-400">Success Rate</span>
              <span className="text-sm font-medium text-green-400">92%</span>
            </div>
          </div>
        </GlassmorphicCard>
      </div>
    </div>
  )
}

