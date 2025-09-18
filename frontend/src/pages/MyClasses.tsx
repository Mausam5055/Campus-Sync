import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Hash, BookOpen, Users } from "lucide-react"
import { GenericPageSkeleton } from "@/components/ui/page-skeleton"
import { usePageLoading } from "@/hooks/use-page-loading"
import { SEO } from "@/components/SEO"
import { useNavigate } from "react-router-dom"

export default function MyClasses() {
  const isLoading = usePageLoading()
  const navigate = useNavigate()
  const [slots, setSlots] = useState<any[]>([])

  useEffect(() => {
    // Sample slots data for demo
    const sampleSlots = [
      { 
        id: 'CS301-MON-10', 
        subject: 'Data Structures', 
        code: 'CS301',
        time: '10:00 AM - 11:00 AM', 
        day: 'Monday', 
        room: 'Lab-A',
        studentCount: 25 
      },
      { 
        id: 'CS302-TUE-2', 
        subject: 'Database Systems', 
        code: 'CS302',
        time: '2:00 PM - 3:00 PM', 
        day: 'Tuesday', 
        room: 'Room-101',
        studentCount: 18 
      },
      { 
        id: 'CS303-WED-11', 
        subject: 'Software Engineering', 
        code: 'CS303',
        time: '11:00 AM - 12:00 PM', 
        day: 'Wednesday', 
        room: 'Room-205',
        studentCount: 22 
      },
      { 
        id: 'CS304-THU-3', 
        subject: 'Computer Networks', 
        code: 'CS304',
        time: '3:00 PM - 4:00 PM', 
        day: 'Thursday', 
        room: 'Lab-B',
        studentCount: 20 
      }
    ]
    
    setSlots(sampleSlots)
  }, [])

  const handleSlotClick = (slotId: string) => {
    navigate('/teacher/students-details', { state: { selectedSlot: slotId } })
  }

  if (isLoading) return <GenericPageSkeleton />

  return (
    <div className="space-y-4 p-4 sm:p-6">
      <SEO title="My Classes" description="View and manage your teaching slots" />
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-3xl font-bold tracking-tight">
            My Classes
          </h1>
          <p className="text-muted-foreground text-sm hidden sm:block">
            Manage your teaching slots and view student details
          </p>
        </div>
        
        <Badge variant="outline" className="w-fit">
          {slots.length} Active Classes
        </Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {slots.map((slot) => (
          <Card 
            key={slot.id} 
            className="cursor-pointer hover:shadow-md transition-shadow group"
            onClick={() => handleSlotClick(slot.id)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-xs">
                  {slot.code}
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  <Users className="h-3 w-3 mr-1" />
                  {slot.studentCount}
                </Badge>
              </div>
              <CardTitle className="text-lg line-clamp-1 group-hover:text-primary transition-colors">
                {slot.subject}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{slot.day} • {slot.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Hash className="h-4 w-4" />
                  <span>{slot.room}</span>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-border">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <BookOpen className="h-3 w-3" />
                  <span>Click to view students</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {slots.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <BookOpen className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">No Classes Assigned</h3>
            <p className="text-muted-foreground">
              You don't have any classes assigned yet. Contact administration for class assignments.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}