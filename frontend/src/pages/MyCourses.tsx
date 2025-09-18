import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookOpen, 
  Clock, 
  Users, 
  Star, 
  TrendingUp, 
  Calendar,
  Award,
  Target,
  BookMarked,
  GraduationCap,
  Trophy,
  Globe
} from "lucide-react";
import { usePageLoading } from "@/hooks/use-page-loading";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { GenericPageSkeleton } from "@/components/ui/page-skeleton";
import { CourseDetailModal } from "@/components/courses/CourseDetailModal";
import { branches, onlineCourses, extracurricularCourses, type Course } from "@/data/courseData";

const MyCourses = () => {
  const navigate = useNavigate();
  const isLoading = usePageLoading();
  const [enrolledCourses, setEnrolledCourses] = useLocalStorage<string[]>('enrolled-courses', []);
  const [selectedBranch] = useLocalStorage<string | null>('selected-branch', null);
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Get all courses from different sources
  const allCourses = [
    ...branches.flatMap(b => b.semesters.flatMap(s => s.courses)),
    ...onlineCourses,
    ...extracurricularCourses
  ];

  // Filter enrolled courses
  const myEnrolledCourses = allCourses.filter(course => 
    enrolledCourses.includes(course.id)
  );

  // Categorize courses
  const coreCoreCourses = myEnrolledCourses.filter(c => c.type === 'core');
  const electiveCourses = myEnrolledCourses.filter(c => c.type === 'elective');
  const onlineEnrolledCourses = myEnrolledCourses.filter(c => c.type === 'online');
  const extraCurricularEnrolled = myEnrolledCourses.filter(c => c.type === 'extracurricular');

  // Calculate stats
  const totalCredits = myEnrolledCourses.reduce((sum, course) => sum + course.credits, 0);
  const avgProgress = Math.round(Math.random() * 30 + 60); // Mock progress
  const currentGPA = 3.6; // Mock GPA

  const currentBranch = branches.find(b => b.id === selectedBranch);

  const handleViewCourseDetails = (course: Course) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCourse(null);
  };

  const handleEnroll = (courseId: string) => {
    if (!enrolledCourses.includes(courseId)) {
      setEnrolledCourses([...enrolledCourses, courseId]);
    }
  };

  if (isLoading) {
    return <GenericPageSkeleton />
  }

  const CourseCard = ({ course, progress = Math.random() * 40 + 50, grade = 'A-' }) => (
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
        
        <Button className="w-full" variant="outline" onClick={() => handleViewCourseDetails(course)}>
          View Course Details
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <BookOpen className="h-8 w-8 text-primary" />
        <div>
          <h1 className="mobile-heading font-bold">My Courses</h1>
          {currentBranch && (
            <p className="text-muted-foreground mobile-hide-description">{currentBranch.name}</p>
          )}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{myEnrolledCourses.length}</div>
              <div className="text-sm text-muted-foreground">Total Courses</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{totalCredits}</div>
              <div className="text-sm text-muted-foreground">Total Credits</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{currentGPA}</div>
              <div className="text-sm text-muted-foreground">Current GPA</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{avgProgress}%</div>
              <div className="text-sm text-muted-foreground">Avg Progress</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {myEnrolledCourses.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <BookMarked className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="text-lg font-semibold mb-2">No Courses Enrolled</h3>
              <p className="text-muted-foreground mb-4">
                Start your learning journey by enrolling in courses from the catalog
              </p>
              <Button onClick={() => navigate('/courses/catalog')}>
                Browse Course Catalog
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview" className="text-xs sm:text-sm">
              <Target className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="core" className="text-xs sm:text-sm">
              <BookOpen className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">Core</span> ({coreCoreCourses.length})
            </TabsTrigger>
            <TabsTrigger value="online" className="text-xs sm:text-sm">
              <Globe className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">Online</span> ({onlineEnrolledCourses.length})
            </TabsTrigger>
            <TabsTrigger value="extra" className="text-xs sm:text-sm">
              <Trophy className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">Extra</span> ({extraCurricularEnrolled.length})
            </TabsTrigger>
            <TabsTrigger value="schedule" className="text-xs sm:text-sm">
              <Calendar className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">Schedule</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {myEnrolledCourses.slice(0, 6).map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
            {myEnrolledCourses.length > 6 && (
              <Card>
                <CardContent className="pt-6">
                  <p className="text-center text-muted-foreground">
                    And {myEnrolledCourses.length - 6} more courses. View specific categories above.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="core" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Core Courses
                </CardTitle>
                <CardDescription>
                  Mandatory courses for your degree program
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {coreCoreCourses.map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </div>
                {coreCoreCourses.length === 0 && (
                  <p className="text-center text-muted-foreground py-4">
                    No core courses enrolled yet
                  </p>
                )}
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
                  Skill development and certification courses
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {onlineEnrolledCourses.map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </div>
                {onlineEnrolledCourses.length === 0 && (
                  <p className="text-center text-muted-foreground py-4">
                    No online courses enrolled yet
                  </p>
                )}
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
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {extraCurricularEnrolled.map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </div>
                {extraCurricularEnrolled.length === 0 && (
                  <p className="text-center text-muted-foreground py-4">
                    No extracurricular activities enrolled yet
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="schedule" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Weekly Schedule
                </CardTitle>
                <CardDescription>
                  Your course schedule overview
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map(day => {
                    const daySchedule = myEnrolledCourses.filter(course => 
                      course.schedule.toLowerCase().includes(day.toLowerCase().slice(0, 3))
                    );
                    
                    return (
                      <div key={day} className="border rounded-lg p-4">
                        <h4 className="font-semibold mb-2">{day}</h4>
                        {daySchedule.length > 0 ? (
                          <div className="space-y-2">
                            {daySchedule.map(course => (
                              <div key={course.id} className="flex items-center justify-between bg-muted/50 rounded p-2">
                                <div>
                                  <span className="font-medium">{course.name}</span>
                                  <span className="text-sm text-muted-foreground ml-2">({course.code})</span>
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  {course.schedule}
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm text-muted-foreground">No classes scheduled</p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}

      {selectedCourse && (
        <CourseDetailModal
          course={selectedCourse}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          isEnrolled={enrolledCourses.includes(selectedCourse.id)}
          onEnroll={handleEnroll}
        />
      )}
    </div>
  );
};

export default MyCourses;