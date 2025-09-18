export interface Exam {
  id: string;
  course: string;
  courseCode: string;
  semester: number;
  branch: string;
  examType: 'midterm' | 'endterm' | 'sessional' | 'practical';
  date: string;
  time: string;
  duration: number; // in minutes
  location: string;
  maxMarks: number;
  instructor: string;
  instructorId: string;
  description?: string;
  topics: string[];
  status: 'scheduled' | 'ongoing' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
  createdBy: string; // admin id
}

export interface ExamSlot {
  id: string;
  date: string;
  timeSlot: string; // e.g., "09:00-12:00"
  location: string;
  capacity: number;
  isAvailable: boolean;
  examId?: string;
}

export interface Semester {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  examTypes: string[];
  branches: string[];
}

export interface ExamScheduleFilters {
  semester?: number;
  branch?: string;
  examType?: string;
  status?: string;
  instructorId?: string;
  studentId?: string;
}

export interface StudentExamResult {
  examId: string;
  studentId: string;
  marksObtained?: number;
  grade?: string;
  status: 'absent' | 'present' | 'excused';
  submittedAt?: string;
}