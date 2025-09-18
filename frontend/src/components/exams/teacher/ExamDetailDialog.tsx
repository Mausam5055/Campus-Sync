import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, MapPin, Target, FileText } from 'lucide-react';
import { format } from 'date-fns';
import type { Exam } from '@/types/exam';

interface ExamDetailDialogProps {
  exam: Exam;
  isOpen: boolean;
  onClose: () => void;
}

export const ExamDetailDialog: React.FC<ExamDetailDialogProps> = ({
  exam,
  isOpen,
  onClose
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            {exam.course} - {exam.examType}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{format(new Date(exam.date), 'MMM dd, yyyy')}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{exam.time} ({exam.duration} min)</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>{exam.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              <span>{exam.maxMarks} marks</span>
            </div>
          </div>
          {exam.topics.length > 0 && (
            <div>
              <h4 className="font-medium mb-2">Topics:</h4>
              <div className="flex flex-wrap gap-2">
                {exam.topics.map((topic, index) => (
                  <Badge key={index} variant="outline">{topic}</Badge>
                ))}
              </div>
            </div>
          )}
          <div className="flex justify-end">
            <Button onClick={onClose}>Close</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};