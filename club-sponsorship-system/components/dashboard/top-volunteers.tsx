import type { Volunteer } from "@/lib/types"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"

interface TopVolunteersProps {
  volunteers: Volunteer[]
}

export function TopVolunteers({ volunteers }: TopVolunteersProps) {
  // Sort volunteers by total amount brought and take top 5
  const topVolunteers = [...volunteers].sort((a, b) => b.totalAmountAcquired - a.totalAmountAcquired).slice(0, 5)

  // Find the maximum amount for scaling the progress bars
  const maxAmount = Math.max(...topVolunteers.map((v) => v.totalAmountAcquired), 1)

  return (
    <div className="space-y-4">
      {topVolunteers.length === 0 ? (
        <p className="text-center text-muted-foreground">No volunteers found</p>
      ) : (
        <div className="space-y-4">
          {topVolunteers.map((volunteer) => (
            <div key={volunteer.id} className="space-y-2">
              <div className="flex items-center">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={volunteer.avatar || "/placeholder.svg?height=32&width=32"} />
                  <AvatarFallback>{volunteer.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">{volunteer.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {volunteer.sponsorsAcquired} sponsors · ${volunteer.totalAmountAcquired}
                  </p>
                </div>
              </div>
              <Progress value={(volunteer.totalAmountAcquired / maxAmount) * 100} className="h-2" />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

