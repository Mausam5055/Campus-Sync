import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar, FileText, CheckCircle, AlertCircle, XCircle } from "lucide-react";

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

interface AssignmentCardProps {
  assignment: Assignment;
  onViewDetails: (assignment: Assignment) => void;
}

export const AssignmentCard = ({ assignment, onViewDetails }: AssignmentCardProps) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "submitted":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "overdue":
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "submitted":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "overdue":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      default:
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const getDaysUntilDue = (dateString: string) => {
    const dueDate = new Date(dateString);
    const today = new Date();
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const isOverdue = assignment.status === "overdue";

  return (
    <Card className={`hover:shadow-md transition-shadow ${isOverdue ? 'border-red-200' : ''}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className={`text-lg ${isOverdue ? 'text-red-600' : ''}`}>
              {assignment.title}
            </CardTitle>
            <CardDescription>{assignment.course}</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            {getStatusIcon(assignment.status)}
            <Badge className={getStatusColor(assignment.status)}>
              {assignment.status}
            </Badge>
            {assignment.grade && (
              <Badge variant="outline">Grade: {assignment.grade}</Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">{assignment.description}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>Due: {formatDate(assignment.dueDate)}</span>
            <span className="text-muted-foreground">
              ({getDaysUntilDue(assignment.dueDate)} days)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span>{assignment.submissionType}</span>
          </div>
          <div className="flex items-center gap-2">
            <span>Points: {assignment.maxPoints}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Badge className={getPriorityColor(assignment.priority)}>
            {assignment.priority} priority
          </Badge>
        </div>

        {assignment.status !== "submitted" && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>{assignment.progress}%</span>
            </div>
            <Progress value={assignment.progress} className="h-2" />
          </div>
        )}

        {isOverdue && (
          <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
            <p className="text-sm text-red-600 dark:text-red-400">
              <strong>Overdue:</strong> This assignment was due on {formatDate(assignment.dueDate)}
            </p>
          </div>
        )}

        {assignment.feedback && (
          <div className="bg-muted p-3 rounded-lg">
            <p className="text-sm"><strong>Feedback:</strong> {assignment.feedback}</p>
          </div>
        )}

        <div className="flex gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => onViewDetails(assignment)}
          >
            View Details
          </Button>
          {assignment.status === "submitted" && (
            <Button variant="outline" size="sm">View Submission</Button>
          )}
          {isOverdue && (
            <Button variant="outline" size="sm">Contact Instructor</Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};