import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { CheckCircle, XCircle, Clock, Calendar } from 'lucide-react';
import { TeacherSubject, Student } from '@/types/attendance';
import { toast } from 'sonner';

interface TakeAttendanceModalProps {
  subject: TeacherSubject;
  selectedSlot: string;
  isOpen: boolean;
  onClose: () => void;
  onSave: (attendanceData: Array<{
    studentId: string;
    status: 'present' | 'absent' | 'late';
  }>) => void;
}

export const TakeAttendanceModal: React.FC<TakeAttendanceModalProps> = ({
  subject,
  selectedSlot,
  isOpen,
  onClose,
  onSave
}) => {
  const [attendanceData, setAttendanceData] = useState<Record<string, 'present' | 'absent' | 'late'>>({});
  const [isSaving, setIsSaving] = useState(false);

  const handleStatusChange = (studentId: string, status: 'present' | 'absent' | 'late') => {
    setAttendanceData(prev => ({
      ...prev,
      [studentId]: status
    }));
  };

  const handleMarkAll = (status: 'present' | 'absent') => {
    const newData: Record<string, 'present' | 'absent' | 'late'> = {};
    subject.enrolledStudents.forEach(student => {
      newData[student.id] = status;
    });
    setAttendanceData(newData);
  };

  const handleSave = async () => {
    const unmarkedStudents = subject.enrolledStudents.filter(
      student => !attendanceData[student.id]
    );

    if (unmarkedStudents.length > 0) {
      toast.error(`Please mark attendance for ${unmarkedStudents.length} student(s)`);
      return;
    }

    setIsSaving(true);
    
    try {
      const attendanceArray = Object.entries(attendanceData).map(([studentId, status]) => ({
        studentId,
        status
      }));

      await onSave(attendanceArray);
      toast.success('Attendance saved successfully');
      onClose();
      setAttendanceData({});
    } catch (error) {
      toast.error('Failed to save attendance');
    } finally {
      setIsSaving(false);
    }
  };

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
        return <Clock className="h-4 w-4 text-yellow-600" />;
      default:
        return null;
    }
  };

  const counts = {
    present: Object.values(attendanceData).filter(status => status === 'present').length,
    absent: Object.values(attendanceData).filter(status => status === 'absent').length,
    late: Object.values(attendanceData).filter(status => status === 'late').length
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] max-w-4xl max-h-[90vh] overflow-y-auto p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5" />
            <span>Take Attendance - {subject.name}</span>
          </DialogTitle>
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-sm text-muted-foreground space-y-2 sm:space-y-0">
            <span>{subject.code}</span>
            <Badge variant="outline" className="self-start sm:self-center">{selectedSlot}</Badge>
            <span>{new Date().toLocaleDateString()}</span>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleMarkAll('present')}
              className="flex items-center justify-center space-x-2 text-green-600 border-green-200 hover:bg-green-50 w-full sm:w-auto"
            >
              <CheckCircle className="h-4 w-4" />
              <span>Mark All Present</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleMarkAll('absent')}
              className="flex items-center justify-center space-x-2 text-red-600 border-red-200 hover:bg-red-50 w-full sm:w-auto"
            >
              <XCircle className="h-4 w-4" />
              <span>Mark All Absent</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setAttendanceData({})}
              className="flex items-center justify-center space-x-2 w-full sm:w-auto"
            >
              <span>Clear All</span>
            </Button>
          </div>

          {/* Attendance Stats */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4">
            <div className="text-center p-2 sm:p-3 bg-green-50 rounded-lg">
              <p className="text-xl sm:text-2xl font-bold text-green-600">{counts.present}</p>
              <p className="text-xs sm:text-sm text-green-600">Present</p>
            </div>
            <div className="text-center p-2 sm:p-3 bg-red-50 rounded-lg">
              <p className="text-xl sm:text-2xl font-bold text-red-600">{counts.absent}</p>
              <p className="text-xs sm:text-sm text-red-600">Absent</p>
            </div>
            <div className="text-center p-2 sm:p-3 bg-yellow-50 rounded-lg">
              <p className="text-xl sm:text-2xl font-bold text-yellow-600">{counts.late}</p>
              <p className="text-xs sm:text-sm text-yellow-600">Late</p>
            </div>
          </div>

          {/* Student List */}
          <div className="space-y-3">
            <h3 className="font-semibold">Students ({subject.enrolledStudents.length})</h3>
            <div className="space-y-3 max-h-64 sm:max-h-96 overflow-y-auto">
              {subject.enrolledStudents.map((student) => (
                <div key={student.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 border rounded-lg space-y-3 sm:space-y-0">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8 sm:h-10 sm:w-10">
                      <AvatarFallback className="text-xs sm:text-sm">{getInitials(student.name)}</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1 min-w-0 flex-1">
                      <p className="font-medium text-sm sm:text-base truncate">{student.name}</p>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 text-xs sm:text-sm text-muted-foreground space-y-1 sm:space-y-0">
                        <span className="truncate">{student.rollNumber}</span>
                        <span className="hidden sm:inline">•</span>
                        <span className="truncate">{student.email}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end space-x-2 sm:space-x-4">
                    <div className="flex items-center">
                      {attendanceData[student.id] && getStatusIcon(attendanceData[student.id])}
                    </div>
                    <RadioGroup
                      value={attendanceData[student.id] || ''}
                      onValueChange={(value) => handleStatusChange(student.id, value as 'present' | 'absent' | 'late')}
                      className="flex space-x-2 sm:space-x-6"
                    >
                      <div className="flex items-center space-x-1 sm:space-x-2">
                        <RadioGroupItem value="present" id={`present-${student.id}`} className="h-3 w-3 sm:h-4 sm:w-4" />
                        <Label htmlFor={`present-${student.id}`} className="text-green-600 text-xs sm:text-sm">P</Label>
                      </div>
                      <div className="flex items-center space-x-1 sm:space-x-2">
                        <RadioGroupItem value="absent" id={`absent-${student.id}`} className="h-3 w-3 sm:h-4 sm:w-4" />
                        <Label htmlFor={`absent-${student.id}`} className="text-red-600 text-xs sm:text-sm">A</Label>
                      </div>
                      <div className="flex items-center space-x-1 sm:space-x-2">
                        <RadioGroupItem value="late" id={`late-${student.id}`} className="h-3 w-3 sm:h-4 sm:w-4" />
                        <Label htmlFor={`late-${student.id}`} className="text-yellow-600 text-xs sm:text-sm">L</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0">
          <Button variant="outline" onClick={onClose} className="w-full sm:w-auto">
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isSaving} className="w-full sm:w-auto">
            {isSaving ? 'Saving...' : 'Save Attendance'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};