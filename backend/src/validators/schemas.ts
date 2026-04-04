// ============================================================================
// HealthSphere AI — Zod Validation Schemas
// Input validation for all API endpoints
// ============================================================================

import { z } from 'zod';

// ── Auth Schemas ────────────────────────────────────────────────────────────

export const loginSchema = z.object({
  email: z.string().email('Invalid email address').max(255),
  password: z.string().min(8, 'Password must be at least 8 characters').max(128),
});

export const registerSchema = z.object({
  email: z.string().email('Invalid email address').max(255),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(128)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      'Password must contain uppercase, lowercase, number, and special character',
    ),
  firstName: z.string().min(1, 'First name is required').max(100).trim(),
  lastName: z.string().min(1, 'Last name is required').max(100).trim(),
  role: z.enum(['PATIENT', 'DOCTOR', 'ADMIN']),
  phone: z.string().max(20).optional(),
});

export const refreshTokenSchema = z.object({
  refreshToken: z.string().min(1, 'Refresh token is required'),
});

// ── Patient Schemas ─────────────────────────────────────────────────────────

export const patientProfileSchema = z.object({
  dateOfBirth: z.string().datetime(),
  gender: z.enum(['MALE', 'FEMALE', 'OTHER', 'PREFER_NOT_TO_SAY']),
  bloodType: z.enum([
    'A_POSITIVE', 'A_NEGATIVE', 'B_POSITIVE', 'B_NEGATIVE',
    'AB_POSITIVE', 'AB_NEGATIVE', 'O_POSITIVE', 'O_NEGATIVE',
  ]).optional(),
  heightCm: z.number().min(30).max(300),
  weightKg: z.number().min(1).max(500),
  allergies: z.array(z.string().max(200)).optional().default([]),
  chronicConditions: z.array(z.string().max(200)).optional().default([]),
  emergencyContactName: z.string().max(100).optional(),
  emergencyContactPhone: z.string().max(20).optional(),
  insuranceProvider: z.string().max(200).optional(),
  insuranceId: z.string().max(100).optional(),
});

// ── Doctor Schemas ──────────────────────────────────────────────────────────

export const doctorProfileSchema = z.object({
  specialization: z.string().min(1).max(100),
  licenseNumber: z.string().min(1).max(50),
  yearsOfExperience: z.number().int().min(0).max(80),
  consultationFee: z.number().min(0).max(100000),
  bio: z.string().max(2000).optional(),
  hospital: z.string().max(200).optional(),
  languages: z.array(z.string().max(50)).optional().default([]),
});

// ── Appointment Schemas ─────────────────────────────────────────────────────

export const createAppointmentSchema = z.object({
  doctorId: z.string().uuid(),
  type: z.enum(['IN_PERSON', 'VIDEO', 'HOME_VISIT']),
  scheduledAt: z.string().datetime(),
  duration: z.number().int().min(15).max(120).optional().default(30),
  notes: z.string().max(1000).optional(),
});

export const updateAppointmentStatusSchema = z.object({
  status: z.enum(['SCHEDULED', 'CONFIRMED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED', 'NO_SHOW']),
});

// ── Prescription Schemas ────────────────────────────────────────────────────

export const createPrescriptionSchema = z.object({
  patientId: z.string().uuid(),
  medications: z.array(z.object({
    name: z.string().min(1).max(200),
    dosage: z.string().min(1).max(100),
    frequency: z.string().min(1).max(100),
    duration: z.string().min(1).max(100),
    notes: z.string().max(500).optional(),
  })).min(1, 'At least one medication is required'),
  instructions: z.string().min(1).max(2000),
  expiresAt: z.string().datetime().optional(),
});

// ── Medicine Reminder Schemas ───────────────────────────────────────────────

export const medicineReminderSchema = z.object({
  medicineName: z.string().min(1).max(200),
  dosage: z.string().min(1).max(100),
  frequency: z.string().min(1).max(100),
  times: z.array(z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Time must be in HH:mm format')).min(1),
  isActive: z.boolean().optional().default(true),
});

// ── Chat / AI Schemas ───────────────────────────────────────────────────────

export const chatMessageSchema = z.object({
  message: z.string().min(1, 'Message cannot be empty').max(5000),
  context: z.string().max(1000).optional(),
});

// ── Pagination Schemas ──────────────────────────────────────────────────────

export const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).optional().default(1),
  limit: z.coerce.number().int().min(1).max(100).optional().default(20),
  sortBy: z.string().max(50).optional(),
  sortOrder: z.enum(['asc', 'desc']).optional().default('desc'),
});

// ── Type Exports ────────────────────────────────────────────────────────────

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type PatientProfileInput = z.infer<typeof patientProfileSchema>;
export type DoctorProfileInput = z.infer<typeof doctorProfileSchema>;
export type CreateAppointmentInput = z.infer<typeof createAppointmentSchema>;
export type CreatePrescriptionInput = z.infer<typeof createPrescriptionSchema>;
export type MedicineReminderInput = z.infer<typeof medicineReminderSchema>;
export type ChatMessageInput = z.infer<typeof chatMessageSchema>;
export type PaginationInput = z.infer<typeof paginationSchema>;
