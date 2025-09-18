import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw } from "lucide-react";

interface ActiveWorkoutCardProps {
  workoutSession: {
    name: string;
    duration: number;
    isActive: boolean;
    timeElapsed: number;
  };
  onPause: () => void;
  onResume: () => void;
  onComplete: () => void;
  onReset: () => void;
  formatTime: (seconds: number) => string;
}

export function ActiveWorkoutCard({
  workoutSession,
  onPause,
  onResume,
  onComplete,
  onReset,
  formatTime
}: ActiveWorkoutCardProps) {
  return (
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
              <Button onClick={onPause} variant="outline">
                <Pause className="h-4 w-4 mr-2" />
                Pause
              </Button>
            ) : (
              <Button onClick={onResume}>
                <Play className="h-4 w-4 mr-2" />
                Resume
              </Button>
            )}
            <Button onClick={onComplete} variant="default">
              Complete Workout
            </Button>
            <Button onClick={onReset} variant="destructive">
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}