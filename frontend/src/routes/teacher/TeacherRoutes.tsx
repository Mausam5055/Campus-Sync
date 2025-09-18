import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { RoleRoute } from '@/components/RoleRoute'
import TeacherProfile from '@/pages/TeacherProfile'
import StudentsDetails from '@/pages/StudentsDetails'
import MyClasses from '@/pages/MyClasses'
import UploadMarks from '@/pages/UploadMarks'
import TeacherID from '@/pages/TeacherID'
import TeacherBilling from '@/pages/TeacherBilling'
import TeacherTimetable from '@/pages/TeacherTimetable'
import TeacherAssignments from '@/pages/TeacherAssignments'
import Announcements from '@/pages/Announcements'
import TeacherAttendance from '@/pages/TeacherAttendance'
import Index from '@/pages/Index.tsx'

export const TeacherRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Default teacher dashboard */}
      <Route path="/" element={
        <RoleRoute allowedRoles={['teacher']}>
          <Index />
        </RoleRoute>
      } />
      <Route path="/profile" element={
        <RoleRoute allowedRoles={['teacher']}>
          <TeacherProfile />
        </RoleRoute>
      } />
      <Route path="/my-classes" element={
        <RoleRoute allowedRoles={['teacher']}>
          <MyClasses />
        </RoleRoute>
      } />
      <Route path="/students-details" element={
        <RoleRoute allowedRoles={['teacher']}>
          <StudentsDetails />
        </RoleRoute>
      } />
      <Route path="/upload-marks" element={
        <RoleRoute allowedRoles={['teacher']}>
          <UploadMarks />
        </RoleRoute>
      } />
      <Route path="/id" element={
        <RoleRoute allowedRoles={['teacher']}>
          <TeacherID />
        </RoleRoute>
      } />
      <Route path="/billing" element={
        <RoleRoute allowedRoles={['teacher']}>
          <TeacherBilling />
        </RoleRoute>
      } />
      <Route path="/timetable" element={
        <RoleRoute allowedRoles={['teacher']}>
          <TeacherTimetable />
        </RoleRoute>
      } />
      <Route path="/assignments" element={
        <RoleRoute allowedRoles={['teacher']}>
          <TeacherAssignments />
        </RoleRoute>
      } />
      <Route path="/announcements" element={
        <RoleRoute allowedRoles={['teacher']}>
          <Announcements />
        </RoleRoute>
      } />
      <Route path="/attendance" element={
        <RoleRoute allowedRoles={['teacher']}>
          <TeacherAttendance />
        </RoleRoute>
      } />
    </Routes>
  )
}