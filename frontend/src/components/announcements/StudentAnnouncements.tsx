import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { AnnouncementCard } from './AnnouncementCard'
import { Search, Filter, SortDesc } from 'lucide-react'

// Mock data for announcements
const mockAnnouncements = [
  {
    id: '1',
    title: 'Mid-term Examination Schedule Released',
    content: 'The mid-term examination schedule for all branches has been finalized. Please check your respective timetables.',
    author: 'Academic Office',
    priority: 'high' as const,
    category: 'Academic',
    date: new Date('2024-01-15'),
    attachments: [
      { name: 'Exam_Schedule_2024.pdf', size: '245 KB', type: 'pdf' }
    ]
  },
  {
    id: '2',
    title: 'Library Timing Changes',
    content: 'Due to maintenance work, the library will remain closed on weekends for the next two weeks.',
    author: 'Library Department',
    priority: 'medium' as const,
    category: 'General',
    date: new Date('2024-01-12'),
    attachments: []
  },
  {
    id: '3',
    title: 'New Research Scholarship Applications Open',
    content: 'Applications for research scholarships are now open for final year students. Apply before the deadline.',
    author: 'Research Department',
    priority: 'high' as const,
    category: 'Opportunities',
    date: new Date('2024-01-10'),
    attachments: [
      { name: 'Scholarship_Guidelines.pdf', size: '180 KB', type: 'pdf' },
      { name: 'Application_Form.docx', size: '95 KB', type: 'doc' }
    ]
  }
]

export const StudentAnnouncements: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [sortBy, setSortBy] = useState('date')

  const filteredAnnouncements = mockAnnouncements
    .filter(announcement => {
      const matchesSearch = announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          announcement.content.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = categoryFilter === 'all' || announcement.category === categoryFilter
      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      if (sortBy === 'date') return b.date.getTime() - a.date.getTime()
      if (sortBy === 'priority') {
        const priorityOrder = { high: 3, medium: 2, low: 1 }
        return priorityOrder[b.priority] - priorityOrder[a.priority]
      }
      return 0
    })

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground tracking-tight">📢 Announcements</h1>
        </div>
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <Badge variant="secondary" className="text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-1.5 bg-primary/10 text-primary font-medium">
            {filteredAnnouncements.length} announcements
          </Badge>
          {filteredAnnouncements.filter(a => a.priority === 'high').length > 0 && (
            <Badge variant="destructive" className="text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-1.5 animate-pulse">
              {filteredAnnouncements.filter(a => a.priority === 'high').length} urgent
            </Badge>
          )}
        </div>
      </div>

      {/* Enhanced Filters and Search */}
      <Card className="border-primary/20 shadow-lg">
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-primary h-4 w-4 sm:h-5 sm:w-5" />
              <Input
                placeholder="Search announcements..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 sm:pl-12 h-10 sm:h-12 text-sm sm:text-base border-primary/20 focus:border-primary"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full sm:w-[160px] lg:w-[180px] h-10 sm:h-12 border-primary/20">
                  <Filter className="h-4 w-4 mr-2 text-primary" />
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">📂 All Categories</SelectItem>
                  <SelectItem value="Academic">📚 Academic</SelectItem>
                  <SelectItem value="General">📢 General</SelectItem>
                  <SelectItem value="Schedule">📅 Schedule</SelectItem>
                  <SelectItem value="Opportunities">🎯 Opportunities</SelectItem>
                  <SelectItem value="Events">🎉 Events</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-[140px] lg:w-[160px] h-10 sm:h-12 border-primary/20">
                  <SortDesc className="h-4 w-4 mr-2 text-primary" />
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">🕐 Latest First</SelectItem>
                  <SelectItem value="priority">⚡ By Priority</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Announcements List */}
      <div className="space-y-6">
        {filteredAnnouncements.length > 0 ? (
          <div className="space-y-4">
            {filteredAnnouncements.map((announcement, index) => (
              <div 
                key={announcement.id} 
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <AnnouncementCard announcement={announcement} />
              </div>
            ))}
          </div>
        ) : (
          <Card className="border-dashed border-2 border-muted-foreground/25">
            <CardContent className="p-12 text-center">
              <div className="space-y-4">
                <div className="p-4 rounded-full bg-muted/50 w-fit mx-auto">
                  <Search className="h-8 w-8 text-muted-foreground" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-foreground">No announcements found</h3>
                  <p className="text-muted-foreground">
                    {searchTerm || categoryFilter !== 'all' 
                      ? "Try adjusting your search or filter criteria" 
                      : "No announcements have been posted yet"}
                  </p>
                </div>
                {(searchTerm || categoryFilter !== 'all') && (
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setSearchTerm('')
                      setCategoryFilter('all')
                    }}
                    className="mt-4"
                  >
                    Clear Filters
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}