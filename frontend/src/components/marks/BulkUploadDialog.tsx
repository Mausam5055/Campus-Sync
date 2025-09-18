import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Upload, Download, FileText, AlertCircle, CheckCircle } from "lucide-react"

interface Student {
  id: string
  name: string
  email: string
  semester: string
  section: string
}

interface BulkMarkEntry {
  studentId: string
  internal: number
  external: number
  total: number
  grade: string
  gp: number
  error?: string
}

interface BulkUploadDialogProps {
  isOpen: boolean
  onClose: () => void
  onUpload: (marks: BulkMarkEntry[]) => void
  students: Student[]
  subjectName?: string
}

export function BulkUploadDialog({ 
  isOpen, 
  onClose, 
  onUpload, 
  students,
  subjectName 
}: BulkUploadDialogProps) {
  const [csvData, setCsvData] = useState("")
  const [parsedData, setParsedData] = useState<BulkMarkEntry[]>([])
  const [errors, setErrors] = useState<string[]>([])

  const calculateGrade = (total: number): { grade: string, gp: number } => {
    if (total >= 90) return { grade: 'A+', gp: 10 }
    if (total >= 80) return { grade: 'A', gp: 9 }
    if (total >= 70) return { grade: 'B+', gp: 8 }
    if (total >= 60) return { grade: 'B', gp: 7 }
    if (total >= 50) return { grade: 'C+', gp: 6 }
    if (total >= 40) return { grade: 'C', gp: 5 }
    return { grade: 'F', gp: 0 }
  }

  const generateTemplate = () => {
    const headers = "StudentID,Internal(30),External(70)"
    const sampleRows = students.slice(0, 3).map(student => 
      `${student.id},25,65`
    ).join('\n')
    
    return `${headers}\n${sampleRows}\n`
  }

  const downloadTemplate = () => {
    const template = generateTemplate()
    const blob = new Blob([template], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.style.display = 'none'
    a.href = url
    a.download = `${subjectName || 'marks'}_template.csv`
    document.body.appendChild(a)
    a.click()
    window.URL.revokeObjectURL(url)
    document.body.removeChild(a)
  }

  const parseCsvData = () => {
    if (!csvData.trim()) {
      setErrors(["Please enter CSV data"])
      return
    }

    const lines = csvData.trim().split('\n')
    const headers = lines[0].toLowerCase().split(',').map(h => h.trim())
    
    // Validate headers
    const requiredHeaders = ['studentid', 'internal', 'external']
    const missingHeaders = requiredHeaders.filter(h => !headers.some(header => header.includes(h)))
    
    if (missingHeaders.length > 0) {
      setErrors([`Missing required columns: ${missingHeaders.join(', ')}`])
      return
    }

    const studentIdIndex = headers.findIndex(h => h.includes('studentid'))
    const internalIndex = headers.findIndex(h => h.includes('internal'))
    const externalIndex = headers.findIndex(h => h.includes('external'))

    const newErrors: string[] = []
    const newParsedData: BulkMarkEntry[] = []

    for (let i = 1; i < lines.length; i++) {
      const row = lines[i].split(',').map(cell => cell.trim())
      
      if (row.length < 3) continue

      const studentId = row[studentIdIndex]
      const internal = parseFloat(row[internalIndex])
      const external = parseFloat(row[externalIndex])

      // Validate student exists
      const student = students.find(s => s.id === studentId)
      if (!student) {
        newErrors.push(`Row ${i + 1}: Student ID "${studentId}" not found`)
        continue
      }

      // Validate marks
      if (isNaN(internal) || internal < 0 || internal > 30) {
        newErrors.push(`Row ${i + 1}: Invalid internal marks "${row[internalIndex]}" (must be 0-30)`)
        continue
      }

      if (isNaN(external) || external < 0 || external > 70) {
        newErrors.push(`Row ${i + 1}: Invalid external marks "${row[externalIndex]}" (must be 0-70)`)
        continue
      }

      const total = internal + external
      const { grade, gp } = calculateGrade(total)

      newParsedData.push({
        studentId,
        internal,
        external,
        total,
        grade,
        gp
      })
    }

    setErrors(newErrors)
    setParsedData(newParsedData)
  }

  const handleUpload = () => {
    if (parsedData.length > 0 && errors.length === 0) {
      onUpload(parsedData)
      onClose()
      setCsvData("")
      setParsedData([])
      setErrors([])
    }
  }

  const handleClose = () => {
    onClose()
    setCsvData("")
    setParsedData([])
    setErrors([])
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Bulk Upload Marks
          </DialogTitle>
          <DialogDescription>
            Upload marks for multiple students using CSV format
            {subjectName && (
              <Badge variant="outline" className="ml-2">{subjectName}</Badge>
            )}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Instructions and Template */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Instructions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-sm space-y-2">
                <p>1. Download the CSV template below</p>
                <p>2. Fill in the marks for each student</p>
                <p>3. Copy and paste the CSV data into the text area</p>
                <p>4. Click "Parse Data" to validate</p>
                <p>5. Review and upload</p>
              </div>
              
              <Button onClick={downloadTemplate} variant="outline" className="w-full sm:w-auto">
                <Download className="h-4 w-4 mr-2" />
                Download CSV Template
              </Button>

              <div className="p-3 bg-muted rounded-md">
                <div className="text-xs font-mono">
                  <div className="font-semibold">CSV Format:</div>
                  <div>StudentID,Internal(30),External(70)</div>
                  <div>20CS001,25,65</div>
                  <div>20CS002,28,70</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CSV Input */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">CSV Data</label>
              <Button onClick={parseCsvData} variant="outline" size="sm">
                Parse Data
              </Button>
            </div>
            <Textarea
              placeholder="Paste your CSV data here..."
              value={csvData}
              onChange={(e) => setCsvData(e.target.value)}
              className="min-h-32 font-mono text-sm"
            />
          </div>

          {/* Errors */}
          {errors.length > 0 && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <div className="space-y-1">
                  <div className="font-semibold">Please fix the following errors:</div>
                  {errors.map((error, index) => (
                    <div key={index} className="text-sm">• {error}</div>
                  ))}
                </div>
              </AlertDescription>
            </Alert>
          )}

          {/* Parsed Data Preview */}
          {parsedData.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Parsed Data Preview ({parsedData.length} students)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="max-h-64 overflow-y-auto">
                  <div className="grid gap-2">
                    {parsedData.slice(0, 10).map((entry, index) => {
                      const student = students.find(s => s.id === entry.studentId)
                      return (
                        <div key={index} className="flex items-center justify-between p-2 bg-muted/50 rounded text-sm">
                          <div>
                            <span className="font-mono font-semibold">{entry.studentId}</span>
                            <span className="ml-2">{student?.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span>I: {entry.internal}</span>
                            <span>E: {entry.external}</span>
                            <span className="font-semibold">Total: {entry.total}</span>
                            <Badge variant={entry.grade.includes('+') ? "default" : "secondary"}>
                              {entry.grade}
                            </Badge>
                          </div>
                        </div>
                      )
                    })}
                    {parsedData.length > 10 && (
                      <div className="text-center text-sm text-muted-foreground p-2">
                        ... and {parsedData.length - 10} more students
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Actions */}
          <div className="flex gap-3">
            <Button variant="outline" onClick={handleClose} className="flex-1">
              Cancel
            </Button>
            <Button 
              onClick={handleUpload} 
              className="flex-1"
              disabled={parsedData.length === 0 || errors.length > 0}
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload {parsedData.length} Marks
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}