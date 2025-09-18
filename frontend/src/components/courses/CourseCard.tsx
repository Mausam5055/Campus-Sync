import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
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
  Eye
} from "lucide-react";
import { Course } from "@/data/courseData";
import { CourseDetailModal } from "./CourseDetailModal";

interface CourseCardProps {
  course: Course;
  isEnrolled: boolean;
  onEnroll: (courseId: string) => void;
  compact?: boolean;
}

export function CourseCard({ course, isEnrolled, onEnroll, compact = false }: CourseCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getTypeIcon = () => {
    switch (course.type) {
      case 'core':
        return <BookOpen className="h-4 w-4" />;
      case 'elective':
        return <GraduationCap className="h-4 w-4" />;
      case 'online':
        return <Globe className="h-4 w-4" />;
      case 'extracurricular':
        return <Trophy className="h-4 w-4" />;
      default:
        return <BookOpen className="h-4 w-4" />;
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

  if (compact) {
    return (
      <>
        <Card 
          className={`hover:shadow-md transition-all w-full max-w-full cursor-pointer ${isEnrolled ? 'border-primary bg-primary/5' : ''}`}
          onClick={() => setIsModalOpen(true)}
        >
          <CardContent className="p-3">
            <div className="space-y-2 w-full">
              <div className="flex items-center gap-2 w-full min-w-0">
                <div className={`w-3 h-3 rounded-full flex-shrink-0 ${getTypeColor()}`} />
                <div className="min-w-0 flex-1">
                  <h4 className="font-semibold text-sm truncate">{course.name}</h4>
                  <p className="text-xs text-muted-foreground truncate">{course.code}</p>
                </div>
                {course.rating && (
                  <div className="flex items-center gap-1 text-xs flex-shrink-0">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span>{course.rating}</span>
                  </div>
                )}
              </div>
              <div className="flex items-center justify-between gap-2 w-full">
                <Badge variant={getDifficultyVariant()} className="text-xs flex-shrink-0">
                  {course.difficulty}
                </Badge>
                <div className="flex gap-1">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsModalOpen(true);
                    }}
                    className="text-xs flex-shrink-0"
                  >
                    <Eye className="h-3 w-3 mr-1" />
                    View
                  </Button>
                  <Button
                    size="sm"
                    variant={isEnrolled ? "secondary" : "default"}
                    onClick={(e) => {
                      e.stopPropagation();
                      onEnroll(course.id);
                    }}
                    disabled={isEnrolled}
                    className="text-xs flex-shrink-0"
                  >
                    {isEnrolled ? (
                      <>
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Enrolled
                      </>
                    ) : (
                      'Enroll'
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <CourseDetailModal
          course={course}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          isEnrolled={isEnrolled}
          onEnroll={onEnroll}
        />
      </>
    );
  }

  return (
    <>
      <Card 
        className={`hover:shadow-lg transition-all w-full max-w-full cursor-pointer ${isEnrolled ? 'border-primary bg-primary/5' : ''}`}
        onClick={() => setIsModalOpen(true)}
      >
        <CardHeader className="pb-3">
            <div className="flex items-start justify-between gap-3 w-full min-w-0">
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className={`w-4 h-4 rounded-full flex-shrink-0 ${getTypeColor()}`} />
                <div className="min-w-0 flex-1">
                  <CardTitle className="text-base sm:text-lg flex items-center gap-2 w-full">
                    <span className="truncate flex-1">{course.name}</span>
                    <span className="flex-shrink-0">{getTypeIcon()}</span>
                  </CardTitle>
                  <CardDescription className="text-sm truncate">
                    {course.code} • {course.type.charAt(0).toUpperCase() + course.type.slice(1)}
                  </CardDescription>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2 flex-shrink-0">
                {course.credits > 0 && (
                  <Badge variant="outline" className="text-xs whitespace-nowrap">{course.credits} Credits</Badge>
                )}
                <Badge variant={getDifficultyVariant()} className="text-xs whitespace-nowrap">{course.difficulty}</Badge>
              </div>
            </div>
        </CardHeader>
        
        <CardContent className="space-y-4 w-full">
          <p className="text-sm text-muted-foreground">{course.description}</p>
          
          <div className="space-y-2 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-3 sm:space-y-0 text-sm">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <span className="truncate">{course.instructor}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <span className="truncate">{course.schedule}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <span className="truncate">{course.location}</span>
            </div>
          </div>

          {course.duration && (
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>Duration: {course.duration}</span>
            </div>
          )}

          {course.provider && (
            <div className="flex items-center gap-2 text-sm">
              <Globe className="h-4 w-4 text-muted-foreground" />
              <span>Provider: {course.provider}</span>
            </div>
          )}

          {course.rating && (
            <div className="flex items-center gap-2 text-sm">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span>{course.rating}/5</span>
              </div>
              {course.enrolled && (
                <span className="text-muted-foreground">
                  ({course.enrolled.toLocaleString()} students)
                </span>
              )}
            </div>
          )}

          {course.prerequisites && course.prerequisites.length > 0 && (
            <div className="text-sm">
              <span className="text-muted-foreground">Prerequisites: </span>
              <span>{course.prerequisites.join(', ')}</span>
            </div>
          )}

          {course.category && (
            <Badge variant="secondary" className="w-fit">
              {course.category}
            </Badge>
          )}

          {availableSeats !== null && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Enrollment</span>
                <span>
                  {course.enrolled}/{course.maxSeats} students
                  {availableSeats > 0 && (
                    <span className="text-green-600 ml-1">
                      ({availableSeats} seats left)
                    </span>
                  )}
                </span>
              </div>
              <Progress value={enrollmentPercentage} className="h-2" />
              {availableSeats <= 5 && availableSeats > 0 && (
                <div className="flex items-center gap-1 text-sm text-orange-600">
                  <AlertCircle className="h-4 w-4" />
                  <span>Limited seats remaining!</span>
                </div>
              )}
            </div>
          )}
          
          <div className="flex gap-2 justify-end">
            <Button
              variant="outline"
              onClick={(e) => {
                e.stopPropagation();
                setIsModalOpen(true);
              }}
              className="flex-shrink-0"
            >
              <Eye className="h-4 w-4 mr-2" />
              View Details
            </Button>
            <Button
              variant={isEnrolled ? "secondary" : "default"}
              onClick={(e) => {
                e.stopPropagation();
                onEnroll(course.id);
              }}
              disabled={isEnrolled || availableSeats === 0}
              className="w-full sm:w-auto"
            >
              {isEnrolled ? (
                <>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Enrolled
                </>
              ) : availableSeats === 0 ? (
                <>
                  <AlertCircle className="h-4 w-4 mr-2" />
                  Full
                </>
              ) : (
                'Enroll Now'
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <CourseDetailModal
        course={course}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        isEnrolled={isEnrolled}
        onEnroll={onEnroll}
      />
    </>
  );
}