
import React, { useState } from 'react';
import { ArrowLeft, ShoppingCart, Star, Plus, Eye, Search, User, Filter, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MarketplaceCard } from '@/components/marketplace/MarketplaceCard';
import { MarketplaceItemModal } from '@/components/marketplace/MarketplaceItemModal';
import { CartDrawer } from '@/components/marketplace/CartDrawer';
import { FavoritesDrawer } from '@/components/marketplace/FavoritesDrawer';
import { CategorySection } from '@/components/marketplace/CategorySection';
import { FilterBar, FilterOption } from '@/components/marketplace/FilterBar';
import { StripeCheckoutModal } from '@/components/marketplace/StripeCheckoutModal';
import { PaymentSuccessModal } from '@/components/marketplace/PaymentSuccessModal';
import { RoleGroupCard } from '@/components/marketplace/RoleGroupCard';
import { FullPageCart } from '@/components/marketplace/FullPageCart';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

export interface MarketplaceItem {
  id: string;
  name: string;
  description: string;
  category: 'capabilities' | 'solutions' | 'teams' | 'individuals';
  type: 'product' | 'service';
  price: number;
  rating: number;
  reviewCount: number;
  tags: string[];
  image?: string;
  featured?: boolean;
  level?: 'Junior' | 'Mid' | 'Senior' | 'Lead'; // Added for individuals
  role?: string; // Added for role grouping
}

