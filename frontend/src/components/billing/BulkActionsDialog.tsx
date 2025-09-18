import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Users, FileSpreadsheet, CheckCircle, AlertTriangle, DollarSign, Calendar, Upload } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface BulkActionsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  action: 'bulk_bill' | 'bulk_payment' | null
}

// Mock data for bulk operations
const mockStudents = [
  { id: 'S001', name: 'John Doe', rollNo: 'CS21001', branch: 'Computer Science', year: '3rd Year' },
  { id: 'S002', name: 'Jane Smith', rollNo: 'EC21002', branch: 'Electronics & Communication', year: '2nd Year' },
  { id: 'S003', name: 'Mike Johnson', rollNo: 'ME21003', branch: 'Mechanical Engineering', year: '1st Year' },
  { id: 'S004', name: 'Sarah Wilson', rollNo: 'CS21004', branch: 'Computer Science', year: '4th Year' },
  { id: 'S005', name: 'David Brown', rollNo: 'EE21005', branch: 'Electrical Engineering', year: '2nd Year' }
]

const billCategories = [
  { id: 'tuition', name: 'Tuition Fees', amount: 75000 },
  { id: 'accommodation', name: 'Accommodation', amount: 25000 },
  { id: 'transport', name: 'Bus Transport', amount: 8000 },
  { id: 'library', name: 'Library Fees', amount: 2000 },
  { id: 'lab', name: 'Laboratory Fees', amount: 5000 },
  { id: 'exam', name: 'Examination Fees', amount: 3000 },
  { id: 'sports', name: 'Sports Fees', amount: 1500 }
]

const branches = ['All Branches', 'Computer Science', 'Electronics & Communication', 'Mechanical Engineering', 'Electrical Engineering']
const years = ['All Years', '1st Year', '2nd Year', '3rd Year', '4th Year']

