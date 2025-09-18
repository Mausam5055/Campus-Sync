import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Edit, Trash2, Clock, MapPin, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import type { ExamSlot } from '@/types/exam';

interface ExamSlotManagerProps {
  slots: ExamSlot[];
  onSlotsUpdate: (slots: ExamSlot[]) => void;
}

export const ExamSlotManager: React.FC<ExamSlotManagerProps> = ({
  slots,
  onSlotsUpdate
}) => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSlot, setEditingSlot] = useState<ExamSlot | null>(null);
  const [formData, setFormData] = useState({
    date: '',
    startTime: '',
    endTime: '',
    location: '',
    capacity: 100
  });

  const resetForm = () => {
    setFormData({
      date: '',
      startTime: '',
      endTime: '',
      location: '',
      capacity: 100
    });
  };

  const handleAdd = () => {
    setEditingSlot(null);
    resetForm();
    setIsDialogOpen(true);
  };

  const handleEdit = (slot: ExamSlot) => {
    setEditingSlot(slot);
    const [startTime, endTime] = slot.timeSlot.split('-');
    setFormData({
      date: slot.date,
      startTime,
      endTime,
      location: slot.location,
      capacity: slot.capacity
    });
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (!formData.date || !formData.startTime || !formData.endTime || !formData.location) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in all required fields.',
        variant: 'destructive'
      });
      return;
    }

    const slotData: ExamSlot = {
      id: editingSlot?.id || `slot_${Date.now()}`,
      date: formData.date,
      timeSlot: `${formData.startTime}-${formData.endTime}`,
      location: formData.location,
      capacity: formData.capacity,
      isAvailable: editingSlot?.isAvailable ?? true,
      examId: editingSlot?.examId
    };

    if (editingSlot) {
      onSlotsUpdate(slots.map(slot => 
        slot.id === editingSlot.id ? slotData : slot
      ));
      toast({
        title: 'Slot Updated',
        description: 'Exam slot has been updated successfully.'
      });
    } else {
      onSlotsUpdate([...slots, slotData]);
      toast({
        title: 'Slot Added',
        description: 'New exam slot has been added successfully.'
      });
    }

    setIsDialogOpen(false);
    resetForm();
    setEditingSlot(null);
  };

  const handleDelete = (slotId: string) => {
    const slot = slots.find(s => s.id === slotId);
    if (slot && !slot.isAvailable) {
      toast({
        title: 'Cannot Delete',
        description: 'This slot is currently assigned to an exam. Please unassign it first.',
        variant: 'destructive'
      });
      return;
    }

    onSlotsUpdate(slots.filter(slot => slot.id !== slotId));
    toast({
      title: 'Slot Deleted',
      description: 'Exam slot has been removed successfully.'
    });
  };

  const toggleAvailability = (slotId: string) => {
    onSlotsUpdate(slots.map(slot => 
      slot.id === slotId 
        ? { ...slot, isAvailable: !slot.isAvailable, examId: slot.isAvailable ? undefined : slot.examId }
        : slot
    ));
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Exam Slot Management
          </CardTitle>
          <Button onClick={handleAdd} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Slot
          </Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Time Slot</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Capacity</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Assigned Exam</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {slots.map((slot) => (
                  <TableRow key={slot.id}>
                    <TableCell>
                      <div className="font-medium">
                        {format(new Date(slot.date), 'MMM dd, yyyy')}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {format(new Date(slot.date), 'EEEE')}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {slot.timeSlot}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {slot.location}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {slot.capacity}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleAvailability(slot.id)}
                        className="h-auto p-0"
                        disabled={!!slot.examId}
                      >
                        <Badge variant={slot.isAvailable ? "default" : "secondary"}>
                          {slot.isAvailable ? "Available" : "Occupied"}
                        </Badge>
                      </Button>
                    </TableCell>
                    <TableCell>
                      {slot.examId ? (
                        <Badge variant="outline">
                          {slot.examId}
                        </Badge>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleEdit(slot)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDelete(slot.id)}
                          className="text-destructive hover:text-destructive"
                          disabled={!slot.isAvailable}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editingSlot ? 'Edit Exam Slot' : 'Add New Exam Slot'}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
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

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startTime">Start Time *</Label>
                <Input
                  id="startTime"
                  type="time"
                  value={formData.startTime}
                  onChange={(e) => setFormData(prev => ({ ...prev, startTime: e.target.value }))}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="endTime">End Time *</Label>
                <Input
                  id="endTime"
                  type="time"
                  value={formData.endTime}
                  onChange={(e) => setFormData(prev => ({ ...prev, endTime: e.target.value }))}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                placeholder="e.g., Hall A, Room 101, Lab 2"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="capacity">Capacity</Label>
              <Input
                id="capacity"
                type="number"
                value={formData.capacity}
                onChange={(e) => setFormData(prev => ({ ...prev, capacity: Number(e.target.value) }))}
                min="1"
                placeholder="100"
              />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave}>
                {editingSlot ? 'Update' : 'Add'} Slot
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};