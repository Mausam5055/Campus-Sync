# CampusSync - System Architecture

## 📋 Overview

This document provides a comprehensive overview of the CampusSync architecture, including system diagrams, component relationships, and data flow patterns. CampusSync is a panel-based educational management platform with distinct interfaces for administrators, teachers, and students.

## 🏗️ High-Level Architecture

### System Components Diagram

```mermaid
graph TD
    A[Client Applications] --> B[Frontend Layer]
    B --> C[API Layer]
    C --> D[Database Layer]
    C --> E[External Services]
    
    subgraph Client Applications
        A1[Web Browser]
        A2[Mobile Web]
        A3[Desktop App]
    end
    
    subgraph Frontend Layer
        B1[React/Vite App]
    end
    
    subgraph API Layer
        C1[Supabase Backend]
        C2[n8n Workflows]
    end
    
    subgraph Database Layer
        D1[MongoDB]
        D2[Redis Cache]
    end
    
    subgraph External Services
        E1[Email Services]
        E2[SMS Services]
        E3[Cloud Storage]
        E4[Payment Gateways]
    end
```

### Panel-Based System Architecture

```mermaid
graph TD
    A[CampusSync Platform] --> B[Admin Panel]
    A --> C[Teacher Panel]
    A --> D[Student Panel]
    A --> E[Shared Services]
    
    subgraph Admin Panel
        B1[Dashboard]
        B2[User Management]
        B3[Course Planning]
        B4[Billing]
        B5[Reports]
    end
    
    subgraph Teacher Panel
        C1[Dashboard]
        C2[Class Management]
        C3[Assignments]
        C4[Grades]
        C5[Attendance]
    end
    
    subgraph Student Panel
        D1[Dashboard]
        D2[Courses]
        D3[Assignments]
        D4[Grades]
        D5[Attendance]
    end
    
    subgraph Shared Services
        E1[Authentication]
        E2[Notifications]
        E3[File Storage]
        E4[Data Access]
    end
```

## 🎨 Frontend Architecture

### Component Hierarchy

```mermaid
graph TD
    A[App.tsx] --> B[Providers]
    B --> C[Router]
    C --> D[Layout Components]
    D --> E[Page Components]
    E --> F[Feature Components]
    
    subgraph Providers
        B1[ThemeProvider]
        B2[AuthProvider]
        B3[QueryClientProvider]
    end
    
    subgraph Router
        C1[AppRoutes]
        C2[ProtectedRoutes]
        C3[RoleRoutes]
    end
    
    subgraph Layout Components
        D1[AppLayout]
        D2[Sidebar]
        D3[Header]
    end
    
    subgraph Page Components
        E1[Dashboard Pages]
        E2[Management Pages]
        E3[Profile Pages]
    end
    
    subgraph Feature Components
        F1[UI Components]
        F2[Form Components]
        F3[Data Display]
    end
```

### State Management Flow

```mermaid
graph LR
    A[User Action] --> B[Component]
    B --> C[State Update]
    C --> D[Context/API]
    D --> E[Service Layer]
    E --> F[Supabase]
    F --> G[Database]
    G --> H[Response]
    H --> I[UI Update]
```

## ⚙️ Backend Architecture

### API Layer Structure

```mermaid
graph TD
    A[API Gateway] --> B[Authentication]
    A --> C[Validation]
    A --> D[Controllers]
    D --> E[Services]
    E --> F[Models]
    F --> G[Database]
    
    subgraph Middleware
        B
        C
    end
    
    subgraph Business Logic
        D
        E
        F
    end
    
    subgraph Data Layer
        G
    end
```

### Data Flow Pattern

```mermaid
graph LR
    A[Client Request] --> B[Middleware]
    B --> C[Controller]
    C --> D[Service]
    D --> E[Model]
    E --> F[Database]
    F --> G[Response]
    G --> H[Client]
```

## 🗃️ Database Design Overview

### Core Entity Relationships

