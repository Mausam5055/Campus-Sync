import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { GraduationCap, BookOpen } from 'lucide-react';

interface SemesterOption {
  semester: number;
  branch: string;
  totalSubjects: number;
  attendancePercentage: number;
}

interface SemesterSelectorProps {
  semesters: SemesterOption[];
  selectedSemester: number | null;
  onSemesterSelect: (semester: number, branch: string) => void;
  className?: string;
}

export const SemesterSelector: React.FC<SemesterSelectorProps> = ({
  semesters,
  selectedSemester,
  onSemesterSelect,
  className = ''
}) => {
  const getAttendanceColor = (percentage: number) => {
    if (percentage >= 80) return 'bg-green-100 text-green-800 border-green-200';
    if (percentage >= 60) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    return 'bg-red-100 text-red-800 border-red-200';
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Select Your Semester</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {semesters.map((semesterData) => (
          <Card 
            key={`${semesterData.semester}-${semesterData.branch}`}
            className={`cursor-pointer transition-all hover:shadow-md ${
              selectedSemester === semesterData.semester 
                ? 'ring-2 ring-primary border-primary' 
                : 'hover:border-primary/50'
            }`}
            onClick={() => onSemesterSelect(semesterData.semester, semesterData.branch)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg md:text-xl">
                    <span>Semester {semesterData.semester}</span>
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">{semesterData.branch}</p>
                </div>
                <Badge className={getAttendanceColor(semesterData.attendancePercentage)}>
                  {semesterData.attendancePercentage.toFixed(1)}%
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{semesterData.totalSubjects} Subjects</span>
                </div>
                <Button 
                  variant={selectedSemester === semesterData.semester ? "default" : "outline"}
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSemesterSelect(semesterData.semester, semesterData.branch);
                  }}
                >
                  {selectedSemester === semesterData.semester ? 'Selected' : 'Select'}
                </Button>
              </div>

              <div className="text-center p-3 bg-muted rounded-lg">
                <p className="text-lg font-semibold">
                  {semesterData.attendancePercentage.toFixed(1)}%
                </p>
                <p className="text-xs text-muted-foreground">Overall Attendance</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {semesters.length === 0 && (
        <Card className="text-center p-8">
          <div className="space-y-3">
            <GraduationCap className="h-12 w-12 mx-auto text-muted-foreground" />
            <div className="space-y-1">
              <h3 className="text-lg font-semibold">No Semesters Found</h3>
              <p className="text-muted-foreground">
                You are not registered for any semesters yet.
              </p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};