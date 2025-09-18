import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Search, User, Plus, Calculator } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface CreateTeacherPaymentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const paymentCategories = [
  { id: 'salary', name: 'Monthly Salary', icon: '💰', baseAmount: 75000 },
  { id: 'bonus', name: 'Performance Bonus', icon: '🏆', baseAmount: 25000 },
  { id: 'overtime', name: 'Overtime Payment', icon: '⏰', baseAmount: 500 },
  { id: 'allowance', name: 'Special Allowance', icon: '💼', baseAmount: 10000 },
  { id: 'reimbursement', name: 'Expense Reimbursement', icon: '🧾', baseAmount: 5000 },
  { id: 'research', name: 'Research Grant', icon: '🔬', baseAmount: 50000 },
  { id: 'training', name: 'Training Compensation', icon: '📚', baseAmount: 15000 },
  { id: 'misc', name: 'Miscellaneous', icon: '📋', baseAmount: 5000 }
]

// Mock teacher data
const mockTeachers = [
  { id: 'T001', name: 'Dr. Sarah Johnson', empId: 'EMP001', department: 'Computer Science', designation: 'Professor', experience: '10 years' },
  { id: 'T002', name: 'Prof. Michael Brown', empId: 'EMP002', department: 'Electronics & Communication', designation: 'Associate Professor', experience: '8 years' },
  { id: 'T003', name: 'Dr. Emily Davis', empId: 'EMP003', department: 'Mechanical Engineering', designation: 'Assistant Professor', experience: '5 years' },
  { id: 'T004', name: 'Prof. Robert Wilson', empId: 'EMP004', department: 'Mathematics', designation: 'Professor', experience: '15 years' },
  { id: 'T005', name: 'Dr. Lisa Anderson', empId: 'EMP005', department: 'Physics', designation: 'Associate Professor', experience: '7 years' }
]

