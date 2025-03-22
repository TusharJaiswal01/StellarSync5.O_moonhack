import type { Fund } from "@/lib/types"
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface RecentTransactionsProps {
  funds: Fund[]
}

export function RecentTransactions({ funds }: RecentTransactionsProps) {
  // Sort funds by date (newest first) and take the first 5
  const recentFunds = [...funds].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5)

  return (
    <div className="space-y-4">
      {recentFunds.length === 0 ? (
        <p className="text-center text-muted-foreground">No transactions found</p>
      ) : (
        <div className="space-y-4">
          {recentFunds.map((fund) => (
            <div key={fund.id} className="flex items-center">
              <div
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-full",
                  fund.type === "income"
                    ? "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400"
                    : "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400",
                )}
              >
                {fund.type === "income" ? <ArrowUpIcon className="h-4 w-4" /> : <ArrowDownIcon className="h-4 w-4" />}
              </div>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">{fund.description}</p>
                <p className="text-xs text-muted-foreground">{new Date(fund.date).toLocaleDateString()}</p>
              </div>
              <div className="ml-auto font-medium">
                <span
                  className={cn(
                    fund.type === "income" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400",
                  )}
                >
                  {fund.type === "income" ? "+" : "-"}${fund.amount}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

