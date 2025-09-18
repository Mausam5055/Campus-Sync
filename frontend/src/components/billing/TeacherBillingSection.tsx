import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Calculator, Users, DollarSign, Receipt, Clock, FileText, UserCheck } from "lucide-react"
import { BillingStats } from "./BillingStats"
import { BillingFilters } from "./BillingFilters"
import { BillingTable, type BillData } from "./BillingTable"
import { BillingPagination } from "./BillingPagination"
import { CreateTeacherPaymentDialog } from "./CreateTeacherPaymentDialog"
import { ProcessPayrollDialog } from "./ProcessPayrollDialog"
import { useToast } from "@/hooks/use-toast"

// Mock teacher billing data
const teacherBills: BillData[] = [
  {
    id: 'SAL-2024-001',
    employeeId: 'EMP001',
    description: 'June Salary - Dr. Sarah Johnson',
    amount: 85000,
    status: 'paid',
    dueDate: '2024-06-30',
    createdAt: '2024-06-01T00:00:00Z',
    paymentDate: '2024-06-30',
    receiptNo: 'SAL-001'
  },
  {
    id: 'SAL-2024-002',
    employeeId: 'EMP002',
    description: 'June Salary - Prof. Michael Brown',
    amount: 72000,
    status: 'paid',
    dueDate: '2024-06-30',
    createdAt: '2024-06-01T00:00:00Z',
    paymentDate: '2024-06-30',
    receiptNo: 'SAL-002'
  },
  {
    id: 'SAL-2024-003',
    employeeId: 'EMP003',
    description: 'July Salary - Dr. Emily Davis',
    amount: 78000,
    status: 'pending',
    dueDate: '2024-07-31',
    createdAt: '2024-07-01T00:00:00Z'
  },
  {
    id: 'BON-2024-001',
    employeeId: 'EMP001',
    description: 'Research Excellence Bonus',
    amount: 25000,
    status: 'paid',
    dueDate: '2024-06-15',
    createdAt: '2024-06-10T00:00:00Z',
    paymentDate: '2024-06-15',
    receiptNo: 'BON-001'
  },
  {
    id: 'OVT-2024-001',
    employeeId: 'EMP002',
    description: 'Overtime - Extra Classes',
    amount: 12000,
    status: 'pending',
    dueDate: '2024-07-20',
    createdAt: '2024-07-15T00:00:00Z'
  }
]

// Teacher pay structure data
const teacherPayStructure = {
  basePay: 65000,
  allowances: 15000,
  deductions: 8000,
  netPay: 72000,
}

// Teacher departments
const teacherDepartments = [
  'Computer Science',
  'Electronics & Communication',
  'Mechanical Engineering', 
  'Civil Engineering',
  'Mathematics',
  'Physics',
  'Chemistry'
]