```mermaid
erDiagram
    USERS ||--o{ STUDENTS : has
    USERS ||--o{ TEACHERS : has
    USERS ||--o{ ADMINS : has
    STUDENTS ||--o{ ENROLLMENTS : "course enrollment"
    TEACHERS ||--o{ COURSES : teaches
    COURSES ||--o{ ASSIGNMENTS : contains
    COURSES ||--o{ EXAMS : contains
    STUDENTS ||--o{ ATTENDANCE : records
    STUDENTS ||--o{ GRADES : receives
    USERS ||--o{ BILLING : "payment records"
    USERS ||--o{ ANNOUNCEMENTS : "receives"
    
    USERS {
        string id
        string fullName
        string email
        string role
        datetime createdAt
    }
    
    STUDENTS {
        string id
        string userId
        string studentId
        datetime enrollmentDate
    }
    
    TEACHERS {
        string id
        string userId
        string employeeId
        string department
    }
    
    ADMINS {
        string id
        string userId
        string employeeId
        string department
    }
    
    COURSES {
        string id
        string code
        string name
        string instructorId
    }
    
    ASSIGNMENTS {
        string id
        string title
        string courseId
        datetime dueDate
    }
    
    EXAMS {
        string id
        string title
        string courseId
        datetime date
    }
```

## 🔧 Workflow Automation (n8n)

### Automation Architecture

```mermaid
graph TD
    A[CampusSync Events] --> B[n8n Workflows]
    B --> C[External Services]
    C --> D[Communication Channels]
    D --> E[Users]
    
    subgraph Event Sources
        A1[User Actions]
        A2[System Events]
        A3[Scheduled Triggers]
    end
    
    subgraph Workflow Engine
        B1[Admin Workflows]
        B2[Teacher Workflows]
        B3[Student Workflows]
    end
    
    subgraph External Integrations
        C1[Email Services]
        C2[SMS Services]
        C3[Cloud Services]
    end
    
    subgraph Communication
        D1[Email Notifications]
        D2[SMS Alerts]
        D3[Push Notifications]
    end
```

## 🔄 Data Flow Patterns

### Authentication Flow

```mermaid
sequenceDiagram
    participant U as User
    participant F as Frontend
    participant B as Backend
    participant D as Database
    
    U->>F: Enter credentials
    F->>B: Submit auth request
    B->>D: Validate credentials
    D-->>B: User data
    B-->>F: JWT tokens
    F->>U: Redirect to dashboard
```

### Assignment Submission Flow

```mermaid
sequenceDiagram
    participant S as Student
    participant F as Frontend
    participant B as Backend
    participant D as Database
    participant T as Teacher
    
    S->>F: Submit assignment
    F->>B: Upload file + metadata
    B->>D: Store assignment data
    D-->>B: Confirmation
    B-->>F: Success response
    F->>S: Show confirmation
    B->>T: Notification (async)
```

## 📐 Folder Structure Overview

### Project Organization

```mermaid
graph TD
    A[CampusSync] --> B[src]
    A --> C[public]
    A --> D[Documentations]
    A --> E[supabase]
    
    B --> F[components]
    B --> G[pages]
    B --> H[routes]
    B --> I[contexts]
    B --> J[types]
    
    F --> K[admin]
    F --> L[teacher]
    F --> M[student]
    F --> N[shared]
    
    G --> O[admin]
    G --> P[teacher]
    G --> Q[student]
    G --> R[shared]
```

## 🌐 Deployment Architecture

### Cloud Infrastructure

```mermaid
graph TD
    A[Users] --> B[Load Balancer]
    B --> C[Vercel - Frontend]
    B --> D[Supabase - Backend]
    D --> E[Database]
    D --> F[Edge Functions]
    D --> G[Authentication]
    
    subgraph Cloud Provider
        B
        C
        D
        E
        F
        G
    end
    
    subgraph External Services
        H[Email Services]
        I[SMS Services]
        J[Storage]
    end
    
    D --> H
    D --> I
    D --> J
```

