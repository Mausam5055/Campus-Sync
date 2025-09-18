import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { usePageLoading } from "@/hooks/use-page-loading"
import { GenericPageSkeleton } from "@/components/ui/page-skeleton"
import { Download, CreditCard, Receipt, DollarSign, Calendar, FileText, Clock } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Separator } from "@/components/ui/separator"

export default function BillingPayments() {
  const isLoading = usePageLoading()

  if (isLoading) {
    return <GenericPageSkeleton />
  }

  const feeStructure = {
    tuitionFee: 75000,
    libraryFee: 2500,
    labFee: 8000,
    examFee: 3000,
    developmentFee: 5000,
    miscFee: 1500,
    total: 95000
  }

  const paymentHistory = [
    {
      id: "PAY-2024-001",
      date: "2024-01-15",
      description: "Semester 6 Tuition Fee",
      amount: 47500,
      status: "Paid",
      method: "Bank Transfer",
      receiptNo: "REC-001-2024",
      dueDate: "2024-01-10"
    },
    {
      id: "PAY-2024-002",
      date: "2024-01-20",
      description: "Library & Lab Fee",
      amount: 10500,
      status: "Paid",
      method: "Online Payment",
      receiptNo: "REC-002-2024",
      dueDate: "2024-01-15"
    },
    {
      id: "PAY-2024-003",
      date: "2024-02-10",
      description: "Examination Fee",
      amount: 3000,
      status: "Paid",
      method: "Credit Card",
      receiptNo: "REC-003-2024",
      dueDate: "2024-02-05"
    },
    {
      id: "PAY-2024-004",
      date: "2024-03-15",
      description: "Development Fee",
      amount: 5000,
      status: "Pending",
      method: "-",
      receiptNo: "-",
      dueDate: "2024-03-20"
    },
    {
      id: "PAY-2024-005",
      date: "-",
      description: "Miscellaneous Fee",
      amount: 1500,
      status: "Upcoming",
      method: "-",
      receiptNo: "-",
      dueDate: "2024-04-10"
    }
  ]

  const outstandingBalance = paymentHistory
    .filter(payment => payment.status === "Pending" || payment.status === "Upcoming")
    .reduce((sum, payment) => sum + payment.amount, 0)

  const totalPaid = paymentHistory
    .filter(payment => payment.status === "Paid")
    .reduce((sum, payment) => sum + payment.amount, 0)

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="mobile-heading-large font-bold tracking-tight">Billing & Payments</h1>
          <p className="text-muted-foreground text-sm sm:text-base mobile-hide-description">
            Manage your college fees and payments
          </p>
        </div>
        <Button className="w-full sm:w-auto">
          <CreditCard className="mr-2 h-4 w-4" />
          <span className="hidden sm:inline">Make Payment</span>
          <span className="sm:hidden">Pay Now</span>
        </Button>
      </div>

      {/* Payment Overview */}
      <div className="grid gap-3 grid-cols-2 lg:grid-cols-4">
        <Card className="p-3">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-0">
            <CardTitle className="text-xs font-medium">Total Fees</CardTitle>
            <DollarSign className="h-3 w-3 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-0 pt-2">
            <div className="text-lg font-bold">₹{(feeStructure.total/1000).toFixed(0)}k</div>
            <p className="text-xs text-muted-foreground">
              Academic year
            </p>
          </CardContent>
        </Card>
        
        <Card className="p-3">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-0">
            <CardTitle className="text-xs font-medium">Paid</CardTitle>
            <Receipt className="h-3 w-3 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-0 pt-2">
            <div className="text-lg font-bold text-green-600">₹{(totalPaid/1000).toFixed(0)}k</div>
            <p className="text-xs text-muted-foreground">
              Successfully
            </p>
          </CardContent>
        </Card>
        
        <Card className="p-3">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-0">
            <CardTitle className="text-xs font-medium">Outstanding</CardTitle>
            <Clock className="h-3 w-3 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-0 pt-2">
            <div className="text-lg font-bold text-orange-600">₹{(outstandingBalance/1000).toFixed(1)}k</div>
            <p className="text-xs text-muted-foreground">
              Pending
            </p>
          </CardContent>
        </Card>

        <Card className="p-3">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-0">
            <CardTitle className="text-xs font-medium">Progress</CardTitle>
            <FileText className="h-3 w-3 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-0 pt-2">
            <div className="text-lg font-bold">
              {Math.round((totalPaid / feeStructure.total) * 100)}%
            </div>
            <p className="text-xs text-muted-foreground">
              Completed
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Fee Structure */}
      <Card>
        <CardHeader>
          <CardTitle>Fee Structure - Academic Year 2023-24</CardTitle>
          <CardDescription>Detailed breakdown of all fees</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Tuition Fee</span>
              <span className="font-semibold">₹{feeStructure.tuitionFee.toLocaleString()}</span>
            </div>
            <Separator />
            <div className="flex justify-between items-center">
              <span>Library Fee</span>
              <span className="font-semibold">₹{feeStructure.libraryFee.toLocaleString()}</span>
            </div>
            <Separator />
            <div className="flex justify-between items-center">
              <span>Laboratory Fee</span>
              <span className="font-semibold">₹{feeStructure.labFee.toLocaleString()}</span>
            </div>
            <Separator />
            <div className="flex justify-between items-center">
              <span>Examination Fee</span>
              <span className="font-semibold">₹{feeStructure.examFee.toLocaleString()}</span>
            </div>
            <Separator />
            <div className="flex justify-between items-center">
              <span>Development Fee</span>
              <span className="font-semibold">₹{feeStructure.developmentFee.toLocaleString()}</span>
            </div>
            <Separator />
            <div className="flex justify-between items-center">
              <span>Miscellaneous Fee</span>
              <span className="font-semibold">₹{feeStructure.miscFee.toLocaleString()}</span>
            </div>
            <Separator className="bg-primary/20" />
            <div className="flex justify-between items-center text-lg font-bold">
              <span>Total Amount</span>
              <span className="text-primary">₹{feeStructure.total.toLocaleString()}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment History */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Payment History</CardTitle>
              <CardDescription>Complete record of all your payments</CardDescription>
            </div>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Mobile View */}
          <div className="block md:hidden space-y-3">
            {paymentHistory.map((payment) => (
              <div key={payment.id} className="bg-muted/50 rounded-lg p-3 space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-sm">{payment.id}</h4>
                    <p className="text-xs text-muted-foreground line-clamp-2">{payment.description}</p>
                  </div>
                  <Badge 
                    variant={
                      payment.status === "Paid" ? "default" : 
                      payment.status === "Pending" ? "destructive" : 
                      "secondary"
                    }
                    className="text-xs"
                  >
                    {payment.status}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-muted-foreground">Amount:</span>
                    <span className="ml-1 font-semibold">₹{(payment.amount/1000).toFixed(1)}k</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Due:</span>
                    <span className="ml-1">{payment.dueDate}</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-muted-foreground">Paid:</span>
                    <span className="ml-1">{payment.date || "-"}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Method:</span>
                    <span className="ml-1">{payment.method}</span>
                  </div>
                </div>
                {payment.receiptNo !== "-" && (
                  <Button variant="ghost" size="sm" className="w-full text-xs">
                    <Download className="h-3 w-3 mr-1" />
                    {payment.receiptNo}
                  </Button>
                )}
              </div>
            ))}
          </div>

          {/* Desktop View */}
          <div className="hidden md:block rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Payment ID</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Payment Date</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Receipt</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paymentHistory.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell className="font-medium">{payment.id}</TableCell>
                    <TableCell>{payment.description}</TableCell>
                    <TableCell className="font-semibold">₹{payment.amount.toLocaleString()}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        {payment.dueDate}
                      </div>
                    </TableCell>
                    <TableCell>{payment.date || "-"}</TableCell>
                    <TableCell>{payment.method}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={
                          payment.status === "Paid" ? "default" : 
                          payment.status === "Pending" ? "destructive" : 
                          "secondary"
                        }
                      >
                        {payment.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {payment.receiptNo !== "-" ? (
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4 mr-1" />
                          {payment.receiptNo}
                        </Button>
                      ) : (
                        "-"
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Outstanding Payments */}
      {outstandingBalance > 0 && (
        <Card className="border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950">
          <CardHeader>
            <CardTitle className="text-orange-700 dark:text-orange-300">Outstanding Payments</CardTitle>
            <CardDescription className="text-orange-600 dark:text-orange-400">
              Please complete these payments before the due date
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {paymentHistory
                .filter(payment => payment.status === "Pending" || payment.status === "Upcoming")
                .map((payment) => (
                  <div key={payment.id} className="flex items-center justify-between p-4 bg-white dark:bg-gray-900 rounded-lg border">
                    <div>
                      <h4 className="font-semibold">{payment.description}</h4>
                      <p className="text-sm text-muted-foreground">
                        Due: {payment.dueDate} • Amount: ₹{payment.amount.toLocaleString()}
                      </p>
                    </div>
                    <Button size="sm">
                      Pay Now
                    </Button>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}