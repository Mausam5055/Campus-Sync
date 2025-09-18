import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Calculator, Users, CheckCircle, AlertCircle, DollarSign, Calendar } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface ProcessPayrollDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

// Mock teacher data for payroll
const payrollData = [
  { 
    id: 'T001', 
    name: 'Dr. Sarah Johnson', 
    empId: 'EMP001', 
    department: 'Computer Science',
    baseSalary: 85000,
    allowances: 15000,
    deductions: 12000,
    overtime: 5000,
    status: 'pending'
  },
  { 
    id: 'T002', 
    name: 'Prof. Michael Brown', 
    empId: 'EMP002', 
    department: 'Electronics & Communication',
    baseSalary: 72000,
    allowances: 12000,
    deductions: 8000,
    overtime: 3000,
    status: 'pending'
  },
  { 
    id: 'T003', 
    name: 'Dr. Emily Davis', 
    empId: 'EMP003', 
    department: 'Mechanical Engineering',
    baseSalary: 78000,
    allowances: 13000,
    deductions: 9000,
    overtime: 0,
    status: 'pending'
  },
  { 
    id: 'T004', 
    name: 'Prof. Robert Wilson', 
    empId: 'EMP004', 
    department: 'Mathematics',
    baseSalary: 90000,
    allowances: 16000,
    deductions: 15000,
    overtime: 8000,
    status: 'pending'
  },
  { 
    id: 'T005', 
    name: 'Dr. Lisa Anderson', 
    empId: 'EMP005', 
    department: 'Physics',
    baseSalary: 75000,
    allowances: 14000,
    deductions: 10000,
    overtime: 2000,
    status: 'pending'
  }
]

const departments = [
  'All Departments',
  'Computer Science',
  'Electronics & Communication',
  'Mechanical Engineering',
  'Mathematics',
  'Physics',
  'Chemistry'
]

