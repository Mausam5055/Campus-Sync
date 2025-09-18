import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Target, Flame, Clock, Dumbbell, Plus } from "lucide-react";
import { useState } from "react";

interface FitnessStatsProps {
  fitnessData: {
    steps: number;
    stepGoal: number;
    calories: number;
    activeMinutes: number;
    weeklyWorkouts: number;
  };
  onUpdateSteps: (steps: number) => void;
  onUpdateCalories: (calories: number) => void;
}

export function FitnessStats({ fitnessData, onUpdateSteps, onUpdateCalories }: FitnessStatsProps) {
  const [customSteps, setCustomSteps] = useState("");
  const [customCalories, setCustomCalories] = useState("");

  const handleUpdateSteps = () => {
    const steps = parseInt(customSteps);
    if (!isNaN(steps) && steps >= 0) {
      onUpdateSteps(steps);
      setCustomSteps("");
    }
  };

  const handleUpdateCalories = () => {
    const calories = parseInt(customCalories);
    if (!isNaN(calories) && calories >= 0) {
      onUpdateCalories(calories);
      setCustomCalories("");
    }
  };

  return (
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
                <Button onClick={handleUpdateSteps} className="w-full">
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
                <Button onClick={handleUpdateCalories} className="w-full">
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
  );
}