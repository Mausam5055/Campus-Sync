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
import { Users, Calendar, DollarSign, FileText, Building } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface BulkBillDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const billCategories = [
  { id: 'tuition', name: 'Tuition Fees', description: 'Regular academic fees' },
  { id: 'accommodation', name: 'Accommodation', description: 'Hostel and lodging fees' },
  { id: 'transport', name: 'Bus Transport', description: 'Transportation fees' },
  { id: 'library', name: 'Library Fees', description: 'Library access and fines' },
  { id: 'lab', name: 'Laboratory Fees', description: 'Lab equipment and usage' },
  { id: 'exam', name: 'Examination Fees', description: 'Exam registration and processing' },
  { id: 'misc', name: 'Miscellaneous', description: 'Other fees and charges' }
]

const branches = [
  'Computer Science',
  'Electronics & Communication',
  'Mechanical Engineering',
  'Civil Engineering',
  'Electrical Engineering',
  'Information Technology'
]

const semesters = ['1st Semester', '2nd Semester', '3rd Semester', '4th Semester', '5th Semester', '6th Semester', '7th Semester', '8th Semester']

export function BulkBillDialog({ open, onOpenChange }: BulkBillDialogProps) {
  const { toast } = useToast()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    category: '',
    branch: '',
    semester: '',
    amount: '',
    description: '',
    dueDate: '',
    applyToAll: false,
    selectedStudents: [] as string[]
  })

  // Mock student data for demonstration
  const mockStudents = [
    { id: 'S001', name: 'John Doe', rollNo: 'CS001', year: '2nd Year' },
    { id: 'S002', name: 'Jane Smith', rollNo: 'CS002', year: '2nd Year' },
    { id: 'S003', name: 'Mike Johnson', rollNo: 'CS003', year: '3rd Year' },
    { id: 'S004', name: 'Sarah Wilson', rollNo: 'CS004', year: '1st Year' }
  ]

  const handleNext = () => {
    if (step < 3) setStep(step + 1)
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleSubmit = () => {
    const billCount = formData.applyToAll ? mockStudents.length : formData.selectedStudents.length
    toast({
      title: "Bills Created Successfully",
      description: `${billCount} bills created for ${formData.category} - ${formData.branch}`
    })
    onOpenChange(false)
    setStep(1)
    setFormData({
      category: '',
      branch: '',
      semester: '',
      amount: '',
      description: '',
      dueDate: '',
      applyToAll: false,
      selectedStudents: []
    })
  }

  const toggleStudentSelection = (studentId: string) => {
    setFormData(prev => ({
      ...prev,
      selectedStudents: prev.selectedStudents.includes(studentId)
        ? prev.selectedStudents.filter(id => id !== studentId)
        : [...prev.selectedStudents, studentId]
    }))
  }

  const toggleSelectAll = () => {
    setFormData(prev => ({
      ...prev,
      applyToAll: !prev.applyToAll,
      selectedStudents: !prev.applyToAll ? mockStudents.map(s => s.id) : []
    }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Bulk Bill Creation
          </DialogTitle>
          <DialogDescription>
            Create bills for multiple students at once. Step {step} of 3.
          </DialogDescription>
        </DialogHeader>

        {/* Step 1: Category & Branch Selection */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Bill Category *</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {billCategories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        <div>
                          <div className="font-medium">{category.name}</div>
                          <div className="text-xs text-muted-foreground">{category.description}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="branch">Branch *</Label>
                <Select value={formData.branch} onValueChange={(value) => setFormData(prev => ({ ...prev, branch: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select branch" />
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
                <Label htmlFor="semester">Semester</Label>
                <Select value={formData.semester} onValueChange={(value) => setFormData(prev => ({ ...prev, semester: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select semester (optional)" />
                  </SelectTrigger>
                  <SelectContent>
                    {semesters.map((semester) => (
                      <SelectItem key={semester} value={semester}>
                        {semester}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount">Amount (₹) *</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="Enter amount"
                  value={formData.amount}
                  onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Enter bill description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dueDate">Due Date *</Label>
              <Input
                id="dueDate"
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
              />
            </div>
          </div>
        )}

        {/* Step 2: Student Selection */}
        {step === 2 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Select Students</h3>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="selectAll"
                  checked={formData.applyToAll}
                  onCheckedChange={toggleSelectAll}
                />
                <Label htmlFor="selectAll">Select All Students</Label>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {mockStudents.map((student) => (
                <Card key={student.id} className={`cursor-pointer transition-colors ${
                  formData.selectedStudents.includes(student.id) || formData.applyToAll
                    ? 'border-primary bg-primary/5'
                    : 'hover:border-primary/50'
                }`}>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        checked={formData.selectedStudents.includes(student.id) || formData.applyToAll}
                        onCheckedChange={() => !formData.applyToAll && toggleStudentSelection(student.id)}
                        disabled={formData.applyToAll}
                      />
                      <div className="flex-1">
                        <div className="font-medium">{student.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {student.rollNo} • {student.year}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-4 p-4 bg-muted rounded-lg">
              <div className="text-sm text-muted-foreground">
                Selected: {formData.applyToAll ? mockStudents.length : formData.selectedStudents.length} students
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Review & Confirm */}
        {step === 3 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Review Bill Details</h3>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Bill Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Category:</span>
                    <div className="font-medium">
                      {billCategories.find(c => c.id === formData.category)?.name}
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Branch:</span>
                    <div className="font-medium">{formData.branch}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Amount:</span>
                    <div className="font-medium">₹{formData.amount}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Due Date:</span>
                    <div className="font-medium">{formData.dueDate}</div>
                  </div>
                  <div className="col-span-2">
                    <span className="text-muted-foreground">Students:</span>
                    <div className="font-medium">
                      {formData.applyToAll ? mockStudents.length : formData.selectedStudents.length} students selected
                    </div>
                  </div>
                </div>

                {formData.description && (
                  <div>
                    <span className="text-muted-foreground text-sm">Description:</span>
                    <div className="text-sm mt-1">{formData.description}</div>
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
              <div className="flex items-center gap-2 text-primary">
                <FileText className="h-4 w-4" />
                <span className="font-medium">
                  {formData.applyToAll ? mockStudents.length : formData.selectedStudents.length} bills will be created
                </span>
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                Total amount: ₹{(parseInt(formData.amount || '0') * (formData.applyToAll ? mockStudents.length : formData.selectedStudents.length)).toLocaleString()}
              </div>
            </div>
          </div>
        )}

        <DialogFooter className="gap-2">
          {step > 1 && (
            <Button variant="outline" onClick={handleBack}>
              Back
            </Button>
          )}
          {step < 3 ? (
            <Button 
              onClick={handleNext}
              disabled={
                step === 1 && (!formData.category || !formData.branch || !formData.amount || !formData.dueDate) ||
                step === 2 && !formData.applyToAll && formData.selectedStudents.length === 0
              }
            >
              Next
            </Button>
          ) : (
            <Button onClick={handleSubmit}>
              Create Bills
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}