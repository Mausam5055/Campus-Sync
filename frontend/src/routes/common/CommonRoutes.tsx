import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Index from '@/pages/Index.tsx'
import NotFound from '@/pages/NotFound.tsx'

// Academic & Core Features
import SmartTimetable from '@/pages/SmartTimetable'
import MyCourses from '@/pages/MyCourses'
import CourseCatalog from '@/pages/CourseCatalog'
import Assignments from '@/pages/Assignments'
import ClassSchedule from '@/pages/ClassSchedule'
import ExamSchedule from '@/pages/ExamSchedule'
import Events from '@/pages/Events'

// Productivity Tools
import Pomodoro from '@/pages/Pomodoro'
import Calculators from '@/pages/Calculators'
import Tasks from '@/pages/Tasks'
import Notes from '@/pages/Notes'

// Lifestyle & Wellness
import MusicPlayer from '@/pages/MusicPlayer'
import Fitness from '@/pages/Fitness'
import Meditation from '@/pages/Meditation'
import Motivation from '@/pages/Motivation'

// Financial & Social
import Expenses from '@/pages/Expenses'
import Community from '@/pages/Community'

// Information & Learning
import AskAI from '@/pages/AskAI'
import News from '@/pages/News'
import Wikipedia from '@/pages/Wikipedia'
import Blog from '@/pages/Blog'
import BlogPost from '@/pages/BlogPost'
import Announcements from '@/pages/Announcements'

// Profile & Settings
import StudentProfile from '@/pages/StudentProfile'
import AcademicProgress from '@/pages/AcademicProgress'
import ViewMarks from '@/pages/ViewMarks'
import StudentID from '@/pages/StudentID'
import BillingPayments from '@/pages/BillingPayments'

// About
import AboutUs from '@/pages/AboutUs'
import StudentAttendance from '@/pages/StudentAttendance'

export const CommonRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Dashboard */}
      <Route path="/" element={<Index />} />
      
      {/* Academic & Core Features */}
      <Route path="/timetable" element={<SmartTimetable />} />
      <Route path="/courses/my-courses" element={<MyCourses />} />
      <Route path="/courses/catalog" element={<CourseCatalog />} />
      <Route path="/courses/assignments" element={<Assignments />} />
      <Route path="/schedule/classes" element={<ClassSchedule />} />
      <Route path="/schedule/exams" element={<ExamSchedule />} />
      <Route path="/schedule/events" element={<Events />} />
      
      {/* Productivity Tools */}
      <Route path="/pomodoro" element={<Pomodoro />} />
      <Route path="/calculators" element={<Calculators />} />
      <Route path="/tasks" element={<Tasks />} />
      <Route path="/notes" element={<Notes />} />
      
      {/* Lifestyle & Wellness */}
      <Route path="/music" element={<MusicPlayer />} />
      <Route path="/fitness" element={<Fitness />} />
      <Route path="/meditation" element={<Meditation />} />
      <Route path="/motivation" element={<Motivation />} />
      
      {/* Financial & Social */}
      <Route path="/expenses" element={<Expenses />} />
      <Route path="/community" element={<Community />} />
      
      {/* Information & Learning */}
      <Route path="/ask-ai" element={<AskAI />} />
      <Route path="/news" element={<News />} />
      <Route path="/wikipedia" element={<Wikipedia />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:id" element={<BlogPost />} />
      
      {/* Profile & Settings */}
      <Route path="/student-profile" element={<StudentProfile />} />
      <Route path="/academic-progress" element={<AcademicProgress />} />
      <Route path="/view-marks" element={<ViewMarks />} />
      <Route path="/student-id" element={<StudentID />} />
      <Route path="/billing-payments" element={<BillingPayments />} />
      
      {/* About */}
      <Route path="/about" element={<AboutUs />} />
      
      {/* Announcements */}
      <Route path="/announcements" element={<Announcements />} />
      
      {/* Attendance */}
      <Route path="/attendance/student" element={<StudentAttendance />} />
      
      {/* Catch-all route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}