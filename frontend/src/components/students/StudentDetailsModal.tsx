import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  BookOpen, 
  GraduationCap,
  Award,
  Clock,
  Building
} from "lucide-react"

interface StudentData {
  id: string
  name: string
  email: string
  semester: string
  section: string
  phone?: string
  address?: string
  dateOfBirth?: string
  branch?: string
  cgpa?: number
  attendance?: number
  parentName?: string
  parentPhone?: string
  admissionYear?: string
  rollNumber?: string
}

interface StudentDetailsModalProps {
  student: StudentData | null
  isOpen: boolean
  onClose: () => void
}

export const StudentDetailsModal: React.FC<StudentDetailsModalProps> = ({
  student,
  isOpen,
  onClose
}) => {
  if (!student) return null

  // Generate additional data for demo purposes
  const studentDetails = {
    ...student,
    phone: student.phone || "+91 98765 43210",
    address: student.address || "123 Main Street, City, State - 12345",
    dateOfBirth: student.dateOfBirth || "15/08/2002",
    branch: student.branch || "Computer Science Engineering",
    cgpa: student.cgpa || 8.5,
    attendance: student.attendance || 92,
    parentName: student.parentName || "Mr. " + student.name.split(' ')[1] + " (Father)",
    parentPhone: student.parentPhone || "+91 98765 43211",
    admissionYear: student.admissionYear || "2020",
    rollNumber: student.rollNumber || student.id,
  }

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }

  const getCGPAColor = (cgpa: number) => {
    if (cgpa >= 9) return "text-green-600"
    if (cgpa >= 8) return "text-blue-600"
    if (cgpa >= 7) return "text-yellow-600"
    return "text-red-600"
  }

  const getAttendanceColor = (attendance: number) => {
    if (attendance >= 90) return "text-green-600"
    if (attendance >= 75) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${student.name}`} />
              <AvatarFallback className="text-lg font-semibold">
                {getInitials(student.name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-2">
              <DialogTitle className="text-xl sm:text-2xl font-bold">
                {studentDetails.name}
              </DialogTitle>
              <DialogDescription className="text-base">
                Student Details & Academic Information
              </DialogDescription>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="font-mono text-xs">
                  {studentDetails.rollNumber}
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  Semester {studentDetails.semester}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  Section {studentDetails.section}
                </Badge>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Contact Information */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <User className="h-5 w-5" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">{studentDetails.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Phone</p>
                    <p className="text-sm text-muted-foreground">{studentDetails.phone}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-muted-foreground mt-1" />
                <div>
                  <p className="text-sm font-medium">Address</p>
                  <p className="text-sm text-muted-foreground">{studentDetails.address}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Academic Information */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <GraduationCap className="h-5 w-5" />
                Academic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Branch</p>
                    <p className="text-sm text-muted-foreground">{studentDetails.branch}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Admission Year</p>
                    <p className="text-sm text-muted-foreground">{studentDetails.admissionYear}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Award className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">CGPA</p>
                    <p className={`text-sm font-semibold ${getCGPAColor(studentDetails.cgpa)}`}>
                      {studentDetails.cgpa}/10.0
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Attendance</p>
                    <p className={`text-sm font-semibold ${getAttendanceColor(studentDetails.attendance)}`}>
                      {studentDetails.attendance}%
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Personal Information */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Building className="h-5 w-5" />
                Personal & Family Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Date of Birth</p>
                    <p className="text-sm text-muted-foreground">{studentDetails.dateOfBirth}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Parent/Guardian</p>
                    <p className="text-sm text-muted-foreground">{studentDetails.parentName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Parent Phone</p>
                    <p className="text-sm text-muted-foreground">{studentDetails.parentPhone}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}