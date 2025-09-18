import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CalendarDays, BookOpen, Clock, Users, FileText, Calculator, Music, DollarSign, PlusCircle, Eye, Bell, Target } from "lucide-react"
import { useNavigate } from "react-router-dom"

const todaySchedule = [
  {
    title: "Data Structures Lab",
    time: "9:00 AM",
    location: "Lab A-204",
    type: "lab",
    status: "ongoing"
  },
  {
    title: "Database Systems",
    time: "11:30 AM", 
    location: "Room B-112",
    type: "lecture",
    status: "upcoming"
  },
  {
    title: "Study Group - ML",
    time: "3:00 PM",
    location: "Library 3F",
    type: "study",
    status: "upcoming"
  },
  {
    title: "Project Discussion",
    time: "5:00 PM",
    location: "Online",
    type: "meeting",
    status: "upcoming"
  }
]

const urgentTasks = [
  {
    title: "Database Assignment #3",
    dueDate: "Today 11:59 PM",
    progress: 75,
    priority: "urgent",
    subject: "Database Systems"
  },
  {
    title: "ML Research Paper",
    dueDate: "Tomorrow",
    progress: 40,
    priority: "high",
    subject: "Machine Learning"
  },
  {
    title: "Web Dev Project",
    dueDate: "2 days",
    progress: 85,
    priority: "medium",
    subject: "Web Development"
  }
]

const quickActionButtons = [
  { label: "View Courses", icon: BookOpen, route: "/courses/my-courses", color: "bg-blue-500" },
  { label: "Check Grades", icon: Target, route: "/view-marks", color: "bg-green-500" },
  { label: "Add Expense", icon: DollarSign, route: "/expenses", color: "bg-purple-500" },
  { label: "Take Notes", icon: FileText, route: "/notes", color: "bg-orange-500" },
  { label: "Calculator", icon: Calculator, route: "/calculators", color: "bg-indigo-500" },
  { label: "Music Player", icon: Music, route: "/music", color: "bg-pink-500" }
]

export function QuickActions() {
  const navigate = useNavigate()

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ongoing": return "bg-green-500 text-white"
      case "upcoming": return "bg-blue-500 text-white"
      default: return "bg-gray-500 text-white"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent": return "destructive"
      case "high": return "default"
      case "medium": return "secondary"
      default: return "outline"
    }
  }

  return (
    <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-3 px-2 sm:px-0">
      {/* Today's Schedule */}
      <Card className="lg:col-span-2">
        <CardHeader className="px-3 sm:px-6 pt-3 sm:pt-6">
          <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
            <CalendarDays className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
            Today's Schedule
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 sm:space-y-3 px-3 sm:px-6 pb-3 sm:pb-6">
          {todaySchedule.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-2 sm:p-3 rounded-lg border hover:bg-muted/30 transition-colors">
              <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="font-medium text-xs sm:text-sm truncate">{item.title}</span>
                  <span className="text-xs text-muted-foreground truncate">{item.location}</span>
                </div>
              </div>
              <div className="flex items-center gap-1 sm:gap-2 shrink-0">
                <Badge variant="outline" className={`${getStatusColor(item.status)} text-xs`}>
                  {item.status}
                </Badge>
                <div className="text-right">
                  <div className="text-xs sm:text-sm font-medium">{item.time}</div>
                </div>
              </div>
            </div>
          ))}
          <Button 
            variant="outline" 
            className="w-full mt-2 sm:mt-3 text-xs sm:text-sm h-8 sm:h-9"
            onClick={() => navigate("/timetable")}
          >
            <Eye className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
            View Full Schedule
          </Button>
        </CardContent>
      </Card>

      {/* Urgent Tasks */}
      <Card>
        <CardHeader className="px-3 sm:px-6 pt-3 sm:pt-6">
          <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
            <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
            Urgent Tasks
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 sm:space-y-4 px-3 sm:px-6 pb-3 sm:pb-6">
          {urgentTasks.map((task, index) => (
            <div key={index} className="space-y-2 p-2 sm:p-3 rounded-lg border bg-muted/20">
              <div className="flex items-start justify-between gap-2">
                <div className="space-y-1 flex-1 min-w-0">
                  <h4 className="font-medium text-xs sm:text-sm leading-tight truncate">{task.title}</h4>
                  <p className="text-xs text-muted-foreground truncate">{task.subject}</p>
                </div>
                <Badge variant={getPriorityColor(task.priority)} className="ml-1 sm:ml-2 text-xs shrink-0">
                  {task.priority}
                </Badge>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span>Progress</span>
                  <span>{task.progress}%</span>
                </div>
                <Progress value={task.progress} className="h-1" />
              </div>
              <p className="text-xs text-muted-foreground truncate">Due: {task.dueDate}</p>
            </div>
          ))}
          <Button 
            variant="outline" 
            className="w-full text-xs sm:text-sm h-8 sm:h-9"
            onClick={() => navigate("/tasks")}
          >
            <Eye className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
            View All Tasks
          </Button>
        </CardContent>
      </Card>

      {/* Quick Actions Grid */}
      <Card className="lg:col-span-3">
        <CardHeader className="px-3 sm:px-6 pt-3 sm:pt-6">
          <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
            <Target className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6">
          <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3">
            {quickActionButtons.map((action, index) => {
              const Icon = action.icon
              return (
                <Button
                  key={index}
                  variant="outline"
                  className="h-16 sm:h-20 flex-col gap-1 sm:gap-2 hover:scale-105 transition-transform p-2"
                  onClick={() => navigate(action.route)}
                >
                  <div className={`p-1.5 sm:p-2 rounded-full ${action.color} text-white`}>
                    <Icon className="h-3 w-3 sm:h-4 sm:w-4" />
                  </div>
                  <span className="text-xs font-medium text-center leading-tight">
                    {action.label}
                  </span>
                </Button>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="lg:col-span-3">
        <CardHeader className="px-3 sm:px-6 pt-3 sm:pt-6">
          <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
            <Bell className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
            Recent Activity & Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6">
          <div className="space-y-2 sm:space-y-3">
            <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/50">
              <div className="w-2 h-2 bg-blue-500 rounded-full shrink-0"></div>
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm font-medium truncate">New assignment posted: "Linear Algebra Problem Set #5"</p>
                <p className="text-xs text-muted-foreground">Mathematics • 2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800/50">
              <div className="w-2 h-2 bg-green-500 rounded-full shrink-0"></div>
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm font-medium truncate">Grade updated: Database Project - A+ (95%)</p>
                <p className="text-xs text-muted-foreground">Database Systems • 5 hours ago</p>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-800/50">
              <div className="w-2 h-2 bg-orange-500 rounded-full shrink-0"></div>
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm font-medium truncate">Exam schedule released for Mid-term evaluations</p>
                <p className="text-xs text-muted-foreground">Academic Office • Yesterday</p>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800/50">
              <div className="w-2 h-2 bg-purple-500 rounded-full shrink-0"></div>
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm font-medium truncate">Study group invitation: "ML Study Session"</p>
                <p className="text-xs text-muted-foreground">Community • 2 days ago</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}