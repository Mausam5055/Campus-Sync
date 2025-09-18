import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, Users, Clock, CheckCircle, AlertCircle, TrendingUp } from "lucide-react"

interface BillingStatsProps {
  totalAmount: number
  totalBills: number
  paidBills: number
  pendingBills: number
  overdueBills: number
  thisMonthRevenue?: number
  userType?: 'admin' | 'teacher' | 'student'
}

export function BillingStats({ 
  totalAmount, 
  totalBills, 
  paidBills, 
  pendingBills, 
  overdueBills, 
  thisMonthRevenue,
  userType = 'admin'
}: BillingStatsProps) {
  const stats = [
    {
      title: userType === 'admin' ? 'Total Revenue' : userType === 'teacher' ? 'Total Salary' : 'Total Fees',
      value: `₹${(totalAmount / 1000).toFixed(0)}k`,
      icon: DollarSign,
      description: userType === 'admin' ? 'All time collection' : userType === 'teacher' ? 'This year' : 'This semester',
      variant: 'default' as const
    },
    {
      title: 'Total Bills',
      value: totalBills.toString(),
      icon: Users,
      description: 'Generated invoices',
      variant: 'default' as const
    },
    {
      title: 'Paid',
      value: paidBills.toString(),
      icon: CheckCircle,
      description: 'Completed payments',
      variant: 'success' as const
    },
    {
      title: 'Pending',
      value: pendingBills.toString(),
      icon: Clock,
      description: 'Awaiting payment',
      variant: 'warning' as const
    },
    {
      title: 'Overdue',
      value: overdueBills.toString(),
      icon: AlertCircle,
      description: 'Past due date',
      variant: 'destructive' as const
    }
  ]

  if (thisMonthRevenue !== undefined && userType === 'admin') {
    stats.push({
      title: 'This Month',
      value: `₹${(thisMonthRevenue / 1000).toFixed(0)}k`,
      icon: TrendingUp,
      description: 'Current month revenue',
      variant: 'default' as const
    })
  }

  const getVariantStyles = (variant: string) => {
    switch (variant) {
      case 'success':
        return 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950'
      case 'warning':
        return 'border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950'
      case 'destructive':
        return 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950'
      default:
        return ''
    }
  }

  const getIconStyles = (variant: string) => {
    switch (variant) {
      case 'success':
        return 'text-green-600 dark:text-green-400'
      case 'warning':
        return 'text-yellow-600 dark:text-yellow-400'
      case 'destructive':
        return 'text-red-600 dark:text-red-400'
      default:
        return 'text-muted-foreground'
    }
  }

  return (
    <div className="grid gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
      {stats.map((stat) => (
        <Card key={stat.title} className={`p-3 ${getVariantStyles(stat.variant)}`}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-0">
            <CardTitle className="text-xs font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <stat.icon className={`h-3 w-3 ${getIconStyles(stat.variant)}`} />
          </CardHeader>
          <CardContent className="p-0 pt-2">
            <div className="text-lg font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}