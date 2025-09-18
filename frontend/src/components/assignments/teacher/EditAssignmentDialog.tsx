import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

interface Assignment {
  id: string
  title: string
  description: string
  dueDate: string
  maxPoints: number
  type: 'quiz' | 'project' | 'homework' | 'exam'
  status: 'draft' | 'published' | 'closed'
  submissions: number
  totalStudents: number
}

interface EditAssignmentDialogProps {
  assignment: Assignment | null
  isOpen: boolean
  onClose: () => void
  onAssignmentUpdated: (updatedAssignment: Assignment) => void
}

export function EditAssignmentDialog({ 
  assignment, 
  isOpen, 
  onClose, 
  onAssignmentUpdated 
}: EditAssignmentDialogProps) {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "",
    maxPoints: "",
    dueDate: "",
    status: ""
  })

  useEffect(() => {
    if (assignment) {
      setFormData({
        title: assignment.title,
        description: assignment.description,
        type: assignment.type,
        maxPoints: assignment.maxPoints.toString(),
        dueDate: assignment.dueDate,
        status: assignment.status
      })
    }
  }, [assignment])

  const handleSubmit = () => {
    if (!assignment) return

    if (!formData.title || !formData.description || !formData.type || !formData.maxPoints || !formData.dueDate) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      })
      return
    }

    const updatedAssignment: Assignment = {
      ...assignment,
      title: formData.title,
      description: formData.description,
      dueDate: formData.dueDate,
      maxPoints: parseInt(formData.maxPoints),
      type: formData.type as 'quiz' | 'project' | 'homework' | 'exam',
      status: formData.status as 'draft' | 'published' | 'closed'
    }

    onAssignmentUpdated(updatedAssignment)
    
    toast({
      title: "Assignment Updated",
      description: `${formData.title} has been updated successfully.`
    })
    
    onClose()
  }

  if (!assignment) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="mx-2 max-w-[calc(100vw-1rem)] sm:mx-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-lg">Edit Assignment</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4 max-h-[70vh] overflow-y-auto">
          <div className="space-y-2">
            <Label htmlFor="edit-assignment-title" className="text-sm">Assignment Title *</Label>
            <Input 
              id="edit-assignment-title" 
              placeholder="Enter assignment title" 
              className="text-sm"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-assignment-description" className="text-sm">Description *</Label>
            <Textarea 
              id="edit-assignment-description" 
              placeholder="Enter assignment description" 
              className="text-sm min-h-[80px]"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="edit-assignment-type" className="text-sm">Type *</Label>
              <Select value={formData.type} onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}>
                <SelectTrigger className="text-sm">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="homework">Homework</SelectItem>
                  <SelectItem value="quiz">Quiz</SelectItem>
                  <SelectItem value="project">Project</SelectItem>
                  <SelectItem value="exam">Exam</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-assignment-points" className="text-sm">Max Points *</Label>
              <Input 
                id="edit-assignment-points" 
                type="number" 
                placeholder="100" 
                className="text-sm"
                value={formData.maxPoints}
                onChange={(e) => setFormData(prev => ({ ...prev, maxPoints: e.target.value }))}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="edit-assignment-due" className="text-sm">Due Date *</Label>
              <Input 
                id="edit-assignment-due" 
                type="date" 
                className="text-sm"
                value={formData.dueDate}
                onChange={(e) => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-assignment-status" className="text-sm">Status *</Label>
              <Select value={formData.status} onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}>
                <SelectTrigger className="text-sm">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <DialogFooter className="flex-col gap-2 sm:flex-row">
          <Button variant="outline" onClick={onClose} className="w-full sm:w-auto">
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="w-full sm:w-auto">
            Update Assignment
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}