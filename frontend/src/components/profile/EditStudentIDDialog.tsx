import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { StudentIDData } from "@/hooks/useStudentIDData"

interface EditStudentIDDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  studentIDData: StudentIDData
  onSave: (updatedData: Partial<StudentIDData>) => void
}

export function EditStudentIDDialog({ open, onOpenChange, studentIDData, onSave }: EditStudentIDDialogProps) {
  const [formData, setFormData] = useState(studentIDData)
  const [isUploading, setIsUploading] = useState(false)
  const { toast } = useToast()

  const handleSave = async () => {
    setIsUploading(true)
    try {
      onSave(formData)
      toast({
        title: "Student ID updated",
        description: "Your Student ID information has been successfully updated"
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Student ID Information</DialogTitle>
          <DialogDescription>
            Update your Student ID card specific information
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="section">Section</Label>
              <Input
                id="section"
                value={formData.section}
                onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                placeholder="Enter your section"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="rollNumber">Roll Number</Label>
              <Input
                id="rollNumber"
                value={formData.rollNumber}
                onChange={(e) => setFormData({ ...formData, rollNumber: e.target.value })}
                placeholder="Enter your roll number"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="admissionYear">Admission Year</Label>
              <Input
                id="admissionYear"
                value={formData.admissionYear}
                onChange={(e) => setFormData({ ...formData, admissionYear: e.target.value })}
                placeholder="Enter admission year"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="validUntil">Valid Until</Label>
              <Input
                id="validUntil"
                value={formData.validUntil}
                onChange={(e) => setFormData({ ...formData, validUntil: e.target.value })}
                placeholder="Enter validity date"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="bloodGroup">Blood Group</Label>
              <Input
                id="bloodGroup"
                value={formData.bloodGroup}
                onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                placeholder="Enter your blood group"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="emergencyContact">Emergency Contact</Label>
              <Input
                id="emergencyContact"
                value={formData.emergencyContact}
                onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
                placeholder="Enter emergency contact"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="hostelBlock">Hostel Block</Label>
              <Input
                id="hostelBlock"
                value={formData.hostelBlock}
                onChange={(e) => setFormData({ ...formData, hostelBlock: e.target.value })}
                placeholder="Enter hostel block"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="roomNumber">Room Number</Label>
              <Input
                id="roomNumber"
                value={formData.roomNumber}
                onChange={(e) => setFormData({ ...formData, roomNumber: e.target.value })}
                placeholder="Enter room number"
              />
            </div>
            
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="libraryId">Library ID</Label>
              <Input
                id="libraryId"
                value={formData.libraryId}
                onChange={(e) => setFormData({ ...formData, libraryId: e.target.value })}
                placeholder="Enter library ID"
              />
            </div>
          </div>
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
    </Dialog>
  )
}