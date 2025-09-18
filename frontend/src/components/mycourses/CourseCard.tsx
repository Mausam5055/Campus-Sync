import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Users, Clock, Star } from "lucide-react";
import { Course } from "@/data/courseData";

interface CourseCardProps {
  course: Course;
  progress?: number;
  grade?: string;
  onViewDetails: (course: Course) => void;
}

export function CourseCard({ course, progress = Math.random() * 40 + 50, grade = 'A-', onViewDetails }: CourseCardProps) {
  return (
    <Card className="hover:shadow-lg transition-all">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-4 h-4 rounded-full ${
              course.type === 'core' ? 'bg-blue-500' :
              course.type === 'elective' ? 'bg-green-500' :
              course.type === 'online' ? 'bg-purple-500' :
              'bg-orange-500'
            }`} />
            <div>
              <CardTitle className="text-lg">{course.name}</CardTitle>
              <CardDescription>{course.code}</CardDescription>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            {course.credits > 0 && (
              <Badge variant="secondary">{course.credits} Credits</Badge>
            )}
            <Badge variant="outline">{course.type}</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="h-4 w-4" />
            {course.instructor}
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            {course.schedule}
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Star className="h-4 w-4" />
            Current Grade: {grade}
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
        
        <Button className="w-full" variant="outline" onClick={() => onViewDetails(course)}>
          View Course Details
        </Button>
      </CardContent>
    </Card>
  );
}