import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { QRCodeModal } from "@/components/ui/qr-code-modal"
import { Download, QrCode, Shield, Calendar, IdCard } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useUserData } from "@/hooks/useUserData"
import { ProfileSkeleton } from "@/components/ui/profile-skeleton"
import { usePageLoading } from "@/hooks/use-page-loading"
import { SEO } from "@/components/SEO"
import { useAdminIDData } from "@/hooks/useAdminIDData"

export default function AdminID() {
  const isLoading = usePageLoading()
  const { toast } = useToast()
  const [qrModalOpen, setQrModalOpen] = useState(false)
  const { userData } = useUserData()
  const { idData, updateIDData } = useAdminIDData()

  const handleUpdate = (updatedData: any) => {
    updateIDData(updatedData)
    toast({ title: "Admin ID Updated", description: "Your Admin ID information has been updated successfully." })
  }

  if (isLoading) return <ProfileSkeleton />

  const idCardData = {
    name: userData.name || "Admin Jane Doe",
    email: userData.email || "admin@college.edu",
    phone: userData.phone || "+91 98765 43210",
    adminId: idData.adminId || "ADM-2024-001",
    department: idData.department || "Administration",
    validUntil: idData.validUntil || "2028",
    avatar: userData.avatar || "/placeholder.svg",
    bloodGroup: idData.bloodGroup || "B+",
    emergencyContact: idData.emergencyContact || "+91 90000 00000",
    officeRoom: idData.officeRoom || "Admin-Block 101",
  }

  const handleDownloadID = () => {
    toast({ title: "Downloading ID Card", description: "Your admin ID card is being prepared for download." })
    setTimeout(() => toast({ title: "Download Complete", description: "Your admin ID card has been downloaded successfully." }), 1500)
  }

  return (
    <div className="space-y-6">
      <SEO title="Admin ID" description="Your official admin identification" />
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="mobile-heading-large font-bold tracking-tight">Admin ID Card</h1>
          <p className="text-muted-foreground text-sm sm:text-base mobile-hide-description">Your official administrator identification</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="outline" className="flex-1 sm:flex-none" onClick={() => setQrModalOpen(true)}>
            <QrCode className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">QR Code</span>
            <span className="sm:hidden">QR</span>
          </Button>
          <Button className="flex-1 sm:flex-none" onClick={handleDownloadID}>
            <Download className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Download ID</span>
            <span className="sm:hidden">Download</span>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 lg:gap-6 lg:grid-cols-2">
        <Card className="relative overflow-hidden">
          <div className="bg-gradient-to-br from-primary/20 via-primary/10 to-background p-3 sm:p-6">
            <div className="bg-white dark:bg-gray-900 rounded-lg p-4 sm:p-6 shadow-lg">
              <div className="text-center mb-4 sm:mb-6">
                <h3 className="text-base sm:text-lg font-bold text-primary">UNIVERSITY NAME</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">Administrator Identity Card</p>
              </div>

              <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
                <Avatar className="h-16 w-16 sm:h-20 sm:w-20 border-2 border-primary">
                  <AvatarImage src={idCardData.avatar} alt={idCardData.name} />
                  <AvatarFallback className="text-sm sm:text-lg">
                    {idCardData.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <h4 className="font-bold text-base sm:text-lg">{idCardData.name}</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">{idCardData.department}</p>
                  <div className="flex items-center gap-1 sm:gap-2">
                    <Badge variant="secondary" className="text-xs">Admin #{idCardData.adminId}</Badge>
                    <Badge variant="outline" className="text-xs">Valid {idCardData.validUntil}</Badge>
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Office Room:</span><span>{idCardData.officeRoom}</span></div>
              </div>

              <div className="mt-6 pt-4 border-t flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-primary" />
                  <span className="text-xs text-muted-foreground">Authorized ID</span>
                </div>
                <div className="w-8 h-8 bg-primary/10 rounded flex items-center justify-center">
                  <IdCard className="h-4 w-4 text-primary" />
                </div>
              </div>
            </div>
          </div>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-sm">
                <div><label className="text-muted-foreground text-xs">Email</label><p className="text-sm">{idCardData.email}</p></div>
                <div><label className="text-muted-foreground text-xs">Phone</label><p className="text-sm">{idCardData.phone}</p></div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Calendar className="h-5 w-5" /> Card Validity</CardTitle>
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

      <QRCodeModal open={qrModalOpen} onOpenChange={setQrModalOpen} data={idCardData} title="Admin ID" />
    </div>
  )
}
