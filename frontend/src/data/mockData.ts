// Mock data for the application
export type UserStatus = 'active' | 'pending' | 'blocked';
export type UserType = 'client' | 'caregiver';

export interface MockUser {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  user_type: UserType;
  status: UserStatus;
  created_at: string;
  phone: string;
  city: string;
  country: string;
  tags?: string[];
}

export const mockUsers: MockUser[] = [
  {
    id: '1',
    first_name: 'John',
    last_name: 'Doe',
    email: 'john@example.com',
    user_type: 'client',
    status: 'active',
    created_at: '2024-01-15',
    phone: '+1234567890',
    city: 'New York',
    country: 'USA'
  },
  {
    id: '2',
    first_name: 'Jane',
    last_name: 'Smith',
    email: 'jane@example.com',
    user_type: 'caregiver',
    status: 'active',
    created_at: '2024-02-20',
    phone: '+1234567891',
    city: 'Los Angeles',
    country: 'USA'
  },
  {
    id: '3',
    first_name: 'Mike',
    last_name: 'Johnson',
    email: 'mike@example.com',
    user_type: 'client',
    status: 'blocked',
    created_at: '2024-03-10',
    phone: '+1234567892',
    city: 'Chicago',
    country: 'USA'
  },
  {
    id: '4',
    first_name: 'Sarah',
    last_name: 'Wilson',
    email: 'sarah@example.com',
    user_type: 'caregiver',
    status: 'pending',
    created_at: '2024-03-25',
    phone: '+1234567893',
    city: 'Miami',
    country: 'USA'
  },
  {
    id: '5',
    first_name: 'David',
    last_name: 'Brown',
    email: 'david@example.com',
    user_type: 'caregiver',
    status: 'active',
    created_at: '2024-04-05',
    phone: '+1234567894',
    city: 'Seattle',
    country: 'USA'
  }
];

export type ApplicationStatus = 'approved' | 'pending' | 'under_review' | 'rejected';

export interface MockApplication {
  id: string;
  user_id: string;
  status: ApplicationStatus;
  years_experience: number;
  preferred_work_location: string;
  specialties: string[];
  certifications: string[];
  created_at: string;
  documents_verified: boolean;
}

export const mockApplications: MockApplication[] = [
  {
    id: '1',
    user_id: '2',
    status: 'approved',
    years_experience: 5,
    preferred_work_location: 'Los Angeles',
    specialties: ['Elderly Care', 'Dementia Care'],
    certifications: ['CNA', 'CPR'],
    created_at: '2024-02-20',
    documents_verified: true
  },
  {
    id: '2',
    user_id: '4',
    status: 'pending',
    years_experience: 3,
    preferred_work_location: 'Miami',
    specialties: ['Personal Care', 'Companionship'],
    certifications: ['CNA'],
    created_at: '2024-03-25',
    documents_verified: false
  },
  {
    id: '3',
    user_id: '5',
    status: 'under_review',
    years_experience: 7,
    preferred_work_location: 'Seattle',
    specialties: ['Post-Surgery Care', 'Medication Management'],
    certifications: ['RN', 'CPR', 'First Aid'],
    created_at: '2024-04-05',
    documents_verified: true
  }
];

