import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Clock, BookOpen } from "lucide-react";
import { Branch } from "@/data/courseData";

interface BranchSelectorProps {
  branches: Branch[];
  selectedBranch: string | null;
  onBranchSelect: (branchId: string) => void;
}

export function BranchSelector({ branches, selectedBranch, onBranchSelect }: BranchSelectorProps) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl sm:text-2xl font-bold">Choose Your Branch</h2>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {branches.map((branch) => (
          <Card 
            key={branch.id} 
            className={`cursor-pointer transition-all hover:shadow-lg ${
              selectedBranch === branch.id 
                ? 'ring-2 ring-primary border-primary shadow-md' 
                : 'hover:shadow-md'
            }`}
            onClick={() => onBranchSelect(branch.id)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <GraduationCap className="h-8 w-8 text-primary" />
                <Badge variant="outline">{branch.code}</Badge>
              </div>
              <CardTitle className="text-base sm:text-lg">{branch.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>Duration: {branch.duration}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <BookOpen className="h-4 w-4" />
                <span>{branch.semesters.length} Semesters</span>
              </div>
              <Button 
                className="w-full" 
                variant={selectedBranch === branch.id ? "default" : "outline"}
              >
                {selectedBranch === branch.id ? "Selected" : "Select Branch"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}