import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  GraduationCap, 
  Home, 
  Bus, 
  BookOpen, 
  Microscope, 
  FileText, 
  Trophy, 
  MoreHorizontal,
  TrendingUp,
  Users,
  DollarSign,
  Calendar
} from "lucide-react"

const categoryData = [
  {
    id: 'tuition',
    name: 'Tuition Fees',
    icon: GraduationCap,
    totalBills: 1245,
    totalAmount: 18675000,
    paidBills: 1100,
    pendingBills: 145,
    overdueBills: 0,
    color: 'blue'
  },
  {
    id: 'accommodation',
    name: 'Accommodation',
    icon: Home,
    totalBills: 456,
    totalAmount: 5472000,
    paidBills: 398,
    pendingBills: 58,
    overdueBills: 0,
    color: 'green'
  },
  {
    id: 'transport',
    name: 'Bus Transport',
    icon: Bus,
    totalBills: 789,
    totalAmount: 2367000,
    paidBills: 720,
    pendingBills: 69,
    overdueBills: 0,
    color: 'orange'
  },
  {
    id: 'library',
    name: 'Library Fees',
    icon: BookOpen,
    totalBills: 234,
    totalAmount: 468000,
    paidBills: 210,
    pendingBills: 24,
    overdueBills: 0,
    color: 'purple'
  },
  {
    id: 'lab',
    name: 'Laboratory Fees',
    icon: Microscope,
    totalBills: 567,
    totalAmount: 2268000,
    paidBills: 512,
    pendingBills: 55,
    overdueBills: 0,
    color: 'cyan'
  },
  {
    id: 'exam',
    name: 'Examination Fees',
    icon: FileText,
    totalBills: 890,
    totalAmount: 1780000,
    paidBills: 845,
    pendingBills: 45,
    overdueBills: 0,
    color: 'red'
  },
  {
    id: 'sports',
    name: 'Sports Fees',
    icon: Trophy,
    totalBills: 123,
    totalAmount: 369000,
    paidBills: 115,
    pendingBills: 8,
    overdueBills: 0,
    color: 'yellow'
  }
]

export function BillCategoryManager() {
  const [selectedCategory, setSelectedCategory] = useState('tuition')

  const totalRevenue = categoryData.reduce((sum, cat) => sum + cat.totalAmount, 0)
  const totalBills = categoryData.reduce((sum, cat) => sum + cat.totalBills, 0)
  const totalPaid = categoryData.reduce((sum, cat) => sum + cat.paidBills, 0)

  const getCategoryColor = (color: string) => {
    const colors = {
      blue: 'bg-blue-500',
      green: 'bg-green-500',
      orange: 'bg-orange-500',
      purple: 'bg-purple-500',
      cyan: 'bg-cyan-500',
      red: 'bg-red-500',
      yellow: 'bg-yellow-500'
    }
    return colors[color as keyof typeof colors] || 'bg-gray-500'
  }

  const selectedCategoryData = categoryData.find(cat => cat.id === selectedCategory)

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold">₹{(totalRevenue / 1000000).toFixed(1)}M</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Bills</p>
                <p className="text-2xl font-bold">{totalBills.toLocaleString()}</p>
              </div>
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Collection Rate</p>
                <p className="text-2xl font-bold">{((totalPaid / totalBills) * 100).toFixed(1)}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Category Overview</TabsTrigger>
          <TabsTrigger value="details">Detailed View</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categoryData.map((category) => {
              const Icon = category.icon
              const collectionRate = (category.paidBills / category.totalBills) * 100
              
              return (
                <Card 
                  key={category.id} 
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className={`p-2 rounded-lg ${getCategoryColor(category.color)} bg-opacity-20`}>
                          <Icon className={`h-5 w-5 text-${category.color}-600`} />
                        </div>
                        <div>
                          <CardTitle className="text-sm">{category.name}</CardTitle>
                          <CardDescription className="text-xs">
                            {category.totalBills} bills
                          </CardDescription>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-muted-foreground">Revenue</span>
                          <span className="font-medium">₹{(category.totalAmount / 100000).toFixed(1)}L</span>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span>Collection Rate</span>
                          <span>{collectionRate.toFixed(1)}%</span>
                        </div>
                        <Progress value={collectionRate} className="h-2" />
                      </div>

                      <div className="flex justify-between text-xs">
                        <div className="flex items-center space-x-1">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span>Paid: {category.paidBills}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                          <span>Pending: {category.pendingBills}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="details" className="space-y-4">
          {selectedCategoryData && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`p-3 rounded-lg ${getCategoryColor(selectedCategoryData.color)} bg-opacity-20`}>
                      <selectedCategoryData.icon className={`h-6 w-6 text-${selectedCategoryData.color}-600`} />
                    </div>
                    <div>
                      <CardTitle>{selectedCategoryData.name}</CardTitle>
                      <CardDescription>Detailed analytics and metrics</CardDescription>
                    </div>
                  </div>
                  <Badge variant="outline">
                    {selectedCategoryData.totalBills} Total Bills
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {selectedCategoryData.paidBills}
                    </div>
                    <div className="text-sm text-muted-foreground">Paid Bills</div>
                    <div className="text-xs text-green-600">
                      ₹{(selectedCategoryData.paidBills * (selectedCategoryData.totalAmount / selectedCategoryData.totalBills) / 100000).toFixed(1)}L
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-600">
                      {selectedCategoryData.pendingBills}
                    </div>
                    <div className="text-sm text-muted-foreground">Pending Bills</div>
                    <div className="text-xs text-yellow-600">
                      ₹{(selectedCategoryData.pendingBills * (selectedCategoryData.totalAmount / selectedCategoryData.totalBills) / 100000).toFixed(1)}L
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">
                      {selectedCategoryData.overdueBills}
                    </div>
                    <div className="text-sm text-muted-foreground">Overdue Bills</div>
                    <div className="text-xs text-red-600">₹0</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-2xl font-bold">
                      {((selectedCategoryData.paidBills / selectedCategoryData.totalBills) * 100).toFixed(1)}%
                    </div>
                    <div className="text-sm text-muted-foreground">Collection Rate</div>
                    <div className="text-xs text-muted-foreground">Target: 95%</div>
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="font-medium mb-3">Payment Status Distribution</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Paid</span>
                      <span>{((selectedCategoryData.paidBills / selectedCategoryData.totalBills) * 100).toFixed(1)}%</span>
                    </div>
                    <Progress value={(selectedCategoryData.paidBills / selectedCategoryData.totalBills) * 100} className="h-2" />
                    
                    <div className="flex items-center justify-between text-sm">
                      <span>Pending</span>
                      <span>{((selectedCategoryData.pendingBills / selectedCategoryData.totalBills) * 100).toFixed(1)}%</span>
                    </div>
                    <Progress value={(selectedCategoryData.pendingBills / selectedCategoryData.totalBills) * 100} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}