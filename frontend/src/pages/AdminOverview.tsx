import React, { useState } from 'react'
import { SEO } from '@/components/SEO'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Users, 
  BookOpen, 
  Calendar, 
  Building, 
  ChevronRight, 
  Plus,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  GraduationCap,
  UserCheck,
  FileText,
  BarChart3
} from 'lucide-react'
import { useAdminData } from '@/hooks/useAdminData'
import { Link } from 'react-router-dom'

const AdminOverview = () => {
  const { 
    branches, 
    subjects, 
    teachers, 
    coursePlans,
    statistics 
  } = useAdminData()

  const quickStats = [
    {
      title: "Total Students",
      value: statistics.totalStudents,
      icon: Users,
      change: "+12%",
      trend: "up",
      color: "text-blue-600"
    },
    {
      title: "Active Subjects",
      value: statistics.activeSubjects,
      icon: BookOpen,
      change: "+5%",
      trend: "up", 
      color: "text-green-600"
    },
    {
      title: "Active Teachers",
      value: statistics.activeTeachers,
      icon: UserCheck,
      change: "+8%",
      trend: "up",
      color: "text-purple-600"
    },
    {
      title: "Course Plans",
      value: coursePlans.length,
      icon: Calendar,
      change: "0%",
      trend: "neutral",
      color: "text-orange-600"
    }
  ]

  const recentActivities = [
    {
      id: 1,
      type: "subject_created",
      title: "New subject 'Advanced Algorithms' created",
      description: "Added to Computer Science - Semester 6",
      time: "2 hours ago",
      status: "completed"
    },
    {
      id: 2,
      type: "teacher_allocated",
      title: "Dr. Sarah Johnson assigned to Data Structures",
      description: "Allocation for Semester 2",
      time: "4 hours ago", 
      status: "completed"
    },
    {
      id: 3,
      type: "course_plan_updated",
      title: "Course plan updated for CSE Semester 3",
      description: "Added 2 new elective subjects",
      time: "6 hours ago",
      status: "completed"
    },
    {
      id: 4,
      type: "pending_allocation",
      title: "5 subjects pending teacher allocation",
      description: "Requires immediate attention",
      time: "1 day ago",
      status: "pending"
    }
  ]

  const systemHealth = {
    subjects: {
      total: statistics.totalSubjects,
      allocated: statistics.allocatedSubjects,
      unallocated: statistics.unassignedSubjects
    },
    teachers: {
      total: statistics.totalTeachers,
      active: statistics.activeTeachers,
      atCapacity: teachers.filter(t => t.currentSubjects >= t.maxSubjects).length
    },
    coursePlans: {
      total: coursePlans.length,
      active: coursePlans.filter(p => p.status === 'Active').length,
      draft: coursePlans.filter(p => p.status === 'Draft').length
    }
  }

  const quickActions = [
    {
      title: "Add New Subject",
      description: "Create and configure a new academic subject",
      icon: BookOpen,
      link: "/admin/subjects",
      color: "bg-primary/10 hover:bg-primary/20 border-primary/20 text-primary"
    },
    {
      title: "Create Course Plan", 
      description: "Plan semester curriculum and subject allocation",
      icon: Calendar,
      link: "/admin/course-planning",
      color: "bg-success/10 hover:bg-success/20 border-success/20 text-success"
    },
    {
      title: "Manage Allocations",
      description: "Assign subjects to teachers and manage workload",
      icon: UserCheck,
      link: "/admin/subject-allocation", 
      color: "bg-accent/10 hover:bg-accent/20 border-accent/20 text-accent"
    },
    {
      title: "Academic Structure",
      description: "Configure branches, semesters, and policies",
      icon: Building,
      link: "/admin/academic-structure",
      color: "bg-warning/10 hover:bg-warning/20 border-warning/20 text-warning"
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Admin Overview - Management Dashboard"
        description="Comprehensive admin dashboard for academic management and course planning"
      />
      
      <div className="container mx-auto p-4 md:p-6 lg:p-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Admin Overview
          </h1>
          <p className="text-lg text-muted-foreground hidden md:block">
            Manage academic structure, subjects, and course planning from one central dashboard
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
          {quickStats.map((stat) => (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <span className={`text-sm font-medium ${
                        stat.trend === 'up' ? 'text-green-600' : 
                        stat.trend === 'down' ? 'text-red-600' : 'text-muted-foreground'
                      }`}>
                        {stat.change}
                      </span>
                      {stat.trend === 'up' && <TrendingUp className="h-3 w-3 text-green-600" />}
                    </div>
                  </div>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Quick Actions
              </CardTitle>
              <CardDescription>
                Frequently used administrative functions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {quickActions.map((action) => (
                <Link key={action.title} to={action.link} className="block">
                  <div className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${action.color}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-start gap-3">
                        <action.icon className="h-5 w-5 mt-0.5 text-current" />
                        <div>
                          <h3 className="font-medium text-foreground">{action.title}</h3>
                          <p className="text-sm text-muted-foreground">{action.description}</p>
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </div>
                </Link>
              ))}
            </CardContent>
          </Card>

          {/* System Health */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                System Health
              </CardTitle>
              <CardDescription>
                Overview of academic system status
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Subject Allocation */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Subject Allocation</span>
                  <span className="text-sm text-muted-foreground">
                    {systemHealth.subjects.allocated}/{systemHealth.subjects.total}
                  </span>
                </div>
                <Progress 
                  value={(systemHealth.subjects.allocated / systemHealth.subjects.total) * 100} 
                  className="h-2"
                />
                {systemHealth.subjects.unallocated > 0 && (
                  <div className="flex items-center gap-2 mt-2">
                    <AlertCircle className="h-4 w-4 text-orange-500" />
                    <span className="text-sm text-orange-600">
                      {systemHealth.subjects.unallocated} subjects need allocation
                    </span>
                  </div>
                )}
              </div>

              {/* Teacher Capacity */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Teacher Capacity</span>
                  <span className="text-sm text-muted-foreground">
                    {systemHealth.teachers.active} active
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <div className="text-lg font-semibold text-green-600">
                      {systemHealth.teachers.active - systemHealth.teachers.atCapacity}
                    </div>
                    <div className="text-xs text-muted-foreground">Available</div>
                  </div>
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <div className="text-lg font-semibold text-red-600">
                      {systemHealth.teachers.atCapacity}
                    </div>
                    <div className="text-xs text-muted-foreground">At Capacity</div>
                  </div>
                </div>
              </div>

              {/* Course Plans */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Course Plans</span>
                  <span className="text-sm text-muted-foreground">
                    {systemHealth.coursePlans.total} total
                  </span>
                </div>
                <div className="flex gap-2">
                  <Badge variant="default" className="flex-1 justify-center">
                    {systemHealth.coursePlans.active} Active
                  </Badge>
                  <Badge variant="secondary" className="flex-1 justify-center">
                    {systemHealth.coursePlans.draft} Draft
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activities & Branch Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Recent Activities
              </CardTitle>
              <CardDescription>
                Latest administrative actions and updates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3 pb-4 border-b border-border last:border-0 last:pb-0">
                    <div className="mt-1">
                      {activity.status === 'completed' ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <AlertCircle className="h-4 w-4 text-orange-500" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">
                        {activity.title}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {activity.description}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                View All Activities
              </Button>
            </CardContent>
          </Card>

          {/* Branch Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5" />
                Branch Overview
              </CardTitle>
              <CardDescription>
                Academic branches and their current status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {branches.map((branch) => (
                  <div key={branch.id} className="p-4 border border-border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-medium text-foreground">{branch.name}</h4>
                        <p className="text-sm text-muted-foreground">{branch.code}</p>
                      </div>
                      <Badge variant="secondary">
                        {branch.currentStudents} students
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Enrollment</span>
                        <span>{branch.currentStudents}/{branch.capacity}</span>
                      </div>
                      <Progress 
                        value={(branch.currentStudents / branch.capacity) * 100} 
                        className="h-2"
                      />
                    </div>

                    <div className="flex justify-between mt-3 text-sm">
                      <span className="text-muted-foreground">Subjects:</span>
                      <div className="flex gap-2">
                        <span>{branch.subjects.core} Core</span>
                        <span>{branch.subjects.elective} Elective</span>
                        <span>{branch.subjects.general} General</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/admin/academic-structure">
                <Button variant="outline" className="w-full mt-4">
                  Manage Branches
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default AdminOverview