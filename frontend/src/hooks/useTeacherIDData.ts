import { useState, useEffect } from 'react'

export interface TeacherIDData {
  employeeId: string
  department: string
  joiningYear: string
  validUntil: string
  bloodGroup: string
  emergencyContact: string
  officeRoom: string
  facultyId: string
}

const defaultData: TeacherIDData = {
  employeeId: '',
  department: '',
  joiningYear: '',
  validUntil: '',
  bloodGroup: '',
  emergencyContact: '',
  officeRoom: '',
  facultyId: ''
}

export const useTeacherIDData = () => {
  const [idData, setIDData] = useState<TeacherIDData>(defaultData)

  useEffect(() => {
    const saved = localStorage.getItem('campussync-teacher-id-data')
    if (saved) {
      try { setIDData({ ...defaultData, ...JSON.parse(saved) }) } catch {}
    }
  }, [])

  const updateIDData = (patch: Partial<TeacherIDData>) => {
    const next = { ...idData, ...patch }
    setIDData(next)
    localStorage.setItem('campussync-teacher-id-data', JSON.stringify(next))
  }

  return { idData, updateIDData }
}
