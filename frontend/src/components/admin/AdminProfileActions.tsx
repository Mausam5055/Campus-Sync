import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Users, 
  GraduationCap, 
  Shield, 
  Edit, 
  Settings, 
  BarChart3,
  FileText,
  Database,
  Bell
} from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useToast } from "@/hooks/use-toast"

interface AdminProfileActionsProps {
  onEditProfile: () => void
}

export function AdminProfileActions({ onEditProfile }: AdminProfileActionsProps) {
  const navigate = useNavigate()
  const { toast } = useToast()

  const primaryActions = [
    {
      icon: Users,
      label: "Manage Students",
      description: "View and manage student records",
      onClick: () => navigate('/admin/manage-students'),
      variant: "default" as const
    },
    {
      icon: GraduationCap,
      label: "Manage Teachers",
      description: "View and manage faculty members",
      onClick: () => navigate('/admin/manage-teachers'),
      variant: "default" as const
    },
    {
      icon: Shield,
      label: "Admin ID",
      description: "View your administrative credentials",
      onClick: () => navigate('/admin/id'),
      variant: "outline" as const
    },
    {
      icon: Edit,
      label: "Edit Profile",
      description: "Update your personal information",
      onClick: onEditProfile,
      variant: "outline" as const
    }
  ]

  const secondaryActions = [
    {
      icon: BarChart3,
      label: "Analytics",
      description: "View system analytics and reports",
      onClick: () => toast({ title: "Analytics", description: "Analytics dashboard coming soon!" })
    },
    {
      icon: Settings,
      label: "System Settings",
      description: "Configure system preferences",
      onClick: () => toast({ title: "Settings", description: "System settings panel coming soon!" })
    },
    {
      icon: FileText,
      label: "Reports",
      description: "Generate administrative reports",
      onClick: () => toast({ title: "Reports", description: "Report generation coming soon!" })
    },
    {
      icon: Database,
      label: "Backup",
      description: "Manage system backups",
      onClick: () => toast({ title: "Backup", description: "Backup management coming soon!" })
    },
    {
      icon: Bell,
      label: "Notifications",
      description: "Manage system notifications",
      onClick: () => toast({ title: "Notifications", description: "Notification center coming soon!" })
    }
  ]

  return (
    <div className="space-y-6">
      {/* Primary Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">Quick Actions</CardTitle>
          <CardDescription className="hidden sm:block">
            Access administrative tools quickly
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 grid-cols-2 lg:grid-cols-4">
            {primaryActions.map((action, index) => (
              <Button
                key={index}
                variant={action.variant}
                className="h-auto p-3 flex flex-col gap-2 text-xs sm:text-sm"
                onClick={action.onClick}
              >
                <action.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="text-center leading-tight">{action.label}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Secondary Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">Administrative Tools</CardTitle>
          <CardDescription className="hidden sm:block">
            Advanced administrative functions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {secondaryActions.map((action, index) => (
              <Button
                key={index}
                variant="ghost"
                className="h-auto p-4 flex items-start gap-3 text-left justify-start"
                onClick={action.onClick}
              >
                <action.icon className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm">{action.label}</div>
                  <div className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    {action.description}
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}