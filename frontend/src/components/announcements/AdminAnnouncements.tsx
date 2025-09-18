import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { AnnouncementCard } from './AnnouncementCard'
import { CreateAnnouncementDialog } from './CreateAnnouncementDialog'
import { useIsMobile } from '@/hooks/use-mobile'
import { Plus, Users, School, TrendingUp, Bell, FileText, Calendar, BarChart3 } from 'lucide-react'

// Mock data for admin announcements
const mockAdminAnnouncements = [
  {
    id: '1',
    title: 'University Rankings Update',
    content: 'We are proud to announce that our university has moved up 5 positions in the national rankings.',
    author: 'Administration',
    priority: 'high' as const,
    category: 'General',
    date: new Date('2024-01-15'),
    attachments: [
      { name: 'Rankings_Report_2024.pdf', size: '1.2 MB', type: 'pdf' }
    ]
  },
  {
    id: '2',
    title: 'New Campus Facilities Opening',
    content: 'The new sports complex and library extension will be opened next month. Student access will begin from February 1st.',
    author: 'Facilities Management',
    priority: 'medium' as const,
    category: 'Infrastructure',
    date: new Date('2024-01-12'),
    attachments: []
  }
]

export const AdminAnnouncements: React.FC = () => {
  const [announcements, setAnnouncements] = useState(mockAdminAnnouncements)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const isMobile = useIsMobile()

  const handleCreateAnnouncement = (newAnnouncement: any) => {
    const announcement = {
      ...newAnnouncement,
      id: Date.now().toString(),
      author: 'Administration',
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
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground tracking-tight">🛡️ Admin Announcements</h1>
        </div>
        <Button 
          onClick={() => setIsCreateDialogOpen(true)} 
          className="w-full sm:w-auto h-10 sm:h-12 text-sm sm:text-base font-semibold bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all"
        >
          <Plus className="h-5 w-5 mr-2" />
          Create New Announcement
        </Button>
      </div>

      {/* Admin Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        <Card>
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-muted-foreground">Total Students</p>
                <p className="text-lg sm:text-2xl font-bold">2,847</p>
              </div>
              <Users className="h-6 w-6 sm:h-8 sm:w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-muted-foreground">Total Teachers</p>
                <p className="text-lg sm:text-2xl font-bold">184</p>
              </div>
              <School className="h-6 w-6 sm:h-8 sm:w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-muted-foreground">Active Announcements</p>
                <p className="text-lg sm:text-2xl font-bold">{announcements.length}</p>
              </div>
              <Bell className="h-6 w-6 sm:h-8 sm:w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-muted-foreground">Engagement Rate</p>
                <p className="text-lg sm:text-2xl font-bold">89%</p>
              </div>
              <TrendingUp className="h-6 w-6 sm:h-8 sm:w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            {!isMobile && "All Announcements"}
          </TabsTrigger>
          <TabsTrigger value="drafts" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            {!isMobile && "Drafts"}
          </TabsTrigger>
          <TabsTrigger value="scheduled" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            {!isMobile && "Scheduled"}
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            {!isMobile && "Analytics"}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-4 mt-6">
          {announcements.length > 0 ? (
            announcements.map((announcement) => (
              <div key={announcement.id} className="relative group">
                <AnnouncementCard announcement={announcement} />
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDeleteAnnouncement(announcement.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground mb-4">No announcements found.</p>
                <Button onClick={() => setIsCreateDialogOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Announcement
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="drafts" className="mt-6">
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground">No draft announcements.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scheduled" className="mt-6">
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground">No scheduled announcements.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Announcement Views</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Analytics data will be displayed here.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Engagement Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Engagement metrics will be displayed here.</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <CreateAnnouncementDialog
        isOpen={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        onSubmit={handleCreateAnnouncement}
      />
    </div>
  )
}