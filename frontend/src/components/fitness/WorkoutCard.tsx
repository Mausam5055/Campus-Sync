import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Clock, Flame, Info, Heart, Zap, Activity, Dumbbell } from "lucide-react";

interface WorkoutCardProps {
  workout: {
    name: string;
    duration: number;
    calories: number;
    difficulty: string;
    description: string;
    exercises: string[];
    color: string;
  };
  isDisabled: boolean;
  onStart: () => void;
}

export function WorkoutCard({ workout, isDisabled, onStart }: WorkoutCardProps) {
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

  const IconComponent = getWorkoutIcon(workout.name);

  return (
    <Card 
      className={`relative overflow-hidden transition-all duration-300 cursor-pointer hover:shadow-lg hover:scale-105 ${workout.color} ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      onClick={() => !isDisabled && onStart()}
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
          disabled={isDisabled}
          onClick={(e) => {
            e.stopPropagation();
            onStart();
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
}