## 🔐 Security Architecture

### Authentication & Authorization

```mermaid
graph TD
    A[User Request] --> B[JWT Validation]
    B --> C[Role Check]
    C --> D[Permission Check]
    D --> E[Resource Access]
    
    subgraph Auth Layer
        B
        C
        D
    end
    
    subgraph Access Control
        E
    end
```

## 📊 Monitoring & Analytics

### System Monitoring Flow

```mermaid
graph TD
    A[Application] --> B[Logging]
    A --> C[Metrics Collection]
    B --> D[Log Storage]
    C --> E[Analytics Engine]
    D --> F[Monitoring Dashboard]
    E --> F
    
    subgraph Data Collection
        B
        C
    end
    
    subgraph Storage
        D
        E
    end
    
    subgraph Visualization
        F
    end
```

## 🚀 Future Architecture Enhancements

### Microservices Evolution

```mermaid
graph TD
    A[Monolithic App] --> B[Service Decomposition]
    B --> C[Auth Service]
    B --> D[Course Service]
    B --> E[Billing Service]
    B --> F[Communication Service]
    
    subgraph Current State
        A
    end
    
    subgraph Future State
        B
        C
        D
        E
        F
    end
```

## 📈 Performance Optimization

### Caching Strategy

```mermaid
graph TD
    A[User Request] --> B[Cache Check]
    B -->|Hit| C[Return Cached Data]
    B -->|Miss| D[Database Query]
    D --> E[Cache Result]
    E --> F[Return Data]
    C --> G[Response]
    F --> G
    
    subgraph Caching Layer
        B
        C
        E
    end
    
    subgraph Data Layer
        D
    end
```

## 🧪 Testing Architecture

### Test Pyramid Implementation

```mermaid
graph TD
    A[Test Pyramid] --> B[Unit Tests]
    A --> C[Integration Tests]
    A --> D[E2E Tests]
    
    B --> E[Component Tests]
    B --> F[Hook Tests]
    B --> G[Utility Tests]
    
    C --> H[API Tests]
    C --> I[Workflow Tests]
    
    D --> J[User Flow Tests]
    D --> K[Cross-Browser Tests]
    
    subgraph Unit Level
        E
        F
        G
    end
    
    subgraph Integration Level
        H
        I
    end
    
    subgraph E2E Level
        J
        K
    end
```

## 📚 Technology Stack Summary

### Frontend Stack
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Routing**: React Router v6
- **State Management**: React Context + Custom Hooks
- **UI Components**: shadcn/ui + Radix UI
- **Styling**: Tailwind CSS
- **Data Fetching**: React Query (TanStack Query)
- **Form Handling**: React Hook Form + Zod
- **Charts**: Recharts
- **Icons**: Lucide React

### Backend Stack
- **Platform**: Supabase (Backend as a Service)
- **Database**: PostgreSQL (via Supabase)
- **Authentication**: Supabase Auth
- **API**: Supabase REST + GraphQL
- **Realtime**: Supabase Realtime
- **Storage**: Supabase Storage
- **Functions**: Supabase Edge Functions

### Automation & Integration
- **Workflow Engine**: n8n
- **Email Services**: SendGrid, Amazon SES
- **SMS Services**: Twilio, Vonage
- **Cloud Storage**: Multiple providers
- **Payment Processing**: Stripe, PayPal

### Development & Deployment
- **Version Control**: Git
- **CI/CD**: GitHub Actions
- **Hosting**: Vercel (Frontend), Supabase (Backend)
- **Monitoring**: Supabase Analytics
- **Testing**: Jest, React Testing Library
- **Code Quality**: ESLint, Prettier

---

*This architecture document provides a comprehensive overview of the CampusSync system design, from high-level components to detailed implementation patterns. It serves as a reference for understanding how different parts of the system interact and can guide future development and scaling efforts.*