import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { User, Mail, Phone, Calendar, MapPin, BookOpen, Building, Hash, GraduationCap } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface TeacherDetailsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  teacher: {
    id: string
    name: string
    email: string
    phone: string
    department: string
    designation: string
    employeeId: string
    joiningDate: string
    leavingDate?: string
    qualification: string
    experience: number
    subjects: string[]
    officeRoom: string
    status: 'active' | 'retired' | 'transferred'
    salary: number
    session: string
  } | null
}

export function TeacherDetailsModal({ open, onOpenChange, teacher }: TeacherDetailsModalProps) {
  if (!teacher) return null

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'retired': return 'bg-blue-100 text-blue-800'
      case 'transferred': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${teacher.name}`} />
              <AvatarFallback>{teacher.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div>
              <div className="text-lg font-semibold">{teacher.name}</div>
              <div className="text-sm text-muted-foreground">{teacher.employeeId}</div>
            </div>
          </DialogTitle>
          <DialogDescription>
            View comprehensive details about teacher {teacher.name} including professional information, qualifications, and contact details.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Status and Department */}
          <div className="flex flex-wrap gap-2">
            <Badge className={getStatusColor(teacher.status)}>
              {teacher.status.charAt(0).toUpperCase() + teacher.status.slice(1)}
            </Badge>
            <Badge variant="outline">{teacher.department}</Badge>
            <Badge variant="outline">{teacher.designation}</Badge>
          </div>

          <Separator />

          {/* Professional Information */}
          <div>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Building className="h-4 w-4" />
              Professional Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Hash className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Employee ID:</span>
                  <span>{teacher.employeeId}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Department:</span>
                  <span>{teacher.department}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Designation:</span>
                  <span>{teacher.designation}</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Joining Date:</span>
                  <span>{new Date(teacher.joiningDate).toLocaleDateString()}</span>
                </div>
                {teacher.leavingDate && (
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Leaving Date:</span>
                    <span>{new Date(teacher.leavingDate).toLocaleDateString()}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Office Room:</span>
                  <span>{teacher.officeRoom}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Experience:</span>
                  <span>{teacher.experience} years</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Session:</span>
                  <span>{teacher.session}</span>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Academic Information */}
          <div>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <GraduationCap className="h-4 w-4" />
              Academic Information
            </h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <GraduationCap className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Qualification:</span>
                <span>{teacher.qualification}</span>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <BookOpen className="h-4 w-4 text-muted-foreground mt-0.5" />
                <span className="font-medium">Subjects:</span>
                <div className="flex flex-wrap gap-1">
                  {teacher.subjects.map((subject, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {subject}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Contact Information */}
          <div>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Contact Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Email:</span>
                  <span className="break-all">{teacher.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Phone:</span>
                  <span>{teacher.phone}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}