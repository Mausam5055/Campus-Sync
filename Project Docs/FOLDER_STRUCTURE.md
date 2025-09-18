# CampusSync - Comprehensive Project Structure

## Overview
CampusSync is a comprehensive student management platform built with React, TypeScript, Vite, and Tailwind CSS. The project follows a modular architecture with clear separation of concerns, featuring role-based access control for students, teachers, and administrators.

## Current Folder Structure

### `/src/` - Main Source Directory
```
src/
├── components/                    # All React components
├── pages/                        # Page components and routes
├── contexts/                     # React context providers
├── hooks/                        # Custom React hooks
├── lib/                          # Utility libraries
├── routes/                       # Route configurations
├── data/                         # Static data files
├── assets/                       # Static assets (images, audio, etc.)
├── types/                        # TypeScript type definitions
├── App.tsx                       # Main App component
├── App.css                       # Global app styles
├── index.css                     # Tailwind and design system styles
├── main.tsx                      # Application entry point
└── vite-env.d.ts                # Vite environment types
```

### `/src/components/` - Component Library
```
components/
├── about/                        # About page components
│   ├── contact/
│   │   ├── ContactForm.tsx
│   │   ├── ContactInfo.tsx
│   │   └── FAQPreview.tsx
│   ├── ContactSection.tsx
│   ├── FAQSection.tsx
│   ├── FeaturesSection.tsx
│   ├── HeroSection.tsx
│   ├── TeamSection.tsx
│   └── TestimonialsSection.tsx
├── admin/                        # Admin management components
│   ├── AdminProfileActions.tsx
│   ├── AdminProfileOverview.tsx
│   ├── AdminProfileStats.tsx
│   ├── AllocationDialog.tsx
│   ├── BranchCard.tsx
│   ├── BranchSelector.tsx
│   ├── CreateCoursePlanDialog.tsx
│   ├── CreateSubjectDialog.tsx
│   ├── CreateTeacherDialog.tsx
│   ├── StudentDetailsModal.tsx
│   └── TeacherDetailsModal.tsx
├── announcements/                # Announcement system
│   ├── AdminAnnouncements.tsx
│   ├── AnnouncementCard.tsx
│   ├── CreateAnnouncementDialog.tsx
│   ├── StudentAnnouncements.tsx
│   └── TeacherAnnouncements.tsx
├── assignments/                  # Assignment management
│   ├── teacher/
│   │   ├── AssignmentDetailModal.tsx
│   │   ├── CreateAssignmentDialog.tsx
│   │   ├── DeleteAssignmentDialog.tsx
│   │   ├── EditAssignmentDialog.tsx
│   │   └── StudentSubmissionsDialog.tsx
│   ├── AssignmentCard.tsx
│   ├── AssignmentDetailModal.tsx
│   ├── AssignmentList.tsx
│   └── AssignmentStats.tsx
├── auth/                         # Authentication components
│   ├── AuthBackground.tsx
│   ├── AuthForm.tsx
│   ├── AuthFormFields.tsx
│   ├── AuthHeroSection.tsx
│   ├── AuthMobileHero.tsx
│   ├── AuthMobileRoleSelection.tsx
│   ├── AuthRoleSelection.tsx
│   └── index.ts
├── billing/                      # Billing and payment system
│   ├── BillCategoryManager.tsx
│   ├── BillingAnalytics.tsx
│   ├── BillingFilters.tsx
│   ├── BillingPagination.tsx
│   ├── BillingSettings.tsx
│   ├── BillingStats.tsx
│   ├── BillingTable.tsx
│   ├── BulkActionsDialog.tsx
│   ├── BulkBillDialog.tsx
│   ├── CreateBillDialog.tsx
│   ├── CreateTeacherPaymentDialog.tsx
│   ├── ProcessPayrollDialog.tsx
│   ├── StudentBillingSection.tsx
│   └── TeacherBillingSection.tsx
├── calculators/                  # Academic calculators
│   ├── BasicCalculator.tsx
│   ├── CGPACalculator.tsx
│   ├── EnhancedCharts.tsx
│   ├── GradeCalculator.tsx
│   └── LoanCalculator.tsx
├── community/                    # Community features
│   ├── ChatInterface.tsx
│   ├── CreateGroupDialog.tsx
│   ├── EnhancedChatMessage.tsx
│   ├── GroupCard.tsx
│   ├── GroupDetailsDialog.tsx
│   ├── GroupSettingsDialog.tsx
│   ├── IconUpload.tsx
│   ├── MediaShareDialog.tsx
│   └── MessageReadReceipts.tsx
├── courses/                      # Course management
│   ├── BranchSelector.tsx
│   ├── CourseCard.tsx
│   ├── CourseDetailModal.tsx
│   └── SemesterView.tsx
├── dashboard/                    # Dashboard components
│   ├── AcademicOverview.tsx
│   ├── AnalyticsOverview.tsx
│   ├── DashboardStats.tsx
│   ├── ExpenseOverview.tsx
│   ├── QuickActions.tsx
│   └── StudentInfo.tsx
├── exams/                        # Exam management system
│   ├── admin/
│   │   ├── AdminExamManagement.tsx
│   │   ├── CreateExamDialog.tsx
│   │   ├── EditExamDialog.tsx
│   │   ├── ExamDetailModal.tsx
│   │   ├── ExamScheduleTable.tsx
│   │   ├── ExamSlotManager.tsx
│   │   └── SemesterManager.tsx
│   ├── student/
│   │   └── StudentExamView.tsx
│   └── teacher/
│       ├── ExamDetailDialog.tsx
│       ├── StudentListDialog.tsx
│       └── TeacherExamView.tsx
├── expenses/                     # Expense tracking
│   ├── AddExpenseDialog.tsx
│   ├── EditExpenseDialog.tsx
│   ├── ExpenseCharts.tsx
│   ├── ExpenseFilters.tsx
│   ├── ExpenseOverview.tsx
│   └── TransactionItem.tsx
├── features/                     # Feature-based organization
│   ├── academic/
│   ├── dashboard/
│   ├── financial/
│   ├── profile/
│   ├── study/
│   └── index.ts
├── fitness/                      # Fitness tracking
│   ├── ActiveWorkoutCard.tsx
│   ├── FitnessStats.tsx
│   └── WorkoutCard.tsx
├── layout/                       # Layout components
│   ├── AppLayout.tsx
│   ├── MainHeader.tsx
│   ├── SidebarNavigation.tsx
│   ├── navigationData.ts
│   └── index.ts
├── marks/                        # Grade management
│   ├── BulkUploadDialog.tsx
│   ├── ClassStatistics.tsx
│   ├── DetailedMarksDialog.tsx
│   └── SubjectDetailModal.tsx
├── meditation/                   # Meditation features
│   └── MeditationContentCard.tsx
├── music/                        # Music player
│   ├── PlayerControls.tsx
│   └── SongCard.tsx
├── mycourses/                    # Personal courses
│   └── CourseCard.tsx
├── notes/                        # Note-taking system
│   ├── NoteCard.tsx
│   ├── NoteDetailModal.tsx
│   ├── NotesAI.tsx
│   ├── NotesAnalytics.tsx
│   ├── NotesEditor.tsx
│   ├── StudyMaterials.tsx
│   ├── StudyMaterialsList.tsx
│   ├── StudyMaterialsUpload.tsx
│   └── StudyModeViewer.tsx
├── profile/                      # User profile
│   ├── EditProfileDialog.tsx
│   ├── EditStudentIDDialog.tsx
│   └── PhotoCropDialog.tsx
├── shared/                       # Shared components
├── students/                     # Student management
│   └── StudentDetailsModal.tsx
├── ui/                          # UI primitives (shadcn/ui)
│   ├── accordion.tsx
│   ├── alert-dialog.tsx
│   ├── alert.tsx
│   ├── aspect-ratio.tsx
│   ├── avatar.tsx
│   ├── badge.tsx
│   ├── breadcrumb.tsx
│   ├── button.tsx
│   ├── calendar.tsx
│   ├── card-skeleton.tsx
│   ├── card.tsx
│   ├── carousel.tsx
│   ├── chart.tsx
│   ├── checkbox.tsx
│   ├── collapsible.tsx
│   ├── command.tsx
│   ├── context-menu.tsx
│   ├── dialog.tsx
│   ├── drawer.tsx
│   ├── dropdown-menu.tsx
│   ├── form.tsx
│   ├── hover-card.tsx
│   ├── image-loader.tsx
│   ├── input-otp.tsx
│   ├── input.tsx
│   ├── label.tsx
│   ├── meditation-skeleton.tsx
│   ├── menubar.tsx
│   ├── modern-calendar.tsx
│   ├── motivation-skeleton.tsx
│   ├── navigation-menu.tsx
│   ├── page-skeleton.tsx
│   ├── pagination.tsx
│   ├── popover.tsx
│   ├── profile-skeleton.tsx
│   ├── progress.tsx
│   ├── qr-code-modal.tsx
│   ├── radio-group.tsx
│   ├── resizable.tsx
│   ├── scroll-area.tsx
│   ├── select.tsx
│   ├── separator.tsx
│   ├── sheet.tsx
│   ├── sidebar.tsx
│   ├── skeleton.tsx
│   ├── slider.tsx
│   ├── sonner.tsx
│   ├── switch.tsx
│   ├── table.tsx
│   ├── tabs.tsx
│   ├── textarea.tsx
│   ├── toast.tsx
│   ├── toaster.tsx
│   ├── toggle-group.tsx
│   ├── toggle.tsx
│   ├── tooltip.tsx
│   └── use-toast.ts
├── ProtectedRoute.tsx           # Route protection
├── PublicRoute.tsx              # Public routes
├── RoleRoute.tsx                # Role-based routing
├── SEO.tsx                      # SEO management
├── ScrollToTop.tsx              # Scroll utility
├── app-sidebar.tsx              # Modern sidebar component
├── nav-main.tsx                 # Main navigation
├── nav-projects.tsx             # Project navigation
├── nav-secondary.tsx            # Secondary navigation
├── nav-user.tsx                 # User navigation
├── theme-provider.tsx           # Theme management
└── theme-toggle.tsx             # Theme switcher
```

