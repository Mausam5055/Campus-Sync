import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { usePageLoading } from "@/hooks/use-page-loading"
import { ProfileSkeleton } from "@/components/ui/profile-skeleton"
import { QRCodeModal } from "@/components/ui/qr-code-modal"
import { Download, QrCode, CreditCard, Shield, Calendar } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useUserData } from "@/hooks/useUserData"
import { useStudentIDData } from "@/hooks/useStudentIDData"
import { EditStudentIDDialog } from "@/components/profile/EditStudentIDDialog"

export default function StudentID() {
  const isLoading = usePageLoading()
  const { toast } = useToast()
  const [qrModalOpen, setQrModalOpen] = useState(false)
  const [editStudentIDOpen, setEditStudentIDOpen] = useState(false)
  const { userData } = useUserData()
  const { studentIDData, updateStudentIDData } = useStudentIDData()

  const handleStudentIDUpdate = (updatedData: any) => {
    updateStudentIDData(updatedData)
    toast({
      title: "Student ID Updated",
      description: "Your Student ID information has been updated successfully."
    })
  }

  // Combined data for Student ID card display
  const idCardData = {
    // Profile data
    name: userData.name || "John Student",
    email: userData.email || "john@university.edu",
    phone: userData.phone || "+1 (555) 123-4567",
    studentId: userData.studentId || "STU-2024-001",
    course: userData.course || "Computer Science Engineering",
    year: userData.year || "3rd Year",
    semester: userData.semester || "6th Semester",
    cgpa: userData.cgpa || "8.65",
    avatar: userData.avatar || "/placeholder.svg",
    address: userData.address || "123 University Street, Campus City, ST 12345",
    enrollmentDate: userData.enrollmentDate || "August 2022",
    expectedGraduation: userData.expectedGraduation || "May 2026",
    status: userData.status || "Active",
    // Student ID specific data
    section: studentIDData.section || "A",
    rollNumber: studentIDData.rollNumber || "20CS001",
    admissionYear: studentIDData.admissionYear || "2022",
    validUntil: studentIDData.validUntil || "2026",
    bloodGroup: studentIDData.bloodGroup || "O+",
    emergencyContact: studentIDData.emergencyContact || "+1 (555) 987-6543",
    hostelBlock: studentIDData.hostelBlock || "Block-C",
    roomNumber: studentIDData.roomNumber || "C-301",
    libraryId: studentIDData.libraryId || "LIB-20CS001"
  }

  if (isLoading) {
    return <ProfileSkeleton />
  }

  const handleDownloadID = () => {
    toast({
      title: "Downloading ID Card",
      description: "Your student ID card is being prepared for download."
    })
    
    // Simulate ID card generation and download
    setTimeout(() => {
      toast({
        title: "Download Complete",
        description: "Your student ID card has been downloaded successfully."
      })
    }, 2000)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="mobile-heading-large font-bold tracking-tight">Student ID Card</h1>
          <p className="text-muted-foreground text-sm sm:text-base mobile-hide-description">
            Your official student identification
          </p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button 
            variant="outline" 
            className="flex-1 sm:flex-none"
            onClick={() => setEditStudentIDOpen(true)}
          >
            <CreditCard className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Edit ID Info</span>
            <span className="sm:hidden">Edit</span>
          </Button>
          <Button 
            variant="outline" 
            className="flex-1 sm:flex-none"
            onClick={() => setQrModalOpen(true)}
          >
            <QrCode className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">QR Code</span>
            <span className="sm:hidden">QR</span>
          </Button>
          <Button 
            className="flex-1 sm:flex-none"
            onClick={handleDownloadID}
          >
            <Download className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Download ID</span>
            <span className="sm:hidden">Download</span>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 lg:gap-6 lg:grid-cols-2">
        {/* Physical ID Card Preview */}
        <Card className="relative overflow-hidden">
          <div className="bg-gradient-to-br from-primary/20 via-primary/10 to-background p-3 sm:p-6">
            <div className="bg-white dark:bg-gray-900 rounded-lg p-4 sm:p-6 shadow-lg">
              {/* Header */}
              <div className="text-center mb-4 sm:mb-6">
                <h3 className="text-base sm:text-lg font-bold text-primary">UNIVERSITY NAME</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">Student Identity Card</p>
              </div>

              {/* Student Photo and Basic Info */}
              <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
                <Avatar className="h-16 w-16 sm:h-20 sm:w-20 border-2 border-primary">
                  <AvatarImage src={idCardData.avatar} alt={idCardData.name} />
                  <AvatarFallback className="text-sm sm:text-lg">
                    {idCardData.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <h4 className="font-bold text-base sm:text-lg">{idCardData.name}</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">{idCardData.course}</p>
                  <div className="flex items-center gap-1 sm:gap-2">
                    <Badge variant="secondary" className="text-xs">{idCardData.year}</Badge>
                    <Badge variant="outline" className="text-xs">Sec {idCardData.section}</Badge>
                  </div>
                </div>
              </div>

              {/* ID Details */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Student ID:</span>
                  <span className="font-mono font-semibold">{idCardData.studentId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Roll Number:</span>
                  <span className="font-mono">{idCardData.rollNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Valid Until:</span>
                  <span>{idCardData.validUntil}</span>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-6 pt-4 border-t flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-primary" />
                  <span className="text-xs text-muted-foreground">Authorized ID</span>
                </div>
                <div className="w-8 h-8 bg-primary/10 rounded flex items-center justify-center">
                  <QrCode className="h-4 w-4 text-primary" />
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Detailed Information */}
        <div className="space-y-6">
          {/* Academic Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Academic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-sm">
                <div>
                  <label className="text-muted-foreground text-xs">Student ID</label>
                  <p className="font-mono font-semibold text-sm">{idCardData.studentId}</p>
                </div>
                <div>
                  <label className="text-muted-foreground text-xs">Roll Number</label>
                  <p className="font-mono text-sm">{idCardData.rollNumber}</p>
                </div>
                <div className="sm:col-span-2">
                  <label className="text-muted-foreground text-xs">Course</label>
                  <p className="text-sm">{idCardData.course}</p>
                </div>
                <div>
                  <label className="text-muted-foreground text-xs">Year & Section</label>
                  <p className="text-sm">{idCardData.year} - Section {idCardData.section}</p>
                </div>
                <div>
                  <label className="text-muted-foreground text-xs">Admission Year</label>
                  <p className="text-sm">{idCardData.admissionYear}</p>
                </div>
                <div className="sm:col-span-2">
                  <label className="text-muted-foreground text-xs">Library ID</label>
                  <p className="font-mono text-sm">{idCardData.libraryId}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Personal & Emergency Details */}
          <Card>
            <CardHeader>
              <CardTitle>Personal & Emergency Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-sm">
                <div>
                  <label className="text-muted-foreground text-xs">Blood Group</label>
                  <p className="font-semibold text-red-600">{idCardData.bloodGroup}</p>
                </div>
                <div>
                  <label className="text-muted-foreground text-xs">Emergency Contact</label>
                  <p className="font-mono text-sm">{idCardData.emergencyContact}</p>
                </div>
                <div>
                  <label className="text-muted-foreground text-xs">Hostel Block</label>
                  <p className="text-sm">{idCardData.hostelBlock}</p>
                </div>
                <div>
                  <label className="text-muted-foreground text-xs">Room Number</label>
                  <p className="text-sm">{idCardData.roomNumber}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Card Validity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Card Validity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
                <div>
                  <p className="font-semibold text-green-700 dark:text-green-300">Valid Until {idCardData.validUntil}</p>
                  <p className="text-sm text-green-600 dark:text-green-400">This ID card is currently active</p>
                </div>
                <Shield className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Usage Instructions */}
      <Card>
        <CardHeader>
          <CardTitle>ID Card Usage</CardTitle>
          <CardDescription>Important information about using your student ID</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-2">
              <h4 className="font-semibold text-sm">Library Access</h4>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Use your ID to access library resources and borrow books.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-sm">Examination Hall</h4>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Mandatory to carry your ID card to all examinations.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-sm">Campus Facilities</h4>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Required for accessing computer labs, cafeteria, and hostel.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <QRCodeModal
        open={qrModalOpen}
        onOpenChange={setQrModalOpen}
        data={idCardData}
        title="Student ID"
      />

      <EditStudentIDDialog
        open={editStudentIDOpen}
        onOpenChange={setEditStudentIDOpen}
        studentIDData={studentIDData}
        onSave={handleStudentIDUpdate}
      />
    </div>
  )
}