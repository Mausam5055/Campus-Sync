import { AssignmentCard } from "./AssignmentCard";

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

interface AssignmentListProps {
  assignments: Assignment[];
  onViewDetails: (assignment: Assignment) => void;
}

export const AssignmentList = ({ assignments, onViewDetails }: AssignmentListProps) => {
  return (
    <div className="space-y-4">
      {assignments.map((assignment) => (
        <AssignmentCard 
          key={assignment.id} 
          assignment={assignment} 
          onViewDetails={onViewDetails}
        />
      ))}
    </div>
  );
};