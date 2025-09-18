import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Upload, Save, BookOpen, Clock, ArrowLeft, Hash, Users, Edit3, Mail, BarChart3, FileUp, Download, Settings } from "lucide-react"
import { GenericPageSkeleton } from "@/components/ui/page-skeleton"
import { usePageLoading } from "@/hooks/use-page-loading"
import { useIsMobile } from "@/hooks/use-mobile"
import { SEO } from "@/components/SEO"
import { DetailedMarksDialog } from "@/components/marks/DetailedMarksDialog"
import { ClassStatistics } from "@/components/marks/ClassStatistics"
import { BulkUploadDialog } from "@/components/marks/BulkUploadDialog"

interface MarkEntry {
  id: string
  studentId: string
  studentName: string
  internal: number
  external: number
  total: number
  grade: string
  gp: number
  createdAt: string
}

interface SlotData {
  id: string
  subject: string
  code: string
  time: string
  day: string
  room: string
  semester: string
  credits: number
  studentCount: number
}

interface Student {
  id: string
  name: string
  email: string
  semester: string
  section: string
}

export default function UploadMarks() {
  const isLoading = usePageLoading()
  const isMobile = useIsMobile()
  const { toast } = useToast()
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null)
  const [slots, setSlots] = useState<SlotData[]>([])
  const [marksData, setMarksData] = useState<{ [key: string]: MarkEntry[] }>({})
  const [studentsData, setStudentsData] = useState<{ [key: string]: Student[] }>({})
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [detailedDialogOpen, setDetailedDialogOpen] = useState(false)
  const [bulkUploadOpen, setBulkUploadOpen] = useState(false)
  const [form, setForm] = useState({ internal: '', external: '' })

  useEffect(() => {
    // Sample slots data
    const sampleSlots: SlotData[] = [
      { 
        id: 'CS301-MON-10', 
        subject: 'Database Management Systems', 
        code: 'CS301',
        time: '10:00 AM - 11:00 AM', 
        day: 'Monday', 
        room: 'Lab-A',
        semester: '6th Semester',
        credits: 4,
        studentCount: 25 
      },
      { 
        id: 'CS302-TUE-2', 
        subject: 'Software Engineering', 
        code: 'CS302',
        time: '2:00 PM - 3:00 PM', 
        day: 'Tuesday', 
        room: 'Room-101',
        semester: '6th Semester',
        credits: 4,
        studentCount: 18 
      },
      { 
        id: 'CS303-WED-11', 
        subject: 'Computer Networks', 
        code: 'CS303',
        time: '11:00 AM - 12:00 PM', 
        day: 'Wednesday', 
        room: 'Room-205',
        semester: '6th Semester',
        credits: 4,
        studentCount: 22 
      },
      { 
        id: 'CS304-THU-3', 
        subject: 'Operating Systems', 
        code: 'CS304',
        time: '3:00 PM - 4:00 PM', 
        day: 'Thursday', 
        room: 'Lab-B',
        semester: '6th Semester',
        credits: 4,
        studentCount: 20 
      }
    ]
    
    // Sample students data organized by slots
    const sampleStudentsData = {
      'CS301-MON-10': [
        { id: '20CS001', name: 'Aarav Sharma', email: 'aarav@college.edu', semester: '6', section: 'A' },
        { id: '20CS014', name: 'Neha Patel', email: 'neha@college.edu', semester: '6', section: 'A' },
        { id: '20CS023', name: 'Rahul Gupta', email: 'rahul@college.edu', semester: '6', section: 'B' },
        { id: '20CS031', name: 'Priya Singh', email: 'priya@college.edu', semester: '6', section: 'A' },
        { id: '20CS042', name: 'Vikram Yadav', email: 'vikram@college.edu', semester: '6', section: 'B' },
      ],
      'CS302-TUE-2': [
        { id: '20CS035', name: 'Isha Singh', email: 'isha@college.edu', semester: '6', section: 'B' },
        { id: '20CS047', name: 'Vikram Yadav', email: 'vikram@college.edu', semester: '6', section: 'A' },
        { id: '20CS058', name: 'Kavya Patel', email: 'kavya@college.edu', semester: '6', section: 'C' },
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

    // Sample existing marks data
    const sampleMarksData = {
      'CS301-MON-10': [
        { 
          id: '1', 
          studentId: '20CS001', 
          studentName: 'Aarav Sharma',
          internal: 28, 
          external: 75, 
          total: 103,
          grade: 'A+',
          gp: 10,
          createdAt: new Date().toISOString() 
        },
        { 
          id: '2', 
          studentId: '20CS014', 
          studentName: 'Neha Patel',
          internal: 25, 
          external: 70, 
          total: 95,
          grade: 'A',
          gp: 9,
          createdAt: new Date().toISOString() 
        }
      ]
    }
    
    setSlots(sampleSlots)
    setStudentsData(sampleStudentsData)
    setMarksData(sampleMarksData)
  }, [])

  const calculateGrade = (total: number): { grade: string, gp: number } => {
    if (total >= 90) return { grade: 'A+', gp: 10 }
    if (total >= 80) return { grade: 'A', gp: 9 }
    if (total >= 70) return { grade: 'B+', gp: 8 }
    if (total >= 60) return { grade: 'B', gp: 7 }
    if (total >= 50) return { grade: 'C+', gp: 6 }
    if (total >= 40) return { grade: 'C', gp: 5 }
    return { grade: 'F', gp: 0 }
  }

  const handleStudentClick = (student: Student) => {
    setSelectedStudent(student)
    
    // Pre-fill form with existing marks if available
    const existingMark = currentMarks.find(m => m.studentId === student.id)
    if (existingMark) {
      setForm({
        internal: existingMark.internal.toString(),
        external: existingMark.external.toString()
      })
    } else {
      setForm({ internal: '', external: '' })
    }
    
    setDialogOpen(true)
  }

  const handleSaveMarks = () => {
    if (!selectedStudent || !selectedSlot) return
    
    const internal = Number(form.internal) || 0
    const external = Number(form.external) || 0
    const total = internal + external
    const { grade, gp } = calculateGrade(total)
    
    const newEntry: MarkEntry = {
      id: crypto.randomUUID(),
      studentId: selectedStudent.id,
      studentName: selectedStudent.name,
      internal,
      external,
      total,
      grade,
      gp,
      createdAt: new Date().toISOString(),
    }
    
    // Remove existing entry for this student if any
    const filteredMarks = (marksData[selectedSlot] || []).filter(m => m.studentId !== selectedStudent.id)
    
    const updatedMarksData = {
      ...marksData,
      [selectedSlot]: [newEntry, ...filteredMarks]
    }
    
    setMarksData(updatedMarksData)
    setForm({ internal: '', external: '' })
    setDialogOpen(false)
    setSelectedStudent(null)
    toast({ title: 'Marks saved', description: `${selectedStudent.name} - ${grade}` })
  }

  const handleDetailedMarksClick = (student: Student) => {
    setSelectedStudent(student)
    setDetailedDialogOpen(true)
  }

  const handleSaveDetailedMarks = (detailedMarks: any) => {
    if (!selectedStudent || !selectedSlot) return

    const internal = (Object.values(detailedMarks.internal) as number[]).reduce((sum, mark) => sum + mark, 0)
    const external = (Object.values(detailedMarks.external) as number[]).reduce((sum, mark) => sum + mark, 0)
    const total = internal + external
    const { grade, gp } = calculateGrade(total)
    
    const newEntry: MarkEntry = {
      id: crypto.randomUUID(),
      studentId: selectedStudent.id,
      studentName: selectedStudent.name,
      internal,
      external,
      total,
      grade,
      gp,
      createdAt: new Date().toISOString(),
    }
    
    // Remove existing entry for this student if any
    const filteredMarks = (marksData[selectedSlot] || []).filter(m => m.studentId !== selectedStudent.id)
    
    const updatedMarksData = {
      ...marksData,
      [selectedSlot]: [newEntry, ...filteredMarks]
    }
    
    setMarksData(updatedMarksData)
    setSelectedStudent(null)
    toast({ title: 'Detailed marks saved', description: `${selectedStudent.name} - ${grade}` })
  }

  const handleBulkUpload = (bulkMarks: any[]) => {
    if (!selectedSlot) return

    const newEntries = bulkMarks.map(mark => ({
      id: crypto.randomUUID(),
      studentId: mark.studentId,
      studentName: studentsData[selectedSlot]?.find(s => s.id === mark.studentId)?.name || 'Unknown',
      internal: mark.internal,
      external: mark.external,
      total: mark.total,
      grade: mark.grade,
      gp: mark.gp,
      createdAt: new Date().toISOString(),
    }))

    // Remove existing entries for uploaded students
    const existingMarks = marksData[selectedSlot] || []
    const uploadedStudentIds = bulkMarks.map(m => m.studentId)
    const filteredMarks = existingMarks.filter(m => !uploadedStudentIds.includes(m.studentId))
    
    const updatedMarksData = {
      ...marksData,
      [selectedSlot]: [...newEntries, ...filteredMarks]
    }
    
    setMarksData(updatedMarksData)
    toast({ 
      title: 'Bulk upload successful', 
      description: `Uploaded marks for ${bulkMarks.length} students` 
    })
  }

  const exportMarks = () => {
    if (!selectedSlot || !currentSlot) return

    const headers = ['StudentID', 'Name', 'Internal', 'External', 'Total', 'Grade', 'GP']
    const csvContent = [
      headers.join(','),
      ...currentMarks.map(mark => [
        mark.studentId,
        `"${mark.studentName}"`,
        mark.internal,
        mark.external,
        mark.total,
        mark.grade,
        mark.gp
      ].join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.style.display = 'none'
    a.href = url
    a.download = `${currentSlot.code}_marks_${new Date().toISOString().split('T')[0]}.csv`
    document.body.appendChild(a)
    a.click()
    window.URL.revokeObjectURL(url)
    document.body.removeChild(a)
    
    toast({ title: 'Export successful', description: 'Marks data downloaded as CSV' })
  }

  const currentMarks = selectedSlot ? marksData[selectedSlot] || [] : []
  const currentStudents = selectedSlot ? studentsData[selectedSlot] || [] : []
  const currentSlot = slots.find(s => s.id === selectedSlot)

  const getStudentMark = (studentId: string) => {
    return currentMarks.find(m => m.studentId === studentId)
  }

  if (isLoading) return <GenericPageSkeleton />

  return (
    <div className="space-y-4 p-4 sm:p-6">
      <SEO title="Upload Marks" description="Upload internal and external marks for your students" />
      
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
              Back to Subjects
            </Button>
          )}
          <div>
            <h1 className="text-xl sm:text-3xl font-bold tracking-tight">
              {selectedSlot ? 'Upload Marks' : 'My Teaching Subjects'}
            </h1>
            <p className="text-muted-foreground text-sm hidden sm:block">
              {selectedSlot ? 'Record internal and external scores' : 'Select a subject to upload marks'}
            </p>
          </div>
        </div>
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
                    {marksData[slot.id]?.length || 0} Marks
                  </Badge>
                </div>
                <CardTitle className="text-lg line-clamp-2">
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
                    <span>{slot.room} • {slot.credits} Credits</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span>{slot.studentCount} Students</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        // Students List View for Selected Slot
        <div className="space-y-6">
          {/* Subject Info */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <BookOpen className="h-5 w-5" />
                    {currentSlot?.subject}
                  </CardTitle>
                  <CardDescription className="text-sm">
                    {currentSlot?.code} • {currentSlot?.day} • {currentSlot?.time} • {currentSlot?.room}
                  </CardDescription>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Badge variant="outline">
                    {currentSlot?.credits} Credits
                  </Badge>
                  <Badge variant="secondary">
                    {currentMarks.length}/{currentStudents.length} Updated
                  </Badge>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2 mb-4">
            <Button
              onClick={() => setBulkUploadOpen(true)}
              className="flex items-center gap-2"
            >
              <FileUp className="h-4 w-4" />
              Bulk Upload
            </Button>
            <Button
              onClick={exportMarks}
              variant="outline"
              disabled={currentMarks.length === 0}
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Export CSV
            </Button>
          </div>

          {/* Class Statistics */}
          <ClassStatistics 
            marks={currentMarks} 
            totalStudents={currentStudents.length}
            subjectName={currentSlot?.subject}
          />

          {/* Students List */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Users className="h-5 w-5" />
                Students ({currentStudents.length})
              </CardTitle>
              <CardDescription className="text-sm">
                Click on any student to update their marks
              </CardDescription>
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
                      <TableHead>Section</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Grade</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentStudents.map((student) => {
                      const studentMark = getStudentMark(student.id)
                      return (
                        <TableRow key={student.id} className="cursor-pointer hover:bg-muted/50" onClick={() => handleStudentClick(student)}>
                          <TableCell className="font-mono font-semibold">{student.id}</TableCell>
                          <TableCell>{student.name}</TableCell>
                          <TableCell className="text-muted-foreground">{student.email}</TableCell>
                          <TableCell>{student.section}</TableCell>
                          <TableCell>
                            <Badge variant={studentMark ? "default" : "outline"}>
                              {studentMark ? "Graded" : "Pending"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {studentMark ? (
                              <Badge variant={studentMark.grade.includes('+') ? "default" : "secondary"}>
                                {studentMark.grade}
                              </Badge>
                            ) : (
                              <span className="text-muted-foreground">-</span>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleStudentClick(student);
                                }}
                                title="Quick Entry"
                              >
                                <Edit3 className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDetailedMarksClick(student);
                                }}
                                title="Detailed Entry"
                              >
                                <Settings className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </div>

              {/* Mobile Card View */}
              <div className="md:hidden space-y-3">
                {currentStudents.map((student) => {
                  const studentMark = getStudentMark(student.id)
                  return (
                    <Card 
                      key={student.id} 
                      className="p-4 cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => handleStudentClick(student)}
                    >
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <div className="font-mono font-bold text-sm">{student.id}</div>
                            <div className="font-semibold">{student.name}</div>
                          </div>
                          <div className="text-right space-y-1">
                            <Badge variant={studentMark ? "default" : "outline"} className="text-xs">
                              {studentMark ? "Graded" : "Pending"}
                            </Badge>
                            {studentMark && (
                              <div>
                                <Badge variant={studentMark.grade.includes('+') ? "default" : "secondary"} className="text-xs">
                                  {studentMark.grade}
                                </Badge>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Mail className="h-4 w-4" />
                          {student.email}
                        </div>
                        <div className="flex items-center justify-between pt-2 border-t">
                          <span className="text-sm text-muted-foreground">Sec {student.section}</span>
                          <div className="flex items-center gap-1">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleStudentClick(student);
                              }}
                              title="Quick Entry"
                            >
                              <Edit3 className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDetailedMarksClick(student);
                              }}
                              title="Detailed Entry"
                            >
                              <Settings className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  )
                })}
                {currentStudents.length === 0 && (
                  <div className="text-center text-muted-foreground py-8">
                    No students in this slot
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Marks Entry Dialog */}
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  Update Marks
                </DialogTitle>
                <DialogDescription>
                  {selectedStudent && (
                    <>
                      <div className="font-mono font-semibold">{selectedStudent.id}</div>
                      <div>{selectedStudent.name}</div>
                    </>
                  )}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="internal">Internal Marks (Max: 30)</Label>
                  <Input
                    id="internal"
                    type="number"
                    placeholder="Enter internal marks"
                    value={form.internal}
                    onChange={(e) => setForm({ ...form, internal: e.target.value })}
                    max="30"
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="external">External Marks (Max: 70)</Label>
                  <Input
                    id="external"
                    type="number"
                    placeholder="Enter external marks"
                    value={form.external}
                    onChange={(e) => setForm({ ...form, external: e.target.value })}
                    max="70"
                    className="h-11"
                  />
                </div>
                {form.internal && form.external && (
                  <div className="p-3 bg-muted rounded-md text-sm">
                    <div className="flex justify-between">
                      <span>Total:</span>
                      <span className="font-semibold">{Number(form.internal) + Number(form.external)}/100</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Grade:</span>
                      <span className="font-semibold">{calculateGrade(Number(form.internal) + Number(form.external)).grade}</span>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setDialogOpen(false)} className="flex-1">
                  Cancel
                </Button>
                <Button onClick={handleSaveMarks} className="flex-1">
                  <Save className="h-4 w-4 mr-2" />
                  Save Marks
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          {/* Detailed Marks Dialog */}
          <DetailedMarksDialog
            student={selectedStudent}
            isOpen={detailedDialogOpen}
            onClose={() => setDetailedDialogOpen(false)}
            onSave={handleSaveDetailedMarks}
          />

          {/* Bulk Upload Dialog */}
          <BulkUploadDialog
            isOpen={bulkUploadOpen}
            onClose={() => setBulkUploadOpen(false)}
            onUpload={handleBulkUpload}
            students={currentStudents}
            subjectName={currentSlot?.subject}
          />
        </div>
      )}
    </div>
  )
}
