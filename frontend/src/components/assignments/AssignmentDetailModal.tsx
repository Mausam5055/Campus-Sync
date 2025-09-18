import { useState, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { 
  Calendar, 
  Clock, 
  FileText, 
  User, 
  Upload, 
  CheckCircle, 
  AlertCircle,
  XCircle,
  Download,
  Trash2
} from "lucide-react";

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
  instructor?: string;
}

interface AssignmentDetailModalProps {
  assignment: Assignment;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (assignmentId: number, files: File[]) => void;
}

export function AssignmentDetailModal({ 
  assignment, 
  isOpen, 
  onClose, 
  onSubmit 
}: AssignmentDetailModalProps) {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
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

  const getStatusIcon = () => {
    switch (assignment.status) {
      case 'submitted':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'overdue':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
    }
  };

  const getStatusColor = () => {
    switch (assignment.status) {
      case 'submitted':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'overdue':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
    }
  };

  const getPriorityColor = () => {
    switch (assignment.priority) {
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      default:
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFiles = Array.from(files);
      setUploadedFiles(prev => [...prev, ...newFiles]);
      toast({
        title: "Files uploaded",
        description: `${newFiles.length} file(s) added successfully.`
      });
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
    toast({
      title: "File removed",
      description: "File has been removed from the submission."
    });
  };

  const handleSubmit = () => {
    if (uploadedFiles.length === 0) {
      toast({
        title: "No files selected",
        description: "Please upload at least one file before submitting.",
        variant: "destructive"
      });
      return;
    }

    onSubmit(assignment.id, uploadedFiles);
    setUploadedFiles([]);
    onClose();
    toast({
      title: "Assignment submitted",
      description: "Your assignment has been submitted successfully."
    });
  };

  const daysUntilDue = getDaysUntilDue(assignment.dueDate);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] sm:max-w-3xl max-h-[90vh] w-full mx-2 sm:mx-4">
        <DialogHeader>
          <DialogTitle className="flex items-start gap-3 text-left">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg sm:text-xl font-bold">{assignment.title}</span>
                {getStatusIcon()}
              </div>
              <div className="text-sm text-muted-foreground">
                {assignment.course} • Due: {formatDate(assignment.dueDate)}
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh] pr-4">
          <div className="space-y-6">
            {/* Assignment Overview */}
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                <Badge className={getStatusColor()}>
                  {assignment.status}
                </Badge>
                <Badge className={getPriorityColor()}>
                  {assignment.priority} priority
                </Badge>
                <Badge variant="outline">
                  {assignment.maxPoints} points
                </Badge>
                {assignment.grade && (
                  <Badge variant="secondary">
                    Grade: {assignment.grade}
                  </Badge>
                )}
              </div>
              
              <p className="text-sm text-muted-foreground leading-relaxed">
                {assignment.description}
              </p>
            </div>

            <Separator />

            {/* Assignment Details */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-3">
                <h4 className="font-semibold flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Assignment Information
                </h4>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Due Date:</span>
                    <span>{formatDate(assignment.dueDate)}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Time Remaining:</span>
                    <span className={daysUntilDue < 0 ? 'text-red-600' : daysUntilDue <= 2 ? 'text-orange-600' : ''}>
                      {daysUntilDue < 0 ? `${Math.abs(daysUntilDue)} days overdue` : `${daysUntilDue} days left`}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Submission Type:</span>
                    <span>{assignment.submissionType}</span>
                  </div>

                  {assignment.instructor && (
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">Instructor:</span>
                      <span>{assignment.instructor}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  Progress & Status
                </h4>
                
                <div className="space-y-3">
                  {assignment.status !== 'submitted' && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">Progress:</span>
                        <span>{assignment.progress}%</span>
                      </div>
                      <Progress value={assignment.progress} className="h-2" />
                    </div>
                  )}

                  {assignment.feedback && (
                    <div className="bg-muted p-3 rounded-lg">
                      <p className="text-sm"><strong>Instructor Feedback:</strong></p>
                      <p className="text-sm mt-1">{assignment.feedback}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* File Upload Section */}
            {assignment.status === 'pending' && (
              <>
                <Separator />
                <div className="space-y-4">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Upload className="h-4 w-4" />
                    Upload Files
                  </h4>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        onChange={handleFileUpload}
                        className="flex-1"
                        accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.zip"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Choose Files
                      </Button>
                    </div>
                    
                    {uploadedFiles.length > 0 && (
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Uploaded Files:</Label>
                        <div className="space-y-2">
                          {uploadedFiles.map((file, index) => (
                            <div key={index} className="flex items-center justify-between bg-muted p-2 rounded">
                              <div className="flex items-center gap-2">
                                <FileText className="h-4 w-4" />
                                <span className="text-sm">{file.name}</span>
                                <span className="text-xs text-muted-foreground">
                                  ({(file.size / 1024 / 1024).toFixed(2)} MB)
                                </span>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeFile(index)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </ScrollArea>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1 sm:flex-initial"
          >
            Close
          </Button>
          
          {assignment.status === 'submitted' && (
            <Button
              variant="ghost"
              className="flex-1 sm:flex-initial"
            >
              <Download className="h-4 w-4 mr-2" />
              Download Submission
            </Button>
          )}
          
          {assignment.status === 'pending' && (
            <Button
              onClick={handleSubmit}
              disabled={uploadedFiles.length === 0}
              className="flex-1"
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Submit Assignment
            </Button>
          )}
          
          {assignment.status === 'overdue' && (
            <Button
              onClick={handleSubmit}
              disabled={uploadedFiles.length === 0}
              variant="destructive"
              className="flex-1"
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Submit Late
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}