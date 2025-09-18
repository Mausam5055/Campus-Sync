import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users } from 'lucide-react';
import type { Exam } from '@/types/exam';

interface StudentListDialogProps {
  exam: Exam;
  isOpen: boolean;
  onClose: () => void;
}

export const StudentListDialog: React.FC<StudentListDialogProps> = ({
  exam,
  isOpen,
  onClose
}) => {
  // Mock student data
  const students = [
    { id: '1', name: 'John Doe', rollNumber: 'CSE001', attendance: 'present' },
    { id: '2', name: 'Jane Smith', rollNumber: 'CSE002', attendance: 'present' },
    { id: '3', name: 'Bob Johnson', rollNumber: 'CSE003', attendance: 'absent' }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Students - {exam.course}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            {students.map((student) => (
              <div key={student.id} className="flex items-center justify-between p-3 border rounded">
                <div>
                  <div className="font-medium">{student.name}</div>
                  <div className="text-sm text-muted-foreground">{student.rollNumber}</div>
                </div>
                <Badge variant={student.attendance === 'present' ? 'default' : 'destructive'}>
                  {student.attendance}
                </Badge>
              </div>
            ))}
          </div>
          <div className="flex justify-end">
            <Button onClick={onClose}>Close</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};