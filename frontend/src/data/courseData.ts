// Course data structure for branches, semesters, and courses

export interface Course {
  id: string;
  name: string;
  code: string;
  credits: number;
  description: string;
  instructor: string;
  schedule: string;
  location: string;
  prerequisites?: string[];
  type: 'core' | 'elective' | 'online' | 'extracurricular';
  category?: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration?: string;
  provider?: string;
  rating?: number;
  enrolled?: number;
  maxSeats?: number;
}

export interface Semester {
  id: number;
  name: string;
  courses: Course[];
}

export interface Branch {
  id: string;
  name: string;
  code: string;
  description: string;
  duration: string;
  semesters: Semester[];
}

export const branches: Branch[] = [
  {
    id: 'cse',
    name: 'Computer Science and Engineering',
    code: 'CSE',
    description: 'Learn programming, algorithms, software development, and computer systems',
    duration: '4 years',
    semesters: [
      {
        id: 1,
        name: 'Semester 1',
        courses: [
          {
            id: 'cse-101',
            name: 'Programming Fundamentals',
            code: 'CSE101',
            credits: 4,
            description: 'Introduction to programming concepts using C/C++',
            instructor: 'Dr. Sarah Johnson',
            schedule: 'Mon, Wed, Fri 9:00 AM - 10:00 AM',
            location: 'CS Building Room 101',
            type: 'core',
            difficulty: 'Beginner',
            enrolled: 45,
            maxSeats: 60
          },
          {
            id: 'math-101',
            name: 'Engineering Mathematics I',
            code: 'MATH101',
            credits: 4,
            description: 'Calculus, differential equations, and linear algebra',
            instructor: 'Prof. Michael Chen',
            schedule: 'Tue, Thu 10:00 AM - 11:30 AM',
            location: 'Math Building Room 205',
            type: 'core',
            difficulty: 'Intermediate',
            enrolled: 52,
            maxSeats: 60
          },
          {
            id: 'phy-101',
            name: 'Physics for Engineers',
            code: 'PHY101',
            credits: 3,
            description: 'Mechanics, thermodynamics, and electromagnetism',
            instructor: 'Dr. Emily Rodriguez',
            schedule: 'Mon, Wed 2:00 PM - 3:30 PM',
            location: 'Physics Lab 301',
            type: 'core',
            difficulty: 'Intermediate',
            enrolled: 38,
            maxSeats: 50
          },
          {
            id: 'eng-101',
            name: 'Technical Communication',
            code: 'ENG101',
            credits: 2,
            description: 'Written and oral communication skills for engineers',
            instructor: 'Prof. David Wilson',
            schedule: 'Fri 1:00 PM - 3:00 PM',
            location: 'Liberal Arts 102',
            type: 'core',
            difficulty: 'Beginner',
            enrolled: 40,
            maxSeats: 50
          }
        ]
      },
      {
        id: 2,
        name: 'Semester 2',
        courses: [
          {
            id: 'cse-102',
            name: 'Object Oriented Programming',
            code: 'CSE102',
            credits: 4,
            description: 'Object-oriented programming concepts using Java',
            instructor: 'Dr. Lisa Park',
            schedule: 'Mon, Wed, Fri 10:00 AM - 11:00 AM',
            location: 'CS Building Room 102',
            prerequisites: ['CSE101'],
            type: 'core',
            difficulty: 'Intermediate',
            enrolled: 42,
            maxSeats: 55
          },
          {
            id: 'cse-103',
            name: 'Data Structures',
            code: 'CSE103',
            credits: 4,
            description: 'Arrays, linked lists, stacks, queues, trees, and graphs',
            instructor: 'Prof. Kevin Zhang',
            schedule: 'Tue, Thu 11:00 AM - 12:30 PM',
            location: 'CS Building Room 201',
            prerequisites: ['CSE101'],
            type: 'core',
            difficulty: 'Intermediate',
            enrolled: 38,
            maxSeats: 50
          },
          {
            id: 'math-102',
            name: 'Engineering Mathematics II',
            code: 'MATH102',
            credits: 4,
            description: 'Advanced calculus and numerical methods',
            instructor: 'Dr. Robert Kim',
            schedule: 'Mon, Wed 1:00 PM - 2:30 PM',
            location: 'Math Building Room 210',
            prerequisites: ['MATH101'],
            type: 'core',
            difficulty: 'Advanced',
            enrolled: 35,
            maxSeats: 45
          }
        ]
      },
      {
        id: 3,
        name: 'Semester 3',
        courses: [
          {
            id: 'cse-201',
            name: 'Database Management Systems',
            code: 'CSE201',
            credits: 4,
            description: 'Database design, SQL, and database administration',
            instructor: 'Dr. Maria Gonzalez',
            schedule: 'Mon, Wed, Fri 9:00 AM - 10:00 AM',
            location: 'CS Building Room 301',
            prerequisites: ['CSE103'],
            type: 'core',
            difficulty: 'Intermediate',
            enrolled: 33,
            maxSeats: 40
          },
          {
            id: 'cse-202',
            name: 'Computer Networks',
            code: 'CSE202',
            credits: 3,
            description: 'Network protocols, architecture, and security',
            instructor: 'Prof. James Liu',
            schedule: 'Tue, Thu 2:00 PM - 3:30 PM',
            location: 'CS Building Room 302',
            prerequisites: ['CSE102'],
            type: 'core',
            difficulty: 'Advanced',
            enrolled: 28,
            maxSeats: 35
          }
        ]
      }
    ]
  },
  {
    id: 'ece',
    name: 'Electrical and Computer Engineering',
    code: 'ECE',
    description: 'Electronics, signal processing, and embedded systems',
    duration: '4 years',
    semesters: [
      {
        id: 1,
        name: 'Semester 1',
        courses: [
          {
            id: 'ece-101',
            name: 'Circuit Analysis',
            code: 'ECE101',
            credits: 4,
            description: 'Basic electrical circuits and analysis techniques',
            instructor: 'Dr. Jennifer Adams',
            schedule: 'Mon, Wed, Fri 8:00 AM - 9:00 AM',
            location: 'ECE Building Room 101',
            type: 'core',
            difficulty: 'Beginner',
            enrolled: 35,
            maxSeats: 45
          },
          {
            id: 'ece-102',
            name: 'Digital Logic Design',
            code: 'ECE102',
            credits: 3,
            description: 'Boolean algebra, logic gates, and digital circuits',
            instructor: 'Prof. Thomas Brown',
            schedule: 'Tue, Thu 10:00 AM - 11:30 AM',
            location: 'ECE Building Room 201',
            type: 'core',
            difficulty: 'Intermediate',
            enrolled: 40,
            maxSeats: 50
          }
        ]
      }
    ]
  },
  {
    id: 'me',
    name: 'Mechanical Engineering',
    code: 'ME',
    description: 'Design, manufacturing, and thermal systems',
    duration: '4 years',
    semesters: [
      {
        id: 1,
        name: 'Semester 1',
        courses: [
          {
            id: 'me-101',
            name: 'Engineering Graphics',
            code: 'ME101',
            credits: 3,
            description: 'Technical drawing and CAD fundamentals',
            instructor: 'Prof. Sandra Lee',
            schedule: 'Mon, Wed 1:00 PM - 3:00 PM',
            location: 'ME Building Room 101',
            type: 'core',
            difficulty: 'Beginner',
            enrolled: 30,
            maxSeats: 40
          }
        ]
      }
    ]
  }
];

