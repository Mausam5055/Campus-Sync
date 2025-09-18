import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { PublicRoute } from '@/components/PublicRoute'
import Auth from '@/pages/Auth'
import ParentComingSoon from '@/pages/ParentComingSoon'

export const PublicRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={
        <PublicRoute>
          <Auth />
        </PublicRoute>
      } />
      <Route path="/parent" element={
        <PublicRoute>
          <ParentComingSoon />
        </PublicRoute>
      } />
    </Routes>
  )
}