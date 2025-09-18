import React, { useState } from 'react'
import { SEO } from '@/components/SEO'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { GraduationCap, BookOpen, Users, Calendar, Building, Settings, ChevronRight, Plus, Edit, Trash2 } from 'lucide-react'
import { SemesterManager } from '@/components/exams/admin/SemesterManager'
import { useAdminData } from '@/hooks/useAdminData'
import { useToast } from '@/hooks/use-toast'

const AcademicStructure = () => {
  const { branches, statistics, settings, updateBranch, addBranch, updateSettings } = useAdminData()
  const { toast } = useToast()
  
  const [activeTab, setActiveTab] = useState('overview')
  const [isCreateBranchDialogOpen, setIsCreateBranchDialogOpen] = useState(false)
  const [isSettingsDialogOpen, setIsSettingsDialogOpen] = useState(false)
  const [editingBranch, setEditingBranch] = useState(null)
  
  const [branchFormData, setBranchFormData] = useState({
    name: '',
    code: '',
    duration: 4,
    totalCredits: 180,
    capacity: 400,
    currentStudents: 0
  })

  const [settingsFormData, setSettingsFormData] = useState(settings)

  const academicStructure = {
    university: 'Tech University',
    totalBranches: statistics.totalBranches,
    totalSemesters: 8,
    totalCredits: 180,
    activeStudents: statistics.totalStudents
  }

  // Sample semester data for SemesterManager
  const semesters = [
    {
      id: 1,
      name: '1st Semester 2024',
      startDate: '2024-01-15',
      endDate: '2024-05-15',
      isActive: true,
      examTypes: ['midterm', 'endterm', 'sessional', 'practical'],
      branches: ['CSE', 'ECE', 'ME', 'CE']
    },
    {
      id: 2,
      name: '2nd Semester 2024',
      startDate: '2024-06-15',
      endDate: '2024-10-15',
      isActive: false,
      examTypes: ['midterm', 'endterm', 'sessional'],
      branches: ['CSE', 'ECE', 'ME', 'CE']
    }
  ]

  const handleCreateBranch = (e) => {
    e.preventDefault()
    
    if (!branchFormData.name || !branchFormData.code) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      })
      return
    }

    const newBranch = {
      ...branchFormData,
      subjects: { core: 0, elective: 0, general: 0 },
      semesters: 8,
      status: 'Active' as 'Active' | 'Inactive'
    }

    if (editingBranch) {
      updateBranch(editingBranch.id, newBranch)
      toast({
        title: "Success",
        description: "Branch updated successfully"
      })
    } else {
      addBranch(newBranch)
      toast({
        title: "Success", 
        description: "Branch created successfully"
      })
    }
    
    setIsCreateBranchDialogOpen(false)
    setBranchFormData({ name: '', code: '', duration: 4, totalCredits: 180, capacity: 400, currentStudents: 0 })
    setEditingBranch(null)
  }

  const handleEditBranch = (branch) => {
    setEditingBranch(branch)
    setBranchFormData({
      name: branch.name,
      code: branch.code,
      duration: branch.duration,
      totalCredits: branch.totalCredits,
      capacity: branch.capacity,
      currentStudents: branch.currentStudents
    })
    setIsCreateBranchDialogOpen(true)
  }

  const handleUpdateSettings = (e) => {
    e.preventDefault()
    updateSettings(settingsFormData)
    toast({
      title: "Success",
      description: "Academic settings updated successfully"
    })
    setIsSettingsDialogOpen(false)
  }

  const semesterStructure = [
    { semester: 1, subjects: 6, credits: 22, type: 'Foundation' },
    { semester: 2, subjects: 6, credits: 23, type: 'Foundation' },
    { semester: 3, subjects: 6, credits: 22, type: 'Core' },
    { semester: 4, subjects: 6, credits: 23, type: 'Core' },
    { semester: 5, subjects: 6, credits: 22, type: 'Core' },
    { semester: 6, subjects: 6, credits: 23, type: 'Specialization' },
    { semester: 7, subjects: 5, credits: 22, type: 'Elective' },
    { semester: 8, subjects: 4, credits: 23, type: 'Project' }
  ]

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Academic Structure - Admin Panel"
        description="Manage academic structure, branches, and curriculum framework"
      />
      
      <div className="container mx-auto p-4 md:p-6 lg:p-8 max-w-full overflow-x-hidden">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2">
            Academic Structure
          </h1>
          <p className="hidden sm:block text-base sm:text-lg text-muted-foreground">
            Manage academic structure, branches, and curriculum framework
          </p>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <Building className="h-6 w-6 sm:h-8 sm:w-8 text-primary shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm font-medium text-muted-foreground">Total Branches</p>
                  <p className="text-lg sm:text-2xl font-bold text-foreground">{academicStructure.totalBranches}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <Calendar className="h-6 w-6 sm:h-8 sm:w-8 text-primary shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm font-medium text-muted-foreground">Total Semesters</p>
                  <p className="text-lg sm:text-2xl font-bold text-foreground">{academicStructure.totalSemesters}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <BookOpen className="h-6 w-6 sm:h-8 sm:w-8 text-primary shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm font-medium text-muted-foreground">Total Credits</p>
                  <p className="text-lg sm:text-2xl font-bold text-foreground">{academicStructure.totalCredits}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <Users className="h-6 w-6 sm:h-8 sm:w-8 text-primary shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm font-medium text-muted-foreground">Active Students</p>
                  <p className="text-lg sm:text-2xl font-bold text-foreground">{academicStructure.activeStudents}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="w-full overflow-x-auto pb-2 mb-6 sm:mb-8">
            <TabsList className="grid w-full min-w-fit grid-cols-4 h-auto">
              <TabsTrigger value="overview" className="text-xs sm:text-sm px-2 sm:px-4 py-2 whitespace-nowrap">
                <span className="hidden sm:inline">Branch Overview</span>
                <span className="sm:hidden">Branches</span>
              </TabsTrigger>
              <TabsTrigger value="semester" className="text-xs sm:text-sm px-2 sm:px-4 py-2 whitespace-nowrap">
                <span className="hidden sm:inline">Semester Management</span>
                <span className="sm:hidden">Semesters</span>
              </TabsTrigger>
              <TabsTrigger value="structure" className="text-xs sm:text-sm px-2 sm:px-4 py-2 whitespace-nowrap">
                <span className="hidden sm:inline">Academic Structure</span>
                <span className="sm:hidden">Structure</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="text-xs sm:text-sm px-2 sm:px-4 py-2 whitespace-nowrap">
                Settings
              </TabsTrigger>
            </TabsList>
          </div>
          
          {/* Branch Overview */}
          <TabsContent value="overview" className="space-y-4 sm:space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl font-semibold text-foreground">Branch Overview</h2>
              <Button onClick={() => setIsCreateBranchDialogOpen(true)} size="sm" className="w-full sm:w-auto">
                <Plus className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Add New Branch</span>
                <span className="sm:hidden">Add Branch</span>
              </Button>
            </div>
            
            <div className="space-y-4 sm:space-y-6">
              {branches.map((branch) => (
                <Card key={branch.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3 sm:pb-4">
                    <div className="flex flex-col gap-3 sm:gap-4">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                        <div className="min-w-0 flex-1">
                          <CardTitle className="text-lg sm:text-xl mb-2">
                            {branch.name}
                          </CardTitle>
                          <CardDescription className="flex flex-wrap gap-2 sm:gap-4 text-sm">
                            <Badge variant="secondary" className="text-xs">{branch.code}</Badge>
                            <span className="text-xs sm:text-sm">Duration: {branch.duration} years</span>
                            <span className="text-xs sm:text-sm">Credits: {branch.totalCredits}</span>
                          </CardDescription>
                        </div>
                        <div className="flex gap-2 w-full sm:w-auto">
                          <Button variant="outline" size="sm" onClick={() => handleEditBranch(branch)} className="flex-1 sm:flex-none">
                            <Edit className="h-4 w-4 sm:mr-2" />
                            <span className="hidden sm:inline">Edit</span>
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
                            <ChevronRight className="h-4 w-4 sm:mr-2" />
                            <span className="hidden sm:inline">View Details</span>
                            <span className="sm:hidden">Details</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4 sm:space-y-6 px-4 sm:px-6">
                    {/* Student Enrollment */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-foreground">Student Enrollment</span>
                        <span className="text-xs sm:text-sm text-muted-foreground">
                          {branch.currentStudents} / {branch.capacity}
                        </span>
                      </div>
                      <Progress 
                        value={(branch.currentStudents / branch.capacity) * 100} 
                        className="h-2"
                      />
                    </div>
                    
                    {/* Subject Distribution */}
                    <div className="grid grid-cols-3 gap-2 sm:gap-4">
                      <div className="text-center p-3 sm:p-4 border border-border rounded-lg">
                        <p className="text-lg sm:text-2xl font-bold text-primary">{branch.subjects.core}</p>
                        <p className="text-xs sm:text-sm text-muted-foreground">Core Subjects</p>
                      </div>
                      <div className="text-center p-3 sm:p-4 border border-border rounded-lg">
                        <p className="text-lg sm:text-2xl font-bold text-secondary">{branch.subjects.elective}</p>
                        <p className="text-xs sm:text-sm text-muted-foreground">Electives</p>
                      </div>
                      <div className="text-center p-3 sm:p-4 border border-border rounded-lg">
                        <p className="text-lg sm:text-2xl font-bold text-accent">{branch.subjects.general}</p>
                        <p className="text-xs sm:text-sm text-muted-foreground">General Subjects</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          {/* Semester Management */}
          <TabsContent value="semester" className="space-y-4 sm:space-y-6">
            <div className="max-w-full">
              <SemesterManager semesters={semesters} />
            </div>
          </TabsContent>

          {/* Academic Structure */}
          <TabsContent value="structure" className="space-y-4 sm:space-y-6">
            <div className="flex justify-between items-center mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl font-semibold text-foreground">Academic Structure</h2>
            </div>
            
            <div className="space-y-3 sm:space-y-4">
              {semesterStructure.map((sem) => (
                <Card key={sem.semester} className="hover:shadow-sm transition-shadow">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex flex-col gap-3 sm:gap-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                            <h3 className="text-base sm:text-lg font-semibold text-foreground">
                              Semester {sem.semester}
                            </h3>
                            <Badge variant={
                              sem.type === 'Foundation' ? 'default' :
                              sem.type === 'Core' ? 'secondary' :
                              sem.type === 'Specialization' ? 'outline' :
                              'destructive'
                            } className="text-xs w-fit">
                              {sem.type}
                            </Badge>
                          </div>
                          
                          <div className="flex flex-wrap gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <BookOpen className="h-3 w-3 sm:h-4 sm:w-4" />
                              {sem.subjects} Subjects
                            </span>
                            <span className="flex items-center gap-1">
                              <GraduationCap className="h-3 w-3 sm:h-4 sm:w-4" />
                              {sem.credits} Credits
                            </span>
                          </div>
                        </div>
                        
                        <Button variant="outline" size="sm" className="w-full sm:w-auto">
                          Configure
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          {/* Settings */}
          <TabsContent value="settings" className="space-y-4 sm:space-y-6">
            <div className="mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-2">Academic Settings</h2>
              <p className="text-sm sm:text-base text-muted-foreground">
                Configure global academic structure settings and policies
              </p>
            </div>
            
            <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Credit System</CardTitle>
                  <CardDescription className="text-sm">Configure credit requirements and structure</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 sm:space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs sm:text-sm font-medium">Minimum Credits for Graduation</span>
                    <Badge variant="secondary" className="text-xs">{settings.minCreditsForGraduation}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs sm:text-sm font-medium">Credits per Semester (Min)</span>
                    <Badge variant="secondary" className="text-xs">{settings.minCreditsPerSemester}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs sm:text-sm font-medium">Credits per Semester (Max)</span>
                    <Badge variant="secondary" className="text-xs">{settings.maxCreditsPerSemester}</Badge>
                  </div>
                  <Button variant="outline" className="w-full" onClick={() => setIsSettingsDialogOpen(true)} size="sm">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Credit Settings
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Academic Policies</CardTitle>
                  <CardDescription className="text-sm">Manage academic policies and regulations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 sm:space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs sm:text-sm font-medium">Minimum Attendance</span>
                    <Badge variant="secondary" className="text-xs">{settings.minAttendance}%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs sm:text-sm font-medium">Passing Grade</span>
                    <Badge variant="secondary" className="text-xs">{settings.passingGrade}%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs sm:text-sm font-medium">GPA Scale</span>
                    <Badge variant="secondary" className="text-xs">{settings.gpaScale}.0</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs sm:text-sm font-medium">Max Subjects per Teacher</span>
                    <Badge variant="secondary" className="text-xs">{settings.maxSubjectsPerTeacher}</Badge>
                  </div>
                  <Button variant="outline" className="w-full" onClick={() => setIsSettingsDialogOpen(true)} size="sm">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Policies
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Create/Edit Branch Dialog */}
        <Dialog open={isCreateBranchDialogOpen} onOpenChange={setIsCreateBranchDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editingBranch ? 'Edit Branch' : 'Create New Branch'}
              </DialogTitle>
              <DialogDescription>
                {editingBranch ? 'Update branch information' : 'Add a new academic branch to the system'}
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleCreateBranch} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="branchName">Branch Name *</Label>
                <Input
                  id="branchName"
                  value={branchFormData.name}
                  onChange={(e) => setBranchFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g., Computer Science Engineering"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="branchCode">Branch Code *</Label>
                <Input
                  id="branchCode"
                  value={branchFormData.code}
                  onChange={(e) => setBranchFormData(prev => ({ ...prev, code: e.target.value.toUpperCase() }))}
                  placeholder="e.g., CSE"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration (Years)</Label>
                  <Input
                    id="duration"
                    type="number"
                    min="3"
                    max="5"
                    value={branchFormData.duration}
                    onChange={(e) => setBranchFormData(prev => ({ ...prev, duration: parseInt(e.target.value) || 4 }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="totalCredits">Total Credits</Label>
                  <Input
                    id="totalCredits"
                    type="number"
                    min="120"
                    max="240"
                    value={branchFormData.totalCredits}
                    onChange={(e) => setBranchFormData(prev => ({ ...prev, totalCredits: parseInt(e.target.value) || 180 }))}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="capacity">Capacity</Label>
                  <Input
                    id="capacity"
                    type="number"
                    min="50"
                    value={branchFormData.capacity}
                    onChange={(e) => setBranchFormData(prev => ({ ...prev, capacity: parseInt(e.target.value) || 400 }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currentStudents">Current Students</Label>
                  <Input
                    id="currentStudents"
                    type="number"
                    min="0"
                    value={branchFormData.currentStudents}
                    onChange={(e) => setBranchFormData(prev => ({ ...prev, currentStudents: parseInt(e.target.value) || 0 }))}
                  />
                </div>
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsCreateBranchDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingBranch ? 'Update Branch' : 'Create Branch'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Settings Dialog */}
        <Dialog open={isSettingsDialogOpen} onOpenChange={setIsSettingsDialogOpen}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Academic Settings</DialogTitle>
              <DialogDescription>
                Configure academic policies and credit requirements
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleUpdateSettings} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="minCreditsGraduation">Min Credits for Graduation</Label>
                  <Input
                    id="minCreditsGraduation"
                    type="number"
                    min="120"
                    value={settingsFormData.minCreditsForGraduation}
                    onChange={(e) => setSettingsFormData(prev => ({ ...prev, minCreditsForGraduation: parseInt(e.target.value) || 180 }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maxSubjectsTeacher">Max Subjects per Teacher</Label>
                  <Input
                    id="maxSubjectsTeacher"
                    type="number"
                    min="2"
                    max="8"
                    value={settingsFormData.maxSubjectsPerTeacher}
                    onChange={(e) => setSettingsFormData(prev => ({ ...prev, maxSubjectsPerTeacher: parseInt(e.target.value) || 4 }))}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="minCreditsSemester">Min Credits per Semester</Label>
                  <Input
                    id="minCreditsSemester"
                    type="number"
                    min="12"
                    value={settingsFormData.minCreditsPerSemester}
                    onChange={(e) => setSettingsFormData(prev => ({ ...prev, minCreditsPerSemester: parseInt(e.target.value) || 18 }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maxCreditsSemester">Max Credits per Semester</Label>
                  <Input
                    id="maxCreditsSemester"
                    type="number"
                    min="18"
                    value={settingsFormData.maxCreditsPerSemester}
                    onChange={(e) => setSettingsFormData(prev => ({ ...prev, maxCreditsPerSemester: parseInt(e.target.value) || 26 }))}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="minAttendance">Min Attendance (%)</Label>
                  <Input
                    id="minAttendance"
                    type="number"
                    min="60"
                    max="100"
                    value={settingsFormData.minAttendance}
                    onChange={(e) => setSettingsFormData(prev => ({ ...prev, minAttendance: parseInt(e.target.value) || 75 }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="passingGrade">Passing Grade (%)</Label>
                  <Input
                    id="passingGrade"
                    type="number"
                    min="40"
                    max="80"
                    value={settingsFormData.passingGrade}
                    onChange={(e) => setSettingsFormData(prev => ({ ...prev, passingGrade: parseInt(e.target.value) || 50 }))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="gpaScale">GPA Scale</Label>
                <Select 
                  value={settingsFormData.gpaScale.toString()} 
                  onValueChange={(value) => setSettingsFormData(prev => ({ ...prev, gpaScale: parseInt(value) }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="4">4.0 Scale</SelectItem>
                    <SelectItem value="10">10.0 Scale</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsSettingsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  Save Settings
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

export default AcademicStructure