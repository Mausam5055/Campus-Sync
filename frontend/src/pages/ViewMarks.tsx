import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { usePageLoading } from "@/hooks/use-page-loading"
import { GenericPageSkeleton } from "@/components/ui/page-skeleton"
import { Download, TrendingUp, Award, FileText } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { SubjectDetailModal } from "@/components/marks/SubjectDetailModal"

export default function ViewMarks() {
  const isLoading = usePageLoading()
  const [selectedSubject, setSelectedSubject] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  if (isLoading) {
    return <GenericPageSkeleton />
  }

  const handleSubjectClick = (subject: any) => {
    // Generate detailed breakdown data
    const detailedSubject = {
      ...subject,
      internalBreakdown: {
        assignment1: Math.floor(subject.internal * 0.15), // 15% of internal
        assignment2: Math.floor(subject.internal * 0.15), // 15% of internal  
        quiz1: Math.floor(subject.internal * 0.15), // 15% of internal
        quiz2: Math.floor(subject.internal * 0.15), // 15% of internal
        attendance: subject.internal - (Math.floor(subject.internal * 0.15) * 4) // Remaining
      },
      externalBreakdown: {
        midterm: Math.floor(subject.external * 0.43), // 30/70 ratio
        endterm: subject.external - Math.floor(subject.external * 0.43) // Remaining 40/70
      }
    }
    setSelectedSubject(detailedSubject)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedSubject(null)
  }

  const semesters = [
    {
      semester: "6th Semester",
      subjects: [
        { code: "CS301", name: "Database Management Systems", credits: 4, internal: 28, external: 75, total: 103, grade: "A+", gp: 10 },
        { code: "CS302", name: "Software Engineering", credits: 4, internal: 25, external: 70, total: 95, grade: "A", gp: 9 },
        { code: "CS303", name: "Computer Networks", credits: 4, internal: 30, external: 68, total: 98, grade: "A", gp: 9 },
        { code: "CS304", name: "Operating Systems", credits: 4, internal: 27, external: 72, total: 99, grade: "A", gp: 9 },
        { code: "CS305", name: "Web Technologies", credits: 3, internal: 29, external: 78, total: 107, grade: "A+", gp: 10 },
      ],
      sgpa: 9.32,
      status: "Current"
    },
    {
      semester: "5th Semester",
      subjects: [
        { code: "CS201", name: "Data Structures & Algorithms", credits: 4, internal: 26, external: 74, total: 100, grade: "A", gp: 9 },
        { code: "CS202", name: "Object Oriented Programming", credits: 4, internal: 28, external: 76, total: 104, grade: "A+", gp: 10 },
        { code: "CS203", name: "Computer Organization", credits: 3, internal: 24, external: 65, total: 89, grade: "B+", gp: 8 },
        { code: "CS204", name: "Discrete Mathematics", credits: 3, internal: 27, external: 70, total: 97, grade: "A", gp: 9 },
        { code: "CS205", name: "Digital Logic Design", credits: 3, internal: 25, external: 68, total: 93, grade: "A", gp: 9 },
      ],
      sgpa: 9.06,
      status: "Completed"
    }
  ]

  const overallStats = {
    cgpa: 8.65,
    totalCredits: 145,
    completedCredits: 128,
    rank: 12,
    totalStudents: 180
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="mobile-heading-large font-bold tracking-tight">Academic Marks</h1>
          <p className="text-muted-foreground text-sm sm:text-base mobile-hide-description">
            View your semester-wise marks and performance
          </p>
        </div>
        <Button className="w-full sm:w-auto">
          <Download className="mr-2 h-4 w-4" />
          <span className="hidden sm:inline">Download Transcript</span>
          <span className="sm:hidden">Download</span>
        </Button>
      </div>

      {/* Overall Statistics */}
      <div className="grid gap-3 grid-cols-2 lg:grid-cols-4">
        <Card className="p-3">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-0">
            <CardTitle className="text-xs font-medium">CGPA</CardTitle>
            <TrendingUp className="h-3 w-3 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-0 pt-2">
            <div className="text-lg font-bold text-primary">{overallStats.cgpa}/10</div>
            <p className="text-xs text-muted-foreground">
              Excellent
            </p>
          </CardContent>
        </Card>
        
        <Card className="p-3">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-0">
            <CardTitle className="text-xs font-medium">Credits</CardTitle>
            <Award className="h-3 w-3 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-0 pt-2">
            <div className="text-lg font-bold">{overallStats.completedCredits}</div>
            <div className="mt-1">
              <Progress value={(overallStats.completedCredits / overallStats.totalCredits) * 100} className="h-1" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              /{overallStats.totalCredits}
            </p>
          </CardContent>
        </Card>
        
        <Card className="p-3">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-0">
            <CardTitle className="text-xs font-medium">Rank</CardTitle>
            <Award className="h-3 w-3 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-0 pt-2">
            <div className="text-lg font-bold">#{overallStats.rank}</div>
            <p className="text-xs text-muted-foreground">
              /{overallStats.totalStudents}
            </p>
          </CardContent>
        </Card>

        <Card className="p-3">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-0">
            <CardTitle className="text-xs font-medium">Grade</CardTitle>
            <FileText className="h-3 w-3 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-0 pt-2">
            <div className="text-lg font-bold">A</div>
            <p className="text-xs text-muted-foreground">
              Top 10%
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Semester-wise Marks */}
      {semesters.map((semester) => (
        <Card key={semester.semester}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  {semester.semester}
                  <Badge variant={semester.status === "Current" ? "default" : "secondary"}>
                    {semester.status}
                  </Badge>
                </CardTitle>
                <CardDescription>
                  SGPA: <span className="font-semibold text-primary">{semester.sgpa}/10.0</span>
                </CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {/* Mobile View */}
            <div className="block md:hidden space-y-3">
              {semester.subjects.map((subject) => (
                <div 
                  key={subject.code} 
                  className="bg-muted/50 rounded-lg p-3 space-y-2 cursor-pointer hover:bg-muted/70 transition-colors"
                  onClick={() => handleSubjectClick(subject)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-sm">{subject.code}</h4>
                      <p className="text-xs text-muted-foreground line-clamp-1">{subject.name}</p>
                    </div>
                    <Badge variant={subject.grade.includes('+') ? "default" : "secondary"} className="text-xs">
                      {subject.grade}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div>
                      <span className="text-muted-foreground">Credits:</span>
                      <span className="ml-1 font-medium">{subject.credits}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Total:</span>
                      <span className="ml-1 font-semibold">{subject.total}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">GP:</span>
                      <span className="ml-1 font-semibold">{subject.gp}</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-muted-foreground">Internal:</span>
                      <span className="ml-1">{subject.internal}/30</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">External:</span>
                      <span className="ml-1">{subject.external}/70</span>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground mt-2 text-center">
                    Tap for detailed breakdown
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop View */}
            <div className="hidden md:block rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Subject Code</TableHead>
                    <TableHead>Subject Name</TableHead>
                    <TableHead>Credits</TableHead>
                    <TableHead>Internal (30)</TableHead>
                    <TableHead>External (70)</TableHead>
                    <TableHead>Total (100)</TableHead>
                    <TableHead>Grade</TableHead>
                    <TableHead>Grade Points</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {semester.subjects.map((subject) => (
                    <TableRow 
                      key={subject.code} 
                      className="cursor-pointer hover:bg-muted/50 transition-colors"
                      onClick={() => handleSubjectClick(subject)}
                    >
                      <TableCell className="font-medium">{subject.code}</TableCell>
                      <TableCell>{subject.name}</TableCell>
                      <TableCell>{subject.credits}</TableCell>
                      <TableCell>{subject.internal}</TableCell>
                      <TableCell>{subject.external}</TableCell>
                      <TableCell className="font-semibold">{subject.total}</TableCell>
                      <TableCell>
                        <Badge variant={subject.grade.includes('+') ? "default" : "secondary"}>
                          {subject.grade}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-semibold">{subject.gp}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Subject Detail Modal */}
      <SubjectDetailModal
        subject={selectedSubject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  )
}