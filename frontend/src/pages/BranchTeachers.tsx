import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Plus, Edit, Trash2, UserCog, Mail, Search, Eye, Phone, Building, Calendar, BookOpen, GraduationCap } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { GenericPageSkeleton } from "@/components/ui/page-skeleton"
import { usePageLoading } from "@/hooks/use-page-loading"
import { Input } from "@/components/ui/input"
import { SEO } from "@/components/SEO"
import { Badge } from "@/components/ui/badge"
import { TeacherDetailsModal } from "@/components/admin/TeacherDetailsModal"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function BranchTeachers() {
  const { branch } = useParams<{ branch: string }>()
  const navigate = useNavigate()
  const isLoading = usePageLoading()
  const { toast } = useToast()
  const [teachers, setTeachers] = useState<any[]>([])
  const [previousSessions, setPreviousSessions] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTeacher, setSelectedTeacher] = useState<any>(null)
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)

  const decodedBranch = branch ? decodeURIComponent(branch) : ""

  useEffect(() => {
    // Current teachers
    const currentTeachers = [
      {
        id: 'EMP-001',
        name: 'Prof. John Doe',
        email: 'john.doe@college.edu',
        phone: '+91 9876543230',
        department: 'Computer Science',
        designation: 'Professor',
        employeeId: 'EMP-001',
        joiningDate: '2018-07-15',
        qualification: 'Ph.D in Computer Science',
        experience: 12,
        subjects: ['Data Structures', 'Algorithms', 'Machine Learning'],
        officeRoom: 'CS-201',
        status: 'active' as const,
        salary: 85000,
        session: '2018-Present'
      },
      {
        id: 'EMP-002',
        name: 'Dr. Sarah Wilson',
        email: 'sarah.wilson@college.edu',
        phone: '+91 9876543235',
        department: 'Computer Science',
        designation: 'Associate Professor',
        employeeId: 'EMP-002',
        joiningDate: '2020-01-10',
        qualification: 'Ph.D in Computer Science',
        experience: 8,
        subjects: ['Software Engineering', 'Database Systems', 'Web Development'],
        officeRoom: 'CS-205',
        status: 'active' as const,
        salary: 75000,
        session: '2020-Present'
      }
    ]

    // Previous session teachers
    const previousTeachersData = [
      {
        id: 'EMP-P001',
        name: 'Prof. Michael Brown',
        email: 'michael.brown@former.edu',
        phone: '+91 9876543240',
        department: 'Computer Science',
        designation: 'Professor',
        employeeId: 'EMP-P001',
        joiningDate: '2015-08-01',
        leavingDate: '2023-05-31',
        qualification: 'Ph.D in Computer Science',
        experience: 15,
        subjects: ['Computer Networks', 'Operating Systems', 'Cybersecurity'],
        officeRoom: 'CS-210',
        status: 'retired' as const,
        salary: 90000,
        session: '2015-2023'
      },
      {
        id: 'EMP-P002',
        name: 'Dr. Lisa Anderson',
        email: 'lisa.anderson@former.edu',
        phone: '+91 9876543241',
        department: 'Computer Science',
        designation: 'Assistant Professor',
        employeeId: 'EMP-P002',
        joiningDate: '2017-01-15',
        leavingDate: '2022-12-31',
        qualification: 'Ph.D in Computer Science',
        experience: 10,
        subjects: ['Artificial Intelligence', 'Data Mining', 'Machine Learning'],
        officeRoom: 'CS-203',
        status: 'transferred' as const,
        salary: 70000,
        session: '2017-2022'
      }
    ]

    // Filter teachers for the specific branch
    const branchTeachers = currentTeachers.filter(t => t.department === decodedBranch)
    const branchPreviousTeachers = previousTeachersData.filter(t => t.department === decodedBranch)
    
    setTeachers(branchTeachers)
    setPreviousSessions(branchPreviousTeachers)
  }, [decodedBranch])

  const handleAdd = () => toast({ title: 'Add Teacher', description: 'Open add teacher form (coming soon)' })
  const handleEdit = (id: string) => toast({ title: 'Edit Teacher', description: id })
  const handleDelete = (id: string, isPrevious = false) => {
    if (isPrevious) {
      setPreviousSessions(prev => prev.filter(t => t.id !== id))
    } else {
      setTeachers(prev => prev.filter(t => t.id !== id))
    }
    toast({ title: 'Teacher removed', description: id })
  }

  const handleViewDetails = (teacher: any) => {
    setSelectedTeacher(teacher)
    setIsDetailsModalOpen(true)
  }

  const filterTeachers = (teacherList: any[]) => {
    return teacherList.filter(teacher => {
      return teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        teacher.employeeId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        teacher.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        teacher.designation.toLowerCase().includes(searchQuery.toLowerCase()) ||
        teacher.session.toLowerCase().includes(searchQuery.toLowerCase())
    })
  }

  const filteredCurrentTeachers = filterTeachers(teachers)
  const filteredPreviousTeachers = filterTeachers(previousSessions)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'retired': return 'bg-blue-100 text-blue-800'
      case 'transferred': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const TeacherTable = ({ teacherList, isPrevious = false }: { teacherList: any[], isPrevious?: boolean }) => (
    <>
      {/* Desktop Table View */}
      <div className="hidden md:block rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Employee ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Designation</TableHead>
              <TableHead>Experience</TableHead>
              <TableHead>Session</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {teacherList.map((teacher) => (
              <TableRow key={teacher.id}>
                <TableCell className="font-mono font-semibold">{teacher.employeeId}</TableCell>
                <TableCell className="font-medium">{teacher.name}</TableCell>
                <TableCell>{teacher.designation}</TableCell>
                <TableCell>{teacher.experience} years</TableCell>
                <TableCell>
                  <Badge variant="outline">{teacher.session}</Badge>
                </TableCell>
                <TableCell>
                  <Badge className={getStatusColor(teacher.status)}>
                    {teacher.status.charAt(0).toUpperCase() + teacher.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Button size="sm" variant="outline" onClick={() => handleViewDetails(teacher)}>
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleEdit(teacher.id)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(teacher.id, isPrevious)}>
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
        {teacherList.map((teacher) => (
          <Card key={teacher.id} className="p-4">
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="font-mono font-bold text-sm">{teacher.employeeId}</div>
                  <div className="font-semibold">{teacher.name}</div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">{teacher.session}</Badge>
                    <Badge className={getStatusColor(teacher.status) + " text-xs"}>
                      {teacher.status.charAt(0).toUpperCase() + teacher.status.slice(1)}
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">{teacher.designation}</div>
                  <div className="text-xs text-muted-foreground">{teacher.experience} years exp</div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  {teacher.email}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  {teacher.phone}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Building className="h-4 w-4" />
                  Office: {teacher.officeRoom}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  Joined: {new Date(teacher.joiningDate).toLocaleDateString()}
                </div>
                {teacher.leavingDate && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    Left: {new Date(teacher.leavingDate).toLocaleDateString()}
                  </div>
                )}
              </div>
              <div className="flex gap-2 pt-2">
                <Button size="sm" variant="outline" onClick={() => handleViewDetails(teacher)} className="flex-1">
                  <Eye className="h-4 w-4 mr-2" />
                  View
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleEdit(teacher.id)} className="flex-1">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                <Button size="sm" variant="destructive" onClick={() => handleDelete(teacher.id, isPrevious)} className="flex-1">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </div>
            </div>
          </Card>
        ))}
        {teacherList.length === 0 && (
          <div className="text-center text-muted-foreground py-8">
            No teachers found matching your search
          </div>
        )}
      </div>
    </>
  )

  if (isLoading) return <GenericPageSkeleton />

  return (
    <div className="space-y-4 p-4 sm:p-6">
      <SEO title={`${decodedBranch} Teachers`} description={`Manage teachers in ${decodedBranch} department`} />
      
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
          <h1 className="text-lg sm:text-2xl lg:text-3xl font-bold tracking-tight truncate">{decodedBranch} Teachers</h1>
        </div>
        <Button onClick={handleAdd} className="hidden sm:flex">
          <Plus className="h-4 w-4 mr-2" />
          Add Teacher
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <UserCog className="h-5 w-5" /> 
            {decodedBranch} Department
            <Badge variant="secondary" className="ml-2">
              {filteredCurrentTeachers.length + filteredPreviousTeachers.length} Total
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-3 sm:p-6">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search teachers by name, employee ID, email, or session..."
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
                Current ({filteredCurrentTeachers.length})
              </TabsTrigger>
              <TabsTrigger value="previous" className="flex items-center gap-2">
                <GraduationCap className="h-4 w-4" />
                Previous ({filteredPreviousTeachers.length})
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="current" className="mt-6">
              <TeacherTable teacherList={filteredCurrentTeachers} />
            </TabsContent>
            
            <TabsContent value="previous" className="mt-6">
              <TeacherTable teacherList={filteredPreviousTeachers} isPrevious={true} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <TeacherDetailsModal
        open={isDetailsModalOpen}
        onOpenChange={setIsDetailsModalOpen}
        teacher={selectedTeacher}
      />
    </div>
  )
}