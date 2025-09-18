import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { usePageLoading } from "@/hooks/use-page-loading"
import { GenericPageSkeleton } from "@/components/ui/page-skeleton"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, Award, Target, BookOpen, Calendar, Trophy } from "lucide-react"

export default function AcademicProgress() {
  const isLoading = usePageLoading()

  if (isLoading) {
    return <GenericPageSkeleton />
  }

  const academicData = {
    currentSemester: 6,
    totalSemesters: 8,
    cgpa: 8.65,
    creditsCompleted: 128,
    totalCredits: 160,
    rank: 12,
    totalStudents: 180,
    attendance: 89,
    semesterProgress: [
      { semester: 1, sgpa: 8.2, credits: 20, status: "Completed" },
      { semester: 2, sgpa: 8.4, credits: 20, status: "Completed" },
      { semester: 3, sgpa: 8.7, credits: 20, status: "Completed" },
      { semester: 4, sgpa: 8.5, credits: 20, status: "Completed" },
      { semester: 5, sgpa: 9.1, credits: 20, status: "Completed" },
      { semester: 6, sgpa: 8.8, credits: 20, status: "In Progress" },
      { semester: 7, sgpa: 0, credits: 20, status: "Upcoming" },
      { semester: 8, sgpa: 0, credits: 20, status: "Upcoming" },
    ],
    achievements: [
      { title: "Dean's List", semester: "Semester 5", description: "Top 5% performance" },
      { title: "Academic Excellence", semester: "Semester 3", description: "SGPA above 8.5" },
      { title: "Perfect Attendance", semester: "Semester 2", description: "100% attendance" },
    ]
  }

  const progressPercentage = (academicData.creditsCompleted / academicData.totalCredits) * 100
  const semesterProgress = (academicData.currentSemester / academicData.totalSemesters) * 100

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="mobile-heading-large font-bold tracking-tight">Academic Progress</h1>
          <p className="text-muted-foreground text-sm sm:text-base mobile-hide-description">
            Track your academic journey and achievements
          </p>
        </div>
        <Button className="w-full sm:w-auto">
          <TrendingUp className="mr-2 h-4 w-4" />
          <span className="hidden sm:inline">View Analytics</span>
          <span className="sm:hidden">Analytics</span>
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-3 grid-cols-2 lg:grid-cols-4">
        <Card className="p-3">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-0">
            <CardTitle className="text-xs font-medium">CGPA</CardTitle>
            <TrendingUp className="h-3 w-3 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-0 pt-2">
            <div className="text-lg font-bold text-primary">{academicData.cgpa}/10</div>
            <p className="text-xs text-muted-foreground">
              +0.3 increase
            </p>
          </CardContent>
        </Card>
        
        <Card className="p-3">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-0">
            <CardTitle className="text-xs font-medium">Credits</CardTitle>
            <BookOpen className="h-3 w-3 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-0 pt-2">
            <div className="text-lg font-bold">{academicData.creditsCompleted}</div>
            <div className="mt-1">
              <Progress value={progressPercentage} className="h-1" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              /{academicData.totalCredits} ({Math.round(progressPercentage)}%)
            </p>
          </CardContent>
        </Card>
        
        <Card className="p-3">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-0">
            <CardTitle className="text-xs font-medium">Rank</CardTitle>
            <Award className="h-3 w-3 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-0 pt-2">
            <div className="text-lg font-bold">#{academicData.rank}</div>
            <p className="text-xs text-muted-foreground">
              Top {Math.round((academicData.rank / academicData.totalStudents) * 100)}%
            </p>
          </CardContent>
        </Card>

        <Card className="p-3">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-0">
            <CardTitle className="text-xs font-medium">Attendance</CardTitle>
            <Calendar className="h-3 w-3 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-0 pt-2">
            <div className="text-lg font-bold">{academicData.attendance}%</div>
            <p className="text-xs text-muted-foreground">
              Excellent
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Overall Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Degree Progress</CardTitle>
          <CardDescription>Your journey through the academic program</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Semester Progress</span>
              <span className="text-sm text-muted-foreground">
                Semester {academicData.currentSemester} of {academicData.totalSemesters}
              </span>
            </div>
            <Progress value={semesterProgress} className="h-3" />
            <div className="grid grid-cols-8 gap-2 mt-4">
              {academicData.semesterProgress.map((sem) => (
                <div key={sem.semester} className="text-center">
                  <div 
                    className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center text-xs font-semibold ${
                      sem.status === "Completed" ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300" :
                      sem.status === "In Progress" ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300" :
                      "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
                    }`}
                  >
                    {sem.semester}
                  </div>
                  <p className="text-xs mt-1 text-muted-foreground">
                    {sem.status === "Completed" ? sem.sgpa : 
                     sem.status === "In Progress" ? "Active" : "Future"}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Semester-wise Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Semester Performance</CardTitle>
          <CardDescription>Detailed view of your academic performance by semester</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {academicData.semesterProgress
              .filter(sem => sem.status === "Completed" || sem.status === "In Progress")
              .map((sem) => (
                <div key={sem.semester} className="border rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-sm">Sem {sem.semester}</h4>
                    <Badge variant={sem.status === "Completed" ? "secondary" : "default"} className="text-xs">
                      {sem.status === "Completed" ? "Done" : "Active"}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span>SGPA:</span>
                      <span className="font-semibold">{sem.sgpa || "TBD"}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>Credits:</span>
                      <span>{sem.credits}</span>
                    </div>
                    {sem.sgpa > 0 && (
                      <div className="mt-2">
                        <Progress value={(sem.sgpa / 10) * 100} className="h-1" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            Academic Achievements
          </CardTitle>
          <CardDescription>Recognition for your outstanding performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {academicData.achievements.map((achievement, index) => (
              <div key={index} className="border rounded-lg p-3 bg-gradient-to-br from-primary/5 to-background">
                <div className="flex items-start gap-2">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <Trophy className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm">{achievement.title}</h4>
                    <p className="text-xs text-muted-foreground mb-1">{achievement.semester}</p>
                    <p className="text-xs">{achievement.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Goals and Targets */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Academic Goals
          </CardTitle>
          <CardDescription>Track your progress towards academic milestones</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-semibold">Maintain CGPA above 8.5</h4>
                <Badge variant="default">On Track</Badge>
              </div>
              <Progress value={86.5} className="h-2 mb-2" />
              <p className="text-sm text-muted-foreground">Current: 8.65/10.0</p>
            </div>
            
            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-semibold">Complete degree in 4 years</h4>
                <Badge variant="default">On Track</Badge>
              </div>
              <Progress value={progressPercentage} className="h-2 mb-2" />
              <p className="text-sm text-muted-foreground">Progress: {Math.round(progressPercentage)}% completed</p>
            </div>
            
            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-semibold">Top 10 class rank</h4>
                <Badge variant="default">Achieved</Badge>
              </div>
              <Progress value={100} className="h-2 mb-2" />
              <p className="text-sm text-muted-foreground">Current rank: #{academicData.rank}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}