export const onlineCourses: Course[] = [
  {
    id: 'online-1',
    name: 'Full Stack Web Development',
    code: 'WEB001',
    credits: 0,
    description: 'Complete web development bootcamp covering HTML, CSS, JavaScript, React, and Node.js',
    instructor: 'Coursera Instructors',
    schedule: 'Self-paced',
    location: 'Online',
    type: 'online',
    category: 'Web Development',
    difficulty: 'Intermediate',
    duration: '12 weeks',
    provider: 'Coursera',
    rating: 4.8,
    enrolled: 15420,
    maxSeats: 99999
  },
  {
    id: 'online-2',
    name: 'Machine Learning Specialization',
    code: 'ML001',
    credits: 0,
    description: 'Comprehensive machine learning course covering algorithms, neural networks, and deep learning',
    instructor: 'Andrew Ng',
    schedule: 'Self-paced',
    location: 'Online',
    type: 'online',
    category: 'Artificial Intelligence',
    difficulty: 'Advanced',
    duration: '16 weeks',
    provider: 'Coursera',
    rating: 4.9,
    enrolled: 25300,
    maxSeats: 99999
  },
  {
    id: 'online-3',
    name: 'Data Science with Python',
    code: 'DS001',
    credits: 0,
    description: 'Learn data analysis, visualization, and machine learning with Python',
    instructor: 'Udemy Instructors',
    schedule: 'Self-paced',
    location: 'Online',
    type: 'online',
    category: 'Data Science',
    difficulty: 'Intermediate',
    duration: '10 weeks',
    provider: 'Udemy',
    rating: 4.7,
    enrolled: 8200,
    maxSeats: 99999
  },
  {
    id: 'online-4',
    name: 'Digital Marketing Fundamentals',
    code: 'DM001',
    credits: 0,
    description: 'SEO, social media marketing, and digital advertising strategies',
    instructor: 'Google Experts',
    schedule: 'Self-paced',
    location: 'Online',
    type: 'online',
    category: 'Marketing',
    difficulty: 'Beginner',
    duration: '8 weeks',
    provider: 'Google Academy',
    rating: 4.6,
    enrolled: 12500,
    maxSeats: 99999
  }
];

