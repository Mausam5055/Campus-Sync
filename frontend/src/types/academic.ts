// Academic System Types
export interface Subject {
  id: string
  name: string
  code: string
  credits: number
  semester: number
  branch: string
  description: string
  status: 'Active' | 'Inactive' | 'Draft'
  type: 'Core' | 'Elective' | 'General'
  prerequisites: string[]
  createdAt: string
  updatedAt: string
}

export interface Teacher {
  id: string
  name: string
  email: string
  department: string
  specialization: string[]
  experience: number
  qualifications: string[]
  maxSubjects: number
  currentSubjects: number
  assignedSubjects: AssignedSubject[]
  contact: string
  status: 'Active' | 'Inactive'
  createdAt: string
}

export interface AssignedSubject {
  subjectId: string
  subjectName: string
  subjectCode: string
  semester: number
  enrolledStudents: number
  maxCapacity: number
  assignedAt: string
}

export interface Branch {
  id: string
  name: string
  code: string
  duration: number
  totalCredits: number
  semesters: number
  capacity: number
  currentStudents: number
  subjects: {
    core: number
    elective: number
    general: number
  }
  status: 'Active' | 'Inactive'
  createdAt: string
}

export interface CoursePlan {
  id: string
  branch: string
  semester: number
  subjects: Subject[]
  totalCredits: number
  enrolledStudents: number
  status: 'Active' | 'Draft' | 'Archived'
  createdAt: string
  updatedAt: string
}

export interface Semester {
  id: number
  name: string
  startDate: string
  endDate: string
  isActive: boolean
  examTypes: string[]
  branches: string[]
}

export interface AcademicSettings {
  minCreditsPerSemester: number
  maxCreditsPerSemester: number
  minCreditsForGraduation: number
  minAttendance: number
  passingGrade: number
  gpaScale: number
  maxSubjectsPerTeacher: number
}

export interface SubjectAllocation {
  id: string
  teacherId: string
  subjectId: string
  semester: number
  branch: string
  allocatedAt: string
  enrolledStudents: number
  maxCapacity: number
  status: 'Active' | 'Inactive'
}

export interface AcademicStatistics {
  totalSubjects: number
  activeSubjects: number
  totalTeachers: number
  activeTeachers: number
  totalBranches: number
  activeBranches: number
  totalStudents: number
  allocatedSubjects: number
  unassignedSubjects: number
  averageSubjectsPerTeacher: number
}