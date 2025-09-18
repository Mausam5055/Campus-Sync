export interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  subjectId: string;
  subjectName: string;
  date: string;
  slot: string;
  status: 'present' | 'absent' | 'late';
  markedBy: string;
  markedAt: string;
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  semester: number;
  branch: string;
  slots: TimeSlot[];
  totalClasses: number;
}

export interface TimeSlot {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
  type: 'lecture' | 'lab' | 'tutorial';
}

export interface AttendanceStats {
  totalClasses: number;
  classesAttended: number;
  attendancePercentage: number;
  status: 'good' | 'warning' | 'critical';
}

export interface StudentAttendanceData {
  studentId: string;
  semester: number;
  branch: string;
  subjects: Subject[];
  attendance: AttendanceRecord[];
}

export interface TeacherSubject {
  id: string;
  name: string;
  code: string;
  semester: number;
  branch: string;
  slots: TimeSlot[];
  enrolledStudents: Student[];
}

export interface Student {
  id: string;
  name: string;
  email: string;
  semester: number;
  branch: string;
  rollNumber: string;
}