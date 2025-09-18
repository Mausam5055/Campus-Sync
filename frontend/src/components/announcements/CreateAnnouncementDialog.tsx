import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Upload, X, FileText, File, Users, GraduationCap, Shield } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

interface CreateAnnouncementDialogProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (announcement: any) => void
}

export const CreateAnnouncementDialog: React.FC<CreateAnnouncementDialogProps> = ({
  isOpen,
  onClose,
  onSubmit
}) => {
  const { user } = useAuth()
  const userRole = user?.role || 'student'
  
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    priority: 'medium',
    category: '',
    targetAudience: userRole === 'admin' ? 'all' : 'students',
    attachments: [] as File[]
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title.trim() || !formData.content.trim()) return

    const attachments = formData.attachments.map(file => ({
      name: file.name,
      size: `${(file.size / 1024).toFixed(0)} KB`,
      type: file.name.split('.').pop() || 'file'
    }))

    onSubmit({
      ...formData,
      attachments
    })

    // Reset form
    setFormData({
      title: '',
      content: '',
      priority: 'medium',
      category: '',
      targetAudience: userRole === 'admin' ? 'all' : 'students',
      attachments: []
    })
    onClose()
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setFormData(prev => ({
      ...prev,
      attachments: [...prev.attachments, ...files]
    }))
  }

  const removeFile = (index: number) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }))
  }

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase()
    if (extension === 'pdf') return <FileText className="h-4 w-4" />
    return <File className="h-4 w-4" />
  }

  const getAudienceOptions = () => {
    if (userRole === 'admin') {
      return [
        { value: 'all', label: 'All (Students & Teachers)', icon: Shield },
        { value: 'students', label: 'Students Only', icon: GraduationCap },
        { value: 'teachers', label: 'Teachers Only', icon: Users }
      ]
    } else if (userRole === 'teacher') {
      return [
        { value: 'students', label: 'Students Only', icon: GraduationCap }
      ]
    }
    return []
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-2xl font-bold tracking-tight">Create New Announcement</DialogTitle>
          <p className="text-sm text-muted-foreground">
            Share important information with your {userRole === 'admin' ? 'institution community' : 'students'}
          </p>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-3">
            <Label htmlFor="title" className="text-base font-semibold">Announcement Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Enter a clear and descriptive title"
              className="h-12 text-base"
              required
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="space-y-3">
              <Label htmlFor="priority" className="text-base font-semibold">Priority Level</Label>
              <Select 
                value={formData.priority} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, priority: value }))}
              >
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">🟢 Low Priority</SelectItem>
                  <SelectItem value="medium">🟡 Medium Priority</SelectItem>
                  <SelectItem value="high">🔴 High Priority</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label htmlFor="category" className="text-base font-semibold">Category</Label>
              <Select 
                value={formData.category} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
              >
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Academic">📚 Academic</SelectItem>
                  <SelectItem value="General">📢 General</SelectItem>
                  <SelectItem value="Schedule">📅 Schedule</SelectItem>
                  <SelectItem value="Infrastructure">🏢 Infrastructure</SelectItem>
                  <SelectItem value="Opportunities">🎯 Opportunities</SelectItem>
                  <SelectItem value="Events">🎉 Events</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {(userRole === 'admin' || userRole === 'teacher') && (
              <div className="space-y-3">
                <Label htmlFor="audience" className="text-base font-semibold">Target Audience</Label>
                <Select 
                  value={formData.targetAudience} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, targetAudience: value }))}
                >
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select audience" />
                  </SelectTrigger>
                  <SelectContent>
                    {getAudienceOptions().map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        <div className="flex items-center gap-2">
                          <option.icon className="h-4 w-4" />
                          {option.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          <div className="space-y-3">
            <Label htmlFor="content" className="text-base font-semibold">Announcement Content *</Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
              placeholder="Write your announcement content here. Be clear and concise..."
              rows={6}
              className="resize-none text-base leading-relaxed"
              required
            />
            <p className="text-xs text-muted-foreground">
              Characters: {formData.content.length} • Aim for clear and concise messaging
            </p>
          </div>

          <div className="space-y-4">
            <Label className="text-base font-semibold">Attachments (Optional)</Label>
            <div className="border-2 border-dashed border-primary/20 hover:border-primary/40 rounded-xl p-8 transition-colors bg-muted/20 hover:bg-muted/30">
              <div className="text-center">
                <div className="p-3 rounded-full bg-primary/10 w-fit mx-auto mb-4">
                  <Upload className="h-6 w-6 text-primary" />
                </div>
                <div className="text-base font-medium text-foreground mb-2">
                  Upload supporting documents
                </div>
                <div className="text-sm text-muted-foreground mb-4">
                  Drag & drop files here or click to browse
                </div>
                <input
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                  accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.ppt,.pptx"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById('file-upload')?.click()}
                  className="hover:bg-primary hover:text-primary-foreground"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Choose Files
                </Button>
                <p className="text-xs text-muted-foreground mt-3">
                  Supported: PDF, DOC, DOCX, TXT, JPG, PNG, PPT (Max 10MB each)
                </p>
              </div>
            </div>

            {formData.attachments.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-semibold">Selected Files</Label>
                  <Badge variant="secondary">{formData.attachments.length} files</Badge>
                </div>
                <div className="space-y-3">
                  {formData.attachments.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-background border border-border rounded-xl shadow-sm">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10">
                          {getFileIcon(file.name)}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-semibold text-foreground truncate">{file.name}</p>
                          <p className="text-xs text-muted-foreground font-medium">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(index)}
                        className="hover:bg-destructive/10 hover:text-destructive"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <DialogFooter className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-border/50">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose} 
              className="w-full sm:w-auto h-12 font-medium"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="w-full sm:w-auto h-12 font-medium bg-primary hover:bg-primary/90"
              disabled={!formData.title.trim() || !formData.content.trim()}
            >
              <span className="mr-2">📢</span>
              Publish Announcement
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}