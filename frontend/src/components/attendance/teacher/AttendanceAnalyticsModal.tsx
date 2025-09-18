import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle
} from 'lucide-react';
import { TeacherSubject } from '@/types/attendance';

interface AttendanceAnalyticsModalProps {
  subject: TeacherSubject;
  isOpen: boolean;
  onClose: () => void;
}

export const AttendanceAnalyticsModal: React.FC<AttendanceAnalyticsModalProps> = ({
  subject,
  isOpen,
  onClose
}) => {
  // Mock analytics data - replace with actual data from your state management
  const analyticsData = {
    totalClasses: 24,
    averageAttendance: 85.5,
    trends: {
      thisWeek: 88.2,
      lastWeek: 82.8,
      change: 5.4
    },
    studentStats: subject.enrolledStudents.map(student => ({
      ...student,
      attendancePercentage: Math.floor(Math.random() * 40) + 60, // Mock data
      classesAttended: Math.floor(Math.random() * 8) + 16, // Mock data
      totalClasses: 24,
      status: Math.random() > 0.7 ? 'warning' : Math.random() > 0.3 ? 'good' : 'critical'
    })),
    classWiseData: [
      { date: '2024-01-15', present: 18, absent: 2, late: 1 },
      { date: '2024-01-17', present: 19, absent: 1, late: 1 },
      { date: '2024-01-19', present: 17, absent: 3, late: 1 },
      { date: '2024-01-22', present: 20, absent: 1, late: 0 },
      { date: '2024-01-24', present: 18, absent: 2, late: 1 },
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'text-green-600 bg-green-50';
      case 'warning': return 'text-yellow-600 bg-yellow-50';
      case 'critical': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'good': return <CheckCircle className="h-4 w-4" />;
      case 'warning': return <AlertTriangle className="h-4 w-4" />;
      case 'critical': return <XCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] max-w-6xl max-h-[90vh] overflow-y-auto p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <BarChart3 className="h-5 w-5" />
            <span>Attendance Analytics - {subject.name}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Overview Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
            <Card>
              <CardContent className="p-3 sm:p-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                  <div>
                    <p className="text-lg sm:text-2xl font-bold">{analyticsData.totalClasses}</p>
                    <p className="text-xs text-muted-foreground">Total Classes</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-3 sm:p-4">
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                  <div>
                    <p className="text-lg sm:text-2xl font-bold">{analyticsData.averageAttendance}%</p>
                    <p className="text-xs text-muted-foreground">Avg Attendance</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-3 sm:p-4">
                <div className="flex items-center space-x-2">
                  {analyticsData.trends.change > 0 ? (
                    <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                  ) : (
                    <TrendingDown className="h-4 w-4 sm:h-5 sm:w-5 text-red-600" />
                  )}
                  <div>
                    <p className="text-lg sm:text-2xl font-bold">{analyticsData.trends.thisWeek}%</p>
                    <p className="text-xs text-muted-foreground">This Week</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-3 sm:p-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  <div>
                    <p className="text-lg sm:text-2xl font-bold">
                      {analyticsData.studentStats.filter(s => s.status === 'good').length}
                    </p>
                    <p className="text-xs text-muted-foreground">Good Attendance</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Classes */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Classes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {analyticsData.classWiseData.map((classData, index) => (
                  <div key={index} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 border rounded-lg space-y-2 sm:space-y-0">
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium text-sm sm:text-base">{classData.date}</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm">
                      <div className="flex items-center space-x-1 sm:space-x-2">
                        <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full"></div>
                        <span>{classData.present} Present</span>
                      </div>
                      <div className="flex items-center space-x-1 sm:space-x-2">
                        <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full"></div>
                        <span>{classData.absent} Absent</span>
                      </div>
                      <div className="flex items-center space-x-1 sm:space-x-2">
                        <div className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-500 rounded-full"></div>
                        <span>{classData.late} Late</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Student Performance */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Student Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-64 sm:max-h-96 overflow-y-auto">
                {analyticsData.studentStats.map((student) => (
                  <div key={student.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 border rounded-lg space-y-3 sm:space-y-0">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-full ${getStatusColor(student.status)}`}>
                        {getStatusIcon(student.status)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-sm sm:text-base truncate">{student.name}</p>
                        <p className="text-xs sm:text-sm text-muted-foreground truncate">{student.rollNumber}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end space-x-2 sm:space-x-4 w-full sm:w-auto">
                      <div className="text-center sm:text-right">
                        <div className="flex items-center justify-center sm:justify-end space-x-2">
                          {getStatusIcon(student.status)}
                          <span className="text-lg sm:text-2xl font-bold">{student.attendancePercentage}%</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {student.classesAttended}/{student.totalClasses} classes
                        </p>
                      </div>
                      <div className="hidden sm:block w-24 lg:w-32">
                        <Progress value={student.attendancePercentage} className="h-2" />
                      </div>
                      <Badge 
                        variant="outline" 
                        className={`${getStatusColor(student.status)} capitalize text-xs`}
                      >
                        {student.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};