import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookMarked, ArrowLeft, Settings } from "lucide-react";
import { usePageLoading } from "@/hooks/use-page-loading";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { GenericPageSkeleton } from "@/components/ui/page-skeleton";
import { BranchSelector } from "@/components/courses/BranchSelector";
import { SemesterView } from "@/components/courses/SemesterView";
import { branches, onlineCourses, extracurricularCourses } from "@/data/courseData";

const CourseCatalog = () => {
  const isLoading = usePageLoading();
  const [selectedBranch, setSelectedBranch] = useLocalStorage<string | null>('selected-branch', null);
  const [selectedSemester, setSelectedSemester] = useLocalStorage<number>('selected-semester', 1);
  const [enrolledCourses, setEnrolledCourses] = useLocalStorage<string[]>('enrolled-courses', []);

  const handleBranchSelect = (branchId: string) => {
    setSelectedBranch(branchId);
    setSelectedSemester(1); // Reset to first semester when changing branch
  };

  const handleEnroll = (courseId: string) => {
    if (!enrolledCourses.includes(courseId)) {
      setEnrolledCourses([...enrolledCourses, courseId]);
    }
  };

  const handleBack = () => {
    setSelectedBranch(null);
  };

  const currentBranch = branches.find(branch => branch.id === selectedBranch);

  if (isLoading) {
    return <GenericPageSkeleton />
  }

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden">
      <div className="space-y-4 sm:space-y-6 w-full px-4 sm:px-6">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
            {selectedBranch && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBack}
                className="hidden sm:flex flex-shrink-0"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back
              </Button>
            )}
            <BookMarked className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-primary flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold truncate">Course Catalog</h1>
            </div>
          </div>
          
          {selectedBranch && (
            <Button variant="outline" size="sm" onClick={handleBack} className="flex-shrink-0 text-xs sm:text-sm">
              <Settings className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Change </span>Branch
            </Button>
          )}
        </div>

      {/* Enrollment Summary */}
      {enrolledCourses.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Enrollment Summary</CardTitle>
            <CardDescription>Your current course registrations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{enrolledCourses.length}</div>
                <div className="text-sm text-muted-foreground">Enrolled Courses</div>
              </div>
              <div className="flex flex-wrap gap-2">
                {enrolledCourses.slice(0, 5).map((courseId) => {
                  // Find course from all sources
                  const allCourses = [
                    ...branches.flatMap(b => b.semesters.flatMap(s => s.courses)),
                    ...onlineCourses,
                    ...extracurricularCourses
                  ];
                  const course = allCourses.find(c => c.id === courseId);
                  return course ? (
                    <Badge key={courseId} variant="secondary">
                      {course.code}
                    </Badge>
                  ) : null;
                })}
                {enrolledCourses.length > 5 && (
                  <Badge variant="outline">+{enrolledCourses.length - 5} more</Badge>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Content */}
      {!selectedBranch ? (
        <BranchSelector
          branches={branches}
          selectedBranch={selectedBranch}
          onBranchSelect={handleBranchSelect}
        />
      ) : currentBranch ? (
        <SemesterView
          branch={currentBranch}
          selectedSemester={selectedSemester}
          onSemesterSelect={setSelectedSemester}
          enrolledCourses={enrolledCourses}
          onEnroll={handleEnroll}
          onlineCourses={onlineCourses}
          extracurricularCourses={extracurricularCourses}
        />
      ) : (
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">Branch not found</p>
          </CardContent>
        </Card>
      )}
      </div>
    </div>
  );
};

export default CourseCatalog;