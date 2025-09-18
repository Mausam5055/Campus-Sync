import React, { useState, useMemo } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { AdminExamManagement } from '@/components/exams/admin/AdminExamManagement';
import { TeacherExamView } from '@/components/exams/teacher/TeacherExamView';
import { StudentExamView } from '@/components/exams/student/StudentExamView';
import { usePageLoading } from "@/hooks/use-page-loading";
import { GenericPageSkeleton } from "@/components/ui/page-skeleton";
import { useToast } from '@/hooks/use-toast';

const ExamSchedule = () => {
  const isLoading = usePageLoading();
  const { user } = useAuth();
  const { toast } = useToast();

  if (isLoading) {
    return <GenericPageSkeleton />
  }

  // Role-based rendering
  if (user?.role === 'admin') {
    return <AdminExamManagement />;
  }

  if (user?.role === 'teacher') {
    return (
      <TeacherExamView 
        teacherId={user.id} 
        teacherSubjects={user.subjects || []} 
      />
    );
  }

  if (user?.role === 'student') {
    return (
      <StudentExamView 
        studentId={user.id}
        studentSemester={user.semester || 1}
        studentBranch={user.branch || 'CSE'}
      />
    );
  }

  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Access Denied</h2>
        <p className="text-muted-foreground">You don't have permission to access the exam schedule.</p>
      </div>
    </div>
  );
};

export default ExamSchedule;