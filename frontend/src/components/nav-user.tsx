import {
  BadgeCheck,
  ChevronRight,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles,
  FileText,
  User,
  Users,
  Upload,
  IdCard,
  UserCog,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { useNavigate } from "react-router-dom"
import { useAuth } from "@/contexts/AuthContext"
import { useUserData } from "@/hooks/useUserData"

export function NavUser({
  user,
}: {
  user: {
    name: string
    email: string
    avatar: string
  }
}) {
  const { isMobile } = useSidebar()
  const navigate = useNavigate()
  const { logout, user: authUser } = useAuth()
  const { userData } = useUserData()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={userData.avatar || user.avatar} alt={userData.name || user.name} />
                <AvatarFallback className="rounded-lg">
                  {(userData.name || user.name) ? (userData.name || user.name).split(' ').map(n => n[0]).join('').toUpperCase() : <User className="h-4 w-4" />}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{userData.name || user.name || "Set your name"}</span>
                <span className="truncate text-xs">{userData.email || user.email || "Set your email"}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={userData.avatar || user.avatar} alt={userData.name || user.name} />
                  <AvatarFallback className="rounded-lg">
                    {(userData.name || user.name) ? (userData.name || user.name).split(' ').map(n => n[0]).join('').toUpperCase() : <User className="h-4 w-4" />}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{userData.name || user.name || "Set your name"}</span>
                  <span className="truncate text-xs">{userData.email || user.email || "Set your email"}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {(() => {
                const role = authUser?.role

                const studentItems = [
                  { to: '/student-profile', label: 'Student Profile', icon: User },
                  { to: '/academic-progress', label: 'Academic Progress', icon: Sparkles },
                  { to: '/view-marks', label: 'View Marks', icon: FileText },
                  { to: '/student-id', label: 'Student ID', icon: BadgeCheck },
                  { to: '/billing-payments', label: 'Billing & Payments', icon: CreditCard },
                ] as const

                const teacherItems = [
                  { to: '/teacher/profile', label: 'Teacher Profile', icon: User },
                  { to: '/teacher/students-details', label: 'Students Details', icon: Users },
                  { to: '/teacher/upload-marks', label: 'Upload Marks', icon: Upload },
                  { to: '/teacher/id', label: 'Teacher ID', icon: IdCard },
                  { to: '/teacher/billing', label: 'Billing & Payments', icon: CreditCard },
                ] as const

                const adminItems = [
                  { to: '/admin/profile', label: 'Admin Profile', icon: UserCog },
                  { to: '/admin/manage-students', label: 'Manage Students', icon: Users },
                  { to: '/admin/manage-teachers', label: 'Manage Teachers', icon: Users },
                  { to: '/admin/id', label: 'Admin ID', icon: IdCard },
                  { to: '/admin/billing', label: 'Billing & Payments', icon: CreditCard },
                ] as const

                const items = role === 'teacher' ? teacherItems : role === 'admin' ? adminItems : studentItems

                return items.map((item) => (
                  <DropdownMenuItem key={item.to} onClick={() => navigate(item.to)}>
                    <item.icon />
                    {item.label}
                    <ChevronRight className="ml-auto h-4 w-4" />
                  </DropdownMenuItem>
                ))
              })()}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}