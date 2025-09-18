import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { DollarSign, TrendingUp, TrendingDown, Utensils, Bus, BookOpen, Film, Lightbulb } from "lucide-react"

const monthlyExpenseData = [
  { month: "Aug", income: 5000, expenses: 3200, savings: 1800 },
  { month: "Sep", income: 5000, expenses: 3800, savings: 1200 },
  { month: "Oct", income: 5000, expenses: 3500, savings: 1500 },
  { month: "Nov", income: 4500, expenses: 3100, savings: 1400 },
  { month: "Dec", income: 4500, expenses: 2900, savings: 1600 },
  { month: "Jan", income: 5000, expenses: 3750, savings: 1250 },
]

const categoryBreakdown = [
  { name: "Food & Dining", amount: 1190, percentage: 32, icon: Utensils, color: "#3b82f6" },
  { name: "Education", amount: 1200, percentage: 28, icon: BookOpen, color: "#10b981" },
  { name: "Transport", amount: 450, percentage: 12, icon: Bus, color: "#f59e0b" },
  { name: "Entertainment", amount: 350, percentage: 9, icon: Film, color: "#8b5cf6" },
  { name: "Stationery", amount: 280, percentage: 7, icon: Lightbulb, color: "#ef4444" },
  { name: "Others", amount: 280, percentage: 12, icon: DollarSign, color: "#6b7280" },
]

const dailySpendingTrend = [
  { day: "Mon", amount: 245 },
  { day: "Tue", amount: 180 },
  { day: "Wed", amount: 320 },
  { day: "Thu", amount: 195 },
  { day: "Fri", amount: 480 },
  { day: "Sat", amount: 350 },
  { day: "Sun", amount: 290 },
]

const budgetProgress = [
  { category: "Food", spent: 1190, budget: 1500, percentage: 79 },
  { category: "Transport", spent: 450, budget: 600, percentage: 75 },
  { category: "Entertainment", spent: 350, budget: 500, percentage: 70 },
  { category: "Education", spent: 1200, budget: 1200, percentage: 100 },
]

const chartConfig = {
  income: { label: "Income", color: "#10b981" },
  expenses: { label: "Expenses", color: "#ef4444" },
  savings: { label: "Savings", color: "#3b82f6" },
  amount: { label: "Amount", color: "hsl(var(--primary))" },
}

