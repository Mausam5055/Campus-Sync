import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Timetable from '@/pages/Timetable';
import TeacherTimetable from '@/pages/TeacherTimetable';

const SmartTimetable = () => {
  const { user } = useAuth();

  // Show appropriate timetable based on user role
  if (user?.role === 'teacher') {
    return <TeacherTimetable />;
  }
  
  // Default to student timetable for students, admins, and others
  return <Timetable />;
};

export default SmartTimetable;