export function CreateTeacherPaymentDialog({ open, onOpenChange }: CreateTeacherPaymentDialogProps) {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTeacher, setSelectedTeacher] = useState<typeof mockTeachers[0] | null>(null)
  const [formData, setFormData] = useState({
    category: '',
    amount: '',
    description: '',
    paymentDate: '',
    notes: '',
    method: 'bank_transfer'
  })

  const filteredTeachers = mockTeachers.filter(teacher =>
    teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.empId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.department.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleCategorySelect = (categoryId: string) => {
    const category = paymentCategories.find(c => c.id === categoryId)
    setFormData(prev => ({ 
      ...prev, 
      category: categoryId,
      amount: category?.baseAmount.toString() || '',
      description: category ? `${category.name} - ${selectedTeacher?.name || ''}` : ''
    }))
  }

  const handleSubmit = () => {
    if (!selectedTeacher || !formData.category || !formData.amount || !formData.paymentDate) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      })
      return
    }

    toast({
      title: "Payment Created Successfully",
      description: `Payment of ₹${formData.amount} created for ${selectedTeacher.name}`
    })
    
    // Reset form
    setSelectedTeacher(null)
    setFormData({
      category: '',
      amount: '',
      description: '',
      paymentDate: '',
      notes: '',
      method: 'bank_transfer'
    })
    setSearchTerm('')
    onOpenChange(false)
  }

  const generatePaymentId = () => {
    const category = paymentCategories.find(c => c.id === formData.category)?.name.substring(0, 3).toUpperCase() || 'PAY'
    const date = new Date().toISOString().substring(2, 10).replace(/-/g, '')
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
    return `${category}-${date}-${random}`
  }

  const calculateTax = () => {
    const amount = parseFloat(formData.amount) || 0
    return Math.round(amount * 0.1) // 10% tax approximation
  }

  const calculateNetAmount = () => {
    const amount = parseFloat(formData.amount) || 0
    return amount - calculateTax()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Create Teacher Payment
          </DialogTitle>
          <DialogDescription>
            Create salary, bonus, or other payments for teaching staff.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Teacher Selection */}
          <div className="space-y-4">
            <div>
              <Label>Search & Select Teacher *</Label>
              <div className="relative mt-2">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, employee ID, or department..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {selectedTeacher ? (
              <Card className="border-primary bg-primary/5">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">{selectedTeacher.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {selectedTeacher.empId} • {selectedTeacher.designation}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {selectedTeacher.department} • {selectedTeacher.experience}
                        </div>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setSelectedTeacher(null)}
                    >
                      Change
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              searchTerm && (
                <div className="max-h-48 overflow-y-auto space-y-2">
                  {filteredTeachers.length > 0 ? (
                    filteredTeachers.map((teacher) => (
                      <Card 
                        key={teacher.id} 
                        className="cursor-pointer hover:border-primary transition-colors"
                        onClick={() => setSelectedTeacher(teacher)}
                      >
                        <CardContent className="p-3">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                              <User className="h-4 w-4" />
                            </div>
                            <div>
                              <div className="font-medium text-sm">{teacher.name}</div>
                              <div className="text-xs text-muted-foreground">
                                {teacher.empId} • {teacher.department}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      No teachers found matching your search.
                    </div>
                  )}
                </div>
              )
            )}
          </div>

          {/* Payment Details */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Payment Category *</Label>
                <Select value={formData.category} onValueChange={handleCategorySelect}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select payment type" />
                  </SelectTrigger>
                  <SelectContent>
                    {paymentCategories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        <div className="flex items-center gap-2">
                          <span>{category.icon}</span>
                          {category.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount">Gross Amount (₹) *</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="Enter amount"
                  value={formData.amount}
                  onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  placeholder="Enter payment description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="paymentDate">Payment Date *</Label>
                <Input
                  id="paymentDate"
                  type="date"
                  value={formData.paymentDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, paymentDate: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="method">Payment Method</Label>
                <Select value={formData.method} onValueChange={(value) => setFormData(prev => ({ ...prev, method: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                    <SelectItem value="check">Check</SelectItem>
                    <SelectItem value="cash">Cash</SelectItem>
                    <SelectItem value="online">Online Payment</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Payment ID (Auto-generated)</Label>
                <Input
                  value={selectedTeacher && formData.category ? generatePaymentId() : ''}
                  disabled
                  placeholder="Will be generated automatically"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea
                id="notes"
                placeholder="Any additional notes or instructions..."
                value={formData.notes}
                onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                rows={3}
              />
            </div>
          </div>

          {/* Payment Calculation */}
          {formData.amount && (
            <Card className="bg-muted/50">
              <CardContent className="p-4">
                <h4 className="font-medium mb-3 flex items-center gap-2">
                  <Calculator className="h-4 w-4" />
                  Payment Calculation
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Gross Amount:</span>
                    <span>₹{formData.amount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax Deduction (10%):</span>
                    <span className="text-red-600">-₹{calculateTax()}</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-medium">
                    <span>Net Amount:</span>
                    <span className="text-green-600">₹{calculateNetAmount()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Preview */}
          {selectedTeacher && formData.category && formData.amount && (
            <Card className="bg-primary/5 border-primary">
              <CardContent className="p-4">
                <h4 className="font-medium mb-3">Payment Preview</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Teacher:</span>
                    <span>{selectedTeacher.name} ({selectedTeacher.empId})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Department:</span>
                    <span>{selectedTeacher.department}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Payment Type:</span>
                    <span>{paymentCategories.find(c => c.id === formData.category)?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Net Amount:</span>
                    <span className="font-medium">₹{calculateNetAmount()}</span>
                  </div>
                  {formData.paymentDate && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Payment Date:</span>
                      <span>{new Date(formData.paymentDate).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={!selectedTeacher || !formData.category || !formData.amount || !formData.paymentDate}
          >
            Create Payment
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}