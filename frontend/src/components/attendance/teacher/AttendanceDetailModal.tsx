import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Calendar,
  Clock,
  Users,
  X
} from 'lucide-react';
import { AttendanceRecord } from '@/types/attendance';

interface AttendanceDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  session: {
    id: string;
    date: string;
    slot: string;
    time: string;
    type: 'lecture' | 'lab' | 'tutorial';
    totalStudents: number;
    presentCount: number;
    absentCount: number;
    lateCount: number;
    attendanceRecords: AttendanceRecord[];
  };
}

export const AttendanceDetailModal: React.FC<AttendanceDetailModalProps> = ({
  open,
  onOpenChange,
  session
}) => {
  const getInitials = (name: string) => {
    return name.split(' ').map(word => word[0]).join('').toUpperCase();
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'absent':
        return <XCircle className="h-4 w-4 text-red-600" />;
      case 'late':
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      default:
        return null;
    }
  };

  const getAttendancePercentage = () => {
    return Math.round((session.presentCount / session.totalStudents) * 100);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] w-[95vw] sm:w-full p-0">
        <DialogHeader className="p-4 sm:p-6 pb-2 sm:pb-4">
          <DialogTitle className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div className="flex-1 min-w-0">
              <h2 className="text-lg sm:text-xl font-semibold truncate">{session.slot}</h2>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-1 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(session.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{session.time}</span>
                </div>
                <Badge variant="outline" className="capitalize w-fit">
                  {session.type}
                </Badge>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onOpenChange(false)}
              className="h-8 w-8 p-0 self-start sm:self-center"
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>
        
        <div className="px-4 sm:px-6 pb-4 sm:pb-6 flex-1 min-h-0">
          {/* Statistics Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
            <div className="text-center p-3 sm:p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Users className="h-4 w-4 text-blue-600" />
                <span className="text-lg sm:text-2xl font-bold text-blue-600">{session.totalStudents}</span>
              </div>
              <p className="text-xs sm:text-sm text-blue-600 font-medium">Total</p>
            </div>
            <div className="text-center p-3 sm:p-4 bg-green-50 rounded-lg">
              <div className="flex items-center justify-center gap-1 mb-1">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-lg sm:text-2xl font-bold text-green-600">{session.presentCount}</span>
              </div>
              <p className="text-xs sm:text-sm text-green-600 font-medium">Present</p>
            </div>
            <div className="text-center p-3 sm:p-4 bg-red-50 rounded-lg">
              <div className="flex items-center justify-center gap-1 mb-1">
                <XCircle className="h-4 w-4 text-red-600" />
                <span className="text-lg sm:text-2xl font-bold text-red-600">{session.absentCount}</span>
              </div>
              <p className="text-xs sm:text-sm text-red-600 font-medium">Absent</p>
            </div>
            <div className="text-center p-3 sm:p-4 bg-yellow-50 rounded-lg">
              <div className="flex items-center justify-center gap-1 mb-1">
                <AlertTriangle className="h-4 w-4 text-yellow-600" />
                <span className="text-lg sm:text-2xl font-bold text-yellow-600">{session.lateCount}</span>
              </div>
              <p className="text-xs sm:text-sm text-yellow-600 font-medium">Late</p>
            </div>
          </div>

          {/* Overall Attendance Rate */}
          <div className="text-center mb-6 p-4 bg-primary/5 rounded-lg">
            <div className="text-2xl sm:text-3xl font-bold text-primary mb-1">
              {getAttendancePercentage()}%
            </div>
            <p className="text-sm text-muted-foreground">Overall Attendance Rate</p>
          </div>

          {/* Student Records */}
          {session.attendanceRecords.length > 0 ? (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Users className="h-5 w-5" />
                Student Records ({session.attendanceRecords.length})
              </h3>
              <ScrollArea className="h-64 sm:h-80 border rounded-lg">
                <div className="p-2 space-y-2">
                  {session.attendanceRecords.map((record) => (
                    <div key={record.id} className="flex items-center justify-between p-3 bg-background border rounded-lg">
                      <div className="flex items-center space-x-3 flex-1 min-w-0">
                        <Avatar className="h-8 w-8 sm:h-10 sm:w-10 flex-shrink-0">
                          <AvatarFallback className="text-xs sm:text-sm">
                            {getInitials(record.studentName)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-sm sm:text-base truncate">{record.studentName}</p>
                          <p className="text-xs sm:text-sm text-muted-foreground">
                            Marked at {new Date(record.markedAt).toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 flex-shrink-0">
                        {getStatusIcon(record.status)}
                        <Badge 
                          variant="outline"
                          className={`capitalize text-xs sm:text-sm ${
                            record.status === 'present' ? 'text-green-600 bg-green-50 border-green-200' :
                            record.status === 'absent' ? 'text-red-600 bg-red-50 border-red-200' :
                            'text-yellow-600 bg-yellow-50 border-yellow-200'
                          }`}
                        >
                          {record.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <Users className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>No detailed attendance records available for this session</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};