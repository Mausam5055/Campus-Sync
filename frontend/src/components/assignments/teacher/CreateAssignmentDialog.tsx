import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

interface Slot {
  id: string
  subject: string
  code: string
  time: string
  day: string
  room: string
  studentCount: number
}

interface CreateAssignmentDialogProps {
  isOpen: boolean
  onClose: () => void
  slots: Slot[]
  selectedSlot: string
  onAssignmentCreated: (assignment: any) => void
}

export function CreateAssignmentDialog({ 
  isOpen, 
  onClose, 
  slots, 
  selectedSlot, 
  onAssignmentCreated 
}: CreateAssignmentDialogProps) {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "",
    maxPoints: "",
    dueDate: "",
    classId: selectedSlot
  })

  const handleSubmit = () => {
    if (!formData.title || !formData.description || !formData.type || !formData.maxPoints || !formData.dueDate) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      })
      return
    }

    const newAssignment = {
      id: `assign-${Date.now()}`,
      title: formData.title,
      description: formData.description,
      dueDate: formData.dueDate,
      maxPoints: parseInt(formData.maxPoints),
      type: formData.type as 'quiz' | 'project' | 'homework' | 'exam',
      status: 'draft' as const,
      submissions: 0,
      totalStudents: slots.find(slot => slot.id === formData.classId)?.studentCount || 0
    }

    onAssignmentCreated(newAssignment)
    
    toast({
      title: "Assignment Created",
      description: `${formData.title} has been created successfully.`
    })

    // Reset form
    setFormData({
      title: "",
      description: "",
      type: "",
      maxPoints: "",
      dueDate: "",
      classId: selectedSlot
    })
    
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="mx-2 max-w-[calc(100vw-1rem)] sm:mx-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-lg">Create New Assignment</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4 max-h-[70vh] overflow-y-auto">
          <div className="space-y-2">
            <Label htmlFor="assignment-title" className="text-sm">Assignment Title *</Label>
            <Input 
              id="assignment-title" 
              placeholder="Enter assignment title" 
              className="text-sm"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="assignment-description" className="text-sm">Description *</Label>
            <Textarea 
              id="assignment-description" 
              placeholder="Enter assignment description" 
              className="text-sm min-h-[80px]"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="assignment-type" className="text-sm">Type *</Label>
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
              <Label htmlFor="assignment-points" className="text-sm">Max Points *</Label>
              <Input 
                id="assignment-points" 
                type="number" 
                placeholder="100" 
                className="text-sm"
                value={formData.maxPoints}
                onChange={(e) => setFormData(prev => ({ ...prev, maxPoints: e.target.value }))}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="assignment-due" className="text-sm">Due Date *</Label>
            <Input 
              id="assignment-due" 
              type="date" 
              className="text-sm"
              value={formData.dueDate}
              onChange={(e) => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="assignment-class" className="text-sm">Class *</Label>
            <Select 
              value={formData.classId} 
              onValueChange={(value) => setFormData(prev => ({ ...prev, classId: value }))}
            >
              <SelectTrigger className="text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {slots.map((slot) => (
                  <SelectItem key={slot.id} value={slot.id}>
                    {slot.code} - {slot.subject}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter className="flex-col gap-2 sm:flex-row">
          <Button variant="outline" onClick={onClose} className="w-full sm:w-auto">
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="w-full sm:w-auto">
            Create Assignment
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}