### `/src/pages/` - Application Pages
```
pages/
├── admin/                       # Admin-specific pages
│   ├── AcademicStructure.tsx
│   ├── CoursePlanning.tsx
│   ├── SubjectAllocation.tsx
│   └── SubjectManagement.tsx
├── AboutUs.tsx                  # About page
├── AcademicProgress.tsx         # Academic tracking
├── AdminBilling.tsx             # Admin billing
├── AdminID.tsx                  # Admin ID management
├── AdminOverview.tsx            # Admin dashboard
├── AdminProfile.tsx             # Admin profile
├── Announcements.tsx            # Announcement system
├── AskAI.tsx                    # AI assistant
├── Assignments.tsx              # Assignment management
├── Auth.tsx                     # Authentication page
├── BillingPayments.tsx          # Billing system
├── Blog.tsx                     # Blog listing
├── BlogPost.tsx                 # Individual blog posts
├── BranchStudents.tsx           # Branch student management
├── BranchStudentsOverview.tsx   # Branch student overview
├── BranchTeachers.tsx           # Branch teacher management
├── BranchTeachersOverview.tsx   # Branch teacher overview
├── Calculators.tsx              # Calculator tools
├── ClassSchedule.tsx            # Class scheduling
├── Community.tsx                # Community features
├── CourseCatalog.tsx            # Course browsing
├── Events.tsx                   # Event management
├── ExamSchedule.tsx             # Exam scheduling
├── Expenses.tsx                 # Expense tracking
├── Fitness.tsx                  # Fitness tracking
├── Index.tsx                    # Landing page
├── ManageStudents.tsx           # Student management
├── ManageTeachers.tsx           # Teacher management
├── Meditation.tsx               # Meditation tools
├── Motivation.tsx               # Motivational content
├── MusicPlayer.tsx              # Music player
├── MyClasses.tsx                # Teacher class management
├── MyCourses.tsx                # Personal courses
├── News.tsx                     # News feed
├── NotFound.tsx                 # 404 page
├── Notes.tsx                    # Note-taking
├── ParentComingSoon.tsx         # Parent portal placeholder
├── Pomodoro.tsx                 # Pomodoro timer
├── SmartTimetable.tsx           # Smart timetable router
├── StudentBilling.tsx           # Student billing
├── StudentID.tsx                # Student ID management
├── StudentProfile.tsx           # Student profile
├── StudentsDetails.tsx          # Student details
├── Tasks.tsx                    # Task management
├── TeacherAssignments.tsx       # Teacher assignments
├── TeacherBilling.tsx           # Teacher billing
├── TeacherID.tsx                # Teacher ID management
├── TeacherProfile.tsx           # Teacher profile
├── TeacherTimetable.tsx         # Teacher timetable
├── Timetable.tsx                # Student timetable
├── UploadMarks.tsx              # Grade upload
├── ViewMarks.tsx                # Grade viewing
├── Wikipedia.tsx                # Wikipedia integration
└── index.ts                     # Page exports
```

