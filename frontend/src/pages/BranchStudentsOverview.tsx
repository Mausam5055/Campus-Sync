import React from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Users } from "lucide-react"
import { SEO } from "@/components/SEO"
import { BranchCard } from "@/components/admin/BranchCard"
import { usePageLoading } from "@/hooks/use-page-loading"
import { GenericPageSkeleton } from "@/components/ui/page-skeleton"

export default function BranchStudentsOverview() {
  const navigate = useNavigate()
  const isLoading = usePageLoading()

  const branches = [
    {
      name: "Computer Science",
      studentCount: 245,
      teacherCount: 18,
      description: "Software development, algorithms, and computing systems"
    },
    {
      name: "Electronics & Communication",
      studentCount: 198,
      teacherCount: 15,
      description: "Electronics, communications, and signal processing"
    },
    {
      name: "Mechanical Engineering",
      studentCount: 210,
      teacherCount: 16,
      description: "Mechanical systems, manufacturing, and design"
    },
    {
      name: "Civil Engineering",
      studentCount: 189,
      teacherCount: 14,
      description: "Infrastructure, construction, and structural engineering"
    },
    {
      name: "Information Technology",
      studentCount: 167,
      teacherCount: 12,
      description: "IT systems, networks, and information management"
    },
    {
      name: "Electrical Engineering",
      studentCount: 134,
      teacherCount: 11,
      description: "Electrical systems, power, and automation"
    }
  ]

  if (isLoading) return <GenericPageSkeleton />

  return (
    <div className="space-y-4 p-4 sm:p-6">
      <SEO title="Branch Students Overview" description="Overview of students by branch" />
      
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Mobile - Icon only */}
        <Button variant="outline" size="sm" onClick={() => navigate('/admin')} className="sm:hidden">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        
        {/* Desktop - Icon + Text */}
        <Button variant="outline" size="sm" onClick={() => navigate('/admin')} className="hidden sm:flex">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>
        
        <div className="flex-1 min-w-0">
          <h1 className="text-lg sm:text-2xl lg:text-3xl font-bold tracking-tight truncate">Students by Branch</h1>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Academic Branches - Students
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {branches.map((branch) => (
              <BranchCard
                key={branch.name}
                branch={branch.name}
                studentCount={branch.studentCount}
                teacherCount={branch.teacherCount}
                
                onViewStudents={() => navigate(`/admin/branch-students/${encodeURIComponent(branch.name)}`)}
                onViewTeachers={() => navigate(`/admin/branch-teachers/${encodeURIComponent(branch.name)}`)}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}