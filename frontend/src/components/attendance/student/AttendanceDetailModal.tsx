import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, User } from 'lucide-react';
import { Subject, AttendanceRecord } from '@/types/attendance';

interface AttendanceDetailModalProps {
  subject: Subject;
  attendance: AttendanceRecord[];
  isOpen: boolean;
  onClose: () => void;
}

export const AttendanceDetailModal: React.FC<AttendanceDetailModalProps> = ({
  subject,
  attendance,
  isOpen,
  onClose
}) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'present':
        return <Badge className="bg-green-100 text-green-800">Present</Badge>;
      case 'absent':
        return <Badge variant="destructive">Absent</Badge>;
      case 'late':
        return <Badge className="bg-yellow-100 text-yellow-800">Late</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const sortedAttendance = [...attendance].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <span>{subject.name}</span>
            <Badge variant="outline">{subject.code}</Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Subject Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-muted rounded-lg">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                {attendance.filter(r => r.status === 'present').length}
              </p>
              <p className="text-sm text-muted-foreground">Present</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-red-600">
                {attendance.filter(r => r.status === 'absent').length}
              </p>
              <p className="text-sm text-muted-foreground">Absent</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-600">
                {attendance.filter(r => r.status === 'late').length}
              </p>
              <p className="text-sm text-muted-foreground">Late</p>
            </div>
          </div>

          {/* Time Slots */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Time Slots</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {subject.slots.map((slot) => (
                <div key={slot.id} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{slot.day}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {slot.startTime} - {slot.endTime}
                        </span>
                      </div>
                    </div>
                    <Badge variant="outline" className="capitalize">
                      {slot.type}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Attendance History */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Attendance History</h3>
            {sortedAttendance.length > 0 ? (
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {sortedAttendance.map((record) => (
                  <div key={record.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">
                          {new Date(record.date).toLocaleDateString('en-US', {
                            weekday: 'short',
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{record.slot}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          Marked by {record.markedBy}
                        </span>
                      </div>
                    </div>
                    {getStatusBadge(record.status)}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-8">
                No attendance records found for this subject.
              </p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};