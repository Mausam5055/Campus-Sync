import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Calendar, Users, BookOpen, Settings } from 'lucide-react';
import { CreateExamDialog } from './CreateExamDialog';
import { ExamScheduleTable } from './ExamScheduleTable';
import { SemesterManager } from './SemesterManager';
import { ExamSlotManager } from './ExamSlotManager';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import type { Exam, Semester, ExamSlot } from '@/types/exam';

export const AdminExamManagement: React.FC = () => {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedSemester, setSelectedSemester] = useState<number>(1);
  
  // Mock data - replace with actual API calls
  const [semesters] = useState<Semester[]>([
    {
      id: 1,
      name: '1st Semester',
      startDate: '2024-07-01',
      endDate: '2024-11-30',
      isActive: true,
      examTypes: ['midterm', 'endterm', 'sessional', 'practical'],
      branches: ['CSE', 'ECE', 'ME', 'CE']
    },
    {
      id: 2,
      name: '2nd Semester',
      startDate: '2024-12-01',
      endDate: '2025-04-30',
      isActive: false,
      examTypes: ['midterm', 'endterm', 'sessional', 'practical'],
      branches: ['CSE', 'ECE', 'ME', 'CE']
    }
  ]);

  const [exams, setExams] = useState<Exam[]>([
    {
      id: '1',
      course: 'Data Structures and Algorithms',
      courseCode: 'CSE201',
      semester: 1,
      branch: 'CSE',
      examType: 'midterm',
      date: '2024-08-15',
      time: '09:00',
      duration: 180,
      location: 'Hall A',
      maxMarks: 100,
      instructor: 'Dr. Smith',
      instructorId: 'inst_001',
      topics: ['Arrays', 'Linked Lists', 'Stacks', 'Queues'],
      status: 'scheduled',
      createdAt: '2024-07-01',
      updatedAt: '2024-07-01',
      createdBy: 'admin_001'
    }
  ]);

  const [slots, setSlots] = useState<ExamSlot[]>([
    {
      id: 'slot_1',
      date: '2024-08-15',
      timeSlot: '09:00-12:00',
      location: 'Hall A',
      capacity: 120,
      isAvailable: false,
      examId: '1'
    },
    {
      id: 'slot_2',
      date: '2024-08-15',
      timeSlot: '14:00-17:00',
      location: 'Hall A',
      capacity: 120,
      isAvailable: true
    }
  ]);

  const handleCreateExam = (examData: Omit<Exam, 'id' | 'createdAt' | 'updatedAt' | 'createdBy'>) => {
    const newExam: Exam = {
      ...examData,
      id: `exam_${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: 'admin_001' // Replace with actual admin ID
    };
    
    setExams(prev => [...prev, newExam]);
    toast({
      title: 'Exam Created',
      description: `${examData.course} exam has been scheduled successfully.`
    });
  };

  const handleDeleteExam = (examId: string) => {
    setExams(prev => prev.filter(exam => exam.id !== examId));
    // Free up the slot
    setSlots(prev => prev.map(slot => 
      slot.examId === examId 
        ? { ...slot, examId: undefined, isAvailable: true }
        : slot
    ));
    toast({
      title: 'Exam Deleted',
      description: 'Exam has been removed from the schedule.'
    });
  };

  const handleUpdateExam = (updatedExam: Exam) => {
    setExams(prev => prev.map(exam => 
      exam.id === updatedExam.id ? updatedExam : exam
    ));
    toast({
      title: 'Exam Updated',
      description: `${updatedExam.course} exam has been updated successfully.`
    });
  };

  const semesterExams = useMemo(() => 
    exams.filter(exam => exam.semester === selectedSemester),
    [exams, selectedSemester]
  );

  const examStats = useMemo(() => ({
    total: exams.length,
    scheduled: exams.filter(e => e.status === 'scheduled').length,
    completed: exams.filter(e => e.status === 'completed').length,
    ongoing: exams.filter(e => e.status === 'ongoing').length
  }), [exams]);

  return (
    <div className="space-y-4 sm:space-y-6 p-4 sm:p-0">
      {/* Header */}
      <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Calendar className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">Exam Management</h1>
            <p className="text-sm sm:text-base text-muted-foreground">Create and manage semester-based exams</p>
          </div>
        </div>
        <Button 
          onClick={() => setIsCreateDialogOpen(true)} 
          className="flex items-center gap-2 w-full sm:w-auto"
          size={isMobile ? "default" : "default"}
        >
          <Plus className="h-4 w-4" />
          {isMobile ? "Schedule" : "Schedule Exam"}
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="pt-4 sm:pt-6">
            <div className="text-xl sm:text-2xl font-bold">{examStats.total}</div>
            <p className="text-xs text-muted-foreground">Total Exams</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 sm:pt-6">
            <div className="text-xl sm:text-2xl font-bold text-blue-600">{examStats.scheduled}</div>
            <p className="text-xs text-muted-foreground">Scheduled</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 sm:pt-6">
            <div className="text-xl sm:text-2xl font-bold text-green-600">{examStats.completed}</div>
            <p className="text-xs text-muted-foreground">Completed</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 sm:pt-6">
            <div className="text-xl sm:text-2xl font-bold text-orange-600">{examStats.ongoing}</div>
            <p className="text-xs text-muted-foreground">Ongoing</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="schedule" className="space-y-4">
        <TabsList className={`grid w-full ${isMobile ? 'grid-cols-2' : 'grid-cols-4'}`}>
          <TabsTrigger value="schedule" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Schedule
          </TabsTrigger>
          {isMobile ? (
            <TabsTrigger value="more" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              More
            </TabsTrigger>
          ) : (
            <>
              <TabsTrigger value="slots" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Slots
              </TabsTrigger>
              <TabsTrigger value="semesters" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Semesters
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Analytics
              </TabsTrigger>
            </>
          )}
        </TabsList>

        <TabsContent value="schedule" className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium whitespace-nowrap">Semester:</label>
              <select 
                value={selectedSemester} 
                onChange={(e) => setSelectedSemester(Number(e.target.value))}
                className="flex-1 sm:flex-none px-3 py-1 border rounded-md text-sm bg-background"
              >
                {semesters.map(sem => (
                  <option key={sem.id} value={sem.id}>{sem.name}</option>
                ))}
              </select>
            </div>
            <Badge variant={semesters.find(s => s.id === selectedSemester)?.isActive ? 'default' : 'secondary'}>
              {semesters.find(s => s.id === selectedSemester)?.isActive ? 'Active' : 'Inactive'}
            </Badge>
          </div>
          <ExamScheduleTable 
            exams={semesterExams} 
            slots={slots}
            semesters={semesters}
            onDeleteExam={handleDeleteExam}
            onUpdateExam={handleUpdateExam}
          />
        </TabsContent>

        {isMobile ? (
          <TabsContent value="more" className="space-y-4">
            <div className="grid gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Exam Slots
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ExamSlotManager slots={slots} onSlotsUpdate={setSlots} />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Semesters
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <SemesterManager semesters={semesters} />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Analytics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Analytics dashboard coming soon...</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        ) : (
          <>
            <TabsContent value="slots">
              <ExamSlotManager slots={slots} onSlotsUpdate={setSlots} />
            </TabsContent>

            <TabsContent value="semesters">
              <SemesterManager semesters={semesters} />
            </TabsContent>

            <TabsContent value="analytics">
              <Card>
                <CardHeader>
                  <CardTitle>Exam Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Analytics dashboard coming soon...</p>
                </CardContent>
              </Card>
            </TabsContent>
          </>
        )}
      </Tabs>

      <CreateExamDialog
        isOpen={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        onSave={handleCreateExam}
        semesters={semesters}
        availableSlots={slots.filter(slot => slot.isAvailable)}
      />
    </div>
  );
};