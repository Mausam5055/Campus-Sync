import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GPATrendChart, GradeDistributionChart } from "./EnhancedCharts";
import { Plus, Trash2 } from "lucide-react";

interface Course {
  id: string;
  name: string;
  grade: string;
  credits: number;
  semester: string;
}

export const CGPACalculator = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [currentCourse, setCurrentCourse] = useState({
    name: "",
    grade: "",
    credits: "",
    semester: "1"
  });

  const gradePoints = {
    "A+": 4.0, "A": 4.0, "A-": 3.7,
    "B+": 3.3, "B": 3.0, "B-": 2.7,
    "C+": 2.3, "C": 2.0, "C-": 1.7,
    "D+": 1.3, "D": 1.0, "F": 0.0
  };

  const addCourse = () => {
    if (currentCourse.name && currentCourse.grade && currentCourse.credits) {
      const newCourse: Course = {
        id: Date.now().toString(),
        name: currentCourse.name,
        grade: currentCourse.grade,
        credits: parseFloat(currentCourse.credits),
        semester: currentCourse.semester
      };
      setCourses([...courses, newCourse]);
      setCurrentCourse({ name: "", grade: "", credits: "", semester: "1" });
    }
  };

  const removeCourse = (id: string) => {
    setCourses(courses.filter(course => course.id !== id));
  };

  const calculateSemesterGPA = (semester: string) => {
    const semesterCourses = courses.filter(course => course.semester === semester);
    if (semesterCourses.length === 0) return 0;

    let totalPoints = 0;
    let totalCredits = 0;

    semesterCourses.forEach(course => {
      const points = gradePoints[course.grade as keyof typeof gradePoints] || 0;
      totalPoints += points * course.credits;
      totalCredits += course.credits;
    });

    return totalCredits > 0 ? totalPoints / totalCredits : 0;
  };

  const calculateCGPA = () => {
    if (courses.length === 0) return 0;

    let totalPoints = 0;
    let totalCredits = 0;

    courses.forEach(course => {
      const points = gradePoints[course.grade as keyof typeof gradePoints] || 0;
      totalPoints += points * course.credits;
      totalCredits += course.credits;
    });

    return totalCredits > 0 ? totalPoints / totalCredits : 0;
  };

  const getSemesterData = () => {
    const semesters = Array.from(new Set(courses.map(course => course.semester))).sort();
    return semesters.map(semester => ({
      semester: `Sem ${semester}`,
      gpa: calculateSemesterGPA(semester)
    }));
  };

  const getGradeDistribution = () => {
    const distribution: { [key: string]: number } = {};
    courses.forEach(course => {
      distribution[course.grade] = (distribution[course.grade] || 0) + 1;
    });
    
    return Object.entries(distribution).map(([grade, count]) => ({
      grade,
      count
    }));
  };

  const totalCredits = courses.reduce((sum, course) => sum + course.credits, 0);
  const cgpa = calculateCGPA();

  return (
    <div className="space-y-6">
      {/* Add Course Form */}
      <Card>
        <CardHeader>
          <CardTitle>Add Course</CardTitle>
          <CardDescription>Enter course details to calculate your CGPA</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div>
              <Label htmlFor="course-name">Course Name</Label>
              <Input
                id="course-name"
                placeholder="Mathematics"
                value={currentCourse.name}
                onChange={(e) => setCurrentCourse({...currentCourse, name: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="grade">Grade</Label>
              <Select value={currentCourse.grade} onValueChange={(value) => setCurrentCourse({...currentCourse, grade: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select grade" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(gradePoints).map(grade => (
                    <SelectItem key={grade} value={grade}>{grade}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="credits">Credits</Label>
              <Input
                id="credits"
                type="number"
                placeholder="3"
                value={currentCourse.credits}
                onChange={(e) => setCurrentCourse({...currentCourse, credits: e.target.value})}
                className="[&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </div>
            <div>
              <Label htmlFor="semester">Semester</Label>
              <Select value={currentCourse.semester} onValueChange={(value) => setCurrentCourse({...currentCourse, semester: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[1,2,3,4,5,6,7,8].map(sem => (
                    <SelectItem key={sem} value={sem.toString()}>Semester {sem}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button onClick={addCourse} className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add Course
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* CGPA Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">{cgpa.toFixed(2)}</div>
              <div className="text-sm text-muted-foreground">Overall CGPA</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{totalCredits}</div>
              <div className="text-sm text-muted-foreground">Total Credits</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{courses.length}</div>
              <div className="text-sm text-muted-foreground">Courses Completed</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {getSemesterData().length > 0 && (
          <GPATrendChart data={getSemesterData()} />
        )}
        {getGradeDistribution().length > 0 && (
          <GradeDistributionChart data={getGradeDistribution()} />
        )}
      </div>

      {/* Course List */}
      {courses.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Course List</CardTitle>
            <CardDescription>All your registered courses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {courses.map(course => (
                <div key={course.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary">Sem {course.semester}</Badge>
                    <div>
                      <div className="font-medium">{course.name}</div>
                      <div className="text-sm text-muted-foreground">
                        Grade: {course.grade} | Credits: {course.credits}
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeCourse(course.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};