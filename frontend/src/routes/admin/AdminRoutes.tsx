import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { RoleRoute } from '@/components/RoleRoute'
import AdminProfile from '@/pages/AdminProfile'
import ManageStudents from '@/pages/ManageStudents'
import ManageTeachers from '@/pages/ManageTeachers'
import BranchStudentsOverview from '@/pages/BranchStudentsOverview'
import BranchTeachersOverview from '@/pages/BranchTeachersOverview'
import BranchStudents from '@/pages/BranchStudents'
import BranchTeachers from '@/pages/BranchTeachers'
import AdminID from '@/pages/AdminID'
import AdminBilling from '@/pages/AdminBilling'
import StudentBilling from '@/pages/StudentBilling'
import Announcements from '@/pages/Announcements'
import Index from '@/pages/Index.tsx'
import SubjectManagement from '@/pages/admin/SubjectManagement'
import CoursePlanning from '@/pages/admin/CoursePlanning'
import SubjectAllocation from '@/pages/admin/SubjectAllocation'
import AcademicStructure from '@/pages/admin/AcademicStructure'
import AdminOverview from '@/pages/AdminOverview'

export const AdminRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Default admin dashboard */}
      <Route path="/" element={
        <RoleRoute allowedRoles={['admin']}>
          <Index />
        </RoleRoute>
      } />
      <Route path="/profile" element={
        <RoleRoute allowedRoles={['admin']}>
          <AdminProfile />
        </RoleRoute>
      } />
      <Route path="/manage-students" element={
        <RoleRoute allowedRoles={['admin']}>
          <ManageStudents />
        </RoleRoute>
      } />
      <Route path="/manage-teachers" element={
        <RoleRoute allowedRoles={['admin']}>
          <ManageTeachers />
        </RoleRoute>
      } />
      <Route path="/branch-students-overview" element={
        <RoleRoute allowedRoles={['admin']}>
          <BranchStudentsOverview />
        </RoleRoute>
      } />
      <Route path="/branch-teachers-overview" element={
        <RoleRoute allowedRoles={['admin']}>
          <BranchTeachersOverview />
        </RoleRoute>
      } />
      <Route path="/branch-students/:branch" element={
        <RoleRoute allowedRoles={['admin']}>
          <BranchStudents />
        </RoleRoute>
      } />
      <Route path="/branch-teachers/:branch" element={
        <RoleRoute allowedRoles={['admin']}>
          <BranchTeachers />
        </RoleRoute>
      } />
      <Route path="/id" element={
        <RoleRoute allowedRoles={['admin']}>
          <AdminID />
        </RoleRoute>
      } />
      <Route path="/billing" element={
        <RoleRoute allowedRoles={['admin']}>
          <AdminBilling />
        </RoleRoute>
      } />
      <Route path="/student-billing" element={
        <RoleRoute allowedRoles={['admin']}>
          <StudentBilling />
        </RoleRoute>
      } />
      <Route path="/announcements" element={
        <RoleRoute allowedRoles={['admin']}>
          <Announcements />
        </RoleRoute>
      } />
      <Route path="/subjects" element={
        <RoleRoute allowedRoles={['admin']}>
          <SubjectManagement />
        </RoleRoute>
      } />
      <Route path="/course-planning" element={
        <RoleRoute allowedRoles={['admin']}>
          <CoursePlanning />
        </RoleRoute>
      } />
      <Route path="/subject-allocation" element={
        <RoleRoute allowedRoles={['admin']}>
          <SubjectAllocation />
        </RoleRoute>
      } />
      <Route path="/academic-structure" element={
        <RoleRoute allowedRoles={['admin']}>
          <AcademicStructure />
        </RoleRoute>
      } />
      <Route path="/overview" element={
        <RoleRoute allowedRoles={['admin']}>
          <AdminOverview />
        </RoleRoute>
      } />
    </Routes>
  )
}