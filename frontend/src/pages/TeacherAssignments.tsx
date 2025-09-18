import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Plus, Clock, Hash, Users, BookOpen, Calendar, Eye, Edit, Trash2, ChevronDown } from "lucide-react"
import { GenericPageSkeleton } from "@/components/ui/page-skeleton"
import { usePageLoading } from "@/hooks/use-page-loading"
import { SEO } from "@/components/SEO"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useIsMobile } from "@/hooks/use-mobile"
import { CreateAssignmentDialog } from "@/components/assignments/teacher/CreateAssignmentDialog"
import { AssignmentDetailModal } from "@/components/assignments/teacher/AssignmentDetailModal"
import { EditAssignmentDialog } from "@/components/assignments/teacher/EditAssignmentDialog"
import { DeleteAssignmentDialog } from "@/components/assignments/teacher/DeleteAssignmentDialog"
import { StudentSubmissionsDialog } from "@/components/assignments/teacher/StudentSubmissionsDialog"

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

interface Slot {
  id: string
  subject: string
  code: string
  time: string
  day: string
  room: string
  studentCount: number
}

export default function TeacherAssignments() {
  const isLoading = usePageLoading()
  const isMobile = useIsMobile()
  const [slots, setSlots] = useState<Slot[]>([])
  const [assignments, setAssignments] = useState<Record<string, Assignment[]>>({})
  const [selectedSlot, setSelectedSlot] = useState<string>("")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  
  // Modal states
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isSubmissionsDialogOpen, setIsSubmissionsDialogOpen] = useState(false)

  useEffect(() => {
    // Sample slots data from My Classes
    const sampleSlots = [
      { 
        id: 'CS301-MON-10', 
        subject: 'Data Structures', 
        code: 'CS301',
        time: '10:00 AM - 11:00 AM', 
        day: 'Monday', 
        room: 'Lab-A',
        studentCount: 25 
      },
      { 
        id: 'CS302-TUE-2', 
        subject: 'Database Systems', 
        code: 'CS302',
        time: '2:00 PM - 3:00 PM', 
        day: 'Tuesday', 
        room: 'Room-101',
        studentCount: 18 
      },
      { 
        id: 'CS303-WED-11', 
        subject: 'Software Engineering', 
        code: 'CS303',
        time: '11:00 AM - 12:00 PM', 
        day: 'Wednesday', 
        room: 'Room-205',
        studentCount: 22 
      },
      { 
        id: 'CS304-THU-3', 
        subject: 'Computer Networks', 
        code: 'CS304',
        time: '3:00 PM - 4:00 PM', 
        day: 'Thursday', 
        room: 'Lab-B',
        studentCount: 20 
      }
    ]
    
    setSlots(sampleSlots)
    setSelectedSlot(sampleSlots[0]?.id || "")

    // Sample assignments data
    const sampleAssignments: Record<string, Assignment[]> = {
      'CS301-MON-10': [
        {
          id: 'assign-1',
          title: 'Binary Trees Implementation',
          description: 'Implement basic binary tree operations',
          dueDate: '2024-01-20',
          maxPoints: 100,
          type: 'project',
          status: 'published',
          submissions: 18,
          totalStudents: 25
        },
        {
          id: 'assign-2',
          title: 'Sorting Algorithms Quiz',
          description: 'Multiple choice quiz on sorting algorithms',
          dueDate: '2024-01-25',
          maxPoints: 50,
          type: 'quiz',
          status: 'draft',
          submissions: 0,
          totalStudents: 25
        }
      ],
      'CS302-TUE-2': [
        {
          id: 'assign-3',
          title: 'Database Design Project',
          description: 'Design a database for library management system',
          dueDate: '2024-01-30',
          maxPoints: 150,
          type: 'project',
          status: 'published',
          submissions: 12,
          totalStudents: 18
        }
      ],
      'CS303-WED-11': [
        {
          id: 'assign-4',
          title: 'Requirements Analysis',
          description: 'Analyze requirements for given software project',
          dueDate: '2024-02-05',
          maxPoints: 80,
          type: 'homework',
          status: 'published',
          submissions: 15,
          totalStudents: 22
        }
      ],
      'CS304-THU-3': []
    }
    
    setAssignments(sampleAssignments)
  }, [])

  const handleCreateAssignment = () => {
    setIsCreateDialogOpen(true)
  }

  const handleAssignmentCreated = (newAssignment: Assignment) => {
    setAssignments(prev => ({
      ...prev,
      [selectedSlot]: [...(prev[selectedSlot] || []), newAssignment]
    }))
  }

  const handleAssignmentUpdated = (updatedAssignment: Assignment) => {
    setAssignments(prev => ({
      ...prev,
      [selectedSlot]: (prev[selectedSlot] || []).map(assignment => 
        assignment.id === updatedAssignment.id ? updatedAssignment : assignment
      )
    }))
  }

  const handleAssignmentDeleted = (assignmentId: string) => {
    setAssignments(prev => ({
      ...prev,
      [selectedSlot]: (prev[selectedSlot] || []).filter(assignment => 
        assignment.id !== assignmentId
      )
    }))
  }

  const handleViewAssignment = (assignment: Assignment) => {
    setSelectedAssignment(assignment)
    setIsDetailModalOpen(true)
  }

  const handleEditAssignment = (assignment: Assignment) => {
    setSelectedAssignment(assignment)
    setIsEditDialogOpen(true)
  }

  const handleDeleteAssignment = (assignment: Assignment) => {
    setSelectedAssignment(assignment)
    setIsDeleteDialogOpen(true)
  }

  const handleViewSubmissions = (assignment: Assignment) => {
    setSelectedAssignment(assignment)
    setIsSubmissionsDialogOpen(true)
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

  if (isLoading) return <GenericPageSkeleton />

  const selectedSlotData = slots.find(slot => slot.id === selectedSlot)
  const slotAssignments = assignments[selectedSlot] || []

  return (
    <div className="space-y-4 p-3 sm:p-4 md:p-6">
      <SEO title="Teacher Assignments" description="Manage assignments for your classes" />
      
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">
            Assignments Management
          </h1>
          <p className="text-muted-foreground text-xs sm:text-sm hidden sm:block">
            Create and manage assignments for your classes
          </p>
        </div>
        
        <Button 
          size={isMobile ? "sm" : "default"} 
          className="w-full sm:w-auto"
          onClick={handleCreateAssignment}
        >
          <Plus className="h-4 w-4 mr-2" />
          <span className="hidden xs:inline">Create Assignment</span>
          <span className="xs:hidden">Create</span>
        </Button>
      </div>

      {/* Mobile Class Selector */}
      {isMobile && (
        <Card>
          <CardContent className="p-3">
            <Select value={selectedSlot} onValueChange={setSelectedSlot}>
              <SelectTrigger className="w-full">
                <SelectValue>
                  {selectedSlotData ? (
                    <div className="flex items-center justify-between w-full">
                      <span className="font-medium">{selectedSlotData.code} - {selectedSlotData.subject}</span>
                      <ChevronDown className="h-4 w-4" />
                    </div>
                  ) : (
                    "Select a class"
                  )}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {slots.map((slot) => (
                  <SelectItem key={slot.id} value={slot.id}>
                    <div className="flex flex-col items-start gap-1">
                      <div className="font-medium">{slot.code} - {slot.subject}</div>
                      <div className="text-xs text-muted-foreground">
                        {slot.day} • {slot.studentCount} students
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      )}

      {/* Main Content */}
      <div className={`grid gap-4 ${isMobile ? 'grid-cols-1' : 'lg:grid-cols-4'}`}>
        {/* Desktop Class Selection Sidebar */}
        {!isMobile && (
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Your Classes</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-1">
                  {slots.map((slot) => (
                    <button
                      key={slot.id}
                      onClick={() => setSelectedSlot(slot.id)}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        selectedSlot === slot.id 
                          ? 'bg-primary text-primary-foreground' 
                          : 'hover:bg-muted'
                      }`}
                    >
                      <div className="font-medium text-sm">{slot.code}</div>
                      <div className="text-xs opacity-75 line-clamp-1">{slot.subject}</div>
                      <div className="text-xs opacity-60 mt-1">
                        {slot.day} • {slot.studentCount} students
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Assignments Content */}
        <div className={`${isMobile ? 'col-span-1' : 'lg:col-span-3'}`}>
          {selectedSlotData && (
            <div className="space-y-4">
              {/* Class Info Header */}
              <Card>
                <CardContent className="p-3 sm:p-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-w-0 flex-1">
                      <h2 className="text-lg sm:text-xl font-semibold truncate">{selectedSlotData.subject}</h2>
                      <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground mt-1">
                        <div className="flex items-center gap-1">
                          <Hash className="h-3 w-3 sm:h-4 sm:w-4" />
                          <span className="truncate">{selectedSlotData.code}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                          <span className="truncate">{selectedSlotData.day}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3 sm:h-4 sm:w-4" />
                          <span>{selectedSlotData.studentCount} students</span>
                        </div>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs sm:text-sm shrink-0">
                      {slotAssignments.length} Assignment{slotAssignments.length !== 1 ? 's' : ''}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Assignments List */}
              {slotAssignments.length > 0 ? (
                <div className="space-y-3 sm:space-y-4">
                  {slotAssignments.map((assignment) => (
                    <Card key={assignment.id} className="hover:shadow-md transition-shadow">
                      <CardHeader className="pb-2 sm:pb-3">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                          <div className="flex flex-wrap items-center gap-2">
                            <Badge className={`${getTypeColor(assignment.type)} text-xs`}>
                              {assignment.type}
                            </Badge>
                            <Badge className={`${getStatusColor(assignment.status)} text-xs`}>
                              {assignment.status}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-1 self-end sm:self-auto">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 w-8 p-0"
                              onClick={() => handleViewAssignment(assignment)}
                            >
                              <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 w-8 p-0"
                              onClick={() => handleEditAssignment(assignment)}
                            >
                              <Edit className="h-3 w-3 sm:h-4 sm:w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 w-8 p-0"
                              onClick={() => handleDeleteAssignment(assignment)}
                            >
                              <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                            </Button>
                          </div>
                        </div>
                        <CardTitle className="text-base sm:text-lg pr-2">{assignment.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <p className="text-muted-foreground text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">
                          {assignment.description}
                        </p>
                        <div className="grid grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
                          <div>
                            <div className="text-muted-foreground mb-1">Due Date</div>
                            <div className="font-medium flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              <span className="truncate">{new Date(assignment.dueDate).toLocaleDateString()}</span>
                            </div>
                          </div>
                          <div>
                            <div className="text-muted-foreground mb-1">Max Points</div>
                            <div className="font-medium">{assignment.maxPoints} pts</div>
                          </div>
                          <div>
                            <div className="text-muted-foreground mb-1">Submissions</div>
                            <div className="font-medium">
                              {assignment.submissions}/{assignment.totalStudents}
                            </div>
                          </div>
                          <div>
                            <div className="text-muted-foreground mb-1">Completion</div>
                            <div className="font-medium">
                              {Math.round((assignment.submissions / assignment.totalStudents) * 100)}%
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="text-center py-8 sm:py-12">
                  <CardContent>
                    <BookOpen className="h-8 w-8 sm:h-12 sm:w-12 mx-auto mb-3 sm:mb-4 text-muted-foreground" />
                    <h3 className="text-base sm:text-lg font-semibold mb-2">No Assignments Yet</h3>
                    <p className="text-muted-foreground text-xs sm:text-sm mb-3 sm:mb-4 px-4">
                      Create your first assignment for this class to get started.
                    </p>
                    <Button onClick={handleCreateAssignment} size={isMobile ? "sm" : "default"}>
                      <Plus className="h-4 w-4 mr-2" />
                      Create Assignment
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </div>
      </div>

      {/* All Dialogs */}
      <CreateAssignmentDialog
        isOpen={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        slots={slots}
        selectedSlot={selectedSlot}
        onAssignmentCreated={handleAssignmentCreated}
      />

      <AssignmentDetailModal
        assignment={selectedAssignment}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        onEdit={handleEditAssignment}
        onDelete={handleDeleteAssignment}
        onViewSubmissions={handleViewSubmissions}
      />

      <EditAssignmentDialog
        assignment={selectedAssignment}
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        onAssignmentUpdated={handleAssignmentUpdated}
      />

      <DeleteAssignmentDialog
        assignment={selectedAssignment}
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onAssignmentDeleted={handleAssignmentDeleted}
      />

      <StudentSubmissionsDialog
        assignment={selectedAssignment}
        isOpen={isSubmissionsDialogOpen}
        onClose={() => setIsSubmissionsDialogOpen(false)}
      />
    </div>
  )
}