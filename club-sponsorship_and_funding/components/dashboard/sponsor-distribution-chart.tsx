"use client"

import type { Sponsor } from "@/lib/types"
import { Chart, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"
import { motion } from "framer-motion"
import { getSponsorshipStats } from "@/lib/data-utils"

interface SponsorDistributionChartProps {
  sponsors: Sponsor[]
}

export function SponsorDistributionChart({ sponsors }: SponsorDistributionChartProps) {
  // Use the new data utility function to get sponsorship stats
  const stats = getSponsorshipStats()

  // Prepare data for the chart
  const data = [
    { name: "Gold", value: stats.byLevel.gold?.count || 0, color: "#FFD700", amount: stats.byLevel.gold?.amount || 0 },
    {
      name: "Silver",
      value: stats.byLevel.silver?.count || 0,
      color: "#C0C0C0",
      amount: stats.byLevel.silver?.amount || 0,
    },
    {
      name: "Bronze",
      value: stats.byLevel.bronze?.count || 0,
      color: "#CD7F32",
      amount: stats.byLevel.bronze?.amount || 0,
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="h-full w-full"
    >
      <ChartContainer className="h-full w-full">
        <Chart>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                labelLine={true}
                animationBegin={300}
                animationDuration={1500}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke="hsl(var(--background))" strokeWidth={2} />
                ))}
              </Pie>
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <ChartTooltip>
                        <ChartTooltipContent className="p-2">
                          <div className="flex flex-col gap-1">
                            <p className="text-sm font-medium">{payload[0]?.name}</p>
                            <p className="text-sm">Count: {payload[0]?.value}</p>
                            <p className="text-sm">
                              Percentage: {((payload[0]?.value / sponsors.length) * 100).toFixed(0)}%
                            </p>
                            <p className="text-sm font-medium pt-1 border-t">
                              Total Amount: ${payload[0]?.payload.amount.toLocaleString()}
                            </p>
                          </div>
                        </ChartTooltipContent>
                      </ChartTooltip>
                    )
                  }
                  return null
                }}
              />
              <Legend
                verticalAlign="bottom"
                align="center"
                formatter={(value) => <span className="text-sm">{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </Chart>
      </ChartContainer>
    </motion.div>
  )
}

