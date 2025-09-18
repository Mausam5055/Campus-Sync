import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { PublicRoutes } from './PublicRoutes'
import { ProtectedRoutes } from './ProtectedRoutes'
import ParentComingSoon from '@/pages/ParentComingSoon'

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/auth/*" element={<PublicRoutes />} />
      <Route path="/login" element={<Navigate to="/auth" replace />} />
      <Route path="/mobile-login" element={<Navigate to="/auth" replace />} />
      <Route path="/mobile-signup" element={<Navigate to="/auth?mode=signup" replace />} />
      
      {/* Parent coming soon page */}
      <Route path="/parent" element={<ParentComingSoon />} />
      
      {/* Protected routes */}
      <Route path="/*" element={<ProtectedRoutes />} />
      
      {/* Catch-all route */}
      <Route path="*" element={<Navigate to="/auth" replace />} />
    </Routes>
  )
}