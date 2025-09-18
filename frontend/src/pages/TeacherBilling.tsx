import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { GenericPageSkeleton } from "@/components/ui/page-skeleton"
import { Download, CreditCard, Receipt, DollarSign, Calendar, FileText, Clock, Hash, Banknote, PiggyBank } from "lucide-react"
import { usePageLoading } from "@/hooks/use-page-loading"
import { useIsMobile } from "@/hooks/use-mobile"
import { SEO } from "@/components/SEO"
import { BillingStats } from "@/components/billing/BillingStats"
import { BillingFilters } from "@/components/billing/BillingFilters"
import { BillingTable, type BillData } from "@/components/billing/BillingTable"
import { BillingPagination } from "@/components/billing/BillingPagination"
import { useToast } from "@/hooks/use-toast"

export default function TeacherBilling() {
  // ALL HOOKS MUST BE CALLED FIRST - NO EARLY RETURNS BEFORE THIS
  const isLoading = usePageLoading()
  const isMobile = useIsMobile()
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

  const payStructure = {
    basePay: 55000,
    allowances: 12000,
    deductions: 5000,
    netPay: 62000,
  }

  const paymentHistory: BillData[] = [
    { id: 'SAL-2024-04', employeeId: 'EMP2024001', description: 'April Salary', amount: 62000, status: 'paid', dueDate: '2024-04-30', createdAt: '2024-04-01T00:00:00Z', paymentDate: '2024-04-30', receiptNo: 'TS-2024-04' },
    { id: 'SAL-2024-05', employeeId: 'EMP2024001', description: 'May Salary', amount: 62000, status: 'paid', dueDate: '2024-05-31', createdAt: '2024-05-01T00:00:00Z', paymentDate: '2024-05-31', receiptNo: 'TS-2024-05' },
    { id: 'SAL-2024-06', employeeId: 'EMP2024001', description: 'June Salary', amount: 62000, status: 'pending', dueDate: '2024-06-30', createdAt: '2024-06-01T00:00:00Z' },
    { id: 'SAL-2024-07', employeeId: 'EMP2024001', description: 'July Salary', amount: 62000, status: 'pending', dueDate: '2024-07-31', createdAt: '2024-07-01T00:00:00Z' },
    { id: 'BON-2024-01', employeeId: 'EMP2024001', description: 'Performance Bonus', amount: 15000, status: 'paid', dueDate: '2024-06-15', createdAt: '2024-06-10T00:00:00Z', paymentDate: '2024-06-15', receiptNo: 'BN-2024-01' },
  ]

  // Filter and sort bills
  const filteredBills = useMemo(() => {
    let filtered = [...paymentHistory]

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
  }, [paymentHistory, filters])

  // Pagination
  const paginatedBills = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize
    return filteredBills.slice(startIndex, startIndex + pageSize)
  }, [filteredBills, currentPage, pageSize])

  const totalPages = Math.ceil(filteredBills.length / pageSize)

  // Calculate stats
  const stats = useMemo(() => {
    const totalAmount = paymentHistory.reduce((sum, bill) => sum + bill.amount, 0)
    const paidBills = paymentHistory.filter(bill => bill.status === 'paid').length
    const pendingBills = paymentHistory.filter(bill => bill.status === 'pending').length
    const overdueBills = paymentHistory.filter(bill => bill.status === 'overdue').length
    
    return {
      totalAmount,
      totalBills: paymentHistory.length,
      paidBills,
      pendingBills,
      overdueBills
    }
  }, [paymentHistory])

  const handleViewDetails = (bill: BillData) => {
    toast({
      title: "Payment Details",
      description: `Viewing details for ${bill.id}`
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
      description: "Downloading payment history as CSV"
    })
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handlePageSizeChange = (size: number) => {
    setPageSize(size)
    setCurrentPage(1)
  }

  // Handle loading state AFTER all hooks are called
  if (isLoading) return <GenericPageSkeleton />

  return (
    <div className="space-y-4 p-4 sm:p-6">
      <SEO title="Teacher Billing & Payments" description="View your payroll and payments" />
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="mobile-heading-large font-bold tracking-tight">Teacher Billing & Payments</h1>
          <p className="text-muted-foreground text-sm mobile-hide-description">Manage your payroll and payment history</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="w-full sm:w-auto">
            <Banknote className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Bank Details</span>
            <span className="sm:hidden">Bank</span>
          </Button>
          <Button className="w-full sm:w-auto">
            <Download className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Download Payslip</span>
            <span className="sm:hidden">Payslip</span>
          </Button>
        </div>
      </div>

      <div className="grid gap-3 grid-cols-2 lg:grid-cols-4">
        <Card className="p-3">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-0">
            <CardTitle className="text-xs font-medium">Base Pay</CardTitle>
            <DollarSign className="h-3 w-3 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-0 pt-2">
            <div className="text-lg font-bold">₹{(payStructure.basePay/1000).toFixed(0)}k</div>
            <p className="text-xs text-muted-foreground">Per month</p>
          </CardContent>
        </Card>
        <Card className="p-3">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-0">
            <CardTitle className="text-xs font-medium">Allowances</CardTitle>
            <Receipt className="h-3 w-3 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-0 pt-2">
            <div className="text-lg font-bold text-green-600">₹{(payStructure.allowances/1000).toFixed(0)}k</div>
            <p className="text-xs text-muted-foreground">HRA + Other</p>
          </CardContent>
        </Card>
        <Card className="p-3">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-0">
            <CardTitle className="text-xs font-medium">Deductions</CardTitle>
            <Clock className="h-3 w-3 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-0 pt-2">
            <div className="text-lg font-bold text-orange-600">₹{(payStructure.deductions/1000).toFixed(0)}k</div>
            <p className="text-xs text-muted-foreground">PF + Tax</p>
          </CardContent>
        </Card>
        <Card className="p-3">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-0">
            <CardTitle className="text-xs font-medium">Net Pay</CardTitle>
            <FileText className="h-3 w-3 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-0 pt-2">
            <div className="text-lg font-bold">₹{(payStructure.netPay/1000).toFixed(0)}k</div>
            <p className="text-xs text-muted-foreground">Per month</p>
          </CardContent>
        </Card>
      </div>

      {/* Stats */}
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
        onExport={handleExport}
      />

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-lg">Payment History</CardTitle>
              <CardDescription className="text-sm">Your salary and bonus payments</CardDescription>
            </div>
            <div className="text-sm text-muted-foreground">
              {filteredBills.length} of {paymentHistory.length} payments
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-3 sm:p-6">
          <BillingTable
            bills={paginatedBills}
            onViewDetails={handleViewDetails}
            onDownloadReceipt={handleDownloadReceipt}
            userType="teacher"
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
    </div>
  )
}
