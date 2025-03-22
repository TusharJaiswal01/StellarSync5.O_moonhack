import type React from "react"
import { cn } from "@/lib/utils"

interface GlassmorphicCardProps extends React.HTMLAttributes<HTMLDivElement> {}

export function GlassmorphicCard({ className, ...props }: GlassmorphicCardProps) {
  return (
    <div
      className={cn("rounded-lg border border-slate-700/50 bg-slate-900/60 backdrop-blur-md p-4 shadow-lg", className)}
      {...props}
    />
  )
}

