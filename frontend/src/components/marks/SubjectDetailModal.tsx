import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { FileText, TrendingUp, Award, Calendar } from "lucide-react"

interface SubjectDetail {
  code: string
  name: string
  credits: number
  internal: number
  external: number
  total: number
  grade: string
  gp: number
  internalBreakdown: {
    assignment1: number
    assignment2: number
    quiz1: number
    quiz2: number
    attendance: number
  }
  externalBreakdown: {
    midterm: number
    endterm: number
  }
}

interface SubjectDetailModalProps {
  subject: SubjectDetail | null
  isOpen: boolean
  onClose: () => void
}

export function SubjectDetailModal({ subject, isOpen, onClose }: SubjectDetailModalProps) {
  if (!subject) return null

  const internalTotal = Object.values(subject.internalBreakdown).reduce((sum, mark) => sum + mark, 0)
  const externalTotal = Object.values(subject.externalBreakdown).reduce((sum, mark) => sum + mark, 0)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] sm:max-w-2xl max-h-[90vh] w-full mx-2 sm:mx-4">
        <DialogHeader>
          <DialogTitle className="flex items-start gap-3 text-left">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg sm:text-xl font-bold">{subject.code}</span>
                <Badge variant={subject.grade.includes('+') ? "default" : "secondary"}>
                  {subject.grade}
                </Badge>
              </div>
              <div className="text-sm text-muted-foreground">
                {subject.name}
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 max-h-[60vh] overflow-y-auto">
          {/* Overview Cards */}
          <div className="grid gap-3 grid-cols-2 lg:grid-cols-4">
            <Card className="p-3">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-0">
                <CardTitle className="text-xs font-medium">Credits</CardTitle>
                <Award className="h-3 w-3 text-muted-foreground" />
              </CardHeader>
              <CardContent className="p-0 pt-2">
                <div className="text-lg font-bold">{subject.credits}</div>
              </CardContent>
            </Card>
            
            <Card className="p-3">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-0">
                <CardTitle className="text-xs font-medium">Total</CardTitle>
                <TrendingUp className="h-3 w-3 text-muted-foreground" />
              </CardHeader>
              <CardContent className="p-0 pt-2">
                <div className="text-lg font-bold text-primary">{subject.total}/100</div>
              </CardContent>
            </Card>
            
            <Card className="p-3">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-0">
                <CardTitle className="text-xs font-medium">Grade</CardTitle>
                <FileText className="h-3 w-3 text-muted-foreground" />
              </CardHeader>
              <CardContent className="p-0 pt-2">
                <div className="text-lg font-bold">{subject.grade}</div>
              </CardContent>
            </Card>

            <Card className="p-3">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-0">
                <CardTitle className="text-xs font-medium">GP</CardTitle>
                <Calendar className="h-3 w-3 text-muted-foreground" />
              </CardHeader>
              <CardContent className="p-0 pt-2">
                <div className="text-lg font-bold">{subject.gp}/10</div>
              </CardContent>
            </Card>
          </div>

          <Separator />

          {/* Internal Assessment Details */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Internal Assessment</h3>
              <Badge variant="outline">{subject.internal}/30</Badge>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Overall Progress</span>
                <span className="text-sm text-muted-foreground">
                  {subject.internal}/30 ({((subject.internal / 30) * 100).toFixed(1)}%)
                </span>
              </div>
              <Progress value={(subject.internal / 30) * 100} className="h-2" />
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <Card className="p-3">
                <CardHeader className="p-0 pb-2">
                  <CardTitle className="text-sm">Assignment 1</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="text-lg font-bold">{subject.internalBreakdown.assignment1}/5</div>
                  <Progress value={(subject.internalBreakdown.assignment1 / 5) * 100} className="h-1 mt-1" />
                </CardContent>
              </Card>

              <Card className="p-3">
                <CardHeader className="p-0 pb-2">
                  <CardTitle className="text-sm">Assignment 2</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="text-lg font-bold">{subject.internalBreakdown.assignment2}/5</div>
                  <Progress value={(subject.internalBreakdown.assignment2 / 5) * 100} className="h-1 mt-1" />
                </CardContent>
              </Card>

              <Card className="p-3">
                <CardHeader className="p-0 pb-2">
                  <CardTitle className="text-sm">Quiz 1</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="text-lg font-bold">{subject.internalBreakdown.quiz1}/5</div>
                  <Progress value={(subject.internalBreakdown.quiz1 / 5) * 100} className="h-1 mt-1" />
                </CardContent>
              </Card>

              <Card className="p-3">
                <CardHeader className="p-0 pb-2">
                  <CardTitle className="text-sm">Quiz 2</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="text-lg font-bold">{subject.internalBreakdown.quiz2}/5</div>
                  <Progress value={(subject.internalBreakdown.quiz2 / 5) * 100} className="h-1 mt-1" />
                </CardContent>
              </Card>

              <Card className="p-3 sm:col-span-2">
                <CardHeader className="p-0 pb-2">
                  <CardTitle className="text-sm">Attendance</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="text-lg font-bold">{subject.internalBreakdown.attendance}/10</div>
                  <Progress value={(subject.internalBreakdown.attendance / 10) * 100} className="h-1 mt-1" />
                </CardContent>
              </Card>
            </div>
          </div>

          <Separator />

          {/* External Assessment Details */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">External Assessment</h3>
              <Badge variant="outline">{subject.external}/70</Badge>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Overall Progress</span>
                <span className="text-sm text-muted-foreground">
                  {subject.external}/70 ({((subject.external / 70) * 100).toFixed(1)}%)
                </span>
              </div>
              <Progress value={(subject.external / 70) * 100} className="h-2" />
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <Card className="p-4">
                <CardHeader className="p-0 pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Mid-Term Exam
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="text-2xl font-bold text-primary">{subject.externalBreakdown.midterm}/30</div>
                  <Progress value={(subject.externalBreakdown.midterm / 30) * 100} className="h-2 mt-2" />
                  <div className="text-xs text-muted-foreground mt-1">
                    {((subject.externalBreakdown.midterm / 30) * 100).toFixed(1)}% achieved
                  </div>
                </CardContent>
              </Card>

              <Card className="p-4">
                <CardHeader className="p-0 pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    End-Term Exam
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="text-2xl font-bold text-primary">{subject.externalBreakdown.endterm}/40</div>
                  <Progress value={(subject.externalBreakdown.endterm / 40) * 100} className="h-2 mt-2" />
                  <div className="text-xs text-muted-foreground mt-1">
                    {((subject.externalBreakdown.endterm / 40) * 100).toFixed(1)}% achieved
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}