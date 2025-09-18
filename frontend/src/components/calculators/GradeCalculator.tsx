import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AssignmentPerformanceChart, PerformanceTrendChart, PerformanceOverview } from "./EnhancedCharts";
import { Plus, Trash2 } from "lucide-react";

interface Assignment {
  id: string;
  name: string;
  score: number;
  maxScore: number;
  weight: number;
}

export const GradeCalculator = () => {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [currentAssignment, setCurrentAssignment] = useState({
    name: "",
    score: "",
    maxScore: "",
    weight: ""
  });
  
  const [finalExam, setFinalExam] = useState({
    currentGrade: "",
    desiredGrade: "",
    examWeight: ""
  });

  const addAssignment = () => {
    if (currentAssignment.name && currentAssignment.score && currentAssignment.maxScore && currentAssignment.weight) {
      const newAssignment: Assignment = {
        id: Date.now().toString(),
        name: currentAssignment.name,
        score: parseFloat(currentAssignment.score),
        maxScore: parseFloat(currentAssignment.maxScore),
        weight: parseFloat(currentAssignment.weight)
      };
      setAssignments([...assignments, newAssignment]);
      setCurrentAssignment({ name: "", score: "", maxScore: "", weight: "" });
    }
  };

  const removeAssignment = (id: string) => {
    setAssignments(assignments.filter(assignment => assignment.id !== id));
  };

  const calculateCurrentGrade = () => {
    if (assignments.length === 0) return 0;

    let totalWeightedScore = 0;
    let totalWeight = 0;

    assignments.forEach(assignment => {
      const percentage = (assignment.score / assignment.maxScore) * 100;
      totalWeightedScore += percentage * assignment.weight;
      totalWeight += assignment.weight;
    });

    return totalWeight > 0 ? totalWeightedScore / totalWeight : 0;
  };

  const calculateRequiredFinalScore = () => {
    const current = parseFloat(finalExam.currentGrade) || 0;
    const desired = parseFloat(finalExam.desiredGrade) || 0;
    const examWeight = parseFloat(finalExam.examWeight) || 0;

    if (examWeight === 0) return 0;

    const currentWeight = 100 - examWeight;
    const requiredScore = (desired - (current * currentWeight / 100)) / (examWeight / 100);
    
    return Math.max(0, requiredScore);
  };

  const getAssignmentData = () => {
    return assignments.map(assignment => ({
      name: assignment.name,
      percentage: (assignment.score / assignment.maxScore) * 100,
      weight: assignment.weight
    }));
  };

  const getPerformanceTrend = () => {
    return assignments.map((assignment, index) => ({
      assignment: index + 1,
      percentage: (assignment.score / assignment.maxScore) * 100
    }));
  };

  const currentGrade = calculateCurrentGrade();
  const requiredFinalScore = calculateRequiredFinalScore();
  const totalWeight = assignments.reduce((sum, assignment) => sum + assignment.weight, 0);

  return (
    <div className="space-y-6">
      {/* Add Assignment Form */}
      <Card>
        <CardHeader>
          <CardTitle>Add Assignment</CardTitle>
          <CardDescription>Enter assignment details to track your grade</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div>
              <Label htmlFor="assignment-name">Assignment Name</Label>
              <Input
                id="assignment-name"
                placeholder="Midterm Exam"
                value={currentAssignment.name}
                onChange={(e) => setCurrentAssignment({...currentAssignment, name: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="score">Score</Label>
              <Input
                id="score"
                type="number"
                placeholder="85"
                value={currentAssignment.score}
                onChange={(e) => setCurrentAssignment({...currentAssignment, score: e.target.value})}
                className="[&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </div>
            <div>
              <Label htmlFor="max-score">Max Score</Label>
              <Input
                id="max-score"
                type="number"
                placeholder="100"
                value={currentAssignment.maxScore}
                onChange={(e) => setCurrentAssignment({...currentAssignment, maxScore: e.target.value})}
                className="[&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </div>
            <div>
              <Label htmlFor="weight">Weight (%)</Label>
              <Input
                id="weight"
                type="number"
                placeholder="20"
                value={currentAssignment.weight}
                onChange={(e) => setCurrentAssignment({...currentAssignment, weight: e.target.value})}
                className="[&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </div>
            <div className="flex items-end">
              <Button onClick={addAssignment} className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Current Grade Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">{currentGrade.toFixed(1)}%</div>
              <div className="text-sm text-muted-foreground">Current Grade</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{totalWeight}%</div>
              <div className="text-sm text-muted-foreground">Total Weight</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{assignments.length}</div>
              <div className="text-sm text-muted-foreground">Assignments</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Final Exam Calculator */}
      <Card>
        <CardHeader>
          <CardTitle>Final Exam Calculator</CardTitle>
          <CardDescription>Calculate what you need on your final exam</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="current-grade">Current Grade (%)</Label>
              <Input
                id="current-grade"
                type="number"
                placeholder="85"
                value={finalExam.currentGrade}
                onChange={(e) => setFinalExam({...finalExam, currentGrade: e.target.value})}
                className="[&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </div>
            <div>
              <Label htmlFor="desired-grade">Desired Grade (%)</Label>
              <Input
                id="desired-grade"
                type="number"
                placeholder="90"
                value={finalExam.desiredGrade}
                onChange={(e) => setFinalExam({...finalExam, desiredGrade: e.target.value})}
                className="[&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </div>
            <div>
              <Label htmlFor="exam-weight">Final Exam Weight (%)</Label>
              <Input
                id="exam-weight"
                type="number"
                placeholder="30"
                value={finalExam.examWeight}
                onChange={(e) => setFinalExam({...finalExam, examWeight: e.target.value})}
                className="[&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </div>
          </div>

          <div className="p-4 bg-muted rounded-lg">
            <div className="text-center">
              <div className="text-3xl font-bold">
                {requiredFinalScore > 100 ? "Impossible" : `${requiredFinalScore.toFixed(1)}%`}
              </div>
              <div className="text-sm text-muted-foreground">Required Final Exam Score</div>
              {requiredFinalScore > 100 && (
                <p className="text-sm text-destructive mt-2">
                  The desired grade is not achievable with the current grade and exam weight.
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Performance Charts */}
      {assignments.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <AssignmentPerformanceChart data={getAssignmentData()} />
            <PerformanceTrendChart data={getPerformanceTrend()} />
          </div>
          <div>
            <PerformanceOverview currentGrade={currentGrade} targetGrade={parseFloat(finalExam.desiredGrade) || 90} />
          </div>
        </div>
      )}

      {/* Assignment List */}
      {assignments.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Assignment List</CardTitle>
            <CardDescription>All your assignments and scores</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {assignments.map(assignment => (
                <div key={assignment.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary">
                      {((assignment.score / assignment.maxScore) * 100).toFixed(1)}%
                    </Badge>
                    <div>
                      <div className="font-medium">{assignment.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {assignment.score}/{assignment.maxScore} points | Weight: {assignment.weight}%
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeAssignment(assignment.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};