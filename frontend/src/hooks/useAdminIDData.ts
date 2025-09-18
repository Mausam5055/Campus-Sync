import { useState, useEffect } from 'react'

export interface AdminIDData {
  adminId: string
  department: string
  validUntil: string
  bloodGroup: string
  emergencyContact: string
  officeRoom: string
}

const defaultData: AdminIDData = {
  adminId: '',
  department: '',
  validUntil: '',
  bloodGroup: '',
  emergencyContact: '',
  officeRoom: ''
}

export const useAdminIDData = () => {
  const [idData, setIDData] = useState<AdminIDData>(defaultData)

  useEffect(() => {
    const saved = localStorage.getItem('campussync-admin-id-data')
    if (saved) {
      try { setIDData({ ...defaultData, ...JSON.parse(saved) }) } catch {}
    }
  }, [])

  const updateIDData = (patch: Partial<AdminIDData>) => {
    const next = { ...idData, ...patch }
    setIDData(next)
    localStorage.setItem('campussync-admin-id-data', JSON.stringify(next))
  }

  return { idData, updateIDData }
}
