import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ChevronDown, ChevronUp, Clock, MapPin, User } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Subject, AttendanceRecord } from '@/types/attendance';
import { AttendanceDetailModal } from './AttendanceDetailModal';

interface SubjectAttendanceCardProps {
  subject: Subject;
  attendance: AttendanceRecord[];
  className?: string;
}

export const SubjectAttendanceCard: React.FC<SubjectAttendanceCardProps> = ({
  subject,
  attendance,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const subjectAttendance = attendance.filter(record => record.subjectId === subject.id);
  const presentCount = subjectAttendance.filter(record => record.status === 'present').length;
  const attendancePercentage = subject.totalClasses > 0 ? (presentCount / subject.totalClasses) * 100 : 0;

  const getPercentageColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'present':
        return <Badge variant="default" className="bg-green-100 text-green-800">Present</Badge>;
      case 'absent':
        return <Badge variant="destructive">Absent</Badge>;
      case 'late':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Late</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <>
      <Card className={className}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <CardTitle className="text-lg">{subject.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{subject.code}</p>
            </div>
            <div className="text-right">
              <p className={`text-2xl font-bold ${getPercentageColor(attendancePercentage)}`}>
                {attendancePercentage.toFixed(1)}%
              </p>
              <p className="text-xs text-muted-foreground">
                {presentCount}/{subject.totalClasses}
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Attendance Progress</span>
              <span>{presentCount} of {subject.totalClasses} classes</span>
            </div>
            <Progress value={attendancePercentage} className="h-2" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowDetailModal(true)}
              className="h-auto py-3"
            >
              <div className="text-center">
                <p className="text-lg font-semibold">{subject.totalClasses}</p>
                <p className="text-xs text-muted-foreground">Total Classes</p>
              </div>
            </Button>
            
            <Collapsible open={isOpen} onOpenChange={setIsOpen}>
              <CollapsibleTrigger asChild>
                <Button variant="outline" size="sm" className="h-auto py-3">
                  <div className="flex items-center justify-center space-x-2">
                    <div className="text-center">
                      <p className="text-lg font-semibold">{subject.slots.length}</p>
                      <p className="text-xs text-muted-foreground">Time Slots</p>
                    </div>
                    {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </div>
                </Button>
              </CollapsibleTrigger>

              <CollapsibleContent className="mt-3">
                <div className="space-y-2">
                  {subject.slots.map((slot, index) => (
                    <div key={slot.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium">{slot.day}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {slot.startTime} - {slot.endTime}
                        </p>
                      </div>
                      <Badge variant="outline" className="capitalize">
                        {slot.type}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>

          {subjectAttendance.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm font-medium">Recent Attendance</p>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {subjectAttendance.slice(-3).reverse().map((record, index) => (
                  <div key={record.id} className="flex items-center justify-between p-2 bg-muted rounded">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{new Date(record.date).toLocaleDateString()}</p>
                      <p className="text-xs text-muted-foreground">{record.slot}</p>
                    </div>
                    {getStatusBadge(record.status)}
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <AttendanceDetailModal
        subject={subject}
        attendance={subjectAttendance}
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
      />
    </>
  );
};