import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Users, 
  Clock, 
  MapPin, 
  Star, 
  CheckCircle, 
  AlertCircle,
  Trophy,
  Globe,
  BookOpen,
  GraduationCap,
  Calendar,
  Award,
  Target,
  FileText,
  User,
  Download
} from "lucide-react";
import { Course } from "@/data/courseData";

interface CourseDetailModalProps {
  course: Course;
  isOpen: boolean;
  onClose: () => void;
  isEnrolled: boolean;
  onEnroll: (courseId: string) => void;
}

export function CourseDetailModal({ 
  course, 
  isOpen, 
  onClose, 
  isEnrolled, 
  onEnroll 
}: CourseDetailModalProps) {
  const getTypeIcon = () => {
    switch (course.type) {
      case 'core':
        return <BookOpen className="h-5 w-5" />;
      case 'elective':
        return <GraduationCap className="h-5 w-5" />;
      case 'online':
        return <Globe className="h-5 w-5" />;
      case 'extracurricular':
        return <Trophy className="h-5 w-5" />;
      default:
        return <BookOpen className="h-5 w-5" />;
    }
  };

  const getTypeColor = () => {
    switch (course.type) {
      case 'core':
        return 'bg-blue-500';
      case 'elective':
        return 'bg-green-500';
      case 'online':
        return 'bg-purple-500';
      case 'extracurricular':
        return 'bg-orange-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getDifficultyVariant = () => {
    switch (course.difficulty) {
      case 'Beginner':
        return 'secondary';
      case 'Intermediate':
        return 'outline';
      case 'Advanced':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  const availableSeats = course.maxSeats && course.enrolled 
    ? course.maxSeats - course.enrolled 
    : null;
  
  const enrollmentPercentage = course.maxSeats && course.enrolled 
    ? (course.enrolled / course.maxSeats) * 100 
    : 0;

  const downloadCurriculum = () => {
    // In a real application, this would be a dynamic link from the course data
    const driveLink = `https://drive.google.com/file/d/1example-${course.id}-curriculum/view`;
    window.open(driveLink, '_blank');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] sm:max-w-2xl max-h-[90vh] w-full mx-2 sm:mx-4">
        <DialogHeader>
          <DialogTitle className="flex items-start gap-3 text-left">
            <div className={`w-6 h-6 rounded-full flex-shrink-0 ${getTypeColor()}`} />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg sm:text-xl font-bold">{course.name}</span>
                {getTypeIcon()}
              </div>
              <div className="text-sm text-muted-foreground">
                {course.code} • {course.type.charAt(0).toUpperCase() + course.type.slice(1)}
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh] pr-4">
          <div className="space-y-6">
            {/* Course Overview */}
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                {course.credits > 0 && (
                  <Badge variant="outline" className="text-xs">
                    {course.credits} Credits
                  </Badge>
                )}
                <Badge variant={getDifficultyVariant()} className="text-xs">
                  {course.difficulty}
                </Badge>
                {course.category && (
                  <Badge variant="secondary" className="text-xs">
                    {course.category}
                  </Badge>
                )}
              </div>
              
              <p className="text-sm text-muted-foreground leading-relaxed">
                {course.description}
              </p>
            </div>

            <Separator />

            {/* Course Details */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-3">
                <h4 className="font-semibold flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Course Information
                </h4>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Instructor:</span>
                    <span>{course.instructor}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Schedule:</span>
                    <span>{course.schedule}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Location:</span>
                    <span>{course.location}</span>
                  </div>

                  {course.duration && (
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">Duration:</span>
                      <span>{course.duration}</span>
                    </div>
                  )}

                  {course.provider && (
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">Provider:</span>
                      <span>{course.provider}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold flex items-center gap-2">
                  <Award className="h-4 w-4" />
                  Course Stats
                </h4>
                
                <div className="space-y-2 text-sm">
                  {course.rating && (
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{course.rating}/5</span>
                      </div>
                      {course.enrolled && (
                        <span className="text-muted-foreground">
                          ({course.enrolled.toLocaleString()} students)
                        </span>
                      )}
                    </div>
                  )}

                  {availableSeats !== null && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">Enrollment:</span>
                        <span>
                          {course.enrolled}/{course.maxSeats} students
                        </span>
                      </div>
                      <Progress value={enrollmentPercentage} className="h-2" />
                      {availableSeats > 0 && (
                        <div className="text-xs text-green-600">
                          {availableSeats} seats remaining
                        </div>
                      )}
                      {availableSeats <= 5 && availableSeats > 0 && (
                        <div className="flex items-center gap-1 text-xs text-orange-600">
                          <AlertCircle className="h-3 w-3" />
                          <span>Limited seats remaining!</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Prerequisites */}
            {course.prerequisites && course.prerequisites.length > 0 && (
              <>
                <Separator />
                <div className="space-y-2">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Target className="h-4 w-4" />
                    Prerequisites
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {course.prerequisites.map((prereq, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {prereq}
                      </Badge>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Learning Outcomes (Mock data for demo) */}
            <Separator />
            <div className="space-y-2">
              <h4 className="font-semibold flex items-center gap-2">
                <Target className="h-4 w-4" />
                Learning Outcomes
              </h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Understand fundamental concepts and principles</li>
                <li>• Apply theoretical knowledge to practical scenarios</li>
                <li>• Develop critical thinking and problem-solving skills</li>
                <li>• Complete hands-on projects and assignments</li>
              </ul>
            </div>
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
          
          <Button
            variant="ghost"
            onClick={downloadCurriculum}
            className="flex-1 sm:flex-initial"
          >
            <Download className="h-4 w-4 mr-2" />
            Download Curriculum
          </Button>
          
          <Button
            variant={isEnrolled ? "secondary" : "default"}
            onClick={() => onEnroll(course.id)}
            disabled={isEnrolled || availableSeats === 0}
            className="flex-1"
          >
            {isEnrolled ? (
              <>
                <CheckCircle className="h-4 w-4 mr-2" />
                Enrolled
              </>
            ) : availableSeats === 0 ? (
              <>
                <AlertCircle className="h-4 w-4 mr-2" />
                Course Full
              </>
            ) : (
              'Enroll Now'
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}