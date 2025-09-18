import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, TrendingDown, Trophy, BookOpen, Clock, Users, Target, DollarSign, CheckCircle, AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"

interface StatCardProps {
  title: string
  value: string | number
  subtitle: string
  icon: React.ElementType
  trend?: {
    value: number
    isPositive: boolean
  }
  className?: string
  progress?: number
}

export function StatCard({ title, value, subtitle, icon: Icon, trend, className, progress }: StatCardProps) {
  return (
    <Card className={cn("relative overflow-hidden w-full", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-3 sm:px-6 pt-3 sm:pt-6">
        <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground truncate pr-2">{title}</CardTitle>
        <Icon className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground shrink-0" />
      </CardHeader>
      <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6">
        <div className="text-lg sm:text-xl md:text-2xl font-bold truncate">{value}</div>
        <div className="flex items-center justify-between mt-1 gap-2">
          <p className="text-xs text-muted-foreground truncate flex-1">{subtitle}</p>
          {trend && (
            <div className={cn(
              "flex items-center text-xs shrink-0",
              trend.isPositive ? "text-green-600" : "text-red-600"
            )}>
              {trend.isPositive ? (
                <TrendingUp className="h-3 w-3 mr-1" />
              ) : (
                <TrendingDown className="h-3 w-3 mr-1" />
              )}
              {Math.abs(trend.value)}%
            </div>
          )}
        </div>
        {progress !== undefined && (
          <Progress value={progress} className="mt-2 sm:mt-3 h-1" />
        )}
      </CardContent>
    </Card>
  )
}

export function DashboardStats() {
  return (
    <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 px-2 sm:px-0">
      <StatCard
        title="Current CGPA"
        value="3.87"
        subtitle="↗ +0.15 from last sem"
        icon={Trophy}
        trend={{ value: 4.2, isPositive: true }}
        className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950/30 dark:to-orange-950/30 border-yellow-200/50 dark:border-yellow-800/50"
        progress={87}
      />
      
      <StatCard
        title="Enrolled Courses"
        value="6"
        subtitle="18 credit hours total"
        icon={BookOpen}
        className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border-blue-200/50 dark:border-blue-800/50"
        progress={75}
      />
      
      <StatCard
        title="Tasks Completed"
        value="24/31"
        subtitle="7 pending this week"
        icon={CheckCircle}
        trend={{ value: 12.5, isPositive: true }}
        className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border-green-200/50 dark:border-green-800/50"
        progress={77}
      />
      
      <StatCard
        title="Monthly Budget"
        value="₹12,450"
        subtitle="₹2,150 remaining"
        icon={DollarSign}
        trend={{ value: 8.3, isPositive: false }}
        className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 border-purple-200/50 dark:border-purple-800/50"
        progress={83}
      />
    </div>
  )
}