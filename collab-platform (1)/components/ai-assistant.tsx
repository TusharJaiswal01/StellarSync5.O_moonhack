"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Send, BrainCircuit, Sparkles, Loader2 } from "lucide-react"
import { GlassmorphicCard } from "./ui/glassmorphic-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type Message = {
  id: number
  content: string
  isAI: boolean
  timestamp: string
}

const initialMessages: Message[] = [
  {
    id: 1,
    content:
      "Hello! I'm your AI assistant for NexusCollab. I can help you find resources, suggest potential collaborators, and assist with event planning. How can I help you today?",
    isAI: true,
    timestamp: "Just now",
  },
]

interface AIAssistantProps {
  onClose: () => void
}

export function AIAssistant({ onClose }: AIAssistantProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (input.trim() === "") return

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      content: input,
      isAI: false,
      timestamp: "Just now",
    }

    setMessages([...messages, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate AI response after a delay
    setTimeout(() => {
      let response = ""

      if (input.toLowerCase().includes("resource") || input.toLowerCase().includes("lab")) {
        response =
          "I found several resources that might be suitable for your needs. The Engineering College has a lab with 80 computers available on weekdays from 6-9pm. Would you like me to reserve this for your event?"
      } else if (input.toLowerCase().includes("collaborator") || input.toLowerCase().includes("partner")) {
        response =
          "Based on your project description, I recommend reaching out to TechNova Startups. They have expertise in AI research and have collaborated on 8 similar projects recently. Would you like me to initiate contact?"
      } else if (input.toLowerCase().includes("event") || input.toLowerCase().includes("hackathon")) {
        response =
          "I can help you plan your event. Based on available resources, I suggest scheduling your hackathon on March 25, 2025. The lab with 80 computers is available, and we can accommodate up to 140 participants. Shall I create a draft event plan?"
      } else {
        response =
          "I understand you're looking for assistance. Could you provide more details about what you need? I can help with finding resources, suggesting collaborators, or planning events."
      }

      const aiMessage: Message = {
        id: messages.length + 2,
        content: response,
        isAI: true,
        timestamp: "Just now",
      }

      setMessages((prev) => [...prev, aiMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="w-full max-w-2xl"
        >
          <GlassmorphicCard className="border-cyan-500/30 shadow-[0_0_30px_rgba(6,182,212,0.2)]">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30">
                  <BrainCircuit className="h-5 w-5 text-cyan-400" />
                </div>
                <h2 className="text-lg font-bold text-white">AI Assistant</h2>
              </div>
              <Button variant="ghost" size="icon" onClick={onClose} className="text-slate-400 hover:text-white">
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="h-96 overflow-y-auto mb-4 space-y-4 pr-2">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.isAI ? "justify-start" : "justify-end"}`}>
                  <div className={`flex gap-3 max-w-[80%] ${message.isAI ? "" : "flex-row-reverse"}`}>
                    {message.isAI && (
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder.svg?height=40&width=40" alt="AI Assistant" />
                        <AvatarFallback className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white">
                          AI
                        </AvatarFallback>
                      </Avatar>
                    )}

                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        {message.isAI && (
                          <div className="flex items-center">
                            <span className="text-sm font-medium text-white">AI Assistant</span>
                            <Sparkles className="h-3 w-3 text-amber-400 ml-1" />
                          </div>
                        )}
                        <span className="text-xs text-slate-400">{message.timestamp}</span>
                      </div>

                      <div
                        className={`rounded-lg p-3 ${
                          message.isAI
                            ? "bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 text-white"
                            : "bg-slate-800/80 border border-slate-700/50 text-slate-200"
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex gap-3 max-w-[80%]">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg?height=40&width=40" alt="AI Assistant" />
                      <AvatarFallback className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white">
                        AI
                      </AvatarFallback>
                    </Avatar>

                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <div className="flex items-center">
                          <span className="text-sm font-medium text-white">AI Assistant</span>
                          <Sparkles className="h-3 w-3 text-amber-400 ml-1" />
                        </div>
                        <span className="text-xs text-slate-400">Just now</span>
                      </div>

                      <div className="rounded-lg p-3 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 text-white">
                        <div className="flex items-center gap-2">
                          <Loader2 className="h-4 w-4 text-cyan-400 animate-spin" />
                          <span className="text-sm">Thinking...</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            <div className="flex items-center gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask me anything..."
                className="flex-1 bg-slate-800/50 border-slate-700 focus-visible:ring-cyan-500"
              />
              <Button
                onClick={handleSendMessage}
                disabled={input.trim() === "" || isTyping}
                className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600"
              >
                {isTyping ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Send
                  </>
                )}
              </Button>
            </div>
          </GlassmorphicCard>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

