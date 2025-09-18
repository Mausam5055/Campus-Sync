import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Plus, Edit, Trash2, Users, Mail, Search, Eye, Phone, Calendar, BookOpen, GraduationCap } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { GenericPageSkeleton } from "@/components/ui/page-skeleton"
import { usePageLoading } from "@/hooks/use-page-loading"
import { Input } from "@/components/ui/input"
import { SEO } from "@/components/SEO"
import { Badge } from "@/components/ui/badge"
import { StudentDetailsModal } from "@/components/admin/StudentDetailsModal"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function BranchStudents() {
  const { branch } = useParams<{ branch: string }>()
  const navigate = useNavigate()
  const isLoading = usePageLoading()
  const { toast } = useToast()
  const [students, setStudents] = useState<any[]>([])
  const [previousSessions, setPreviousSessions] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStudent, setSelectedStudent] = useState<any>(null)
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)

  const decodedBranch = branch ? decodeURIComponent(branch) : ""

  useEffect(() => {
    // Current session students
    const currentStudents = [
      {
        id: 'CS-001',
        name: 'Arjun Patel',
        email: 'arjun.patel@student.edu',
        phone: '+91 9876543210',
        rollNumber: 'CS21001',
        branch: 'Computer Science',
        semester: 6,
        year: 3,
        session: '2021-25',
        cgpa: 8.5,
        dateOfBirth: '2003-05-15',
        address: '123 Tech Street, Mumbai',
        guardianName: 'Rajesh Patel',
        guardianPhone: '+91 9876543211',
        status: 'active' as const
      },
      // ... more current students for this branch
    ]

    // Previous sessions students
    const previousStudentsData = [
      {
        id: 'CS-P001',
        name: 'Ravi Sharma',
        email: 'ravi.sharma@alumni.edu',
        phone: '+91 9876543220',
        rollNumber: 'CS20001',
        branch: 'Computer Science',
        semester: 8,
        year: 4,
        session: '2020-24',
        cgpa: 9.1,
        dateOfBirth: '2002-03-10',
        address: '456 Alumni Lane, Delhi',
        guardianName: 'Suresh Sharma',
        guardianPhone: '+91 9876543221',
        status: 'graduated' as const,
        graduationDate: '2024-05-15'
      },
      {
        id: 'CS-P002',
        name: 'Priya Gupta',
        email: 'priya.gupta@alumni.edu',
        phone: '+91 9876543222',
        rollNumber: 'CS19001',
        branch: 'Computer Science',
        semester: 8,
        year: 4,
        session: '2019-23',
        cgpa: 8.8,
        dateOfBirth: '2001-07-22',
        address: '789 Graduate Colony, Pune',
        guardianName: 'Amit Gupta',
        guardianPhone: '+91 9876543223',
        status: 'graduated' as const,
        graduationDate: '2023-05-20'
      }
    ]

    // Filter students for the specific branch
    const branchStudents = currentStudents.filter(s => s.branch === decodedBranch)
    const branchPreviousStudents = previousStudentsData.filter(s => s.branch === decodedBranch)
    
    setStudents(branchStudents)
    setPreviousSessions(branchPreviousStudents)
  }, [decodedBranch])

  const handleAdd = () => toast({ title: 'Add Student', description: 'Open add student form (coming soon)' })
  const handleEdit = (id: string) => toast({ title: 'Edit Student', description: id })
  const handleDelete = (id: string, isPrevious = false) => {
    if (isPrevious) {
      setPreviousSessions(prev => prev.filter(s => s.id !== id))
    } else {
      setStudents(prev => prev.filter(s => s.id !== id))
    }
    toast({ title: 'Student removed', description: id })
  }

  const handleViewDetails = (student: any) => {
    setSelectedStudent(student)
    setIsDetailsModalOpen(true)
  }

  const filterStudents = (studentList: any[]) => {
    return studentList.filter(student => {
      return student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.rollNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.session.toLowerCase().includes(searchQuery.toLowerCase())
    })
  }

  const filteredCurrentStudents = filterStudents(students)
  const filteredPreviousStudents = filterStudents(previousSessions)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'graduated': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const StudentTable = ({ studentList, isPrevious = false }: { studentList: any[], isPrevious?: boolean }) => (
    <>
      {/* Desktop Table View */}
      <div className="hidden md:block rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Roll Number</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Session</TableHead>
              <TableHead>Semester</TableHead>
              <TableHead>CGPA</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {studentList.map((student) => (
              <TableRow key={student.id}>
                <TableCell className="font-mono font-semibold">{student.rollNumber}</TableCell>
                <TableCell className="font-medium">{student.name}</TableCell>
                <TableCell>
                  <Badge variant="outline">{student.session}</Badge>
                </TableCell>
                <TableCell>{student.semester}</TableCell>
                <TableCell className="font-semibold">{student.cgpa}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(student.status)}>
                    {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Button size="sm" variant="outline" onClick={() => handleViewDetails(student)}>
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleEdit(student.id)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(student.id, isPrevious)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-3">
        {studentList.map((student) => (
          <Card key={student.id} className="p-4">
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="font-mono font-bold text-sm">{student.rollNumber}</div>
                  <div className="font-semibold">{student.name}</div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">{student.session}</Badge>
                    <Badge className={getStatusColor(student.status) + " text-xs"}>
                      {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">Sem {student.semester}</div>
                  <div className="text-xs text-muted-foreground">CGPA: {student.cgpa}</div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  {student.email}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  {student.phone}
                </div>
                {student.graduationDate && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <GraduationCap className="h-4 w-4" />
                    Graduated: {new Date(student.graduationDate).toLocaleDateString()}
                  </div>
                )}
              </div>
              <div className="flex gap-2 pt-2">
                <Button size="sm" variant="outline" onClick={() => handleViewDetails(student)} className="flex-1">
                  <Eye className="h-4 w-4 mr-2" />
                  View
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleEdit(student.id)} className="flex-1">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                <Button size="sm" variant="destructive" onClick={() => handleDelete(student.id, isPrevious)} className="flex-1">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </div>
            </div>
          </Card>
        ))}
        {studentList.length === 0 && (
          <div className="text-center text-muted-foreground py-8">
            No students found matching your search
          </div>
        )}
      </div>
    </>
  )

  if (isLoading) return <GenericPageSkeleton />

  return (
    <div className="space-y-4 p-4 sm:p-6">
      <SEO title={`${decodedBranch} Students`} description={`Manage students in ${decodedBranch} department`} />
      
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Mobile - Icon only */}
        <Button variant="outline" size="sm" onClick={() => navigate(-1)} className="sm:hidden">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        
        {/* Desktop - Icon + Text */}
        <Button variant="outline" size="sm" onClick={() => navigate(-1)} className="hidden sm:flex">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        
        <div className="flex-1 min-w-0">
          <h1 className="text-lg sm:text-2xl lg:text-3xl font-bold tracking-tight truncate">{decodedBranch} Students</h1>
        </div>
        <Button onClick={handleAdd} className="hidden sm:flex">
          <Plus className="h-4 w-4 mr-2" />
          Add Student
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Users className="h-5 w-5" /> 
            {decodedBranch} Department
            <Badge variant="secondary" className="ml-2">
              {filteredCurrentStudents.length + filteredPreviousStudents.length} Total
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-3 sm:p-6">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search students by name, roll number, email, or session..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-10 w-full sm:max-w-sm"
              />
            </div>
          </div>

          <Tabs defaultValue="current" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="current" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Current Session ({filteredCurrentStudents.length})
              </TabsTrigger>
              <TabsTrigger value="previous" className="flex items-center gap-2">
                <GraduationCap className="h-4 w-4" />
                Previous Sessions ({filteredPreviousStudents.length})
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="current" className="mt-6">
              <StudentTable studentList={filteredCurrentStudents} />
            </TabsContent>
            
            <TabsContent value="previous" className="mt-6">
              <StudentTable studentList={filteredPreviousStudents} isPrevious={true} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <StudentDetailsModal
        open={isDetailsModalOpen}
        onOpenChange={setIsDetailsModalOpen}
        student={selectedStudent}
      />
    </div>
  )
}