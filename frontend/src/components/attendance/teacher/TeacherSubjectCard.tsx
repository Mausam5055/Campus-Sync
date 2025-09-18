import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Calendar, 
  Clock, 
  Users, 
  CheckCircle, 
  BarChart3,
  ChevronRight,
  GraduationCap
} from 'lucide-react';
import { TeacherSubject, TimeSlot } from '@/types/attendance';
import { TakeAttendanceModal } from './TakeAttendanceModal';
import { AttendanceAnalyticsModal } from './AttendanceAnalyticsModal';
import { StudentListModal } from './StudentListModal';

interface TeacherSubjectCardProps {
  subject: TeacherSubject;
  onAttendanceTaken: (subjectId: string, attendanceData: any[]) => void;
  className?: string;
}

export const TeacherSubjectCard: React.FC<TeacherSubjectCardProps> = ({
  subject,
  onAttendanceTaken,
  className = ''
}) => {
  const [showAttendanceModal, setShowAttendanceModal] = useState(false);
  const [showAnalyticsModal, setShowAnalyticsModal] = useState(false);
  const [showStudentListModal, setShowStudentListModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<string>('');

  const handleTakeAttendance = (slot: TimeSlot) => {
    setSelectedSlot(`${slot.day} ${slot.startTime}-${slot.endTime}`);
    setShowAttendanceModal(true);
  };

  const handleAttendanceSave = (attendanceData: Array<{
    studentId: string;
    status: 'present' | 'absent' | 'late';
  }>) => {
    onAttendanceTaken(subject.id, attendanceData);
    setShowAttendanceModal(false);
  };

  const getCurrentSlot = () => {
    const now = new Date();
    const currentDay = now.toLocaleDateString('en-US', { weekday: 'long' });
    const currentTime = now.toTimeString().slice(0, 5);
    
    return subject.slots.find(slot => 
      slot.day.toLowerCase() === currentDay.toLowerCase() &&
      currentTime >= slot.startTime &&
      currentTime <= slot.endTime
    );
  };

  const currentSlot = getCurrentSlot();

  return (
    <>
      <Card className={`${className} hover:shadow-md transition-shadow`}>
        <CardHeader className="pb-3">
          <div className="flex flex-col space-y-3 md:flex-row md:items-start md:justify-between md:space-y-0">
            <div className="space-y-2">
              <CardTitle className="text-lg leading-tight">{subject.name}</CardTitle>
              <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                <span className="font-medium">{subject.code}</span>
                <Badge variant="outline" className="text-xs">Semester {subject.semester}</Badge>
              </div>
              <div className="md:hidden">
                <Badge variant="secondary" className="text-xs">{subject.branch}</Badge>
              </div>
            </div>
            <div className="flex items-center justify-between md:flex-col md:text-right">
              <div className="hidden md:block mb-2">
                <Badge variant="secondary" className="text-xs">{subject.branch}</Badge>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">{subject.enrolledStudents.length}</span>
                <span className="text-xs text-muted-foreground">Students</span>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Current Slot Alert */}
          {currentSlot && (
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex flex-col space-y-3 md:flex-row md:items-center md:justify-between md:space-y-0">
                <div className="flex flex-wrap items-center gap-2">
                  <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-green-800">
                    Live: {currentSlot.day} {currentSlot.startTime}-{currentSlot.endTime}
                  </span>
                  <Badge className="bg-green-100 text-green-800 capitalize text-xs">
                    {currentSlot.type}
                  </Badge>
                </div>
                <Button
                  size="sm"
                  onClick={() => handleTakeAttendance(currentSlot)}
                  className="bg-green-600 hover:bg-green-700 w-full md:w-auto"
                >
                  Take Attendance
                </Button>
              </div>
            </div>
          )}

          {/* Time Slots */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium">Schedule</h4>
              <span className="text-xs text-muted-foreground">{subject.slots.length} slots</span>
            </div>
            
            <div className="grid gap-3 max-h-32 overflow-y-auto">
              {subject.slots.map((slot) => (
                <div 
                  key={slot.id} 
                  className={`flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0 p-3 rounded-lg border ${
                    currentSlot?.id === slot.id 
                      ? 'bg-green-50 border-green-200' 
                      : 'bg-muted'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">{slot.day}</span>
                      <Badge variant="outline" className="capitalize text-xs">
                        {slot.type}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        {slot.startTime} - {slot.endTime}
                      </span>
                    </div>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleTakeAttendance(slot)}
                    className="self-end md:self-center h-8 w-8 p-0"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Student Preview */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium">Enrolled Students</h4>
              <Button variant="ghost" size="sm" className="text-xs">
                View All
              </Button>
            </div>
            
            <div className="flex -space-x-2 overflow-hidden">
              {subject.enrolledStudents.slice(0, 8).map((student, index) => (
                <Avatar key={student.id} className="h-8 w-8 border-2 border-background">
                  <AvatarFallback className="text-xs">
                    {student.name.split(' ').map(name => name[0]).join('')}
                  </AvatarFallback>
                </Avatar>
              ))}
              {subject.enrolledStudents.length > 8 && (
                <div className="h-8 w-8 rounded-full bg-muted border-2 border-background flex items-center justify-center">
                  <span className="text-xs font-medium">
                    +{subject.enrolledStudents.length - 8}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="justify-start"
              onClick={() => setShowAnalyticsModal(true)}
            >
              <BarChart3 className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">View Analytics</span>
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="justify-start"
              onClick={() => setShowStudentListModal(true)}
            >
              <GraduationCap className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">Student List</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      <TakeAttendanceModal
        subject={subject}
        selectedSlot={selectedSlot}
        isOpen={showAttendanceModal}
        onClose={() => setShowAttendanceModal(false)}
        onSave={handleAttendanceSave}
      />

      <AttendanceAnalyticsModal
        subject={subject}
        isOpen={showAnalyticsModal}
        onClose={() => setShowAnalyticsModal(false)}
      />

      <StudentListModal
        subject={subject}
        isOpen={showStudentListModal}
        onClose={() => setShowStudentListModal(false)}
      />
    </>
  );
};