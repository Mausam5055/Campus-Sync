import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, Pause, RotateCcw, Settings, Coffee, Clock, Target, TrendingUp, BookOpen, CheckSquare, Plus, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { usePageLoading } from "@/hooks/use-page-loading";
import { GenericPageSkeleton } from "@/components/ui/page-skeleton";

interface Task {
  id: number;
  text: string;
  completed: boolean;
  pomodoros: number;
}

const Pomodoro = () => {
  const isLoading = usePageLoading();

  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<"work" | "break" | "longBreak">("work");
  const [sessions, setSessions] = useState(0);
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, text: "Complete project documentation", completed: false, pomodoros: 3 },
    { id: 2, text: "Review code changes", completed: true, pomodoros: 2 },
    { id: 3, text: "Plan next sprint", completed: false, pomodoros: 1 }
  ]);
  const [newTask, setNewTask] = useState("");
  const [dailyGoal, setDailyGoal] = useState(8);
  const { toast } = useToast();

  const modes = {
    work: { duration: 25 * 60, label: "Focus Time", color: "bg-red-500" },
    break: { duration: 5 * 60, label: "Short Break", color: "bg-green-500" },
    longBreak: { duration: 15 * 60, label: "Long Break", color: "bg-blue-500" }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleTimerComplete();
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft]);

  const handleTimerComplete = () => {
    setIsActive(false);
    
    if (mode === "work") {
      setSessions(prev => prev + 1);
      toast({
        title: "Great job! 🎉",
        description: "Time for a break!",
      });
      
      // Auto switch to break
      if ((sessions + 1) % 4 === 0) {
        setMode("longBreak");
        setTimeLeft(modes.longBreak.duration);
      } else {
        setMode("break");
        setTimeLeft(modes.break.duration);
      }
    } else {
      toast({
        title: "Break's over! 💪",
        description: "Ready to focus again?",
      });
      setMode("work");
      setTimeLeft(modes.work.duration);
    }
  };

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { 
        id: Date.now(), 
        text: newTask, 
        completed: false, 
        pomodoros: 0 
      }]);
      setNewTask("");
    }
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(modes[mode].duration);
  };

  const switchMode = (newMode: "work" | "break" | "longBreak") => {
    setMode(newMode);
    setTimeLeft(modes[newMode].duration);
    setIsActive(false);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const progress = ((modes[mode].duration - timeLeft) / modes[mode].duration) * 100;

  if (isLoading) {
    return <GenericPageSkeleton />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-gradient-to-br from-primary to-primary/70 shadow-lg">
            <Clock className="h-8 w-8 text-primary-foreground" />
          </div>
          <div>
            <h1 className="mobile-heading-large font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Pomodoro Timer</h1>
            <p className="text-muted-foreground text-lg mobile-hide-description">Stay focused and productive</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2 border-primary/30 hover:bg-primary/10">
            <Settings className="h-4 w-4" />
            Settings
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Timer Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Mode Selector */}
          <Card className="bg-gradient-to-r from-card/95 to-card/90 backdrop-blur-lg border-primary/20">
            <CardContent className="pt-6">
              <div className="flex flex-wrap justify-center gap-2">
                <Button
                  variant={mode === "work" ? "default" : "outline"}
                  onClick={() => switchMode("work")}
                  size="sm"
                  className={mode === "work" ? "bg-primary hover:bg-primary/90" : ""}
                >
                  Focus (25m)
                </Button>
                <Button
                  variant={mode === "break" ? "default" : "outline"}
                  onClick={() => switchMode("break")}
                  size="sm"
                  className={mode === "break" ? "bg-green-600 hover:bg-green-700" : ""}
                >
                  <Coffee className="h-4 w-4 mr-1" />
                  Break (5m)
                </Button>
                <Button
                  variant={mode === "longBreak" ? "default" : "outline"}
                  onClick={() => switchMode("longBreak")}
                  size="sm"
                  className={mode === "longBreak" ? "bg-blue-600 hover:bg-blue-700" : ""}
                >
                  Long Break (15m)
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Timer Display */}
          <Card className="bg-gradient-to-br from-card to-card/50 shadow-2xl border-primary/20">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold">{modes[mode].label}</CardTitle>
              <CardDescription className="text-lg">Session {sessions + 1}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="text-center">
                <div className="text-4xl sm:text-6xl lg:text-8xl font-mono font-bold mb-6 text-foreground dark:text-white">
                  {formatTime(timeLeft)}
                </div>
                <Progress value={progress} className="h-4 rounded-full shadow-inner" />
                <div className="flex justify-between text-sm text-muted-foreground mt-2">
                  <span>Progress: {Math.round(progress)}%</span>
                  <span>Remaining: {formatTime(timeLeft)}</span>
                </div>
              </div>

              <div className="flex justify-center gap-4">
                <Button
                  onClick={toggleTimer}
                  size="lg"
                  className="px-12 py-6 text-lg bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg"
                >
                  {isActive ? (
                    <>
                      <Pause className="h-6 w-6 mr-3" />
                      Pause
                    </>
                  ) : (
                    <>
                      <Play className="h-6 w-6 mr-3" />
                      Start
                    </>
                  )}
                </Button>
                <Button
                  onClick={resetTimer}
                  variant="outline"
                  size="lg"
                  className="px-8 py-6 text-lg border-primary/30 hover:bg-primary/10"
                >
                  <RotateCcw className="h-6 w-6 mr-3" />
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Sessions Today
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-primary">{sessions}</div>
                <p className="text-sm text-muted-foreground">Goal: {dailyGoal}</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-500/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Clock className="h-5 w-5 text-green-600" />
                  Focus Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-green-600">{Math.floor(sessions * 25 / 60)}h {(sessions * 25) % 60}m</div>
                <p className="text-sm text-muted-foreground">Total today</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-blue-500/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                  Current Streak
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-blue-600">3</div>
                <p className="text-sm text-muted-foreground">days</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Tabs defaultValue="tasks" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="tasks">Tasks</TabsTrigger>
              <TabsTrigger value="tips">Tips</TabsTrigger>
            </TabsList>
            
            <TabsContent value="tasks" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckSquare className="h-5 w-5" />
                    Today's Tasks
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add a new task..."
                      value={newTask}
                      onChange={(e) => setNewTask(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addTask()}
                      className="flex-1"
                    />
                    <Button onClick={addTask} size="sm">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="space-y-2 max-h-80 overflow-y-auto">
                    {tasks.map((task) => (
                      <div key={task.id} className="flex items-center gap-2 p-3 rounded-lg border bg-card/50">
                        <input
                          type="checkbox"
                          checked={task.completed}
                          onChange={() => toggleTask(task.id)}
                          className="rounded"
                        />
                        <div className="flex-1">
                          <p className={`text-sm ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                            {task.text}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="secondary" className="text-xs">
                              {task.pomodoros} 🍅
                            </Badge>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteTask(task.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="tips" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Pomodoro Tips
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span>Focus on one task during each session</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span>Take breaks away from your screen</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span>Use longer breaks for physical activity</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span>Track your most productive hours</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span>Eliminate distractions during focus time</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span>Review completed tasks at day's end</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Daily Goal</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Target Sessions</span>
                      <Input
                        type="number"
                        value={dailyGoal}
                        onChange={(e) => setDailyGoal(Number(e.target.value))}
                        className="w-20 text-center"
                        min="1"
                        max="20"
                      />
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${Math.min((sessions / dailyGoal) * 100, 100)}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground text-center">
                      {sessions} of {dailyGoal} sessions completed
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Pomodoro;