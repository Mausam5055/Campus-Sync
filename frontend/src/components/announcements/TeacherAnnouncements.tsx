import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { AnnouncementCard } from './AnnouncementCard'
import { CreateAnnouncementDialog } from './CreateAnnouncementDialog'
import { Plus, Edit2, Trash2 } from 'lucide-react'

// Mock data for teacher's announcements
const mockTeacherAnnouncements = [
  {
    id: '1',
    title: 'Assignment Submission Reminder',
    content: 'Reminder: Data Structures assignment is due this Friday. Please submit via the portal.',
    author: 'Prof. John Smith',
    priority: 'medium' as const,
    category: 'Academic',
    date: new Date('2024-01-14'),
    attachments: []
  },
  {
    id: '2',
    title: 'Class Rescheduled - Algorithm Design',
    content: 'Tomorrow\'s Algorithm Design class has been moved to Friday 2 PM due to a faculty meeting.',
    author: 'Prof. John Smith',
    priority: 'high' as const,
    category: 'Schedule',
    date: new Date('2024-01-13'),
    attachments: []
  }
]

export const TeacherAnnouncements: React.FC = () => {
  const [announcements, setAnnouncements] = useState(mockTeacherAnnouncements)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  const handleCreateAnnouncement = (newAnnouncement: any) => {
    const announcement = {
      ...newAnnouncement,
      id: Date.now().toString(),
      author: 'Prof. John Smith',
      targetAudience: 'students', // Teachers can only target students
      date: new Date()
    }
    setAnnouncements([announcement, ...announcements])
  }

  const handleDeleteAnnouncement = (id: string) => {
    setAnnouncements(announcements.filter(a => a.id !== id))
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground tracking-tight">📢 My Announcements</h1>
        </div>
        <Button 
          onClick={() => setIsCreateDialogOpen(true)} 
          className="w-full sm:w-auto h-10 sm:h-12 text-sm sm:text-base font-semibold bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all"
        >
          <Plus className="h-5 w-5 mr-2" />
          Create New Announcement
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        <Card>
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-xs sm:text-sm text-muted-foreground">Total Announcements</span>
            </div>
            <p className="text-lg sm:text-2xl font-bold mt-1">{announcements.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span className="text-xs sm:text-sm text-muted-foreground">High Priority</span>
            </div>
            <p className="text-lg sm:text-2xl font-bold mt-1">
              {announcements.filter(a => a.priority === 'high').length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-xs sm:text-sm text-muted-foreground">This Week</span>
            </div>
            <p className="text-lg sm:text-2xl font-bold mt-1">
              {announcements.filter(a => {
                const weekAgo = new Date()
                weekAgo.setDate(weekAgo.getDate() - 7)
                return a.date > weekAgo
              }).length}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Announcements List */}
      <div className="space-y-4">
        {announcements.length > 0 ? (
          announcements.map((announcement) => (
            <div key={announcement.id} className="relative group">
              <AnnouncementCard announcement={announcement} />
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                <Button variant="outline" size="sm">
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleDeleteAnnouncement(announcement.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))
        ) : (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground mb-4">No announcements created yet.</p>
              <Button onClick={() => setIsCreateDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Announcement
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      <CreateAnnouncementDialog
        isOpen={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        onSubmit={handleCreateAnnouncement}
      />
    </div>
  )
}