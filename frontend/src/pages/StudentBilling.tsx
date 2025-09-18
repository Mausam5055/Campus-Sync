import { useEffect, useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { GenericPageSkeleton } from "@/components/ui/page-skeleton"
import { Download, CreditCard, Receipt, DollarSign, Calendar, FileText, Clock, Hash, Bell } from "lucide-react"
import { usePageLoading } from "@/hooks/use-page-loading"
import { useIsMobile } from "@/hooks/use-mobile"
import { SEO } from "@/components/SEO"
import { BillingStats } from "@/components/billing/BillingStats"
import { BillingFilters } from "@/components/billing/BillingFilters"
import { BillingTable, type BillData } from "@/components/billing/BillingTable"
import { BillingPagination } from "@/components/billing/BillingPagination"
import { useToast } from "@/hooks/use-toast"

export default function StudentBilling() {
  const isLoading = usePageLoading()
  const isMobile = useIsMobile()
  const { toast } = useToast()
  const [bills, setBills] = useState<BillData[]>([])
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

  // Mock student billing data
  useEffect(() => {
    const mockBills: BillData[] = [
      {
        id: 'STU-2024-001',
        studentId: 'ST2024001',
        description: 'Semester 8 Tuition Fee',
        amount: 75000,
        dueDate: '2024-07-15',
        createdAt: '2024-06-01T00:00:00Z',
        status: 'paid',
        paymentDate: '2024-07-10',
        receiptNo: 'RCP-STU-001'
      },
      {
        id: 'STU-2024-002',
        studentId: 'ST2024001',
        description: 'Library Fee',
        amount: 2000,
        dueDate: '2024-08-15',
        createdAt: '2024-07-01T00:00:00Z',
        status: 'pending'
      },
      {
        id: 'STU-2024-003',
        studentId: 'ST2024001',
        description: 'Lab Fee - Computer Science',
        amount: 5000,
        dueDate: '2024-07-01',
        createdAt: '2024-06-15T00:00:00Z',
        status: 'overdue'
      },
      {
        id: 'STU-2024-004',
        studentId: 'ST2024001',
        description: 'Sports Fee',
        amount: 1500,
        dueDate: '2024-09-01',
        createdAt: '2024-08-01T00:00:00Z',
        status: 'pending'
      },
      {
        id: 'STU-2024-005',
        studentId: 'ST2024001',
        description: 'Hostel Fee - Q1',
        amount: 25000,
        dueDate: '2024-07-31',
        createdAt: '2024-06-20T00:00:00Z',
        status: 'paid',
        paymentDate: '2024-07-25',
        receiptNo: 'RCP-STU-002'
      }
    ]
    
    const saved = localStorage.getItem('campussync-student-bills')
    if (saved) {
      setBills(JSON.parse(saved))
    } else {
      setBills(mockBills)
      localStorage.setItem('campussync-student-bills', JSON.stringify(mockBills))
    }
  }, [])

  // Filter and sort bills
  const filteredBills = useMemo(() => {
    let filtered = [...bills]

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      filtered = filtered.filter(bill =>
        bill.id.toLowerCase().includes(searchLower) ||
        bill.description.toLowerCase().includes(searchLower) ||
        bill.studentId?.toLowerCase().includes(searchLower)
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
  }, [bills, filters])

  // Pagination
  const paginatedBills = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize
    return filteredBills.slice(startIndex, startIndex + pageSize)
  }, [filteredBills, currentPage, pageSize])

  const totalPages = Math.ceil(filteredBills.length / pageSize)

  // Calculate stats
  const stats = useMemo(() => {
    const totalAmount = bills.reduce((sum, bill) => sum + bill.amount, 0)
    const paidBills = bills.filter(bill => bill.status === 'paid').length
    const pendingBills = bills.filter(bill => bill.status === 'pending').length
    const overdueBills = bills.filter(bill => bill.status === 'overdue').length
    
    return {
      totalAmount,
      totalBills: bills.length,
      paidBills,
      pendingBills,
      overdueBills
    }
  }, [bills])

  const handleViewDetails = (bill: BillData) => {
    toast({
      title: "Bill Details",
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
      description: "Downloading billing data as CSV"
    })
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handlePageSizeChange = (size: number) => {
    setPageSize(size)
    setCurrentPage(1)
  }

  if (isLoading) return <GenericPageSkeleton />

  return (
    <div className="space-y-4 p-4 sm:p-6">
      <SEO title="Student Billing & Payments" description="View your fees and payment history" />
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-3xl font-bold tracking-tight">Billing & Payments</h1>
          <p className="text-muted-foreground text-sm hidden sm:block">Manage your fees and payment history</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="w-full sm:w-auto">
            <Bell className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Payment Reminders</span>
            <span className="sm:hidden">Reminders</span>
          </Button>
          <Button className="w-full sm:w-auto">
            <CreditCard className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Make Payment</span>
            <span className="sm:hidden">Pay Now</span>
          </Button>
        </div>
      </div>

      {/* Stats */}
      <BillingStats
        totalAmount={stats.totalAmount}
        totalBills={stats.totalBills}
        paidBills={stats.paidBills}
        pendingBills={stats.pendingBills}
        overdueBills={stats.overdueBills}
        userType="student"
      />

      {/* Filters */}
      <BillingFilters
        filters={filters}
        onFiltersChange={setFilters}
        onExport={handleExport}
      />

      {/* Bills Table */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-lg">Fee Bills & Payments</CardTitle>
              <CardDescription className="text-sm">
                Your academic fees and payment history
              </CardDescription>
            </div>
            <div className="text-sm text-muted-foreground">
              {filteredBills.length} of {bills.length} bills
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-3 sm:p-6">
          <BillingTable
            bills={paginatedBills}
            onViewDetails={handleViewDetails}
            onDownloadReceipt={handleDownloadReceipt}
            userType="student"
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