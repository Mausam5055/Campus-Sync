import { useState, useCallback, useMemo } from 'react'
import { useLocalStorage } from './useLocalStorage'

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

export interface AcademicSettings {
  minCreditsPerSemester: number
  maxCreditsPerSemester: number
  minCreditsForGraduation: number
  minAttendance: number
  passingGrade: number
  gpaScale: number
  maxSubjectsPerTeacher: number
}

const initialSubjects: Subject[] = [
  {
    id: '1',
    name: 'Mathematics I',
    code: 'MATH101',
    credits: 4,
    semester: 1,
    branch: 'Computer Science',
    description: 'Fundamental mathematics concepts including calculus and algebra',
    status: 'Active',
    type: 'Core',
    prerequisites: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Programming Fundamentals',
    code: 'CS101',
    credits: 4,
    semester: 1,
    branch: 'Computer Science',
    description: 'Introduction to programming concepts and problem solving',
    status: 'Active',
    type: 'Core',
    prerequisites: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Data Structures',
    code: 'CS102',
    credits: 4,
    semester: 2,
    branch: 'Computer Science',
    description: 'Fundamental data structures and algorithms',
    status: 'Active',
    type: 'Core',
    prerequisites: ['CS101'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
]

const initialTeachers: Teacher[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@college.edu',
    department: 'Computer Science',
    specialization: ['Data Structures', 'Algorithms', 'Programming'],
    experience: 8,
    qualifications: ['PhD Computer Science', 'MS Computer Science'],
    maxSubjects: 3,
    currentSubjects: 2,
    assignedSubjects: [
      {
        subjectId: '2',
        subjectName: 'Programming Fundamentals',
        subjectCode: 'CS101',
        semester: 1,
        enrolledStudents: 45,
        maxCapacity: 60,
        assignedAt: new Date().toISOString()
      },
      {
        subjectId: '3',
        subjectName: 'Data Structures',
        subjectCode: 'CS102',
        semester: 2,
        enrolledStudents: 42,
        maxCapacity: 50,
        assignedAt: new Date().toISOString()
      }
    ],
    contact: '+1234567890',
    status: 'Active',
    createdAt: new Date().toISOString()
  }
]

const initialBranches: Branch[] = [
  {
    id: '1',
    name: 'Computer Science Engineering',
    code: 'CSE',
    duration: 4,
    totalCredits: 180,
    semesters: 8,
    capacity: 400,
    currentStudents: 320,
    subjects: { core: 28, elective: 12, general: 8 },
    status: 'Active',
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Electronics & Communication',
    code: 'ECE',
    duration: 4,
    totalCredits: 180,
    semesters: 8,
    capacity: 350,
    currentStudents: 280,
    subjects: { core: 26, elective: 14, general: 8 },
    status: 'Active',
    createdAt: new Date().toISOString()
  }
]

const initialSettings: AcademicSettings = {
  minCreditsPerSemester: 18,
  maxCreditsPerSemester: 26,
  minCreditsForGraduation: 180,
  minAttendance: 75,
  passingGrade: 50,
  gpaScale: 10,
  maxSubjectsPerTeacher: 4
}

export const useAdminData = () => {
  const [subjects, setSubjects] = useLocalStorage<Subject[]>('admin-subjects', initialSubjects)
  const [teachers, setTeachers] = useLocalStorage<Teacher[]>('admin-teachers', initialTeachers)
  const [branches, setBranches] = useLocalStorage<Branch[]>('admin-branches', initialBranches)
  const [coursePlans, setCoursePlans] = useLocalStorage<CoursePlan[]>('admin-course-plans', [])
  const [settings, setSettings] = useLocalStorage<AcademicSettings>('admin-settings', initialSettings)

  // Subject Management
  const addSubject = useCallback((subject: Omit<Subject, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newSubject: Subject = {
      ...subject,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    setSubjects(prev => [...prev, newSubject])
    return newSubject
  }, [setSubjects])

  const updateSubject = useCallback((id: string, updates: Partial<Subject>) => {
    setSubjects(prev => prev.map(subject => 
      subject.id === id 
        ? { ...subject, ...updates, updatedAt: new Date().toISOString() }
        : subject
    ))
  }, [setSubjects])

  const deleteSubject = useCallback((id: string) => {
    setSubjects(prev => prev.filter(subject => subject.id !== id))
    // Also remove from teacher assignments
    setTeachers(prev => prev.map(teacher => ({
      ...teacher,
      assignedSubjects: teacher.assignedSubjects.filter(sub => sub.subjectId !== id),
      currentSubjects: teacher.assignedSubjects.filter(sub => sub.subjectId !== id).length
    })))
  }, [setSubjects, setTeachers])

  // Teacher Management
  const addTeacher = useCallback((teacher: Omit<Teacher, 'id' | 'createdAt' | 'currentSubjects' | 'assignedSubjects'>) => {
    const newTeacher: Teacher = {
      ...teacher,
      id: Date.now().toString(),
      currentSubjects: 0,
      assignedSubjects: [],
      createdAt: new Date().toISOString()
    }
    setTeachers(prev => [...prev, newTeacher])
    return newTeacher
  }, [setTeachers])

  const updateTeacher = useCallback((id: string, updates: Partial<Teacher>) => {
    setTeachers(prev => prev.map(teacher => 
      teacher.id === id ? { ...teacher, ...updates } : teacher
    ))
  }, [setTeachers])

  const deleteTeacher = useCallback((id: string) => {
    setTeachers(prev => prev.filter(teacher => teacher.id !== id))
  }, [setTeachers])

  // Subject Allocation
  const allocateSubject = useCallback((teacherId: string, subjectId: string) => {
    const subject = subjects.find(s => s.id === subjectId)
    const teacher = teachers.find(t => t.id === teacherId)
    
    if (!subject || !teacher) return false
    if (teacher.currentSubjects >= teacher.maxSubjects) return false
    if (teacher.assignedSubjects.some(s => s.subjectId === subjectId)) return false

    const assignment: AssignedSubject = {
      subjectId: subject.id,
      subjectName: subject.name,
      subjectCode: subject.code,
      semester: subject.semester,
      enrolledStudents: Math.floor(Math.random() * 50) + 20, // Mock enrollment
      maxCapacity: 60,
      assignedAt: new Date().toISOString()
    }

    setTeachers(prev => prev.map(t => 
      t.id === teacherId 
        ? {
            ...t,
            assignedSubjects: [...t.assignedSubjects, assignment],
            currentSubjects: t.currentSubjects + 1
          }
        : t
    ))
    return true
  }, [subjects, teachers, setTeachers])

  const deallocateSubject = useCallback((teacherId: string, subjectId: string) => {
    setTeachers(prev => prev.map(teacher => 
      teacher.id === teacherId
        ? {
            ...teacher,
            assignedSubjects: teacher.assignedSubjects.filter(s => s.subjectId !== subjectId),
            currentSubjects: teacher.currentSubjects - 1
          }
        : teacher
    ))
  }, [setTeachers])

  // Branch Management
  const addBranch = useCallback((branch: Omit<Branch, 'id' | 'createdAt'>) => {
    const newBranch: Branch = {
      ...branch,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    }
    setBranches(prev => [...prev, newBranch])
    return newBranch
  }, [setBranches])

  const updateBranch = useCallback((id: string, updates: Partial<Branch>) => {
    setBranches(prev => prev.map(branch => 
      branch.id === id ? { ...branch, ...updates } : branch
    ))
  }, [setBranches])

  // Course Planning
  const createCoursePlan = useCallback((plan: Omit<CoursePlan, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newPlan: CoursePlan = {
      ...plan,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    setCoursePlans(prev => [...prev, newPlan])
    return newPlan
  }, [setCoursePlans])

  const updateCoursePlan = useCallback((id: string, updates: Partial<CoursePlan>) => {
    setCoursePlans(prev => prev.map(plan => 
      plan.id === id 
        ? { ...plan, ...updates, updatedAt: new Date().toISOString() }
        : plan
    ))
  }, [setCoursePlans])

  // Statistics
  const statistics = useMemo(() => ({
    totalSubjects: subjects.length,
    activeSubjects: subjects.filter(s => s.status === 'Active').length,
    totalTeachers: teachers.length,
    activeTeachers: teachers.filter(t => t.status === 'Active').length,
    totalBranches: branches.length,
    activeBranches: branches.filter(b => b.status === 'Active').length,
    totalStudents: branches.reduce((sum, branch) => sum + branch.currentStudents, 0),
    allocatedSubjects: teachers.reduce((sum, teacher) => sum + teacher.currentSubjects, 0),
    unassignedSubjects: subjects.length - teachers.reduce((sum, teacher) => sum + teacher.currentSubjects, 0),
    averageSubjectsPerTeacher: teachers.length > 0 
      ? teachers.reduce((sum, teacher) => sum + teacher.currentSubjects, 0) / teachers.length 
      : 0
  }), [subjects, teachers, branches])

  // Filtered data helpers
  const getSubjectsByBranch = useCallback((branch: string) => 
    subjects.filter(subject => subject.branch === branch), [subjects])

  const getSubjectsBySemester = useCallback((semester: number) => 
    subjects.filter(subject => subject.semester === semester), [subjects])

  const getTeachersByDepartment = useCallback((department: string) => 
    teachers.filter(teacher => teacher.department === department), [teachers])

  const getAvailableSubjects = useCallback(() => 
    subjects.filter(subject => {
      const assignedCount = teachers.reduce((count, teacher) => 
        count + teacher.assignedSubjects.filter(s => s.subjectId === subject.id).length, 0)
      return assignedCount === 0 && subject.status === 'Active'
    }), [subjects, teachers])

  return {
    // Data
    subjects,
    teachers,
    branches,
    coursePlans,
    settings,
    statistics,
    
    // Subject actions
    addSubject,
    updateSubject,
    deleteSubject,
    
    // Teacher actions
    addTeacher,
    updateTeacher,
    deleteTeacher,
    
    // Allocation actions
    allocateSubject,
    deallocateSubject,
    
    // Branch actions
    addBranch,
    updateBranch,
    
    // Course planning actions
    createCoursePlan,
    updateCoursePlan,
    
    // Settings
    updateSettings: setSettings,
    
    // Helpers
    getSubjectsByBranch,
    getSubjectsBySemester,
    getTeachersByDepartment,
    getAvailableSubjects
  }
}