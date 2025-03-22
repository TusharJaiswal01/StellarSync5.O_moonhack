"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  BarChart,
  LineChart,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
  Users,
  Building2,
  Laptop,
  Zap,
} from "lucide-react"
import { GlassmorphicCard } from "./ui/glassmorphic-card"
import { Button } from "@/components/ui/button"
import {
  Chart,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendItem,
} from "@/components/ui/chart"
import {
  Area,
  AreaChart,
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart as RechartsPieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  RadialBarChart,
  RadialBar,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts"

const collaborationData = [
  { month: "Jan", college: 4, startup: 6 },
  { month: "Feb", college: 7, startup: 8 },
  { month: "Mar", college: 10, startup: 12 },
  { month: "Apr", college: 8, startup: 14 },
  { month: "May", college: 12, startup: 16 },
  { month: "Jun", college: 15, startup: 18 },
  { month: "Jul", college: 18, startup: 20 },
  { month: "Aug", college: 20, startup: 22 },
  { month: "Sep", college: 22, startup: 24 },
  { month: "Oct", college: 25, startup: 26 },
  { month: "Nov", college: 28, startup: 28 },
  { month: "Dec", college: 30, startup: 32 },
]

const resourceUtilizationData = [
  { name: "Computing Labs", value: 65, color: "#06b6d4" },
  { name: "Conference Rooms", value: 45, color: "#8b5cf6" },
  { name: "Equipment", value: 30, color: "#10b981" },
  { name: "Software Licenses", value: 80, color: "#f59e0b" },
]

const kpiData = [
  {
    title: "Total Collaborations",
    value: 156,
    change: 12.8,
    trend: "up",
    icon: <Users className="h-5 w-5" />,
    color: "from-cyan-500 to-blue-500",
  },
  {
    title: "Active Partners",
    value: 42,
    change: 8.3,
    trend: "up",
    icon: <Building2 className="h-5 w-5" />,
    color: "from-purple-500 to-indigo-500",
  },
  {
    title: "Resource Utilization",
    value: "68%",
    change: -2.5,
    trend: "down",
    icon: <Laptop className="h-5 w-5" />,
    color: "from-emerald-500 to-teal-500",
  },
  {
    title: "Success Rate",
    value: "92%",
    change: 3.7,
    trend: "up",
    icon: <Zap className="h-5 w-5" />,
    color: "from-amber-500 to-orange-500",
  },
]

const partnerTypeData = [
  { name: "Startups", value: 45, fill: "#f472b6" },
  { name: "Academic", value: 30, fill: "#60a5fa" },
  { name: "Corporate", value: 15, fill: "#4ade80" },
  { name: "Non-profit", value: 10, fill: "#facc15" },
]

const eventSuccessData = [
  {
    name: "Hackathons",
    attendance: 95,
    satisfaction: 92,
    impact: 88,
    fill: "#f472b6",
  },
  {
    name: "Workshops",
    attendance: 85,
    satisfaction: 90,
    impact: 75,
    fill: "#60a5fa",
  },
  {
    name: "Networking",
    attendance: 70,
    satisfaction: 85,
    impact: 80,
    fill: "#4ade80",
  },
  {
    name: "Conferences",
    attendance: 90,
    satisfaction: 80,
    impact: 85,
    fill: "#facc15",
  },
]

const resourceGrowthData = [
  { name: "Q1", hardware: 20, software: 30, venue: 10 },
  { name: "Q2", hardware: 30, software: 45, venue: 15 },
  { name: "Q3", hardware: 45, software: 60, venue: 25 },
  { name: "Q4", hardware: 60, software: 75, venue: 40 },
]

export function AnalyticsPanel() {
  const [timeRange, setTimeRange] = useState("yearly")
  const [chartType, setChartType] = useState("area")

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-xl font-bold text-white">Analytics Dashboard</h2>
        <div className="flex flex-wrap items-center gap-2">
          <div className="bg-slate-900/70 rounded-lg p-1 mr-2">
            <Button
              variant="ghost"
              size="sm"
              className={`${chartType === "area" ? "bg-slate-800 text-white" : "text-slate-400"}`}
              onClick={() => setChartType("area")}
            >
              <LineChart className="h-44 w-44 mr-1" />
              Area
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={`${chartType === "bar" ? "bg-slate-800 text-white" : "text-slate-400"}`}
              onClick={() => setChartType("bar")}
            >
              <BarChart className="h-4 w-4 mr-1" />
              Bar
            </Button>
          </div>

          <div className="bg-slate-900/70 rounded-lg p-1">
            <Button
              variant="ghost"
              size="sm"
              className={`${timeRange === "monthly" ? "bg-slate-800 text-white" : "text-slate-400"}`}
              onClick={() => setTimeRange("monthly")}
            >
              Monthly
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={`${timeRange === "quarterly" ? "bg-slate-800 text-white" : "text-slate-400"}`}
              onClick={() => setTimeRange("quarterly")}
            >
              Quarterly
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={`${timeRange === "yearly" ? "bg-slate-800 text-white" : "text-slate-400"}`}
              onClick={() => setTimeRange("yearly")}
            >
              Yearly
            </Button>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiData.map((kpi, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <GlassmorphicCard className="border-slate-700/50">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-slate-400 mb-1">{kpi.title}</p>
                  <h3 className="text-2xl font-bold text-white">{kpi.value}</h3>
                </div>
                <div className={`p-2 rounded-lg bg-gradient-to-br ${kpi.color} bg-opacity-20`}>{kpi.icon}</div>
              </div>

              <div className="mt-2 flex items-center">
                {kpi.trend === "up" ? (
                  <ArrowUpRight className="h-4 w-4 text-emerald-400 mr-1" />
                ) : (
                  <ArrowDownRight className="h-4 w-4 text-red-400 mr-1" />
                )}
                <span className={`text-sm font-medium ${kpi.trend === "up" ? "text-emerald-400" : "text-red-400"}`}>
                  {kpi.change}%
                </span>
                <span className="text-xs text-slate-500 ml-1">vs last period</span>
              </div>
            </GlassmorphicCard>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassmorphicCard className="border-slate-700/50">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium text-white flex items-center gap-2">
              <BarChart className="h-4 w-4 text-cyan-400" />
              Collaboration Growth
            </h3>
          </div>

          <div className="h-[150px]">
            <ChartContainer>
              <Chart >
                <ResponsiveContainer className={""} width="100%" height="100%">
                  {chartType === "area" ? (
                    <AreaChart data={collaborationData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorCollege" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorStartup" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#f472b6" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#f472b6" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis
                        dataKey="month"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "#94a3b8", fontSize: 12 }}
                      />
                      <YAxis axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 12 }} />
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
                      <Tooltip
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            return (
                              <ChartTooltip>
                                <ChartTooltipContent>
                                  <div className="flex flex-col gap-2">
                                    <p className="text-sm font-medium text-white">{payload[0]?.payload.month}</p>
                                    <div className="flex items-center gap-2">
                                      <div className="h-3 w-3 rounded-full bg-cyan-400" />
                                      <p className="text-sm text-slate-300">College: {payload[0]?.value}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <div className="h-3 w-3 rounded-full bg-pink-400" />
                                      <p className="text-sm text-slate-300">Startup: {payload[1]?.value}</p>
                                    </div>
                                  </div>
                                </ChartTooltipContent>
                              </ChartTooltip>
                            )
                          }
                          return null
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="college"
                        stroke="#06b6d4"
                        fillOpacity={1}
                        fill="url(#colorCollege)"
                      />
                      <Area
                        type="monotone"
                        dataKey="startup"
                        stroke="#f472b6"
                        fillOpacity={1}
                        fill="url(#colorStartup)"
                      />
                    </AreaChart>
                  ) : (
                    <RechartsBarChart data={collaborationData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                      <XAxis
                        dataKey="month"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "#94a3b8", fontSize: 12 }}
                      />
                      <YAxis axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 12 }} />
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
                      <Tooltip
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            return (
                              <ChartTooltip>
                                <ChartTooltipContent>
                                  <div className="flex flex-col gap-2">
                                    <p className="text-sm font-medium text-white">{payload[0]?.payload.month}</p>
                                    <div className="flex items-center gap-2">
                                      <div className="h-3 w-3 rounded-full bg-cyan-400" />
                                      <p className="text-sm text-slate-300">College: {payload[0]?.value}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <div className="h-3 w-3 rounded-full bg-pink-400" />
                                      <p className="text-sm text-slate-300">Startup: {payload[1]?.value}</p>
                                    </div>
                                  </div>
                                </ChartTooltipContent>
                              </ChartTooltip>
                            )
                          }
                          return null
                        }}
                      />
                      <Bar dataKey="college" fill="#06b6d4" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="startup" fill="#f472b6" radius={[4, 4, 0, 0]} />
                    </RechartsBarChart>
                  )}
                </ResponsiveContainer>
              </Chart>
              <ChartLegend className="mt-4 justify-center">
                <ChartLegendItem color="#06b6d4" label="College Initiatives" />
                <ChartLegendItem color="#f472b6" label="Startup Projects" />
              </ChartLegend>
            </ChartContainer>
          </div>
        </GlassmorphicCard>

        <GlassmorphicCard className="border-slate-700/50">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium text-white flex items-center gap-2">
              <PieChart className="h-4 w-4 text-purple-400" />
              Resource Utilization
            </h3>
          </div>

          <div className="h-80">
            <ChartContainer>
              <Chart>
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <defs>
                      {resourceUtilizationData.map((entry, index) => (
                        <linearGradient
                          key={`gradient-${index}`}
                          id={`colorGradient-${index}`}
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop offset="0%" stopColor={entry.color} stopOpacity={1} />
                          <stop offset="100%" stopColor={entry.color} stopOpacity={0.6} />
                        </linearGradient>
                      ))}
                    </defs>
                    <Pie
                      data={resourceUtilizationData}
                      cx="50%"
                      cy="50%"
                      innerRadius={80}
                      outerRadius={120}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {resourceUtilizationData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={`url(#colorGradient-${index})`}
                          stroke={entry.color}
                          strokeWidth={2}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <ChartTooltip>
                              <ChartTooltipContent>
                                <div className="flex flex-col gap-2">
                                  <div className="flex items-center gap-2">
                                    <div
                                      className="h-3 w-3 rounded-full"
                                      style={{ backgroundColor: payload[0]?.payload.color }}
                                    />
                                    <p className="text-sm font-medium text-white">
                                      {payload[0]?.name}: {payload[0]?.value}%
                                    </p>
                                  </div>
                                </div>
                              </ChartTooltipContent>
                            </ChartTooltip>
                          )
                        }
                        return null
                      }}
                    />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </Chart>
              <ChartLegend className="mt-4 justify-center">
                {resourceUtilizationData.map((item, index) => (
                  <ChartLegendItem key={index} color={item.color} label={item.name} />
                ))}
              </ChartLegend>
            </ChartContainer>
          </div>
        </GlassmorphicCard>

        <GlassmorphicCard className="border-slate-700/50">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium text-white flex items-center gap-2">
              <Users className="h-4 w-4 text-pink-400" />
              Partner Distribution
            </h3>
          </div>

          <div className="h-80">
            <ChartContainer>
              <Chart>
                <ResponsiveContainer width="100%" height="100%">
                  <RadialBarChart
                    cx="50%"
                    cy="50%"
                    innerRadius="20%"
                    outerRadius="80%"
                    barSize={20}
                    data={partnerTypeData}
                  >
                    <RadialBar
                      background
                      dataKey="value"
                      cornerRadius={10}
                      label={{ position: "insideStart", fill: "#fff", fontSize: 12 }}
                    />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <ChartTooltip>
                              <ChartTooltipContent>
                                <div className="flex flex-col gap-2">
                                  <div className="flex items-center gap-2">
                                    <div
                                      className="h-3 w-3 rounded-full"
                                      style={{ backgroundColor: payload[0]?.payload.fill }}
                                    />
                                    <p className="text-sm font-medium text-white">
                                      {payload[0]?.payload.name}: {payload[0]?.value}%
                                    </p>
                                  </div>
                                </div>
                              </ChartTooltipContent>
                            </ChartTooltip>
                          )
                        }
                        return null
                      }}
                    />
                  </RadialBarChart>
                </ResponsiveContainer>
              </Chart>
              <ChartLegend className="mt-4 justify-center">
                {partnerTypeData.map((item, index) => (
                  <ChartLegendItem key={index} color={item.fill} label={item.name} />
                ))}
              </ChartLegend>
            </ChartContainer>
          </div>
        </GlassmorphicCard>

        <GlassmorphicCard className="border-slate-700/50">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium text-white flex items-center gap-2">
              <BarChart className="h-4 w-4 text-emerald-400" />
              Event Success Metrics
            </h3>
          </div>

          <div className="h-80">
            <ChartContainer>
              <Chart>
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={eventSuccessData}>
                    <PolarGrid stroke="#334155" />
                    <PolarAngleAxis dataKey="name" tick={{ fill: "#94a3b8", fontSize: 12 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: "#94a3b8", fontSize: 10 }} />
                    <Radar name="Attendance" dataKey="attendance" stroke="#f472b6" fill="#f472b6" fillOpacity={0.5} />
                    <Radar
                      name="Satisfaction"
                      dataKey="satisfaction"
                      stroke="#60a5fa"
                      fill="#60a5fa"
                      fillOpacity={0.5}
                    />
                    <Radar name="Impact" dataKey="impact" stroke="#4ade80" fill="#4ade80" fillOpacity={0.5} />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <ChartTooltip>
                              <ChartTooltipContent>
                                <div className="flex flex-col gap-2">
                                  <p className="text-sm font-medium text-white">{payload[0]?.payload.name}</p>
                                  <div className="flex items-center gap-2">
                                    <div className="h-3 w-3 rounded-full bg-pink-400" />
                                    <p className="text-sm text-slate-300">Attendance: {payload[0]?.value}%</p>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <div className="h-3 w-3 rounded-full bg-blue-400" />
                                    <p className="text-sm text-slate-300">Satisfaction: {payload[1]?.value}%</p>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <div className="h-3 w-3 rounded-full bg-emerald-400" />
                                    <p className="text-sm text-slate-300">Impact: {payload[2]?.value}%</p>
                                  </div>
                                </div>
                              </ChartTooltipContent>
                            </ChartTooltip>
                          )
                        }
                        return null
                      }}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </Chart>
              <ChartLegend className="mt-4 justify-center">
                <ChartLegendItem color="#f472b6" label="Attendance" />
                <ChartLegendItem color="#60a5fa" label="Satisfaction" />
                <ChartLegendItem color="#4ade80" label="Impact" />
              </ChartLegend>
            </ChartContainer>
          </div>
        </GlassmorphicCard>

        <GlassmorphicCard className="border-slate-700/50 lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium text-white flex items-center gap-2">
              <BarChart className="h-4 w-4 text-amber-400" />
              Resource Growth by Quarter
            </h3>
          </div>

          <div className="h-80">
            <ChartContainer>
              <Chart>
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart data={resourceGrowthData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorHardware" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#f472b6" stopOpacity={1} />
                        <stop offset="100%" stopColor="#f472b6" stopOpacity={0.6} />
                      </linearGradient>
                      <linearGradient id="colorSoftware" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#60a5fa" stopOpacity={1} />
                        <stop offset="100%" stopColor="#60a5fa" stopOpacity={0.6} />
                      </linearGradient>
                      <linearGradient id="colorVenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#4ade80" stopOpacity={1} />
                        <stop offset="100%" stopColor="#4ade80" stopOpacity={0.6} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 12 }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 12 }} />
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <ChartTooltip>
                              <ChartTooltipContent>
                                <div className="flex flex-col gap-2">
                                  <p className="text-sm font-medium text-white">{payload[0]?.payload.name}</p>
                                  <div className="flex items-center gap-2">
                                    <div className="h-3 w-3 rounded-full bg-pink-400" />
                                    <p className="text-sm text-slate-300">Hardware: {payload[0]?.value}</p>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <div className="h-3 w-3 rounded-full bg-blue-400" />
                                    <p className="text-sm text-slate-300">Software: {payload[1]?.value}</p>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <div className="h-3 w-3 rounded-full bg-emerald-400" />
                                    <p className="text-sm text-slate-300">Venue: {payload[2]?.value}</p>
                                  </div>
                                </div>
                              </ChartTooltipContent>
                            </ChartTooltip>
                          )
                        }
                        return null
                      }}
                    />
                    <Bar dataKey="hardware" fill="url(#colorHardware)" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="software" fill="url(#colorSoftware)" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="venue" fill="url(#colorVenue)" radius={[4, 4, 0, 0]} />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </Chart>
              <ChartLegend className="mt-4 justify-center">
                <ChartLegendItem color="#f472b6" label="Hardware" />
                <ChartLegendItem color="#60a5fa" label="Software" />
                <ChartLegendItem color="#4ade80" label="Venue" />
              </ChartLegend>
            </ChartContainer>
          </div>
        </GlassmorphicCard>
      </div>
    </div>
  )
}

