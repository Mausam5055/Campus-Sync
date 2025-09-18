import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, AreaChart, Area, ScatterChart, Scatter } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { TrendingUp, BarChart3, Activity, Target, PieChart, Zap } from "lucide-react"

// Different data from expense page - focused on performance analytics
const performanceData = [
  { month: "Aug", productivity: 85, studyHours: 120, attendance: 95, assignments: 8 },
  { month: "Sep", productivity: 78, studyHours: 110, attendance: 88, assignments: 12 },
  { month: "Oct", productivity: 92, studyHours: 135, attendance: 96, assignments: 10 },
  { month: "Nov", productivity: 88, studyHours: 125, attendance: 92, assignments: 9 },
  { month: "Dec", productivity: 82, studyHours: 100, attendance: 85, assignments: 6 },
  { month: "Jan", productivity: 90, studyHours: 140, attendance: 94, assignments: 11 },
]

const skillRadarData = [
  { skill: "Mathematics", current: 85, target: 90 },
  { skill: "Programming", current: 92, target: 95 },
  { skill: "Physics", current: 78, target: 85 },
  { skill: "Chemistry", current: 82, target: 88 },
  { skill: "Communication", current: 75, target: 80 },
  { skill: "Problem Solving", current: 88, target: 92 },
]

const weeklyActivityData = [
  { day: "Mon", focus: 75, breaks: 8, efficiency: 82 },
  { day: "Tue", focus: 68, breaks: 12, efficiency: 78 },
  { day: "Wed", focus: 85, breaks: 6, efficiency: 90 },
  { day: "Thu", focus: 72, breaks: 10, efficiency: 80 },
  { day: "Fri", focus: 90, breaks: 5, efficiency: 95 },
  { day: "Sat", focus: 45, breaks: 15, efficiency: 60 },
  { day: "Sun", focus: 35, breaks: 20, efficiency: 50 },
]

const goalsProgress = [
  { goal: "Complete Data Structures Course", progress: 75, target: 100 },
  { goal: "Improve GPA to 8.5", progress: 60, target: 100 },
  { goal: "Read 2 Books per Month", progress: 85, target: 100 },
  { goal: "Daily Exercise Habit", progress: 40, target: 100 },
]

const chartConfig = {
  productivity: { label: "Productivity", color: "#3b82f6" },
  studyHours: { label: "Study Hours", color: "#10b981" },
  attendance: { label: "Attendance", color: "#f59e0b" },
  assignments: { label: "Assignments", color: "#8b5cf6" },
  focus: { label: "Focus Score", color: "#ef4444" },
  efficiency: { label: "Efficiency", color: "#06b6d4" },
}

