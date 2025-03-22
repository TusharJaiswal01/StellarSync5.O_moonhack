import type { Sponsor } from "@/lib/types"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface UpcomingRenewalsProps {
  sponsors: Sponsor[]
}

export function UpcomingRenewals({ sponsors }: UpcomingRenewalsProps) {
  // Get current date
  const currentDate = new Date()

  // Filter sponsors that are due for renewal in the next 30 days
  const upcomingRenewals = sponsors
    .filter((sponsor) => {
      const renewalDate = new Date(sponsor.renewalDate)
      const daysDifference = Math.ceil((renewalDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24))
      return daysDifference >= 0 && daysDifference <= 30
    })
    .sort((a, b) => new Date(a.renewalDate).getTime() - new Date(b.renewalDate).getTime())
    .slice(0, 5)

  return (
    <div className="space-y-4">
      {upcomingRenewals.length === 0 ? (
        <p className="text-center text-muted-foreground">No upcoming renewals</p>
      ) : (
        <div className="space-y-4">
          {upcomingRenewals.map((sponsor) => {
            const renewalDate = new Date(sponsor.renewalDate)
            const daysDifference = Math.ceil((renewalDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24))

            return (
              <div key={sponsor.id} className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">{sponsor.name}</p>
                  <p className="text-xs text-muted-foreground">
                    Renewal: {new Date(sponsor.renewalDate).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge
                    className={cn(
                      sponsor.level === "gold" && "gold-sponsor",
                      sponsor.level === "silver" && "silver-sponsor",
                      sponsor.level === "bronze" && "bronze-sponsor",
                    )}
                  >
                    {sponsor.level.charAt(0).toUpperCase() + sponsor.level.slice(1)}
                  </Badge>
                  <Badge variant={daysDifference <= 7 ? "destructive" : "outline"}>{daysDifference} days</Badge>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

