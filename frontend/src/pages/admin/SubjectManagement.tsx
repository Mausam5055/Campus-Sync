import React, { useState } from 'react'
import { SEO } from '@/components/SEO'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import { Plus, Search, BookOpen, Users, Calendar, Edit, Trash2, Filter } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { CreateSubjectDialog } from '@/components/admin/CreateSubjectDialog'
import { useAdminData, Subject } from '@/hooks/useAdminData'
import { useToast } from '@/hooks/use-toast'

const SubjectManagement = () => {
  const { subjects, branches, statistics, deleteSubject } = useAdminData()
  const { toast } = useToast()
  
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedBranch, setSelectedBranch] = useState('all')
  const [selectedSemester, setSelectedSemester] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedType, setSelectedType] = useState('all')
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [editingSubject, setEditingSubject] = useState<Subject | null>(null)
  const [deletingSubject, setDeletingSubject] = useState<Subject | null>(null)

  const semesters = [1, 2, 3, 4, 5, 6, 7, 8]

  const filteredSubjects = subjects.filter(subject => {
    const matchesSearch = subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         subject.code.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesBranch = selectedBranch === 'all' || subject.branch === selectedBranch
    const matchesSemester = selectedSemester === 'all' || subject.semester.toString() === selectedSemester
    const matchesStatus = selectedStatus === 'all' || subject.status === selectedStatus
    const matchesType = selectedType === 'all' || subject.type === selectedType
    
    return matchesSearch && matchesBranch && matchesSemester && matchesStatus && matchesType
  })

  const handleEdit = (subject: Subject) => {
    setEditingSubject(subject)
    setIsCreateDialogOpen(true)
  }

  const handleDelete = (subject: Subject) => {
    setDeletingSubject(subject)
  }

  const confirmDelete = () => {
    if (deletingSubject) {
      deleteSubject(deletingSubject.id)
      toast({
        title: "Success",
        description: "Subject deleted successfully"
      })
      setDeletingSubject(null)
    }
  }

  const clearFilters = () => {
    setSelectedBranch('all')
    setSelectedSemester('all')
    setSelectedStatus('all')
    setSelectedType('all')
    setSearchTerm('')
  }

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Subject Management - Admin Panel"
        description="Manage academic subjects, courses, and curriculum structure"
      />
      
      <div className="container mx-auto p-4 md:p-6 lg:p-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2">
            Subject Management
          </h1>
          <p className="hidden sm:block text-lg text-muted-foreground">
            Manage academic subjects, courses, and curriculum structure
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <BookOpen className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Subjects</p>
                  <p className="text-2xl font-bold text-foreground">{statistics.totalSubjects}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <Users className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Subjects</p>
                  <p className="text-2xl font-bold text-foreground">{statistics.activeSubjects}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <Calendar className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Branches</p>
                  <p className="text-2xl font-bold text-foreground">{statistics.activeBranches}</p>
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
        </div>

        {/* Filters and Actions */}
        <div className="space-y-4 mb-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search subjects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={clearFilters}
                className="flex items-center gap-2"
              >
                <Filter className="h-4 w-4" />
                Clear Filters
              </Button>
              <Button 
                onClick={() => {
                  setEditingSubject(null)
                  setIsCreateDialogOpen(true)
                }}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Subject
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <Select value={selectedBranch} onValueChange={setSelectedBranch}>
              <SelectTrigger>
                <SelectValue placeholder="All Branches" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Branches</SelectItem>
                {branches.map(branch => (
                  <SelectItem key={branch.id} value={branch.name}>
                    {branch.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedSemester} onValueChange={setSelectedSemester}>
              <SelectTrigger>
                <SelectValue placeholder="All Semesters" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Semesters</SelectItem>
                {semesters.map(sem => (
                  <SelectItem key={sem} value={sem.toString()}>
                    Semester {sem}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger>
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Core">Core</SelectItem>
                <SelectItem value="Elective">Elective</SelectItem>
                <SelectItem value="General">General</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger>
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Draft">Draft</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center text-sm text-muted-foreground">
              Showing {filteredSubjects.length} of {subjects.length} subjects
            </div>
          </div>
        </div>

        {/* Subjects List */}
        <div className="space-y-4">
          {filteredSubjects.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No subjects found</h3>
                <p className="text-muted-foreground mb-4">
                  {searchTerm || selectedBranch !== 'all' || selectedSemester !== 'all' || selectedStatus !== 'all' || selectedType !== 'all'
                    ? 'No subjects match your current filters.'
                    : 'No subjects have been created yet.'
                  }
                </p>
                {!searchTerm && selectedBranch === 'all' && selectedSemester === 'all' && selectedStatus === 'all' && selectedType === 'all' && (
                  <Button onClick={() => setIsCreateDialogOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create First Subject
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {filteredSubjects.map((subject) => (
                <Card key={subject.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-3">
                          <h3 className="text-xl font-semibold text-foreground">
                            {subject.name}
                          </h3>
                          <div className="flex gap-2">
                            <Badge variant="secondary" className="w-fit">
                              {subject.code}
                            </Badge>
                            <Badge 
                              variant={
                                subject.type === 'Core' ? 'default' :
                                subject.type === 'Elective' ? 'secondary' : 'outline'
                              }
                              className="w-fit"
                            >
                              {subject.type}
                            </Badge>
                            <Badge 
                              variant={
                                subject.status === 'Active' ? 'default' : 
                                subject.status === 'Draft' ? 'secondary' : 'outline'
                              }
                              className="w-fit"
                            >
                              {subject.status}
                            </Badge>
                          </div>
                        </div>
                        
                        {subject.description && (
                          <p className="text-muted-foreground mb-3 line-clamp-2">
                            {subject.description}
                          </p>
                        )}
                        
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-3">
                          <span>Branch: <span className="font-medium text-foreground">{subject.branch}</span></span>
                          <span>Semester: <span className="font-medium text-foreground">{subject.semester}</span></span>
                          <span>Credits: <span className="font-medium text-foreground">{subject.credits}</span></span>
                        </div>

                        {subject.prerequisites.length > 0 && (
                          <div className="flex items-center gap-2 text-sm">
                            <span className="text-muted-foreground">Prerequisites:</span>
                            <div className="flex gap-1 flex-wrap">
                              {subject.prerequisites.map(prereq => (
                                <Badge key={prereq} variant="outline" className="text-xs">
                                  {prereq}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex gap-2 flex-shrink-0">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleEdit(subject)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDelete(subject)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Create/Edit Subject Dialog */}
        <CreateSubjectDialog
          open={isCreateDialogOpen}
          onOpenChange={(open) => {
            setIsCreateDialogOpen(open)
            if (!open) setEditingSubject(null)
          }}
          editSubject={editingSubject}
        />

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={!!deletingSubject} onOpenChange={() => setDeletingSubject(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Subject</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete "{deletingSubject?.name}"? This action cannot be undone and will remove all related assignments.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={confirmDelete}>Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  )
}

export default SubjectManagement