export const extracurricularCourses: Course[] = [
  {
    id: 'extra-1',
    name: 'Photography Club Workshop',
    code: 'PHOTO001',
    credits: 0,
    description: 'Learn photography basics, composition, and digital editing',
    instructor: 'Club Mentors',
    schedule: 'Saturdays 2:00 PM - 4:00 PM',
    location: 'Art Building Studio 1',
    type: 'extracurricular',
    category: 'Arts',
    difficulty: 'Beginner',
    duration: '6 weeks',
    enrolled: 25,
    maxSeats: 30
  },
  {
    id: 'extra-2',
    name: 'Entrepreneurship Bootcamp',
    code: 'ENT001',
    credits: 0,
    description: 'Business planning, pitch development, and startup fundamentals',
    instructor: 'Industry Experts',
    schedule: 'Fridays 6:00 PM - 8:00 PM',
    location: 'Business Center Room 301',
    type: 'extracurricular',
    category: 'Business',
    difficulty: 'Intermediate',
    duration: '8 weeks',
    enrolled: 18,
    maxSeats: 25
  },
  {
    id: 'extra-3',
    name: 'Robotics Team Training',
    code: 'ROB001',
    credits: 0,
    description: 'Robot design, programming, and competition preparation',
    instructor: 'Dr. Alex Kumar',
    schedule: 'Weekends 10:00 AM - 2:00 PM',
    location: 'Engineering Lab 401',
    type: 'extracurricular',
    category: 'Technology',
    difficulty: 'Advanced',
    duration: '12 weeks',
    enrolled: 15,
    maxSeats: 20
  },
  {
    id: 'extra-4',
    name: 'Public Speaking Mastery',
    code: 'SPEAK001',
    credits: 0,
    description: 'Develop confidence and skills in public speaking and presentation',
    instructor: 'Communication Experts',
    schedule: 'Sundays 3:00 PM - 5:00 PM',
    location: 'Auditorium 2',
    type: 'extracurricular',
    category: 'Communication',
    difficulty: 'Beginner',
    duration: '4 weeks',
    enrolled: 20,
    maxSeats: 30
  }
];