import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, XCircle, Clock, AlertTriangle } from 'lucide-react';
import { AttendanceStats as AttendanceStatsType } from '@/types/attendance';

interface AttendanceStatsProps {
  stats: AttendanceStatsType;
  className?: string;
}

export const AttendanceStats: React.FC<AttendanceStatsProps> = ({ stats, className = '' }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'good':
        return <CheckCircle className="h-4 w-4" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4" />;
      case 'critical':
        return <XCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium">Attendance Overview</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-2xl font-bold">{stats.attendancePercentage.toFixed(1)}%</p>
            <p className="text-xs text-muted-foreground">
              {stats.classesAttended} of {stats.totalClasses} classes
            </p>
          </div>
          <Badge className={getStatusColor(stats.status)}>
            {getStatusIcon(stats.status)}
            <span className="ml-1 capitalize">{stats.status}</span>
          </Badge>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span>Progress</span>
            <span>{stats.classesAttended}/{stats.totalClasses}</span>
          </div>
          <Progress 
            value={stats.attendancePercentage} 
            className="h-2"
          />
        </div>

        <div className="grid grid-cols-3 gap-3 text-center text-xs">
          <div className="space-y-1">
            <div className="h-8 w-8 mx-auto bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-4 w-4 text-green-600" />
            </div>
            <p className="text-muted-foreground">Present</p>
            <p className="font-medium">{stats.classesAttended}</p>
          </div>
          <div className="space-y-1">
            <div className="h-8 w-8 mx-auto bg-red-100 rounded-full flex items-center justify-center">
              <XCircle className="h-4 w-4 text-red-600" />
            </div>
            <p className="text-muted-foreground">Absent</p>
            <p className="font-medium">{stats.totalClasses - stats.classesAttended}</p>
          </div>
          <div className="space-y-1">
            <div className="h-8 w-8 mx-auto bg-yellow-100 rounded-full flex items-center justify-center">
              <Clock className="h-4 w-4 text-yellow-600" />
            </div>
            <p className="text-muted-foreground">Late</p>
            <p className="font-medium">2</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};