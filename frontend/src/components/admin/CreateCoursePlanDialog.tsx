import React, { useState, useMemo } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { X, BookOpen, Plus, Search, CheckCircle2, Circle, Filter } from 'lucide-react'
import { useAdminData, CoursePlan, Subject } from '@/hooks/useAdminData'
import { useToast } from '@/hooks/use-toast'

interface CreateCoursePlanDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  editPlan?: CoursePlan | null
}

export const CreateCoursePlanDialog: React.FC<CreateCoursePlanDialogProps> = ({
  open,
  onOpenChange,
  editPlan
}) => {
  const { branches, subjects, createCoursePlan, updateCoursePlan } = useAdminData()
  const { toast } = useToast()
  
  const [formData, setFormData] = useState({
    branch: editPlan?.branch || '',
    semester: editPlan?.semester || 1,
    enrolledStudents: editPlan?.enrolledStudents || 0,
    status: editPlan?.status || 'Draft' as 'Active' | 'Draft' | 'Archived'
  })
  
  const [selectedSubjects, setSelectedSubjects] = useState<Subject[]>(editPlan?.subjects || [])
  const [subjectSearchTerm, setSubjectSearchTerm] = useState('')
  const [subjectTypeFilter, setSubjectTypeFilter] = useState('all')
  const [activeSubjectTab, setActiveSubjectTab] = useState('available')

  React.useEffect(() => {
    if (editPlan) {
      setFormData({
        branch: editPlan.branch,
        semester: editPlan.semester,
        enrolledStudents: editPlan.enrolledStudents,
        status: editPlan.status
      })
      setSelectedSubjects(editPlan.subjects)
    } else {
      setFormData({
        branch: '',
        semester: 1,
        enrolledStudents: 0,
        status: 'Draft'
      })
      setSelectedSubjects([])
    }
    // Reset filters when dialog opens/closes
    setSubjectSearchTerm('')
    setSubjectTypeFilter('all')
    setActiveSubjectTab('available')
  }, [editPlan, open])

  const availableSubjects = useMemo(() => {
    return subjects.filter(subject => {
      const matchesBranch = subject.branch === formData.branch
      const matchesSemester = subject.semester === formData.semester
      const isActive = subject.status === 'Active'
      const notSelected = !selectedSubjects.some(selected => selected.id === subject.id)
      const matchesSearch = subject.name.toLowerCase().includes(subjectSearchTerm.toLowerCase()) ||
                           subject.code.toLowerCase().includes(subjectSearchTerm.toLowerCase()) ||
                           (subject.description?.toLowerCase().includes(subjectSearchTerm.toLowerCase()) || false)
      const matchesTypeFilter = subjectTypeFilter === 'all' || subject.type === subjectTypeFilter

      return matchesBranch && matchesSemester && isActive && notSelected && matchesSearch && matchesTypeFilter
    })
  }, [subjects, formData.branch, formData.semester, selectedSubjects, subjectSearchTerm, subjectTypeFilter])

  const totalCredits = useMemo(() => {
    return selectedSubjects.reduce((sum, subject) => sum + subject.credits, 0)
  }, [selectedSubjects])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.branch || selectedSubjects.length === 0) {
      toast({
        title: "Error",
        description: "Please select a branch and at least one subject",
        variant: "destructive"
      })
      return
    }

    const planData = {
      ...formData,
      subjects: selectedSubjects,
      totalCredits
    }

    if (editPlan) {
      updateCoursePlan(editPlan.id, planData)
      toast({
        title: "Success",
        description: "Course plan updated successfully"
      })
    } else {
      createCoursePlan(planData)
      toast({
        title: "Success",
        description: "Course plan created successfully"
      })
    }
    
    onOpenChange(false)
  }

  const addSubject = (subject: Subject) => {
    setSelectedSubjects(prev => [...prev, subject])
  }

  const removeSubject = (subjectId: string) => {
    setSelectedSubjects(prev => prev.filter(s => s.id !== subjectId))
  }

  const handleBranchChange = (branch: string) => {
    setFormData(prev => ({ ...prev, branch }))
    setSelectedSubjects([])
    setSubjectSearchTerm('')
    setSubjectTypeFilter('all')
  }

  const handleSemesterChange = (semester: string) => {
    setFormData(prev => ({ ...prev, semester: parseInt(semester) }))
    setSelectedSubjects([])
    setSubjectSearchTerm('')
    setSubjectTypeFilter('all')
  }

  const toggleSubjectSelection = (subject: Subject) => {
    const isSelected = selectedSubjects.some(s => s.id === subject.id)
    if (isSelected) {
      removeSubject(subject.id)
    } else {
      addSubject(subject)
    }
  }

  const addAllFilteredSubjects = () => {
    const newSubjects = availableSubjects.filter(subject => 
      !selectedSubjects.some(selected => selected.id === subject.id)
    )
    setSelectedSubjects(prev => [...prev, ...newSubjects])
  }

  const clearAllSubjects = () => {
    setSelectedSubjects([])
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-6xl max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>
            {editPlan ? 'Edit Course Plan' : 'Create New Course Plan'}
          </DialogTitle>
          <DialogDescription>
            {editPlan 
              ? 'Update course plan configuration and subject allocation'
              : 'Create a new course plan for a specific branch and semester'
            }
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="branch">Branch *</Label>
              <Select value={formData.branch} onValueChange={handleBranchChange}>
                <SelectTrigger className="bg-background border-border">
                  <SelectValue placeholder="Select branch" />
                </SelectTrigger>
                <SelectContent className="bg-background border-border shadow-lg z-50">
                  {branches.map(branch => (
                    <SelectItem key={branch.id} value={branch.name}>
                      {branch.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="semester">Semester *</Label>
              <Select value={formData.semester.toString()} onValueChange={handleSemesterChange}>
                <SelectTrigger className="bg-background border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-background border-border shadow-lg z-50">
                  {[1,2,3,4,5,6,7,8].map(sem => (
                    <SelectItem key={sem} value={sem.toString()}>
                      Semester {sem}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="enrolledStudents">Enrolled Students</Label>
              <Input
                id="enrolledStudents"
                type="number"
                min="0"
                value={formData.enrolledStudents}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  enrolledStudents: parseInt(e.target.value) || 0 
                }))}
                placeholder="0"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value: 'Active' | 'Draft' | 'Archived') => 
                setFormData(prev => ({ ...prev, status: value }))
              }>
                <SelectTrigger className="bg-background border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-background border-border shadow-lg z-50">
                  <SelectItem value="Draft">Draft</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {formData.branch && (
            <div className="space-y-6">
              {/* Subject Selection Header */}
              <div className="flex items-center justify-between">
                <Label className="text-lg font-semibold">Subject Selection</Label>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{selectedSubjects.length} selected</Badge>
                  <Badge variant="outline">{totalCredits} credits</Badge>
                </div>
              </div>

              {/* Search and Filter Controls */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-muted/30 border border-border rounded-lg">
                <div className="space-y-2">
                  <Label htmlFor="subjectSearch">Search Subjects</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      id="subjectSearch"
                      placeholder="Search by name, code, or description..."
                      value={subjectSearchTerm}
                      onChange={(e) => setSubjectSearchTerm(e.target.value)}
                      className="pl-10 bg-background"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="typeFilter">Subject Type</Label>
                  <Select value={subjectTypeFilter} onValueChange={setSubjectTypeFilter}>
                    <SelectTrigger className="bg-background border-border">
                      <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent className="bg-background border-border shadow-lg z-50">
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="Core">Core</SelectItem>
                      <SelectItem value="Elective">Elective</SelectItem>
                      <SelectItem value="General">General</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Quick Actions</Label>
                  <div className="flex gap-2">
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm"
                      onClick={addAllFilteredSubjects}
                      disabled={availableSubjects.length === 0}
                    >
                      Add All
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm"
                      onClick={clearAllSubjects}
                      disabled={selectedSubjects.length === 0}
                    >
                      Clear All
                    </Button>
                  </div>
                </div>
              </div>

              {/* Subject Selection Tabs */}
              <Tabs value={activeSubjectTab} onValueChange={setActiveSubjectTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="available">
                    Available ({availableSubjects.length})
                  </TabsTrigger>
                  <TabsTrigger value="selected">
                    Selected ({selectedSubjects.length})
                  </TabsTrigger>
                </TabsList>

                {/* Available Subjects Tab */}
                <TabsContent value="available" className="space-y-4">
                  {availableSubjects.length === 0 ? (
                    <div className="text-center py-12 border border-dashed border-border rounded-lg bg-muted/20">
                      <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        {subjectSearchTerm || subjectTypeFilter !== 'all' 
                          ? 'No subjects match your filters' 
                          : `No subjects available for ${formData.branch} - Semester ${formData.semester}`
                        }
                      </h3>
                      <p className="text-muted-foreground">
                        {subjectSearchTerm || subjectTypeFilter !== 'all' 
                          ? 'Try adjusting your search or filter criteria'
                          : 'Create subjects in Subject Management first'
                        }
                      </p>
                    </div>
                  ) : (
                    <ScrollArea className="h-96 border border-border rounded-lg bg-background">
                      <div className="p-4 space-y-3">
                        {availableSubjects.map(subject => {
                          const isSelected = selectedSubjects.some(s => s.id === subject.id)
                          return (
                            <div 
                              key={subject.id} 
                              className={`p-4 border rounded-lg cursor-pointer transition-all hover:bg-muted/50 ${
                                isSelected ? 'border-primary bg-primary/5' : 'border-border bg-background'
                              }`}
                              onClick={() => toggleSubjectSelection(subject)}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3 flex-1">
                                  {isSelected ? (
                                    <CheckCircle2 className="h-5 w-5 text-primary" />
                                  ) : (
                                    <Circle className="h-5 w-5 text-muted-foreground" />
                                  )}
                                  
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                      <h4 className="font-semibold text-foreground">{subject.name}</h4>
                                      <Badge variant="outline">{subject.code}</Badge>
                                      <Badge variant={
                                        subject.type === 'Core' ? 'default' :
                                        subject.type === 'Elective' ? 'secondary' : 'outline'
                                      }>
                                        {subject.type}
                                      </Badge>
                                    </div>
                                    
                                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                      <span>{subject.credits} credits</span>
                                      <span>Status: {subject.status}</span>
                                    </div>
                                    
                                    {subject.description && (
                                      <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                                        {subject.description}
                                      </p>
                                    )}
                                    
                                    {subject.prerequisites.length > 0 && (
                                      <div className="flex items-center gap-2 mt-2">
                                        <span className="text-xs text-muted-foreground">Prerequisites:</span>
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
                                </div>
                                
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    addSubject(subject)
                                  }}
                                  className="ml-2"
                                >
                                  <Plus className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </ScrollArea>
                  )}
                </TabsContent>

                {/* Selected Subjects Tab */}
                <TabsContent value="selected" className="space-y-4">
                  {selectedSubjects.length === 0 ? (
                    <div className="text-center py-12 border border-dashed border-border rounded-lg bg-muted/20">
                      <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-foreground mb-2">No subjects selected</h3>
                      <p className="text-muted-foreground">
                        Switch to Available tab to select subjects for this course plan
                      </p>
                    </div>
                  ) : (
                    <ScrollArea className="h-96 border border-border rounded-lg bg-background">
                      <div className="p-4 space-y-3">
                        {selectedSubjects.map(subject => (
                          <div key={subject.id} className="p-4 border border-primary/20 bg-primary/5 rounded-lg">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3 flex-1">
                                <CheckCircle2 className="h-5 w-5 text-primary" />
                                
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-2">
                                    <h4 className="font-semibold text-foreground">{subject.name}</h4>
                                    <Badge variant="outline">{subject.code}</Badge>
                                    <Badge variant={
                                      subject.type === 'Core' ? 'default' :
                                      subject.type === 'Elective' ? 'secondary' : 'outline'
                                    }>
                                      {subject.type}
                                    </Badge>
                                  </div>
                                  
                                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                    <span>{subject.credits} credits</span>
                                    <span>Status: {subject.status}</span>
                                  </div>

                                  {subject.prerequisites.length > 0 && (
                                    <div className="flex items-center gap-2 mt-2">
                                      <span className="text-xs text-muted-foreground">Prerequisites:</span>
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
                              </div>
                              
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => removeSubject(subject.id)}
                                className="text-red-500 hover:text-red-700 hover:bg-red-50 ml-2"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          )}

          {/* Summary */}
          {selectedSubjects.length > 0 && (
            <Card className="bg-muted/30 border border-border">
              <CardHeader>
                <CardTitle className="text-lg">Course Plan Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Total Subjects:</span>
                    <p className="font-medium text-foreground">{selectedSubjects.length}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Total Credits:</span>
                    <p className="font-medium text-foreground">{totalCredits}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Core Subjects:</span>
                    <p className="font-medium text-foreground">
                      {selectedSubjects.filter(s => s.type === 'Core').length}
                    </p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Electives:</span>
                    <p className="font-medium text-foreground">
                      {selectedSubjects.filter(s => s.type === 'Elective').length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={!formData.branch || selectedSubjects.length === 0}>
              {editPlan ? 'Update Course Plan' : 'Create Course Plan'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}