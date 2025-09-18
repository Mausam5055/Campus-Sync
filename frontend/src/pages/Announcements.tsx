import React from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { SEO } from '@/components/SEO'
import { StudentAnnouncements } from '@/components/announcements/StudentAnnouncements'
import { TeacherAnnouncements } from '@/components/announcements/TeacherAnnouncements'
import { AdminAnnouncements } from '@/components/announcements/AdminAnnouncements'

const Announcements: React.FC = () => {
  const { user } = useAuth()
  const role = user?.role || 'student'

  const renderAnnouncementsByRole = () => {
    switch (role) {
      case 'admin':
        return <AdminAnnouncements />
      case 'teacher':
        return <TeacherAnnouncements />
      case 'student':
      default:
        return <StudentAnnouncements />
    }
  }

  return (
    <>
      <SEO 
        title="Announcements - CampusSync"
        description="Stay updated with the latest announcements, notices, and important updates from your institution."
        keywords="announcements, notices, updates, school announcements, campus news"
      />
      <div className="container mx-auto p-4 max-w-7xl">
        {renderAnnouncementsByRole()}
      </div>
    </>
  )
}

export default Announcements