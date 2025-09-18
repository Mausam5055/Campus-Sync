import React, { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { X } from 'lucide-react'
import { useAdminData, Subject } from '@/hooks/useAdminData'
import { useToast } from '@/hooks/use-toast'

interface CreateSubjectDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  editSubject?: Subject | null
}

export const CreateSubjectDialog: React.FC<CreateSubjectDialogProps> = ({
  open,
  onOpenChange,
  editSubject
}) => {
  const { branches, subjects, addSubject, updateSubject } = useAdminData()
  const { toast } = useToast()
  
  const [formData, setFormData] = useState({
    name: editSubject?.name || '',
    code: editSubject?.code || '',
    credits: editSubject?.credits || 3,
    semester: editSubject?.semester || 1,
    branch: editSubject?.branch || '',
    description: editSubject?.description || '',
    type: editSubject?.type || 'Core' as 'Core' | 'Elective' | 'General',
    status: editSubject?.status || 'Active' as 'Active' | 'Inactive' | 'Draft',
    prerequisites: editSubject?.prerequisites || [] as string[]
  })
  
  const [newPrerequisite, setNewPrerequisite] = useState('')

  React.useEffect(() => {
    if (editSubject) {
      setFormData({
        name: editSubject.name,
        code: editSubject.code,
        credits: editSubject.credits,
        semester: editSubject.semester,
        branch: editSubject.branch,
        description: editSubject.description,
        type: editSubject.type,
        status: editSubject.status,
        prerequisites: editSubject.prerequisites
      })
    } else {
      setFormData({
        name: '',
        code: '',
        credits: 3,
        semester: 1,
        branch: '',
        description: '',
        type: 'Core',
        status: 'Active',
        prerequisites: []
      })
    }
  }, [editSubject, open])

  const availablePrerequisites = subjects.filter(s => 
    s.semester < formData.semester && 
    s.branch === formData.branch &&
    !formData.prerequisites.includes(s.code) &&
    s.id !== editSubject?.id
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name || !formData.code || !formData.branch) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      })
      return
    }

    // Check for duplicate code
    const existingSubject = subjects.find(s => 
      s.code === formData.code && s.id !== editSubject?.id
    )
    if (existingSubject) {
      toast({
        title: "Error",
        description: "Subject code already exists",
        variant: "destructive"
      })
      return
    }

    if (editSubject) {
      updateSubject(editSubject.id, formData)
      toast({
        title: "Success",
        description: "Subject updated successfully"
      })
    } else {
      addSubject(formData)
      toast({
        title: "Success",
        description: "Subject created successfully"
      })
    }
    
    onOpenChange(false)
  }

  const addPrerequisite = () => {
    if (newPrerequisite && !formData.prerequisites.includes(newPrerequisite)) {
      setFormData(prev => ({
        ...prev,
        prerequisites: [...prev.prerequisites, newPrerequisite]
      }))
      setNewPrerequisite('')
    }
  }

  const removePrerequisite = (code: string) => {
    setFormData(prev => ({
      ...prev,
      prerequisites: prev.prerequisites.filter(p => p !== code)
    }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>
            {editSubject ? 'Edit Subject' : 'Create New Subject'}
          </DialogTitle>
          <DialogDescription>
            {editSubject ? 'Update subject information' : 'Add a new subject to the curriculum'}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Subject Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="e.g., Data Structures"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="code">Subject Code *</Label>
              <Input
                id="code"
                value={formData.code}
                onChange={(e) => setFormData(prev => ({ ...prev, code: e.target.value.toUpperCase() }))}
                placeholder="e.g., CS102"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="branch">Branch *</Label>
              <Select value={formData.branch} onValueChange={(value) => 
                setFormData(prev => ({ ...prev, branch: value, prerequisites: [] }))
              }>
                <SelectTrigger>
                  <SelectValue placeholder="Select branch" />
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
            
            <div className="space-y-2">
              <Label htmlFor="semester">Semester</Label>
              <Select value={formData.semester.toString()} onValueChange={(value) => 
                setFormData(prev => ({ ...prev, semester: parseInt(value), prerequisites: [] }))
              }>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[1,2,3,4,5,6,7,8].map(sem => (
                    <SelectItem key={sem} value={sem.toString()}>
                      Semester {sem}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="credits">Credits</Label>
              <Input
                id="credits"
                type="number"
                min="1"
                max="6"
                value={formData.credits}
                onChange={(e) => setFormData(prev => ({ ...prev, credits: parseInt(e.target.value) || 1 }))}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">Subject Type</Label>
              <Select value={formData.type} onValueChange={(value: 'Core' | 'Elective' | 'General') => 
                setFormData(prev => ({ ...prev, type: value }))
              }>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Core">Core</SelectItem>
                  <SelectItem value="Elective">Elective</SelectItem>
                  <SelectItem value="General">General</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value: 'Active' | 'Inactive' | 'Draft') => 
                setFormData(prev => ({ ...prev, status: value }))
              }>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Draft">Draft</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Subject description and learning objectives"
              rows={3}
            />
          </div>

          <div className="space-y-4">
            <Label>Prerequisites</Label>
            {formData.prerequisites.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.prerequisites.map(code => {
                  const subject = subjects.find(s => s.code === code)
                  return (
                    <Badge key={code} variant="secondary" className="flex items-center gap-1">
                      {subject?.name || code}
                      <X 
                        className="h-3 w-3 cursor-pointer" 
                        onClick={() => removePrerequisite(code)}
                      />
                    </Badge>
                  )
                })}
              </div>
            )}
            
            {availablePrerequisites.length > 0 && (
              <div className="flex gap-2">
                <Select value={newPrerequisite} onValueChange={setNewPrerequisite}>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Add prerequisite" />
                  </SelectTrigger>
                  <SelectContent>
                    {availablePrerequisites.map(subject => (
                      <SelectItem key={subject.id} value={subject.code}>
                        {subject.name} ({subject.code})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button type="button" onClick={addPrerequisite} disabled={!newPrerequisite}>
                  Add
                </Button>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {editSubject ? 'Update Subject' : 'Create Subject'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}