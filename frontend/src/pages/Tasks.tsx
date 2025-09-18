import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { 
  Plus, 
  Calendar as CalendarIcon, 
  Flag, 
  Trash2, 
  Search, 
  Edit3, 
  Clock, 
  BookOpen, 
  Target, 
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Star,
  Timer,
  PlusCircle,
  Filter,
  SortAsc,
  Eye
} from "lucide-react";
import { usePageLoading } from "@/hooks/use-page-loading";
import { GenericPageSkeleton } from "@/components/ui/page-skeleton";
import { toast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface Task {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  priority: "low" | "medium" | "high" | "urgent";
  category: "assignment" | "exam" | "project" | "study" | "personal" | "extracurricular";
  subject?: string;
  dueDate?: Date;
  estimatedTime?: number; // in minutes
  actualTime?: number; // in minutes
  createdAt: Date;
  completedAt?: Date;
  grade?: string;
  notes?: string;
  tags: string[];
  isStarred: boolean;
  reminders: Date[];
  subtasks: Subtask[];
  attachments: string[];
}

interface Subtask {
  id: number;
  title: string;
  completed: boolean;
}

const Tasks = () => {
  const isLoading = usePageLoading();

  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: "Computer Science Assignment - Data Structures",
      description: "Implement binary search tree with insertion, deletion, and traversal methods",
      completed: false,
      priority: "urgent",
      category: "assignment",
      subject: "Computer Science",
      dueDate: new Date(2024, 11, 25),
      estimatedTime: 180,
      createdAt: new Date(2024, 11, 15),
      notes: "Focus on balanced tree implementation",
      tags: ["programming", "algorithms"],
      isStarred: true,
      reminders: [new Date(2024, 11, 23)],
      subtasks: [
        { id: 1, title: "Design tree structure", completed: true },
        { id: 2, title: "Implement insertion method", completed: false },
        { id: 3, title: "Implement deletion method", completed: false },
        { id: 4, title: "Add traversal methods", completed: false },
        { id: 5, title: "Write test cases", completed: false }
      ],
      attachments: []
    },
    {
      id: 2,
      title: "Mathematics Midterm Exam",
      description: "Calculus II - Integration techniques and applications",
      completed: false,
      priority: "high",
      category: "exam",
      subject: "Mathematics",
      dueDate: new Date(2024, 11, 23),
      estimatedTime: 240,
      createdAt: new Date(2024, 11, 10),
      notes: "Review integration by parts and partial fractions",
      tags: ["calculus", "integration"],
      isStarred: true,
      reminders: [new Date(2024, 11, 21), new Date(2024, 11, 22)],
      subtasks: [
        { id: 1, title: "Review Chapter 7", completed: true },
        { id: 2, title: "Practice integration techniques", completed: false },
        { id: 3, title: "Solve past exam papers", completed: false }
      ],
      attachments: []
    },
    {
      id: 3,
      title: "Physics Lab Report",
      description: "Electromagnetic induction experiment analysis",
      completed: true,
      priority: "medium",
      category: "assignment",
      subject: "Physics",
      dueDate: new Date(2024, 11, 20),
      estimatedTime: 120,
      actualTime: 135,
      createdAt: new Date(2024, 11, 12),
      completedAt: new Date(2024, 11, 19),
      grade: "A-",
      notes: "Include error analysis section",
      tags: ["lab", "experiment"],
      isStarred: false,
      reminders: [],
      subtasks: [],
      attachments: []
    }
  ]);

  const [newTaskDialogOpen, setNewTaskDialogOpen] = useState(false);
  const [editTaskDialogOpen, setEditTaskDialogOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPriority, setFilterPriority] = useState<string>("all");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("dueDate");

  // New task form state
  const [taskForm, setTaskForm] = useState({
    title: "",
    description: "",
    priority: "medium" as Task["priority"],
    category: "assignment" as Task["category"],
    subject: "",
    dueDate: undefined as Date | undefined,
    estimatedTime: "",
    tags: "",
    notes: ""
  });

  useEffect(() => {
    // Check for due tasks and show notifications
    const now = new Date();
    const dueTasks = tasks.filter(task => 
      !task.completed && 
      task.dueDate && 
      task.dueDate <= new Date(now.getTime() + 24 * 60 * 60 * 1000) // Due within 24 hours
    );

    if (dueTasks.length > 0) {
      toast({
        title: "Tasks Due Soon!",
        description: `You have ${dueTasks.length} task(s) due within 24 hours.`,
        variant: "destructive"
      });
    }
  }, []);

  const subjects = ["Computer Science", "Mathematics", "Physics", "Chemistry", "Biology", "English", "History", "Economics"];
  const priorities = [
    { value: "low", label: "Low", color: "bg-green-100 text-green-800 border-green-300 dark:bg-green-900 dark:text-green-300" },
    { value: "medium", label: "Medium", color: "bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-900 dark:text-blue-300" },
    { value: "high", label: "High", color: "bg-orange-100 text-orange-800 border-orange-300 dark:bg-orange-900 dark:text-orange-300" },
    { value: "urgent", label: "Urgent", color: "bg-red-100 text-red-800 border-red-300 dark:bg-red-900 dark:text-red-300" }
  ];

  const categories = [
    { value: "assignment", label: "Assignment", icon: BookOpen },
    { value: "exam", label: "Exam", icon: Target },
    { value: "project", label: "Project", icon: TrendingUp },
    { value: "study", label: "Study Session", icon: Clock },
    { value: "personal", label: "Personal", icon: Star },
    { value: "extracurricular", label: "Extracurricular", icon: PlusCircle }
  ];

  const addTask = () => {
    if (!taskForm.title.trim()) return;

    const newTask: Task = {
      id: Date.now(),
      title: taskForm.title,
      description: taskForm.description,
      completed: false,
      priority: taskForm.priority,
      category: taskForm.category,
      subject: taskForm.subject,
      dueDate: taskForm.dueDate,
      estimatedTime: taskForm.estimatedTime ? parseInt(taskForm.estimatedTime) : undefined,
      createdAt: new Date(),
      notes: taskForm.notes,
      tags: taskForm.tags.split(",").map(tag => tag.trim()).filter(Boolean),
      isStarred: false,
      reminders: [],
      subtasks: [],
      attachments: []
    };

    setTasks([...tasks, newTask]);
    setTaskForm({
      title: "",
      description: "",
      priority: "medium",
      category: "assignment",
      subject: "",
      dueDate: undefined,
      estimatedTime: "",
      tags: "",
      notes: ""
    });
    setNewTaskDialogOpen(false);
    
    toast({
      title: "Task Added!",
      description: `"${newTask.title}" has been added to your task list.`
    });
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => {
      if (task.id === id) {
        const updated = { 
          ...task, 
          completed: !task.completed,
          completedAt: !task.completed ? new Date() : undefined
        };
        
        if (!task.completed) {
          toast({
            title: "Task Completed! 🎉",
            description: `Great job completing "${task.title}"!`
          });
        }
        
        return updated;
      }
      return task;
    }));
  };

  const toggleStarred = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, isStarred: !task.isStarred } : task
    ));
  };

  const deleteTask = (id: number) => {
    const task = tasks.find(t => t.id === id);
    setTasks(tasks.filter(task => task.id !== id));
    
    if (task) {
      toast({
        title: "Task Deleted",
        description: `"${task.title}" has been removed.`,
        variant: "destructive"
      });
    }
  };

  const updateSubtask = (taskId: number, subtaskId: number) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        return {
          ...task,
          subtasks: task.subtasks.map(subtask =>
            subtask.id === subtaskId 
              ? { ...subtask, completed: !subtask.completed }
              : subtask
          )
        };
      }
      return task;
    }));
  };

  const getPriorityInfo = (priority: string) => {
    return priorities.find(p => p.value === priority) || priorities[1];
  };

  const getCategoryInfo = (category: string) => {
    return categories.find(c => c.value === category) || categories[0];
  };

  const getTasksWithFiltersAndSort = () => {
    let filtered = tasks.filter(task => {
      const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           task.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           task.subject?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPriority = filterPriority === "all" || task.priority === filterPriority;
      const matchesCategory = filterCategory === "all" || task.category === filterCategory;
      
      return matchesSearch && matchesPriority && matchesCategory;
    });

    // Sort tasks
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "dueDate":
          if (!a.dueDate && !b.dueDate) return 0;
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return a.dueDate.getTime() - b.dueDate.getTime();
        case "priority":
          const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        case "created":
          return b.createdAt.getTime() - a.createdAt.getTime();
        case "title":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    return filtered;
  };

  const getTaskStats = () => {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const pending = total - completed;
    const overdue = tasks.filter(t => !t.completed && t.dueDate && t.dueDate < new Date()).length;
    const dueToday = tasks.filter(t => {
      if (!t.dueDate || t.completed) return false;
      const today = new Date();
      return t.dueDate.toDateString() === today.toDateString();
    }).length;

    return { total, completed, pending, overdue, dueToday };
  };

  const TaskCard = ({ task }: { task: Task }) => {
    const priorityInfo = getPriorityInfo(task.priority);
    const categoryInfo = getCategoryInfo(task.category);
    const Icon = categoryInfo.icon;
    const completedSubtasks = task.subtasks.filter(st => st.completed).length;
    const totalSubtasks = task.subtasks.length;
    const isOverdue = task.dueDate && task.dueDate < new Date() && !task.completed;
    const isDueToday = task.dueDate && task.dueDate.toDateString() === new Date().toDateString();

    return (
      <Card className={`transition-all duration-200 hover:shadow-md ${task.completed ? 'opacity-75' : ''} ${isOverdue ? 'border-red-300 dark:border-red-800' : ''}`}>
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Checkbox
              checked={task.completed}
              onCheckedChange={() => toggleTask(task.id)}
              className="mt-1"
            />
            
            <div className="flex-1 space-y-3">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Icon className="h-4 w-4 text-muted-foreground" />
                    <h3 className={`font-semibold ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                      {task.title}
                    </h3>
                    {task.isStarred && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
                    {isOverdue && <AlertTriangle className="h-4 w-4 text-red-500" />}
                  </div>
                  
                  {task.description && (
                    <p className="text-sm text-muted-foreground mb-2">{task.description}</p>
                  )}
                </div>
                
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleStarred(task.id)}
                    className="h-8 w-8 p-0"
                  >
                    <Star className={`h-4 w-4 ${task.isStarred ? 'text-yellow-500 fill-current' : 'text-muted-foreground'}`} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSelectedTask(task);
                      setEditTaskDialogOpen(true);
                    }}
                    className="h-8 w-8 p-0"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteTask(task.id)}
                    className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className={priorityInfo.color}>
                  <Flag className="h-3 w-3 mr-1" />
                  {priorityInfo.label}
                </Badge>
                
                <Badge variant="secondary">{categoryInfo.label}</Badge>
                
                {task.subject && (
                  <Badge variant="outline">{task.subject}</Badge>
                )}
                
                {task.dueDate && (
                  <Badge variant="outline" className={isDueToday ? 'border-orange-300 bg-orange-50 text-orange-800 dark:border-orange-800 dark:bg-orange-950 dark:text-orange-300' : ''}>
                    <CalendarIcon className="h-3 w-3 mr-1" />
                    {format(task.dueDate, "MMM dd")}
                  </Badge>
                )}

                {task.estimatedTime && (
                  <Badge variant="outline">
                    <Timer className="h-3 w-3 mr-1" />
                    {task.estimatedTime}m
                  </Badge>
                )}

                {task.completed && task.grade && (
                  <Badge variant="outline" className="bg-green-50 text-green-800 border-green-300 dark:bg-green-950 dark:text-green-300">
                    Grade: {task.grade}
                  </Badge>
                )}
              </div>

              {/* Subtasks Progress */}
              {totalSubtasks > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      Subtasks: {completedSubtasks}/{totalSubtasks}
                    </span>
                    <span className="text-muted-foreground">
                      {Math.round((completedSubtasks / totalSubtasks) * 100)}%
                    </span>
                  </div>
                  <Progress value={(completedSubtasks / totalSubtasks) * 100} className="h-2" />
                  
                  <div className="space-y-1 ml-4">
                    {task.subtasks.slice(0, 3).map((subtask) => (
                      <div key={subtask.id} className="flex items-center gap-2 text-sm">
                        <Checkbox
                          checked={subtask.completed}
                          onCheckedChange={() => updateSubtask(task.id, subtask.id)}
                          className="h-3 w-3"
                        />
                        <span className={subtask.completed ? 'line-through text-muted-foreground' : ''}>
                          {subtask.title}
                        </span>
                      </div>
                    ))}
                    {task.subtasks.length > 3 && (
                      <div className="text-xs text-muted-foreground ml-5">
                        +{task.subtasks.length - 3} more subtasks
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Tags */}
              {task.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {task.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs bg-muted">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const stats = getTaskStats();
  const filteredTasks = getTasksWithFiltersAndSort();

  if (isLoading) {
    return <GenericPageSkeleton />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="mobile-heading font-bold">Tasks & Assignments</h1>
          <p className="text-muted-foreground mobile-hide-description">Manage your academic tasks and personal goals efficiently</p>
        </div>
        
        <Dialog open={newTaskDialogOpen} onOpenChange={setNewTaskDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Task
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto sm:mx-4">
            <DialogHeader>
              <DialogTitle>Create New Task</DialogTitle>
              <DialogDescription>
                Add a new task to your academic or personal schedule
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    placeholder="Enter task title..."
                    value={taskForm.title}
                    onChange={(e) => setTaskForm({ ...taskForm, title: e.target.value })}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Select value={taskForm.subject} onValueChange={(value) => setTaskForm({ ...taskForm, subject: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      {subjects.map((subject) => (
                        <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the task details..."
                  value={taskForm.description}
                  onChange={(e) => setTaskForm({ ...taskForm, description: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Priority</Label>
                  <Select value={taskForm.priority} onValueChange={(value: Task["priority"]) => setTaskForm({ ...taskForm, priority: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {priorities.map((priority) => (
                        <SelectItem key={priority.value} value={priority.value}>
                          {priority.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select value={taskForm.category} onValueChange={(value: Task["category"]) => setTaskForm({ ...taskForm, category: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="estimatedTime">Estimated Time (min)</Label>
                  <Input
                    id="estimatedTime"
                    type="number"
                    placeholder="e.g., 120"
                    value={taskForm.estimatedTime}
                    onChange={(e) => setTaskForm({ ...taskForm, estimatedTime: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Due Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !taskForm.dueDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {taskForm.dueDate ? format(taskForm.dueDate, "PPP") : "Select due date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={taskForm.dueDate}
                      onSelect={(date) => setTaskForm({ ...taskForm, dueDate: date })}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">Tags (comma separated)</Label>
                <Input
                  id="tags"
                  placeholder="e.g., programming, urgent, midterm"
                  value={taskForm.tags}
                  onChange={(e) => setTaskForm({ ...taskForm, tags: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Additional notes or reminders..."
                  value={taskForm.notes}
                  onChange={(e) => setTaskForm({ ...taskForm, notes: e.target.value })}
                  rows={2}
                />
              </div>

              <div className="flex flex-col-reverse sm:flex-row justify-end gap-2">
                <Button variant="outline" onClick={() => setNewTaskDialogOpen(false)} className="w-full sm:w-auto">
                  Cancel
                </Button>
                <Button onClick={addTask} disabled={!taskForm.title.trim()} className="w-full sm:w-auto">
                  Create Task
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-blue-500" />
              <div>
                <div className="text-2xl font-bold">{stats.total}</div>
                <div className="text-sm text-muted-foreground">Total Tasks</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-orange-500" />
              <div>
                <div className="text-2xl font-bold">{stats.pending}</div>
                <div className="text-sm text-muted-foreground">Pending</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              <div>
                <div className="text-2xl font-bold">{stats.completed}</div>
                <div className="text-sm text-muted-foreground">Completed</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              <div>
                <div className="text-2xl font-bold">{stats.overdue}</div>
                <div className="text-sm text-muted-foreground">Overdue</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5 text-purple-500" />
              <div>
                <div className="text-2xl font-bold">{stats.dueToday}</div>
                <div className="text-sm text-muted-foreground">Due Today</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={filterPriority} onValueChange={setFilterPriority}>
              <SelectTrigger>
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                {priorities.map((priority) => (
                  <SelectItem key={priority.value} value={priority.value}>
                    {priority.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger>
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SortAsc className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dueDate">Due Date</SelectItem>
                <SelectItem value="priority">Priority</SelectItem>
                <SelectItem value="created">Created Date</SelectItem>
                <SelectItem value="title">Title</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Task List */}
      <div className="space-y-4">
        {filteredTasks.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <Target className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No tasks found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm || filterPriority !== "all" || filterCategory !== "all" 
                  ? "Try adjusting your filters or search term"
                  : "Create your first task to get started"}
              </p>
              {!searchTerm && filterPriority === "all" && filterCategory === "all" && (
                <Button onClick={() => setNewTaskDialogOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Your First Task
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          filteredTasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))
        )}
      </div>

      {/* Task Detail Dialog */}
      <Dialog open={editTaskDialogOpen} onOpenChange={setEditTaskDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedTask && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  {React.createElement(getCategoryInfo(selectedTask.category).icon, { className: "h-5 w-5" })}
                  {selectedTask.title}
                  {selectedTask.isStarred && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
                </DialogTitle>
                <DialogDescription>
                  {selectedTask.subject && `${selectedTask.subject} • `}
                  {selectedTask.category} • Created {format(selectedTask.createdAt, "PPP")}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                {selectedTask.description && (
                  <div>
                    <h4 className="font-medium mb-2">Description</h4>
                    <p className="text-muted-foreground">{selectedTask.description}</p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Details</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Priority:</span>
                        <Badge className={getPriorityInfo(selectedTask.priority).color}>
                          {getPriorityInfo(selectedTask.priority).label}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Category:</span>
                        <span>{getCategoryInfo(selectedTask.category).label}</span>
                      </div>
                      {selectedTask.dueDate && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Due Date:</span>
                          <span>{format(selectedTask.dueDate, "PPP")}</span>
                        </div>
                      )}
                      {selectedTask.estimatedTime && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Estimated Time:</span>
                          <span>{selectedTask.estimatedTime} minutes</span>
                        </div>
                      )}
                      {selectedTask.actualTime && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Actual Time:</span>
                          <span>{selectedTask.actualTime} minutes</span>
                        </div>
                      )}
                      {selectedTask.grade && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Grade:</span>
                          <Badge variant="outline" className="bg-green-50 text-green-800">
                            {selectedTask.grade}
                          </Badge>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Progress</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Status:</span>
                        <Badge variant={selectedTask.completed ? "default" : "secondary"}>
                          {selectedTask.completed ? "Completed" : "In Progress"}
                        </Badge>
                      </div>
                      {selectedTask.subtasks.length > 0 && (
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-muted-foreground">Subtasks:</span>
                            <span>{selectedTask.subtasks.filter(st => st.completed).length}/{selectedTask.subtasks.length}</span>
                          </div>
                          <Progress 
                            value={(selectedTask.subtasks.filter(st => st.completed).length / selectedTask.subtasks.length) * 100} 
                            className="h-2" 
                          />
                        </div>
                      )}
                      {selectedTask.completedAt && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Completed:</span>
                          <span>{format(selectedTask.completedAt, "PPP")}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {selectedTask.subtasks.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-3">Subtasks</h4>
                    <div className="space-y-2">
                      {selectedTask.subtasks.map((subtask) => (
                        <div key={subtask.id} className="flex items-center gap-2 p-2 rounded border">
                          <Checkbox
                            checked={subtask.completed}
                            onCheckedChange={() => updateSubtask(selectedTask.id, subtask.id)}
                          />
                          <span className={subtask.completed ? 'line-through text-muted-foreground' : ''}>
                            {subtask.title}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selectedTask.tags.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2">Tags</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedTask.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="bg-muted">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {selectedTask.notes && (
                  <div>
                    <h4 className="font-medium mb-2">Notes</h4>
                    <div className="p-3 bg-muted rounded-md">
                      <p className="text-sm">{selectedTask.notes}</p>
                    </div>
                  </div>
                )}

                <div className="flex justify-end gap-2 pt-4 border-t">
                  <Button variant="outline" onClick={() => setEditTaskDialogOpen(false)}>
                    Close
                  </Button>
                  <Button 
                    variant={selectedTask.completed ? "outline" : "default"}
                    onClick={() => {
                      toggleTask(selectedTask.id);
                      setEditTaskDialogOpen(false);
                    }}
                  >
                    {selectedTask.completed ? "Mark as Incomplete" : "Mark as Complete"}
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Tasks;