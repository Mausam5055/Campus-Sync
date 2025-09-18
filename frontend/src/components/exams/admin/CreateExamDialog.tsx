import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import type { Exam, Semester, ExamSlot } from '@/types/exam';

interface CreateExamDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (exam: Omit<Exam, 'id' | 'createdAt' | 'updatedAt' | 'createdBy'>) => void;
  semesters: Semester[];
  availableSlots: ExamSlot[];
}

export const CreateExamDialog: React.FC<CreateExamDialogProps> = ({
  isOpen,
  onClose,
  onSave,
  semesters,
  availableSlots
}) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    course: '',
    courseCode: '',
    semester: 1,
    branch: '',
    examType: 'midterm' as const,
    date: '',
    time: '',
    duration: 180,
    location: '',
    maxMarks: 100,
    instructor: '',
    instructorId: '',
    description: '',
    topics: ''
  });

  const branches = ['CSE', 'ECE', 'ME', 'CE', 'IT'];
  const examTypes = [
    { value: 'midterm', label: 'Mid Term' },
    { value: 'endterm', label: 'End Term' },
    { value: 'sessional', label: 'Sessional' },
    { value: 'practical', label: 'Practical' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.course || !formData.courseCode || !formData.date || !formData.time || !formData.location) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in all required fields.',
        variant: 'destructive'
      });
      return;
    }

    const examData: Omit<Exam, 'id' | 'createdAt' | 'updatedAt' | 'createdBy'> = {
      course: formData.course,
      courseCode: formData.courseCode,
      semester: formData.semester,
      branch: formData.branch,
      examType: formData.examType,
      date: formData.date,
      time: formData.time,
      duration: formData.duration,
      location: formData.location,
      maxMarks: formData.maxMarks,
      instructor: formData.instructor,
      instructorId: formData.instructorId,
      description: formData.description,
      topics: formData.topics.split(',').map(topic => topic.trim()).filter(Boolean),
      status: 'scheduled'
    };

    onSave(examData);
    handleReset();
    onClose();
  };

  const handleReset = () => {
    setFormData({
      course: '',
      courseCode: '',
      semester: 1,
      branch: '',
      examType: 'midterm',
      date: '',
      time: '',
      duration: 180,
      location: '',
      maxMarks: 100,
      instructor: '',
      instructorId: '',
      description: '',
      topics: ''
    });
  };

  const handleSlotSelect = (slotId: string) => {
    const slot = availableSlots.find(s => s.id === slotId);
    if (slot) {
      setFormData(prev => ({
        ...prev,
        date: slot.date,
        time: slot.timeSlot.split('-')[0],
        location: slot.location
      }));
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Schedule New Exam</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="course">Course Name *</Label>
              <Input
                id="course"
                value={formData.course}
                onChange={(e) => setFormData(prev => ({ ...prev, course: e.target.value }))}
                placeholder="e.g., Data Structures and Algorithms"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="courseCode">Course Code *</Label>
              <Input
                id="courseCode"
                value={formData.courseCode}
                onChange={(e) => setFormData(prev => ({ ...prev, courseCode: e.target.value }))}
                placeholder="e.g., CSE201"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Semester *</Label>
              <Select value={formData.semester.toString()} onValueChange={(value) => 
                setFormData(prev => ({ ...prev, semester: Number(value) }))
              }>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {semesters.map(sem => (
                    <SelectItem key={sem.id} value={sem.id.toString()}>
                      {sem.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Branch *</Label>
              <Select value={formData.branch} onValueChange={(value) => 
                setFormData(prev => ({ ...prev, branch: value }))
              }>
                <SelectTrigger>
                  <SelectValue placeholder="Select branch" />
                </SelectTrigger>
                <SelectContent>
                  {branches.map(branch => (
                    <SelectItem key={branch} value={branch}>
                      {branch}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Exam Type *</Label>
              <Select value={formData.examType} onValueChange={(value: any) => 
                setFormData(prev => ({ ...prev, examType: value }))
              }>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {examTypes.map(type => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {availableSlots.length > 0 && (
            <div className="space-y-2">
              <Label>Quick Select from Available Slots</Label>
              <Select onValueChange={handleSlotSelect}>
                <SelectTrigger>
                  <SelectValue placeholder="Select an available slot" />
                </SelectTrigger>
                <SelectContent>
                  {availableSlots.map(slot => (
                    <SelectItem key={slot.id} value={slot.id}>
                      {slot.date} | {slot.timeSlot} | {slot.location} (Cap: {slot.capacity})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date *</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="time">Start Time *</Label>
              <Input
                id="time"
                type="time"
                value={formData.time}
                onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Duration (minutes)</Label>
              <Input
                id="duration"
                type="number"
                value={formData.duration}
                onChange={(e) => setFormData(prev => ({ ...prev, duration: Number(e.target.value) }))}
                min="30"
                step="30"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                placeholder="e.g., Hall A, Room 101"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxMarks">Maximum Marks</Label>
              <Input
                id="maxMarks"
                type="number"
                value={formData.maxMarks}
                onChange={(e) => setFormData(prev => ({ ...prev, maxMarks: Number(e.target.value) }))}
                min="1"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="instructor">Instructor Name</Label>
              <Input
                id="instructor"
                value={formData.instructor}
                onChange={(e) => setFormData(prev => ({ ...prev, instructor: e.target.value }))}
                placeholder="e.g., Dr. Smith"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="instructorId">Instructor ID</Label>
              <Input
                id="instructorId"
                value={formData.instructorId}
                onChange={(e) => setFormData(prev => ({ ...prev, instructorId: e.target.value }))}
                placeholder="e.g., INST001"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="topics">Topics (comma-separated)</Label>
            <Textarea
              id="topics"
              value={formData.topics}
              onChange={(e) => setFormData(prev => ({ ...prev, topics: e.target.value }))}
              placeholder="e.g., Arrays, Linked Lists, Trees, Graphs"
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Additional exam details..."
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              Schedule Exam
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};