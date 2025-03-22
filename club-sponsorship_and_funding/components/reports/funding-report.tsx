"use client"

import type { Fund } from "@/lib/types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Chart, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Cell, Pie, PieChart } from "recharts"

interface FundingReportProps {
  funds: Fund[]
}

export function FundingReport({ funds }: FundingReportProps) {
  // Calculate total income
  const totalIncome = funds.filter((fund) => fund.type === "income").reduce((total, fund) => total + fund.amount, 0)

  // Calculate total expenses
  const totalExpenses = funds.filter((fund) => fund.type === "expense").reduce((total, fund) => total + fund.amount, 0)

  // Calculate net balance
  const netBalance = totalIncome - totalExpenses

  // Group expenses by category
  const expensesByCategory = funds
    .filter((fund) => fund.type === "expense")
    .reduce(
      (acc, fund) => {
        acc[fund.category] = (acc[fund.category] || 0) + fund.amount
        return acc
      },
      {} as Record<string, number>,
    )

  // Group income by category
  const incomeByCategory = funds
    .filter((fund) => fund.type === "income")
    .reduce(
      (acc, fund) => {
        acc[fund.category] = (acc[fund.category] || 0) + fund.amount
        return acc
      },
      {} as Record<string, number>,
    )

  // Prepare data for the expense pie chart
  const expenseData = Object.entries(expensesByCategory).map(([category, amount]) => ({
    name: category,
    value: amount,
  }))

  // Process data for the monthly chart
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  // Initialize data structure with all months
  const monthlyData = monthNames.map((month) => ({
    name: month,
    income: 0,
    expense: 0,
  }))

  // Populate with actual data
  funds.forEach((fund) => {
    const date = new Date(fund.date)
    const monthIndex = date.getMonth()

    if (fund.type === "income") {
      monthlyData[monthIndex].income += fund.amount
    } else {
      monthlyData[monthIndex].expense += fund.amount
    }
  })

  // Colors for the pie chart
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d"]

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Income</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">${totalIncome.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              From {funds.filter((fund) => fund.type === "income").length} transactions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600 dark:text-red-400">${totalExpenses.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              From {funds.filter((fund) => fund.type === "expense").length} transactions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Net Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className={`text-2xl font-bold ${netBalance >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
            >
              ${netBalance.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">{netBalance >= 0 ? "Surplus" : "Deficit"}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Overview</CardTitle>
            <CardDescription>Income vs. expenses by month</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ChartContainer className="h-full w-full">
              <Chart>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis tickFormatter={(value) => `$${value}`} width={80} />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <ChartTooltip>
                              <ChartTooltipContent className="p-2">
                                <div className="flex flex-col gap-1">
                                  <p className="text-sm font-medium">{payload[0]?.payload.name}</p>
                                  <div className="flex items-center gap-2">
                                    <div className="h-2 w-2 rounded-full bg-primary" />
                                    <p className="text-sm">Income: ${payload[0]?.value}</p>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <div className="h-2 w-2 rounded-full bg-destructive" />
                                    <p className="text-sm">Expense: ${payload[1]?.value}</p>
                                  </div>
                                </div>
                              </ChartTooltipContent>
                            </ChartTooltip>
                          )
                        }
                        return null
                      }}
                    />
                    <Legend />
                    <Bar dataKey="income" name="Income" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="expense" name="Expense" fill="hsl(var(--destructive))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </Chart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Expense Breakdown</CardTitle>
            <CardDescription>Expenses by category</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ChartContainer className="h-full w-full">
              <Chart>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={expenseData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {expenseData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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
                                  <p className="text-sm">Amount: ${payload[0]?.value}</p>
                                  <p className="text-sm">
                                    Percentage: {((payload[0]?.value / totalExpenses) * 100).toFixed(0)}%
                                  </p>
                                </div>
                              </ChartTooltipContent>
                            </ChartTooltip>
                          )
                        }
                        return null
                      }}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </Chart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

