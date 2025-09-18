import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Save, FileText, Award, Calculator } from "lucide-react"

interface Student {
  id: string
  name: string
  email: string
  semester: string
  section: string
}

interface DetailedMarks {
  internal: {
    assignment1: number
    assignment2: number
    quiz1: number
    quiz2: number
    attendance: number
  }
  external: {
    midterm: number
    endterm: number
  }
}

interface DetailedMarksDialogProps {
  student: Student | null
  isOpen: boolean
  onClose: () => void
  onSave: (marks: DetailedMarks) => void
  existingMarks?: DetailedMarks
}

export function DetailedMarksDialog({ 
  student, 
  isOpen, 
  onClose, 
  onSave, 
  existingMarks 
}: DetailedMarksDialogProps) {
  const [marks, setMarks] = useState<DetailedMarks>(
    existingMarks || {
      internal: {
        assignment1: 0,
        assignment2: 0,
        quiz1: 0,
        quiz2: 0,
        attendance: 0
      },
      external: {
        midterm: 0,
        endterm: 0
      }
    }
  )

  // Reset when student changes or dialog opens
  useEffect(() => {
    if (existingMarks) {
      setMarks(existingMarks)
    } else {
      setMarks({
        internal: {
          assignment1: 0,
          assignment2: 0,
          quiz1: 0,
          quiz2: 0,
          attendance: 0
        },
        external: {
          midterm: 0,
          endterm: 0
        }
      })
    }
  }, [existingMarks, student])

  const calculateTotals = () => {
    const internalTotal = Object.values(marks.internal).reduce((sum, mark) => sum + mark, 0)
    const externalTotal = Object.values(marks.external).reduce((sum, mark) => sum + mark, 0)  
    const grandTotal = internalTotal + externalTotal
    return { internalTotal, externalTotal, grandTotal }
  }

  const calculateGrade = (total: number): { grade: string, gp: number } => {
    if (total >= 90) return { grade: 'A+', gp: 10 }
    if (total >= 80) return { grade: 'A', gp: 9 }
    if (total >= 70) return { grade: 'B+', gp: 8 }
    if (total >= 60) return { grade: 'B', gp: 7 }
    if (total >= 50) return { grade: 'C+', gp: 6 }
    if (total >= 40) return { grade: 'C', gp: 5 }
    return { grade: 'F', gp: 0 }
  }

  const handleSave = () => {
    onSave(marks)
    onClose()
  }

  const updateInternalMark = (key: keyof DetailedMarks['internal'], value: string) => {
    const numValue = Math.min(Number(value) || 0, getMaxMark(key))
    setMarks(prev => ({
      ...prev,
      internal: {
        ...prev.internal,
        [key]: numValue
      }
    }))
  }

  const updateExternalMark = (key: keyof DetailedMarks['external'], value: string) => {
    const maxMarks = { midterm: 30, endterm: 40 }
    const numValue = Math.min(Number(value) || 0, maxMarks[key])
    setMarks(prev => ({
      ...prev,
      external: {
        ...prev.external,
        [key]: numValue
      }
    }))
  }

  const getMaxMark = (key: keyof DetailedMarks['internal']) => {
    const maxMarks = { assignment1: 5, assignment2: 5, quiz1: 5, quiz2: 5, attendance: 10 }
    return maxMarks[key]
  }

  const { internalTotal, externalTotal, grandTotal } = calculateTotals()
  const { grade, gp } = calculateGrade(grandTotal)

  if (!student) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Detailed Marks Entry
          </DialogTitle>
          <DialogDescription>
            <div className="font-mono font-semibold text-base">{student.id}</div>
            <div className="text-base">{student.name}</div>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Summary Cards */}
          <div className="grid gap-3 grid-cols-2 lg:grid-cols-4">
            <Card className="p-3">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-0">
                <CardTitle className="text-xs font-medium">Internal</CardTitle>
                <Award className="h-3 w-3 text-muted-foreground" />
              </CardHeader>
              <CardContent className="p-0 pt-2">
                <div className="text-lg font-bold text-primary">{internalTotal}/30</div>
                <Progress value={(internalTotal / 30) * 100} className="h-1 mt-1" />
              </CardContent>
            </Card>
            
            <Card className="p-3">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-0">
                <CardTitle className="text-xs font-medium">External</CardTitle>
                <FileText className="h-3 w-3 text-muted-foreground" />
              </CardHeader>
              <CardContent className="p-0 pt-2">
                <div className="text-lg font-bold text-primary">{externalTotal}/70</div>
                <Progress value={(externalTotal / 70) * 100} className="h-1 mt-1" />
              </CardContent>
            </Card>
            
            <Card className="p-3">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-0">
                <CardTitle className="text-xs font-medium">Total</CardTitle>
                <Calculator className="h-3 w-3 text-muted-foreground" />
              </CardHeader>
              <CardContent className="p-0 pt-2">
                <div className="text-lg font-bold">{grandTotal}/100</div>
                <Progress value={grandTotal} className="h-1 mt-1" />
              </CardContent>
            </Card>

            <Card className="p-3">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-0">
                <CardTitle className="text-xs font-medium">Grade</CardTitle>
                <Award className="h-3 w-3 text-muted-foreground" />
              </CardHeader>
              <CardContent className="p-0 pt-2">
                <div className="flex items-center gap-2">
                  <Badge variant={grade.includes('+') ? "default" : "secondary"}>
                    {grade}
                  </Badge>
                  <span className="text-sm font-semibold">GP: {gp}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Separator />

          <Tabs defaultValue="internal" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="internal">Internal Assessment (30 marks)</TabsTrigger>
              <TabsTrigger value="external">External Assessment (70 marks)</TabsTrigger>
            </TabsList>
            
            <TabsContent value="internal" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="assignment1">Assignment 1 (Max: 5)</Label>
                  <Input
                    id="assignment1"
                    type="number"
                    min="0"
                    max="5"
                    value={marks.internal.assignment1}
                    onChange={(e) => updateInternalMark('assignment1', e.target.value)}
                    placeholder="Enter marks"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="assignment2">Assignment 2 (Max: 5)</Label>
                  <Input
                    id="assignment2"
                    type="number"
                    min="0"
                    max="5"
                    value={marks.internal.assignment2}
                    onChange={(e) => updateInternalMark('assignment2', e.target.value)}
                    placeholder="Enter marks"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quiz1">Quiz 1 (Max: 5)</Label>
                  <Input
                    id="quiz1"
                    type="number"
                    min="0"
                    max="5"
                    value={marks.internal.quiz1}
                    onChange={(e) => updateInternalMark('quiz1', e.target.value)}
                    placeholder="Enter marks"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quiz2">Quiz 2 (Max: 5)</Label>
                  <Input
                    id="quiz2"
                    type="number"
                    min="0"
                    max="5"
                    value={marks.internal.quiz2}
                    onChange={(e) => updateInternalMark('quiz2', e.target.value)}
                    placeholder="Enter marks"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="attendance">Attendance & Participation (Max: 10)</Label>
                  <Input
                    id="attendance"
                    type="number"
                    min="0"
                    max="10"
                    value={marks.internal.attendance}
                    onChange={(e) => updateInternalMark('attendance', e.target.value)}
                    placeholder="Enter marks"
                  />
                </div>
              </div>

              <Card className="p-4 bg-muted/50">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Internal Total:</span>
                  <span className="text-lg font-bold text-primary">{internalTotal}/30</span>
                </div>
                <Progress value={(internalTotal / 30) * 100} className="h-2 mt-2" />
              </Card>
            </TabsContent>
            
            <TabsContent value="external" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="midterm">Mid-term Exam (Max: 30)</Label>
                  <Input
                    id="midterm"
                    type="number"
                    min="0"
                    max="30"
                    value={marks.external.midterm}
                    onChange={(e) => updateExternalMark('midterm', e.target.value)}
                    placeholder="Enter marks"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="endterm">End-term Exam (Max: 40)</Label>
                  <Input
                    id="endterm"
                    type="number"
                    min="0"
                    max="40"
                    value={marks.external.endterm}
                    onChange={(e) => updateExternalMark('endterm', e.target.value)}
                    placeholder="Enter marks"
                  />
                </div>
              </div>

              <Card className="p-4 bg-muted/50">
                <div className="flex justify-between items-center">
                  <span className="font-medium">External Total:</span>
                  <span className="text-lg font-bold text-primary">{externalTotal}/70</span>
                </div>
                <Progress value={(externalTotal / 70) * 100} className="h-2 mt-2" />
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleSave} className="flex-1">
              <Save className="h-4 w-4 mr-2" />
              Save Detailed Marks
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}