export function BulkActionsDialog({ open, onOpenChange, action }: BulkActionsDialogProps) {
  const { toast } = useToast()
  const [step, setStep] = useState(1)
  const [isProcessing, setIsProcessing] = useState(false)
  const [processStep, setProcessStep] = useState(0)
  
  // Form state
  const [filters, setFilters] = useState({
    branch: 'All Branches',
    year: 'All Years'
  })
  const [selectedStudents, setSelectedStudents] = useState<string[]>([])
  const [bulkData, setBulkData] = useState({
    category: '',
    amount: '',
    description: '',
    dueDate: '',
    notes: ''
  })

  const filteredStudents = mockStudents.filter(student => 
    (filters.branch === 'All Branches' || student.branch === filters.branch) &&
    (filters.year === 'All Years' || student.year === filters.year)
  )

  const handleStudentSelect = (studentId: string, checked: boolean) => {
    if (checked) {
      setSelectedStudents(prev => [...prev, studentId])
    } else {
      setSelectedStudents(prev => prev.filter(id => id !== studentId))
    }
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedStudents(filteredStudents.map(s => s.id))
    } else {
      setSelectedStudents([])
    }
  }

  const handleCategorySelect = (categoryId: string) => {
    const category = billCategories.find(c => c.id === categoryId)
    setBulkData(prev => ({
      ...prev,
      category: categoryId,
      amount: category?.amount.toString() || '',
      description: category?.name || ''
    }))
  }

  const processBulkAction = async () => {
    if (selectedStudents.length === 0 || !bulkData.category || !bulkData.amount) {
      toast({
        title: "Validation Error",
        description: "Please complete all required fields",
        variant: "destructive"
      })
      return
    }

    setIsProcessing(true)
    setProcessStep(0)

    const steps = action === 'bulk_bill' 
      ? ['Validating student data...', 'Generating bills...', 'Calculating amounts...', 'Creating records...', 'Sending notifications...']
      : ['Validating payment data...', 'Processing payments...', 'Updating records...', 'Generating receipts...', 'Sending confirmations...']

    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1500))
      setProcessStep(i + 1)
    }

    const actionName = action === 'bulk_bill' ? 'Bills created' : 'Payments processed'
    toast({
      title: `${actionName} successfully`,
      description: `${actionName} for ${selectedStudents.length} students`
    })

    setIsProcessing(false)
    setProcessStep(0)
    setStep(1)
    onOpenChange(false)
  }

  const resetForm = () => {
    setStep(1)
    setSelectedStudents([])
    setBulkData({
      category: '',
      amount: '',
      description: '',
      dueDate: '',
      notes: ''
    })
    setFilters({
      branch: 'All Branches',
      year: 'All Years'
    })
  }

  const getDialogTitle = () => {
    return action === 'bulk_bill' ? 'Create Bulk Bills' : 'Process Bulk Payments'
  }

  const getDialogDescription = () => {
    return action === 'bulk_bill' 
      ? 'Create bills for multiple students at once'
      : 'Process payments for multiple students simultaneously'
  }

  const getTotalAmount = () => {
    const amount = parseFloat(bulkData.amount) || 0
    return amount * selectedStudents.length
  }

  return (
    <Dialog open={open} onOpenChange={(open) => {
      if (!open) resetForm()
      onOpenChange(open)
    }}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {action === 'bulk_bill' ? <FileSpreadsheet className="h-5 w-5" /> : <DollarSign className="h-5 w-5" />}
            {getDialogTitle()}
          </DialogTitle>
          <DialogDescription>
            {getDialogDescription()}
          </DialogDescription>
        </DialogHeader>

        {isProcessing ? (
          <div className="space-y-6 py-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                {action === 'bulk_bill' ? 
                  <FileSpreadsheet className="h-8 w-8 text-primary animate-pulse" /> :
                  <DollarSign className="h-8 w-8 text-primary animate-pulse" />
                }
              </div>
              <h3 className="text-lg font-medium mb-2">
                {action === 'bulk_bill' ? 'Creating Bills...' : 'Processing Payments...'}
              </h3>
              <p className="text-muted-foreground">Please wait while we process the bulk operation</p>
            </div>

            <div className="space-y-4">
              <Progress value={(processStep / 5) * 100} className="w-full" />
              <div className="text-center text-sm text-muted-foreground">
                Step {processStep} of 5 completed
              </div>
            </div>

            <div className="space-y-2">
              {(action === 'bulk_bill' 
                ? ['Validating student data...', 'Generating bills...', 'Calculating amounts...', 'Creating records...', 'Sending notifications...']
                : ['Validating payment data...', 'Processing payments...', 'Updating records...', 'Generating receipts...', 'Sending confirmations...']
              ).map((stepText, index) => (
                <div key={index} className="flex items-center gap-3">
                  {index < processStep ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : index === processStep ? (
                    <div className="h-4 w-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <div className="h-4 w-4 border-2 border-muted rounded-full" />
                  )}
                  <span className={index <= processStep ? 'text-foreground' : 'text-muted-foreground'}>
                    {stepText}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Step Indicator */}
            <div className="flex items-center justify-center space-x-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${step >= 1 ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                1
              </div>
              <div className={`w-12 h-0.5 ${step >= 2 ? 'bg-primary' : 'bg-muted'}`} />
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${step >= 2 ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                2
              </div>
              <div className={`w-12 h-0.5 ${step >= 3 ? 'bg-primary' : 'bg-muted'}`} />
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${step >= 3 ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                3
              </div>
            </div>

            {step === 1 && (
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      Select Students
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Filter by Branch</Label>
                        <Select value={filters.branch} onValueChange={(value) => setFilters(prev => ({ ...prev, branch: value }))}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {branches.map((branch) => (
                              <SelectItem key={branch} value={branch}>
                                {branch}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Filter by Year</Label>
                        <Select value={filters.year} onValueChange={(value) => setFilters(prev => ({ ...prev, year: value }))}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {years.map((year) => (
                              <SelectItem key={year} value={year}>
                                {year}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          checked={selectedStudents.length === filteredStudents.length && filteredStudents.length > 0}
                          onCheckedChange={handleSelectAll}
                        />
                        <Label>Select All ({filteredStudents.length})</Label>
                      </div>
                      <Badge variant="secondary">
                        {selectedStudents.length} selected
                      </Badge>
                    </div>

                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {filteredStudents.map((student) => (
                        <Card key={student.id} className={`p-3 ${selectedStudents.includes(student.id) ? 'ring-2 ring-primary bg-primary/5' : ''}`}>
                          <div className="flex items-center space-x-3">
                            <Checkbox
                              checked={selectedStudents.includes(student.id)}
                              onCheckedChange={(checked) => handleStudentSelect(student.id, checked as boolean)}
                            />
                            <div>
                              <div className="font-medium">{student.name}</div>
                              <div className="text-sm text-muted-foreground">
                                {student.rollNo} • {student.branch} • {student.year}
                              </div>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileSpreadsheet className="h-4 w-4" />
                      {action === 'bulk_bill' ? 'Bill Details' : 'Payment Details'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Category *</Label>
                        <Select value={bulkData.category} onValueChange={handleCategorySelect}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            {billCategories.map((category) => (
                              <SelectItem key={category.id} value={category.id}>
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Amount per Student (₹) *</Label>
                        <Input
                          type="number"
                          placeholder="Enter amount"
                          value={bulkData.amount}
                          onChange={(e) => setBulkData(prev => ({ ...prev, amount: e.target.value }))}
                        />
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <Label>Description</Label>
                        <Input
                          placeholder="Enter description"
                          value={bulkData.description}
                          onChange={(e) => setBulkData(prev => ({ ...prev, description: e.target.value }))}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Due Date *</Label>
                        <Input
                          type="date"
                          value={bulkData.dueDate}
                          onChange={(e) => setBulkData(prev => ({ ...prev, dueDate: e.target.value }))}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Additional Notes</Label>
                      <Textarea
                        placeholder="Any additional notes..."
                        value={bulkData.notes}
                        onChange={(e) => setBulkData(prev => ({ ...prev, notes: e.target.value }))}
                        rows={3}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <Card className="bg-primary/5 border-primary">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4" />
                      Review & Confirm
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">{selectedStudents.length}</div>
                        <div className="text-sm text-muted-foreground">Students</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">₹{bulkData.amount}</div>
                        <div className="text-sm text-muted-foreground">Per Student</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">₹{getTotalAmount().toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground">Total Amount</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-orange-600">
                          {billCategories.find(c => c.id === bulkData.category)?.name || 'N/A'}
                        </div>
                        <div className="text-sm text-muted-foreground">Category</div>
                      </div>
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-yellow-800">Important Notice</h4>
                          <p className="text-sm text-yellow-700 mt-1">
                            This action will {action === 'bulk_bill' ? 'create bills' : 'process payments'} for {selectedStudents.length} students. 
                            This operation cannot be undone. Please review all details carefully before proceeding.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        )}

        <DialogFooter>
          {!isProcessing && (
            <>
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              {step > 1 && (
                <Button variant="outline" onClick={() => setStep(step - 1)}>
                  Previous
                </Button>
              )}
              {step < 3 ? (
                <Button 
                  onClick={() => setStep(step + 1)}
                  disabled={step === 1 && selectedStudents.length === 0}
                >
                  Next
                </Button>
              ) : (
                <Button 
                  onClick={processBulkAction}
                  disabled={!bulkData.category || !bulkData.amount || !bulkData.dueDate}
                >
                  {action === 'bulk_bill' ? 'Create Bills' : 'Process Payments'}
                </Button>
              )}
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}