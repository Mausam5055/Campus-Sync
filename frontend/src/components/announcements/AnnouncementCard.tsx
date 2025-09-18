import React from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, User, Paperclip, Download, FileText, File, Users, GraduationCap, Shield } from 'lucide-react'

interface Attachment {
  name: string
  size: string
  type: string
}

interface Announcement {
  id: string
  title: string
  content: string
  author: string
  priority: 'high' | 'medium' | 'low'
  category: string
  targetAudience?: 'students' | 'teachers' | 'all'
  date: Date
  attachments: Attachment[]
}

interface AnnouncementCardProps {
  announcement: Announcement
}

export const AnnouncementCard: React.FC<AnnouncementCardProps> = ({ announcement }) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-destructive/10 text-destructive border-destructive/20 dark:bg-destructive/20 dark:text-destructive-foreground'
      case 'medium': return 'bg-warning/10 text-warning-foreground border-warning/20 dark:bg-warning/20'
      case 'low': return 'bg-success/10 text-success-foreground border-success/20 dark:bg-success/20'
      default: return 'bg-muted text-muted-foreground border-border'
    }
  }

  const getAudienceIcon = (audience?: string) => {
    switch (audience) {
      case 'students': return <GraduationCap className="h-3.5 w-3.5" />
      case 'teachers': return <Users className="h-3.5 w-3.5" />
      case 'all': return <Shield className="h-3.5 w-3.5" />
      default: return <Users className="h-3.5 w-3.5" />
    }
  }

  const getAudienceLabel = (audience?: string) => {
    switch (audience) {
      case 'students': return 'Students'
      case 'teachers': return 'Teachers'
      case 'all': return 'All'
      default: return 'General'
    }
  }

  const getFileIcon = (type: string) => {
    if (type === 'pdf') return <FileText className="h-4 w-4" />
    return <File className="h-4 w-4" />
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  }

  return (
    <Card className="w-full hover:shadow-lg dark:hover:shadow-primary/5 transition-all duration-300 border-l-4 border-l-primary/20 hover:border-l-primary/60 bg-gradient-to-r from-background to-background/80">
      <CardHeader className="pb-4 space-y-4">
        <div className="flex flex-col space-y-3">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-xl font-bold text-foreground break-words leading-tight tracking-tight">
              {announcement.title}
            </h3>
            <div className="flex flex-wrap gap-1.5 flex-shrink-0">
              <Badge 
                variant="outline" 
                className={`${getPriorityColor(announcement.priority)} font-medium text-xs px-2 py-1`}
              >
                {announcement.priority.toUpperCase()}
              </Badge>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <User className="h-4 w-4 text-primary" />
              <span className="font-medium">{announcement.author}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4 text-primary" />
              <span>{formatDate(announcement.date)}</span>
            </div>
            {announcement.targetAudience && (
              <div className="flex items-center gap-1.5">
                {getAudienceIcon(announcement.targetAudience)}
                <span className="font-medium">{getAudienceLabel(announcement.targetAudience)}</span>
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20 font-medium">
              {announcement.category}
            </Badge>
            {announcement.targetAudience && (
              <Badge variant="outline" className="bg-muted/50 border-primary/20">
                <span className="mr-1">{getAudienceIcon(announcement.targetAudience)}</span>
                {getAudienceLabel(announcement.targetAudience)}
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0 space-y-6">
        <div className="prose prose-sm max-w-none dark:prose-invert">
          <p className="text-foreground/90 leading-relaxed text-base font-normal whitespace-pre-wrap">
            {announcement.content}
          </p>
        </div>
        
        {announcement.attachments.length > 0 && (
          <div className="border-t border-border/50 pt-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-1.5 rounded-md bg-primary/10">
                <Paperclip className="h-4 w-4 text-primary" />
              </div>
              <span className="text-sm font-semibold text-foreground">
                Attachments
              </span>
              <Badge variant="secondary" className="text-xs">
                {announcement.attachments.length}
              </Badge>
            </div>
            <div className="grid gap-3">
              {announcement.attachments.map((attachment, index) => (
                <div key={index} className="group flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 bg-muted/30 hover:bg-muted/50 rounded-xl border border-border/50 transition-all duration-200">
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className="p-2 rounded-lg bg-background shadow-sm border border-border/50">
                      {getFileIcon(attachment.type)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                        {attachment.name}
                      </p>
                      <p className="text-xs text-muted-foreground font-medium">
                        {attachment.size}
                      </p>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full sm:w-auto hover:bg-primary hover:text-primary-foreground transition-colors font-medium"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}