export function AnalyticsOverview() {
  const avgProductivity = Math.round(performanceData.reduce((sum, data) => sum + data.productivity, 0) / performanceData.length)
  const totalStudyHours = performanceData.reduce((sum, data) => sum + data.studyHours, 0)
  const avgAttendance = Math.round(performanceData.reduce((sum, data) => sum + data.attendance, 0) / performanceData.length)
  const totalAssignments = performanceData.reduce((sum, data) => sum + data.assignments, 0)

  return (
    <div className="space-y-4 sm:space-y-6 px-2 sm:px-0">
      {/* Analytics Summary Cards */}
      <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 border-blue-200/50 dark:border-blue-800/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-3 sm:px-6 pt-3 sm:pt-6">
            <CardTitle className="text-xs sm:text-sm font-medium text-blue-700 dark:text-blue-400 truncate">Avg Productivity</CardTitle>
            <Activity className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600 dark:text-blue-400 shrink-0" />
          </CardHeader>
          <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6">
            <div className="text-lg sm:text-xl md:text-2xl font-bold text-blue-600 dark:text-blue-400">{avgProductivity}%</div>
            <p className="text-xs text-blue-600/70 dark:text-blue-400/70 truncate">Based on study patterns</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border-green-200/50 dark:border-green-800/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-3 sm:px-6 pt-3 sm:pt-6">
            <CardTitle className="text-xs sm:text-sm font-medium text-green-700 dark:text-green-400 truncate">Study Hours</CardTitle>
            <BarChart3 className="h-3 w-3 sm:h-4 sm:w-4 text-green-600 dark:text-green-400 shrink-0" />
          </CardHeader>
          <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6">
            <div className="text-lg sm:text-xl md:text-2xl font-bold text-green-600 dark:text-green-400">{totalStudyHours}h</div>
            <p className="text-xs text-green-600/70 dark:text-green-400/70 truncate">Last 6 months total</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/30 dark:to-amber-950/30 border-orange-200/50 dark:border-orange-800/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-3 sm:px-6 pt-3 sm:pt-6">
            <CardTitle className="text-xs sm:text-sm font-medium text-orange-700 dark:text-orange-400 truncate">Attendance</CardTitle>
            <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-orange-600 dark:text-orange-400 shrink-0" />
          </CardHeader>
          <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6">
            <div className="text-lg sm:text-xl md:text-2xl font-bold text-orange-600 dark:text-orange-400">{avgAttendance}%</div>
            <p className="text-xs text-orange-600/70 dark:text-orange-400/70 truncate">Average attendance rate</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950/30 dark:to-violet-950/30 border-purple-200/50 dark:border-purple-800/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-3 sm:px-6 pt-3 sm:pt-6">
            <CardTitle className="text-xs sm:text-sm font-medium text-purple-700 dark:text-purple-400 truncate">Assignments</CardTitle>
            <Target className="h-3 w-3 sm:h-4 sm:w-4 text-purple-600 dark:text-purple-400 shrink-0" />
          </CardHeader>
          <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6">
            <div className="text-lg sm:text-xl md:text-2xl font-bold text-purple-600 dark:text-purple-400">{totalAssignments}</div>
            <p className="text-xs text-purple-600/70 dark:text-purple-400/70 truncate">Completed this period</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2">
        {/* Performance Analytics */}
        <Card>
          <CardHeader className="px-3 sm:px-6 pt-3 sm:pt-6">
            <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
              <Activity className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
              Performance Analytics
            </CardTitle>
          </CardHeader>
          <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6">
            <ChartContainer config={chartConfig} className="h-[250px] sm:h-[300px] w-full">
              <AreaChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} fontSize={12} />
                <YAxis axisLine={false} tickLine={false} fontSize={12} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area
                  type="monotone"
                  dataKey="productivity"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="attendance"
                  stroke="#f59e0b"
                  fill="#f59e0b"
                  fillOpacity={0.2}
                  strokeWidth={2}
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Skills Radar Chart */}
        <Card>
          <CardHeader className="px-3 sm:px-6 pt-3 sm:pt-6">
            <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
              <PieChart className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
              Skills Assessment
            </CardTitle>
          </CardHeader>
          <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6">
            <ChartContainer config={chartConfig} className="h-[250px] sm:h-[300px] w-full">
              <RadarChart data={skillRadarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="skill" fontSize={10} />
                <PolarRadiusAxis angle={90} domain={[0, 100]} fontSize={10} />
                <Radar
                  name="Current"
                  dataKey="current"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
                <Radar
                  name="Target"
                  dataKey="target"
                  stroke="#10b981"
                  fill="#10b981"
                  fillOpacity={0.1}
                  strokeWidth={2}
                  strokeDasharray="5 5"
                />
                <ChartTooltip content={<ChartTooltipContent />} />
              </RadarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2">
        {/* Weekly Activity Pattern */}
        <Card>
          <CardHeader className="px-3 sm:px-6 pt-3 sm:pt-6">
            <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
              <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
              Weekly Activity Pattern
            </CardTitle>
          </CardHeader>
          <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6">
            <ChartContainer config={chartConfig} className="h-[250px] sm:h-[300px] w-full">
              <ScatterChart data={weeklyActivityData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="day" axisLine={false} tickLine={false} fontSize={12} />
                <YAxis axisLine={false} tickLine={false} fontSize={12} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Scatter dataKey="focus" fill="#ef4444" name="Focus Score" />
                <Scatter dataKey="efficiency" fill="#06b6d4" name="Efficiency" />
              </ScatterChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Goals Progress */}
        <Card>
          <CardHeader className="px-3 sm:px-6 pt-3 sm:pt-6">
            <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
              <Target className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
              Goals Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6">
            <div className="space-y-4">
              {goalsProgress.map((goal) => (
                <div key={goal.goal} className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-medium text-xs sm:text-sm truncate flex-1">{goal.goal}</span>
                    <Badge variant={goal.progress > 80 ? "default" : goal.progress > 60 ? "secondary" : "outline"} className="text-xs shrink-0">
                      {goal.progress}%
                    </Badge>
                  </div>
                  <Progress 
                    value={goal.progress} 
                    className="h-1.5 sm:h-2" 
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Insights Card */}
      <Card className="bg-gradient-to-r from-violet-50 to-purple-50 border-violet-200 dark:from-violet-950/30 dark:to-purple-950/30 dark:border-violet-800/50">
        <CardHeader className="px-3 sm:px-6 pt-3 sm:pt-6">
          <CardTitle className="flex items-center gap-2 text-violet-800 dark:text-violet-400">
            <Activity className="h-5 w-5" />
            Performance Insights
          </CardTitle>
        </CardHeader>
        <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6 text-violet-700 dark:text-violet-300">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-semibold mb-2">Peak Performance:</h4>
              <p>Your productivity peaks on Fridays at 90%. Try scheduling important tasks then.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Study Recommendation:</h4>
              <p>Your programming skills are strongest. Consider focusing more on communication skills.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Weekly Pattern:</h4>
              <p>Weekends show lower focus scores. Consider light review sessions instead of heavy study.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Goal Achievement:</h4>
              <p>You're on track with reading goals (85%). Great consistency!</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}