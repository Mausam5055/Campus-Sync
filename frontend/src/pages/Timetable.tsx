import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, Plus, Calendar, User, Edit3, Archive, X } from "lucide-react";
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
  instructor: string;
  startTime: string;
  endTime: string;
  day: number;
  location: string;
  type: string;
  code: string;
  description?: string;
}

const Timetable = () => {
  const isLoading = usePageLoading();
  const { toast } = useToast();
  
  const [classes, setClasses] = useState<ClassData[]>([
    {
      id: 1,
      name: "CSE2001-LTP-AB02-016-ALL",
      instructor: "Dr. Smith",
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
      instructor: "Prof. Johnson",
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
      instructor: "Dr. Wilson",
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
      instructor: "Dr. Brown",
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
      instructor: "Prof. Taylor",
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
      instructor: "Dr. Davis",
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
      instructor: "Dr. Lee",
      startTime: "14:50",
      endTime: "16:20",
      day: 1,
      location: "E14",
      type: "Practical",
      code: "E14-CDS3005-LP-AB02-403-ALL",
      description: "Data Science Practical"
    }
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState<ClassData | null>(null);
  const [newClass, setNewClass] = useState<Partial<ClassData>>({
    name: "",
    instructor: "",
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
    if (!newClass.name || !newClass.startTime || !newClass.endTime || !newClass.location || !newClass.instructor || !newClass.code) {
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
      instructor: newClass.instructor!,
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
      instructor: "",
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
      description: `${classToAdd.name} has been added to your timetable.`,
    });
  };

  const handleArchiveClass = (id: number) => {
    setClasses(prev => prev.filter(c => c.id !== id));
    toast({
      title: "Class Archived",
      description: "The class has been archived and removed from your timetable.",
    });
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
    <div className="space-y-6 min-h-0">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <Calendar className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold">Timetable</h1>
            <p className="text-muted-foreground">Manage your weekly class schedule</p>
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
                Fill in the details to add a new class to your timetable.
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
                <Label htmlFor="instructor">Instructor *</Label>
                <Input
                  id="instructor"
                  value={newClass.instructor || ""}
                  onChange={(e) => setNewClass(prev => ({ ...prev, instructor: e.target.value }))}
                  placeholder="Dr. Smith"
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
            Weekly Schedule
          </CardTitle>
          <CardDescription>Your classes arranged in a weekly timetable</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-scroll overflow-y-hidden -webkit-overflow-scrolling-touch">
            <Table className="min-w-[900px] w-full table-fixed">
              <TableHeader>
                <TableRow className="bg-background">
                  <TableHead className="w-[70px] text-center font-bold border-r sticky left-0 bg-background z-20">
                    <div className="text-[10px] sm:text-xs">THEORY</div>
                  </TableHead>
                  <TableHead className="w-[50px] text-center font-semibold border-r">
                    <div className="text-[9px] sm:text-[10px] leading-tight">Start<br/>End</div>
                  </TableHead>
                  <TableHead className="w-[90px] text-center font-semibold border-r">
                    <div className="text-[9px] sm:text-[10px] leading-tight">08:30<br/>10:00</div>
                  </TableHead>
                  <TableHead className="w-[90px] text-center font-semibold border-r">
                    <div className="text-[9px] sm:text-[10px] leading-tight">10:05<br/>11:35</div>
                  </TableHead>
                  <TableHead className="w-[90px] text-center font-semibold border-r">
                    <div className="text-[9px] sm:text-[10px] leading-tight">11:40<br/>13:10</div>
                  </TableHead>
                  <TableHead className="w-[50px] text-center font-semibold border-r">
                    <div className="text-[9px] sm:text-[10px]">Lunch</div>
                  </TableHead>
                  <TableHead className="w-[90px] text-center font-semibold border-r">
                    <div className="text-[9px] sm:text-[10px] leading-tight">13:15<br/>14:45</div>
                  </TableHead>
                  <TableHead className="w-[90px] text-center font-semibold border-r">
                    <div className="text-[9px] sm:text-[10px] leading-tight">14:50<br/>16:20</div>
                  </TableHead>
                  <TableHead className="w-[90px] text-center font-semibold border-r">
                    <div className="text-[9px] sm:text-[10px] leading-tight">16:25<br/>17:55</div>
                  </TableHead>
                  <TableHead className="w-[90px] text-center font-semibold">
                    <div className="text-[9px] sm:text-[10px] leading-tight">18:00<br/>19:30</div>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {weekDays.map((day, dayIndex) => (
                  <TableRow key={day} className="border-b">
                    <TableCell className="font-semibold text-center bg-background border-r sticky left-0 z-10 text-[10px] sm:text-xs">{day}</TableCell>
                    <TableCell className="font-medium text-center bg-muted/20 border-r text-[9px] sm:text-[10px]">THEORY</TableCell>
                    {timeLabels.map((timeSlot, timeIndex) => {
                      // Special handling for lunch time
                      if (timeSlot.start === "13:15") {
                        return (
                          <TableCell key={`${day}-lunch`} className="text-center border-r bg-secondary/20 py-2 text-[9px] sm:text-[10px]">
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
                          className={`text-center border-r p-0.5 cursor-pointer transition-colors min-h-[60px] ${
                            classForSlot 
                              ? classForSlot.type === 'Lab' || classForSlot.type === 'Practical'
                                ? 'bg-red-100 hover:bg-red-200 text-red-800' 
                                : 'bg-blue-50 hover:bg-blue-100 text-blue-800'
                              : 'hover:bg-muted/30'
                          }`}
                          onClick={() => classForSlot && setSelectedClass(classForSlot)}
                        >
                          {classForSlot ? (
                            <div className="py-1 px-0.5 leading-tight h-full flex flex-col justify-center">
                              <div className="font-bold break-words text-[8px] sm:text-[9px] leading-tight">
                                {classForSlot.code}
                              </div>
                            </div>
                          ) : (
                            <div className="text-[8px] sm:text-[9px] text-muted-foreground py-2">
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

      {/* Class List View */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Today's Classes
            </CardTitle>
            <CardDescription>Your schedule for today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {classes.filter(cls => cls.day === new Date().getDay() - 1).slice(0, 3).map((cls) => (
                <div key={cls.id} className="p-4 border border-border rounded-lg hover:shadow-sm transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={getClassTypeStyle(cls.type)}>
                          {cls.code}
                        </Badge>
                        <span className="font-semibold">{cls.name}</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {cls.startTime} - {cls.endTime}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {cls.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          {cls.instructor}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-1 ml-4">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit3 className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-secondary hover:text-secondary"
                        onClick={() => handleArchiveClass(cls.id)}
                      >
                        <Archive className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
            <CardDescription>Your weekly schedule overview</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-primary/5 rounded-lg">
                <span className="text-sm font-medium">Total Classes</span>
                <span className="text-lg font-bold text-primary">{classes.length}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-secondary/50 rounded-lg">
                <span className="text-sm font-medium">Active Days</span>
                <span className="text-lg font-bold">{new Set(classes.map(c => c.day)).size}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-accent/10 rounded-lg">
                <span className="text-sm font-medium">Class Types</span>
                <span className="text-lg font-bold text-accent-foreground">
                  {new Set(classes.map(c => c.type)).size}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Class Details Dialog */}
      <Dialog open={!!selectedClass} onOpenChange={() => setSelectedClass(null)}>
        <DialogContent className="max-w-[95vw] sm:max-w-md mx-4 sm:mx-auto max-h-[90vh] overflow-y-auto">
          <DialogHeader className="space-y-3">
            <DialogTitle className="flex flex-col sm:flex-row sm:items-center gap-2 text-left">
              <Badge className={getClassTypeStyle(selectedClass?.type || "")} variant="secondary">
                {selectedClass?.code}
              </Badge>
              <span className="text-foreground font-semibold text-base sm:text-lg">
                {selectedClass?.name}
              </span>
            </DialogTitle>
            <DialogDescription className="text-muted-foreground text-sm">
              Class details and information
            </DialogDescription>
          </DialogHeader>
          {selectedClass && (
            <div className="space-y-6 py-2">
              {/* Time and Day Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Time</Label>
                  <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                    <Clock className="h-4 w-4 text-primary flex-shrink-0" />
                    <span className="text-foreground font-medium">
                      {selectedClass.startTime} - {selectedClass.endTime}
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Day</Label>
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <span className="text-foreground font-medium">{weekDays[selectedClass.day]}</span>
                  </div>
                </div>
              </div>
              
              {/* Location and Instructor Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Location</Label>
                  <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                    <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                    <span className="text-foreground font-medium truncate">
                      {selectedClass.location}
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Instructor</Label>
                  <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                    <User className="h-4 w-4 text-primary flex-shrink-0" />
                    <span className="text-foreground font-medium truncate">
                      {selectedClass.instructor}
                    </span>
                  </div>
                </div>
              </div>

              {/* Description */}
              {selectedClass.description && (
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Description</Label>
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="text-foreground text-sm leading-relaxed">{selectedClass.description}</p>
                  </div>
                </div>
              )}
            </div>
          )}
          <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0 pt-4 border-t">
            <Button 
              variant="outline" 
              onClick={() => setSelectedClass(null)}
              className="w-full sm:w-auto order-2 sm:order-1"
            >
              Close
            </Button>
            <Button 
              variant="secondary" 
              onClick={() => {
                if (selectedClass) {
                  handleArchiveClass(selectedClass.id);
                  setSelectedClass(null);
                }
              }}
              className="w-full sm:w-auto order-1 sm:order-2"
            >
              <Archive className="h-4 w-4 mr-2" />
              Archive Class
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Timetable;