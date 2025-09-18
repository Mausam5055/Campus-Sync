import { Dumbbell, Target, Flame, Clock, Plus, Pause, Play, RotateCcw, Heart, Zap, Activity, Info } from "lucide-react";
import { usePageLoading } from "@/hooks/use-page-loading";
import { GenericPageSkeleton } from "@/components/ui/page-skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { FitnessStats } from "@/components/fitness/FitnessStats";
import { WorkoutCard } from "@/components/fitness/WorkoutCard";
import { ActiveWorkoutCard } from "@/components/fitness/ActiveWorkoutCard";

interface FitnessData {
  steps: number;
  stepGoal: number;
  calories: number;
  activeMinutes: number;
  weeklyWorkouts: number;
}

interface WorkoutSession {
  name: string;
  duration: number;
  isActive: boolean;
  timeElapsed: number;
}

const Fitness = () => {
  const isLoading = usePageLoading();
  
  const [fitnessData, setFitnessData] = useState<FitnessData>({
    steps: 8547,
    stepGoal: 10000,
    calories: 1234,
    activeMinutes: 45,
    weeklyWorkouts: 3
  });

  const [workoutSession, setWorkoutSession] = useState<WorkoutSession | null>(null);
  const [customSteps, setCustomSteps] = useState("");
  const [customCalories, setCustomCalories] = useState("");

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (workoutSession?.isActive) {
      interval = setInterval(() => {
        setWorkoutSession(prev => prev ? {
          ...prev,
          timeElapsed: prev.timeElapsed + 1
        } : null);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [workoutSession?.isActive]);

  const workouts = [
    { 
      name: "5-min Stretch", 
      duration: 5, 
      calories: 20, 
      difficulty: "Easy",
      description: "Gentle stretching to relieve tension and improve flexibility",
      exercises: ["Neck rolls", "Shoulder shrugs", "Back stretch", "Hip circles"],
      color: "bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800"
    },
    { 
      name: "15-min HIIT", 
      duration: 15, 
      calories: 150, 
      difficulty: "Hard",
      description: "High-intensity interval training for maximum calorie burn",
      exercises: ["Burpees", "Mountain climbers", "Jump squats", "Push-ups"],
      color: "bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800"
    },
    { 
      name: "Desk Exercises", 
      duration: 10, 
      calories: 50, 
      difficulty: "Medium",
      description: "Quick exercises you can do right at your desk",
      exercises: ["Desk push-ups", "Calf raises", "Seated twists", "Leg extensions"],
      color: "bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800"
    }
  ];

  const startWorkout = (workout: typeof workouts[0]) => {
    setWorkoutSession({
      name: workout.name,
      duration: workout.duration,
      isActive: true,
      timeElapsed: 0
    });
    toast({
      title: "Workout Started!",
      description: `Starting ${workout.name}`,
    });
  };

  const pauseWorkout = () => {
    if (workoutSession) {
      setWorkoutSession({
        ...workoutSession,
        isActive: false
      });
    }
  };

  const resumeWorkout = () => {
    if (workoutSession) {
      setWorkoutSession({
        ...workoutSession,
        isActive: true
      });
    }
  };

  const completeWorkout = () => {
    if (workoutSession) {
      const workout = workouts.find(w => w.name === workoutSession.name);
      const timeBonus = Math.floor(workoutSession.timeElapsed / 60);
      const caloriesBurned = workout ? workout.calories + (timeBonus * 5) : 50;
      
      setFitnessData(prev => ({
        ...prev,
        calories: prev.calories + caloriesBurned,
        activeMinutes: prev.activeMinutes + Math.floor(workoutSession.timeElapsed / 60),
        weeklyWorkouts: prev.weeklyWorkouts + 1
      }));

      toast({
        title: "Workout Completed!",
        description: `Great job! You burned ${caloriesBurned} calories.`,
      });

      setWorkoutSession(null);
    }
  };

  const resetWorkout = () => {
    setWorkoutSession(null);
  };

  const updateSteps = () => {
    const steps = parseInt(customSteps);
    if (!isNaN(steps) && steps >= 0) {
      setFitnessData(prev => ({ ...prev, steps }));
      setCustomSteps("");
      toast({
        title: "Steps Updated!",
        description: `Steps set to ${steps.toLocaleString()}`,
      });
    }
  };

  const updateCalories = () => {
    const calories = parseInt(customCalories);
    if (!isNaN(calories) && calories >= 0) {
      setFitnessData(prev => ({ ...prev, calories }));
      setCustomCalories("");
      toast({
        title: "Calories Updated!",
        description: `Calories set to ${calories.toLocaleString()}`,
      });
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800 border-green-300 dark:bg-green-900 dark:text-green-300';
      case 'Medium': return 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-900 dark:text-blue-300';
      case 'Hard': return 'bg-red-100 text-red-800 border-red-300 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getWorkoutIcon = (name: string) => {
    if (name.includes('Stretch')) return Heart;
    if (name.includes('HIIT')) return Zap;
    if (name.includes('Desk')) return Activity;
    return Dumbbell;
  };

  if (isLoading) {
    return <GenericPageSkeleton />
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="mobile-heading font-bold">Fitness</h1>
        <p className="text-muted-foreground mobile-hide-description">Track your health and fitness goals</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Target className="h-5 w-5" />
              Daily Goal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{fitnessData.steps.toLocaleString()}</div>
            <p className="text-sm text-muted-foreground">/ {fitnessData.stepGoal.toLocaleString()} steps</p>
            <Progress value={(fitnessData.steps / fitnessData.stepGoal) * 100} className="mt-2" />
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className="mt-2 w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Update Steps
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Update Steps</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="steps">Steps</Label>
                    <Input
                      id="steps"
                      type="number"
                      value={customSteps}
                      onChange={(e) => setCustomSteps(e.target.value)}
                      placeholder="Enter steps"
                    />
                  </div>
                  <Button onClick={updateSteps} className="w-full">
                    Update
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Flame className="h-5 w-5" />
              Calories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{fitnessData.calories.toLocaleString()}</div>
            <p className="text-sm text-muted-foreground">burned today</p>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className="mt-2 w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Update Calories
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Update Calories</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="calories">Calories</Label>
                    <Input
                      id="calories"
                      type="number"
                      value={customCalories}
                      onChange={(e) => setCustomCalories(e.target.value)}
                      placeholder="Enter calories"
                    />
                  </div>
                  <Button onClick={updateCalories} className="w-full">
                    Update
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Active Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{fitnessData.activeMinutes}m</div>
            <p className="text-sm text-muted-foreground">today</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Dumbbell className="h-5 w-5" />
              Workouts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{fitnessData.weeklyWorkouts}</div>
            <p className="text-sm text-muted-foreground">this week</p>
          </CardContent>
        </Card>
      </div>

      {workoutSession && (
        <Card>
          <CardHeader>
            <CardTitle>Active Workout: {workoutSession.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-4">
              <div className="text-4xl font-bold">{formatTime(workoutSession.timeElapsed)}</div>
              <p className="text-muted-foreground">
                Target: {workoutSession.duration} minutes
              </p>
              <div className="flex justify-center gap-2">
                {workoutSession.isActive ? (
                  <Button onClick={pauseWorkout} variant="outline">
                    <Pause className="h-4 w-4 mr-2" />
                    Pause
                  </Button>
                ) : (
                  <Button onClick={resumeWorkout}>
                    <Play className="h-4 w-4 mr-2" />
                    Resume
                  </Button>
                )}
                <Button onClick={completeWorkout} variant="default">
                  Complete Workout
                </Button>
                <Button onClick={resetWorkout} variant="destructive">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div>
        <h2 className="text-2xl font-bold mb-4">Quick Workouts</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {workouts.map((workout) => {
            const IconComponent = getWorkoutIcon(workout.name);
            return (
              <Card 
                key={workout.name} 
                className={`relative overflow-hidden transition-all duration-300 cursor-pointer hover:shadow-lg hover:scale-105 ${workout.color} ${workoutSession ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={() => !workoutSession && startWorkout(workout)}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-white/10 dark:bg-black/10">
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <div>
                        <CardTitle className="text-lg font-bold">{workout.name}</CardTitle>
                        <Badge 
                          variant="outline" 
                          className={`text-xs mt-1 ${getDifficultyColor(workout.difficulty)}`}
                        >
                          {workout.difficulty}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {workout.description}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">{workout.duration}m</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Flame className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">{workout.calories} cal</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Info className="h-3 w-3" />
                      <span>Includes:</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {workout.exercises.slice(0, 2).map((exercise, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {exercise}
                        </Badge>
                      ))}
                      {workout.exercises.length > 2 && (
                        <Badge variant="secondary" className="text-xs">
                          +{workout.exercises.length - 2} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  <Button 
                    className="w-full mt-4 transition-all duration-200 hover:scale-105" 
                    disabled={!!workoutSession}
                    onClick={(e) => {
                      e.stopPropagation();
                      startWorkout(workout);
                    }}
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Start Workout
                  </Button>
                </CardContent>

                {/* Animated accent border */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Fitness;