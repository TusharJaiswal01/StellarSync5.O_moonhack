"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Trophy,
  Medal,
  Award,
  Star,
  TrendingUp,
  Users,
  Calendar,
  Gift,
  Crown,
  Rocket,
  Target,
  Heart,
  Zap,
  Sparkles,
  ChartPie,
  LineChart as LineChartIcon,
  BarChart as BarChartIcon,
  Activity,
  Flame,
  Shield,
  BookOpen,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area,
  RadialBarChart,
  RadialBar,
  Legend,
  CartesianGrid,
} from "recharts";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const COLORS = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEEAD"];
const ACTIVITY_TYPES = [
  "Academic",
  "Sports",
  "Cultural",
  "Technical",
  "Social",
];

const BADGES = {
  "Top Sponsor": { icon: Gift, color: "text-purple-500", points: 1000 },
  "Perfect Attendance": { icon: Target, color: "text-green-500", points: 800 },
  "Event Master": { icon: Crown, color: "text-yellow-500", points: 1200 },
  "Event Organizer": { icon: Calendar, color: "text-blue-500", points: 900 },
  "Team Player": { icon: Users, color: "text-indigo-500", points: 700 },
  "Volunteer Star": { icon: Star, color: "text-pink-500", points: 600 },
  "Rising Star": { icon: Rocket, color: "text-orange-500", points: 500 },
  "Academic Excellence": {
    icon: BookOpen,
    color: "text-cyan-500",
    points: 1100,
  },
  "Innovation Champion": { icon: Flame, color: "text-red-500", points: 1000 },
  "Community Guardian": {
    icon: Shield,
    color: "text-emerald-500",
    points: 800,
  },
};
const CustomLegend = (props) => {
  const { payload } = props;
  return (
    <div className="flex flex-col space-x-6 mt-64 ml-0 text-left ">
      {payload.map((entry, index) => (
        <div key={`item-${index}`} className="flex items-center text-center">
          <div
            style={{
              width: 20,
              height: 10,
              backgroundColor: entry.color,
              marginRight:10,
              textAlign:"left",
              display : "flex",
              

            
            }}
          />
          <span className="text-cyan-400  text-center">{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

const generateHistoricalData = (student) => {
  return Array.from({ length: 12 }, (_, i) => ({
    month: new Date(2024, i, 1).toLocaleString("default", { month: "short" }),
    points: Math.floor(student.points * (0.7 + Math.random() * 0.6)),
    average: student.points,
  }));
};

const generateActivityData = (student) => {
  return ACTIVITY_TYPES.map((type) => ({
    name: type,
    value: Math.floor(Math.random() * (student.points * 0.4)),
    fullMark: student.points,
  }));
};

const initialStudents = [
  {
    id: 1,
    name: "Sarah Chen",
    points: 2800,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    contributions: {
      sponsorships: 1200,
      attendance: 600,
      events: 600,
      volunteering: 400,
    },
    badges: [
      "Top Sponsor",
      "Perfect Attendance",
      "Event Master",
      "Academic Excellence",
    ],
    recentActivity: [
      "Organized Spring Festival",
      "Brought 3 new sponsors",
      "Led volunteer team",
      "Won innovation challenge",
    ],
    level: "Diamond",
    streak: 15,
    totalEvents: 45,
    achievements: 12,
  },
  {
    id: 2,
    name: "Michael Park",
    points: 2500,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    contributions: {
      sponsorships: 800,
      attendance: 700,
      events: 600,
      volunteering: 400,
    },
    badges: ["Event Organizer", "Team Player", "Innovation Champion"],
    recentActivity: [
      "Coordinated Winter Gala",
      "Weekly volunteering",
      "Led tech workshop",
      "Mentored new members",
    ],
    level: "Platinum",
    streak: 12,
    totalEvents: 38,
    achievements: 9,
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    points: 2300,
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
    contributions: {
      sponsorships: 600,
      attendance: 700,
      events: 500,
      volunteering: 500,
    },
    badges: ["Volunteer Star", "Rising Star", "Community Guardian"],
    recentActivity: [
      "Led community outreach",
      "Perfect attendance this month",
      "Started coding club",
      "Organized hackathon",
    ],
    level: "Gold",
    streak: 8,
    totalEvents: 32,
    achievements: 7,
  },
  {
    id: 4,
    name: "Alex Thompson",
    points: 2100,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    contributions: {
      sponsorships: 500,
      attendance: 600,
      events: 500,
      volunteering: 500,
    },
    badges: ["Team Player", "Rising Star"],
    recentActivity: [
      "Organized sports meet",
      "Started debate club",
      "Weekly mentoring",
      "Cultural fest coordinator",
    ],
    level: "Silver",
    streak: 6,
    totalEvents: 28,
    achievements: 5,
  },
];

const getRankIcon = (index) => {
  switch (index) {
    case 0:
      return (
        <div className="relative">
          <Crown className="h-8 w-8 text-yellow-500 animate-bounce" />
          <motion.div
            className="absolute -top-1 -right-1"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <Sparkles className="h-4 w-4 text-yellow-400" />
          </motion.div>
        </div>
      );
    case 1:
      return <Trophy className="h-7 w-7 text-gray-400" />;
    case 2:
      return <Medal className="h-7 w-7 text-amber-600" />;
    default:
      return <Award className="h-6 w-6 text-blue-500" />;
  }
};

const ActivityCard = ({ activity }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ scale: 1.02 }}
    className="bg-gradient-to-r from-pink-700/5 to-purple-800/10 p-4 rounded-lg text-sm backdrop-blur-sm border-white/20 border"
  >
    <div className="flex items-center gap-2 text-white">
      <Zap className="h-4 w-4 text-white" />
      {activity}
    </div>
  </motion.div>
);

const LevelBadge = ({ level }) => {
  const colors = {
    Diamond: "bg-gradient-to-r from-slate-700 to-purple-500",
    Platinum: "bg-gradient-to-r from-slate-700 to-purple-400",
    Gold: "bg-gradient-to-r from-yellow-500 to-orange-400",
    Silver: "bg-gradient-to-r from-gray-500 to-gray-600",
  };

  return (
    <span
      className={`${colors[level]} text-gray-200 text-xs px-2 py-1 rounded-full font-semibold`}
    >
      {level}
    </span>
  );
};

const StatCard = ({ icon: Icon, title, value, trend }) => (
  <div className="bg-gradient-to-r from-purple-900 to-pink-900 rounded-lg p-4 border border-gray-700">
    <div className="flex items-center gap-2 mb-2">
      <Icon className="h-5 w-5 text-white" />
      <span className="text-sm text-gray-100">{title}</span>
    </div>
    <div className="text-2xl font-bold text-gray-100">{value}</div>
    {trend && (
      <div
        className={`text-xs mt-1 ${
          trend > 0 ? "text-green-100" : "text-red-500"
        }`}
      >
        {trend > 0 ? "↑" : "↓"} {Math.abs(trend)}% from last month
      </div>
    )}
  </div>
);

export default function LeaderboardPage() {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("overview");
  const { toast } = useToast();

  useEffect(() => {
    const savedStudents = localStorage.getItem("leaderboardStudents");
    if (savedStudents) {
      setStudents(JSON.parse(savedStudents));
    } else {
      setStudents(initialStudents);
      localStorage.setItem(
        "leaderboardStudents",
        JSON.stringify(initialStudents)
      );
    }
  }, []);

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addPoints = (studentId, amount) => {
    const updatedStudents = students
      .map((student) => {
        if (student.id === studentId) {
          const newPoints = student.points + amount;
          return { ...student, points: newPoints };
        }
        return student;
      })
      .sort((a, b) => b.points - a.points);

    setStudents(updatedStudents);
    localStorage.setItem(
      "leaderboardStudents",
      JSON.stringify(updatedStudents)
    );
    toast({
      title: "Points Updated",
      description: `Added ${amount} points successfully!`,
    });
  };

  const contributionData = selectedStudent?.contributions
    ? Object.entries(selectedStudent.contributions).map(([name, value]) => ({
        name,
        value,
      }))
    : [];

  return (

    // Background Color Change
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-indigo-950 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col items-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative"
          >
            <h1 className="text-5xl mt-10 font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-500 to-pink-500 shadow-md">
              Club Champions
            </h1>
            <motion.div
              className="absolute -top-6 -right-6"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Trophy className="h-12 w-12 text-yellow-500 opacity-50" />
            </motion.div>
          </motion.div>
          <Input
            type="search"
            placeholder="Search champions..."
            className="max-w-4xl mt-8 bg-slate-900/50 border-slate-700 text-gray-100 placeholder:text-gray-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Leaderboard */}

          <Card className="p-6 bg-slate-900/50 border-slate-700 lg:col-span-1">
      <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2 text-gray-100">
        <Crown className="h-6 w-6 text-yellow-500" /> <h1 className="text-yellow-500">Top Champions</h1> 
      </h2>
      <div className="space-y-4">
        <AnimatePresence>
          {filteredStudents.map((student, index) => (
            <motion.div
              key={student.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              whileHover={{ scale: 1.05 }}
              className={cn(
                "flex items-center p-4 pr-5 rounded-lg transition-all cursor-pointer gap-4",
                "bg-gradient-to-r from-gray-800/50 to-gray-700/50 hover:from-slate-900 hover:to-slate-950",
                "border border-gray-700 hover:border-gray-600",
                index === 0 && "bg-gradient-to-r from-yellow-500/20 to-amber-500/10 border-yellow-500/10",
                index === 1 && "bg-gradient-to-r from-slate-500/30 to-amber-500/10 border-yellow-500/10",
                index === 2 && "bg-gradient-to-r from-orange-500/20 to-amber-500/10 border-amber-500/10"
              )}
              onClick={() => setSelectedStudent(student)}
            >
              <div className="shrink-0">{getRankIcon(index)}</div>
              <Avatar className="h-16 w-16 ring-2 ring-offset-2 ring-offset-gray-800 ring-primary/50">
                <img
                  src={student.image}
                  alt={student.name}
                  className="object-cover w-full h-full rounded-full"
                />
              </Avatar>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold text-gray-100 text-lg truncate">{student.name}</h3>
                  <LevelBadge  level={student.level} />
                </div>
                <div className="flex flex-wrap gap-2">
                  {student.badges.slice(0, 2).map((badge, i) => {
                    const BadgeIcon = BADGES[badge]?.icon || Star;
                    return (
                      <span
                        key={i}
                        className={`text-xs px-3 py-1 rounded-full flex items-center border-white/10 border gap-1 bg-gray-900/50 ${BADGES[badge]?.color || "text-primary"}`}
                      >
                        <BadgeIcon className="h-4 w-4" />
                        {badge}
                      </span>
                    );
                  })}
                  {student.badges.length > 2 && (
                    <span className="text-xs px-3 py-1 rounded-full bg-gray-700/50 text-gray-100">
                      +{student.badges.length - 2}
                    </span>
                  )}
                </div>
              </div>

              <div className="text-right min-w-[120px]">
                <div className="text-xl  font-bold pl-3 text-yellow-400 mb-2">{student.points}</div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="bg-orange-600  mr-[-14px] px-1.5  hover:bg-primary/20 text-[12px] text-black"
                  onClick={(e) => {
                    e.stopPropagation();
                    addPoints(student.id, 100);
                  }}
                >
                  <Zap className="h-3 w-3 " /> +100
                </Button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </Card>

          {/* Right Column - Stats and Charts */}
          <div className="lg:col-span-2 space-y-6">
            {selectedStudent ? (
              <>
                <div className="grid grid-cols-4 gap-4">
                  <StatCard
                    icon={Activity}
                    title="Activity Streak"
                    value={`${selectedStudent.streak} days`}
                    trend={12}
                  />
                  <StatCard
                    icon={Calendar}
                    title="Total Events"
                    value={selectedStudent.totalEvents}
                    trend={8}
                  />
                  <StatCard
                    icon={Trophy}
                    title="Achievements"
                    value={selectedStudent.achievements}
                    trend={15}
                  />
                  <StatCard
                    icon={Star}
                    title="Total Points"
                    value={selectedStudent.points}
                    trend={5}
                  />
                </div>

                <Card className="p-6 bg-gray-800/50 backdrop-blur-lg border-gray-700">
                  <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-semibold text-gray-100">
                        Performance Analytics
                      </h2>
                      <TabsList className="bg-slate-900/70">
                        <TabsTrigger
                          value="overview"
                          className="data-[state=active]:bg-slate-800 text-white"
                        >
                          <BarChartIcon className="h-4 w-4 mr-2" />
                          Overview
                        </TabsTrigger>
                        <TabsTrigger
                          value="progress"
                          className="data-[state=active]:bg-slate-800 text-white"
                        >
                          <LineChartIcon className="h-4 w-4 mr-2" />
                          Progress
                        </TabsTrigger>
                        <TabsTrigger
                          value="activities"
                          className="data-[state=active]:bg-slate-800 text-white"
                        >
                          <ChartPie className="h-4 w-4 mr-2" />
                          Activities
                        </TabsTrigger>
                      </TabsList>
                    </div>

                    <TabsContent value="overview" className="h-[400px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={Object.entries(
                            selectedStudent.contributions
                          ).map(([key, value]) => ({ name: key, value }))}
                        >
                          <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#374151"
                          />
                          <XAxis dataKey="name" stroke="#94a3b8" />
                          <YAxis stroke="#94a3b8" />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "#222222",
                              color : "white",
                              border: "1px solid rgba(75, 85, 99, 0.5)",
                              borderRadius: "0.5rem",
                            }}
                          />
                          <Bar
                            dataKey="value"
                            fill="#60A5FA"
                            radius={[4, 4, 0, 0]}
                          />
                          <defs>
                            <linearGradient
                              id="colorGradient"
                              x1="0"
                              y1="0"
                              x2="0"
                              y2="1"
                            >
                              <stop
                                offset="0%"
                                stopColor="hsl(var(--primary))"
                                stopOpacity={0.8}
                              />
                              <stop
                                offset="100%"
                                stopColor="hsl(var(--primary))"
                                stopOpacity={0.3}
                              />
                            </linearGradient>
                          </defs>
                        </BarChart>
                      </ResponsiveContainer>
                    </TabsContent>

                    <TabsContent value="progress" className="h-[400px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                          data={generateHistoricalData(selectedStudent)}
                        >
                          <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#374151"
                          />
                          <XAxis dataKey="month" stroke="#94a3b8" />
                          <YAxis stroke="#94a3b8" />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "#222222",
                              color : "white",
                              border: "1px solid rgba(75, 85, 99, 0.5)",
                              borderRadius: "0.5rem",
                            }}
                          />
                          <Area
                            type="monotone"
                            dataKey="points"
                            stroke="hsl(var(--primary))"
                            fill="#FEE9EE"
                          />
                          <Line
                            type="monotone"
                            dataKey="average"
                            stroke="pink"
                            strokeDasharray="5 5"
                          />
                          <defs>
                            <linearGradient
                              id="areaGradient"
                              x1="0"
                              y1="0"
                              x2="0"
                              y2="1"
                            >
                              <stop
                                offset="0%"
                                stopColor="hsl(var(--primary))"
                                stopOpacity={0.4}
                              />
                              <stop
                                offset="100%"
                                stopColor="hsl(var(--primary))"
                                stopOpacity={0.1}
                              />
                            </linearGradient>
                          </defs>
                        </AreaChart>
                      </ResponsiveContainer>
                    </TabsContent>

                    <TabsContent
                      value="activities"
                      className="grid grid-cols-2 gap-6"
                    >
                      <div className="h-[400px] ">
                        <ResponsiveContainer width="100%" height="120%">
                          <RadialBarChart
                            innerRadius="30%"
                            outerRadius="100%"
                            data={generateActivityData(selectedStudent)}
                            startAngle={180}
                            endAngle={0}
                          >
                            <RadialBar
                              minAngle={15}
                              background
                              clockWise={true}
                              dataKey="value"
                              fill="yellow"
                            />
                            <Legend
                              iconSize={10}
                              width={120}
                              height={140}
                              layout="horizontal"
                              verticalAlign="top"
                              align="right"
                              className="text-white"
                              content={<CustomLegend />}
                            />
                            <Tooltip
                              contentStyle={{
                                backgroundColor: "black",
                                color : "white",
                                border: "1px solid rgba(75, 85, 99, 0.5)",
                                borderRadius: "0.5rem",
                              }}
                            />
                          </RadialBarChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={contributionData}
                              cx="50%"
                              cy="50%"
                              innerRadius={60}
                              outerRadius={80}
                              fill="#8884d8"
                              paddingAngle={5}
                              dataKey="value"
                            >
                              {contributionData.map((entry, index) => (
                                <Cell
                                  key={`cell-${index}`}
                                  fill={COLORS[index % COLORS.length]}
                                />
                              ))}
                            </Pie>
                            <Tooltip
                              contentStyle={{
                                backgroundColor: "blue",
                                color : "white",
                                border: "1px solid rgba(75, 85, 99, 0.5)",
                                borderRadius: "0.5rem",
                              }}
                            />
                            <Legend />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </TabsContent>
                  </Tabs>
                </Card>

                <div className="grid grid-cols-2 gap-6">
                  <Card className="p-6 bg-gray-800/50 backdrop-blur-lg border-gray-700">
                    <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2 text-gray-100">
                      <Gift className="h-6 w-6 text-white" /> Badges &
                      Achievements
                    </h2>
                    <div className="grid grid-cols-2 gap-4">
                      {selectedStudent.badges.map((badge, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="bg-slate-900 p-4 rounded-lg border border-gray-600"
                        >
                          <div className="flex items-center gap-2 mb-2">
                            {BADGES[badge]?.icon &&
                            typeof BADGES[badge].icon === "function" ? (
                              React.createElement(BADGES[badge].icon, {
                                className: `h-5 w-5 ${
                                  BADGES[badge]?.color || ""
                                }`,
                              })
                            ) : (
                              <div className="h-5 w-5"></div> // Placeholder to maintain layout
                            )}
                            <span className="text-sm font-medium text-white">
                              {badge}
                            </span>
                          </div>

                          <div className="text-sm text-pink-500">
                            +{BADGES[badge]?.points || 0} points
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </Card>

                  <Card className="p-6 bg-gray-800/50 backdrop-blur-lg border-gray-700">
                    <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2 text-gray-100">
                      <Activity className="h-6 w-6 text-primary text-white" /> Recent
                      Activities
                    </h2>
                    <div className="space-y-3">
                      {selectedStudent.recentActivity.map((activity, index) => (
                        <ActivityCard key={index} activity={activity} />
                      ))}
                    </div>
                  </Card>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center text-gray-400">
                  <Users className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <p>Select a champion to view detailed statistics</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
