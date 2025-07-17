// Mock data for the application
export type UserStatus = 'active' | 'pending' | 'blocked';
export type UserType = 'client' | 'caregiver';

export interface MockUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserType;
  status: UserStatus;
  createdAt: string;
  phone: string;
  city: string;
  country: string;
  tags?: string[];
}

export const mockUsers: MockUser[] = [
  {
    _id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    role: 'client',
    status: 'active',
    createdAt: '2024-01-15',
    phone: '+1234567890',
    city: 'New York',
    country: 'USA'
  },
  {
    _id: '2',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane@example.com',
    role: 'caregiver',
    status: 'active',
    createdAt: '2024-02-20',
    phone: '+1234567891',
    city: 'Los Angeles',
    country: 'USA'
  },
  {
    _id: '3',
    firstName: 'Mike',
    lastName: 'Johnson',
    email: 'mike@example.com',
    role: 'client',
    status: 'blocked',
    createdAt: '2024-03-10',
    phone: '+1234567892',
    city: 'Chicago',
    country: 'USA'
  },
  {
    _id: '4',
    firstName: 'Sarah',
    lastName: 'Wilson',
    email: 'sarah@example.com',
    role: 'caregiver',
    status: 'pending',
    createdAt: '2024-03-25',
    phone: '+1234567893',
    city: 'Miami',
    country: 'USA'
  },
  {
    _id: '5',
    firstName: 'David',
    lastName: 'Brown',
    email: 'david@example.com',
    role: 'caregiver',
    status: 'active',
    createdAt: '2024-04-05',
    phone: '+1234567894',
    city: 'Seattle',
    country: 'USA'
  }
];

export type ApplicationStatus = 'approved' | 'pending' | 'under_review' | 'rejected';

export interface MockApplication {
  _id: string;
  userId: string;
  status: ApplicationStatus;
  yearsExperience: number;
  preferredWorkLocation: string;
  specialties: string[];
  certifications: string[];
  createdAt: string;
  documentsVerified: boolean;
}

export const mockApplications: MockApplication[] = [
  {
    _id: '1',
    userId: '2',
    status: 'approved',
    yearsExperience: 5,
    preferredWorkLocation: 'Los Angeles',
    specialties: ['Elderly Care', 'Dementia Care'],
    certifications: ['CNA', 'CPR'],
    createdAt: '2024-02-20',
    documentsVerified: true
  },
  {
    _id: '2',
    userId: '4',
    status: 'pending',
    yearsExperience: 3,
    preferredWorkLocation: 'Miami',
    specialties: ['Personal Care', 'Companionship'],
    certifications: ['CNA'],
    createdAt: '2024-03-25',
    documentsVerified: false
  },
  {
    _id: '3',
    userId: '5',
    status: 'under_review',
    yearsExperience: 7,
    preferredWorkLocation: 'Seattle',
    specialties: ['Post-Surgery Care', 'Medication Management'],
    certifications: ['RN', 'CPR', 'First Aid'],
    createdAt: '2024-04-05',
    documentsVerified: true
  }
];

export const mockActivity = [
  {
    _id: '1',
    userId: '1',
    action: 'Login',
    timestamp: '2024-07-12T10:30:00Z',
    details: 'User logged in from New York'
  },
  {
    _id: '2',
    userId: '2',
    action: 'Profile Update',
    timestamp: '2024-07-12T09:15:00Z',
    details: 'Updated contact information'
  },
  {
    _id: '3',
    userId: '3',
    action: 'Booking Created',
    timestamp: '2024-07-11T16:45:00Z',
    details: 'Created new care booking'
  },
  {
    _id: '4',
    userId: '4',
    action: 'Application Submitted',
    timestamp: '2024-07-11T14:20:00Z',
    details: 'Submitted caregiver application'
  }
];

export const mockStats = {
  totalUsers: 5,
  activeUsers: 3,
  pendingApplications: 1,
  verifiedCaregivers: 2,
  monthlyGrowth: [
    { month: 'Jan', clients: 1, caregivers: 0 },
    { month: 'Feb', clients: 1, caregivers: 1 },
    { month: 'Mar', clients: 2, caregivers: 2 },
    { month: 'Apr', clients: 2, caregivers: 3 },
    { month: 'May', clients: 2, caregivers: 3 },
    { month: 'Jun', clients: 2, caregivers: 3 },
    { month: 'Jul', clients: 2, caregivers: 3 }
  ]
};

// Mock care recipients data
export interface MockCareRecipient {
  _id: string;
  name: string;
  age: number;
  location: string;
  careNeeds: string[];
  medicalConditions: string[];
  emergencyContactName: string;
  emergencyContactPhone: string;
  specialRequirements?: string;
  mobilityLevel: string;
  preferredLanguage: string;
  createdAt: string;
}

