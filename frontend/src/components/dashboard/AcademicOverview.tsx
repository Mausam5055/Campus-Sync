import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { TrendingUp, Award, BookOpen, Calendar, Clock, Users, Target } from "lucide-react"

const gpaData = [
  { semester: "Sem 1", gpa: 3.45 },
  { semester: "Sem 2", gpa: 3.62 },
  { semester: "Sem 3", gpa: 3.71 },
  { semester: "Sem 4", gpa: 3.85 },
  { semester: "Sem 5", gpa: 3.87 },
]

const gradeDistribution = [
  { grade: "A+", count: 8, color: "#16a34a" },
  { grade: "A", count: 12, color: "#22c55e" },
  { grade: "B+", count: 6, color: "#eab308" },
  { grade: "B", count: 3, color: "#f59e0b" },
  { grade: "C+", count: 1, color: "#f97316" },
]

const subjectProgress = [
  { subject: "Data Structures", progress: 92, grade: "A+", color: "#16a34a" },
  { subject: "Algorithms", progress: 88, grade: "A", color: "#22c55e" },
  { subject: "Database Systems", progress: 85, grade: "A", color: "#22c55e" },
  { subject: "Web Development", progress: 78, grade: "B+", color: "#eab308" },
  { subject: "Machine Learning", progress: 75, grade: "B+", color: "#eab308" },
]

const dailyTrendData = [
  { day: "1", amount: 240 },
  { day: "2", amount: 180 },
  { day: "3", amount: 320 },
  { day: "4", amount: 195 },
  { day: "5", amount: 480 },
  { day: "6", amount: 350 },
  { day: "7", amount: 290 },
  { day: "8", amount: 150 },
  { day: "9", amount: 220 },
  { day: "10", amount: 380 },
]

const chartConfig = {
  gpa: { label: "GPA", color: "hsl(var(--primary))" },
  progress: { label: "Progress", color: "hsl(var(--primary))" },
  amount: { label: "Amount", color: "hsl(var(--primary))" },
}

export function AcademicOverview() {
  return (
    <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-3 px-2 sm:px-0">
      {/* Academic Progress Trend */}
      <Card className="lg:col-span-2">
        <CardHeader className="px-3 sm:px-6 pt-3 sm:pt-6">
          <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
            <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
            Academic Progress Trend
          </CardTitle>
        </CardHeader>
        <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6">
          <ChartContainer config={chartConfig} className="h-[250px] sm:h-[300px] w-full">
            <AreaChart data={dailyTrendData}>
              <defs>
                <linearGradient id="spendingGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis dataKey="day" axisLine={false} tickLine={false} fontSize={12} />
              <YAxis axisLine={false} tickLine={false} fontSize={12} tickFormatter={(value) => `₹${value > 1000 ? (value/1000).toFixed(0) + 'k' : value}`} />
              <ChartTooltip 
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-background border rounded-lg shadow-lg p-2">
                        <p className="font-medium text-xs sm:text-sm">Day {label}</p>
                        <p className="text-xs">Amount: ₹{payload[0].value}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Area 
                type="monotone" 
                dataKey="amount" 
                stroke="#8b5cf6" 
                fill="url(#spendingGradient)"
                strokeWidth={3}
                dot={{ fill: "#8b5cf6", strokeWidth: 2, r: 4 }}
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Daily Spending Pattern */}
      <Card>
        <CardHeader className="px-3 sm:px-6 pt-3 sm:pt-6">
          <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
            <Award className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
            Daily Spending Pattern
          </CardTitle>
        </CardHeader>
        <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6">
          <ChartContainer config={chartConfig} className="h-[250px] sm:h-[300px] w-full">
            <AreaChart data={gpaData}>
              <defs>
                <linearGradient id="gpaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis dataKey="semester" axisLine={false} tickLine={false} fontSize={12} />
              <YAxis domain={[0, 4.0]} axisLine={false} tickLine={false} fontSize={12} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area
                type="monotone"
                dataKey="gpa"
                stroke="hsl(var(--primary))"
                strokeWidth={3}
                fill="url(#gpaGradient)"
                dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
              />
            </AreaChart>
          </ChartContainer>
          <div className="mt-3 sm:mt-4 p-2 sm:p-3 bg-muted/30 rounded-lg">
            <div className="flex items-center justify-between text-xs sm:text-sm flex-wrap gap-2">
              <span>Daily Average: ₹285</span>
              <Badge variant="secondary" className="text-xs">Moderate Spending 💰</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Subject Progress */}
      <Card className="lg:col-span-3">
        <CardHeader className="px-3 sm:px-6 pt-3 sm:pt-6">
          <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
            <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
            Current Semester Progress
          </CardTitle>
        </CardHeader>
        <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6">
          <div className="space-y-3 sm:space-y-4">
            {subjectProgress.map((subject) => (
              <div key={subject.subject} className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-medium text-xs sm:text-sm truncate flex-1">{subject.subject}</span>
                  <div className="flex items-center gap-1 sm:gap-2 shrink-0">
                    <Badge variant="outline" style={{ borderColor: subject.color, color: subject.color }} className="text-xs">
                      {subject.grade}
                    </Badge>
                    <span className="text-xs sm:text-sm font-medium">{subject.progress}%</span>
                  </div>
                </div>
                <Progress value={subject.progress} className="h-1.5 sm:h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}