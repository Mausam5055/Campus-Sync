import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, DollarSign, Users, GraduationCap, School, Calendar, Target } from "lucide-react"

export function BillingAnalytics() {
  // Mock analytics data
  const analyticsData = {
    monthlyRevenue: 4520000,
    revenueGrowth: 12.5,
    collectionRate: 94.2,
    avgBillValue: 15890,
    studentBills: 284,
    teacherPayroll: 67,
    overdueAmount: 125000,
    branches: 6
  }

  const monthlyTrends = [
    { month: 'Jan', revenue: 3800000, collection: 92 },
    { month: 'Feb', revenue: 4100000, collection: 89 },
    { month: 'Mar', revenue: 4300000, collection: 91 },
    { month: 'Apr', revenue: 4200000, collection: 93 },
    { month: 'May', revenue: 4400000, collection: 95 },
    { month: 'Jun', revenue: 4520000, collection: 94 }
  ]

  const categoryBreakdown = [
    { category: 'Tuition Fees', amount: 2800000, percentage: 62 },
    { category: 'Accommodation', amount: 720000, percentage: 16 },
    { category: 'Lab Fees', amount: 450000, percentage: 10 },
    { category: 'Library & Sports', amount: 360000, percentage: 8 },
    { category: 'Miscellaneous', amount: 190000, percentage: 4 }
  ]

  const departmentStats = [
    { dept: 'Computer Science', teachers: 12, totalPay: 984000 },
    { dept: 'Electronics & Comm', teachers: 8, totalPay: 672000 },
    { dept: 'Mechanical Eng', teachers: 9, totalPay: 756000 },
    { dept: 'Civil Engineering', teachers: 7, totalPay: 588000 }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight">Billing Analytics</h2>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Monthly Revenue</p>
                <p className="text-2xl font-bold">₹{(analyticsData.monthlyRevenue / 100000).toFixed(1)}L</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-green-600" />
                  <p className="text-xs text-green-600">+{analyticsData.revenueGrowth}% from last month</p>
                </div>
              </div>
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Collection Rate</p>
                <p className="text-2xl font-bold">{analyticsData.collectionRate}%</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-blue-600" />
                  <p className="text-xs text-blue-600">+2.1% improvement</p>
                </div>
              </div>
              <Target className="h-6 w-6 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Bill Value</p>
                <p className="text-2xl font-bold">₹{analyticsData.avgBillValue.toLocaleString()}</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingDown className="h-3 w-3 text-orange-600" />
                  <p className="text-xs text-orange-600">-3.2% vs last month</p>
                </div>
              </div>
              <Calendar className="h-6 w-6 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Overdue Amount</p>
                <p className="text-2xl font-bold">₹{(analyticsData.overdueAmount / 1000).toFixed(0)}k</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingDown className="h-3 w-3 text-red-600" />
                  <p className="text-xs text-red-600">-15% reduction</p>
                </div>
              </div>
              <TrendingDown className="h-6 w-6 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue Trends</CardTitle>
          <CardDescription>Monthly revenue and collection rate over the last 6 months</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {monthlyTrends.map((trend) => (
              <div key={trend.month} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-12 text-sm font-medium">{trend.month}</div>
                  <div>
                    <p className="font-medium">₹{(trend.revenue / 100000).toFixed(1)}L</p>
                    <p className="text-xs text-muted-foreground">Revenue</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">{trend.collection}%</p>
                  <p className="text-xs text-muted-foreground">Collection</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Revenue Breakdown and Department Stats */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Fee Category Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue by Category</CardTitle>
            <CardDescription>Breakdown of student fee collections</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {categoryBreakdown.map((category) => (
                <div key={category.category} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{category.category}</span>
                    <div className="text-right">
                      <span className="text-sm font-medium">₹{(category.amount / 100000).toFixed(1)}L</span>
                      <Badge variant="secondary" className="ml-2 text-xs">
                        {category.percentage}%
                      </Badge>
                    </div>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full" 
                      style={{ width: `${category.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Department Payroll Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Department Payroll</CardTitle>
            <CardDescription>Teacher count and total payroll by department</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {departmentStats.map((dept) => (
                <div key={dept.dept} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <School className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium text-sm">{dept.dept}</p>
                      <p className="text-xs text-muted-foreground">{dept.teachers} teachers</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">₹{(dept.totalPay / 100000).toFixed(1)}L</p>
                    <p className="text-xs text-muted-foreground">Monthly payroll</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <GraduationCap className="h-6 w-6 mx-auto mb-2 text-blue-600" />
            <div className="text-2xl font-bold">{analyticsData.studentBills}</div>
            <p className="text-sm text-muted-foreground">Active Student Bills</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Users className="h-6 w-6 mx-auto mb-2 text-green-600" />
            <div className="text-2xl font-bold">{analyticsData.teacherPayroll}</div>
            <p className="text-sm text-muted-foreground">Teacher Payroll Items</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <School className="h-6 w-6 mx-auto mb-2 text-purple-600" />
            <div className="text-2xl font-bold">{analyticsData.branches}</div>
            <p className="text-sm text-muted-foreground">Academic Branches</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Target className="h-6 w-6 mx-auto mb-2 text-orange-600" />
            <div className="text-2xl font-bold">98%</div>
            <p className="text-sm text-muted-foreground">Target Achievement</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}