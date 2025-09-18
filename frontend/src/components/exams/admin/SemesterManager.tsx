import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Edit, Trash2, Calendar, BookOpen } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import type { Semester } from '@/types/exam';

interface SemesterManagerProps {
  semesters: Semester[];
}

export const SemesterManager: React.FC<SemesterManagerProps> = ({
  semesters: initialSemesters
}) => {
  const { toast } = useToast();
  const [semesters, setSemesters] = useState(initialSemesters);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSemester, setEditingSemester] = useState<Semester | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    startDate: '',
    endDate: '',
    examTypes: 'midterm,endterm,sessional,practical',
    branches: 'CSE,ECE,ME,CE,IT'
  });

  const resetForm = () => {
    setFormData({
      name: '',
      startDate: '',
      endDate: '',
      examTypes: 'midterm,endterm,sessional,practical',
      branches: 'CSE,ECE,ME,CE,IT'
    });
  };

  const handleAdd = () => {
    setEditingSemester(null);
    resetForm();
    setIsDialogOpen(true);
  };

  const handleEdit = (semester: Semester) => {
    setEditingSemester(semester);
    setFormData({
      name: semester.name,
      startDate: semester.startDate,
      endDate: semester.endDate,
      examTypes: semester.examTypes.join(','),
      branches: semester.branches.join(',')
    });
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (!formData.name || !formData.startDate || !formData.endDate) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in all required fields.',
        variant: 'destructive'
      });
      return;
    }

    const semesterData: Semester = {
      id: editingSemester?.id || Math.max(...semesters.map(s => s.id), 0) + 1,
      name: formData.name,
      startDate: formData.startDate,
      endDate: formData.endDate,
      isActive: editingSemester?.isActive || false,
      examTypes: formData.examTypes.split(',').map(type => type.trim()).filter(Boolean),
      branches: formData.branches.split(',').map(branch => branch.trim()).filter(Boolean)
    };

    if (editingSemester) {
      setSemesters(prev => prev.map(sem => 
        sem.id === editingSemester.id ? semesterData : sem
      ));
      toast({
        title: 'Semester Updated',
        description: 'Semester has been updated successfully.'
      });
    } else {
      setSemesters(prev => [...prev, semesterData]);
      toast({
        title: 'Semester Added',
        description: 'New semester has been added successfully.'
      });
    }

    setIsDialogOpen(false);
    resetForm();
    setEditingSemester(null);
  };

  const handleDelete = (semesterId: number) => {
    setSemesters(prev => prev.filter(sem => sem.id !== semesterId));
    toast({
      title: 'Semester Deleted',
      description: 'Semester has been removed successfully.'
    });
  };

  const toggleActive = (semesterId: number) => {
    setSemesters(prev => prev.map(sem => 
      sem.id === semesterId 
        ? { ...sem, isActive: !sem.isActive }
        : sem
    ));
  };

  return (
    <div className="space-y-4 w-full max-w-full overflow-hidden">
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Semester Management
          </CardTitle>
          <Button onClick={handleAdd} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Semester
          </Button>
        </CardHeader>
        <CardContent className="w-full">
          {/* Desktop Table View */}
          <div className="hidden md:block w-full overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Semester</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Exam Types</TableHead>
                  <TableHead>Branches</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {semesters.map((semester) => (
                  <TableRow key={semester.id}>
                    <TableCell>
                      <div className="font-medium">{semester.name}</div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{format(new Date(semester.startDate), 'MMM dd, yyyy')}</div>
                        <div className="text-muted-foreground">
                          to {format(new Date(semester.endDate), 'MMM dd, yyyy')}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {semester.examTypes.map((type) => (
                          <Badge key={type} variant="outline" className="text-xs">
                            {type}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {semester.branches.map((branch) => (
                          <Badge key={branch} variant="secondary" className="text-xs">
                            {branch}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleActive(semester.id)}
                        className="h-auto p-0"
                      >
                        <Badge variant={semester.isActive ? "default" : "secondary"}>
                          {semester.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </Button>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleEdit(semester)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDelete(semester.id)}
                          className="text-destructive hover:text-destructive"
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

          {/* Mobile Card View */}
          <div className="md:hidden space-y-4">
            {semesters.map((semester) => (
              <div key={semester.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{semester.name}</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleActive(semester.id)}
                    className="h-auto p-0"
                  >
                    <Badge variant={semester.isActive ? "default" : "secondary"}>
                      {semester.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </Button>
                </div>

                <div className="text-sm space-y-1">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{format(new Date(semester.startDate), 'MMM dd, yyyy')} - {format(new Date(semester.endDate), 'MMM dd, yyyy')}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div>
                    <span className="text-xs text-muted-foreground">Exam Types:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {semester.examTypes.map((type) => (
                        <Badge key={type} variant="outline" className="text-xs">
                          {type}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-xs text-muted-foreground">Branches:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {semester.branches.map((branch) => (
                        <Badge key={branch} variant="secondary" className="text-xs">
                          {branch}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleEdit(semester)}
                    className="flex items-center gap-2"
                  >
                    <Edit className="h-4 w-4" />
                    <span className="text-xs">Edit</span>
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleDelete(semester.id)}
                    className="text-destructive hover:text-destructive flex items-center gap-2"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="text-xs">Delete</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-lg w-[95vw] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingSemester ? 'Edit Semester' : 'Add New Semester'}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Semester Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="e.g., 1st Semester, Fall 2024"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date *</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="endDate">End Date *</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="examTypes">Exam Types (comma-separated)</Label>
              <Input
                id="examTypes"
                value={formData.examTypes}
                onChange={(e) => setFormData(prev => ({ ...prev, examTypes: e.target.value }))}
                placeholder="midterm,endterm,sessional,practical"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="branches">Branches (comma-separated)</Label>
              <Input
                id="branches"
                value={formData.branches}
                onChange={(e) => setFormData(prev => ({ ...prev, branches: e.target.value }))}
                placeholder="CSE,ECE,ME,CE,IT"
              />
            </div>

            <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="sm:w-auto w-full">
                Cancel
              </Button>
              <Button onClick={handleSave} className="sm:w-auto w-full">
                {editingSemester ? 'Update' : 'Add'} Semester
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};