export const mockCareRecipients: MockCareRecipient[] = [
  {
    _id: "1",
    name: "Eleanor Doe",
    age: 82,
    location: "New York, NY",
    careNeeds: ["Personal Care", "Medication Management", "Companionship"],
    medicalConditions: ["Diabetes", "Mild Dementia"],
    emergencyContactName: "John Doe",
    emergencyContactPhone: "+1234567890",
    specialRequirements: "Prefers female caregivers, needs help with evening medications",
    mobilityLevel: "Limited - Wheelchair",
    preferredLanguage: "English",
    createdAt: "2024-01-15"
  },
  {
    _id: "2",
    name: "Robert Johnson",
    age: 75,
    location: "New York, NY",
    careNeeds: ["Meal Preparation", "Light Housekeeping", "Transportation"],
    medicalConditions: ["Heart Condition", "Arthritis"],
    emergencyContactName: "Mary Johnson",
    emergencyContactPhone: "+1234567891",
    specialRequirements: "Needs low-sodium diet, enjoys crossword puzzles",
    mobilityLevel: "Good - Uses Walker",
    preferredLanguage: "English",
    createdAt: "2024-02-20"
  }
];

// Mock data for caregiver jobs
export const mockCaregiverJobs = [
  {
    _id: "job-001",
    clientName: "Margaret Thompson",
    location: "Downtown, NY",
    schedule: "Mon-Fri, 9 AM - 5 PM",
    duration: "8 hours/day",
    rate: 25,
    status: "active",
    careRequirements: ["Medication Management", "Mobility Assistance", "Companionship"],
  },
  {
    _id: "job-002",
    clientName: "Robert Wilson",
    location: "Brooklyn, NY",
    schedule: "Weekends, 10 AM - 6 PM",
    duration: "8 hours/day",
    rate: 28,
    status: "upcoming",
    careRequirements: ["Personal Care", "Meal Preparation", "Light Housekeeping"],
  },
];

// Mock data for caregiver complaints
export const mockCaregiverComplaints: any[] = [];

// Mock data for caregiver stats
export const mockCaregiverStats = {
  activeJobs: 2,
  hoursThisWeek: 32,
  rating: 4.8,
  totalReviews: 47,
  earningsThisMonth: 2840,
};

// Mock gallery images data
export interface MockGalleryImage {
  _id: string;
  src: string;
  alt: string;
  caption: string;
  category: string;
  uploadDate: string;
  isActive: boolean;
}

export const mockGalleryImages: MockGalleryImage[] = [
  {
    _id: "1",
    src: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=400&fit=crop",
    alt: "Caregiver assisting elderly woman with a walker",
    caption: "Providing mobility support with a caring touch",
    category: "caregiving",
    uploadDate: "2024-01-15",
    isActive: true,
  },
  {
    _id: "2",
    src: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=400&fit=crop",
    alt: "Caregiver and elderly man playing a board game",
    caption: "Engaging in stimulating activities and companionship",
    category: "activities",
    uploadDate: "2024-02-10",
    isActive: true,
  },
  {
    _id: "3",
    src: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&h=400&fit=crop",
    alt: "Caregiver preparing a healthy meal for a client",
    caption: "Nutritious and delicious meals, prepared with care",
    category: "caregiving",
    uploadDate: "2024-02-20",
    isActive: true,
  },
  {
    _id: "4",
    src: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=600&h=400&fit=crop",
    alt: "Caregiver reading a book to an elderly woman",
    caption: "Sharing stories and moments of connection",
    category: "activities",
    uploadDate: "2024-03-05",
    isActive: true,
  },
  {
    _id: "5",
    src: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=600&h=400&fit=crop",
    alt: "Modern care facility interior",
    caption: "Comfortable and safe living spaces",
    category: "facilities",
    uploadDate: "2024-03-15",
    isActive: true,
  },
  {
    _id: "6",
    src: "https://images.unsplash.com/photo-1485833077593-4278bba3f11f?w=600&h=400&fit=crop",
    alt: "Professional care team",
    caption: "Our dedicated and trained care professionals",
    category: "staff",
    uploadDate: "2024-04-01",
    isActive: false,
  },
  {
    _id: "7",
    src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop",
    alt: "Elderly woman exercising with assistance",
    caption: "Promoting active and healthy lifestyles",
    category: "activities",
    uploadDate: "2024-04-10",
    isActive: true,
  },
  {
    _id: "8",
    src: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=600&h=400&fit=crop",
    alt: "Comfortable bedroom in care facility",
    caption: "Private, comfortable accommodation",
    category: "facilities",
    uploadDate: "2024-04-20",
    isActive: true,
  },
];

// Mock data for client workflow
export interface MockClientWorkflowStep {
  _id: string;
  titleKey: string;
  descriptionKey: string;
  icon: string;
}

export const mockClientWorkflow: MockClientWorkflowStep[] = [
  {
    _id: 'step1',
    titleKey: 'clientDashboard.workflow.step1.title',
    descriptionKey: 'clientDashboard.workflow.step1.description',
    icon: 'Search',
  },
  {
    _id: 'step2',
    titleKey: 'clientDashboard.workflow.step2.title',
    descriptionKey: 'clientDashboard.workflow.step2.description',
    icon: 'FileText',
  },
  {
    _id: 'step3',
    titleKey: 'clientDashboard.workflow.step3.title',
    descriptionKey: 'clientDashboard.workflow.step3.description',
    icon: 'Users',
  },
  {
    _id: 'step4',
    titleKey: 'clientDashboard.workflow.step4.title',
    descriptionKey: 'clientDashboard.workflow.step4.description',
    icon: 'CheckCircle2',
  },
];

// In a real app, you'd have logic to determine the current step for a user
export const mockCurrentUserWorkflowStatus = {
  userId: '1', // Corresponds to mockUsers
  currentStepId: 'step3',
};