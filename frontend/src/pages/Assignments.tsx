import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ClipboardList } from "lucide-react";
import { usePageLoading } from "@/hooks/use-page-loading";
import { GenericPageSkeleton } from "@/components/ui/page-skeleton";
import { AssignmentDetailModal } from "@/components/assignments/AssignmentDetailModal";
import { AssignmentStats } from "@/components/assignments/AssignmentStats";
import { AssignmentList } from "@/components/assignments/AssignmentList";
import { useToast } from "@/hooks/use-toast";

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

const Assignments = () => {
  const isLoading = usePageLoading();
  const { toast } = useToast();
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [assignments, setAssignments] = useState<Assignment[]>([
    {
      id: 1,
      title: "Data Structures Project",
      course: "CS301",
      dueDate: "2024-07-25",
      status: "pending",
      priority: "high",
      description: "Implement a binary search tree with insertion and deletion operations",
      submissionType: "Code + Report",
      maxPoints: 100,
      progress: 60
    },
    {
      id: 2,
      title: "Organic Chemistry Lab Report",
      course: "CHEM205",
      dueDate: "2024-07-22",
      status: "pending",
      priority: "medium",
      description: "Write a detailed report on the synthesis experiment",
      submissionType: "PDF Report",
      maxPoints: 50,
      progress: 80
    },
    {
      id: 3,
      title: "Literature Essay",
      course: "ENG205",
      dueDate: "2024-07-20",
      status: "submitted",
      priority: "low",
      description: "Analyze themes in contemporary world literature",
      submissionType: "Essay",
      maxPoints: 75,
      progress: 100,
      grade: "A-",
      feedback: "Excellent analysis of themes and writing style."
    },
    {
      id: 4,
      title: "Linear Algebra Problem Set",
      course: "MATH201",
      dueDate: "2024-07-18",
      status: "overdue",
      priority: "high",
      description: "Solve problems 1-20 from Chapter 5",
      submissionType: "Handwritten/PDF",
      maxPoints: 30,
      progress: 0
    },
    {
      id: 5,
      title: "Physics Lab Quiz",
      course: "PHYS201",
      dueDate: "2024-07-30",
      status: "pending",
      priority: "medium",
      description: "Online quiz covering laboratory procedures",
      submissionType: "Online Quiz",
      maxPoints: 25,
      progress: 0
    }
  ]);

  const pendingAssignments = assignments.filter(a => a.status === "pending");
  const submittedAssignments = assignments.filter(a => a.status === "submitted");
  const overdueAssignments = assignments.filter(a => a.status === "overdue");

  const handleViewDetails = (assignment: Assignment) => {
    setSelectedAssignment(assignment);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAssignment(null);
  };

  const handleSubmitAssignment = (assignmentId: number, files: File[]) => {
    setAssignments(prev => 
      prev.map(assignment => 
        assignment.id === assignmentId 
          ? { ...assignment, status: 'submitted', progress: 100 }
          : assignment
      )
    );
    toast({
      title: "Assignment submitted successfully",
      description: `${files.length} file(s) have been uploaded and submitted.`
    });
  };

  if (isLoading) {
    return <GenericPageSkeleton />
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <ClipboardList className="h-8 w-8 text-primary" />
        <div>
          <h1 className="mobile-heading font-bold">Assignments</h1>
          <p className="text-muted-foreground mobile-hide-description">Track and manage your course assignments</p>
        </div>
      </div>

      <AssignmentStats assignments={assignments} />

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="submitted">Submitted</TabsTrigger>
          <TabsTrigger value="overdue">Overdue</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <AssignmentList assignments={assignments} onViewDetails={handleViewDetails} />
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          <AssignmentList assignments={pendingAssignments} onViewDetails={handleViewDetails} />
        </TabsContent>

        <TabsContent value="submitted" className="space-y-4">
          <AssignmentList assignments={submittedAssignments} onViewDetails={handleViewDetails} />
        </TabsContent>

        <TabsContent value="overdue" className="space-y-4">
          <AssignmentList assignments={overdueAssignments} onViewDetails={handleViewDetails} />
        </TabsContent>
      </Tabs>

      {selectedAssignment && (
        <AssignmentDetailModal
          assignment={selectedAssignment}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={handleSubmitAssignment}
        />
      )}
    </div>
  );
};

export default Assignments;