// Expanded mock data with 12-20 items per category
const mockData: MarketplaceItem[] = [
  // Capabilities (15 items)
  {
    id: '1',
    name: 'GPT-4 Integration',
    description: 'Advanced AI language model integration for your solutions with comprehensive API access and custom fine-tuning capabilities',
    category: 'capabilities',
    type: 'product',
    price: 29.99,
    rating: 4.8,
    reviewCount: 142,
    tags: ['AI Model', 'Language Processing', 'API'],
    featured: true,
  },
  {
    id: '5',
    name: 'Data Analytics Dashboard',
    description: 'Real-time analytics and reporting dashboard with custom visualizations and automated insights',
    category: 'capabilities',
    type: 'product',
    price: 49.99,
    rating: 4.5,
    reviewCount: 156,
    tags: ['Analytics', 'Dashboard', 'Real-time', 'Visualization'],
  },
  {
    id: 'c1',
    name: 'Computer Vision API',
    description: 'Advanced image and video analysis with object detection, facial recognition, and scene understanding',
    category: 'capabilities',
    type: 'product',
    price: 39.99,
    rating: 4.7,
    reviewCount: 203,
    tags: ['Computer Vision', 'Image Analysis', 'AI'],
  },
  {
    id: 'c2',
    name: 'Natural Language Processing',
    description: 'Comprehensive NLP toolkit for sentiment analysis, entity extraction, and text classification',
    category: 'capabilities',
    type: 'product',
    price: 34.99,
    rating: 4.6,
    reviewCount: 189,
    tags: ['NLP', 'Text Analysis', 'Sentiment'],
  },
  {
    id: 'c3',
    name: 'Speech Recognition Engine',
    description: 'High-accuracy speech-to-text conversion with multi-language support and custom vocabulary',
    category: 'capabilities',
    type: 'product',
    price: 44.99,
    rating: 4.4,
    reviewCount: 167,
    tags: ['Speech', 'Voice Recognition', 'Audio'],
  },
  {
    id: 'c4',
    name: 'Predictive Analytics',
    description: 'Machine learning models for forecasting and trend analysis with automated feature engineering',
    category: 'capabilities',
    type: 'product',
    price: 59.99,
    rating: 4.8,
    reviewCount: 134,
    tags: ['ML', 'Forecasting', 'Predictive'],
  },
  {
    id: 'c5',
    name: 'Document Processing AI',
    description: 'Intelligent document parsing, OCR, and data extraction for various file formats',
    category: 'capabilities',
    type: 'product',
    price: 37.99,
    rating: 4.5,
    reviewCount: 198,
    tags: ['OCR', 'Document', 'Extraction'],
  },
  {
    id: 'c6',
    name: 'Recommendation Engine',
    description: 'Personalized recommendation system with collaborative and content-based filtering',
    category: 'capabilities',
    type: 'product',
    price: 52.99,
    rating: 4.7,
    reviewCount: 176,
    tags: ['Recommendations', 'Personalization', 'ML'],
  },
  {
    id: 'c7',
    name: 'Fraud Detection System',
    description: 'Real-time fraud detection with anomaly detection and risk scoring algorithms',
    category: 'capabilities',
    type: 'product',
    price: 67.99,
    rating: 4.9,
    reviewCount: 112,
    tags: ['Security', 'Fraud Detection', 'Risk'],
  },
  {
    id: 'c8',
    name: 'Chatbot Framework',
    description: 'Advanced conversational AI framework with intent recognition and context management',
    category: 'capabilities',
    type: 'product',
    price: 42.99,
    rating: 4.6,
    reviewCount: 221,
    tags: ['Chatbot', 'Conversational AI', 'NLP'],
  },
  {
    id: 'c9',
    name: 'Time Series Forecasting',
    description: 'Advanced time series analysis and forecasting with seasonal decomposition',
    category: 'capabilities',
    type: 'product',
    price: 48.99,
    rating: 4.4,
    reviewCount: 145,
    tags: ['Time Series', 'Forecasting', 'Analytics'],
  },
  {
    id: 'c10',
    name: 'Image Generation AI',
    description: 'State-of-the-art image generation and editing with style transfer capabilities',
    category: 'capabilities',
    type: 'product',
    price: 55.99,
    rating: 4.8,
    reviewCount: 187,
    tags: ['Image Generation', 'AI Art', 'Creative'],
  },
  {
    id: 'c11',
    name: 'Video Analytics',
    description: 'Real-time video processing with motion detection and behavior analysis',
    category: 'capabilities',
    type: 'product',
    price: 62.99,
    rating: 4.5,
    reviewCount: 158,
    tags: ['Video', 'Analytics', 'Computer Vision'],
  },
  {
    id: 'c12',
    name: 'Audio Processing Suite',
    description: 'Comprehensive audio analysis including music recognition and sound classification',
    category: 'capabilities',
    type: 'product',
    price: 41.99,
    rating: 4.3,
    reviewCount: 129,
    tags: ['Audio', 'Music', 'Classification'],
  },
  {
    id: 'c13',
    name: 'Blockchain Analytics',
    description: 'Cryptocurrency and blockchain transaction analysis with pattern detection',
    category: 'capabilities',
    type: 'product',
    price: 73.99,
    rating: 4.6,
    reviewCount: 94,
    tags: ['Blockchain', 'Crypto', 'Analytics'],
  },

  // Solutions (18 items)
  {
    id: '2',
    name: 'E-commerce Solution',
    description: 'Complete e-commerce platform with payment integration, inventory management, and customer analytics',
    category: 'solutions',
    type: 'product',
    price: 99.99,
    rating: 4.6,
    reviewCount: 89,
    tags: ['E-commerce', 'Payments', 'Catalog', 'Analytics'],
  },
  {
    id: 's1',
    name: 'CRM Platform',
    description: 'Customer relationship management with automated workflows and lead scoring',
    category: 'solutions',
    type: 'product',
    price: 87.99,
    rating: 4.7,
    reviewCount: 156,
    tags: ['CRM', 'Sales', 'Automation', 'Leads'],
  },
  {
    id: 's2',
    name: 'Learning Management System',
    description: 'Complete LMS with course creation, student tracking, and assessment tools',
    category: 'solutions',
    type: 'product',
    price: 76.99,
    rating: 4.5,
    reviewCount: 203,
    tags: ['Education', 'LMS', 'Courses', 'Assessment'],
  },
  {
    id: 's3',
    name: 'Project Management Suite',
    description: 'Comprehensive project management with team collaboration and resource planning',
    category: 'solutions',
    type: 'product',
    price: 64.99,
    rating: 4.8,
    reviewCount: 178,
    tags: ['Project Management', 'Collaboration', 'Planning'],
  },
  {
    id: 's4',
    name: 'HR Management System',
    description: 'Complete HR solution with recruitment, performance management, and payroll',
    category: 'solutions',
    type: 'product',
    price: 89.99,
    rating: 4.4,
    reviewCount: 134,
    tags: ['HR', 'Recruitment', 'Payroll', 'Performance'],
  },
  {
    id: 's5',
    name: 'Inventory Management',
    description: 'Advanced inventory tracking with demand forecasting and supplier management',
    category: 'solutions',
    type: 'product',
    price: 54.99,
    rating: 4.6,
    reviewCount: 167,
    tags: ['Inventory', 'Supply Chain', 'Forecasting'],
  },
  {
    id: 's6',
    name: 'Marketing Automation',
    description: 'Multi-channel marketing automation with lead nurturing and campaign analytics',
    category: 'solutions',
    type: 'product',
    price: 78.99,
    rating: 4.7,
    reviewCount: 145,
    tags: ['Marketing', 'Automation', 'Campaigns', 'Analytics'],
  },
  {
    id: 's7',
    name: 'Financial Dashboard',
    description: 'Real-time financial reporting with budgeting and expense tracking capabilities',
    category: 'solutions',
    type: 'product',
    price: 67.99,
    rating: 4.5,
    reviewCount: 189,
    tags: ['Finance', 'Reporting', 'Budgeting', 'Expenses'],
  },
  {
    id: 's8',
    name: 'Content Management System',
    description: 'Flexible CMS with multi-site support, SEO optimization, and media management',
    category: 'solutions',
    type: 'product',
    price: 45.99,
    rating: 4.3,
    reviewCount: 234,
    tags: ['CMS', 'Content', 'SEO', 'Media'],
  },
  {
    id: 's9',
    name: 'Social Media Manager',
    description: 'Unified social media management with scheduling, analytics, and engagement tools',
    category: 'solutions',
    type: 'product',
    price: 34.99,
    rating: 4.4,
    reviewCount: 198,
    tags: ['Social Media', 'Scheduling', 'Analytics', 'Engagement'],
  },
  {
    id: 's10',
    name: 'Event Management Platform',
    description: 'Complete event planning solution with ticketing, registration, and attendee tracking',
    category: 'solutions',
    type: 'product',
    price: 59.99,
    rating: 4.6,
    reviewCount: 123,
    tags: ['Events', 'Ticketing', 'Registration', 'Planning'],
  },
  {
    id: 's11',
    name: 'Booking System',
    description: 'Flexible booking and reservation system with calendar integration and payment processing',
    category: 'solutions',
    type: 'product',
    price: 42.99,
    rating: 4.5,
    reviewCount: 176,
    tags: ['Booking', 'Reservations', 'Calendar', 'Payments'],
  },
  {
    id: 's12',
    name: 'Survey & Forms Builder',
    description: 'Advanced form builder with conditional logic, analytics, and integration capabilities',
    category: 'solutions',
    type: 'product',
    price: 29.99,
    rating: 4.2,
    reviewCount: 267,
    tags: ['Forms', 'Surveys', 'Analytics', 'Logic'],
  },
  {
    id: 's13',
    name: 'Document Management',
    description: 'Secure document storage with version control, collaboration, and workflow automation',
    category: 'solutions',
    type: 'product',
    price: 52.99,
    rating: 4.7,
    reviewCount: 142,
    tags: ['Documents', 'Storage', 'Collaboration', 'Workflow'],
  },
  {
    id: 's14',
    name: 'Help Desk Solution',
    description: 'Customer support platform with ticket management, knowledge base, and live chat',
    category: 'solutions',
    type: 'product',
    price: 38.99,
    rating: 4.4,
    reviewCount: 213,
    tags: ['Support', 'Tickets', 'Knowledge Base', 'Chat'],
  },
  {
    id: 's15',
    name: 'Fleet Management System',
    description: 'GPS tracking and fleet optimization with maintenance scheduling and driver monitoring',
    category: 'solutions',
    type: 'product',
    price: 84.99,
    rating: 4.6,
    reviewCount: 98,
    tags: ['Fleet', 'GPS', 'Tracking', 'Maintenance'],
  },
  {
    id: 's16',
    name: 'Real Estate CRM',
    description: 'Specialized CRM for real estate with property listings, client management, and market analysis',
    category: 'solutions',
    type: 'product',
    price: 72.99,
    rating: 4.5,
    reviewCount: 156,
    tags: ['Real Estate', 'CRM', 'Properties', 'Market Analysis'],
  },
  {
    id: 's17',
    name: 'Healthcare Management',
    description: 'Patient management system with appointment scheduling, medical records, and billing',
    category: 'solutions',
    type: 'product',
    price: 127.99,
    rating: 4.8,
    reviewCount: 87,
    tags: ['Healthcare', 'Patients', 'Appointments', 'Medical Records'],
  },

  // Teams (16 items)
  {
    id: '3',
    name: 'DevOps Team',
    description: 'Expert DevOps team for infrastructure, deployment, CI/CD pipelines, and cloud architecture',
    category: 'teams',
    type: 'service',
    price: 150,
    rating: 4.9,
    reviewCount: 67,
    tags: ['DevOps', 'Infrastructure', 'CI/CD', 'Cloud'],
  },
  {
    id: '6',
    name: 'QA Testing Team',
    description: 'Comprehensive quality assurance and testing services including automation, performance, and security testing',
    category: 'teams',
    type: 'service',
    price: 120,
    rating: 4.8,
    reviewCount: 78,
    tags: ['QA', 'Testing', 'Automation', 'Performance'],
  },
  {
    id: 't1',
    name: 'Frontend Development Team',
    description: 'Experienced React, Vue, and Angular developers for modern web applications',
    category: 'teams',
    type: 'service',
    price: 135,
    rating: 4.7,
    reviewCount: 89,
    tags: ['Frontend', 'React', 'Vue', 'Angular'],
  },
  {
    id: 't2',
    name: 'Backend Development Team',
    description: 'Full-stack backend developers specializing in Node.js, Python, and Java microservices',
    category: 'teams',
    type: 'service',
    price: 145,
    rating: 4.8,
    reviewCount: 92,
    tags: ['Backend', 'Node.js', 'Python', 'Microservices'],
  },
  {
    id: 't3',
    name: 'Data Science Team',
    description: 'Machine learning engineers and data scientists for AI model development and analytics',
    category: 'teams',
    type: 'service',
    price: 180,
    rating: 4.9,
    reviewCount: 54,
    tags: ['Data Science', 'ML', 'AI', 'Analytics'],
  },
  {
    id: 't4',
    name: 'Mobile Development Team',
    description: 'iOS and Android developers with expertise in React Native and Flutter',
    category: 'teams',
    type: 'service',
    price: 140,
    rating: 4.6,
    reviewCount: 76,
    tags: ['Mobile', 'iOS', 'Android', 'React Native'],
  },
  {
    id: 't5',
    name: 'UI/UX Design Team',
    description: 'Creative designers focused on user experience and interface design',
    category: 'teams',
    type: 'service',
    price: 125,
    rating: 4.7,
    reviewCount: 103,
    tags: ['Design', 'UI/UX', 'Creative', 'User Experience'],
  },
  {
    id: 't6',
    name: 'Cybersecurity Team',
    description: 'Security experts for penetration testing, vulnerability assessment, and compliance',
    category: 'teams',
    type: 'service',
    price: 195,
    rating: 4.9,
    reviewCount: 45,
    tags: ['Security', 'Penetration Testing', 'Compliance'],
  },
  {
    id: 't7',
    name: 'Cloud Architecture Team',
    description: 'AWS, Azure, and GCP specialists for cloud migration and optimization',
    category: 'teams',
    type: 'service',
    price: 165,
    rating: 4.8,
    reviewCount: 67,
    tags: ['Cloud', 'AWS', 'Azure', 'Architecture'],
  },
  {
    id: 't8',
    name: 'Product Management Team',
    description: 'Experienced product managers for strategy, roadmap planning, and market analysis',
    category: 'teams',
    type: 'service',
    price: 155,
    rating: 4.6,
    reviewCount: 58,
    tags: ['Product Management', 'Strategy', 'Roadmap'],
  },
  {
    id: 't9',
    name: 'Content Creation Team',
    description: 'Writers, editors, and content strategists for marketing and technical documentation',
    category: 'teams',
    type: 'service',
    price: 95,
    rating: 4.5,
    reviewCount: 134,
    tags: ['Content', 'Writing', 'Marketing', 'Documentation'],
  },
  {
    id: 't10',
    name: 'Digital Marketing Team',
    description: 'SEO, SEM, and social media marketing specialists for growth and engagement',
    category: 'teams',
    type: 'service',
    price: 110,
    rating: 4.4,
    reviewCount: 89,
    tags: ['Marketing', 'SEO', 'SEM', 'Social Media'],
  },
  {
    id: 't11',
    name: 'Business Intelligence Team',
    description: 'BI analysts and data visualization experts for strategic insights',
    category: 'teams',
    type: 'service',
    price: 170,
    rating: 4.7,
    reviewCount: 61,
    tags: ['BI', 'Analytics', 'Visualization', 'Strategy'],
  },
  {
    id: 't12',
    name: 'Blockchain Development Team',
    description: 'Smart contract developers and DApp specialists for Web3 projects',
    category: 'teams',
    type: 'service',
    price: 200,
    rating: 4.8,
    reviewCount: 38,
    tags: ['Blockchain', 'Smart Contracts', 'Web3', 'DApp'],
  },
  {
    id: 't13',
    name: 'Game Development Team',
    description: 'Unity and Unreal Engine developers for mobile and desktop games',
    category: 'teams',
    type: 'service',
    price: 160,
    rating: 4.6,
    reviewCount: 52,
    tags: ['Game Development', 'Unity', 'Unreal', 'Mobile Games'],
  },
  {
    id: 't14',
    name: 'VR/AR Development Team',
    description: 'Virtual and augmented reality specialists for immersive experiences',
    category: 'teams',
    type: 'service',
    price: 185,
    rating: 4.7,
    reviewCount: 43,
    tags: ['VR', 'AR', 'Immersive', 'Unity'],
  },

  // Individuals (20 items)
  {
    id: '4',
    name: 'Anita Mensah',
    description: 'Experienced React/Vue developer specializing in modern UI/UX design and frontend architecture',
    category: 'individuals',
    type: 'service',
    price: 75,
    rating: 4.7,
    reviewCount: 94,
    tags: ['Frontend', 'React', 'Vue', 'TypeScript'],
    level: 'Senior',
    role: 'Frontend Developer',
  },
  {
    id: 'i1',
    name: 'David Chen',
    description: 'Full-stack developer with expertise in Node.js, Python, and cloud architecture',
    category: 'individuals',
    type: 'service',
    price: 85,
    rating: 4.8,
    reviewCount: 127,
    tags: ['Full-stack', 'Node.js', 'Python', 'Cloud'],
    level: 'Senior',
    role: 'Full-stack Developer',
  },
  {
    id: 'i2',
    name: 'Sarah Johnson',
    description: 'Data scientist specializing in machine learning and predictive analytics',
    category: 'individuals',
    type: 'service',
    price: 95,
    rating: 4.9,
    reviewCount: 86,
    tags: ['Data Science', 'ML', 'Analytics', 'Python'],
    level: 'Senior',
    role: 'Data Scientist',
  },
  {
    id: 'i3',
    name: 'Marcus Rodriguez',
    description: 'DevOps engineer with AWS and Kubernetes expertise for scalable infrastructure',
    category: 'individuals',
    type: 'service',
    price: 90,
    rating: 4.7,
    reviewCount: 103,
    tags: ['DevOps', 'AWS', 'Kubernetes', 'Infrastructure'],
    level: 'Senior',
    role: 'DevOps Engineer',
  },
  {
    id: 'i4',
    name: 'Lisa Wang',
    description: 'UI/UX designer with focus on mobile-first design and user research',
    category: 'individuals',
    type: 'service',
    price: 70,
    rating: 4.6,
    reviewCount: 156,
    tags: ['UI/UX', 'Mobile Design', 'User Research', 'Figma'],
    level: 'Senior',
    role: 'UI/UX Designer',
  },
  {
    id: 'i5',
    name: 'Ahmed Hassan',
    description: 'Cybersecurity specialist with penetration testing and compliance expertise',
    category: 'individuals',
    type: 'service',
    price: 110,
    rating: 4.8,
    reviewCount: 67,
    tags: ['Security', 'Penetration Testing', 'Compliance', 'CISSP'],
    level: 'Senior',
    role: 'Cybersecurity Specialist',
  },
  {
    id: 'i6',
    name: 'Emma Thompson',
    description: 'Product manager with B2B SaaS experience and agile methodology expertise',
    category: 'individuals',
    type: 'service',
    price: 80,
    rating: 4.5,
    reviewCount: 89,
    tags: ['Product Management', 'SaaS', 'Agile', 'Strategy'],
    level: 'Senior',
    role: 'Product Manager',
  },
  {
    id: 'i7',
    name: 'Raj Patel',
    description: 'Mobile app developer specializing in React Native and Flutter cross-platform solutions',
    category: 'individuals',
    type: 'service',
    price: 78,
    rating: 4.7,
    reviewCount: 112,
    tags: ['Mobile', 'React Native', 'Flutter', 'Cross-platform'],
    level: 'Senior',
    role: 'Mobile App Developer',
  },
  {
    id: 'i8',
    name: 'Sophie Laurent',
    description: 'Digital marketing specialist with SEO, PPC, and content marketing expertise',
    category: 'individuals',
    type: 'service',
    price: 60,
    rating: 4.4,
    reviewCount: 134,
    tags: ['Marketing', 'SEO', 'PPC', 'Content Marketing'],
    level: 'Senior',
    role: 'Digital Marketing Specialist',
  },
  {
    id: 'i9',
    name: 'Carlos Silva',
    description: 'Blockchain developer with smart contract and DeFi protocol experience',
    category: 'individuals',
    type: 'service',
    price: 120,
    rating: 4.9,
    reviewCount: 45,
    tags: ['Blockchain', 'Smart Contracts', 'DeFi', 'Solidity'],
    level: 'Senior',
    role: 'Blockchain Developer',
  },
  {
    id: 'i10',
    name: 'Nina Kowalski',
    description: 'Technical writer specializing in API documentation and developer experience',
    category: 'individuals',
    type: 'service',
    price: 55,
    rating: 4.6,
    reviewCount: 98,
    tags: ['Technical Writing', 'Documentation', 'API', 'Developer Experience'],
    level: 'Senior',
    role: 'Technical Writer',
  },
  {
    id: 'i11',
    name: 'Jackson Brown',
    description: 'Game developer with Unity expertise and mobile game monetization experience',
    category: 'individuals',
    type: 'service',
    price: 82,
    rating: 4.5,
    reviewCount: 76,
    tags: ['Game Development', 'Unity', 'Mobile Games', 'Monetization'],
    level: 'Senior',
    role: 'Game Developer',
  },
  {
    id: 'i12',
    name: 'Priya Sharma',
    description: 'QA engineer with test automation and performance testing specialization',
    category: 'individuals',
    type: 'service',
    price: 65,
    rating: 4.7,
    reviewCount: 123,
    tags: ['QA', 'Test Automation', 'Performance Testing', 'Selenium'],
    level: 'Senior',
    role: 'QA Engineer',
  },
  {
    id: 'i13',
    name: 'Alex Kim',
    description: 'AI/ML engineer with deep learning and computer vision expertise',
    category: 'individuals',
    type: 'service',
    price: 105,
    rating: 4.8,
    reviewCount: 72,
    tags: ['AI', 'Deep Learning', 'Computer Vision', 'TensorFlow'],
    level: 'Senior',
    role: 'AI/ML Engineer',
  },
  {
    id: 'i14',
    name: 'Maria Gonzalez',
    description: 'Business analyst with process optimization and requirements gathering expertise',
    category: 'individuals',
    type: 'service',
    price: 68,
    rating: 4.4,
    reviewCount: 145,
    tags: ['Business Analysis', 'Process Optimization', 'Requirements'],
    level: 'Senior',
    role: 'Business Analyst',
  },
  {
    id: 'i15',
    name: 'Tom Wilson',
    description: 'Cloud architect specializing in AWS solutions and serverless architectures',
    category: 'individuals',
    type: 'service',
    price: 95,
    rating: 4.7,
    reviewCount: 88,
    tags: ['Cloud Architecture', 'AWS', 'Serverless', 'Lambda'],
    level: 'Senior',
    role: 'Cloud Architect',
  },
  {
    id: 'i16',
    name: 'Isabella Garcia',
    description: 'Content strategist with B2B marketing and thought leadership expertise',
    category: 'individuals',
    type: 'service',
    price: 58,
    rating: 4.5,
    reviewCount: 167,
    tags: ['Content Strategy', 'B2B Marketing', 'Thought Leadership'],
    level: 'Senior',
    role: 'Content Strategist',
  },
  {
    id: 'i17',
    name: 'Kevin O\'Brien',
    description: 'Database administrator with PostgreSQL, MongoDB, and performance optimization skills',
    category: 'individuals',
    type: 'service',
    price: 72,
    rating: 4.6,
    reviewCount: 91,
    tags: ['Database', 'PostgreSQL', 'MongoDB', 'Performance'],
    level: 'Senior',
    role: 'Database Administrator',
  },
  {
    id: 'i18',
    name: 'Yuki Tanaka',
    description: 'VR/AR developer with Unity and immersive experience design background',
    category: 'individuals',
    type: 'service',
    price: 88,
    rating: 4.7,
    reviewCount: 54,
    tags: ['VR', 'AR', 'Unity', 'Immersive Design'],
    level: 'Senior',
    role: 'VR/AR Developer',
  },
  {
    id: 'i19',
    name: 'Oliver Schmidt',
    description: 'Backend engineer with microservices architecture and distributed systems expertise',
    category: 'individuals',
    type: 'service',
    price: 87,
    rating: 4.8,
    reviewCount: 109,
    tags: ['Backend', 'Microservices', 'Distributed Systems', 'Go'],
    level: 'Senior',
    role: 'Backend Engineer',
  },
  {
    id: 'i20',
    name: 'Grace Lee',
    description: 'Scrum master and agile coach with team transformation and process improvement experience',
    category: 'individuals',
    type: 'service',
    price: 75,
    rating: 4.6,
    reviewCount: 132,
    tags: ['Scrum Master', 'Agile Coach', 'Team Leadership', 'Process Improvement'],
    level: 'Senior',
    role: 'Scrum Master',
  },
];

