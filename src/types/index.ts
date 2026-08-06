export type ApplicationStatus = 'SAVED' | 'APPLIED' | 'INTERVIEW' | 'OFFER' | 'REJECTED';

export interface AuthResponse {
  message: string;
  token: string;
}

export interface ApiErrorResponse {
  timestamp: string;
  status: number;
  error: string;
  message: string;
  path: string;
}

export interface CVResponse {
  id: number;
  message: string;
}

export interface CV {
  id: number;
  userId: number;
  blobUrl: string;
  originalFilename: string;
  extractedText: string;
  skillsJson: string;
  uploadedAt: string;
}

export interface CVDataResult {
  skills: string[];
  education: string[];
  certifications: string[];
  projects: string[];
  experience: string[];
}

export interface JobApplicationResponse {
  id: number;
  jobTitle: string;
  company: string;
  location: string;
  postingUrl?: string;
  status: ApplicationStatus;
  appliedDate: string;
  createdAt: string;
}

export interface AnalysisResponse {
  id: number;
  jobApplicationId: number;
  jobTitle: string;
  company: string;
  matchScore: number;
  missingSkills: string[];
  strengths: string[];
  suggestions: string[];
  createdAt: string;
}

export interface ChatResponse {
  id: number;
  userMessage: string;
  aiResponse: string;
  sentAt: string;
}
