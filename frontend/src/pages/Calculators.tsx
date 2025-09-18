import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calculator, Percent, TrendingUp, DollarSign } from "lucide-react";
import { usePageLoading } from "@/hooks/use-page-loading";
import { GenericPageSkeleton } from "@/components/ui/page-skeleton";
import { BasicCalculator } from "@/components/calculators/BasicCalculator";
import { CGPACalculator } from "@/components/calculators/CGPACalculator";
import { LoanCalculator } from "@/components/calculators/LoanCalculator";
import { GradeCalculator } from "@/components/calculators/GradeCalculator";

const Calculators = () => {
  const isLoading = usePageLoading();

  if (isLoading) {
    return <GenericPageSkeleton />
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="mobile-heading font-bold">Calculators</h1>
        <p className="text-muted-foreground mobile-hide-description">Essential calculators for students</p>
      </div>

      <Tabs defaultValue="gpa" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="gpa">CGPA</TabsTrigger>
          <TabsTrigger value="loan">Loans</TabsTrigger>
          <TabsTrigger value="grade">Grades</TabsTrigger>
          <TabsTrigger value="basic">Basic</TabsTrigger>
        </TabsList>

        {/* CGPA Calculator */}
        <TabsContent value="gpa" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                CGPA Calculator
              </CardTitle>
              <CardDescription className="mobile-hide-description">Track your academic performance across all semesters</CardDescription>
            </CardHeader>
            <CardContent>
              <CGPACalculator />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Loan Calculator */}
        <TabsContent value="loan" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Student Loan Calculator
              </CardTitle>
              <CardDescription className="mobile-hide-description">Calculate loan payments with detailed breakdown and visualization</CardDescription>
            </CardHeader>
            <CardContent>
              <LoanCalculator />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Grade Calculator */}
        <TabsContent value="grade" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Percent className="h-5 w-5" />
                Grade Calculator
              </CardTitle>
              <CardDescription className="mobile-hide-description">Track assignments and calculate required final exam scores</CardDescription>
            </CardHeader>
            <CardContent>
              <GradeCalculator />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Basic Calculator */}
        <TabsContent value="basic" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Basic Calculator
              </CardTitle>
              <CardDescription className="mobile-hide-description">Functional arithmetic calculator</CardDescription>
            </CardHeader>
            <CardContent>
              <BasicCalculator />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Calculators;