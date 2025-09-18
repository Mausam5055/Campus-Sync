import { Card, CardContent } from "@/components/ui/card";

interface Assignment {
  id: number;
  title: string;
  course: string;
  dueDate: string;
  status: string;
  priority: string;
  description: string;
  submissionType: string;
  maxPoints: number;
  progress: number;
  grade?: string;
  feedback?: string;
}

interface AssignmentStatsProps {
  assignments: Assignment[];
}

export const AssignmentStats = ({ assignments }: AssignmentStatsProps) => {
  const pendingAssignments = assignments.filter(a => a.status === "pending");
  const submittedAssignments = assignments.filter(a => a.status === "submitted");
  const overdueAssignments = assignments.filter(a => a.status === "overdue");

  return (
    <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
      <Card>
        <CardContent className="pt-6">
          <div className="text-2xl font-bold">{assignments.length}</div>
          <p className="text-xs text-muted-foreground">Total Assignments</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="pt-6">
          <div className="text-2xl font-bold text-yellow-600">{pendingAssignments.length}</div>
          <p className="text-xs text-muted-foreground">Pending</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="pt-6">
          <div className="text-2xl font-bold text-green-600">{submittedAssignments.length}</div>
          <p className="text-xs text-muted-foreground">Submitted</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="pt-6">
          <div className="text-2xl font-bold text-red-600">{overdueAssignments.length}</div>
          <p className="text-xs text-muted-foreground">Overdue</p>
        </CardContent>
      </Card>
    </div>
  );
};