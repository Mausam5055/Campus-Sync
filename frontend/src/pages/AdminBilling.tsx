import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GenericPageSkeleton } from "@/components/ui/page-skeleton"
import { usePageLoading } from "@/hooks/use-page-loading"
import { useIsMobile } from "@/hooks/use-mobile"
import { SEO } from "@/components/SEO"
import { useToast } from "@/hooks/use-toast"
import { 
  Plus, 
  Users, 
  GraduationCap, 
  CreditCard,
  TrendingUp,
  DollarSign,
  FileText,
  Settings,
  Download,
  BarChart3
} from "lucide-react"

// Import billing components
import { StudentBillingSection } from "@/components/billing/StudentBillingSection"
import { TeacherBillingSection } from "@/components/billing/TeacherBillingSection"
import { BillingAnalytics } from "@/components/billing/BillingAnalytics"
import { BillingSettings } from "@/components/billing/BillingSettings"
import { CreateBillDialog } from "@/components/billing/CreateBillDialog"
import { BulkActionsDialog } from "@/components/billing/BulkActionsDialog"
import { CreateTeacherPaymentDialog } from "@/components/billing/CreateTeacherPaymentDialog"
import { ProcessPayrollDialog } from "@/components/billing/ProcessPayrollDialog"

export default function AdminBilling() {
  const isLoading = usePageLoading()
  const isMobile = useIsMobile()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState('overview')
  
  // Dialog states
  const [showCreateBillDialog, setShowCreateBillDialog] = useState(false)
  const [showBulkDialog, setBulkDialog] = useState(false)
  const [bulkAction, setBulkAction] = useState<'bulk_bill' | 'bulk_payment' | null>(null)
  const [showCreatePaymentDialog, setShowCreatePaymentDialog] = useState(false)
  const [showProcessPayrollDialog, setShowProcessPayrollDialog] = useState(false)
  const [showSettingsTab, setShowSettingsTab] = useState(false)

  // Event handlers
  const handleExportReport = () => {
    toast({
      title: "Export Started",
      description: "Downloading comprehensive billing report as PDF"
    })
  }

  const handleOpenSettings = () => {
    setShowSettingsTab(true)
    setActiveTab('settings')
  }

  const handleCreateStudentBill = () => {
    setShowCreateBillDialog(true)
  }

  const handleProcessPayment = () => {
    setBulkAction('bulk_payment')
    setBulkDialog(true)
  }

  const handleCreateTeacherPayment = () => {
    setShowCreatePaymentDialog(true)
  }

  const handleProcessPayroll = () => {
    setShowProcessPayrollDialog(true)
  }

  const handleGenerateReport = () => {
    toast({
      title: "Report Generation",
      description: "Generating comprehensive financial report"
    })
  }

  if (isLoading) return <GenericPageSkeleton />

  return (
    <div className="space-y-6 p-4 sm:p-6 max-w-7xl mx-auto">
      <SEO title="Admin Billing Management" description="Comprehensive billing management system for students and teachers" />
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="mobile-heading-large font-bold tracking-tight text-foreground">Billing Management</h1>
          <p className="text-muted-foreground text-sm sm:text-base mobile-hide-description">
            Comprehensive billing management for students and teachers
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <Button variant="outline" size="sm" onClick={handleExportReport} className="w-full sm:w-auto">
            <Download className="mr-2 h-4 w-4" />
            {!isMobile && "Export Report"}
          </Button>
          <Button variant="outline" size="sm" onClick={handleOpenSettings} className="w-full sm:w-auto">
            <Settings className="mr-2 h-4 w-4" />
            {!isMobile && "Settings"}
          </Button>
        </div>
      </div>

      {/* Quick Stats Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-semibold text-muted-foreground">Total Revenue</CardTitle>
            <div className="p-2 rounded-lg bg-green-500/10">
              <DollarSign className="h-4 w-4 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold text-foreground">₹45.2L</div>
            <p className="text-xs text-muted-foreground mt-1">+12% from last month</p>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-semibold text-muted-foreground">Student Bills</CardTitle>
            <div className="p-2 rounded-lg bg-blue-500/10">
              <GraduationCap className="h-4 w-4 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold text-foreground">284</div>
            <p className="text-xs text-muted-foreground mt-1">45 pending</p>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-semibold text-muted-foreground">Teacher Payroll</CardTitle>
            <div className="p-2 rounded-lg bg-purple-500/10">
              <Users className="h-4 w-4 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold text-foreground">67</div>
            <p className="text-xs text-muted-foreground mt-1">5 pending</p>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-semibold text-muted-foreground">Collection Rate</CardTitle>
            <div className="p-2 rounded-lg bg-orange-500/10">
              <TrendingUp className="h-4 w-4 text-orange-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold text-foreground">94.2%</div>
            <p className="text-xs text-muted-foreground mt-1">+2.1% this month</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className={`grid w-full ${showSettingsTab ? 'grid-cols-5' : 'grid-cols-4'} gap-1`}>
          <TabsTrigger value="overview" className="flex items-center gap-2 text-xs sm:text-sm font-medium">
            <FileText className="h-4 w-4" />
            {!isMobile && "Overview"}
          </TabsTrigger>
          <TabsTrigger value="students" className="flex items-center gap-2 text-xs sm:text-sm font-medium">
            <GraduationCap className="h-4 w-4" />
            {!isMobile && "Student Billing"}
          </TabsTrigger>
          <TabsTrigger value="teachers" className="flex items-center gap-2 text-xs sm:text-sm font-medium">
            <Users className="h-4 w-4" />
            {!isMobile && "Teacher Payroll"}
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2 text-xs sm:text-sm font-medium">
            <BarChart3 className="h-4 w-4" />
            {!isMobile && "Analytics"}
          </TabsTrigger>
          {showSettingsTab && (
            <TabsTrigger value="settings" className="flex items-center gap-2 text-xs sm:text-sm font-medium">
              <Settings className="h-4 w-4" />
              {!isMobile && "Settings"}
            </TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Recent Student Bills */}
            <Card className="border-l-4 border-l-blue-500/20 hover:border-l-blue-500/60 transition-colors">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg font-bold text-foreground">Recent Student Bills</CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">Latest fee transactions</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" onClick={handleCreateStudentBill} className="hover:bg-primary hover:text-primary-foreground transition-colors">
                    <Plus className="mr-2 h-4 w-4" />
                    {!isMobile && "Create Bill"}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { id: "TUI-2024-001", student: "John Doe", amount: "₹75,000", type: "Tuition Fee", status: "paid" },
                    { id: "LAB-2024-002", student: "Jane Smith", amount: "₹5,000", type: "Lab Fee", status: "pending" },
                    { id: "ACC-2024-003", student: "Mike Johnson", amount: "₹45,000", type: "Accommodation", status: "overdue" }
                  ].map((bill) => (
                    <div key={bill.id} className="flex items-center justify-between p-4 border border-border/50 rounded-xl hover:bg-muted/30 transition-colors">
                      <div>
                        <p className="font-semibold text-sm text-foreground">{bill.student}</p>
                        <p className="text-xs text-muted-foreground font-medium">{bill.type} • {bill.id}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-sm text-foreground">{bill.amount}</p>
                        <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                          bill.status === 'paid' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                          bill.status === 'pending' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                          'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                        }`}>
                          {bill.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Teacher Payments */}
            <Card className="border-l-4 border-l-purple-500/20 hover:border-l-purple-500/60 transition-colors">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg font-bold text-foreground">Recent Teacher Payments</CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">Latest payroll transactions</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" onClick={handleProcessPayroll} className="hover:bg-primary hover:text-primary-foreground transition-colors">
                    <Plus className="mr-2 h-4 w-4" />
                    {!isMobile && "Process Payroll"}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { id: "SAL-2024-001", teacher: "Dr. Sarah Johnson", amount: "₹85,000", type: "Monthly Salary", status: "paid" },
                    { id: "BON-2024-001", teacher: "Prof. Michael Brown", amount: "₹25,000", type: "Performance Bonus", status: "pending" },
                    { id: "SAL-2024-002", teacher: "Dr. Emily Davis", amount: "₹78,000", type: "Monthly Salary", status: "pending" }
                  ].map((payment) => (
                    <div key={payment.id} className="flex items-center justify-between p-4 border border-border/50 rounded-xl hover:bg-muted/30 transition-colors">
                      <div>
                        <p className="font-semibold text-sm text-foreground">{payment.teacher}</p>
                        <p className="text-xs text-muted-foreground font-medium">{payment.type} • {payment.id}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-sm text-foreground">{payment.amount}</p>
                        <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                          payment.status === 'paid' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                          'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                        }`}>
                          {payment.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card className="border-t-4 border-t-primary/20 hover:border-t-primary/60 transition-colors">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-foreground">Quick Actions</CardTitle>
              <CardDescription className="text-sm text-muted-foreground">Common billing tasks and operations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <Button variant="outline" className="h-16 sm:h-20 flex-col gap-2 hover:bg-primary hover:text-primary-foreground transition-colors" onClick={handleCreateStudentBill}>
                  <Plus className="h-5 w-5 sm:h-6 sm:w-6" />
                  <span className="text-xs sm:text-sm font-medium">Create Student Bill</span>
                </Button>
                <Button variant="outline" className="h-16 sm:h-20 flex-col gap-2 hover:bg-primary hover:text-primary-foreground transition-colors" onClick={handleProcessPayment}>
                  <CreditCard className="h-5 w-5 sm:h-6 sm:w-6" />
                  <span className="text-xs sm:text-sm font-medium">Process Payment</span>
                </Button>
                <Button variant="outline" className="h-16 sm:h-20 flex-col gap-2 hover:bg-primary hover:text-primary-foreground transition-colors" onClick={handleCreateTeacherPayment}>
                  <Users className="h-5 w-5 sm:h-6 sm:w-6" />
                  <span className="text-xs sm:text-sm font-medium">Teacher Payment</span>
                </Button>
                <Button variant="outline" className="h-16 sm:h-20 flex-col gap-2 hover:bg-primary hover:text-primary-foreground transition-colors" onClick={handleGenerateReport}>
                  <Download className="h-5 w-5 sm:h-6 sm:w-6" />
                  <span className="text-xs sm:text-sm font-medium">Generate Report</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="students">
          <StudentBillingSection />
        </TabsContent>

        <TabsContent value="teachers">
          <TeacherBillingSection />
        </TabsContent>

        <TabsContent value="analytics">
          <BillingAnalytics />
        </TabsContent>

        {showSettingsTab && (
          <TabsContent value="settings">
            <BillingSettings />
          </TabsContent>
        )}
      </Tabs>

      {/* Dialogs */}
      <CreateBillDialog 
        open={showCreateBillDialog} 
        onOpenChange={setShowCreateBillDialog} 
      />
      <BulkActionsDialog 
        open={showBulkDialog} 
        onOpenChange={setBulkDialog}
        action={bulkAction}
      />
      <CreateTeacherPaymentDialog 
        open={showCreatePaymentDialog} 
        onOpenChange={setShowCreatePaymentDialog} 
      />
      <ProcessPayrollDialog 
        open={showProcessPayrollDialog} 
        onOpenChange={setShowProcessPayrollDialog} 
      />
    </div>
  )
}