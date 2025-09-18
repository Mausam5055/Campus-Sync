import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Camera, Upload, X, Crop } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { UserData } from "@/hooks/useUserData"
import { PhotoCropDialog } from "./PhotoCropDialog"
import { useIsMobile } from "@/hooks/use-mobile"

interface EditProfileDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  student: UserData
  onSave: (updatedStudent: Partial<UserData>) => void
}

export function EditProfileDialog({ open, onOpenChange, student, onSave }: EditProfileDialogProps) {
  const [formData, setFormData] = useState(student)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [rawImageForCrop, setRawImageForCrop] = useState<string | null>(null)
  const [showCropDialog, setShowCropDialog] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const { toast } = useToast()
  const isMobile = useIsMobile()

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast({
          title: "File too large",
          description: "Please select an image smaller than 5MB",
          variant: "destructive"
        })
        return
      }

      const reader = new FileReader()
      reader.onloadend = () => {
        setRawImageForCrop(reader.result as string)
        setShowCropDialog(true)
      }
      reader.readAsDataURL(file)
    }
    // Reset input value to allow same file selection
    event.target.value = ''
  }

  const handleCropComplete = (croppedImageUrl: string) => {
    setPreviewImage(croppedImageUrl)
    setRawImageForCrop(null)
  }

  const handleRemoveImage = () => {
    setPreviewImage(null)
    setRawImageForCrop(null)
  }

  const handleSave = async () => {
    setIsUploading(true)
    try {
      const updatedData = {
        ...formData,
        avatar: previewImage || formData.avatar
      }
      onSave(updatedData)
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated"
      })
      onOpenChange(false)
    } catch (error) {
      toast({
        title: "Update failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsUploading(false)
    }
  }

  const currentAvatar = previewImage || formData.avatar

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={`${isMobile ? 'sm:max-w-[95vw] max-h-[95vh]' : 'sm:max-w-[600px] max-h-[90vh]'} overflow-y-auto`}>
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Update your personal information and profile picture
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Profile Picture Section */}
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <Avatar className="h-24 w-24">
                <AvatarImage src={currentAvatar} alt="Profile" />
                <AvatarFallback className="text-lg">
                  {formData.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              {previewImage && (
                <Button
                  variant="outline"
                  size="sm"
                  className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                  onClick={handleRemoveImage}
                >
                  <X className="h-3 w-3" />
                </Button>
              )}
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" size="sm" asChild>
                <label className="cursor-pointer">
                  <Camera className="mr-2 h-4 w-4" />
                  <span className="hidden sm:inline">Upload Photo</span>
                  <span className="sm:hidden">Upload</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </Button>
            </div>
          </div>

          {/* Form Tabs */}
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="personal">Personal</TabsTrigger>
              <TabsTrigger value="academic">Academic</TabsTrigger>
            </TabsList>
            
            <TabsContent value="personal" className="space-y-4 mt-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Enter your email"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="Enter your phone number"
                  />
                </div>
                
                
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="Enter your address"
                    rows={3}
                  />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="academic" className="space-y-4 mt-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="course">Course</Label>
                  <Input
                    id="course"
                    value={formData.course}
                    onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                    placeholder="Enter your course"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="year">Year</Label>
                  <Input
                    id="year"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    placeholder="Enter your year"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="semester">Semester</Label>
                  <Input
                    id="semester"
                    value={formData.semester}
                    onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
                    placeholder="Enter your semester"
                  />
                </div>
                
                
                <div className="space-y-2">
                  <Label htmlFor="cgpa">CGPA</Label>
                  <Input
                    id="cgpa"
                    value={formData.cgpa}
                    onChange={(e) => setFormData({ ...formData, cgpa: e.target.value })}
                    placeholder="Enter your CGPA"
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="w-full sm:w-auto">
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isUploading} className="w-full sm:w-auto">
            {isUploading ? (
              <>
                <Upload className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>

      {/* Photo Crop Dialog */}
      {rawImageForCrop && (
        <PhotoCropDialog
          open={showCropDialog}
          onOpenChange={setShowCropDialog}
          imageSrc={rawImageForCrop}
          onCropComplete={handleCropComplete}
        />
      )}
    </Dialog>
  )
}