export const mockActivity = [
  {
    id: '1',
    user_id: '1',
    action: 'Login',
    timestamp: '2024-07-12T10:30:00Z',
    details: 'User logged in from New York'
  },
  {
    id: '2',
    user_id: '2',
    action: 'Profile Update',
    timestamp: '2024-07-12T09:15:00Z',
    details: 'Updated contact information'
  },
  {
    id: '3',
    user_id: '3',
    action: 'Booking Created',
    timestamp: '2024-07-11T16:45:00Z',
    details: 'Created new care booking'
  },
  {
    id: '4',
    user_id: '4',
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
  id: string;
  name: string;
  age: number;
  location: string;
  care_needs: string[];
  medical_conditions: string[];
  emergency_contact_name: string;
  emergency_contact_phone: string;
  special_requirements?: string;
  mobility_level: string;
  preferred_language: string;
  created_at: string;
}

export const mockCareRecipients: MockCareRecipient[] = [
  {
    id: "1",
    name: "Eleanor Doe",
    age: 82,
    location: "New York, NY",
    care_needs: ["Personal Care", "Medication Management", "Companionship"],
    medical_conditions: ["Diabetes", "Mild Dementia"],
    emergency_contact_name: "John Doe",
    emergency_contact_phone: "+1234567890",
    special_requirements: "Prefers female caregivers, needs help with evening medications",
    mobility_level: "Limited - Wheelchair",
    preferred_language: "English",
    created_at: "2024-01-15"
  },
  {
    id: "2",
    name: "Robert Johnson",
    age: 75,
    location: "New York, NY",
    care_needs: ["Meal Preparation", "Light Housekeeping", "Transportation"],
    medical_conditions: ["Heart Condition", "Arthritis"],
    emergency_contact_name: "Mary Johnson",
    emergency_contact_phone: "+1234567891",
    special_requirements: "Needs low-sodium diet, enjoys crossword puzzles",
    mobility_level: "Good - Uses Walker",
    preferred_language: "English",
    created_at: "2024-02-20"
  }
];

// Mock data for caregiver jobs
export const mockCaregiverJobs = [
  {
    id: "job-001",
    clientName: "Margaret Thompson",
    location: "Downtown, NY",
    schedule: "Mon-Fri, 9 AM - 5 PM",
    duration: "8 hours/day",
    rate: 25,
    status: "active",
    careRequirements: ["Medication Management", "Mobility Assistance", "Companionship"],
  },
  {
    id: "job-002",
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
  id: string;
  src: string;
  alt: string;
  caption: string;
  category: string;
  uploadDate: string;
  isActive: boolean;
}

export const mockGalleryImages: MockGalleryImage[] = [
  {
    id: "1",
    src: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=400&fit=crop",
    alt: "Caregiver assisting elderly woman with a walker",
    caption: "Providing mobility support with a caring touch",
    category: "caregiving",
    uploadDate: "2024-01-15",
    isActive: true,
  },
  {
    id: "2",
    src: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=400&fit=crop",
    alt: "Caregiver and elderly man playing a board game",
    caption: "Engaging in stimulating activities and companionship",
    category: "activities",
    uploadDate: "2024-02-10",
    isActive: true,
  },
  {
    id: "3",
    src: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&h=400&fit=crop",
    alt: "Caregiver preparing a healthy meal for a client",
    caption: "Nutritious and delicious meals, prepared with care",
    category: "caregiving",
    uploadDate: "2024-02-20",
    isActive: true,
  },
  {
    id: "4",
    src: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=600&h=400&fit=crop",
    alt: "Caregiver reading a book to an elderly woman",
    caption: "Sharing stories and moments of connection",
    category: "activities",
    uploadDate: "2024-03-05",
    isActive: true,
  },
  {
    id: "5",
    src: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=600&h=400&fit=crop",
    alt: "Modern care facility interior",
    caption: "Comfortable and safe living spaces",
    category: "facilities",
    uploadDate: "2024-03-15",
    isActive: true,
  },
  {
    id: "6",
    src: "https://images.unsplash.com/photo-1485833077593-4278bba3f11f?w=600&h=400&fit=crop",
    alt: "Professional care team",
    caption: "Our dedicated and trained care professionals",
    category: "staff",
    uploadDate: "2024-04-01",
    isActive: false,
  },
  {
    id: "7",
    src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop",
    alt: "Elderly woman exercising with assistance",
    caption: "Promoting active and healthy lifestyles",
    category: "activities",
    uploadDate: "2024-04-10",
    isActive: true,
  },
  {
    id: "8",
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
  id: string;
  titleKey: string;
  descriptionKey: string;
  icon: string;
}

export const mockClientWorkflow: MockClientWorkflowStep[] = [
  {
    id: 'step1',
    titleKey: 'clientDashboard.workflow.step1.title',
    descriptionKey: 'clientDashboard.workflow.step1.description',
    icon: 'Search',
  },
  {
    id: 'step2',
    titleKey: 'clientDashboard.workflow.step2.title',
    descriptionKey: 'clientDashboard.workflow.step2.description',
    icon: 'FileText',
  },
  {
    id: 'step3',
    titleKey: 'clientDashboard.workflow.step3.title',
    descriptionKey: 'clientDashboard.workflow.step3.description',
    icon: 'Users',
  },
  {
    id: 'step4',
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