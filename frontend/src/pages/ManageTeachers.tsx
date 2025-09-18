import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Plus, Edit, Trash2, UserCog, Mail, Search, Eye, Phone, Building, Calendar } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { GenericPageSkeleton } from "@/components/ui/page-skeleton"
import { usePageLoading } from "@/hooks/use-page-loading"
import { useIsMobile } from "@/hooks/use-mobile"
import { Input } from "@/components/ui/input"
import { SEO } from "@/components/SEO"
import { Badge } from "@/components/ui/badge"
import { BranchSelector } from "@/components/admin/BranchSelector"
import { TeacherDetailsModal } from "@/components/admin/TeacherDetailsModal"

export default function ManageTeachers() {
  const isLoading = usePageLoading()
  const isMobile = useIsMobile()
  const { toast } = useToast()
  const [teachers, setTeachers] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("all")
  const [selectedTeacher, setSelectedTeacher] = useState<any>(null)
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)

  const departments = ["Computer Science", "Electronics & Communication", "Mechanical Engineering", "Civil Engineering", "Information Technology"]

  useEffect(() => {
    setTeachers([
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
        salary: 85000
      },
      {
        id: 'EMP-012',
        name: 'Dr. Priya Menon',
        email: 'priya.menon@college.edu',
        phone: '+91 9876543231',
        department: 'Electronics & Communication',
        designation: 'Associate Professor',
        employeeId: 'EMP-012',
        joiningDate: '2019-08-20',
        qualification: 'Ph.D in Electronics Engineering',
        experience: 8,
        subjects: ['Digital Signal Processing', 'Communication Systems', 'VLSI Design'],
        officeRoom: 'ECE-105',
        status: 'active' as const,
        salary: 75000
      },
      {
        id: 'EMP-023',
        name: 'Prof. Rajesh Kumar',
        email: 'rajesh.kumar@college.edu',
        phone: '+91 9876543232',
        department: 'Mechanical Engineering',
        designation: 'Professor',
        employeeId: 'EMP-023',
        joiningDate: '2015-06-10',
        qualification: 'Ph.D in Mechanical Engineering',
        experience: 15,
        subjects: ['Thermodynamics', 'Fluid Mechanics', 'Heat Transfer'],
        officeRoom: 'ME-301',
        status: 'active' as const,
        salary: 90000
      },
      {
        id: 'EMP-034',
        name: 'Dr. Anita Singh',
        email: 'anita.singh@college.edu',
        phone: '+91 9876543233',
        department: 'Civil Engineering',
        designation: 'Assistant Professor',
        employeeId: 'EMP-034',
        joiningDate: '2020-01-15',
        qualification: 'Ph.D in Civil Engineering',
        experience: 6,
        subjects: ['Structural Engineering', 'Construction Management', 'Surveying'],
        officeRoom: 'CE-202',
        status: 'active' as const,
        salary: 65000
      },
      {
        id: 'EMP-045',
        name: 'Prof. Suresh Patel',
        email: 'suresh.patel@college.edu',
        phone: '+91 9876543234',
        department: 'Information Technology',
        designation: 'Associate Professor',
        employeeId: 'EMP-045',
        joiningDate: '2017-09-01',
        qualification: 'M.Tech in Information Technology',
        experience: 10,
        subjects: ['Database Systems', 'Web Development', 'Software Engineering'],
        officeRoom: 'IT-150',
        status: 'inactive' as const,
        salary: 70000
      }
    ])
  }, [])

  const handleAdd = () => toast({ title: 'Add Teacher', description: 'Open add teacher form (coming soon)' })
  const handleEdit = (id: string) => toast({ title: 'Edit Teacher', description: id })
  const handleDelete = (id: string) => {
    setTeachers(prev => prev.filter(s => s.id !== id))
    toast({ title: 'Teacher removed', description: id })
  }

  const handleViewDetails = (teacher: any) => {
    setSelectedTeacher(teacher)
    setIsDetailsModalOpen(true)
  }

  const filteredTeachers = teachers.filter(teacher => {
    const matchesSearch = teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.employeeId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.designation.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesDepartment = selectedDepartment === 'all' || teacher.department === selectedDepartment
    
    return matchesSearch && matchesDepartment
  })

  const departmentCounts = departments.reduce((acc, dept) => {
    acc[dept] = teachers.filter(t => t.department === dept).length
    return acc
  }, {} as Record<string, number>)

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
  }

  if (isLoading) return <GenericPageSkeleton />

  return (
    <div className="space-y-4 p-4 sm:p-6">
      <SEO title="Manage Teachers" description="Administer teacher records" />
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-3xl font-bold tracking-tight">Manage Teachers</h1>
          <p className="text-muted-foreground text-sm hidden sm:block">Create, update, and manage teachers - Now with branch organization</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={() => window.location.href = '/admin/branch-teachers-overview'}
            className="w-full sm:w-auto"
          >
            <UserCog className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">View by Branch</span>
            <span className="sm:hidden">Branch</span>
          </Button>
          <Button onClick={handleAdd} className="w-full sm:w-auto">
            <Plus className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Add Teacher</span>
            <span className="sm:hidden">Add</span>
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <UserCog className="h-5 w-5" /> Teachers
            <Badge variant="secondary" className="ml-2">
              {filteredTeachers.length} of {teachers.length}
            </Badge>
          </CardTitle>
          <CardDescription className="text-sm">Manage all registered teachers</CardDescription>
        </CardHeader>
        <CardContent className="p-3 sm:p-6">
          {/* Department Filter */}
          <div className="mb-6">
            <BranchSelector
              selectedBranch={selectedDepartment}
              onBranchChange={setSelectedDepartment}
              branches={departments}
              itemCounts={departmentCounts}
            />
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search teachers by name, employee ID, email, or department..."
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
                  <TableHead>Employee ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Designation</TableHead>
                  <TableHead>Experience</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTeachers.map((t) => (
                  <TableRow key={t.id}>
                    <TableCell className="font-mono font-semibold">{t.employeeId}</TableCell>
                    <TableCell className="font-medium">{t.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{t.department}</Badge>
                    </TableCell>
                    <TableCell>{t.designation}</TableCell>
                    <TableCell>{t.experience} years</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(t.status)}>
                        {t.status.charAt(0).toUpperCase() + t.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button size="sm" variant="outline" onClick={() => handleViewDetails(t)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleEdit(t.id)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(t.id)}>
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
            {filteredTeachers.map((t) => (
              <Card key={t.id} className="p-4">
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="font-mono font-bold text-sm">{t.employeeId}</div>
                      <div className="font-semibold">{t.name}</div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">{t.department}</Badge>
                        <Badge className={getStatusColor(t.status) + " text-xs"}>
                          {t.status.charAt(0).toUpperCase() + t.status.slice(1)}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{t.designation}</div>
                      <div className="text-xs text-muted-foreground">{t.experience} years exp</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Mail className="h-4 w-4" />
                      {t.email}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Phone className="h-4 w-4" />
                      {t.phone}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Building className="h-4 w-4" />
                      Office: {t.officeRoom}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      Joined: {new Date(t.joiningDate).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button size="sm" variant="outline" onClick={() => handleViewDetails(t)} className="flex-1">
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleEdit(t.id)} className="flex-1">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(t.id)} className="flex-1">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
            {filteredTeachers.length === 0 && teachers.length > 0 && (
              <div className="text-center text-muted-foreground py-8">
                No teachers found matching your search
              </div>
            )}
            {teachers.length === 0 && (
              <div className="text-center text-muted-foreground py-8">
                No teachers yet
              </div>
            )}
          </div>
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
