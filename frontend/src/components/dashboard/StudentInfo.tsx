import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { GraduationCap, Mail, User, Edit } from "lucide-react"
import { useUserData } from "@/hooks/useUserData"

export function StudentInfo() {
  const { userData } = useUserData()
  const navigate = useNavigate()

  // Don't show the card if user hasn't filled in basic info
  if (!userData.name && !userData.email && !userData.course) {
    return null
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-base">Student Information</CardTitle>
          <CardDescription className="text-sm">
            Your current profile details
          </CardDescription>
        </div>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => navigate('/student-profile')}
        >
          <Edit className="h-4 w-4 mr-2" />
          Edit
        </Button>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={userData.avatar} alt={userData.name} />
            <AvatarFallback>
              {userData.name ? userData.name.split(' ').map(n => n[0]).join('') : <User className="h-6 w-6" />}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <div className="flex items-center gap-2">
              <h3 className="font-medium text-sm">
                {userData.name || 'Please set your name'}
              </h3>
              {userData.status && (
                <Badge variant="secondary" className="text-xs">
                  {userData.status}
                </Badge>
              )}
            </div>
            
            {userData.email && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Mail className="h-3 w-3" />
                {userData.email || 'Please set your email'}
              </div>
            )}
            
            {userData.course && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <GraduationCap className="h-3 w-3" />
                {userData.course || 'Please set your course'}
              </div>
            )}
            
            {userData.year && userData.semester && (
              <p className="text-xs text-muted-foreground">
                {userData.year} • {userData.semester}
              </p>
            )}
            
            {userData.cgpa && (
              <p className="text-xs font-medium text-primary">
                CGPA: {userData.cgpa}/10.0
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}