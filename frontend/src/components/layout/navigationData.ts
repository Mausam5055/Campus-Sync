import {
  LayoutDashboard,
  Calendar,
  Timer,
  Calculator,
  CheckSquare,
  FileText,
  Music,
  Dumbbell,
  DollarSign,
  Users,
  BookOpen,
  CalendarDays,
  Bot,
  Brain,
  Zap,
  Globe,
  PenTool,
  Newspaper,
} from "lucide-react"

export const navigationData = {
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: LayoutDashboard,
      isActive: true,
    },
    {
      title: "Courses",
      url: "/courses",
      icon: BookOpen,
      items: [
        {
          title: "My Courses",
          url: "/courses/my-courses",
          roles: ["student"]
        },
        {
          title: "My Classes", 
          url: "/teacher/my-classes",
          roles: ["teacher"]
        },
        {
          title: "Course Catalog",
          url: "/courses/catalog",
          roles: ["student"]
        },
        {
          title: "Admin Overview", 
          url: "/admin/overview",
          roles: ["admin"]
        },
        {
          title: "Subject Management",
          url: "/admin/subjects",
          roles: ["admin"]
        },
        {
          title: "Course Planning",
          url: "/admin/course-planning",
          roles: ["admin"]
        },
        {
          title: "Subject Allocation",
          url: "/admin/subject-allocation",
          roles: ["admin"]
        },
        {
          title: "Academic Structure",
          url: "/admin/academic-structure",
          roles: ["admin"]
        },
        {
          title: "Assignments",
          url: "/courses/assignments",
          roles: ["student"]
        },
        {
          title: "Assignments",
          url: "/teacher/assignments",
          roles: ["teacher"]
        },
      ],
    },
    {
      title: "Schedule",
      url: "/schedule",
      icon: Calendar,
      items: [
        {
          title: "Daily Planner",
          url: "/schedule/classes",
        },
        {
          title: "Exam Schedule",
          url: "/schedule/exams",
        },
        {
          title: "Events",
          url: "/schedule/events",
        },
      ],
    },
    {
      title: "Timetable",
      url: "/timetable",
      icon: CalendarDays,
    },
    {
      title: "Pomodoro",
      url: "/pomodoro",
      icon: Timer,
    },
    {
      title: "Calculators",
      url: "/calculators",
      icon: Calculator,
    },
    {
      title: "Tasks",
      url: "/tasks",
      icon: CheckSquare,
    },
    {
      title: "Notes",
      url: "/notes",
      icon: FileText,
    },
    {
      title: "Music Player",
      url: "/music",
      icon: Music,
    },
    {
      title: "Fitness",
      url: "/fitness",
      icon: Dumbbell,
    },
    {
      title: "Expenses",
      url: "/expenses",
      icon: DollarSign,
    },
    {
      title: "Community",
      url: "/community",
      icon: Users,
    },
    {
      title: "Announcements",
      url: "/announcements",
      icon: Newspaper,
    },
    {
      title: "Attendance",
      url: "/attendance",
      icon: CheckSquare,
      roles: ["student", "teacher"],
      items: [
        {
          title: "View Attendance",
          url: "/attendance/student",
          roles: ["student"]
        },
        {
          title: "Take Attendance",
          url: "/teacher/attendance",
          roles: ["teacher"]
        },
      ],
    },
    {
      title: "About Us",
      url: "/about",
      icon: Users,
    },
  ],
  navSecondary: [],
  projects: [
    {
      name: "Ask AI",
      url: "/ask-ai",
      icon: Bot,
    },
    {
      name: "Meditation",
      url: "/meditation", 
      icon: Brain,
    },
    {
      name: "Motivation",
      url: "/motivation",
      icon: Zap,
    },
    {
      name: "Wikipedia",
      url: "/wikipedia",
      icon: Globe,
    },
    {
      name: "Blog",
      url: "/blog",
      icon: PenTool,
    },
    {
      name: "News",
      url: "/news",
      icon: Newspaper,
    },
  ],
}