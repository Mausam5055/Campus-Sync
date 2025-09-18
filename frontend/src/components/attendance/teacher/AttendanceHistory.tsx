import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { 
  Calendar, 
  Clock, 
  Users, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  Filter,
  Download,
  Search,
  Eye,
  Edit
} from 'lucide-react';
import { AttendanceRecord } from '@/types/attendance';
import { EditAttendanceDialog } from './EditAttendanceDialog';
import { AttendanceDetailModal } from './AttendanceDetailModal';

interface AttendanceHistoryProps {
  subjectId: string;
  subjectName: string;
}

interface AttendanceSession {
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
}

export const AttendanceHistory: React.FC<AttendanceHistoryProps> = ({
  subjectId,
  subjectName
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSession, setSelectedSession] = useState<AttendanceSession | null>(null);
  const [editSession, setEditSession] = useState<AttendanceSession | null>(null);
  const [attendanceData, setAttendanceData] = useState<AttendanceSession[]>([]);

  // Mock attendance history data
  React.useEffect(() => {
    const mockData: AttendanceSession[] = [
    {
      id: 'session1',
      date: '2024-01-24',
      slot: 'Monday 09:00-10:00',
      time: '09:00-10:00',
      type: 'lecture',
      totalStudents: 21,
      presentCount: 18,
      absentCount: 2,
      lateCount: 1,
      attendanceRecords: [
        {
          id: 'att1',
          studentId: 'std1',
          studentName: 'Alice Johnson',
          subjectId,
          subjectName,
          date: '2024-01-24',
          slot: 'Monday 09:00-10:00',
          status: 'present',
          markedBy: 'teacher1',
          markedAt: '2024-01-24T09:05:00Z'
        },
        {
          id: 'att2',
          studentId: 'std2',
          studentName: 'Bob Smith',
          subjectId,
          subjectName,
          date: '2024-01-24',
          slot: 'Monday 09:00-10:00',
          status: 'present',
          markedBy: 'teacher1',
          markedAt: '2024-01-24T09:05:00Z'
        },
        {
          id: 'att3',
          studentId: 'std3',
          studentName: 'Carol Davis',
          subjectId,
          subjectName,
          date: '2024-01-24',
          slot: 'Monday 09:00-10:00',
          status: 'absent',
          markedBy: 'teacher1',
          markedAt: '2024-01-24T09:05:00Z'
        }
      ]
    },
    {
      id: 'session2',
      date: '2024-01-22',
      slot: 'Friday 14:00-17:00',
      time: '14:00-17:00',
      type: 'lab',
      totalStudents: 21,
      presentCount: 20,
      absentCount: 1,
      lateCount: 0,
      attendanceRecords: []
    },
    {
      id: 'session3',
      date: '2024-01-19',
      slot: 'Wednesday 11:00-12:00',
      time: '11:00-12:00',
      type: 'lecture',
      totalStudents: 21,
      presentCount: 17,
      absentCount: 3,
      lateCount: 1,
      attendanceRecords: []
    }
  ];
    setAttendanceData(mockData);
  }, [subjectId]);

  const attendanceHistory = attendanceData;

  const filteredHistory = attendanceHistory.filter(session =>
    session.date.includes(searchTerm) ||
    session.slot.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  const getAttendancePercentage = (session: AttendanceSession) => {
    return Math.round((session.presentCount / session.totalStudents) * 100);
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(word => word[0]).join('').toUpperCase();
  };

  const handleAttendanceUpdate = (sessionId: string, updatedRecords: AttendanceRecord[]) => {
    setAttendanceData(prev => 
      prev.map(session => 
        session.id === sessionId
          ? {
              ...session,
              attendanceRecords: updatedRecords,
              presentCount: updatedRecords.filter(r => r.status === 'present').length,
              absentCount: updatedRecords.filter(r => r.status === 'absent').length,
              lateCount: updatedRecords.filter(r => r.status === 'late').length,
            }
          : session
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold">Attendance History</h2>
          <p className="text-muted-foreground text-sm sm:text-base">{subjectName}</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" size="sm" className="w-full sm:w-auto">
            <Filter className="h-4 w-4 sm:mr-2" />
            <span className="hidden sm:inline">Filter</span>
          </Button>
          <Button variant="outline" size="sm" className="w-full sm:w-auto">
            <Download className="h-4 w-4 sm:mr-2" />
            <span className="hidden sm:inline">Export</span>
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by date or time slot..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 max-w-full sm:max-w-md"
        />
      </div>

      {/* History List */}
      <div className="space-y-4">
        {filteredHistory.map((session) => (
          <Card key={session.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4 sm:p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                <div className="flex items-start space-x-3 sm:space-x-4 min-w-0 flex-1">
                  <div className="p-2 bg-primary/10 rounded-lg flex-shrink-0">
                    <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  </div>
                  <div className="space-y-1 min-w-0 flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2">
                      <h3 className="font-semibold text-sm sm:text-base truncate">{session.slot}</h3>
                      <Badge variant="outline" className="capitalize text-xs self-start sm:self-center">
                        {session.type}
                      </Badge>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-xs sm:text-sm text-muted-foreground space-y-1 sm:space-y-0">
                      <span>{new Date(session.date).toLocaleDateString()}</span>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{session.time}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-6 space-y-4 lg:space-y-0">
                  {/* Attendance Stats */}
                  <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center">
                    <div className="space-y-1">
                      <div className="flex items-center justify-center space-x-1">
                        <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />
                        <span className="font-semibold text-green-600 text-sm sm:text-base">{session.presentCount}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Present</p>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-center space-x-1">
                        <XCircle className="h-3 w-3 sm:h-4 sm:w-4 text-red-600" />
                        <span className="font-semibold text-red-600 text-sm sm:text-base">{session.absentCount}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Absent</p>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-center space-x-1">
                        <AlertTriangle className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-600" />
                        <span className="font-semibold text-yellow-600 text-sm sm:text-base">{session.lateCount}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Late</p>
                    </div>
                  </div>

                  {/* Overall Percentage */}
                  <div className="text-center lg:text-left">
                    <div className="text-xl sm:text-2xl font-bold text-primary">
                      {getAttendancePercentage(session)}%
                    </div>
                    <p className="text-xs text-muted-foreground">Attendance</p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedSession(session)}
                      className="flex-1 lg:flex-none"
                    >
                      <Eye className="h-4 w-4 sm:mr-2" />
                      <span className="hidden sm:inline">View Details</span>
                    </Button>
                    {session.attendanceRecords.length > 0 && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditSession(session)}
                        className="flex-1 lg:flex-none"
                      >
                        <Edit className="h-4 w-4 sm:mr-2" />
                        <span className="hidden sm:inline">Edit</span>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredHistory.length === 0 && (
        <Card className="text-center p-8">
          <div className="space-y-3">
            <Calendar className="h-12 w-12 mx-auto text-muted-foreground" />
            <div className="space-y-1">
              <h3 className="text-lg font-semibold">No attendance records found</h3>
              <p className="text-muted-foreground">
                {searchTerm ? 'Try adjusting your search terms.' : 'Start taking attendance to see records here.'}
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Attendance Detail Modal */}
      {selectedSession && (
        <AttendanceDetailModal
          open={!!selectedSession}
          onOpenChange={(open) => !open && setSelectedSession(null)}
          session={selectedSession}
        />
      )}

      {/* Edit Attendance Dialog */}
      {editSession && (
        <EditAttendanceDialog
          open={!!editSession}
          onOpenChange={(open) => !open && setEditSession(null)}
          session={editSession}
          onSave={handleAttendanceUpdate}
        />
      )}
    </div>
  );
};