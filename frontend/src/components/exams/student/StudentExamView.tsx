import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Clock, MapPin, BookOpen, Target, AlertTriangle } from 'lucide-react';
import { format, isToday, isFuture, differenceInDays } from 'date-fns';
import type { Exam } from '@/types/exam';

interface StudentExamViewProps {
  studentId: string;
  studentSemester: number;
  studentBranch: string;
}

export const StudentExamView: React.FC<StudentExamViewProps> = ({
  studentId,
  studentSemester,
  studentBranch
}) => {
  // Mock data filtered by student semester and branch
  const [exams] = useState<Exam[]>([
    {
      id: '1',
      course: 'Data Structures and Algorithms',
      courseCode: 'CSE201',
      semester: studentSemester,
      branch: studentBranch,
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
    },
    {
      id: '2',
      course: 'Database Management Systems',
      courseCode: 'CSE301',
      semester: studentSemester,
      branch: studentBranch,
      examType: 'endterm',
      date: '2024-08-20',
      time: '14:00',
      duration: 180,
      location: 'Hall B',
      maxMarks: 100,
      instructor: 'Dr. Johnson',
      instructorId: 'inst_002',
      topics: ['SQL', 'Normalization', 'Transactions'],
      status: 'scheduled',
      createdAt: '2024-07-01',
      updatedAt: '2024-07-01',
      createdBy: 'admin_001'
    }
  ]);

  const upcomingExams = useMemo(() => 
    exams.filter(exam => isFuture(new Date(exam.date)) || isToday(new Date(exam.date)))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()),
    [exams]
  );

  const completedExams = useMemo(() => 
    exams.filter(exam => exam.status === 'completed'),
    [exams]
  );

  const ExamCard: React.FC<{ exam: Exam }> = ({ exam }) => {
    const examDate = new Date(exam.date);
    const daysUntil = differenceInDays(examDate, new Date());
    const isExamToday = isToday(examDate);
    
    return (
      <Card className={isExamToday ? 'ring-2 ring-orange-200' : ''}>
        <CardContent className="p-6">
          <div className="flex justify-between items-start">
            <div className="space-y-3">
              <div>
                <h3 className="font-semibold text-lg">{exam.course}</h3>
                <p className="text-sm text-muted-foreground">{exam.courseCode}</p>
              </div>
              
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{format(examDate, 'MMM dd, yyyy')}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{format(new Date(`2024-01-01T${exam.time}`), 'hh:mm a')}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{exam.location}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Badge variant={exam.examType === 'endterm' ? 'destructive' : 'secondary'}>
                  {exam.examType.charAt(0).toUpperCase() + exam.examType.slice(1)}
                </Badge>
                {isExamToday && <Badge variant="outline">Today</Badge>}
                {daysUntil <= 7 && daysUntil > 0 && (
                  <Badge variant="outline" className="text-orange-600">
                    {daysUntil} days left
                  </Badge>
                )}
              </div>

              {exam.topics.length > 0 && (
                <div className="text-sm">
                  <p className="text-muted-foreground mb-1">Topics:</p>
                  <div className="flex flex-wrap gap-1">
                    {exam.topics.slice(0, 3).map((topic, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {topic}
                      </Badge>
                    ))}
                    {exam.topics.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{exam.topics.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="text-right">
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Target className="h-4 w-4" />
                <span>{exam.maxMarks} marks</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">{exam.instructor}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <BookOpen className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">My Exams</h1>
          <p className="text-muted-foreground">Semester {studentSemester} • {studentBranch}</p>
        </div>
      </div>

      <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{exams.length}</div>
            <p className="text-xs text-muted-foreground">Total Exams</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-blue-600">{upcomingExams.length}</div>
            <p className="text-xs text-muted-foreground">Upcoming</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-600">{completedExams.length}</div>
            <p className="text-xs text-muted-foreground">Completed</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-orange-600">
              {upcomingExams.filter(exam => isToday(new Date(exam.date))).length}
            </div>
            <p className="text-xs text-muted-foreground">Today</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="upcoming">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upcoming">Upcoming ({upcomingExams.length})</TabsTrigger>
          <TabsTrigger value="completed">Results ({completedExams.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4">
          {upcomingExams.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">
                <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium">No upcoming exams</p>
                <p>Your exam schedule will appear here</p>
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

        <TabsContent value="completed">
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              <Target className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium">No results yet</p>
              <p>Your exam results will appear here</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};