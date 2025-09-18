import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Users, 
  Search, 
  Mail, 
  Phone, 
  GraduationCap,
  Filter,
  Download,
  CheckCircle,
  XCircle,
  AlertTriangle
} from 'lucide-react';
import { TeacherSubject, Student } from '@/types/attendance';

interface StudentListModalProps {
  subject: TeacherSubject;
  isOpen: boolean;
  onClose: () => void;
}

interface StudentWithStats extends Student {
  attendancePercentage: number;
  classesAttended: number;
  totalClasses: number;
  status: 'good' | 'warning' | 'critical';
  phone?: string;
}

export const StudentListModal: React.FC<StudentListModalProps> = ({
  subject,
  isOpen,
  onClose
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'good' | 'warning' | 'critical'>('all');

  // Mock enhanced student data - replace with actual data
  const studentsWithStats: StudentWithStats[] = subject.enrolledStudents.map(student => ({
    ...student,
    attendancePercentage: Math.floor(Math.random() * 40) + 60,
    classesAttended: Math.floor(Math.random() * 8) + 16,
    totalClasses: 24,
    status: Math.random() > 0.7 ? 'warning' : Math.random() > 0.3 ? 'good' : 'critical',
    phone: `+91-${Math.floor(Math.random() * 9000000000) + 1000000000}`
  }));

  const filteredStudents = studentsWithStats.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || student.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'text-green-600 bg-green-50 border-green-200';
      case 'warning': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'critical': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'good': return <CheckCircle className="h-4 w-4" />;
      case 'warning': return <AlertTriangle className="h-4 w-4" />;
      case 'critical': return <XCircle className="h-4 w-4" />;
      default: return null;
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(word => word[0]).join('').toUpperCase();
  };

  const handleExportList = () => {
    // Mock export functionality
    console.log('Exporting student list...');
  };

  const statusCounts = {
    good: studentsWithStats.filter(s => s.status === 'good').length,
    warning: studentsWithStats.filter(s => s.status === 'warning').length,
    critical: studentsWithStats.filter(s => s.status === 'critical').length
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] max-w-5xl max-h-[90vh] overflow-y-auto p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5" />
            <span>Student List - {subject.name}</span>
            <Badge variant="outline">{subject.code}</Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
            <Card>
              <CardContent className="p-3 sm:p-4">
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                  <div>
                    <p className="text-lg sm:text-2xl font-bold">{studentsWithStats.length}</p>
                    <p className="text-xs text-muted-foreground">Total Students</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-3 sm:p-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                  <div>
                    <p className="text-lg sm:text-2xl font-bold">{statusCounts.good}</p>
                    <p className="text-xs text-muted-foreground">Good Attendance</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-3 sm:p-4">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-600" />
                  <div>
                    <p className="text-lg sm:text-2xl font-bold">{statusCounts.warning}</p>
                    <p className="text-xs text-muted-foreground">Need Attention</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-3 sm:p-4">
                <div className="flex items-center space-x-2">
                  <XCircle className="h-4 w-4 sm:h-5 sm:w-5 text-red-600" />
                  <div>
                    <p className="text-lg sm:text-2xl font-bold">{statusCounts.critical}</p>
                    <p className="text-xs text-muted-foreground">Critical</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search students by name, roll number, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button
                variant={filterStatus === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterStatus('all')}
                className="w-full sm:w-auto"
              >
                All
              </Button>
              <Button
                variant={filterStatus === 'good' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterStatus('good')}
                className="text-green-600 border-green-200 w-full sm:w-auto"
              >
                Good
              </Button>
              <Button
                variant={filterStatus === 'warning' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterStatus('warning')}
                className="text-yellow-600 border-yellow-200 w-full sm:w-auto"
              >
                Warning
              </Button>
              <Button
                variant={filterStatus === 'critical' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterStatus('critical')}
                className="text-red-600 border-red-200 w-full sm:w-auto"
              >
                Critical
              </Button>
            </div>
            <Button variant="outline" size="sm" onClick={handleExportList} className="w-full sm:w-auto">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>

          {/* Student List */}
          <div className="space-y-3 max-h-64 sm:max-h-96 overflow-y-auto">
            {filteredStudents.map((student) => (
              <Card key={student.id} className={`border-l-4 ${getStatusColor(student.status)}`}>
                <CardContent className="p-3 sm:p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                    <div className="flex items-center space-x-3 sm:space-x-4 min-w-0 flex-1">
                      <Avatar className="h-10 w-10 sm:h-12 sm:w-12 flex-shrink-0">
                        <AvatarFallback className="text-sm font-semibold">
                          {getInitials(student.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="space-y-1 min-w-0 flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2">
                          <h4 className="font-semibold text-sm sm:text-base truncate">{student.name}</h4>
                          <Badge variant="outline" className="text-xs self-start sm:self-center">
                            {student.rollNumber}
                          </Badge>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-xs sm:text-sm text-muted-foreground space-y-1 sm:space-y-0">
                          <div className="flex items-center space-x-1">
                            <Mail className="h-3 w-3" />
                            <span className="truncate">{student.email}</span>
                          </div>
                          {student.phone && (
                            <div className="flex items-center space-x-1">
                              <Phone className="h-3 w-3" />
                              <span>{student.phone}</span>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center space-x-2 text-xs sm:text-sm">
                          <GraduationCap className="h-3 w-3 text-muted-foreground" />
                          <span>Semester {student.semester} • {student.branch}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0 w-full sm:w-auto">
                      <div className="flex items-center justify-between sm:justify-end">
                        <div className="text-center sm:text-right">
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(student.status)}
                            <span className="text-lg sm:text-2xl font-bold">{student.attendancePercentage}%</span>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {student.classesAttended}/{student.totalClasses} classes attended
                          </p>
                        </div>
                        <Badge 
                          variant="outline" 
                          className={`${getStatusColor(student.status)} capitalize ml-2 sm:ml-4 text-xs`}
                        >
                          {student.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredStudents.length === 0 && (
            <div className="text-center py-8">
              <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No students found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search terms or filters.
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};