### `/src/routes/` - Routing System
```
routes/
├── admin/                       # Admin-specific routes
│   ├── AdminRoutes.tsx
│   └── index.ts
├── common/                      # Common routes
│   ├── CommonRoutes.tsx
│   └── index.ts
├── student/                     # Student-specific routes
│   ├── StudentRoutes.tsx
│   └── index.ts
├── teacher/                     # Teacher-specific routes
│   ├── TeacherRoutes.tsx
│   └── index.ts
├── AppRoutes.tsx               # Main route orchestrator
├── ProtectedRoutes.tsx         # Protected route wrapper
├── PublicRoutes.tsx            # Public route wrapper
└── index.ts                    # Route exports
```

### `/src/hooks/` - Custom Hooks
```
hooks/
├── use-mobile.tsx              # Mobile detection
├── use-page-loading.tsx        # Page loading states
├── use-toast.ts                # Toast notifications
├── useAdminData.ts             # Admin data management
├── useAdminIDData.ts           # Admin ID data management
├── useAudioPlayer.ts           # Audio player functionality
├── useLocalStorage.ts          # Local storage utilities
├── useSEO.ts                   # SEO management
├── useStudentIDData.ts         # Student ID data
├── useTeacherIDData.ts         # Teacher ID data
├── useUserData.ts              # User data management
└── index.ts                    # Hook exports
```

