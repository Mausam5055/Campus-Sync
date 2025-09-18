import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Plus, Edit, Trash2, Users, Mail, Search, Eye, Phone, MapPin, GraduationCap } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { GenericPageSkeleton } from "@/components/ui/page-skeleton"
import { usePageLoading } from "@/hooks/use-page-loading"
import { useIsMobile } from "@/hooks/use-mobile"
import { Input } from "@/components/ui/input"
import { SEO } from "@/components/SEO"
import { Badge } from "@/components/ui/badge"
import { BranchSelector } from "@/components/admin/BranchSelector"
import { StudentDetailsModal } from "@/components/admin/StudentDetailsModal"

export default function ManageStudents() {
  const isLoading = usePageLoading()
  const isMobile = useIsMobile()
  const { toast } = useToast()
  const [students, setStudents] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedBranch, setSelectedBranch] = useState("all")
  const [selectedStudent, setSelectedStudent] = useState<any>(null)
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)

  const branches = ["Computer Science", "Electronics & Communication", "Mechanical Engineering", "Civil Engineering", "Information Technology"]

  useEffect(() => {
    setStudents([
      {
        id: '20CS001',
        name: 'Aarav Sharma',
        email: 'aarav.sharma@college.edu',
        phone: '+91 9876543210',
        branch: 'Computer Science',
        semester: 6,
        rollNumber: '20CS001',
        admissionYear: '2020',
        address: '123 Main Street, New Delhi, India',
        parentName: 'Rajesh Sharma',
        parentPhone: '+91 9876543211',
        status: 'active' as const,
        gpa: 8.5
      },
      {
        id: '20EC014',
        name: 'Neha Patel',
        email: 'neha.patel@college.edu',
        phone: '+91 9876543212',
        branch: 'Electronics & Communication',
        semester: 4,
        rollNumber: '20EC014',
        admissionYear: '2020',
        address: '456 Park Avenue, Mumbai, India',
        parentName: 'Amit Patel',
        parentPhone: '+91 9876543213',
        status: 'active' as const,
        gpa: 9.1
      },
      {
        id: '20ME023',
        name: 'Rahul Gupta',
        email: 'rahul.gupta@college.edu',
        phone: '+91 9876543214',
        branch: 'Mechanical Engineering',
        semester: 8,
        rollNumber: '20ME023',
        admissionYear: '2020',
        address: '789 Tech Hub, Bangalore, India',
        parentName: 'Suresh Gupta',
        parentPhone: '+91 9876543215',
        status: 'active' as const,
        gpa: 7.8
      },
      {
        id: '21CS045',
        name: 'Priya Singh',
        email: 'priya.singh@college.edu',
        phone: '+91 9876543216',
        branch: 'Computer Science',
        semester: 4,
        rollNumber: '21CS045',
        admissionYear: '2021',
        address: '321 Innovation Drive, Pune, India',
        parentName: 'Vikash Singh',
        parentPhone: '+91 9876543217',
        status: 'active' as const,
        gpa: 8.9
      },
      {
        id: '21IT067',
        name: 'Arjun Kumar',
        email: 'arjun.kumar@college.edu',
        phone: '+91 9876543218',
        branch: 'Information Technology',
        semester: 2,
        rollNumber: '21IT067',
        admissionYear: '2021',
        address: '654 Silicon Valley, Chennai, India',
        parentName: 'Manoj Kumar',
        parentPhone: '+91 9876543219',
        status: 'inactive' as const,
        gpa: 6.5
      },
      {
        id: '20CE089',
        name: 'Sneha Reddy',
        email: 'sneha.reddy@college.edu',
        phone: '+91 9876543220',
        branch: 'Civil Engineering',
        semester: 6,
        rollNumber: '20CE089',
        admissionYear: '2020',
        address: '987 Construction Lane, Hyderabad, India',
        parentName: 'Ravi Reddy',
        parentPhone: '+91 9876543221',
        status: 'active' as const,
        gpa: 8.2
      }
    ])
  }, [])

  const handleAdd = () => toast({ title: 'Add Student', description: 'Open add student form (coming soon)' })
  const handleEdit = (id: string) => toast({ title: 'Edit Student', description: id })
  const handleDelete = (id: string) => {
    setStudents(prev => prev.filter(s => s.id !== id))
    toast({ title: 'Student removed', description: id })
  }

  const handleViewDetails = (student: any) => {
    setSelectedStudent(student)
    setIsDetailsModalOpen(true)
  }

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.rollNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.branch.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesBranch = selectedBranch === 'all' || student.branch === selectedBranch
    
    return matchesSearch && matchesBranch
  })

  const branchCounts = branches.reduce((acc, branch) => {
    acc[branch] = students.filter(s => s.branch === branch).length
    return acc
  }, {} as Record<string, number>)

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
  }

  if (isLoading) return <GenericPageSkeleton />

  return (
    <div className="space-y-4 p-4 sm:p-6">
      <SEO title="Manage Students" description="Administer student records" />
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-3xl font-bold tracking-tight">Manage Students</h1>
          <p className="text-muted-foreground text-sm hidden sm:block">Create, update, and manage students</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={() => window.location.href = '/admin/branch-students-overview'}
            className="w-full sm:w-auto"
          >
            <Users className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">View by Branch</span>
            <span className="sm:hidden">Branch</span>
          </Button>
          <Button onClick={handleAdd} className="w-full sm:w-auto">
            <Plus className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Add Student</span>
            <span className="sm:hidden">Add</span>
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Users className="h-5 w-5" /> Students
            <Badge variant="secondary" className="ml-2">
              {filteredStudents.length} of {students.length}
            </Badge>
          </CardTitle>
          <CardDescription className="text-sm">Manage all registered students</CardDescription>
        </CardHeader>
        <CardContent className="p-3 sm:p-6">
          {/* Branch Filter */}
          <div className="mb-6">
            <BranchSelector
              selectedBranch={selectedBranch}
              onBranchChange={setSelectedBranch}
              branches={branches}
              itemCounts={branchCounts}
            />
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search students by name, roll number, email, or branch..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-10 w-full sm:max-w-sm"
              />
            </div>
          </div>

          {/* Desktop Table View */}
          <div className="hidden md:block rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Roll Number</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Branch</TableHead>
                  <TableHead>Semester</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>GPA</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((s) => (
                  <TableRow key={s.id}>
                    <TableCell className="font-mono font-semibold">{s.rollNumber}</TableCell>
                    <TableCell className="font-medium">{s.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{s.branch}</Badge>
                    </TableCell>
                    <TableCell>Sem {s.semester}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(s.status)}>
                        {s.status.charAt(0).toUpperCase() + s.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-mono">{s.gpa.toFixed(1)}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button size="sm" variant="outline" onClick={() => handleViewDetails(s)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleEdit(s.id)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(s.id)}>
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
            {filteredStudents.map((s) => (
              <Card key={s.id} className="p-4">
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="font-mono font-bold text-sm">{s.rollNumber}</div>
                      <div className="font-semibold">{s.name}</div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">{s.branch}</Badge>
                        <Badge className={getStatusColor(s.status) + " text-xs"}>
                          {s.status.charAt(0).toUpperCase() + s.status.slice(1)}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">GPA: {s.gpa.toFixed(1)}</div>
                      <div className="text-xs text-muted-foreground">Sem {s.semester}</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Mail className="h-4 w-4" />
                      {s.email}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Phone className="h-4 w-4" />
                      {s.phone}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <GraduationCap className="h-4 w-4" />
                      Admitted in {s.admissionYear}
                    </div>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button size="sm" variant="outline" onClick={() => handleViewDetails(s)} className="flex-1">
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleEdit(s.id)} className="flex-1">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(s.id)} className="flex-1">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
            {filteredStudents.length === 0 && students.length > 0 && (
              <div className="text-center text-muted-foreground py-8">
                No students found matching your search
              </div>
            )}
            {students.length === 0 && (
              <div className="text-center text-muted-foreground py-8">
                No students yet
              </div>
            )}
          </div>
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
