"use client"

import type { Fund } from "@/lib/types"
import { Chart, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"
import { motion } from "framer-motion"

interface FundAllocationChartProps {
  funds: Fund[]
}

export function FundAllocationChart({ funds }: FundAllocationChartProps) {
  // Filter only expense funds
  const expenseFunds = funds.filter((fund) => fund.type === "expense")

  // Group expenses by category
  const expensesByCategory = expenseFunds.reduce(
    (acc, fund) => {
      acc[fund.category] = (acc[fund.category] || 0) + fund.amount
      return acc
    },
    {} as Record<string, number>,
  )

  // Prepare data for the chart
  const data = Object.entries(expensesByCategory).map(([category, amount]) => ({
    name: category.charAt(0).toUpperCase() + category.slice(1),
    value: amount,
  }))

  // Calculate total expenses
  const totalExpenses = expenseFunds.reduce((sum, fund) => sum + fund.amount, 0)

  // Colors for different categories
  const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#06b6d4"]

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
              <defs>
                {COLORS.map((color, index) => (
                  <linearGradient key={`gradient-${index}`} id={`colorGradient${index}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={color} stopOpacity={0.8} />
                    <stop offset="100%" stopColor={color} stopOpacity={0.5} />
                  </linearGradient>
                ))}
              </defs>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                labelLine={true}
                animationBegin={300}
                animationDuration={1500}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={`url(#colorGradient${index % COLORS.length})`}
                    stroke="hsl(var(--background))"
                    strokeWidth={2}
                  />
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
                            <p className="text-sm">Amount: ${payload[0]?.value.toLocaleString()}</p>
                            <p className="text-sm">
                              Percentage: {((payload[0]?.value / totalExpenses) * 100).toFixed(1)}%
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

