import React, { useState } from 'react'
import { SEO } from '@/components/SEO'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import { Search, User, BookOpen, Calendar, UserCheck, Plus, Users, Edit, Trash2, Filter } from 'lucide-react'
import { AllocationDialog } from '@/components/admin/AllocationDialog'
import { CreateTeacherDialog } from '@/components/admin/CreateTeacherDialog'
import { useAdminData, Teacher } from '@/hooks/useAdminData'
import { useToast } from '@/hooks/use-toast'

const SubjectAllocation = () => {
  const { teachers, branches, statistics, deleteTeacher } = useAdminData()
  const { toast } = useToast()
  
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedBranch, setSelectedBranch] = useState('all')
  const [isAllocationDialogOpen, setIsAllocationDialogOpen] = useState(false)
  const [isCreateTeacherDialogOpen, setIsCreateTeacherDialogOpen] = useState(false)
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null)
  const [deletingTeacher, setDeletingTeacher] = useState<Teacher | null>(null)

  const filteredTeachers = teachers.filter(teacher => {
    const matchesSearch = teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         teacher.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         teacher.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesBranch = selectedBranch === 'all' || teacher.department === selectedBranch
    return matchesSearch && matchesBranch
  })

  const handleEditTeacher = (teacher: Teacher) => {
    setEditingTeacher(teacher)
    setIsCreateTeacherDialogOpen(true)
  }

  const handleDeleteTeacher = (teacher: Teacher) => {
    setDeletingTeacher(teacher)
  }

  const confirmDelete = () => {
    if (deletingTeacher) {
      deleteTeacher(deletingTeacher.id)
      toast({
        title: "Success",
        description: "Teacher removed successfully"
      })
      setDeletingTeacher(null)
    }
  }

  const clearFilters = () => {
    setSelectedBranch('all')
    setSearchTerm('')
  }

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Subject Allocation - Admin Panel"
        description="Allocate subjects to teachers and manage teaching assignments"
      />
      
      <div className="container mx-auto p-4 md:p-6 lg:p-8 max-w-full overflow-x-hidden">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2">
            Subject Allocation
          </h1>
          <p className="hidden sm:block text-lg text-muted-foreground">
            Allocate subjects to teachers and manage teaching assignments
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <UserCheck className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Teachers</p>
                  <p className="text-2xl font-bold text-foreground">{statistics.activeTeachers}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <BookOpen className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Allocated Subjects</p>
                  <p className="text-2xl font-bold text-foreground">{statistics.allocatedSubjects}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <Users className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Students</p>
                  <p className="text-2xl font-bold text-foreground">{statistics.totalStudents}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <Calendar className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Unassigned Subjects</p>
                  <p className="text-2xl font-bold text-foreground">{statistics.unassignedSubjects}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Actions */}
        <div className="space-y-4 mb-6">
          <div className="flex flex-col gap-4">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search teachers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full"
              />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2 w-full">
              <Button 
                variant="outline" 
                onClick={clearFilters}
                className="flex items-center justify-center gap-2 w-full sm:w-auto"
                size="sm"
              >
                <Filter className="h-4 w-4" />
                <span className="hidden sm:inline">Clear Filters</span>
                <span className="sm:hidden">Clear</span>
              </Button>
              <Button 
                onClick={() => {
                  setEditingTeacher(null)
                  setIsCreateTeacherDialogOpen(true)
                }}
                variant="outline"
                className="flex items-center justify-center gap-2 w-full sm:w-auto"
                size="sm"
              >
                <Plus className="h-4 w-4" />
                <span className="hidden sm:inline">Add Teacher</span>
                <span className="sm:hidden">Add</span>
              </Button>
              <Button 
                onClick={() => setIsAllocationDialogOpen(true)}
                className="flex items-center justify-center gap-2 w-full sm:w-auto"
                size="sm"
              >
                <Plus className="h-4 w-4" />
                <span className="hidden sm:inline">Manage Allocations</span>
                <span className="sm:hidden">Manage</span>
              </Button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <Select value={selectedBranch} onValueChange={setSelectedBranch}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="All Departments" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {branches.map(branch => (
                  <SelectItem key={branch.id} value={branch.name}>
                    {branch.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <div className="flex items-center text-sm text-muted-foreground">
              Showing {filteredTeachers.length} of {teachers.length} teachers
            </div>
          </div>
        </div>

        {/* Teachers List */}
        <div className="space-y-6">
          {filteredTeachers.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <UserCheck className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No teachers found</h3>
                <p className="text-muted-foreground mb-4">
                  {searchTerm || selectedBranch !== 'all'
                    ? 'No teachers match your current filters.'
                    : 'No teachers have been added yet.'
                  }
                </p>
                {!searchTerm && selectedBranch === 'all' && (
                  <Button onClick={() => setIsCreateTeacherDialogOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add First Teacher
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            filteredTeachers.map((teacher) => (
              <Card key={teacher.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-start gap-3">
                      <Avatar className="h-10 w-10 sm:h-12 sm:w-12 shrink-0">
                        <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${teacher.name}`} />
                        <AvatarFallback className="text-xs">{teacher.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-lg sm:text-xl mb-1 truncate">{teacher.name}</CardTitle>
                        <CardDescription className="mb-2 truncate text-sm">{teacher.email}</CardDescription>
                        <div className="flex flex-wrap gap-1 sm:gap-2">
                          <Badge variant="secondary" className="text-xs">{teacher.department}</Badge>
                          <Badge variant={teacher.status === 'Active' ? 'default' : 'outline'} className="text-xs">
                            {teacher.status}
                          </Badge>
                          {teacher.experience > 0 && (
                            <Badge variant="outline" className="text-xs">{teacher.experience}y exp</Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                      <div className="text-xs sm:text-sm text-muted-foreground">
                        <div className="flex items-center gap-1 mb-1">
                          <BookOpen className="h-3 w-3 sm:h-4 sm:w-4" />
                          {teacher.currentSubjects}/{teacher.maxSubjects} subjects
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3 sm:h-4 sm:w-4" />
                          {teacher.assignedSubjects.reduce((sum, s) => sum + s.enrolledStudents, 0)} students
                        </div>
                      </div>
                      <div className="flex gap-2 w-full sm:w-auto">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleEditTeacher(teacher)}
                          className="flex-1 sm:flex-none"
                        >
                          <Edit className="h-4 w-4" />
                          <span className="ml-1 sm:hidden">Edit</span>
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDeleteTeacher(teacher)}
                          className="flex-1 sm:flex-none"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="ml-1 sm:hidden">Delete</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="px-4 sm:px-6">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      <div className="min-w-0">
                        <h4 className="font-medium text-foreground mb-2 text-sm">Specializations</h4>
                        <div className="flex flex-wrap gap-1">
                          {teacher.specialization.length > 0 ? (
                            teacher.specialization.map(spec => (
                              <Badge key={spec} variant="outline" className="text-xs">
                                {spec}
                              </Badge>
                            ))
                          ) : (
                            <span className="text-xs sm:text-sm text-muted-foreground">No specializations listed</span>
                          )}
                        </div>
                      </div>
                      
                      <div className="min-w-0">
                        <h4 className="font-medium text-foreground mb-2 text-sm">Qualifications</h4>
                        <div className="flex flex-wrap gap-1">
                          {teacher.qualifications.length > 0 ? (
                            teacher.qualifications.map(qual => (
                              <Badge key={qual} variant="secondary" className="text-xs">
                                {qual}
                              </Badge>
                            ))
                          ) : (
                            <span className="text-xs sm:text-sm text-muted-foreground">No qualifications listed</span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-foreground mb-3 text-sm">Assigned Subjects</h4>
                      {teacher.assignedSubjects.length > 0 ? (
                        <div className="space-y-2">
                          {teacher.assignedSubjects.map((subject, index) => (
                            <div 
                              key={index}
                              className="flex flex-col gap-2 p-2 sm:p-3 border border-border rounded-lg bg-muted/20"
                            >
                              <div className="flex flex-col gap-1">
                                <div className="flex flex-wrap items-center gap-1 sm:gap-2">
                                  <h5 className="font-medium text-foreground text-sm">{subject.subjectName}</h5>
                                  <Badge variant="outline" className="text-xs">{subject.subjectCode}</Badge>
                                  <span className="text-xs text-muted-foreground">
                                    S{subject.semester}
                                  </span>
                                </div>
                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                  <Users className="h-3 w-3" />
                                  {subject.enrolledStudents}/{subject.maxCapacity} students
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-muted-foreground text-center py-4 border border-dashed border-border rounded-lg text-sm">
                          No subjects assigned yet
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Allocation Dialog */}
        <AllocationDialog
          open={isAllocationDialogOpen}
          onOpenChange={setIsAllocationDialogOpen}
        />

        {/* Create/Edit Teacher Dialog */}
        <CreateTeacherDialog
          open={isCreateTeacherDialogOpen}
          onOpenChange={(open) => {
            setIsCreateTeacherDialogOpen(open)
            if (!open) setEditingTeacher(null)
          }}
          editTeacher={editingTeacher}
        />

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={!!deletingTeacher} onOpenChange={() => setDeletingTeacher(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Remove Teacher</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to remove "{deletingTeacher?.name}"? This will also remove all their subject assignments.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={confirmDelete}>Remove</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  )
}

export default SubjectAllocation