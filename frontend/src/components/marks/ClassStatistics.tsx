import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, Users, Award, Target, BarChart3 } from "lucide-react"

interface MarkEntry {
  id: string
  studentId: string
  studentName: string
  internal: number
  external: number
  total: number
  grade: string
  gp: number
}

interface ClassStatisticsProps {
  marks: MarkEntry[]
  totalStudents: number
  subjectName?: string
}

export function ClassStatistics({ marks, totalStudents, subjectName }: ClassStatisticsProps) {
  const calculateStats = () => {
    if (marks.length === 0) {
      return {
        average: 0,
        highest: 0,
        lowest: 0,
        passRate: 0,
        gradeDistribution: { 'A+': 0, 'A': 0, 'B+': 0, 'B': 0, 'C+': 0, 'C': 0, 'F': 0 },
        averageInternal: 0,
        averageExternal: 0
      }
    }

    const totals = marks.map(m => m.total)
    const internals = marks.map(m => m.internal)
    const externals = marks.map(m => m.external)
    
    const average = totals.reduce((sum, total) => sum + total, 0) / marks.length
    const highest = Math.max(...totals)
    const lowest = Math.min(...totals)
    const passCount = marks.filter(m => m.total >= 40).length
    const passRate = (passCount / marks.length) * 100
    
    const averageInternal = internals.reduce((sum, mark) => sum + mark, 0) / marks.length
    const averageExternal = externals.reduce((sum, mark) => sum + mark, 0) / marks.length

    const gradeDistribution = marks.reduce((acc, mark) => {
      acc[mark.grade as keyof typeof acc] = (acc[mark.grade as keyof typeof acc] || 0) + 1
      return acc
    }, { 'A+': 0, 'A': 0, 'B+': 0, 'B': 0, 'C+': 0, 'C': 0, 'F': 0 })

    return {
      average: Math.round(average * 10) / 10,
      highest,
      lowest,
      passRate: Math.round(passRate * 10) / 10,
      gradeDistribution,
      averageInternal: Math.round(averageInternal * 10) / 10,
      averageExternal: Math.round(averageExternal * 10) / 10
    }
  }

  const stats = calculateStats()
  const completionRate = (marks.length / totalStudents) * 100

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          Class Statistics
          {subjectName && <Badge variant="outline">{subjectName}</Badge>}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overview Stats */}
        <div className="grid gap-3 grid-cols-2 lg:grid-cols-4">
          <Card className="p-3">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-0">
              <CardTitle className="text-xs font-medium">Class Average</CardTitle>
              <TrendingUp className="h-3 w-3 text-muted-foreground" />
            </CardHeader>
            <CardContent className="p-0 pt-2">
              <div className="text-lg font-bold text-primary">{stats.average}/100</div>
              <Progress value={stats.average} className="h-1 mt-1" />
            </CardContent>
          </Card>
          
          <Card className="p-3">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-0">
              <CardTitle className="text-xs font-medium">Pass Rate</CardTitle>
              <Target className="h-3 w-3 text-muted-foreground" />
            </CardHeader>
            <CardContent className="p-0 pt-2">
              <div className="text-lg font-bold text-green-600">{stats.passRate}%</div>
              <Progress value={stats.passRate} className="h-1 mt-1" />
            </CardContent>
          </Card>
          
          <Card className="p-3">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-0">
              <CardTitle className="text-xs font-medium">Completion</CardTitle>
              <Users className="h-3 w-3 text-muted-foreground" />
            </CardHeader>
            <CardContent className="p-0 pt-2">
              <div className="text-lg font-bold">{marks.length}/{totalStudents}</div>
              <Progress value={completionRate} className="h-1 mt-1" />
              <p className="text-xs text-muted-foreground mt-1">
                {Math.round(completionRate)}% complete
              </p>
            </CardContent>
          </Card>

          <Card className="p-3">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-0">
              <CardTitle className="text-xs font-medium">Range</CardTitle>
              <Award className="h-3 w-3 text-muted-foreground" />
            </CardHeader>
            <CardContent className="p-0 pt-2">
              <div className="text-sm">
                <div className="font-bold text-green-600">H: {stats.highest}</div>
                <div className="font-bold text-orange-600">L: {stats.lowest}</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Internal vs External Performance */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="p-4">
            <CardHeader className="p-0 pb-3">
              <CardTitle className="text-sm">Internal Assessment</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="text-xl font-bold text-primary">{stats.averageInternal}/30</div>
              <Progress value={(stats.averageInternal / 30) * 100} className="h-2 mt-2" />
              <div className="text-xs text-muted-foreground mt-1">
                Class average: {((stats.averageInternal / 30) * 100).toFixed(1)}%
              </div>
            </CardContent>
          </Card>

          <Card className="p-4">
            <CardHeader className="p-0 pb-3">
              <CardTitle className="text-sm">External Assessment</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="text-xl font-bold text-primary">{stats.averageExternal}/70</div>
              <Progress value={(stats.averageExternal / 70) * 100} className="h-2 mt-2" />
              <div className="text-xs text-muted-foreground mt-1">
                Class average: {((stats.averageExternal / 70) * 100).toFixed(1)}%
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Grade Distribution */}
        <div>
          <h4 className="font-semibold mb-3">Grade Distribution</h4>
          <div className="grid gap-2 grid-cols-3 md:grid-cols-7">
            {Object.entries(stats.gradeDistribution).map(([grade, count]) => (
              <div key={grade} className="text-center">
                <Badge 
                  variant={grade.includes('+') || grade === 'A' ? "default" : "secondary"}
                  className="w-full justify-center mb-1"
                >
                  {grade}
                </Badge>
                <div className="text-sm font-semibold">{count}</div>
                <div className="text-xs text-muted-foreground">
                  {marks.length > 0 ? Math.round((count / marks.length) * 100) : 0}%
                </div>
              </div>
            ))}
          </div>
        </div>

        {marks.length === 0 && (
          <div className="text-center text-muted-foreground py-8">
            <BarChart3 className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>No marks uploaded yet</p>
            <p className="text-sm">Statistics will appear once you start uploading marks</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}