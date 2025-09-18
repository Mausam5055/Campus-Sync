import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  MapPin, 
  Calendar, 
  Phone, 
  Mail, 
  Edit, 
  User, 
  Shield, 
  Building,
  Clock,
  Award
} from "lucide-react"
import { UserData } from "@/hooks/useUserData"
import { useAdminIDData } from "@/hooks/useAdminIDData"

interface AdminProfileOverviewProps {
  userData: UserData
  onEditProfile: () => void
}

export function AdminProfileOverview({ userData, onEditProfile }: AdminProfileOverviewProps) {
  const { idData } = useAdminIDData()

  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {/* Profile Card */}
      <Card className="lg:col-span-1">
        <CardHeader className="text-center">
          <div className="relative inline-block">
            <Avatar className="h-20 w-20 sm:h-24 sm:w-24 mx-auto mb-4">
              <AvatarImage src={userData.avatar} alt={userData.name || "User"} />
              <AvatarFallback className="text-lg">
                {userData.name ? userData.name.split(' ').map(n => n[0]).join('').toUpperCase() : <User className="h-8 w-8" />}
              </AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
              <Badge variant="secondary" className="text-xs">
                <Shield className="h-3 w-3 mr-1" />
                Admin
              </Badge>
            </div>
          </div>
          <CardTitle className="text-lg sm:text-xl">
            {userData.name || "Please set your name"}
          </CardTitle>
          <CardDescription className="mt-2">
            <div className="flex items-center justify-center gap-2">
              <Badge variant="outline" className="text-green-600 border-green-200">
                Active
              </Badge>
              <Badge variant="outline">
                Elevated Access
              </Badge>
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
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
          {idData.officeRoom && (
            <div className="flex items-center gap-2 text-sm">
              <Building className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs sm:text-sm">Office: {idData.officeRoom}</span>
            </div>
          )}
          
          <Button 
            onClick={onEditProfile} 
            className="w-full mt-4" 
            size="sm"
          >
            <Edit className="mr-2 h-4 w-4" />
            Edit Profile
          </Button>
        </CardContent>
      </Card>

      {/* Administrative Information */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Administrative Information
          </CardTitle>
          <CardDescription className="hidden sm:block">
            Your administrative credentials and system access
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                <Award className="h-3 w-3" />
                Role & Position
              </label>
              <p className="font-medium text-sm">System Administrator</p>
              <p className="text-xs text-muted-foreground">Full system access privileges</p>
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                <Shield className="h-3 w-3" />
                Admin ID
              </label>
              <p className="font-medium text-sm">
                {idData.adminId || <span className="text-muted-foreground italic">Not configured</span>}
              </p>
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                <Building className="h-3 w-3" />
                Department
              </label>
              <p className="font-medium text-sm">
                {idData.department || <span className="text-muted-foreground italic">Not set</span>}
              </p>
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                <Clock className="h-3 w-3" />
                Joined Date
              </label>
              <p className="font-medium text-sm">
                {userData.enrollmentDate || <span className="text-muted-foreground italic">Not set</span>}
              </p>
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                Access Valid Until
              </label>
              <p className="font-medium text-sm">
                {idData.validUntil || <span className="text-muted-foreground italic">Not set</span>}
              </p>
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">Security Clearance</label>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-green-600 border-green-200">
                  <Shield className="h-3 w-3 mr-1" />
                  Level 5 - Maximum
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}