export function ExpenseOverview() {
  const totalExpenses = 3750
  const totalIncome = 5000
  const savingsRate = Math.round(((totalIncome - totalExpenses) / totalIncome) * 100)
  const monthlyChange = -8.5

  return (
    <div className="space-y-4 sm:space-y-6 px-2 sm:px-0">
      {/* Expense Summary Cards */}
      <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border-green-200/50 dark:border-green-800/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-3 sm:px-6 pt-3 sm:pt-6">
            <CardTitle className="text-xs sm:text-sm font-medium text-green-700 dark:text-green-400 truncate">Monthly Income</CardTitle>
            <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-green-600 dark:text-green-400 shrink-0" />
          </CardHeader>
          <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6">
            <div className="text-lg sm:text-xl md:text-2xl font-bold text-green-600 dark:text-green-400">₹{totalIncome.toLocaleString()}</div>
            <p className="text-xs text-green-600/70 dark:text-green-400/70 truncate">Pocket money & allowance</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-950/30 dark:to-pink-950/30 border-red-200/50 dark:border-red-800/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-3 sm:px-6 pt-3 sm:pt-6">
            <CardTitle className="text-xs sm:text-sm font-medium text-red-700 dark:text-red-400 truncate">Total Expenses</CardTitle>
            <DollarSign className="h-3 w-3 sm:h-4 sm:w-4 text-red-600 dark:text-red-400 shrink-0" />
          </CardHeader>
          <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6">
            <div className="text-lg sm:text-xl md:text-2xl font-bold text-red-600 dark:text-red-400">₹{totalExpenses.toLocaleString()}</div>
            <div className="flex items-center text-xs text-red-600/70 dark:text-red-400/70">
              <TrendingDown className="h-3 w-3 mr-1 shrink-0" />
              <span className="truncate">{Math.abs(monthlyChange)}% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border-blue-200/50 dark:border-blue-800/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-3 sm:px-6 pt-3 sm:pt-6">
            <CardTitle className="text-xs sm:text-sm font-medium text-blue-700 dark:text-blue-400 truncate">Savings</CardTitle>
            <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600 dark:text-blue-400 shrink-0" />
          </CardHeader>
          <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6">
            <div className="text-lg sm:text-xl md:text-2xl font-bold text-blue-600 dark:text-blue-400">₹{(totalIncome - totalExpenses).toLocaleString()}</div>
            <p className="text-xs text-blue-600/70 dark:text-blue-400/70 truncate">{savingsRate}% savings rate</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 border-purple-200/50 dark:border-purple-800/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-3 sm:px-6 pt-3 sm:pt-6">
            <CardTitle className="text-xs sm:text-sm font-medium text-purple-700 dark:text-purple-400 truncate">Daily Average</CardTitle>
            <DollarSign className="h-3 w-3 sm:h-4 sm:w-4 text-purple-600 dark:text-purple-400 shrink-0" />
          </CardHeader>
          <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6">
            <div className="text-lg sm:text-xl md:text-2xl font-bold text-purple-600 dark:text-purple-400">₹{Math.round(totalExpenses / 30)}</div>
            <p className="text-xs text-purple-600/70 dark:text-purple-400/70 truncate">Per day spending</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2">
        {/* Monthly Trend */}
        <Card>
          <CardHeader className="px-3 sm:px-6 pt-3 sm:pt-6">
            <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
              <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
              Income vs Expenses Trend
            </CardTitle>
          </CardHeader>
          <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6">
            <ChartContainer config={chartConfig} className="h-[250px] sm:h-[300px] w-full">
              <LineChart data={monthlyExpenseData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} fontSize={12} />
                <YAxis axisLine={false} tickLine={false} fontSize={12} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="income"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ fill: "#10b981", strokeWidth: 2 }}
                />
                <Line
                  type="monotone"
                  dataKey="expenses"
                  stroke="#ef4444"
                  strokeWidth={3}
                  dot={{ fill: "#ef4444", strokeWidth: 2 }}
                />
                <Line
                  type="monotone"
                  dataKey="savings"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  dot={{ fill: "#3b82f6", strokeWidth: 2 }}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Yearly Financial Overview */}
        <Card>
          <CardHeader className="px-3 sm:px-6 pt-3 sm:pt-6">
            <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
              <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
              Yearly Financial Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6">
            <ChartContainer config={chartConfig} className="h-[250px] sm:h-[300px] w-full">
              <BarChart data={monthlyExpenseData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} fontSize={12} />
                <YAxis axisLine={false} tickLine={false} fontSize={12} tickFormatter={(value) => `₹${value > 1000 ? (value/1000).toFixed(0) + 'k' : value}`} />
                <ChartTooltip 
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-background border rounded-lg shadow-lg p-2">
                          <p className="font-medium text-xs sm:text-sm">{label}</p>
                          {payload.map((entry, index) => (
                            <p key={index} className="text-xs" style={{ color: entry.color }}>
                              {entry.name}: ₹{entry.value}
                            </p>
                          ))}
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="income" fill="#10b981" name="Income" radius={[4, 4, 0, 0]} />
                <Bar dataKey="expenses" fill="#ef4444" name="Expenses" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Budget Progress */}
      <Card>
        <CardHeader className="px-3 sm:px-6 pt-3 sm:pt-6">
          <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
            <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
            Budget Progress This Month
          </CardTitle>
        </CardHeader>
        <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6">
          <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2">
            {budgetProgress.map((item) => (
              <div key={item.category} className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-medium text-xs sm:text-sm truncate flex-1">{item.category}</span>
                  <div className="flex items-center gap-1 sm:gap-2 shrink-0">
                    <span className="text-xs sm:text-sm">₹{item.spent}/₹{item.budget}</span>
                    <Badge variant={item.percentage > 90 ? "destructive" : item.percentage > 75 ? "default" : "secondary"} className="text-xs">
                      {item.percentage}%
                    </Badge>
                  </div>
                </div>
                <Progress 
                  value={item.percentage} 
                  className={`h-1.5 sm:h-2 ${item.percentage > 90 ? "bg-red-100" : ""}`} 
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}