import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Calendar, User, Download, Eye, Edit, MoreHorizontal, Hash } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export interface BillData {
  id: string
  type?: 'student' | 'teacher'
  refId?: string
  studentId?: string
  employeeId?: string
  description: string
  amount: number
  dueDate: string
  createdAt: string
  status: 'paid' | 'pending' | 'overdue' | 'cancelled'
  paymentDate?: string
  receiptNo?: string
}

interface BillingTableProps {
  bills: BillData[]
  onViewDetails?: (bill: BillData) => void
  onEdit?: (bill: BillData) => void
  onDownloadReceipt?: (bill: BillData) => void
  showActions?: boolean
  userType?: 'admin' | 'teacher' | 'student'
  isLoading?: boolean
}

export function BillingTable({ 
  bills, 
  onViewDetails, 
  onEdit, 
  onDownloadReceipt, 
  showActions = true,
  userType = 'admin',
  isLoading = false
}: BillingTableProps) {
  const [selectedBills, setSelectedBills] = useState<string[]>([])

  const getStatusBadge = (status: string) => {
    const variants = {
      paid: 'default',
      pending: 'secondary',
      overdue: 'destructive',
      cancelled: 'outline'
    } as const
    
    return (
      <Badge variant={variants[status as keyof typeof variants] || 'secondary'}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  const getRefId = (bill: BillData) => {
    return bill.refId || bill.studentId || bill.employeeId || 'N/A'
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    })
  }

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-muted animate-pulse rounded" />
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      {/* Desktop Table View */}
      <div className="hidden lg:block rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Bill ID</TableHead>
              {userType === 'admin' && <TableHead>Type</TableHead>}
              <TableHead>Ref ID</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Status</TableHead>
              {showActions && <TableHead className="w-[100px]">Actions</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {bills.map((bill) => (
              <TableRow key={bill.id}>
                <TableCell className="font-mono font-semibold">
                  #{bill.id.slice(-8)}
                </TableCell>
                {userType === 'admin' && (
                  <TableCell className="uppercase font-medium">
                    {bill.type || 'N/A'}
                  </TableCell>
                )}
                <TableCell className="font-mono">{getRefId(bill)}</TableCell>
                <TableCell className="max-w-[200px] truncate">{bill.description}</TableCell>
                <TableCell className="text-right font-semibold">
                  ₹{bill.amount.toLocaleString('en-IN')}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    {formatDate(bill.dueDate)}
                  </div>
                </TableCell>
                <TableCell>{getStatusBadge(bill.status)}</TableCell>
                {showActions && (
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {onViewDetails && (
                          <DropdownMenuItem onClick={() => onViewDetails(bill)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                        )}
                        {onEdit && bill.status === 'pending' && (
                          <DropdownMenuItem onClick={() => onEdit(bill)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                        )}
                        {onDownloadReceipt && bill.status === 'paid' && bill.receiptNo && (
                          <>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => onDownloadReceipt(bill)}>
                              <Download className="mr-2 h-4 w-4" />
                              Download Receipt
                            </DropdownMenuItem>
                          </>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                )}
              </TableRow>
            ))}
            {bills.length === 0 && (
              <TableRow>
                <TableCell 
                  colSpan={userType === 'admin' ? (showActions ? 8 : 7) : (showActions ? 7 : 6)} 
                  className="text-center text-muted-foreground py-8"
                >
                  No bills found matching your criteria
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden space-y-3">
        {bills.map((bill) => (
          <Card key={bill.id} className="p-4">
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="font-mono font-bold text-sm">#{bill.id.slice(-8)}</div>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    {userType === 'admin' && (
                      <span className="uppercase text-sm font-medium">{bill.type || 'N/A'}</span>
                    )}
                    <span className="font-mono text-sm">{getRefId(bill)}</span>
                  </div>
                </div>
                <div className="text-right space-y-1">
                  <div className="font-bold text-lg">₹{bill.amount.toLocaleString('en-IN')}</div>
                  {getStatusBadge(bill.status)}
                </div>
              </div>
              
              <div className="text-sm">{bill.description}</div>
              
              <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t">
                <div className="flex items-center gap-2">
                  <Calendar className="h-3 w-3" />
                  Due: {formatDate(bill.dueDate)}
                </div>
                <div>Created: {formatDate(bill.createdAt)}</div>
              </div>

              {showActions && (
                <div className="flex gap-2 pt-2 border-t">
                  {onViewDetails && (
                    <Button variant="outline" size="sm" onClick={() => onViewDetails(bill)}>
                      <Eye className="mr-2 h-4 w-4" />
                      View
                    </Button>
                  )}
                  {onEdit && bill.status === 'pending' && (
                    <Button variant="outline" size="sm" onClick={() => onEdit(bill)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </Button>
                  )}
                  {onDownloadReceipt && bill.status === 'paid' && bill.receiptNo && (
                    <Button variant="outline" size="sm" onClick={() => onDownloadReceipt(bill)}>
                      <Download className="mr-2 h-4 w-4" />
                      Receipt
                    </Button>
                  )}
                </div>
              )}
            </div>
          </Card>
        ))}
        {bills.length === 0 && (
          <div className="text-center text-muted-foreground py-8">
            No bills found matching your criteria
          </div>
        )}
      </div>
    </>
  )
}