export function TeacherBillingSection() {
  const { toast } = useToast()
  const [filters, setFilters] = useState({
    search: '',
    type: '',
    status: '',
    dateRange: '',
    sortBy: 'createdAt',
    sortOrder: 'desc' as 'asc' | 'desc'
  })
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(25)

  // Filter and sort bills
  const filteredBills = useMemo(() => {
    let filtered = [...teacherBills]

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      filtered = filtered.filter(bill =>
        bill.id.toLowerCase().includes(searchLower) ||
        bill.description.toLowerCase().includes(searchLower) ||
        bill.employeeId?.toLowerCase().includes(searchLower)
      )
    }

    // Status filter
    if (filters.status) {
      filtered = filtered.filter(bill => bill.status === filters.status)
    }

    // Date range filter
    if (filters.dateRange) {
      const now = new Date()
      const filterDate = new Date()
      
      switch (filters.dateRange) {
        case 'today':
          filterDate.setDate(now.getDate())
          break
        case 'week':
          filterDate.setDate(now.getDate() - 7)
          break
        case 'month':
          filterDate.setMonth(now.getMonth() - 1)
          break
        case 'quarter':
          filterDate.setMonth(now.getMonth() - 3)
          break
        case 'year':
          filterDate.setFullYear(now.getFullYear() - 1)
          break
      }
      
      filtered = filtered.filter(bill => new Date(bill.createdAt) >= filterDate)
    }

    // Sort
    filtered.sort((a, b) => {
      let aVal: any, bVal: any
      
      switch (filters.sortBy) {
        case 'amount':
          aVal = a.amount
          bVal = b.amount
          break
        case 'dueDate':
          aVal = new Date(a.dueDate)
          bVal = new Date(b.dueDate)
          break
        case 'status':
          aVal = a.status
          bVal = b.status
          break
        default:
          aVal = new Date(a.createdAt)
          bVal = new Date(b.createdAt)
      }

      if (filters.sortOrder === 'asc') {
        return aVal > bVal ? 1 : -1
      } else {
        return aVal < bVal ? 1 : -1
      }
    })

    return filtered
  }, [filters])

  // Pagination
  const paginatedBills = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize
    return filteredBills.slice(startIndex, startIndex + pageSize)
  }, [filteredBills, currentPage, pageSize])

  const totalPages = Math.ceil(filteredBills.length / pageSize)

  // Calculate stats
  const stats = useMemo(() => {
    const totalAmount = teacherBills.reduce((sum, bill) => sum + bill.amount, 0)
    const paidBills = teacherBills.filter(bill => bill.status === 'paid').length
    const pendingBills = teacherBills.filter(bill => bill.status === 'pending').length
    const overdueBills = teacherBills.filter(bill => bill.status === 'overdue').length
    
    return {
      totalAmount,
      totalBills: teacherBills.length,
      paidBills,
      pendingBills,
      overdueBills
    }
  }, [])

  const handleViewDetails = (bill: BillData) => {
    toast({
      title: "Payment Details",
      description: `Viewing details for ${bill.id}`
    })
  }

  const handleEdit = (bill: BillData) => {
    toast({
      title: "Edit Payment",
      description: `Editing ${bill.id}`
    })
  }

  const handleDownloadReceipt = (bill: BillData) => {
    toast({
      title: "Download Started",
      description: `Downloading receipt ${bill.receiptNo}`
    })
  }

  const handleExport = () => {
    toast({
      title: "Export Started",
      description: "Downloading teacher payroll data as CSV"
    })
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handlePageSizeChange = (size: number) => {
    setPageSize(size)
    setCurrentPage(1)
  }

  const [showCreatePaymentDialog, setShowCreatePaymentDialog] = useState(false)
  const [showProcessPayrollDialog, setShowProcessPayrollDialog] = useState(false)

  const handleCreateTeacherBill = () => {
    setShowCreatePaymentDialog(true)
  }

  const handleProcessPayroll = () => {
    setShowProcessPayrollDialog(true)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight">Teacher Payroll Management</h2>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleCreateTeacherBill}>
            <Plus className="mr-2 h-4 w-4" />
            Create Payment
          </Button>
          <Button onClick={handleProcessPayroll}>
            <Calculator className="mr-2 h-4 w-4" />
            Process Payroll
          </Button>
        </div>
      </div>

      {/* Pay Structure Cards */}
      <div className="grid gap-3 grid-cols-2 lg:grid-cols-4">
        <Card className="p-3">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-0">
            <CardTitle className="text-xs font-medium">Avg Base Pay</CardTitle>
            <DollarSign className="h-3 w-3 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-0 pt-2">
            <div className="text-lg font-bold">₹{(teacherPayStructure.basePay/1000).toFixed(0)}k</div>
            <p className="text-xs text-muted-foreground">Per month</p>
          </CardContent>
        </Card>
        
        <Card className="p-3">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-0">
            <CardTitle className="text-xs font-medium">Allowances</CardTitle>
            <Receipt className="h-3 w-3 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-0 pt-2">
            <div className="text-lg font-bold text-green-600">₹{(teacherPayStructure.allowances/1000).toFixed(0)}k</div>
            <p className="text-xs text-muted-foreground">HRA + Other</p>
          </CardContent>
        </Card>
        
        <Card className="p-3">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-0">
            <CardTitle className="text-xs font-medium">Deductions</CardTitle>
            <Clock className="h-3 w-3 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-0 pt-2">
            <div className="text-lg font-bold text-orange-600">₹{(teacherPayStructure.deductions/1000).toFixed(0)}k</div>
            <p className="text-xs text-muted-foreground">PF + Tax</p>
          </CardContent>
        </Card>
        
        <Card className="p-3">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-0">
            <CardTitle className="text-xs font-medium">Avg Net Pay</CardTitle>
            <FileText className="h-3 w-3 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-0 pt-2">
            <div className="text-lg font-bold">₹{(teacherPayStructure.netPay/1000).toFixed(0)}k</div>
            <p className="text-xs text-muted-foreground">Per month</p>
          </CardContent>
        </Card>
      </div>

      {/* Teacher Department Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {teacherDepartments.slice(0, 4).map((dept, index) => (
          <Card key={dept} className="p-3">
            <CardContent className="p-0">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-muted-foreground">{dept}</p>
                  <p className="text-lg font-bold">{Math.floor(Math.random() * 8) + 3}</p>
                  <p className="text-xs text-blue-600">Teachers</p>
                </div>
                <UserCheck className="h-4 w-4 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Teacher Billing Stats */}
      <BillingStats
        totalAmount={stats.totalAmount}
        totalBills={stats.totalBills}
        paidBills={stats.paidBills}
        pendingBills={stats.pendingBills}
        overdueBills={stats.overdueBills}
        userType="teacher"
      />

      {/* Filters */}
      <BillingFilters
        filters={filters}
        onFiltersChange={setFilters}
        showTypeFilter={false}
        onExport={handleExport}
      />

      {/* Teacher Payroll Table */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-lg">Teacher Payroll & Benefits</CardTitle>
              <CardDescription className="text-sm">
                Complete teacher salary and payment management
              </CardDescription>
            </div>
            <div className="text-sm text-muted-foreground">
              {filteredBills.length} of {teacherBills.length} payroll items
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-3 sm:p-6">
          <BillingTable
            bills={paginatedBills}
            onViewDetails={handleViewDetails}
            onEdit={handleEdit}
            onDownloadReceipt={handleDownloadReceipt}
            userType="admin"
            showActions={true}
          />
          
          {filteredBills.length > pageSize && (
            <div className="mt-6 border-t pt-4">
              <BillingPagination
                currentPage={currentPage}
                totalPages={totalPages}
                pageSize={pageSize}
                totalItems={filteredBills.length}
                onPageChange={handlePageChange}
                onPageSizeChange={handlePageSizeChange}
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Dialogs */}
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