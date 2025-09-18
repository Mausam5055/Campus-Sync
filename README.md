# CampusSync - Comprehensive Educational Management Platform

[![React](https://img.shields.io/badge/React-18+-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0+-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0+-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Express.js](https://img.shields.io/badge/Express.js-4.x-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4.x-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongodb.com/)
[![Vercel](https://img.shields.io/badge/Vercel-Deployment-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)

![CampusSync Dashboard](https://placehold.co/800x400/2563eb/white?text=CampusSync+Dashboard)
*CampusSync Dashboard - Overview of all features*

## 🎓 Project Overview

CampusSync is a modern, comprehensive educational management platform designed by **Mausam Kar** to streamline academic operations for students, teachers, and administrators. Built with cutting-edge technologies, it provides a unified solution for managing all aspects of campus life.

**Developer**: Mausam Kar
**Live Demo**: https://campus-sync-frontend-three.vercel.app/

## ✨ Key Features

### 👨‍🎓 Student Features
- **Academic Dashboard** - Overview of courses, grades, and assignments
- **Smart Timetable** - Interactive class schedule with mobile optimization
- **Assignment Management** - Track assignments and submissions
- **Grade Tracking** - View marks and academic progress
- **Expense Tracking** - Personal finance management
- **Study Tools** - Notes, calculators, and study materials
- **Wellness Features** - Meditation, fitness tracking, and Pomodoro timer
- **Community** - Chat groups and collaboration tools

### 👩‍🏫 Teacher Features
- **Teaching Dashboard** - Manage classes and student progress
- **Class Management** - View assigned classes and student lists
- **Assignment Creation** - Create and manage assignments
- **Grade Management** - Upload and manage student marks
- **Billing System** - Track payments and payroll
- **Exam Management** - Schedule and manage examinations
- **Student Analytics** - Track student performance

### 👨‍💼 Administrator Features
- **Admin Dashboard** - Complete system overview and analytics
- **Student Management** - Comprehensive student database
- **Teacher Management** - Teacher allocation and management
- **Course Planning** - Academic structure and course management
- **Billing System** - Financial management and billing
- **Exam Scheduling** - Centralized exam management
- **Announcement System** - Campus-wide communications
- **Academic Structure** - Branch and subject management

### 🛠 Universal Features
- **Role-Based Access Control** - Secure, role-specific interfaces
- **Responsive Design** - Optimized for all devices
- **Dark/Light Mode** - Theme switching capability
- **SEO Optimized** - Search engine friendly
- **Real-time Updates** - Live data synchronization
- **AI Assistant** - Integrated AI help system
- **Multi-media Support** - Music player and media sharing
- **Advanced Calculators** - CGPA, loan, and grade calculators

## 🚀 Technology Stack

### Frontend
- **React 18** - Modern React with hooks and context
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Modern component library
- **React Router v6** - Client-side routing
- **React Hook Form** - Form handling and validation
- **Zod** - Schema validation
- **Recharts** - Data visualization
- **Lucide React** - Icon library

### Backend & Services
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database with Mongoose ODM
- **JWT Authentication** - Secure user authentication
- **RESTful APIs** - Standardized API architecture
- **Cloud Storage** - File storage solutions
- **Payment Integration** - Stripe or similar payment processors

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **TypeScript** - Static type checking
- **Jest** - Testing framework
- **Docker** - Containerization

## 🏗️ Backend Architecture (Planned Migration)

CampusSync is currently using Supabase as the backend service. However, we are planning to migrate to a custom backend solution using Express.js and MongoDB for greater flexibility and control. This migration will provide:

### Architecture Overview
- **Framework**: Express.js for RESTful API development
- **Database**: MongoDB with Mongoose ODM for data modeling
- **Authentication**: JWT-based authentication with role-based access control
- **API Documentation**: Swagger/OpenAPI for comprehensive API documentation
- **Validation**: Joi/Zod for request validation
- **Logging**: Winston for application logging
- **Testing**: Jest/Supertest for unit and integration testing
- **Deployment**: Docker + Docker Compose for containerization

### Core Collections
1. **Users** - User profiles and authentication data
2. **Students** - Student-specific information and academic records
3. **Teachers** - Teacher profiles and course assignments
4. **Admins** - Administrative user permissions and settings
5. **Courses** - Academic courses with schedules and instructors
6. **Assignments** - Course assignments with submission tracking
7. **Attendance** - Student attendance records
8. **Grades** - Academic grades and performance metrics
9. **Exams** - Examination schedules and results
10. **Billing** - Financial records and payment tracking
11. **Announcements** - Campus-wide communications
12. **Expenses** - Personal expense tracking
13. **Notes** - Study notes and materials
14. **Community Posts** - Social features and discussions

### API Endpoints
- **Authentication**: User registration, login, password reset
- **User Management**: Profile management and settings
- **Academic Features**: Courses, assignments, grades, attendance
- **Administrative**: Student/teacher management, course planning
- **Financial**: Billing, payments, expense tracking
- **Communication**: Announcements, community posts
- **Study Tools**: Notes, calculators, wellness features

### Security Features
- Input validation and sanitization
- Password hashing with bcrypt
- JWT token-based authentication
- Role-based access control
- Rate limiting and CORS configuration
- Helmet.js for HTTP header security

### Performance Optimization
- Database indexing strategies
- API response caching
- Connection pooling
- Query optimization
- CDN integration for static assets

## 📁 Project Structure

The project follows a modular architecture with clear separation of concerns:

```
src/
├── components/          # Reusable UI components
│   ├── admin/          # Admin-specific components
│   ├── auth/           # Authentication components
│   ├── billing/        # Billing system components
│   ├── dashboard/      # Dashboard components
│   ├── ui/             # Base UI components (shadcn/ui)
│   └── ...
├── pages/              # Page components
├── routes/             # Route configurations
│   ├── admin/          # Admin routes
│   ├── student/        # Student routes
│   ├── teacher/        # Teacher routes
│   └── common/         # Shared routes
├── hooks/              # Custom React hooks
├── contexts/           # React context providers
├── types/              # TypeScript type definitions
├── lib/                # Utility functions
└── assets/             # Static assets
```

For detailed project structure, see [FOLDER_STRUCTURE.md](./FOLDER_STRUCTURE.md)

## 🔧 Development Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
```bash
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Build for production**
```bash
npm run build
```

## 📝 Development Guidelines

### Code Style
- Use TypeScript for all components
- Follow consistent naming conventions
- Keep components small and focused
- Use Tailwind utility classes for styling
- Implement proper error handling

### Component Architecture
- Prefer composition over inheritance
- Use custom hooks for complex logic
- Implement proper TypeScript interfaces
- Follow the established folder structure

### State Management
- React Context for global state
- Custom hooks for feature-specific logic
- Local state for component-specific data

## 🎨 Editing Your Application

### Using the Deployed Application (Recommended)
Simply visit [CampusSync](https://campus-sync-frontend-three.vercel.app/) to access the live application.

### Using Your Preferred IDE
You can clone this repo and push changes.

### GitHub Codespaces
- Navigate to the main page of your repository
- Click on the "Code" button → "Codespaces" tab
- Click "New codespace" to launch the development environment

## 🚀 Deployment

### Vercel Deployment
The application is deployed on Vercel and can be accessed at:
[https://campus-sync-seven.vercel.app/auth](https://campus-sync-frontend-three.vercel.app/)

### Custom Domain
To connect a custom domain:
1. Navigate to Project > Settings > Domains
2. Click Connect Domain
3. Follow the setup instructions

## 📊 Features in Detail

### Authentication System
- Multi-role authentication (Student/Teacher/Admin)
- Secure JWT-based sessions
- Role-based route protection
- Mobile-optimized login flow

### Academic Management
- Comprehensive timetable system
- Assignment tracking and submission
- Grade management and analytics
- Exam scheduling and management

### Financial Management
- Student billing and payments
- Teacher payroll management
- Expense tracking and analytics
- Financial reporting

### Communication
- Announcement system
- Community chat features
- Real-time notifications
- Media sharing capabilities

## 🤝 Contributing

Contributions to CampusSync are welcome! As the creator, Mausam Kar has built a solid foundation, and community contributions can help enhance the platform further.

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 🆘 Support

For questions or support:
- Review the project structure in [FOLDER_STRUCTURE.md](./FOLDER_STRUCTURE.md)
- Contact the creator: Mausam Kar
- Email: mausamkar@example.com
- GitHub: [mausamkar](https://github.com/mausamkar)