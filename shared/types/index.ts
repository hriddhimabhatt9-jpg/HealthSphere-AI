// ============================================================================
// HealthSphere AI — Shared Type Definitions
// ============================================================================

// ── User & Auth ─────────────────────────────────────────────────────────────

export enum UserRole {
  PATIENT = 'PATIENT',
  DOCTOR = 'DOCTOR',
  ADMIN = 'ADMIN',
}

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER',
  PREFER_NOT_TO_SAY = 'PREFER_NOT_TO_SAY',
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  phone?: string;
}

// ── Patient ─────────────────────────────────────────────────────────────────

export enum BloodType {
  A_POSITIVE = 'A+',
  A_NEGATIVE = 'A-',
  B_POSITIVE = 'B+',
  B_NEGATIVE = 'B-',
  AB_POSITIVE = 'AB+',
  AB_NEGATIVE = 'AB-',
  O_POSITIVE = 'O+',
  O_NEGATIVE = 'O-',
}

export interface PatientProfile {
  id: string;
  userId: string;
  dateOfBirth: string;
  gender: Gender;
  bloodType?: BloodType;
  heightCm: number;
  weightKg: number;
  allergies: string[];
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  insuranceProvider?: string;
  insuranceId?: string;
}

export interface HealthMetrics {
  bmi: number;
  bmiCategory: 'Underweight' | 'Normal' | 'Overweight' | 'Obese';
  bmr: number;
  heartRate?: number;
  bloodPressureSystolic?: number;
  bloodPressureDiastolic?: number;
  overallScore: number;
}

// ── Doctor ───────────────────────────────────────────────────────────────────

export enum Specialization {
  GENERAL_PRACTICE = 'General Practice',
  CARDIOLOGY = 'Cardiology',
  DERMATOLOGY = 'Dermatology',
  NEUROLOGY = 'Neurology',
  ORTHOPEDICS = 'Orthopedics',
  PEDIATRICS = 'Pediatrics',
  PSYCHIATRY = 'Psychiatry',
  SURGERY = 'Surgery',
  ONCOLOGY = 'Oncology',
  PHYSIOTHERAPY = 'Physiotherapy',
  ENDOCRINOLOGY = 'Endocrinology',
  GASTROENTEROLOGY = 'Gastroenterology',
}

export interface DoctorProfile {
  id: string;
  userId: string;
  specialization: Specialization;
  licenseNumber: string;
  yearsOfExperience: number;
  consultationFee: number;
  bio?: string;
  hospital?: string;
  isAvailable: boolean;
  rating: number;
  totalPatients: number;
  languages: string[];
  availableSlots: TimeSlot[];
}

export interface TimeSlot {
  id: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  isBooked: boolean;
}

// ── Appointments ────────────────────────────────────────────────────────────

export enum AppointmentStatus {
  SCHEDULED = 'SCHEDULED',
  CONFIRMED = 'CONFIRMED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  NO_SHOW = 'NO_SHOW',
}

export enum AppointmentType {
  IN_PERSON = 'IN_PERSON',
  VIDEO = 'VIDEO',
  HOME_VISIT = 'HOME_VISIT',
}

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  type: AppointmentType;
  status: AppointmentStatus;
  scheduledAt: string;
  duration: number;
  notes?: string;
  patient?: User;
  doctor?: User & { doctorProfile?: DoctorProfile };
}

// ── Medical Records ─────────────────────────────────────────────────────────

export interface MedicalRecord {
  id: string;
  patientId: string;
  doctorId: string;
  title: string;
  description: string;
  diagnosis?: string;
  type: 'CONSULTATION' | 'LAB_RESULT' | 'IMAGING' | 'VACCINATION' | 'PRESCRIPTION' | 'SURGERY';
  attachments: string[];
  createdAt: string;
}

export interface Prescription {
  id: string;
  patientId: string;
  doctorId: string;
  medications: Medication[];
  instructions: string;
  isActive: boolean;
  createdAt: string;
  expiresAt?: string;
}

export interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  notes?: string;
}

// ── Medicine Reminders ──────────────────────────────────────────────────────

export interface MedicineReminder {
  id: string;
  patientId: string;
  medicineName: string;
  dosage: string;
  frequency: string;
  times: string[];
  isActive: boolean;
  takenToday: boolean;
}

// ── Chat / AI Assistant ─────────────────────────────────────────────────────

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  metadata?: {
    type?: 'wellness_tip' | 'lab_analysis' | 'recommendation' | 'general';
    labData?: LabAnalysis;
    suggestions?: string[];
  };
}

export interface LabAnalysis {
  title: string;
  value: number;
  unit: string;
  referenceRange: string;
  status: 'normal' | 'attention' | 'critical';
}

// ── Video Consultation ──────────────────────────────────────────────────────

export interface VideoSession {
  id: string;
  appointmentId: string;
  roomId: string;
  status: 'WAITING' | 'ACTIVE' | 'ENDED';
  startedAt?: string;
  endedAt?: string;
}

// ── Physiotherapy ───────────────────────────────────────────────────────────

export interface PhysiotherapySession {
  id: string;
  patientId: string;
  exerciseName: string;
  category: 'STRETCHING' | 'STRENGTHENING' | 'BALANCE' | 'MOBILITY';
  duration: number;
  reps?: number;
  sets?: number;
  painLevel: number;
  completedAt: string;
  notes?: string;
}

export interface Exercise {
  id: string;
  name: string;
  description: string;
  category: 'STRETCHING' | 'STRENGTHENING' | 'BALANCE' | 'MOBILITY';
  difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  targetArea: string;
  imageUrl?: string;
  reps?: number;
  duration?: string;
  instructions: string[];
}

// ── Hospital / Admin ────────────────────────────────────────────────────────

export interface Hospital {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  latitude: number;
  longitude: number;
  totalBeds: number;
  availableBeds: number;
  departments: string[];
  rating: number;
}

export interface DashboardAnalytics {
  totalPatients: number;
  activeDoctors: number;
  dailyAppointments: number;
  emergencyRate: number;
  admissionTrends: { date: string; count: number }[];
  diseaseTrends: { name: string; count: number; trend: number }[];
  efficiencyScore: number;
  bedOccupancyRate: number;
}

// ── API Response ────────────────────────────────────────────────────────────

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: unknown;
  };
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// ── Location Services ───────────────────────────────────────────────────────

export interface NearbyProvider {
  id: string;
  name: string;
  type: 'DOCTOR' | 'HOSPITAL' | 'PHARMACY';
  specialization?: string;
  address: string;
  distance: number;
  rating: number;
  phone: string;
  latitude: number;
  longitude: number;
  isOpen: boolean;
}
