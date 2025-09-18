import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Download, Users, Mail, Hash, BookOpen, Clock, ArrowLeft } from "lucide-react"
import { GenericPageSkeleton } from "@/components/ui/page-skeleton"
import { usePageLoading } from "@/hooks/use-page-loading"
import { useIsMobile } from "@/hooks/use-mobile"
import { SEO } from "@/components/SEO"
import { StudentDetailsModal } from "@/components/students/StudentDetailsModal"

export default function StudentsDetails() {
  const isLoading = usePageLoading()
  const isMobile = useIsMobile()
  const location = useLocation()
  const [selectedSlot, setSelectedSlot] = useState<string | null>(
    location.state?.selectedSlot || null
  )
  const [slots, setSlots] = useState<any[]>([])
  const [studentsData, setStudentsData] = useState<{ [key: string]: any[] }>({})
  const [selectedStudent, setSelectedStudent] = useState<any | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Update selectedSlot when location state changes
  useEffect(() => {
    if (location.state?.selectedSlot) {
      setSelectedSlot(location.state.selectedSlot)
    }
  }, [location.state])

  useEffect(() => {
    // Sample slots data for demo
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
    
    // Sample students data organized by slots
    const sampleStudentsData = {
      'CS301-MON-10': [
        { id: '20CS001', name: 'Aarav Sharma', email: 'aarav@college.edu', semester: '6', section: 'A' },
        { id: '20CS014', name: 'Neha Patel', email: 'neha@college.edu', semester: '6', section: 'A' },
        { id: '20CS023', name: 'Rahul Gupta', email: 'rahul@college.edu', semester: '6', section: 'B' },
      ],
      'CS302-TUE-2': [
        { id: '20CS035', name: 'Isha Singh', email: 'isha@college.edu', semester: '6', section: 'B' },
        { id: '20CS047', name: 'Vikram Yadav', email: 'vikram@college.edu', semester: '6', section: 'A' },
      ],
      'CS303-WED-11': [
        { id: '20CS052', name: 'Priya Sharma', email: 'priya@college.edu', semester: '6', section: 'C' },
        { id: '20CS063', name: 'Arjun Patel', email: 'arjun@college.edu', semester: '6', section: 'C' },
        { id: '20CS074', name: 'Kavya Singh', email: 'kavya@college.edu', semester: '6', section: 'B' },
      ],
      'CS304-THU-3': [
        { id: '20CS085', name: 'Dev Kumar', email: 'dev@college.edu', semester: '6', section: 'A' },
        { id: '20CS096', name: 'Shreya Gupta', email: 'shreya@college.edu', semester: '6', section: 'C' },
      ]
    }
    
    setSlots(sampleSlots)
    setStudentsData(sampleStudentsData)
  }, [])

  const currentStudents = selectedSlot ? studentsData[selectedSlot] || [] : []

  const handleStudentClick = (student: any) => {
    setSelectedStudent(student)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedStudent(null)
  }

  if (isLoading) return <GenericPageSkeleton />

  return (
    <div className="space-y-4 p-4 sm:p-6">
      <SEO title="Students Details" description="View the list of students under your classes" />
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          {selectedSlot && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setSelectedSlot(null)}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Slots
            </Button>
          )}
          <div>
            <h1 className="text-xl sm:text-3xl font-bold tracking-tight">
              {selectedSlot ? 'Student List' : 'My Teaching Slots'}
            </h1>
            <p className="text-muted-foreground text-sm hidden sm:block">
              {selectedSlot ? 'Students in selected slot' : 'Select a slot to view students'}
            </p>
          </div>
        </div>
        
        {selectedSlot && (
          <Button variant="outline" className="w-full sm:w-auto">
            <Download className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Export</span>
            <span className="sm:hidden">Export</span>
          </Button>
        )}
      </div>

      {!selectedSlot ? (
        // Slots View
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {slots.map((slot) => (
            <Card 
              key={slot.id} 
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => setSelectedSlot(slot.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-xs">
                    {slot.code}
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    {slot.studentCount} Students
                  </Badge>
                </div>
                <CardTitle className="text-lg line-clamp-1">
                  {slot.subject}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{slot.day} • {slot.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Hash className="h-4 w-4" />
                    <span>{slot.room}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        // Students View for Selected Slot
        <Card>
          <CardHeader className="pb-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Users className="h-5 w-5" />
                  {slots.find(s => s.id === selectedSlot)?.subject || 'Students'}
                </CardTitle>
                <CardDescription className="text-sm">
                  {slots.find(s => s.id === selectedSlot)?.day} • {slots.find(s => s.id === selectedSlot)?.time} • {slots.find(s => s.id === selectedSlot)?.room}
                </CardDescription>
              </div>
              <Badge variant="outline" className="w-fit">
                {currentStudents.length} Students
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-3 sm:p-6">
            {/* Desktop Table View */}
            <div className="hidden md:block rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Semester</TableHead>
                    <TableHead>Section</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentStudents.map((s) => (
                    <TableRow key={s.id}>
                      <TableCell className="font-mono font-semibold">{s.id}</TableCell>
                      <TableCell>
                        <button
                          onClick={() => handleStudentClick(s)}
                          className="text-left hover:text-primary hover:underline transition-colors font-medium"
                        >
                          {s.name}
                        </button>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{s.email}</TableCell>
                      <TableCell>{s.semester}</TableCell>
                      <TableCell>{s.section}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-3">
              {currentStudents.map((s) => (
                <Card 
                  key={s.id} 
                  className="p-4 cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleStudentClick(s)}
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="font-mono font-bold text-sm">{s.id}</div>
                        <div className="font-semibold hover:text-primary transition-colors">{s.name}</div>
                      </div>
                      <div className="text-right text-sm">
                        <div className="flex items-center gap-1">
                          <BookOpen className="h-3 w-3" />
                          Sem {s.semester}
                        </div>
                        <div className="text-muted-foreground">Sec {s.section}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Mail className="h-4 w-4" />
                      {s.email}
                    </div>
                  </div>
                </Card>
              ))}
              {currentStudents.length === 0 && (
                <div className="text-center text-muted-foreground py-8">
                  No students in this slot
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Student Details Modal */}
      <StudentDetailsModal
        student={selectedStudent}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  )
}
