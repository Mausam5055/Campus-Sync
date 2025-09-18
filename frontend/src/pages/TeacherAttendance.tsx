import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { TeacherSubjectCard } from '@/components/attendance/teacher/TeacherSubjectCard';
import { AttendanceHistory } from '@/components/attendance/teacher/AttendanceHistory';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calendar, 
  Clock, 
  Users, 
  BookOpen, 
  CheckCircle,
  AlertCircle,
  TrendingUp,
  History
} from 'lucide-react';
import { SEO } from '@/components/SEO';
import { TeacherSubject } from '@/types/attendance';
import { toast } from 'sonner';

const TeacherAttendance: React.FC = () => {
  const { user } = useAuth();
  const [subjects, setSubjects] = useState<TeacherSubject[]>([]);
  const [loading, setLoading] = useState(true);
  const [todayClasses, setTodayClasses] = useState<any[]>([]);
  const [attendanceHistory, setAttendanceHistory] = useState<Record<string, any[]>>({});

  // Mock data - replace with actual API calls
  useEffect(() => {
    const fetchSubjects = async () => {
      setLoading(true);
      
      // Mock API call
      setTimeout(() => {
        const mockSubjects: TeacherSubject[] = [
          {
            id: 'sub1',
            name: 'Data Structures and Algorithms',
            code: 'CS301',
            semester: 3,
            branch: 'Computer Science Engineering',
            slots: [
              {
                id: 'slot1',
                day: 'Monday',
                startTime: '09:00',
                endTime: '10:00',
                type: 'lecture'
              },
              {
                id: 'slot2',
                day: 'Wednesday',
                startTime: '11:00',
                endTime: '12:00',
                type: 'lecture'
              },
              {
                id: 'slot3',
                day: 'Friday',
                startTime: '14:00',
                endTime: '17:00',
                type: 'lab'
              }
            ],
            enrolledStudents: [
              {
                id: 'std1',
                name: 'Alice Johnson',
                email: 'alice@university.edu',
                semester: 3,
                branch: 'Computer Science Engineering',
                rollNumber: 'CS21001'
              },
              {
                id: 'std2',
                name: 'Bob Smith',
                email: 'bob@university.edu',
                semester: 3,
                branch: 'Computer Science Engineering',
                rollNumber: 'CS21002'
              },
              {
                id: 'std3',
                name: 'Carol Davis',
                email: 'carol@university.edu',
                semester: 3,
                branch: 'Computer Science Engineering',
                rollNumber: 'CS21003'
              },
              {
                id: 'std4',
                name: 'David Wilson',
                email: 'david@university.edu',
                semester: 3,
                branch: 'Computer Science Engineering',
                rollNumber: 'CS21004'
              },
              {
                id: 'std5',
                name: 'Eva Brown',
                email: 'eva@university.edu',
                semester: 3,
                branch: 'Computer Science Engineering',
                rollNumber: 'CS21005'
              }
            ]
          },
          {
            id: 'sub2',
            name: 'Database Management Systems',
            code: 'CS302',
            semester: 3,
            branch: 'Computer Science Engineering',
            slots: [
              {
                id: 'slot4',
                day: 'Tuesday',
                startTime: '10:00',
                endTime: '11:00',
                type: 'lecture'
              },
              {
                id: 'slot5',
                day: 'Thursday',
                startTime: '15:00',
                endTime: '16:00',
                type: 'lecture'
              }
            ],
            enrolledStudents: [
              {
                id: 'std1',
                name: 'Alice Johnson',
                email: 'alice@university.edu',
                semester: 3,
                branch: 'Computer Science Engineering',
                rollNumber: 'CS21001'
              },
              {
                id: 'std2',
                name: 'Bob Smith',
                email: 'bob@university.edu',
                semester: 3,
                branch: 'Computer Science Engineering',
                rollNumber: 'CS21002'
              },
              {
                id: 'std6',
                name: 'Frank Miller',
                email: 'frank@university.edu',
                semester: 3,
                branch: 'Computer Science Engineering',
                rollNumber: 'CS21006'
              }
            ]
          },
          {
            id: 'sub3',
            name: 'Web Development',
            code: 'CS304',
            semester: 4,
            branch: 'Computer Science Engineering',
            slots: [
              {
                id: 'slot6',
                day: 'Monday',
                startTime: '14:00',
                endTime: '15:00',
                type: 'lecture'
              },
              {
                id: 'slot7',
                day: 'Wednesday',
                startTime: '16:00',
                endTime: '19:00',
                type: 'lab'
              }
            ],
            enrolledStudents: [
              {
                id: 'std7',
                name: 'Grace Lee',
                email: 'grace@university.edu',
                semester: 4,
                branch: 'Computer Science Engineering',
                rollNumber: 'CS20001'
              },
              {
                id: 'std8',
                name: 'Henry Taylor',
                email: 'henry@university.edu',
                semester: 4,
                branch: 'Computer Science Engineering',
                rollNumber: 'CS20002'
              }
            ]
          }
        ];

        setSubjects(mockSubjects);
        
        // Calculate today's classes
        const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
        const todaySlots = mockSubjects.flatMap(subject => 
          subject.slots
            .filter(slot => slot.day === today)
            .map(slot => ({
              subject: subject.name,
              code: subject.code,
              time: `${slot.startTime} - ${slot.endTime}`,
              type: slot.type,
              students: subject.enrolledStudents.length
            }))
        );
        setTodayClasses(todaySlots);
        setLoading(false);
      }, 1000);
    };

    fetchSubjects();
  }, []);

  const handleAttendanceTaken = (subjectId: string, attendanceData: any[]) => {
    // Handle attendance submission
    console.log('Attendance taken for subject:', subjectId, attendanceData);
    
    // Update attendance history
    const newRecord = {
      id: `record-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      slot: 'Current Session',
      attendanceData,
      timestamp: new Date().toISOString()
    };
    
    setAttendanceHistory(prev => ({
      ...prev,
      [subjectId]: [...(prev[subjectId] || []), newRecord]
    }));
    
    toast.success('Attendance recorded successfully!');
  };

  const getTotalStudents = () => {
    const uniqueStudents = new Set();
    subjects.forEach(subject => {
      subject.enrolledStudents.forEach(student => {
        uniqueStudents.add(student.id);
      });
    });
    return uniqueStudents.size;
  };

  const getTotalSlots = () => {
    return subjects.reduce((total, subject) => total + subject.slots.length, 0);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-6">
          <div className="max-w-6xl mx-auto space-y-6">
            <div className="h-8 bg-muted animate-pulse rounded"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-32 bg-muted animate-pulse rounded-lg"></div>
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="h-80 bg-muted animate-pulse rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Teacher Attendance - CampusSync"
        description="Take attendance for your classes, manage student records, and track attendance analytics."
      />
      
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Header */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Take Attendance</h1>
            <p className="text-muted-foreground hidden md:block">
              Manage attendance for your classes and track student participation
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
            <Card>
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center space-x-2">
                  <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  <div>
                    <p className="text-lg sm:text-2xl font-bold">{subjects.length}</p>
                    <p className="text-xs text-muted-foreground">Total Subjects</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                  <div>
                    <p className="text-lg sm:text-2xl font-bold">{getTotalStudents()}</p>
                    <p className="text-xs text-muted-foreground">Total Students</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-orange-600" />
                  <div>
                    <p className="text-lg sm:text-2xl font-bold">{getTotalSlots()}</p>
                    <p className="text-xs text-muted-foreground">Weekly Slots</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                  <div>
                    <p className="text-lg sm:text-2xl font-bold">{todayClasses.length}</p>
                    <p className="text-xs text-muted-foreground">Today's Classes</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Today's Schedule */}
          {todayClasses.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5" />
                  <span>Today's Schedule</span>
                  <Badge variant="secondary">{new Date().toLocaleDateString('en-US', { weekday: 'long' })}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
                  {todayClasses.map((classItem, index) => (
                    <div key={index} className="p-3 sm:p-4 border rounded-lg bg-green-50 border-green-200">
                      <div className="space-y-2">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-1 sm:space-y-0">
                          <h4 className="font-semibold text-sm sm:text-base truncate">{classItem.subject}</h4>
                          <Badge variant="outline" className="text-xs self-start sm:self-center">{classItem.code}</Badge>
                        </div>
                        <div className="flex items-center space-x-2 text-xs sm:text-sm text-muted-foreground">
                          <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                          <span>{classItem.time}</span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                          <div className="flex items-center space-x-2 text-xs sm:text-sm">
                            <Users className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
                            <span>{classItem.students} students</span>
                          </div>
                          <Badge className="capitalize bg-green-100 text-green-800 text-xs self-start sm:self-center">
                            {classItem.type}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Main Content Tabs */}
          <Tabs defaultValue="subjects" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="subjects" className="flex items-center space-x-2">
                <BookOpen className="h-4 w-4" />
                <span>Take Attendance</span>
              </TabsTrigger>
              <TabsTrigger value="history" className="flex items-center space-x-2">
                <History className="h-4 w-4" />
                <span>Attendance History</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="subjects" className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Your Subjects</h2>
                <Button variant="outline" size="sm">
                  <TrendingUp className="h-4 w-4 sm:mr-2" />
                  <span className="hidden sm:inline">View Overall Analytics</span>
                </Button>
              </div>
              
              {subjects.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {subjects.map((subject) => (
                    <TeacherSubjectCard
                      key={subject.id}
                      subject={subject}
                      onAttendanceTaken={handleAttendanceTaken}
                    />
                  ))}
                </div>
              ) : (
                <Card className="text-center p-8">
                  <div className="space-y-3">
                    <AlertCircle className="h-12 w-12 mx-auto text-muted-foreground" />
                    <div className="space-y-1">
                      <h3 className="text-lg font-semibold">No Subjects Assigned</h3>
                      <p className="text-muted-foreground">
                        You don't have any subjects assigned yet. Contact the admin to get subjects allocated.
                      </p>
                    </div>
                  </div>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="history" className="space-y-4">
              {subjects.length > 0 ? (
                <div className="space-y-6">
                  {subjects.map((subject) => (
                    <AttendanceHistory
                      key={subject.id}
                      subjectId={subject.id}
                      subjectName={subject.name}
                    />
                  ))}
                </div>
              ) : (
                <Card className="text-center p-8">
                  <div className="space-y-3">
                    <History className="h-12 w-12 mx-auto text-muted-foreground" />
                    <div className="space-y-1">
                      <h3 className="text-lg font-semibold">No History Available</h3>
                      <p className="text-muted-foreground">
                        Start taking attendance to view history records.
                      </p>
                    </div>
                  </div>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default TeacherAttendance;