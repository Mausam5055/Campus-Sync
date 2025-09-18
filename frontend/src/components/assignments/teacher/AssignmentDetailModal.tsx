import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Users, FileText, Edit, Trash2, Eye } from "lucide-react"

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

interface AssignmentDetailModalProps {
  assignment: Assignment | null
  isOpen: boolean
  onClose: () => void
  onEdit: (assignment: Assignment) => void
  onDelete: (assignment: Assignment) => void
  onViewSubmissions: (assignment: Assignment) => void
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'published': return 'bg-green-100 text-green-800'
    case 'draft': return 'bg-yellow-100 text-yellow-800'
    case 'closed': return 'bg-gray-100 text-gray-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

const getTypeColor = (type: string) => {
  switch (type) {
    case 'quiz': return 'bg-blue-100 text-blue-800'
    case 'project': return 'bg-purple-100 text-purple-800'
    case 'homework': return 'bg-orange-100 text-orange-800'
    case 'exam': return 'bg-red-100 text-red-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

export function AssignmentDetailModal({ 
  assignment, 
  isOpen, 
  onClose, 
  onEdit, 
  onDelete, 
  onViewSubmissions 
}: AssignmentDetailModalProps) {
  if (!assignment) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl pr-4">{assignment.title}</DialogTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => onEdit(assignment)}>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
              <Button variant="outline" size="sm" onClick={() => onViewSubmissions(assignment)}>
                <Eye className="h-4 w-4 mr-2" />
                Submissions
              </Button>
              <Button variant="destructive" size="sm" onClick={() => onDelete(assignment)}>
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Status and Type Badges */}
          <div className="flex items-center gap-2">
            <Badge className={getTypeColor(assignment.type)}>
              {assignment.type}
            </Badge>
            <Badge className={getStatusColor(assignment.status)}>
              {assignment.status}
            </Badge>
          </div>

          {/* Assignment Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Due Date</div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span className="font-medium">
                  {new Date(assignment.dueDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Max Points</div>
              <div className="font-medium">{assignment.maxPoints} points</div>
            </div>

            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Submissions</div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span className="font-medium">
                  {assignment.submissions} of {assignment.totalStudents} students
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Completion Rate</div>
              <div className="font-medium">
                {Math.round((assignment.submissions / assignment.totalStudents) * 100)}%
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Description
            </div>
            <div className="bg-muted/50 p-4 rounded-lg">
              <p className="text-sm whitespace-pre-wrap">{assignment.description}</p>
            </div>
          </div>

          {/* Assignment Instructions or Additional Details */}
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">Instructions</div>
            <div className="bg-muted/50 p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">
                Students can submit their work through the student portal. 
                All submissions will be tracked and graded automatically based on your criteria.
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}