### `/src/assets/` - Static Assets
```
assets/
├── audio/
│   └── ambient-focus.mp3
├── ambient-focus-cover.jpg
├── classical-study-cover.jpg
├── electronic-coding-cover.jpg
├── jazz-coffee-cover.jpg
├── lofi-study-cover.jpg
├── login-hero.jpg
├── nature-sounds-cover.jpg
├── quote-bg.jpg
├── social-preview.jpg
└── wikipedia-bg.jpg
```

### `/src/lib/` - Utility Libraries
```
lib/
├── utils.ts                    # Common utilities
└── index.ts                    # Library exports
```

### `/src/contexts/` - Context Providers
```
contexts/
└── AuthContext.tsx            # Authentication context
```

### `/src/data/` - Static Data
```
data/
└── courseData.ts              # Course information
```

### `/src/types/` - TypeScript Definitions
```
types/
├── academic.ts                # Academic-related types
└── exam.ts                    # Exam-related types
```

### `/public/` - Public Assets
```
public/
├── lovable-uploads/           # User uploaded files
├── .htaccess                  # Apache configuration
├── preview.png               # Site preview image
├── robots.txt                # SEO robots file
└── sitemap.xml               # SEO sitemap
```

### `/supabase/` - Backend Configuration
```
supabase/
├── functions/
│   └── ask-ai/
│       └── index.ts          # AI assistant function
└── config.toml               # Supabase configuration
```

## Key Architecture Features

### 1. **Role-Based Routing**
- Separate route files for students, teachers, and admins
- Role-based access control with ProtectedRoute and RoleRoute components
- Clear separation of concerns for different user types

### 2. **Feature-Based Organization**
- Components grouped by feature area in `/src/components/features/`
- Modular architecture promoting code reusability
- Clear boundaries between different application areas

### 3. **Authentication System**
- Comprehensive auth flow with role selection
- Mobile-optimized authentication experience
- Multi-step signup process with proper validation

### 4. **Design System**
- Tailwind CSS with custom design tokens in `index.css`
- Shadcn/ui component library for consistent UI
- Theme support with light/dark mode toggle

### 5. **SEO Optimization**
- Dedicated SEO component with meta tag management
- Structured data and social media optimization
- Proper semantic HTML structure

## Recent Improvements

### 1. **Layout Refactoring**
- Extracted layout components from monolithic files
- Created focused, reusable layout components
- Improved maintainability and code organization

### 2. **Route Organization**
- Implemented role-based routing system
- Clear separation of public vs protected routes
- Simplified main App.tsx from 169 lines to ~15 lines

### 3. **Component Modularity**
- Broke down large components into smaller, focused files
- Improved code discoverability and maintenance
- Better separation of concerns

### 4. **Export System**
- Centralized exports with index files
- Consistent import patterns throughout the application
- Better tree-shaking support

## Technology Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + shadcn/ui
- **Routing**: React Router v6
- **State Management**: React Context + Custom Hooks
- **Backend**: Supabase (Authentication, Database, Edge Functions)
- **Forms**: React Hook Form + Zod validation
- **Charts**: Recharts
- **Icons**: Lucide React

## Development Guidelines

### 1. **Component Creation**
- Keep components small and focused (prefer multiple small files)
- Use TypeScript for all components
- Follow consistent naming conventions
- Include proper prop types and interfaces

### 2. **Styling**
- Use Tailwind utility classes
- Follow the design system defined in `index.css`
- Prefer semantic color tokens over direct color values
- Ensure responsive design for all components

### 3. **State Management**
- Use React Context for global state
- Custom hooks for complex logic
- Local state for component-specific data
- Prefer composition over inheritance

### 4. **File Organization**
- Group related files together
- Use index files for clean exports
- Keep file sizes reasonable (under 300 lines when possible)
- Follow consistent folder structure

## Future Considerations

1. **Performance Optimization**
   - Implement code splitting for large features
   - Add lazy loading for heavy components
   - Optimize image loading and bundling

2. **Testing Strategy**
   - Add unit tests for critical components
   - Implement E2E testing for user flows
   - Set up continuous integration

3. **Accessibility**
   - Audit for WCAG compliance
   - Improve keyboard navigation
   - Add proper ARIA labels

4. **Documentation**
   - Component documentation with Storybook
   - API documentation
   - User guides and tutorials