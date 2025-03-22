"use client"

import type React from "react"

import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset } from "@/components/ui/sidebar"
import { useEffect } from "react"
import { initializeData } from "@/lib/data-utils"

export function AppShell({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize data on first load
    initializeData()
  }, [])

  return (
    <div className="flex min-h-screen">
      <AppSidebar />
      <SidebarInset className="flex-1">
        <div className="container mx-auto p-4 md:p-6">{children}</div>
      </SidebarInset>
    </div>
  )
}

