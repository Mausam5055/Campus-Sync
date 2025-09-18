import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Clock, MapPin, Users, BookOpen, FileText, Eye } from 'lucide-react';
import { ExamDetailDialog } from './ExamDetailDialog';
import { StudentListDialog } from './StudentListDialog';
import { useToast } from '@/hooks/use-toast';
import { format, isToday, isFuture, isPast } from 'date-fns';
import type { Exam } from '@/types/exam';

interface TeacherExamViewProps {
  teacherId: string;
  teacherSubjects: string[];
}

export const TeacherExamView: React.FC<TeacherExamViewProps> = ({
  teacherId,
  teacherSubjects
}) => {
  const { toast } = useToast();
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [isStudentListOpen, setIsStudentListOpen] = useState(false);

  // Mock data - replace with actual API calls filtered by teacher
  const [exams] = useState<Exam[]>([
    {
      id: '1',
      course: 'Data Structures and Algorithms',
      courseCode: 'CSE201',
      semester: 3,
      branch: 'CSE',
      examType: 'midterm',
      date: '2024-08-15',
      time: '09:00',
      duration: 180,
      location: 'Hall A',
      maxMarks: 100,
      instructor: 'Dr. Smith',
      instructorId: teacherId,
      topics: ['Arrays', 'Linked Lists', 'Stacks', 'Queues'],
      status: 'scheduled',
      createdAt: '2024-07-01',
      updatedAt: '2024-07-01',
      createdBy: 'admin_001'
    },
    {
      id: '2',
      course: 'Database Management Systems',
      courseCode: 'CSE301',
      semester: 5,
      branch: 'CSE',
      examType: 'endterm',
      date: '2024-08-20',
      time: '14:00',
      duration: 180,
      location: 'Hall B',
      maxMarks: 100,
      instructor: 'Dr. Smith',
      instructorId: teacherId,
      topics: ['SQL', 'Normalization', 'Transactions', 'Indexing'],
      status: 'scheduled',
      createdAt: '2024-07-01',
      updatedAt: '2024-07-01',
      createdBy: 'admin_001'
    },
    {
      id: '3',
      course: 'Computer Networks',
      courseCode: 'CSE401',
      semester: 7,
      branch: 'CSE',
      examType: 'practical',
      date: '2024-07-10',
      time: '10:00',
      duration: 120,
      location: 'Lab 3',
      maxMarks: 50,
      instructor: 'Dr. Smith',
      instructorId: teacherId,
      topics: ['Packet Analysis', 'Network Configuration'],
      status: 'completed',
      createdAt: '2024-06-01',
      updatedAt: '2024-07-10',
      createdBy: 'admin_001'
    }
  ]);

  // Filter exams assigned to this teacher
  const teacherExams = useMemo(() => 
    exams.filter(exam => exam.instructorId === teacherId),
    [exams, teacherId]
  );

  const upcomingExams = useMemo(() => 
    teacherExams.filter(exam => {
      const examDate = new Date(exam.date);
      return isFuture(examDate) || isToday(examDate);
    }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()),
    [teacherExams]
  );

  const todayExams = useMemo(() => 
    teacherExams.filter(exam => isToday(new Date(exam.date))),
    [teacherExams]
  );

  const completedExams = useMemo(() => 
    teacherExams.filter(exam => exam.status === 'completed' || isPast(new Date(exam.date))),
    [teacherExams]
  );

  const examStats = useMemo(() => ({
    total: teacherExams.length,
    upcoming: upcomingExams.length,
    today: todayExams.length,
    completed: completedExams.length
  }), [teacherExams, upcomingExams, todayExams, completedExams]);

  const getStatusColor = (exam: Exam) => {
    const examDate = new Date(exam.date);
    if (isToday(examDate)) return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
    if (exam.status === 'completed') return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    if (isFuture(examDate)) return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
    return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
  };

  const getExamTypeColor = (type: Exam['examType']) => {
    switch (type) {
      case 'endterm':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'midterm':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 'sessional':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'practical':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const handleViewDetails = (exam: Exam) => {
    setSelectedExam(exam);
    setIsDetailDialogOpen(true);
  };

  const handleViewStudents = (exam: Exam) => {
    setSelectedExam(exam);
    setIsStudentListOpen(true);
  };

  const formatDateTime = (date: string, time: string) => {
    try {
      const examDate = new Date(`${date}T${time}`);
      return {
        date: format(examDate, 'MMM dd, yyyy'),
        time: format(examDate, 'hh:mm a'),
        weekday: format(examDate, 'EEEE')
      };
    } catch {
      return { date: date, time: time, weekday: '' };
    }
  };

  const ExamCard: React.FC<{ exam: Exam }> = ({ exam }) => {
    const dateTime = formatDateTime(exam.date, exam.time);
    const isExamToday = isToday(new Date(exam.date));
    
    return (
      <Card className={`transition-all duration-200 hover:shadow-md ${isExamToday ? 'ring-2 ring-orange-200 dark:ring-orange-800' : ''}`}>
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="space-y-3">
              <div>
                <h3 className="font-semibold text-lg">{exam.course}</h3>
                <p className="text-sm text-muted-foreground">{exam.courseCode} • Semester {exam.semester}</p>
              </div>
              
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{dateTime.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{dateTime.time}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{exam.location}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Badge className={getExamTypeColor(exam.examType)}>
                  {exam.examType.charAt(0).toUpperCase() + exam.examType.slice(1)}
                </Badge>
                <Badge className={getStatusColor(exam)}>
                  {isExamToday ? 'Today' : exam.status.charAt(0).toUpperCase() + exam.status.slice(1)}
                </Badge>
                <Badge variant="outline">
                  {exam.branch}
                </Badge>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleViewDetails(exam)}
                className="flex items-center gap-2"
              >
                <Eye className="h-4 w-4" />
                Details
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleViewStudents(exam)}
                className="flex items-center gap-2"
              >
                <Users className="h-4 w-4" />
                Students
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <BookOpen className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">My Exam Schedule</h1>
          <p className="text-muted-foreground">View and manage your assigned exams</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{examStats.total}</div>
            <p className="text-xs text-muted-foreground">Total Exams</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-orange-600">{examStats.today}</div>
            <p className="text-xs text-muted-foreground">Today</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-blue-600">{examStats.upcoming}</div>
            <p className="text-xs text-muted-foreground">Upcoming</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-600">{examStats.completed}</div>
            <p className="text-xs text-muted-foreground">Completed</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="upcoming" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="upcoming">Upcoming ({upcomingExams.length})</TabsTrigger>
          <TabsTrigger value="today">Today ({todayExams.length})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({completedExams.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4">
          {upcomingExams.length === 0 ? (
            <Card>
              <CardContent className="py-8">
                <div className="text-center text-muted-foreground">
                  <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-medium">No upcoming exams</p>
                  <p>You don't have any exams scheduled in the near future</p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {upcomingExams.map(exam => (
                <ExamCard key={exam.id} exam={exam} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="today" className="space-y-4">
          {todayExams.length === 0 ? (
            <Card>
              <CardContent className="py-8">
                <div className="text-center text-muted-foreground">
                  <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-medium">No exams today</p>
                  <p>You don't have any exams scheduled for today</p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {todayExams.map(exam => (
                <ExamCard key={exam.id} exam={exam} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          {completedExams.length === 0 ? (
            <Card>
              <CardContent className="py-8">
                <div className="text-center text-muted-foreground">
                  <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-medium">No completed exams</p>
                  <p>Your completed exams will appear here</p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {completedExams.map(exam => (
                <ExamCard key={exam.id} exam={exam} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Dialogs */}
      {selectedExam && (
        <>
          <ExamDetailDialog
            exam={selectedExam}
            isOpen={isDetailDialogOpen}
            onClose={() => {
              setIsDetailDialogOpen(false);
              setSelectedExam(null);
            }}
          />
          <StudentListDialog
            exam={selectedExam}
            isOpen={isStudentListOpen}
            onClose={() => {
              setIsStudentListOpen(false);
              setSelectedExam(null);
            }}
          />
        </>
      )}
    </div>
  );
};