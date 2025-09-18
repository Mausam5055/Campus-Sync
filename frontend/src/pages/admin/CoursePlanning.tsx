import React, { useState } from 'react'
import { SEO } from '@/components/SEO'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import { Calendar, Users, BookOpen, Clock, MapPin, GraduationCap, Plus, Edit, Trash2, Filter, FileText } from 'lucide-react'
import { CreateCoursePlanDialog } from '@/components/admin/CreateCoursePlanDialog'
import { useAdminData, CoursePlan } from '@/hooks/useAdminData'
import { useToast } from '@/hooks/use-toast'

const CoursePlanning = () => {
  const { coursePlans, branches, statistics, subjects, updateCoursePlan } = useAdminData()
  const { toast } = useToast()
  
  const [selectedBranch, setSelectedBranch] = useState('all')
  const [selectedSemester, setSelectedSemester] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [editingPlan, setEditingPlan] = useState<CoursePlan | null>(null)
  const [deletingPlan, setDeletingPlan] = useState<CoursePlan | null>(null)

  const semesters = [1, 2, 3, 4, 5, 6, 7, 8]

  const filteredPlans = coursePlans.filter(plan => {
    if (selectedBranch !== 'all' && plan.branch !== selectedBranch) return false
    if (selectedSemester !== 'all' && plan.semester.toString() !== selectedSemester) return false
    if (selectedStatus !== 'all' && plan.status !== selectedStatus) return false
    return true
  })

  const handleEdit = (plan: CoursePlan) => {
    setEditingPlan(plan)
    setIsCreateDialogOpen(true)
  }

  const handleStatusChange = (planId: string, newStatus: 'Active' | 'Draft' | 'Archived') => {
    updateCoursePlan(planId, { status: newStatus })
    toast({
      title: "Success",
      description: `Course plan status updated to ${newStatus}`
    })
  }

  const clearFilters = () => {
    setSelectedBranch('all')
    setSelectedSemester('all')
    setSelectedStatus('all')
  }

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Course Planning - Admin Panel"
        description="Plan and organize academic courses and curriculum structure"
      />
      
      <div className="container mx-auto p-4 md:p-6 lg:p-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2">
            Course Planning
          </h1>
          <p className="hidden sm:block text-lg text-muted-foreground">
            Plan and organize academic courses and curriculum structure
          </p>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <GraduationCap className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Course Plans</p>
                  <p className="text-2xl font-bold text-foreground">{coursePlans.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <Users className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Plans</p>
                  <p className="text-2xl font-bold text-foreground">
                    {coursePlans.filter(p => p.status === 'Active').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
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
                <Calendar className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Enrolled Students</p>
                  <p className="text-2xl font-bold text-foreground">
                    {coursePlans.reduce((sum, plan) => sum + plan.enrolledStudents, 0)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Actions */}
        <div className="space-y-4 mb-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <h2 className="text-2xl font-semibold text-foreground">Course Plans</h2>
            
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
                  setEditingPlan(null)
                  setIsCreateDialogOpen(true)
                }}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Create Course Plan
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
                  <SelectItem key={sem} value={sem.toString()}>Semester {sem}</SelectItem>
                ))}
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
                <SelectItem value="Archived">Archived</SelectItem>
              </SelectContent>
            </Select>
            
            <div className="flex items-center text-sm text-muted-foreground">
              Showing {filteredPlans.length} of {coursePlans.length} plans
            </div>
          </div>
        </div>

        {/* Course Plans */}
        <div className="space-y-6">
          {filteredPlans.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No course plans found</h3>
                <p className="text-muted-foreground mb-4">
                  {selectedBranch !== 'all' || selectedSemester !== 'all' || selectedStatus !== 'all'
                    ? 'No course plans match your current filters.'
                    : 'No course plans have been created yet.'
                  }
                </p>
                {selectedBranch === 'all' && selectedSemester === 'all' && selectedStatus === 'all' && (
                  <Button onClick={() => setIsCreateDialogOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create First Course Plan
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            filteredPlans.map((plan) => (
              <Card key={plan.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div>
                      <CardTitle className="text-xl mb-2">
                        {plan.branch} - Semester {plan.semester}
                      </CardTitle>
                      <CardDescription className="flex flex-wrap gap-4 text-sm">
                        <span className="flex items-center gap-1">
                          <BookOpen className="h-4 w-4" />
                          {plan.subjects.length} Subjects
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {plan.totalCredits} Credits
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {plan.enrolledStudents} Students
                        </span>
                        <Badge variant={
                          plan.status === 'Active' ? 'default' :
                          plan.status === 'Draft' ? 'secondary' : 'outline'
                        }>
                          {plan.status}
                        </Badge>
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Select
                        value={plan.status}
                        onValueChange={(value: 'Active' | 'Draft' | 'Archived') => 
                          handleStatusChange(plan.id, value)
                        }
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Draft">Draft</SelectItem>
                          <SelectItem value="Active">Active</SelectItem>
                          <SelectItem value="Archived">Archived</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEdit(plan)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="grid gap-3">
                    {plan.subjects.map((subject, index) => (
                      <div 
                        key={index}
                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
                            <h4 className="font-medium text-foreground">
                              {subject.name}
                            </h4>
                            <Badge variant="outline" className="w-fit">
                              {subject.code}
                            </Badge>
                            <Badge variant={
                              subject.type === 'Core' ? 'default' :
                              subject.type === 'Elective' ? 'secondary' : 'outline'
                            } className="w-fit">
                              {subject.type}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Credits: {subject.credits}
                          </p>
                          {subject.prerequisites && subject.prerequisites.length > 0 && (
                            <div className="flex items-center gap-1 mt-1">
                              <span className="text-xs text-muted-foreground">Prerequisites:</span>
                              {subject.prerequisites.map(prereq => (
                                <Badge key={prereq} variant="outline" className="text-xs">
                                  {prereq}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-border">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Total Credits:</span>
                        <p className="font-medium text-foreground">{plan.totalCredits}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Core Subjects:</span>
                        <p className="font-medium text-foreground">
                          {plan.subjects.filter(s => s.type === 'Core').length}
                        </p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Electives:</span>
                        <p className="font-medium text-foreground">
                          {plan.subjects.filter(s => s.type === 'Elective').length}
                        </p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Enrollment:</span>
                        <p className="font-medium text-foreground">{plan.enrolledStudents} students</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Create/Edit Course Plan Dialog */}
        <CreateCoursePlanDialog
          open={isCreateDialogOpen}
          onOpenChange={(open) => {
            setIsCreateDialogOpen(open)
            if (!open) setEditingPlan(null)
          }}
          editPlan={editingPlan}
        />
      </div>
    </div>
  )
}

export default CoursePlanning