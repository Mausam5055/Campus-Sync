import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Filter, UserPlus, GraduationCap, DollarSign, AlertCircle, CheckCircle2 } from "lucide-react"
import { BillingStats } from "./BillingStats"
import { BillingFilters } from "./BillingFilters"
import { BillingTable, type BillData } from "./BillingTable"
import { BillingPagination } from "./BillingPagination"
import { CreateBillDialog } from "./CreateBillDialog"
import { BulkBillDialog } from "./BulkBillDialog"
import { useToast } from "@/hooks/use-toast"

// Mock student billing data
const studentBills: BillData[] = [
  {
    id: 'TUI-2024-001',
    studentId: 'STU001',
    description: 'Semester 8 Tuition Fee',
    amount: 75000,
    dueDate: '2024-07-15',
    createdAt: '2024-06-01T00:00:00Z',
    status: 'paid',
    paymentDate: '2024-07-10',
    receiptNo: 'RCP-STU-001'
  },
  {
    id: 'LAB-2024-002',
    studentId: 'STU002',
    description: 'Computer Science Lab Fee',
    amount: 8500,
    dueDate: '2024-08-15',
    createdAt: '2024-07-01T00:00:00Z',
    status: 'pending'
  },
  {
    id: 'ACC-2024-003',
    studentId: 'STU003',
    description: 'Hostel Accommodation Fee',
    amount: 45000,
    dueDate: '2024-07-01',
    createdAt: '2024-06-15T00:00:00Z',
    status: 'overdue'
  },
  {
    id: 'LIB-2024-004',
    studentId: 'STU004',
    description: 'Library Fee',
    amount: 2000,
    dueDate: '2024-09-01',
    createdAt: '2024-08-01T00:00:00Z',
    status: 'pending'
  },
  {
    id: 'SPT-2024-005',
    studentId: 'STU005',
    description: 'Sports Fee - Annual',
    amount: 3500,
    dueDate: '2024-07-31',
    createdAt: '2024-06-20T00:00:00Z',
    status: 'paid',
    paymentDate: '2024-07-25',
    receiptNo: 'RCP-STU-002'
  }
]

export function StudentBillingSection() {
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
  const [createBillOpen, setCreateBillOpen] = useState(false)
  const [bulkBillOpen, setBulkBillOpen] = useState(false)

  // Filter and sort bills
  const filteredBills = useMemo(() => {
    let filtered = [...studentBills]

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
  }, [filters])

  // Pagination
  const paginatedBills = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize
    return filteredBills.slice(startIndex, startIndex + pageSize)
  }, [filteredBills, currentPage, pageSize])

  const totalPages = Math.ceil(filteredBills.length / pageSize)

  // Calculate stats
  const stats = useMemo(() => {
    const totalAmount = studentBills.reduce((sum, bill) => sum + bill.amount, 0)
    const paidBills = studentBills.filter(bill => bill.status === 'paid').length
    const pendingBills = studentBills.filter(bill => bill.status === 'pending').length
    const overdueBills = studentBills.filter(bill => bill.status === 'overdue').length
    
    return {
      totalAmount,
      totalBills: studentBills.length,
      paidBills,
      pendingBills,
      overdueBills
    }
  }, [])

  const handleViewDetails = (bill: BillData) => {
    toast({
      title: "Bill Details",
      description: `Viewing details for ${bill.id}`
    })
  }

  const handleEdit = (bill: BillData) => {
    toast({
      title: "Edit Bill",
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
      description: "Downloading student billing data as CSV"
    })
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handlePageSizeChange = (size: number) => {
    setPageSize(size)
    setCurrentPage(1)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight">Student Fee Management</h2>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setCreateBillOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Create Bill
          </Button>
          <Button onClick={() => setBulkBillOpen(true)}>
            <UserPlus className="mr-2 h-4 w-4" />
            Bulk Create
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Collection</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{(stats.totalAmount / 100000).toFixed(1)}L</div>
            <p className="text-xs text-muted-foreground">Across all students</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Students</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalBills}</div>
            <p className="text-xs text-muted-foreground">With billing records</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Bills</CardTitle>
            <AlertCircle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.pendingBills}</div>
            <p className="text-xs text-muted-foreground">Awaiting payment</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Collection Rate</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {Math.round((stats.paidBills / stats.totalBills) * 100)}%
            </div>
            <p className="text-xs text-muted-foreground">Payment success rate</p>
          </CardContent>
        </Card>
      </div>

      {/* Stats Component */}
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
              <CardTitle className="text-lg">Student Fee Bills</CardTitle>
              <CardDescription className="text-sm">
                Comprehensive student billing and fee management
              </CardDescription>
            </div>
            <div className="text-sm text-muted-foreground">
              {filteredBills.length} of {studentBills.length} bills
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
      <CreateBillDialog open={createBillOpen} onOpenChange={setCreateBillOpen} />
      <BulkBillDialog open={bulkBillOpen} onOpenChange={setBulkBillOpen} />
    </div>
  )
}