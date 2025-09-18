import { usePageLoading } from "@/hooks/use-page-loading"
import { IndexSkeleton } from "@/components/ui/page-skeleton"
import { SEO } from "@/components/SEO"
import { useAuth } from "@/contexts/AuthContext"
import { DashboardStats } from "@/components/dashboard/DashboardStats"
import { AcademicOverview } from "@/components/dashboard/AcademicOverview"
import { ExpenseOverview } from "@/components/dashboard/ExpenseOverview"
import { AnalyticsOverview } from "@/components/dashboard/AnalyticsOverview"
import { QuickActions } from "@/components/dashboard/QuickActions"
import { StudentInfo } from "@/components/dashboard/StudentInfo"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GraduationCap, TrendingUp, DollarSign, Zap } from "lucide-react"

const Index = () => {
  const isLoading = usePageLoading()
  const { user } = useAuth()

  if (isLoading) {
    return <IndexSkeleton />
  }

  return (
    <>
      <SEO 
        title="Dashboard"
        description="Welcome to your CampusSync dashboard. View your academic progress, upcoming deadlines, today's schedule, and quick access to all your student management tools."
        keywords="student dashboard, academic overview, course progress, assignment tracker, class schedule"
      />
      <div className="space-y-4 sm:space-y-6 px-2 sm:px-0">
        {/* Welcome Header */}
        <div className="space-y-3 text-center md:text-left">
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-black dark:text-white">
              Welcome back, {user?.name || 'Student'}! 👋
            </h1>
          </div>
        </div>

        {/* Dashboard Stats */}
        <DashboardStats />

        {/* Main Dashboard Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 bg-muted/30 gap-1 p-1">
            <TabsTrigger value="overview" className="flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm px-2 sm:px-3">
              <Zap className="h-3 w-3 sm:h-4 sm:w-4 shrink-0" />
              <span className="hidden xs:inline sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="academic" className="flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm px-2 sm:px-3">
              <GraduationCap className="h-3 w-3 sm:h-4 sm:w-4 shrink-0" />
              <span className="hidden xs:inline sm:inline">Academic</span>
            </TabsTrigger>
            <TabsTrigger value="expenses" className="flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm px-2 sm:px-3">
              <DollarSign className="h-3 w-3 sm:h-4 sm:w-4 shrink-0" />
              <span className="hidden xs:inline sm:inline">Expenses</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm px-2 sm:px-3">
              <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 shrink-0" />
              <span className="hidden xs:inline sm:inline">Analytics</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-4 sm:mt-6 space-y-4 sm:space-y-6">
            <QuickActions />
          </TabsContent>

          <TabsContent value="academic" className="mt-4 sm:mt-6 space-y-4 sm:space-y-6">
            <AcademicOverview />
          </TabsContent>

          <TabsContent value="expenses" className="mt-4 sm:mt-6 space-y-4 sm:space-y-6">
            <ExpenseOverview />
          </TabsContent>

          <TabsContent value="analytics" className="mt-4 sm:mt-6 space-y-4 sm:space-y-6">
            <AnalyticsOverview />
          </TabsContent>
        </Tabs>

        {/* Student Info Section */}
        <StudentInfo />
      </div>
    </>
  );
};

export default Index;
