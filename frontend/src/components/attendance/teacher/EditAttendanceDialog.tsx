import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CheckCircle, XCircle, AlertTriangle, Save, X } from 'lucide-react';
import { AttendanceRecord } from '@/types/attendance';
import { toast } from 'sonner';

interface EditAttendanceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  session: {
    id: string;
    date: string;
    slot: string;
    attendanceRecords: AttendanceRecord[];
  };
  onSave: (sessionId: string, updatedRecords: AttendanceRecord[]) => void;
}

export const EditAttendanceDialog: React.FC<EditAttendanceDialogProps> = ({
  open,
  onOpenChange,
  session,
  onSave
}) => {
  const [editedRecords, setEditedRecords] = useState<AttendanceRecord[]>(
    session.attendanceRecords
  );

  const getInitials = (name: string) => {
    return name.split(' ').map(word => word[0]).join('').toUpperCase();
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'absent':
        return <XCircle className="h-4 w-4 text-red-600" />;
      case 'late':
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      default:
        return null;
    }
  };

  const handleStatusChange = (recordId: string, newStatus: 'present' | 'absent' | 'late') => {
    setEditedRecords(prev => 
      prev.map(record => 
        record.id === recordId 
          ? { ...record, status: newStatus, markedAt: new Date().toISOString() }
          : record
      )
    );
  };

  const handleSave = () => {
    onSave(session.id, editedRecords);
    toast.success('Attendance updated successfully!');
    onOpenChange(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'absent':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'late':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl w-[95vw] sm:w-full max-h-[85vh] p-0">
        <DialogHeader className="p-4 sm:p-6 pb-2">
          <DialogTitle className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div className="flex-1 min-w-0">
              <span className="text-lg sm:text-xl font-semibold">Edit Attendance</span>
              <p className="text-sm text-muted-foreground mt-1">
                {session.slot} - {new Date(session.date).toLocaleDateString()}
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onOpenChange(false)}
              className="h-8 w-8 p-0 self-start sm:self-center"
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="flex-1 px-4 sm:px-6 max-h-[calc(85vh-120px)]">
          <div className="space-y-3 pb-4">
            {editedRecords.map((record) => (
              <div key={record.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 border rounded-lg bg-background space-y-3 sm:space-y-0">
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                  <Avatar className="h-8 w-8 sm:h-10 sm:w-10 flex-shrink-0">
                    <AvatarFallback className="text-xs sm:text-sm">
                      {getInitials(record.studentName)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-sm sm:text-base truncate">{record.studentName}</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Last updated: {new Date(record.markedAt).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between sm:justify-end space-x-3 flex-shrink-0 w-full sm:w-auto">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(record.status)}
                    <Select
                      value={record.status}
                      onValueChange={(value: 'present' | 'absent' | 'late') => 
                        handleStatusChange(record.id, value)
                      }
                    >
                      <SelectTrigger className="w-20 sm:w-24 text-xs sm:text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="present">Present</SelectItem>
                        <SelectItem value="absent">Absent</SelectItem>
                        <SelectItem value="late">Late</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Badge className={`capitalize text-xs sm:text-sm ${getStatusColor(record.status)}`}>
                    {record.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <DialogFooter className="p-4 sm:p-6 pt-2 border-t flex-col sm:flex-row gap-2">
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            className="w-full sm:w-auto order-2 sm:order-1"
          >
            <X className="h-4 w-4 mr-2" />
            Cancel
          </Button>
          <Button 
            onClick={handleSave}
            className="w-full sm:w-auto order-1 sm:order-2"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};