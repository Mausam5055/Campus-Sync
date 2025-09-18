import { useState } from "react"
import { ProfileSkeleton } from "@/components/ui/profile-skeleton"
import { useToast } from "@/hooks/use-toast"
import { useUserData } from "@/hooks/useUserData"
import { usePageLoading } from "@/hooks/use-page-loading"
import { EditProfileDialog } from "@/components/profile/EditProfileDialog"
import { SEO } from "@/components/SEO"
import { AdminProfileOverview } from "@/components/admin/AdminProfileOverview"
import { AdminProfileStats } from "@/components/admin/AdminProfileStats"
import { AdminProfileActions } from "@/components/admin/AdminProfileActions"

export default function AdminProfile() {
  const isLoading = usePageLoading()
  const { toast } = useToast()
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const { userData, updateUserData } = useUserData()

  const handleProfileUpdate = (updatedData: any) => {
    updateUserData(updatedData)
    toast({ 
      title: "Profile Updated", 
      description: "Your profile has been updated successfully." 
    })
  }

  if (isLoading) return <ProfileSkeleton />

  return (
    <div className="space-y-6">
      <SEO 
        title="Admin Profile - CampusSync" 
        description="Comprehensive administrative profile management and system overview" 
      />
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Administrative Profile
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base hidden sm:block">
            Comprehensive system overview and profile management
          </p>
        </div>
      </div>

      {/* System Statistics */}
      <AdminProfileStats />

      {/* Profile Overview */}
      <AdminProfileOverview 
        userData={userData} 
        onEditProfile={() => setEditDialogOpen(true)} 
      />

      {/* Administrative Actions */}
      <AdminProfileActions onEditProfile={() => setEditDialogOpen(true)} />

      {/* Edit Profile Dialog */}
      <EditProfileDialog 
        open={editDialogOpen} 
        onOpenChange={setEditDialogOpen} 
        student={userData} 
        onSave={handleProfileUpdate} 
      />
    </div>
  )
}