export function ProcessPayrollDialog({ open, onOpenChange }: ProcessPayrollDialogProps) {
  const { toast } = useToast()
  const [selectedDepartment, setSelectedDepartment] = useState('All Departments')
  const [selectedTeachers, setSelectedTeachers] = useState<string[]>([])
  const [payrollMonth, setPayrollMonth] = useState('')
  const [payrollYear, setPayrollYear] = useState(new Date().getFullYear().toString())
  const [isProcessing, setIsProcessing] = useState(false)
  const [processStep, setProcessStep] = useState(0)

  const filteredTeachers = payrollData.filter(teacher => 
    selectedDepartment === 'All Departments' || teacher.department === selectedDepartment
  )

  const handleTeacherSelect = (teacherId: string, checked: boolean) => {
    if (checked) {
      setSelectedTeachers(prev => [...prev, teacherId])
    } else {
      setSelectedTeachers(prev => prev.filter(id => id !== teacherId))
    }
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedTeachers(filteredTeachers.map(t => t.id))
    } else {
      setSelectedTeachers([])
    }
  }

  const calculateNetSalary = (teacher: typeof payrollData[0]) => {
    return teacher.baseSalary + teacher.allowances + teacher.overtime - teacher.deductions
  }

  const getTotalPayroll = () => {
    return filteredTeachers
      .filter(teacher => selectedTeachers.includes(teacher.id))
      .reduce((total, teacher) => total + calculateNetSalary(teacher), 0)
  }

  const processPayroll = async () => {
    if (!payrollMonth || selectedTeachers.length === 0) {
      toast({
        title: "Validation Error",
        description: "Please select month and at least one teacher",
        variant: "destructive"
      })
      return
    }

    setIsProcessing(true)
    setProcessStep(0)

    // Simulate processing steps
    const steps = [
      'Validating employee data...',
      'Calculating salaries...',
      'Processing deductions...',
      'Generating payslips...',
      'Initiating bank transfers...',
      'Completing payroll...'
    ]

    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000))
      setProcessStep(i + 1)
    }

    toast({
      title: "Payroll Processed Successfully",
      description: `Processed payroll for ${selectedTeachers.length} teachers for ${payrollMonth} ${payrollYear}`
    })

    setIsProcessing(false)
    setProcessStep(0)
    onOpenChange(false)
  }

  const currentDate = new Date()
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Process Monthly Payroll
          </DialogTitle>
          <DialogDescription>
            Process salary payments for teaching staff for the selected month.
          </DialogDescription>
        </DialogHeader>

        {isProcessing ? (
          <div className="space-y-6 py-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calculator className="h-8 w-8 text-primary animate-pulse" />
              </div>
              <h3 className="text-lg font-medium mb-2">Processing Payroll...</h3>
              <p className="text-muted-foreground">Please wait while we process the payroll data</p>
            </div>

            <div className="space-y-4">
              <Progress value={(processStep / 6) * 100} className="w-full" />
              <div className="text-center text-sm text-muted-foreground">
                Step {processStep} of 6 completed
              </div>
            </div>

            <div className="space-y-2">
              {[
                'Validating employee data...',
                'Calculating salaries...',
                'Processing deductions...',
                'Generating payslips...',
                'Initiating bank transfers...',
                'Completing payroll...'
              ].map((step, index) => (
                <div key={index} className="flex items-center gap-3">
                  {index < processStep ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : index === processStep ? (
                    <div className="h-4 w-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <div className="h-4 w-4 border-2 border-muted rounded-full" />
                  )}
                  <span className={index <= processStep ? 'text-foreground' : 'text-muted-foreground'}>
                    {step}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Payroll Period Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Payroll Period
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="month">Month *</Label>
                    <Select value={payrollMonth} onValueChange={setPayrollMonth}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select month" />
                      </SelectTrigger>
                      <SelectContent>
                        {months.map((month) => (
                          <SelectItem key={month} value={month}>
                            {month}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="year">Year *</Label>
                    <Select value={payrollYear} onValueChange={setPayrollYear}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[currentDate.getFullYear() - 1, currentDate.getFullYear(), currentDate.getFullYear() + 1].map((year) => (
                          <SelectItem key={year} value={year.toString()}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Department Filter */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Department Selection
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="department">Filter by Department</Label>
                  <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((dept) => (
                        <SelectItem key={dept} value={dept}>
                          {dept}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Teacher Selection */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Select Teachers for Payroll</CardTitle>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="select-all"
                        checked={selectedTeachers.length === filteredTeachers.length && filteredTeachers.length > 0}
                        onCheckedChange={handleSelectAll}
                      />
                      <Label htmlFor="select-all">Select All ({filteredTeachers.length})</Label>
                    </div>
                    <Badge variant="secondary">
                      {selectedTeachers.length} selected
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {filteredTeachers.map((teacher) => (
                    <Card key={teacher.id} className={`p-3 ${selectedTeachers.includes(teacher.id) ? 'ring-2 ring-primary bg-primary/5' : ''}`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Checkbox
                            checked={selectedTeachers.includes(teacher.id)}
                            onCheckedChange={(checked) => handleTeacherSelect(teacher.id, checked as boolean)}
                          />
                          <div>
                            <div className="font-medium">{teacher.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {teacher.empId} • {teacher.department}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">₹{calculateNetSalary(teacher).toLocaleString()}</div>
                          <div className="text-xs text-muted-foreground">Net Salary</div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Payroll Summary */}
            {selectedTeachers.length > 0 && (
              <Card className="bg-primary/5 border-primary">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    Payroll Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">{selectedTeachers.length}</div>
                      <div className="text-sm text-muted-foreground">Teachers</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">₹{getTotalPayroll().toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">Total Payroll</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">₹{Math.round(getTotalPayroll() * 0.1).toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">Total Tax</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600">₹{Math.round(getTotalPayroll() * 1.1).toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">Total Cost</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        <DialogFooter>
          {!isProcessing && (
            <>
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button 
                onClick={processPayroll}
                disabled={!payrollMonth || selectedTeachers.length === 0}
              >
                <Calculator className="mr-2 h-4 w-4" />
                Process Payroll
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}