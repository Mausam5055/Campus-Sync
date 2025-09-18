import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingDown, TrendingUp, DollarSign, Target } from "lucide-react";

interface ExpenseOverviewProps {
  totalIncome: number;
  totalExpenses: number;
  averageDailyExpense: number;
  savingsRate: number;
}

export function ExpenseOverview({ 
  totalIncome, 
  totalExpenses, 
  averageDailyExpense, 
  savingsRate 
}: ExpenseOverviewProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="bg-gradient-to-br from-green-500/20 via-green-500/10 to-transparent border-green-200/30">
        <CardHeader className="pb-2 space-y-0">
          <CardTitle className="text-sm sm:text-base flex items-center gap-2">
            <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-green-500" />
            <span className="hidden sm:inline">Monthly Income</span>
            <span className="sm:hidden">Income</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xl sm:text-3xl font-bold text-green-600">₹{totalIncome.toLocaleString()}</div>
          <p className="text-xs sm:text-sm text-muted-foreground">pocket money</p>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-br from-red-500/20 via-red-500/10 to-transparent border-red-200/30">
        <CardHeader className="pb-2 space-y-0">
          <CardTitle className="text-sm sm:text-base flex items-center gap-2">
            <TrendingDown className="h-4 w-4 sm:h-5 sm:w-5 text-red-500" />
            <span className="hidden sm:inline">Total Expenses</span>
            <span className="sm:hidden">Expenses</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xl sm:text-3xl font-bold text-red-600">₹{totalExpenses.toLocaleString()}</div>
          <p className="text-xs sm:text-sm text-muted-foreground">this month</p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-blue-500/20 via-blue-500/10 to-transparent border-blue-200/30">
        <CardHeader className="pb-2 space-y-0">
          <CardTitle className="text-sm sm:text-base flex items-center gap-2">
            <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500" />
            <span className="hidden sm:inline">Daily Average</span>
            <span className="sm:hidden">Daily Avg</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xl sm:text-3xl font-bold text-blue-600">₹{averageDailyExpense}</div>
          <p className="text-xs sm:text-sm text-muted-foreground">per day</p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-purple-500/20 via-purple-500/10 to-transparent border-purple-200/30">
        <CardHeader className="pb-2 space-y-0">
          <CardTitle className="text-sm sm:text-base flex items-center gap-2">
            <Target className="h-4 w-4 sm:h-5 sm:w-5 text-purple-500" />
            <span className="hidden sm:inline">Savings Rate</span>
            <span className="sm:hidden">Savings</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xl sm:text-3xl font-bold text-purple-600">{savingsRate}%</div>
          <p className="text-xs sm:text-sm text-muted-foreground">
            {savingsRate > 20 ? "Excellent!" : savingsRate > 10 ? "Good" : "Needs work"}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}