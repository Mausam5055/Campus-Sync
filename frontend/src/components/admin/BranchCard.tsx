import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, GraduationCap, ArrowRight } from "lucide-react"

interface BranchCardProps {
  branch: string
  studentCount: number
  teacherCount: number
  onViewStudents: () => void
  onViewTeachers: () => void
}

export const BranchCard: React.FC<BranchCardProps> = ({
  branch,
  studentCount,
  teacherCount,
  onViewStudents,
  onViewTeachers
}) => {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border hover:border-primary/30 h-full">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors">
          {branch}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Stats Section */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 rounded-xl bg-primary/5 border border-primary/10">
            <Users className="h-6 w-6 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold text-primary">{studentCount}</div>
            <div className="text-sm text-muted-foreground">Students</div>
          </div>
          <div className="text-center p-4 rounded-xl bg-secondary/30 border border-secondary/20">
            <GraduationCap className="h-6 w-6 text-foreground mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">{teacherCount}</div>
            <div className="text-sm text-muted-foreground">Teachers</div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="space-y-3">
          <Button 
            variant="outline" 
            onClick={onViewStudents}
            className="w-full justify-between hover:bg-primary/5 hover:border-primary/30 text-foreground hover:text-primary"
          >
            <div className="flex items-center text-foreground">
              <Users className="h-4 w-4 mr-2" />
              <span className="font-medium">View Students</span>
            </div>
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            onClick={onViewTeachers}
            className="w-full justify-between hover:bg-secondary/20 hover:border-secondary/30 text-foreground hover:text-foreground"
          >
            <div className="flex items-center text-foreground">
              <GraduationCap className="h-4 w-4 mr-2" />
              <span className="font-medium">View Teachers</span>
            </div>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}