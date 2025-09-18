import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { usePageLoading } from "@/hooks/use-page-loading"
import { ProfileSkeleton } from "@/components/ui/profile-skeleton"
import { GraduationCap, MapPin, Calendar, Phone, Mail, Edit, User } from "lucide-react"
import { EditProfileDialog } from "@/components/profile/EditProfileDialog"
import { useToast } from "@/hooks/use-toast"
import { useUserData } from "@/hooks/useUserData"

export default function StudentProfile() {
  const isLoading = usePageLoading()
  const { toast } = useToast()
  const navigate = useNavigate()
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const { userData, updateUserData } = useUserData()

  const handleProfileUpdate = (updatedData: any) => {
    updateUserData(updatedData)
    toast({
      title: "Profile Updated",
      description: "Your profile has been updated successfully."
    })
  }

  const handleQuickAction = (action: string) => {
    switch (action) {
      case "transcripts":
        toast({
          title: "Generating Transcripts",
          description: "Your academic transcripts are being prepared for download."
        })
        // Simulate transcript generation
        setTimeout(() => {
          toast({
            title: "Transcripts Ready",
            description: "Your transcripts have been generated successfully."
          })
        }, 2000)
        break
      case "schedule":
        navigate("/class-schedule")
        break
      case "advisor":
        toast({
          title: "Contacting Advisor",
          description: "Opening communication channel with your academic advisor."
        })
        // Simulate advisor contact
        setTimeout(() => {
          const advisorEmail = "advisor@university.edu"
          window.open(`mailto:${advisorEmail}?subject=Student Inquiry - ${userData.studentId}`)
        }, 1000)
        break
      case "update":
        setEditDialogOpen(true)
        break
      default:
        break
    }
  }

  if (isLoading) {
    return <ProfileSkeleton />
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="mobile-heading-large font-bold tracking-tight">Student Profile</h1>
          <p className="text-muted-foreground text-sm sm:text-base mobile-hide-description">
            View and manage your academic profile information
          </p>
        </div>
        <Button onClick={() => setEditDialogOpen(true)} className="w-full sm:w-auto">
          <Edit className="mr-2 h-4 w-4" />
          <span className="hidden sm:inline">Edit Profile</span>
          <span className="sm:hidden">Edit</span>
        </Button>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {/* Profile Overview */}
        <Card className="lg:col-span-1">
          <CardHeader className="text-center">
           <Avatar className="h-20 w-20 sm:h-24 sm:w-24 mx-auto mb-4">
             <AvatarImage src={userData.avatar} alt={userData.name || "User"} />
             <AvatarFallback className="text-lg">
               {userData.name ? userData.name.split(' ').map(n => n[0]).join('').toUpperCase() : <User className="h-8 w-8" />}
             </AvatarFallback>
           </Avatar>
           <CardTitle className="text-lg sm:text-xl">{userData.name || "Please set your name"}</CardTitle>
          <CardDescription className="mt-2">
            {userData.status && (
              <Badge variant="secondary">{userData.status}</Badge>
            )}
            {!userData.status && (
              <span className="text-muted-foreground">Status not set</span>
            )}
          </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
          <div className="flex items-center gap-2 text-sm">
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
            <span className="text-xs sm:text-sm">
              {userData.studentId || <span className="text-muted-foreground italic">Student ID not set</span>}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <span className="text-xs sm:text-sm break-all">
              {userData.email || <span className="text-muted-foreground italic">Email not set</span>}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <span className="text-xs sm:text-sm">
              {userData.phone || <span className="text-muted-foreground italic">Phone not set</span>}
            </span>
          </div>
          <div className="flex items-start gap-2 text-sm">
            <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
            <span className="text-xs sm:text-sm">
              {userData.address || <span className="text-muted-foreground italic">Address not set</span>}
            </span>
          </div>
          </CardContent>
        </Card>

        {/* Academic Information */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Academic Information</CardTitle>
            <CardDescription className="hidden sm:block">Your current academic status and progress</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground">Course</label>
                <p className="font-medium text-sm">{userData.course || <span className="text-muted-foreground italic">Not set</span>}</p>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground">Current Year</label>
                <p className="font-medium text-sm">{userData.year || <span className="text-muted-foreground italic">Not set</span>}</p>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground">Current Semester</label>
                <p className="font-medium text-sm">{userData.semester || <span className="text-muted-foreground italic">Not set</span>}</p>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground">CGPA</label>
                <p className="font-medium text-primary text-sm">
                  {userData.cgpa ? `${userData.cgpa}/10.0` : <span className="text-muted-foreground italic">Not set</span>}
                </p>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground">Enrollment Date</label>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <p className="font-medium text-sm">
                    {userData.enrollmentDate || <span className="text-muted-foreground italic">Not set</span>}
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground">Expected Graduation</label>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <p className="font-medium text-sm">
                    {userData.expectedGraduation || <span className="text-muted-foreground italic">Not set</span>}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">Quick Actions</CardTitle>
          <CardDescription className="hidden sm:block">Access your academic resources quickly</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 grid-cols-2 lg:grid-cols-4">
            <Button 
              variant="outline" 
              className="h-auto p-3 flex flex-col gap-1 text-xs sm:text-sm"
              onClick={() => handleQuickAction("transcripts")}
            >
              <GraduationCap className="h-4 w-4 sm:h-5 sm:w-5" />
              <span>Transcripts</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-auto p-3 flex flex-col gap-1 text-xs sm:text-sm"
              onClick={() => handleQuickAction("schedule")}
            >
              <Calendar className="h-4 w-4 sm:h-5 sm:w-5" />
              <span>Schedule</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-auto p-3 flex flex-col gap-1 text-xs sm:text-sm"
              onClick={() => handleQuickAction("advisor")}
            >
              <Mail className="h-4 w-4 sm:h-5 sm:w-5" />
              <span>Advisor</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-auto p-3 flex flex-col gap-1 text-xs sm:text-sm"
              onClick={() => handleQuickAction("update")}
            >
              <Edit className="h-4 w-4 sm:h-5 sm:w-5" />
              <span>Update</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      <EditProfileDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        student={userData}
        onSave={handleProfileUpdate}
      />
    </div>
  )
}