const Marketplace = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<MarketplaceItem[]>([]);
  const [favorites, setFavorites] = useState<MarketplaceItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MarketplaceItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [activeFilters, setActiveFilters] = useState<FilterOption[]>([]);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [purchasedItems, setPurchasedItems] = useState<MarketplaceItem[]>([]);
  const [isFullPageCartOpen, setIsFullPageCartOpen] = useState(false);
  const [selectedRoleGroup, setSelectedRoleGroup] = useState<string | null>(null);
  const [showPurchasedItems, setShowPurchasedItems] = useState(false);

  const addToCart = (item: MarketplaceItem) => {
    setCartItems(prev => [...prev.filter(i => i.id !== item.id), item]);
    toast({
      title: "Added to cart",
      description: `${item.name} has been added to your cart.`,
    });
  };

  const removeFromCart = (itemId: string) => {
    setCartItems(prev => prev.filter(i => i.id !== itemId));
  };

  const toggleFavorite = (item: MarketplaceItem) => {
    setFavorites(prev => {
      const exists = prev.find(i => i.id === item.id);
      if (exists) {
        return prev.filter(i => i.id !== item.id);
      }
      return [...prev, item];
    });
  };

  const isFavorited = (itemId: string) => {
    return favorites.some(item => item.id === itemId);
  };

  const handleOpenModal = (item: MarketplaceItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleFilterToggle = (filter: FilterOption) => {
    setActiveFilters(prev => {
      const exists = prev.find(f => f.id === filter.id);
      if (exists) {
        return prev.filter(f => f.id !== filter.id);
      }
      return [...prev, filter];
    });
  };

  const handleClearFilters = () => {
    setActiveFilters([]);
  };

  const filterItems = (items: MarketplaceItem[]) => {
    if (activeFilters.length === 0) return items;

    return items.filter(item => {
      return activeFilters.some(filter => {
        switch (filter.category) {
          case 'type':
            return item.tags.some(tag => tag.toLowerCase().includes(filter.label.toLowerCase()));
          case 'popularity':
            if (filter.id === 'popular') return item.rating >= 4.5;
            if (filter.id === 'trending') return item.reviewCount >= 150;
            if (filter.id === 'new') return item.reviewCount < 100;
            if (filter.id === 'featured') return item.featured;
            return false;
          case 'role':
            return item.tags.some(tag => tag.toLowerCase().includes(filter.label.toLowerCase()));
          case 'rating':
            if (filter.id === 'high-rated') return item.rating >= 4.5;
            return false;
          case 'rate':
            if (filter.id === 'low-rate') return item.price >= 50 && item.price <= 75;
            if (filter.id === 'mid-rate') return item.price > 75 && item.price <= 100;
            if (filter.id === 'high-rate') return item.price > 100;
            return false;
          case 'skill':
            return item.tags.some(tag => tag.toLowerCase().includes(filter.label.toLowerCase()));
          case 'size':
            // Mock logic for team size based on price
            if (filter.id === 'large-team') return item.price > 150;
            if (filter.id === 'small-team') return item.price <= 150;
            return false;
          default:
            return false;
        }
      });
    });
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handlePaymentSuccess = () => {
    setPurchasedItems([...cartItems]);
    setCartItems([]);
    setIsCheckoutOpen(false);
    setIsSuccessModalOpen(true);
  };

  const handleGoToStudio = () => {
    setIsSuccessModalOpen(false);
    navigate('/');
    toast({
      title: "Welcome back to Studio!",
      description: "Your purchased items have been added to My Items.",
    });
  };

  const categorizedData = {
    solutions: mockData.filter(item => item.category === 'solutions'),
    capabilities: mockData.filter(item => item.category === 'capabilities'),
    teams: mockData.filter(item => item.category === 'teams'),
    individuals: mockData.filter(item => item.category === 'individuals'),
  };

  const handleSeeAll = (category: string) => {
    setSelectedCategory(category);
  };

  const handleBackToHome = () => {
    setSelectedCategory(null);
    setActiveFilters([]);
  };

  const roleGroups = [
    {
      id: 'frontend',
      name: 'Frontend Developers',
      description: 'React, Vue, Angular specialists for modern web interfaces',
      count: 8,
      icon: '💻',
      averageRate: 75,
    },
    {
      id: 'backend',
      name: 'Backend Engineers',
      description: 'Node.js, Python, Java experts for robust server solutions',
      count: 6,
      icon: '⚙️',
      averageRate: 82,
    },
    {
      id: 'fullstack',
      name: 'Full-stack Developers',
      description: 'End-to-end development specialists',
      count: 4,
      icon: '🔧',
      averageRate: 88,
    },
    {
      id: 'data-science',
      name: 'Data Scientists',
      description: 'ML engineers and analytics experts',
      count: 3,
      icon: '📊',
      averageRate: 95,
    },
    {
      id: 'product-management',
      name: 'Product Managers',
      description: 'Strategy and roadmap specialists',
      count: 2,
      icon: '📋',
      averageRate: 80,
    },
    {
      id: 'design',
      name: 'UI/UX Designers',
      description: 'User experience and interface design experts',
      count: 3,
      icon: '🎨',
      averageRate: 70,
    },
  ];

  const getIndividualsByRole = (roleId: string) => {
    const roleMap: Record<string, string[]> = {
      'frontend': ['Frontend Developer'],
      'backend': ['Backend Engineer'],
      'fullstack': ['Full-stack Developer'],
      'data-science': ['Data Scientist', 'AI/ML Engineer'],
      'product-management': ['Product Manager', 'Business Analyst'],
      'design': ['UI/UX Designer'],
    };
    
    return categorizedData.individuals.filter(item => 
      roleMap[roleId]?.some(role => 
        item.role?.includes(role) || item.tags.some(tag => tag.toLowerCase().includes(role.toLowerCase()))
      )
    );
  };

  const handleGoToMyItems = () => {
    navigate('/my-items');
  };

  if (showPurchasedItems) {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
          <div className="flex items-center justify-between p-6">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl quest-gradient flex items-center justify-center">
                  <img src="/lovable-uploads/6afb39a4-7ab6-4eee-b62e-bf83a883bb52.png" alt="Quest AI" className="w-6 h-6" />
                </div>
                <div className="text-xl font-bold text-foreground">Quest AI</div>
              </div>
              <nav className="flex items-center space-x-1">
                <Button
                  variant="ghost"
                  onClick={() => setShowPurchasedItems(false)}
                  className="text-muted-foreground hover:text-foreground flex items-center space-x-2"
                >
                  <ArrowLeft size={16} />
                  <span>Back to Marketplace</span>
                </Button>
                <Button
                  variant="ghost"
                  className="text-foreground font-medium"
                >
                  My Items
                </Button>
              </nav>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsFavoritesOpen(true)}
                className="border-border hover:bg-accent"
              >
                <Star size={20} />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsFullPageCartOpen(true)}
                className="relative border-border hover:bg-accent"
              >
                <ShoppingCart size={20} />
                {cartItems.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-primary">
                    {cartItems.length}
                  </Badge>
                )}
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="border-border hover:bg-accent"
                  >
                    <User size={20} />
                    <ChevronDown size={12} className="ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 bg-popover border-border">
                  <DropdownMenuItem>Request Agent</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* My Items Content */}
        <main className="px-6 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">My Items</h1>
            <p className="text-muted-foreground">
              {purchasedItems.length} items purchased
            </p>
          </div>

          {purchasedItems.length === 0 ? (
            <div className="text-center py-16">
              <h2 className="text-xl font-bold text-foreground mb-4">No items purchased yet</h2>
              <p className="text-muted-foreground mb-8">Browse our marketplace to find amazing products and services</p>
              <Button onClick={() => setShowPurchasedItems(false)}>Browse Marketplace</Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-3">
              {purchasedItems.map((item) => (
                <MarketplaceCard
                  key={item.id}
                  item={item}
                  onAddToCart={addToCart}
                  onToggleFavorite={toggleFavorite}
                  onOpenModal={handleOpenModal}
                  isFavorited={isFavorited(item.id)}
                />
              ))}
            </div>
          )}
        </main>

        {/* Modals */}
        <MarketplaceItemModal
          item={selectedItem}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAddToCart={addToCart}
          onToggleFavorite={toggleFavorite}
          isFavorited={selectedItem ? isFavorited(selectedItem.id) : false}
        />
      </div>
    );
  }

  if (selectedRoleGroup) {
    const roleGroupData = getIndividualsByRole(selectedRoleGroup);
    const roleGroup = roleGroups.find(rg => rg.id === selectedRoleGroup);
    
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
          <div className="flex items-center justify-between p-6">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl quest-gradient flex items-center justify-center">
                  <img src="/lovable-uploads/6afb39a4-7ab6-4eee-b62e-bf83a883bb52.png" alt="Quest AI" className="w-6 h-6" />
                </div>
                <div className="text-xl font-bold text-foreground">Quest AI</div>
              </div>
              <nav className="flex items-center space-x-1">
                <Button
                  variant="ghost"
                  onClick={() => setSelectedRoleGroup(null)}
                  className="text-muted-foreground hover:text-foreground flex items-center space-x-2"
                >
                  <ArrowLeft size={16} />
                  <span>Back to Individuals</span>
                </Button>
                <Button
                  variant="ghost"
                  className="text-foreground font-medium"
                >
                  {roleGroup?.name}
                </Button>
              </nav>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                <Input
                  placeholder={`Search ${roleGroup?.name.toLowerCase()}...`}
                  className="pl-10 w-64 bg-secondary border-border"
                />
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsFavoritesOpen(true)}
                className="border-border hover:bg-accent"
              >
                <Star size={20} />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsCartOpen(true)}
                className="relative border-border hover:bg-accent"
              >
                <ShoppingCart size={20} />
                {cartItems.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-primary">
                    {cartItems.length}
                  </Badge>
                )}
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="border-border hover:bg-accent"
                  >
                    <User size={20} />
                    <ChevronDown size={12} className="ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 bg-popover border-border">
                  <DropdownMenuItem>Request Agent</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Role Group Content */}
        <main className="px-6 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">{roleGroup?.name}</h1>
            <p className="text-muted-foreground">
              {roleGroupData.length} {roleGroup?.name.toLowerCase()} available
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-3">
            {roleGroupData.map((item) => (
              <MarketplaceCard
                key={item.id}
                item={item}
                onAddToCart={addToCart}
                onToggleFavorite={toggleFavorite}
                onOpenModal={handleOpenModal}
                isFavorited={isFavorited(item.id)}
              />
            ))}
          </div>
        </main>

        {/* Modals and Drawers */}
        <MarketplaceItemModal
          item={selectedItem}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAddToCart={addToCart}
          onToggleFavorite={toggleFavorite}
          isFavorited={selectedItem ? isFavorited(selectedItem.id) : false}
        />

        <CartDrawer
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          items={cartItems}
          allItems={mockData}
          onRemoveItem={removeFromCart}
          onAddToCart={addToCart}
          onToggleFavorite={toggleFavorite}
          onOpenModal={handleOpenModal}
          onCheckout={handleCheckout}
          isFavorited={isFavorited}
        />

        <FavoritesDrawer
          isOpen={isFavoritesOpen}
          onClose={() => setIsFavoritesOpen(false)}
          items={favorites}
          onAddToCart={addToCart}
          onRemoveFavorite={(itemId) => 
            setFavorites(prev => prev.filter(i => i.id !== itemId))
          }
        />

        <StripeCheckoutModal
          isOpen={isCheckoutOpen}
          onClose={() => setIsCheckoutOpen(false)}
          items={cartItems}
          onPaymentSuccess={handlePaymentSuccess}
        />

        <PaymentSuccessModal
          isOpen={isSuccessModalOpen}
          onClose={() => setIsSuccessModalOpen(false)}
          purchasedItems={purchasedItems}
          onGoToStudio={handleGoToStudio}
        />
      </div>
    );
  }

  if (selectedCategory === 'individuals') {
    const individualsFilters: FilterOption[] = [
      { id: 'frontend', label: 'Frontend', category: 'role' },
      { id: 'backend', label: 'Backend', category: 'role' },
      { id: 'fullstack', label: 'Full-stack', category: 'role' },
      { id: 'data-science', label: 'Data Science', category: 'role' },
      { id: 'product-management', label: 'Product Management', category: 'role' },
      { id: 'design', label: 'Design', category: 'role' },
      { id: 'junior', label: 'Junior', category: 'level' },
      { id: 'mid', label: 'Mid', category: 'level' },
      { id: 'senior', label: 'Senior', category: 'level' },
      { id: 'lead', label: 'Lead', category: 'level' },
    ];

    const filteredIndividuals = activeFilters.length === 0 
      ? categorizedData.individuals 
      : categorizedData.individuals.filter(item => {
          return activeFilters.some(filter => {
            if (filter.category === 'role') {
              const roleMap: Record<string, string[]> = {
                'frontend': ['Frontend Developer'],
                'backend': ['Backend Engineer'],
                'fullstack': ['Full-stack Developer'],
                'data-science': ['Data Scientist', 'AI/ML Engineer'],
                'product-management': ['Product Manager', 'Business Analyst'],
                'design': ['UI/UX Designer'],
              };
              return roleMap[filter.id]?.some(role => 
                item.role?.includes(role) || item.tags.some(tag => tag.toLowerCase().includes(role.toLowerCase()))
              );
            }
            if (filter.category === 'level') {
              return item.level?.toLowerCase() === filter.label.toLowerCase();
            }
            return false;
          });
        });
    
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
          <div className="flex items-center justify-between p-6">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl quest-gradient flex items-center justify-center">
                  <img src="/lovable-uploads/6afb39a4-7ab6-4eee-b62e-bf83a883bb52.png" alt="Quest AI" className="w-6 h-6" />
                </div>
                <div className="text-xl font-bold text-foreground">Quest AI</div>
              </div>
              <nav className="flex items-center space-x-1">
                <Button
                  variant="ghost"
                  onClick={() => setSelectedCategory(null)}
                  className="text-muted-foreground hover:text-foreground flex items-center space-x-2"
                >
                  <ArrowLeft size={16} />
                  <span>Back to Marketplace</span>
                </Button>
                <Button
                  variant="ghost"
                  className="text-foreground font-medium"
                >
                  Individuals
                </Button>
              </nav>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                <Input
                  placeholder="Search individuals..."
                  className="pl-10 w-64 bg-secondary border-border"
                />
              </div>
              <Button
                variant="outline"
                onClick={handleGoToMyItems}
                className="border-border hover:bg-accent"
              >
                My Items
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsFavoritesOpen(true)}
                className="border-border hover:bg-accent"
              >
                <Star size={20} />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsFullPageCartOpen(true)}
                className="relative border-border hover:bg-accent"
              >
                <ShoppingCart size={20} />
                {cartItems.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-primary">
                    {cartItems.length}
                  </Badge>
                )}
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="border-border hover:bg-accent"
                  >
                    <User size={20} />
                    <ChevronDown size={12} className="ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 bg-popover border-border">
                  <DropdownMenuItem>Request Agent</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Individuals Content */}
        <main className="px-6 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Individual Professionals</h1>
            <p className="text-muted-foreground">
              Showing {filteredIndividuals.length} professionals available
            </p>
          </div>

          {/* Filter Pills */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              {individualsFilters.map((filter) => {
                const isActive = activeFilters.some(f => f.id === filter.id);
                return (
                  <Button
                    key={filter.id}
                    variant={isActive ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleFilterToggle(filter)}
                    className="rounded-full"
                  >
                    {filter.label}
                  </Button>
                );
              })}
              {activeFilters.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClearFilters}
                  className="text-muted-foreground"
                >
                  Clear all
                </Button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-3">
            {filteredIndividuals.map((item) => (
              <MarketplaceCard
                key={item.id}
                item={item}
                onAddToCart={addToCart}
                onToggleFavorite={toggleFavorite}
                onOpenModal={handleOpenModal}
                isFavorited={isFavorited(item.id)}
              />
            ))}
          </div>
        </main>
        
        {/* Modals and Drawers */}
        <MarketplaceItemModal
          item={selectedItem}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAddToCart={addToCart}
          onToggleFavorite={toggleFavorite}
          isFavorited={selectedItem ? isFavorited(selectedItem.id) : false}
        />

        <CartDrawer
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          items={cartItems}
          allItems={mockData}
          onRemoveItem={removeFromCart}
          onAddToCart={addToCart}
          onToggleFavorite={toggleFavorite}
          onOpenModal={handleOpenModal}
          onCheckout={handleCheckout}
          isFavorited={isFavorited}
        />

        <FavoritesDrawer
          isOpen={isFavoritesOpen}
          onClose={() => setIsFavoritesOpen(false)}
          items={favorites}
          onAddToCart={addToCart}
          onRemoveFavorite={(itemId) => 
            setFavorites(prev => prev.filter(i => i.id !== itemId))
          }
        />

        <StripeCheckoutModal
          isOpen={isCheckoutOpen}
          onClose={() => setIsCheckoutOpen(false)}
          items={cartItems}
          onPaymentSuccess={handlePaymentSuccess}
        />

        <PaymentSuccessModal
          isOpen={isSuccessModalOpen}
          onClose={() => setIsSuccessModalOpen(false)}
          purchasedItems={purchasedItems}
          onGoToStudio={handleGoToStudio}
        />
      </div>
    );
  }

  if (selectedCategory) {
    const categoryData = filterItems(categorizedData[selectedCategory as keyof typeof categorizedData]);
    const categoryTitle = selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1);
    
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
          <div className="flex items-center justify-between p-6">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl quest-gradient flex items-center justify-center">
                  <img src="/lovable-uploads/6afb39a4-7ab6-4eee-b62e-bf83a883bb52.png" alt="Quest AI" className="w-6 h-6" />
                </div>
                <div className="text-xl font-bold text-foreground">Quest AI</div>
              </div>
              <nav className="flex items-center space-x-1">
                <Button
                  variant="ghost"
                  onClick={() => setSelectedCategory(null)}
                  className="text-muted-foreground hover:text-foreground flex items-center space-x-2"
                >
                  <ArrowLeft size={16} />
                  <span>Back to Marketplace</span>
                </Button>
                <Button
                  variant="ghost"
                  className="text-foreground font-medium"
                >
                  {categoryTitle}
                </Button>
              </nav>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                <Input
                  placeholder={`Search ${categoryTitle.toLowerCase()}...`}
                  className="pl-10 w-64 bg-secondary border-border"
                />
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsFavoritesOpen(true)}
                className="border-border hover:bg-accent"
              >
                <Star size={20} />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsCartOpen(true)}
                className="relative border-border hover:bg-accent"
              >
                <ShoppingCart size={20} />
                {cartItems.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-primary">
                    {cartItems.length}
                  </Badge>
                )}
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="border-border hover:bg-accent"
                  >
                    <User size={20} />
                    <ChevronDown size={12} className="ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 bg-popover border-border">
                  <DropdownMenuItem>Request Agent</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Category Grid View */}
        <main className="px-6 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">{categoryTitle}</h1>
            <p className="text-muted-foreground">
              Showing {categoryData.length} {categoryTitle.toLowerCase()} available
            </p>
          </div>

          {/* Filter Bar */}
          <FilterBar
            category={selectedCategory}
            activeFilters={activeFilters}
            onFilterToggle={handleFilterToggle}
            onClearFilters={handleClearFilters}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-3">
            {categoryData.map((item) => (
              <MarketplaceCard
                key={item.id}
                item={item}
                onAddToCart={addToCart}
                onToggleFavorite={toggleFavorite}
                onOpenModal={handleOpenModal}
                isFavorited={isFavorited(item.id)}
              />
            ))}
          </div>
        </main>

        {/* Modals and Drawers */}
        <MarketplaceItemModal
          item={selectedItem}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAddToCart={addToCart}
          onToggleFavorite={toggleFavorite}
          isFavorited={selectedItem ? isFavorited(selectedItem.id) : false}
        />

        <CartDrawer
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          items={cartItems}
          allItems={mockData}
          onRemoveItem={removeFromCart}
          onAddToCart={addToCart}
          onToggleFavorite={toggleFavorite}
          onOpenModal={handleOpenModal}
          onCheckout={handleCheckout}
          isFavorited={isFavorited}
        />

        <FavoritesDrawer
          isOpen={isFavoritesOpen}
          onClose={() => setIsFavoritesOpen(false)}
          items={favorites}
          onAddToCart={addToCart}
          onRemoveFavorite={(itemId) => 
            setFavorites(prev => prev.filter(i => i.id !== itemId))
          }
        />

        <StripeCheckoutModal
          isOpen={isCheckoutOpen}
          onClose={() => setIsCheckoutOpen(false)}
          items={cartItems}
          onPaymentSuccess={handlePaymentSuccess}
        />

        <PaymentSuccessModal
          isOpen={isSuccessModalOpen}
          onClose={() => setIsSuccessModalOpen(false)}
          purchasedItems={purchasedItems}
          onGoToStudio={handleGoToStudio}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="flex items-center justify-between p-6">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl quest-gradient flex items-center justify-center">
                <img src="/lovable-uploads/6afb39a4-7ab6-4eee-b62e-bf83a883bb52.png" alt="Quest AI" className="w-6 h-6" />
              </div>
              <div className="text-xl font-bold text-foreground">Quest AI</div>
            </div>
            <nav className="flex items-center space-x-1">
              <Button
                variant="ghost"
                onClick={() => navigate('/')}
                className="text-muted-foreground hover:text-foreground flex items-center space-x-2"
              >
                <ArrowLeft size={16} />
                <span>Return to Studio</span>
              </Button>
              <Button
                variant="ghost"
                className="text-foreground font-medium"
              >
                Marketplace
              </Button>
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
              <Input
                placeholder="Search marketplace..."
                className="pl-10 w-64 bg-secondary border-border"
              />
            </div>
            <Button
              variant="outline"
              onClick={handleGoToMyItems}
              className="border-border hover:bg-accent"
            >
              My Items
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsFavoritesOpen(true)}
              className="border-border hover:bg-accent"
            >
              <Star size={20} />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsFullPageCartOpen(true)}
              className="relative border-border hover:bg-accent"
            >
              <ShoppingCart size={20} />
              {cartItems.length > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-primary">
                  {cartItems.length}
                </Badge>
              )}
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="border-border hover:bg-accent"
                >
                  <User size={20} />
                  <ChevronDown size={12} className="ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-popover border-border">
                <DropdownMenuItem>Request Agent</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Enhanced Hero Section */}
      <section className="relative px-6 py-16 overflow-hidden">
        <div className="absolute inset-0 quest-gradient opacity-20 animate-pulse"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background"></div>
        <div className="relative z-10 max-w-4xl">
          <h1 className="text-5xl font-bold text-foreground mb-4 animate-fade-in">Welcome to Quest AI</h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl animate-fade-in">
            Whether it's automating workflows, enhancing decision-making, 
            or optimizing complex processes, Quest AI offers a range of AI 
            agents, consultants and teams to help you achieve your goals.
          </p>
          <Button 
            size="lg" 
            onClick={() => navigate('/')}
            className="bg-primary hover:bg-primary/90 hover-scale"
          >
            Go to quest studio
          </Button>
        </div>
      </section>

      {/* Main Content - Solutions first */}
      <main className="px-6 space-y-12 pb-12">
        {/* Solutions - First */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">Solutions</h2>
            <Button 
              variant="ghost" 
              className="text-muted-foreground hover:text-foreground"
              onClick={() => handleSeeAll('solutions')}
            >
              See all
            </Button>
          </div>
          <CategorySection
            items={categorizedData.solutions}
            category="solutions"
            onAddToCart={addToCart}
            onToggleFavorite={toggleFavorite}
            onOpenModal={handleOpenModal}
            onSeeMore={handleSeeAll}
            isFavorited={isFavorited}
          />
        </section>

        {/* Capabilities */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">Capabilities</h2>
            <Button 
              variant="ghost" 
              className="text-muted-foreground hover:text-foreground"
              onClick={() => handleSeeAll('capabilities')}
            >
              See all
            </Button>
          </div>
          <CategorySection
            items={categorizedData.capabilities}
            category="capabilities"
            onAddToCart={addToCart}
            onToggleFavorite={toggleFavorite}
            onOpenModal={handleOpenModal}
            onSeeMore={handleSeeAll}
            isFavorited={isFavorited}
          />
        </section>

        {/* Teams */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">Teams</h2>
            <Button 
              variant="ghost" 
              className="text-muted-foreground hover:text-foreground"
              onClick={() => handleSeeAll('teams')}
            >
              See all
            </Button>
          </div>
          <CategorySection
            items={categorizedData.teams}
            category="teams"
            onAddToCart={addToCart}
            onToggleFavorite={toggleFavorite}
            onOpenModal={handleOpenModal}
            onSeeMore={handleSeeAll}
            isFavorited={isFavorited}
          />
        </section>

        {/* Individuals - Show Role Groups Instead */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">Individuals</h2>
            <Button 
              variant="ghost" 
              className="text-muted-foreground hover:text-foreground"
              onClick={() => handleSeeAll('individuals')}
            >
              See all
            </Button>
          </div>
          <div className="w-full overflow-hidden">
            <ScrollArea className="w-full">
              <div className="flex space-x-4 pb-4 px-1">
                {roleGroups.map((roleGroup) => (
                  <RoleGroupCard
                    key={roleGroup.id}
                    roleGroup={roleGroup}
                    onSelect={(rg) => setSelectedRoleGroup(rg.id)}
                  />
                ))}
              </div>
            </ScrollArea>
          </div>
        </section>
      </main>

      {/* Item Detail Modal */}
      <MarketplaceItemModal
        item={selectedItem}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddToCart={addToCart}
        onToggleFavorite={toggleFavorite}
        isFavorited={selectedItem ? isFavorited(selectedItem.id) : false}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        allItems={mockData}
        onRemoveItem={removeFromCart}
        onAddToCart={addToCart}
        onToggleFavorite={toggleFavorite}
        onOpenModal={handleOpenModal}
        onCheckout={handleCheckout}
        isFavorited={isFavorited}
      />

      {/* Favorites Drawer */}
      <FavoritesDrawer
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
        items={favorites}
        onAddToCart={addToCart}
        onRemoveFavorite={(itemId) => 
          setFavorites(prev => prev.filter(i => i.id !== itemId))
        }
      />

      {/* Stripe Checkout Modal */}
      <StripeCheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        onPaymentSuccess={handlePaymentSuccess}
      />

      {/* Payment Success Modal */}
      <PaymentSuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        purchasedItems={purchasedItems}
        onGoToStudio={handleGoToStudio}
      />

      {/* Full Page Cart */}
      <FullPageCart
        isOpen={isFullPageCartOpen}
        onClose={() => setIsFullPageCartOpen(false)}
        items={cartItems}
        allItems={mockData}
        onRemoveItem={removeFromCart}
        onAddToCart={addToCart}
        onToggleFavorite={toggleFavorite}
        onOpenModal={handleOpenModal}
        onCheckout={handleCheckout}
        isFavorited={isFavorited}
      />
    </div>
  );
};

export default Marketplace;
