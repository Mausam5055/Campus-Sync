import React, { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { X, Plus } from 'lucide-react'
import { useAdminData, Teacher } from '@/hooks/useAdminData'
import { useToast } from '@/hooks/use-toast'

interface CreateTeacherDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  editTeacher?: Teacher | null
}

export const CreateTeacherDialog: React.FC<CreateTeacherDialogProps> = ({
  open,
  onOpenChange,
  editTeacher
}) => {
  const { branches, addTeacher, updateTeacher, teachers } = useAdminData()
  const { toast } = useToast()
  
  const [formData, setFormData] = useState({
    name: editTeacher?.name || '',
    email: editTeacher?.email || '',
    contact: editTeacher?.contact || '',
    department: editTeacher?.department || '',
    experience: editTeacher?.experience || 0,
    maxSubjects: editTeacher?.maxSubjects || 3,
    specialization: editTeacher?.specialization || [] as string[],
    qualifications: editTeacher?.qualifications || [] as string[],
    status: editTeacher?.status || 'Active' as 'Active' | 'Inactive'
  })
  
  const [newSpecialization, setNewSpecialization] = useState('')
  const [newQualification, setNewQualification] = useState('')

  React.useEffect(() => {
    if (editTeacher) {
      setFormData({
        name: editTeacher.name,
        email: editTeacher.email,
        contact: editTeacher.contact,
        department: editTeacher.department,
        experience: editTeacher.experience,
        maxSubjects: editTeacher.maxSubjects,
        specialization: editTeacher.specialization,
        qualifications: editTeacher.qualifications,
        status: editTeacher.status
      })
    } else {
      setFormData({
        name: '',
        email: '',
        contact: '',
        department: '',
        experience: 0,
        maxSubjects: 3,
        specialization: [],
        qualifications: [],
        status: 'Active'
      })
    }
  }, [editTeacher, open])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name || !formData.email || !formData.department) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      })
      return
    }

    // Check for duplicate email
    const existingTeacher = teachers.find(t => 
      t.email === formData.email && t.id !== editTeacher?.id
    )
    if (existingTeacher) {
      toast({
        title: "Error",
        description: "Email already exists",
        variant: "destructive"
      })
      return
    }

    if (editTeacher) {
      updateTeacher(editTeacher.id, formData)
      toast({
        title: "Success",
        description: "Teacher updated successfully"
      })
    } else {
      addTeacher(formData)
      toast({
        title: "Success",
        description: "Teacher added successfully"
      })
    }
    
    onOpenChange(false)
  }

  const addSpecialization = () => {
    if (newSpecialization && !formData.specialization.includes(newSpecialization)) {
      setFormData(prev => ({
        ...prev,
        specialization: [...prev.specialization, newSpecialization]
      }))
      setNewSpecialization('')
    }
  }

  const removeSpecialization = (item: string) => {
    setFormData(prev => ({
      ...prev,
      specialization: prev.specialization.filter(s => s !== item)
    }))
  }

  const addQualification = () => {
    if (newQualification && !formData.qualifications.includes(newQualification)) {
      setFormData(prev => ({
        ...prev,
        qualifications: [...prev.qualifications, newQualification]
      }))
      setNewQualification('')
    }
  }

  const removeQualification = (item: string) => {
    setFormData(prev => ({
      ...prev,
      qualifications: prev.qualifications.filter(q => q !== item)
    }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>
            {editTeacher ? 'Edit Teacher' : 'Add New Teacher'}
          </DialogTitle>
          <DialogDescription>
            {editTeacher ? 'Update teacher information' : 'Add a new teacher to the faculty'}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Dr. John Smith"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                placeholder="john.smith@college.edu"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="contact">Contact Number</Label>
              <Input
                id="contact"
                value={formData.contact}
                onChange={(e) => setFormData(prev => ({ ...prev, contact: e.target.value }))}
                placeholder="+1234567890"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="department">Department *</Label>
              <Select value={formData.department} onValueChange={(value) => 
                setFormData(prev => ({ ...prev, department: value }))
              }>
                <SelectTrigger>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  {branches.map(branch => (
                    <SelectItem key={branch.id} value={branch.name}>
                      {branch.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="experience">Experience (Years)</Label>
              <Input
                id="experience"
                type="number"
                min="0"
                max="50"
                value={formData.experience}
                onChange={(e) => setFormData(prev => ({ ...prev, experience: parseInt(e.target.value) || 0 }))}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="maxSubjects">Max Subjects</Label>
              <Input
                id="maxSubjects"
                type="number"
                min="1"
                max="6"
                value={formData.maxSubjects}
                onChange={(e) => setFormData(prev => ({ ...prev, maxSubjects: parseInt(e.target.value) || 1 }))}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value: 'Active' | 'Inactive') => 
                setFormData(prev => ({ ...prev, status: value }))
              }>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            <Label>Specializations</Label>
            {formData.specialization.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.specialization.map(spec => (
                  <Badge key={spec} variant="secondary" className="flex items-center gap-1">
                    {spec}
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => removeSpecialization(spec)}
                    />
                  </Badge>
                ))}
              </div>
            )}
            
            <div className="flex gap-2">
              <Input
                value={newSpecialization}
                onChange={(e) => setNewSpecialization(e.target.value)}
                placeholder="Add specialization"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSpecialization())}
              />
              <Button type="button" onClick={addSpecialization} disabled={!newSpecialization}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <Label>Qualifications</Label>
            {formData.qualifications.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.qualifications.map(qual => (
                  <Badge key={qual} variant="outline" className="flex items-center gap-1">
                    {qual}
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => removeQualification(qual)}
                    />
                  </Badge>
                ))}
              </div>
            )}
            
            <div className="flex gap-2">
              <Input
                value={newQualification}
                onChange={(e) => setNewQualification(e.target.value)}
                placeholder="Add qualification"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addQualification())}
              />
              <Button type="button" onClick={addQualification} disabled={!newQualification}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {editTeacher ? 'Update Teacher' : 'Add Teacher'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}