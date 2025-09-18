import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, Plus, Calendar, User, Edit3, Archive, X, RotateCcw } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePageLoading } from "@/hooks/use-page-loading";
import { GenericPageSkeleton } from "@/components/ui/page-skeleton";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface ClassData {
  id: number;
  name: string;
  students: string;
  startTime: string;
  endTime: string;
  day: number;
  location: string;
  type: string;
  code: string;
  description?: string;
}

const TeacherTimetable = () => {
  const isLoading = usePageLoading();
  const { toast } = useToast();
  
  const [classes, setClasses] = useState<ClassData[]>([
    {
      id: 1,
      name: "CSE2001-LTP-AB02-016-ALL",
      students: "AB02 Batch (32 students)",
      startTime: "08:30",
      endTime: "10:00",
      day: 0,
      location: "A11",
      type: "Theory",
      code: "A11-CSE2001-LTP-AB02-016-ALL",
      description: "Computer Science Engineering Theory"
    },
    {
      id: 2,
      name: "SCD3009-LTP-AB02-216-ALL",
      students: "AB02 Batch (28 students)",
      startTime: "10:05",
      endTime: "11:35",
      day: 0,
      location: "B11",
      type: "Lab",
      code: "B11-SCD3009-LTP-AB02-216-ALL",
      description: "Software Development Lab"
    },
    {
      id: 3,
      name: "CSE3003-LTP-AB02-019-ALL",
      students: "AB02 Batch (30 students)",
      startTime: "11:40",
      endTime: "13:10",
      day: 0,
      location: "C11",
      type: "Theory",
      code: "C11-CSE3003-LTP-AB02-019-ALL",
      description: "Computer Science Theory"
    },
    {
      id: 4,
      name: "CDS3005-LP-AB02-403-ALL",
      students: "AB02 Batch (25 students)",
      startTime: "16:25",
      endTime: "17:55",
      day: 0,
      location: "B21",
      type: "Practical",
      code: "B21-CDS3005-LP-AB02-403-ALL",
      description: "Data Science Practical"
    },
    {
      id: 5,
      name: "UHV0002-LT-CR-015-ALL",
      students: "CR Batch (45 students)",
      startTime: "08:30",
      endTime: "10:00",
      day: 1,
      location: "D11",
      type: "Theory",
      code: "D11-UHV0002-LT-CR-015-ALL",
      description: "Universal Human Values"
    },
    {
      id: 6,
      name: "MAT3002-LT-AB-127-ALL",
      students: "AB Batch (35 students)",
      startTime: "11:40",
      endTime: "13:10",
      day: 1,
      location: "F11",
      type: "Theory",
      code: "F11-MAT3002-LT-AB-127-ALL",
      description: "Mathematics Theory"
    },
    {
      id: 7,
      name: "CDS3005-LP-AB02-403-ALL",
      students: "AB02 Batch (25 students)",
      startTime: "14:50",
      endTime: "16:20",
      day: 1,
      location: "E14",
      type: "Practical",
      code: "E14-CDS3005-LP-AB02-403-ALL",
      description: "Data Science Practical"
    }
  ]);

  const [archivedClasses, setArchivedClasses] = useState<ClassData[]>([]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState<ClassData | null>(null);
  const [newClass, setNewClass] = useState<Partial<ClassData>>({
    name: "",
    students: "",
    startTime: "",
    endTime: "",
    day: 0,
    location: "",
    type: "Lecture",
    code: "",
    description: ""
  });
  const weekDays = ["MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const timeSlots = ["08:30", "10:05", "11:40", "13:15", "14:50", "16:25", "18:00"];
  const timeLabels = [
    { start: "08:30", end: "10:00" },
    { start: "10:05", end: "11:35" },
    { start: "11:40", end: "13:10" },
    { start: "13:15", end: "14:45" },
    { start: "14:50", end: "16:20" },
    { start: "16:25", end: "17:55" },
    { start: "18:00", end: "19:30" }
  ];

  const getClassTypeStyle = (type: string) => {
    switch (type) {
      case "Lecture": 
        return "bg-primary/10 border-primary/20 text-primary";
      case "Tutorial": 
        return "bg-secondary border-secondary-foreground/20 text-secondary-foreground";
      case "Lab": 
        return "bg-accent/10 border-accent/20 text-accent-foreground";
      case "Seminar":
        return "bg-muted border-muted-foreground/20 text-muted-foreground";
      default: 
        return "bg-muted border-border text-muted-foreground";
    }
  };

  const handleAddClass = () => {
    if (!newClass.name || !newClass.startTime || !newClass.endTime || !newClass.location || !newClass.students || !newClass.code) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const id = Math.max(...classes.map(c => c.id), 0) + 1;
    const classToAdd: ClassData = {
      id,
      name: newClass.name!,
      students: newClass.students!,
      startTime: newClass.startTime!,
      endTime: newClass.endTime!,
      day: newClass.day || 0,
      location: newClass.location!,
      type: newClass.type || "Lecture",
      code: newClass.code!,
      description: newClass.description || ""
    };

    setClasses(prev => [...prev, classToAdd]);
    setNewClass({
      name: "",
      students: "",
      startTime: "",
      endTime: "",
      day: 0,
      location: "",
      type: "Lecture",
      code: "",
      description: ""
    });
    setIsAddDialogOpen(false);
    
    toast({
      title: "Class Added",
      description: `${classToAdd.name} has been added to your teaching schedule.`,
    });
  };

  const handleArchiveClass = (id: number) => {
    const classToArchive = classes.find(c => c.id === id);
    if (classToArchive) {
      setClasses(prev => prev.filter(c => c.id !== id));
      setArchivedClasses(prev => [...prev, classToArchive]);
      toast({
        title: "Class Archived",
        description: "The class has been archived and moved to archived classes.",
      });
    }
  };

  const handleRestoreClass = (id: number) => {
    const classToRestore = archivedClasses.find(c => c.id === id);
    if (classToRestore) {
      setArchivedClasses(prev => prev.filter(c => c.id !== id));
      setClasses(prev => [...prev, classToRestore]);
      toast({
        title: "Class Restored",
        description: "The class has been restored to your active teaching schedule.",
      });
    }
  };

  const isTimeInSlot = (classStartTime: string, classEndTime: string, slotTime: string) => {
    const slotHour = parseInt(slotTime.split(':')[0]);
    const startHour = parseInt(classStartTime.split(':')[0]);
    const endHour = parseInt(classEndTime.split(':')[0]);
    return slotHour >= startHour && slotHour < endHour;
  };

  const getClassForSlot = (dayIndex: number, slotTime: string) => {
    return classes.find(cls => 
      cls.day === dayIndex && isTimeInSlot(cls.startTime, cls.endTime, slotTime)
    );
  };

  if (isLoading) {
    return <GenericPageSkeleton />
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <Calendar className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold">Teaching Schedule</h1>
            <p className="text-muted-foreground">Manage your weekly teaching timetable</p>
          </div>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Class
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Class</DialogTitle>
              <DialogDescription>
                Fill in the details to add a new class to your teaching schedule.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="code">Course Code *</Label>
                  <Input
                    id="code"
                    value={newClass.code || ""}
                    onChange={(e) => setNewClass(prev => ({ ...prev, code: e.target.value }))}
                    placeholder="CS101"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Type *</Label>
                  <Select value={newClass.type || "Lecture"} onValueChange={(value) => setNewClass(prev => ({ ...prev, type: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Lecture">Lecture</SelectItem>
                      <SelectItem value="Tutorial">Tutorial</SelectItem>
                      <SelectItem value="Lab">Lab</SelectItem>
                      <SelectItem value="Seminar">Seminar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="name">Course Name *</Label>
                <Input
                  id="name"
                  value={newClass.name || ""}
                  onChange={(e) => setNewClass(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Computer Science 101"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="students">Students/Batch *</Label>
                <Input
                  id="students"
                  value={newClass.students || ""}
                  onChange={(e) => setNewClass(prev => ({ ...prev, students: e.target.value }))}
                  placeholder="AB02 Batch (30 students)"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  value={newClass.location || ""}
                  onChange={(e) => setNewClass(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="A-101"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="day">Day *</Label>
                <Select value={newClass.day?.toString() || "0"} onValueChange={(value) => setNewClass(prev => ({ ...prev, day: parseInt(value) }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {weekDays.map((day, index) => (
                      <SelectItem key={index} value={index.toString()}>{day}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startTime">Start Time *</Label>
                  <Select value={newClass.startTime || ""} onValueChange={(value) => setNewClass(prev => ({ ...prev, startTime: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select start time" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((time) => (
                        <SelectItem key={time} value={time}>{time}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endTime">End Time *</Label>
                  <Select value={newClass.endTime || ""} onValueChange={(value) => setNewClass(prev => ({ ...prev, endTime: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select end time" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((time) => (
                        <SelectItem key={time} value={time}>{time}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea
                  id="description"
                  value={newClass.description || ""}
                  onChange={(e) => setNewClass(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Course description..."
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddClass}>
                Add Class
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Weekly Schedule Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Weekly Teaching Schedule
          </CardTitle>
          <CardDescription>Your classes arranged in a weekly timetable</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-background">
                  <TableHead className="w-16 text-center font-bold border-r sticky left-0 bg-background z-20">THEORY</TableHead>
                  <TableHead className="text-center font-semibold border-r">Start<br/>End</TableHead>
                  <TableHead className="text-center font-semibold border-r">08:30<br/>10:00</TableHead>
                  <TableHead className="text-center font-semibold border-r">10:05<br/>11:35</TableHead>
                  <TableHead className="text-center font-semibold border-r">11:40<br/>13:10</TableHead>
                  <TableHead className="text-center font-semibold border-r">Lunch</TableHead>
                  <TableHead className="text-center font-semibold border-r">13:15<br/>14:45</TableHead>
                  <TableHead className="text-center font-semibold border-r">14:50<br/>16:20</TableHead>
                  <TableHead className="text-center font-semibold border-r">16:25<br/>17:55</TableHead>
                  <TableHead className="text-center font-semibold">18:00<br/>19:30</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {weekDays.map((day, dayIndex) => (
                  <TableRow key={day} className="border-b">
                    <TableCell className="font-semibold text-center bg-background border-r sticky left-0 z-10">{day}</TableCell>
                    <TableCell className="font-medium text-center bg-muted/20 border-r">THEORY</TableCell>
                    {timeLabels.map((timeSlot, timeIndex) => {
                      // Special handling for lunch time
                      if (timeSlot.start === "13:15") {
                        return (
                          <TableCell key={`${day}-lunch`} className="text-center border-r bg-secondary/20 py-4">
                            Lunch
                          </TableCell>
                        );
                      }
                      
                      const classForSlot = classes.find(cls => 
                        cls.day === dayIndex && 
                        cls.startTime === timeSlot.start
                      );
                      
                      // Generate room codes for empty slots
                      const getRoomCode = (dayIdx: number, timeIdx: number) => {
                        const letters = ['A', 'B', 'C', 'D', 'E', 'F'];
                        const numbers = ['21', '22', '23', '14', '24', '23'];
                        if (timeIdx === 5) return letters[dayIdx] + numbers[dayIdx]; // Last column
                        return letters[dayIdx] + (21 + timeIdx);
                      };
                      
                      return (
                        <TableCell 
                          key={`${day}-${timeSlot.start}`} 
                          className={`text-center border-r p-1 cursor-pointer transition-colors min-h-[60px] ${
                            classForSlot 
                              ? classForSlot.type === 'Lab' || classForSlot.type === 'Practical'
                                ? 'bg-red-100 hover:bg-red-200 text-red-800' 
                                : 'bg-blue-50 hover:bg-blue-100 text-blue-800'
                              : 'hover:bg-muted/30'
                          }`}
                          onClick={() => classForSlot && setSelectedClass(classForSlot)}
                        >
                          {classForSlot ? (
                            <div className="text-[10px] py-2 px-1 leading-tight">
                              <div className="font-bold break-words">
                                {classForSlot.code}
                              </div>
                            </div>
                          ) : (
                            <div className="text-xs text-muted-foreground py-3">
                              {timeIndex !== 3 ? getRoomCode(dayIndex, timeIndex) : ''}
                            </div>
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Class Details Modal */}
      <Dialog open={!!selectedClass} onOpenChange={() => setSelectedClass(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Class Details
            </DialogTitle>
          </DialogHeader>
          {selectedClass && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Course Code</Label>
                  <p className="text-sm font-mono">{selectedClass.code}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Type</Label>
                  <Badge variant="outline" className={getClassTypeStyle(selectedClass.type)}>
                    {selectedClass.type}
                  </Badge>
                </div>
              </div>
              
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Course Name</Label>
                <p className="text-sm">{selectedClass.name}</p>
              </div>
              
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Students</Label>
                <p className="text-sm flex items-center gap-2">
                  <User className="h-4 w-4" />
                  {selectedClass.students}
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Time</Label>
                  <p className="text-sm flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {selectedClass.startTime} - {selectedClass.endTime}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Location</Label>
                  <p className="text-sm flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {selectedClass.location}
                  </p>
                </div>
              </div>
              
              {selectedClass.description && (
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Description</Label>
                  <p className="text-sm">{selectedClass.description}</p>
                </div>
              )}
            </div>
          )}
          <DialogFooter className="gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setSelectedClass(null)}
            >
              <X className="h-4 w-4 mr-2" />
              Close
            </Button>
            <Button 
              variant="secondary" 
              size="sm"
              onClick={() => {
                if (selectedClass) {
                  handleArchiveClass(selectedClass.id);
                  setSelectedClass(null);
                }
              }}
            >
              <Archive className="h-4 w-4 mr-2" />
              Archive Class
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Classes Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Teaching Classes Management
          </CardTitle>
          <CardDescription>Manage your active and archived teaching classes</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="active" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="active">Active Classes ({classes.length})</TabsTrigger>
              <TabsTrigger value="archived">Archived Classes ({archivedClasses.length})</TabsTrigger>
            </TabsList>
            
            <TabsContent value="active" className="space-y-3 mt-4">
              {classes.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  No active classes. Add your first class to get started.
                </p>
              ) : (
                classes.map((classItem) => (
                  <div
                    key={classItem.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge variant="outline" className={getClassTypeStyle(classItem.type)}>
                          {classItem.type}
                        </Badge>
                        <span className="font-mono text-sm text-muted-foreground">{classItem.code}</span>
                      </div>
                      <h3 className="font-semibold mb-1">{classItem.name}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          {classItem.students}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {weekDays[classItem.day]} {classItem.startTime}-{classItem.endTime}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {classItem.location}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSelectedClass(classItem)}
                        title="View Details"
                      >
                        <Edit3 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleArchiveClass(classItem.id)}
                        title="Archive Class"
                      >
                        <Archive className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </TabsContent>
            
            <TabsContent value="archived" className="space-y-3 mt-4">
              {archivedClasses.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  No archived classes. Archive classes to see them here.
                </p>
              ) : (
                archivedClasses.map((classItem) => (
                  <div
                    key={classItem.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors opacity-70"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge variant="outline" className={getClassTypeStyle(classItem.type)}>
                          {classItem.type}
                        </Badge>
                        <span className="font-mono text-sm text-muted-foreground">{classItem.code}</span>
                        <Badge variant="secondary" className="text-xs">Archived</Badge>
                      </div>
                      <h3 className="font-semibold mb-1">{classItem.name}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          {classItem.students}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {weekDays[classItem.day]} {classItem.startTime}-{classItem.endTime}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {classItem.location}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSelectedClass(classItem)}
                        title="View Details"
                      >
                        <Edit3 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRestoreClass(classItem.id)}
                        title="Restore Class"
                      >
                        <RotateCcw className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeacherTimetable;