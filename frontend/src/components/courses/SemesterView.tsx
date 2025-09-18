import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookOpen, 
  Users, 
  Clock, 
  MapPin, 
  Star, 
  CheckCircle, 
  AlertCircle,
  Trophy,
  Globe,
  Calendar
} from "lucide-react";
import { Branch, Course } from "@/data/courseData";
import { CourseCard } from "./CourseCard";

interface SemesterViewProps {
  branch: Branch;
  selectedSemester: number;
  onSemesterSelect: (semesterId: number) => void;
  enrolledCourses: string[];
  onEnroll: (courseId: string) => void;
  onlineCourses: Course[];
  extracurricularCourses: Course[];
}

export function SemesterView({ 
  branch, 
  selectedSemester, 
  onSemesterSelect, 
  enrolledCourses, 
  onEnroll,
  onlineCourses,
  extracurricularCourses 
}: SemesterViewProps) {
  const [activeTab, setActiveTab] = useState("semester");
  
  const currentSemester = branch.semesters.find(s => s.id === selectedSemester);
  const semesterCourses = currentSemester?.courses || [];

  return (
    <div className="space-y-4 sm:space-y-6 w-full max-w-full overflow-x-hidden">
      <div className="flex flex-col space-y-3 sm:space-y-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold truncate">{branch.name}</h2>
        </div>
        
        <div className="flex flex-wrap gap-1 sm:gap-2 w-full">
          {branch.semesters.map((semester) => (
            <Button
              key={semester.id}
              variant={selectedSemester === semester.id ? "default" : "outline"}
              size="sm"
              onClick={() => onSemesterSelect(semester.id)}
              className="flex-shrink-0 text-xs sm:text-sm min-w-0"
            >
              <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
              Sem {semester.id}
            </Button>
          ))}
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 h-auto">
          <TabsTrigger value="semester" className="text-xs px-1 sm:px-2 py-2 sm:py-3 flex flex-col items-center gap-1">
            <BookOpen className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="text-xs">Semester</span>
          </TabsTrigger>
          <TabsTrigger value="online" className="text-xs px-1 sm:px-2 py-2 sm:py-3 flex flex-col items-center gap-1">
            <Globe className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="text-xs">Online</span>
          </TabsTrigger>
          <TabsTrigger value="extra" className="text-xs px-1 sm:px-2 py-2 sm:py-3 flex flex-col items-center gap-1">
            <Trophy className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="text-xs">Extra</span>
          </TabsTrigger>
          <TabsTrigger value="all" className="text-xs px-1 sm:px-2 py-2 sm:py-3 flex flex-col items-center gap-1">
            <Star className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="text-xs">All</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="semester" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                {currentSemester?.name} Core Courses
              </CardTitle>
              <CardDescription>
                Mandatory courses for {branch.name} - Semester {selectedSemester}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:gap-4">
                {semesterCourses.map((course) => (
                  <CourseCard
                    key={course.id}
                    course={course}
                    isEnrolled={enrolledCourses.includes(course.id)}
                    onEnroll={onEnroll}
                    compact
                  />
                ))}
                {semesterCourses.length === 0 && (
                  <div className="text-center text-muted-foreground py-8">
                    <BookOpen className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>No courses available for this semester yet.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="online" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Online Courses
              </CardTitle>
              <CardDescription>
                Enhance your skills with online courses from top platforms
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:gap-4">
                {onlineCourses.map((course) => (
                  <CourseCard
                    key={course.id}
                    course={course}
                    isEnrolled={enrolledCourses.includes(course.id)}
                    onEnroll={onEnroll}
                    compact
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="extra" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5" />
                Extracurricular Activities
              </CardTitle>
              <CardDescription>
                Clubs, workshops, and skill development programs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:gap-4">
                {extracurricularCourses.map((course) => (
                  <CourseCard
                    key={course.id}
                    course={course}
                    isEnrolled={enrolledCourses.includes(course.id)}
                    onEnroll={onEnroll}
                    compact
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="all" className="space-y-4">
          <div className="space-y-6">
            {/* Semester Courses */}
            {semesterCourses.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Semester {selectedSemester} Courses</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3">
                    {semesterCourses.map((course) => (
                      <CourseCard
                        key={course.id}
                        course={course}
                        isEnrolled={enrolledCourses.includes(course.id)}
                        onEnroll={onEnroll}
                        compact
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Online Courses */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Popular Online Courses
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3">
                  {onlineCourses.slice(0, 3).map((course) => (
                    <CourseCard
                      key={course.id}
                      course={course}
                      isEnrolled={enrolledCourses.includes(course.id)}
                      onEnroll={onEnroll}
                      compact
                    />
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Extracurricular */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Trophy className="h-5 w-5" />
                  Featured Activities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3">
                  {extracurricularCourses.slice(0, 2).map((course) => (
                    <CourseCard
                      key={course.id}
                      course={course}
                      isEnrolled={enrolledCourses.includes(course.id)}
                      onEnroll={onEnroll}
                      compact
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}