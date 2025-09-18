import React, { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Search, User, BookOpen, AlertTriangle, CheckCircle } from 'lucide-react'
import { useAdminData } from '@/hooks/useAdminData'
import { useToast } from '@/hooks/use-toast'

interface AllocationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const AllocationDialog: React.FC<AllocationDialogProps> = ({
  open,
  onOpenChange
}) => {
  const { 
    teachers, 
    subjects, 
    branches, 
    allocateSubject, 
    deallocateSubject, 
    getAvailableSubjects 
  } = useAdminData()
  const { toast } = useToast()
  
  const [selectedTeacher, setSelectedTeacher] = useState('')
  const [selectedSubject, setSelectedSubject] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterBranch, setFilterBranch] = useState('all')
  const [activeTab, setActiveTab] = useState('allocate')

  const availableSubjects = getAvailableSubjects().filter(subject => {
    const matchesSearch = subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         subject.code.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesBranch = filterBranch === 'all' || subject.branch === filterBranch
    return matchesSearch && matchesBranch
  })

  const filteredTeachers = teachers.filter(teacher => {
    const matchesSearch = teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         teacher.department.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesBranch = filterBranch === 'all' || teacher.department === filterBranch
    return matchesSearch && matchesBranch && teacher.status === 'Active'
  })

  const selectedTeacherData = teachers.find(t => t.id === selectedTeacher)
  const selectedSubjectData = subjects.find(s => s.id === selectedSubject)

  const handleAllocate = () => {
    if (!selectedTeacher || !selectedSubject) {
      toast({
        title: "Error",
        description: "Please select both teacher and subject",
        variant: "destructive"
      })
      return
    }

    const success = allocateSubject(selectedTeacher, selectedSubject)
    if (success) {
      toast({
        title: "Success",
        description: "Subject allocated successfully"
      })
      setSelectedTeacher('')
      setSelectedSubject('')
    } else {
      toast({
        title: "Error",
        description: "Failed to allocate subject. Teacher may be at maximum capacity or subject already assigned.",
        variant: "destructive"
      })
    }
  }

  const handleDeallocate = (teacherId: string, subjectId: string) => {
    deallocateSubject(teacherId, subjectId)
    toast({
      title: "Success",
      description: "Subject deallocated successfully"
    })
  }

  const canAllocate = selectedTeacherData && selectedSubjectData && 
    selectedTeacherData.currentSubjects < selectedTeacherData.maxSubjects &&
    !selectedTeacherData.assignedSubjects.some(s => s.subjectId === selectedSubject)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[95vw] sm:max-w-4xl max-h-[90vh] w-full mx-2 sm:mx-4 overflow-auto">
        <DialogHeader className="pb-2">
          <DialogTitle className="text-lg sm:text-xl">Subject Allocation Management</DialogTitle>
          <DialogDescription className="text-sm">
            Manage subject assignments for teachers
          </DialogDescription>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-2 sm:mb-4">
            <TabsTrigger value="allocate" className="text-xs sm:text-sm px-2">Allocate</TabsTrigger>
            <TabsTrigger value="manage" className="text-xs sm:text-sm px-2">Manage</TabsTrigger>
          </TabsList>
          
          <TabsContent value="allocate" className="space-y-3 sm:space-y-6 mt-0">
            <div className="space-y-3 sm:space-y-4">
              <div className="flex flex-col space-y-3 sm:grid sm:grid-cols-2 sm:gap-4 sm:space-y-0">
                <div className="space-y-2">
                  <Label className="text-sm">Filter by Branch</Label>
                  <Select value={filterBranch} onValueChange={setFilterBranch}>
                    <SelectTrigger className="h-9">
                      <SelectValue placeholder="All Branches" />
                    </SelectTrigger>
                    <SelectContent className="z-[100]">
                      <SelectItem value="all">All Branches</SelectItem>
                      {branches.map(branch => (
                        <SelectItem key={branch.id} value={branch.name}>
                          {branch.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-sm">Search</Label>
                  <div className="relative">
                    <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground h-3 w-3 sm:h-4 sm:w-4" />
                    <Input
                      placeholder="Search teachers or subjects..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8 h-9 text-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col space-y-4 sm:space-y-6 lg:grid lg:grid-cols-2 lg:gap-4 lg:space-y-0">
                {/* Teacher Selection */}
                <div className="space-y-2 sm:space-y-4">
                  <h3 className="text-base sm:text-lg font-semibold flex items-center gap-2">
                    <User className="h-4 w-4 sm:h-5 sm:w-5" />
                    Select Teacher
                  </h3>
                  
                  <div className="max-h-48 sm:max-h-60 lg:max-h-80 overflow-auto space-y-1 sm:space-y-2 border rounded-md p-2">
                    {filteredTeachers.length === 0 ? (
                      <p className="text-sm text-muted-foreground text-center py-4">No teachers found</p>
                    ) : (
                      filteredTeachers.map(teacher => (
                        <Card 
                          key={teacher.id} 
                          className={`cursor-pointer transition-all hover:shadow-sm ${
                            selectedTeacher === teacher.id ? 'ring-2 ring-primary bg-primary/5' : 'hover:bg-accent/50'
                          }`}
                          onClick={() => setSelectedTeacher(teacher.id)}
                        >
                          <CardContent className="p-2 sm:p-3 lg:p-4">
                            <div className="flex items-center gap-2 sm:gap-3">
                              <Avatar className="h-6 w-6 sm:h-8 sm:w-8 lg:h-10 lg:w-10 shrink-0">
                                <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${teacher.name}`} />
                                <AvatarFallback className="text-xs">
                                  {teacher.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-foreground truncate text-xs sm:text-sm lg:text-base">
                                  {teacher.name}
                                </p>
                                <p className="text-xs text-muted-foreground truncate">
                                  {teacher.department}
                                </p>
                                <div className="flex items-center gap-1 mt-1">
                                  <Badge variant="secondary" className="text-xs px-1 py-0">
                                    {teacher.currentSubjects}/{teacher.maxSubjects}
                                  </Badge>
                                  {teacher.currentSubjects >= teacher.maxSubjects && (
                                    <AlertTriangle className="h-3 w-3 text-destructive shrink-0" />
                                  )}
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    )}
                  </div>
                </div>

                {/* Subject Selection */}
                <div className="space-y-2 sm:space-y-4">
                  <h3 className="text-base sm:text-lg font-semibold flex items-center gap-2">
                    <BookOpen className="h-4 w-4 sm:h-5 sm:w-5" />
                    Available Subjects
                  </h3>
                  
                  <div className="max-h-48 sm:max-h-60 lg:max-h-80 overflow-auto space-y-1 sm:space-y-2 border rounded-md p-2">
                    {availableSubjects.length === 0 ? (
                      <p className="text-sm text-muted-foreground text-center py-4">No subjects available</p>
                    ) : (
                      availableSubjects.map(subject => (
                        <Card 
                          key={subject.id} 
                          className={`cursor-pointer transition-all hover:shadow-sm ${
                            selectedSubject === subject.id ? 'ring-2 ring-primary bg-primary/5' : 'hover:bg-accent/50'
                          }`}
                          onClick={() => setSelectedSubject(subject.id)}
                        >
                          <CardContent className="p-2 sm:p-3 lg:p-4">
                            <div className="space-y-1 sm:space-y-2">
                              <div className="flex items-start justify-between gap-2">
                                <h4 className="font-medium text-foreground text-xs sm:text-sm lg:text-base leading-tight">
                                  {subject.name}
                                </h4>
                                <Badge variant="outline" className="text-xs shrink-0 px-1">
                                  {subject.code}
                                </Badge>
                              </div>
                              
                              <div className="flex flex-wrap items-center gap-1 text-xs text-muted-foreground">
                                <span>{subject.branch}</span>
                                <span>•</span>
                                <span>S{subject.semester}</span>
                                <span>•</span>
                                <span>{subject.credits}c</span>
                              </div>
                              
                              <Badge variant={
                                subject.type === 'Core' ? 'default' :
                                subject.type === 'Elective' ? 'secondary' : 'outline'
                              } className="text-xs px-1 py-0">
                                {subject.type}
                              </Badge>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    )}
                  </div>
                </div>
              </div>

              {/* Allocation Preview */}
              {selectedTeacherData && selectedSubjectData && (
                <Card className="bg-primary/5 border-primary/20">
                  <CardContent className="p-2 sm:p-3 lg:p-4">
                    <div className="flex flex-col gap-2 sm:gap-3">
                      <div className="space-y-1">
                        <p className="font-medium text-xs sm:text-sm lg:text-base">
                          Allocating <span className="text-primary font-semibold">{selectedSubjectData.name}</span> to{' '}
                          <span className="text-primary font-semibold">{selectedTeacherData.name}</span>
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {selectedTeacherData.department} • {selectedSubjectData.credits} credits
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {canAllocate ? (
                          <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                        ) : (
                          <AlertTriangle className="h-4 w-4 text-destructive shrink-0" />
                        )}
                        {!canAllocate && (
                          <p className="text-xs text-destructive">
                            Cannot allocate: Teacher at capacity or subject already assigned
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
                <Button variant="outline" onClick={() => onOpenChange(false)} className="w-full sm:w-auto order-2 sm:order-1">
                  Cancel
                </Button>
                <Button 
                  onClick={handleAllocate} 
                  disabled={!canAllocate}
                  className="w-full sm:w-auto order-1 sm:order-2"
                >
                  Allocate Subject
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="manage" className="space-y-3 sm:space-y-6 mt-0">
            <div className="space-y-3 sm:space-y-4">
              {teachers.filter(t => t.assignedSubjects.length > 0).length === 0 ? (
                <Card>
                  <CardContent className="p-6 text-center">
                    <p className="text-muted-foreground">No subject allocations found</p>
                  </CardContent>
                </Card>
              ) : (
                teachers.filter(t => t.assignedSubjects.length > 0).map(teacher => (
                  <Card key={teacher.id}>
                    <CardContent className="p-3 sm:p-4 lg:p-6">
                      <div className="flex flex-col gap-3 mb-3 sm:mb-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 shrink-0">
                            <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${teacher.name}`} />
                            <AvatarFallback className="text-xs">
                              {teacher.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          
                          <div className="flex-1 min-w-0">
                            <h3 className="text-sm sm:text-base lg:text-lg font-semibold truncate">{teacher.name}</h3>
                            <p className="text-xs sm:text-sm text-muted-foreground truncate">{teacher.department}</p>
                            <Badge variant="secondary" className="text-xs mt-1 px-1 py-0">
                              {teacher.currentSubjects}/{teacher.maxSubjects} subjects
                            </Badge>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid gap-2">
                        {teacher.assignedSubjects.map(assignment => (
                          <div 
                            key={assignment.subjectId}
                            className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between p-2 sm:p-3 border border-border rounded-lg bg-accent/20"
                          >
                            <div className="min-w-0 flex-1">
                              <h4 className="font-medium text-xs sm:text-sm lg:text-base">{assignment.subjectName}</h4>
                              <div className="flex flex-wrap items-center gap-1 text-xs text-muted-foreground mt-1">
                                <span>{assignment.subjectCode}</span>
                                <span>•</span>
                                <span>S{assignment.semester}</span>
                                <span>•</span>
                                <span>{assignment.enrolledStudents} students</span>
                              </div>
                            </div>
                            
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleDeallocate(teacher.id, assignment.subjectId)}
                              className="self-start sm:self-auto w-full sm:w-auto text-xs"
                            >
                              Remove
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}