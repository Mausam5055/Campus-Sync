import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Download, Eye, CheckCircle, Clock, XCircle, Star } from "lucide-react"

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

interface StudentSubmission {
  id: string
  studentId: string
  studentName: string
  studentEmail: string
  submissionDate: string
  status: 'submitted' | 'late' | 'graded'
  grade?: number
  submissionText?: string
  attachments?: string[]
}

interface StudentSubmissionsDialogProps {
  assignment: Assignment | null
  isOpen: boolean
  onClose: () => void
}

// Sample submission data
const generateSampleSubmissions = (assignment: Assignment | null): StudentSubmission[] => {
  if (!assignment) return []
  
  const submissions: StudentSubmission[] = []
  const submissionCount = assignment.submissions
  
  for (let i = 0; i < submissionCount; i++) {
    submissions.push({
      id: `sub-${i + 1}`,
      studentId: `student-${i + 1}`,
      studentName: `Student ${i + 1}`,
      studentEmail: `student${i + 1}@university.edu`,
      submissionDate: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
      status: i < 3 ? 'graded' : i < 6 ? 'submitted' : 'late',
      grade: i < 3 ? Math.floor(Math.random() * 40) + 60 : undefined,
      submissionText: `This is the submission text for ${assignment.title}...`,
      attachments: Math.random() > 0.5 ? [`assignment_${i + 1}.pdf`] : undefined
    })
  }
  
  return submissions
}

export function StudentSubmissionsDialog({ 
  assignment, 
  isOpen, 
  onClose 
}: StudentSubmissionsDialogProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [submissions] = useState(() => generateSampleSubmissions(assignment))

  const filteredSubmissions = submissions.filter(submission =>
    submission.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    submission.studentEmail.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'graded': return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'submitted': return <Clock className="h-4 w-4 text-blue-600" />
      case 'late': return <XCircle className="h-4 w-4 text-red-600" />
      default: return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'graded': return 'bg-green-100 text-green-800'
      case 'submitted': return 'bg-blue-100 text-blue-800'
      case 'late': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (!assignment) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span>Submissions for "{assignment.title}"</span>
            <Badge variant="outline" className="ml-2">
              {submissions.length} of {assignment.totalStudents} submitted
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search students..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">
                  {submissions.filter(s => s.status === 'graded').length}
                </div>
                <div className="text-sm text-muted-foreground">Graded</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {submissions.filter(s => s.status === 'submitted').length}
                </div>
                <div className="text-sm text-muted-foreground">Pending</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-red-600">
                  {submissions.filter(s => s.status === 'late').length}
                </div>
                <div className="text-sm text-muted-foreground">Late</div>
              </CardContent>
            </Card>
          </div>

          {/* Submissions List */}
          <div className="space-y-3">
            {filteredSubmissions.length > 0 ? (
              filteredSubmissions.map((submission) => (
                <Card key={submission.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${submission.studentName}`} />
                          <AvatarFallback>
                            {submission.studentName.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{submission.studentName}</div>
                          <div className="text-sm text-muted-foreground">{submission.studentEmail}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="flex items-center gap-1">
                            {getStatusIcon(submission.status)}
                            <Badge className={getStatusColor(submission.status)}>
                              {submission.status}
                            </Badge>
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {new Date(submission.submissionDate).toLocaleString()}
                          </div>
                        </div>

                        {submission.grade !== undefined && (
                          <div className="text-right">
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 text-yellow-500" />
                              <span className="font-medium">{submission.grade}/{assignment.maxPoints}</span>
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {Math.round((submission.grade / assignment.maxPoints) * 100)}%
                            </div>
                          </div>
                        )}

                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          {submission.attachments && (
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>

                    {submission.submissionText && (
                      <div className="mt-3 p-3 bg-muted/50 rounded-lg">
                        <p className="text-sm line-clamp-2">{submission.submissionText}</p>
                      </div>
                    )}

                    {submission.attachments && (
                      <div className="mt-2 flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">Attachments:</span>
                        {submission.attachments.map((attachment, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {attachment}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No submissions found.</p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}