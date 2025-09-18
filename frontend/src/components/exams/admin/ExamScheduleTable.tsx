import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Edit, Trash2, Eye, Clock, MapPin } from 'lucide-react';
import { format } from 'date-fns';
import { useIsMobile } from '@/hooks/use-mobile';
import { ExamDetailModal } from './ExamDetailModal';
import { EditExamDialog } from './EditExamDialog';
import type { Exam, ExamSlot, Semester } from '@/types/exam';

interface ExamScheduleTableProps {
  exams: Exam[];
  slots: ExamSlot[];
  semesters: Semester[];
  onDeleteExam: (examId: string) => void;
  onUpdateExam: (exam: Exam) => void;
}

export const ExamScheduleTable: React.FC<ExamScheduleTableProps> = ({
  exams,
  slots,
  semesters,
  onDeleteExam,
  onUpdateExam
}) => {
  const isMobile = useIsMobile();
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleViewExam = (exam: Exam) => {
    setSelectedExam(exam);
    setIsDetailModalOpen(true);
  };

  const handleEditExam = (exam: Exam) => {
    setSelectedExam(exam);
    setIsEditDialogOpen(true);
  };

  const handleUpdateExam = (updatedExam: Exam) => {
    onUpdateExam(updatedExam);
    setIsEditDialogOpen(false);
    setSelectedExam(null);
  };
  const getStatusColor = (status: Exam['status']) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'ongoing':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
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

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours === 0) return `${mins}m`;
    if (mins === 0) return `${hours}h`;
    return `${hours}h ${mins}m`;
  };

  if (exams.length === 0) {
    return (
      <Card>
        <CardContent className="py-8">
          <div className="text-center text-muted-foreground">
            <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium">No exams scheduled</p>
            <p>Create your first exam to get started</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Exam Schedule ({exams.length} exams)
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isMobile ? (
          // Mobile Card Layout
          <div className="space-y-4">
            {exams.map((exam) => {
              const dateTime = formatDateTime(exam.date, exam.time);
              return (
                <Card key={exam.id} className="border-l-4 border-l-primary">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      {/* Header */}
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="font-semibold text-sm">{exam.course}</h3>
                          <p className="text-xs text-muted-foreground">
                            {exam.courseCode} • {exam.branch}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Badge className={getExamTypeColor(exam.examType)} variant="secondary">
                            {exam.examType.charAt(0).toUpperCase() + exam.examType.slice(1)}
                          </Badge>
                        </div>
                      </div>

                      {/* Date & Time */}
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          <span>{dateTime.date}</span>
                        </div>
                        <div className="text-muted-foreground">
                          {dateTime.time}
                        </div>
                      </div>

                      {/* Location & Duration */}
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3 text-muted-foreground" />
                          <span>{exam.location}</span>
                        </div>
                        <div className="text-muted-foreground">
                          {formatDuration(exam.duration)}
                        </div>
                      </div>

                      {/* Instructor & Status */}
                      <div className="flex justify-between items-center">
                        <div className="text-sm">
                          <span className="text-muted-foreground">Instructor: </span>
                          <span>{exam.instructor}</span>
                        </div>
                        <Badge className={getStatusColor(exam.status)}>
                          {exam.status.charAt(0).toUpperCase() + exam.status.slice(1)}
                        </Badge>
                      </div>

                      {/* Actions */}
                      <div className="flex justify-end gap-2 pt-2 border-t">
                        <Button variant="ghost" size="sm" onClick={() => handleViewExam(exam)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleEditExam(exam)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => onDeleteExam(exam.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          // Desktop Table Layout
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Course</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Instructor</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {exams.map((exam) => {
                  const dateTime = formatDateTime(exam.date, exam.time);
                  return (
                    <TableRow key={exam.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{exam.course}</div>
                          <div className="text-sm text-muted-foreground">
                            {exam.courseCode} • {exam.branch}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getExamTypeColor(exam.examType)}>
                          {exam.examType.charAt(0).toUpperCase() + exam.examType.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{dateTime.date}</div>
                          <div className="text-sm text-muted-foreground">
                            {dateTime.weekday} • {dateTime.time}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm">
                          <MapPin className="h-3 w-3" />
                          {exam.location}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm">
                          <Clock className="h-3 w-3" />
                          {formatDuration(exam.duration)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{exam.instructor}</div>
                          <div className="text-muted-foreground">{exam.instructorId}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(exam.status)}>
                          {exam.status.charAt(0).toUpperCase() + exam.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm" onClick={() => handleViewExam(exam)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleEditExam(exam)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => onDeleteExam(exam.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
      
      {/* Modals */}
      <ExamDetailModal
        exam={selectedExam}
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false);
          setSelectedExam(null);
        }}
      />
      
      <EditExamDialog
        exam={selectedExam}
        isOpen={isEditDialogOpen}
        onClose={() => {
          setIsEditDialogOpen(false);
          setSelectedExam(null);
        }}
        onSave={handleUpdateExam}
        semesters={semesters}
        availableSlots={slots.filter(slot => slot.isAvailable)}
      />
    </Card>
  );
};