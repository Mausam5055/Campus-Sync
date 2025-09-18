import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { AttendanceStats } from '@/components/attendance/AttendanceStats';
import { SemesterSelector } from '@/components/attendance/student/SemesterSelector';
import { SubjectAttendanceCard } from '@/components/attendance/student/SubjectAttendanceCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, BookOpen, TrendingUp } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { StudentAttendanceData, AttendanceStats as AttendanceStatsType } from '@/types/attendance';

const StudentAttendance: React.FC = () => {
  const { user } = useAuth();
  const [selectedSemester, setSelectedSemester] = useState<number | null>(null);
  const [selectedBranch, setSelectedBranch] = useState<string>('');
  const [attendanceData, setAttendanceData] = useState<StudentAttendanceData | null>(null);
  const [loading, setLoading] = useState(false);

  // Mock data - replace with actual API calls
  const mockSemesters = [
    {
      semester: 1,
      branch: 'Computer Science Engineering',
      totalSubjects: 6,
      attendancePercentage: 85.5
    },
    {
      semester: 2,
      branch: 'Computer Science Engineering',
      totalSubjects: 7,
      attendancePercentage: 78.2
    },
    {
      semester: 3,
      branch: 'Computer Science Engineering',
      totalSubjects: 8,
      attendancePercentage: 92.1
    }
  ];

  const mockAttendanceData: StudentAttendanceData = {
    studentId: user?.id || '1',
    semester: selectedSemester || 3,
    branch: selectedBranch || 'Computer Science Engineering',
    subjects: [
      {
        id: 'sub1',
        name: 'Data Structures and Algorithms',
        code: 'CS301',
        semester: 3,
        branch: 'Computer Science Engineering',
        totalClasses: 45,
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
        ]
      },
      {
        id: 'sub2',
        name: 'Database Management Systems',
        code: 'CS302',
        semester: 3,
        branch: 'Computer Science Engineering',
        totalClasses: 40,
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
        ]
      },
      {
        id: 'sub3',
        name: 'Operating Systems',
        code: 'CS303',
        semester: 3,
        branch: 'Computer Science Engineering',
        totalClasses: 38,
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
            day: 'Tuesday',
            startTime: '16:00',
            endTime: '19:00',
            type: 'lab'
          }
        ]
      }
    ],
    attendance: [
      // Mock attendance records
      ...Array.from({ length: 120 }, (_, i) => ({
        id: `att${i}`,
        studentId: user?.id || '1',
        studentName: user?.name || 'Student',
        subjectId: ['sub1', 'sub2', 'sub3'][i % 3],
        subjectName: ['Data Structures and Algorithms', 'Database Management Systems', 'Operating Systems'][i % 3],
        date: new Date(Date.now() - (i * 2 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
        slot: ['Monday 09:00-10:00', 'Tuesday 10:00-11:00', 'Monday 14:00-15:00'][i % 3],
        status: Math.random() > 0.15 ? 'present' : (Math.random() > 0.8 ? 'late' : 'absent') as 'present' | 'absent' | 'late',
        markedBy: 'Teacher Name',
        markedAt: new Date(Date.now() - (i * 2 * 24 * 60 * 60 * 1000)).toISOString()
      }))
    ]
  };

  const handleSemesterSelect = async (semester: number, branch: string) => {
    setSelectedSemester(semester);
    setSelectedBranch(branch);
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setAttendanceData(mockAttendanceData);
      setLoading(false);
    }, 1000);
  };

  const calculateOverallStats = (): AttendanceStatsType => {
    if (!attendanceData) {
      return {
        totalClasses: 0,
        classesAttended: 0,
        attendancePercentage: 0,
        status: 'critical'
      };
    }

    const totalClasses = attendanceData.subjects.reduce((sum, subject) => sum + subject.totalClasses, 0);
    const presentRecords = attendanceData.attendance.filter(record => record.status === 'present');
    const classesAttended = presentRecords.length;
    const attendancePercentage = totalClasses > 0 ? (classesAttended / totalClasses) * 100 : 0;

    let status: 'good' | 'warning' | 'critical' = 'critical';
    if (attendancePercentage >= 80) status = 'good';
    else if (attendancePercentage >= 60) status = 'warning';

    return {
      totalClasses,
      classesAttended,
      attendancePercentage,
      status
    };
  };

  const overallStats = calculateOverallStats();

  if (!selectedSemester) {
    return (
      <div className="min-h-screen bg-background">
        <SEO 
          title="Student Attendance - CampusSync"
          description="View your attendance records, track progress across subjects, and monitor your academic performance."
        />
        
        <div className="container mx-auto px-4 py-6">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
            </div>

            <SemesterSelector
              semesters={mockSemesters}
              selectedSemester={selectedSemester}
              onSemesterSelect={handleSemesterSelect}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title={`Semester ${selectedSemester} Attendance - CampusSync`}
        description={`View attendance records for Semester ${selectedSemester} in ${selectedBranch}`}
      />
      
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedSemester(null)}
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight whitespace-nowrap">
                  Semester {selectedSemester} Attendance
                </h1>
                <p className="text-muted-foreground hidden md:block">{selectedBranch}</p>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-1">
                <div className="h-80 bg-muted animate-pulse rounded-lg"></div>
              </div>
              <div className="lg:col-span-3 space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-48 bg-muted animate-pulse rounded-lg"></div>
                ))}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Sidebar Stats */}
              <div className="lg:col-span-1 space-y-4">
                <AttendanceStats stats={overallStats} />
                
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium">Quick Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Subjects</span>
                      </div>
                      <span className="font-semibold">{attendanceData?.subjects.length || 0}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Total Classes</span>
                      </div>
                      <span className="font-semibold">{overallStats.totalClasses}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Avg. Attendance</span>
                      </div>
                      <span className="font-semibold">{overallStats.attendancePercentage.toFixed(1)}%</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Subject Cards */}
              <div className="lg:col-span-3 space-y-4">
                {attendanceData?.subjects.map((subject) => (
                  <SubjectAttendanceCard
                    key={subject.id}
                    subject={subject}
                    attendance={attendanceData.attendance}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentAttendance;