import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"
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

interface DeleteAssignmentDialogProps {
  assignment: Assignment | null
  isOpen: boolean
  onClose: () => void
  onAssignmentDeleted: (assignmentId: string) => void
}

export function DeleteAssignmentDialog({ 
  assignment, 
  isOpen, 
  onClose, 
  onAssignmentDeleted 
}: DeleteAssignmentDialogProps) {
  const { toast } = useToast()

  const handleDelete = () => {
    if (!assignment) return

    onAssignmentDeleted(assignment.id)
    
    toast({
      title: "Assignment Deleted",
      description: `${assignment.title} has been deleted successfully.`,
      variant: "destructive"
    })
    
    onClose()
  }

  if (!assignment) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="mx-2 max-w-[calc(100vw-1rem)] sm:mx-auto sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-5 w-5" />
            Delete Assignment
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <p className="text-sm text-muted-foreground">
            Are you sure you want to delete "{assignment.title}"? This action cannot be undone.
          </p>
          
          {assignment.submissions > 0 && (
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3">
              <p className="text-sm text-destructive font-medium">
                ⚠️ Warning: This assignment has {assignment.submissions} submission{assignment.submissions !== 1 ? 's' : ''}.
              </p>
              <p className="text-xs text-destructive mt-1">
                Deleting this assignment will also remove all student submissions.
              </p>
            </div>
          )}
        </div>

        <DialogFooter className="flex-col gap-2 sm:flex-row">
          <Button variant="outline" onClick={onClose} className="w-full sm:w-auto">
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete} className="w-full sm:w-auto">
            Delete Assignment
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}