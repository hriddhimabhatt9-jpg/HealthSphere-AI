// ============================================================================
// HealthSphere AI — Zod Validation Tests
// ============================================================================

import { z } from 'zod';
import {
  loginSchema,
  registerSchema,
  createAppointmentSchema,
  medicineReminderSchema,
  chatMessageSchema,
  patientProfileSchema,
} from '../src/validators/schemas';

describe('Login Schema', () => {
  test('should accept valid login credentials', () => {
    const result = loginSchema.safeParse({
      email: 'test@healthsphere.ai',
      password: 'Password@123',
    });
    expect(result.success).toBe(true);
  });

  test('should reject invalid email', () => {
    const result = loginSchema.safeParse({
      email: 'not-an-email',
      password: 'Password@123',
    });
    expect(result.success).toBe(false);
  });

  test('should reject short password', () => {
    const result = loginSchema.safeParse({
      email: 'test@healthsphere.ai',
      password: 'short',
    });
    expect(result.success).toBe(false);
  });

  test('should reject empty email', () => {
    const result = loginSchema.safeParse({
      email: '',
      password: 'Password@123',
    });
    expect(result.success).toBe(false);
  });
});

describe('Register Schema', () => {
  const validRegistration = {
    email: 'newuser@healthsphere.ai',
    password: 'Password@123',
    firstName: 'Aris',
    lastName: 'Patel',
    role: 'PATIENT' as const,
  };

  test('should accept valid registration', () => {
    const result = registerSchema.safeParse(validRegistration);
    expect(result.success).toBe(true);
  });

  test('should reject password without special character', () => {
    const result = registerSchema.safeParse({
      ...validRegistration,
      password: 'Password123',
    });
    expect(result.success).toBe(false);
  });

  test('should reject password without uppercase', () => {
    const result = registerSchema.safeParse({
      ...validRegistration,
      password: 'password@123',
    });
    expect(result.success).toBe(false);
  });

  test('should reject invalid role', () => {
    const result = registerSchema.safeParse({
      ...validRegistration,
      role: 'INVALID',
    });
    expect(result.success).toBe(false);
  });

  test('should accept all valid roles', () => {
    for (const role of ['PATIENT', 'DOCTOR', 'ADMIN']) {
      const result = registerSchema.safeParse({
        ...validRegistration,
        role,
      });
      expect(result.success).toBe(true);
    }
  });

  test('should trim first and last name', () => {
    const result = registerSchema.safeParse({
      ...validRegistration,
      firstName: '  Aris  ',
      lastName: '  Patel  ',
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.firstName).toBe('Aris');
      expect(result.data.lastName).toBe('Patel');
    }
  });
});

describe('Create Appointment Schema', () => {
  test('should accept valid appointment', () => {
    const result = createAppointmentSchema.safeParse({
      doctorId: '550e8400-e29b-41d4-a716-446655440000',
      type: 'VIDEO',
      scheduledAt: '2024-10-25T10:30:00.000Z',
      duration: 30,
    });
    expect(result.success).toBe(true);
  });

  test('should reject non-UUID doctor ID', () => {
    const result = createAppointmentSchema.safeParse({
      doctorId: 'not-a-uuid',
      type: 'VIDEO',
      scheduledAt: '2024-10-25T10:30:00.000Z',
    });
    expect(result.success).toBe(false);
  });

  test('should reject invalid appointment type', () => {
    const result = createAppointmentSchema.safeParse({
      doctorId: '550e8400-e29b-41d4-a716-446655440000',
      type: 'PHONE',
      scheduledAt: '2024-10-25T10:30:00.000Z',
    });
    expect(result.success).toBe(false);
  });

  test('should default duration to 30', () => {
    const result = createAppointmentSchema.safeParse({
      doctorId: '550e8400-e29b-41d4-a716-446655440000',
      type: 'IN_PERSON',
      scheduledAt: '2024-10-25T10:30:00.000Z',
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.duration).toBe(30);
    }
  });
});

describe('Medicine Reminder Schema', () => {
  test('should accept valid reminder', () => {
    const result = medicineReminderSchema.safeParse({
      medicineName: 'Atorvastatin',
      dosage: '10mg',
      frequency: 'Once daily',
      times: ['08:00', '20:00'],
    });
    expect(result.success).toBe(true);
  });

  test('should reject invalid time format', () => {
    const result = medicineReminderSchema.safeParse({
      medicineName: 'Atorvastatin',
      dosage: '10mg',
      frequency: 'Once daily',
      times: ['8am'],
    });
    expect(result.success).toBe(false);
  });

  test('should require at least one time', () => {
    const result = medicineReminderSchema.safeParse({
      medicineName: 'Atorvastatin',
      dosage: '10mg',
      frequency: 'Once daily',
      times: [],
    });
    expect(result.success).toBe(false);
  });
});

describe('Chat Message Schema', () => {
  test('should accept valid message', () => {
    const result = chatMessageSchema.safeParse({
      message: 'What are the side effects of Aspirin?',
    });
    expect(result.success).toBe(true);
  });

  test('should reject empty message', () => {
    const result = chatMessageSchema.safeParse({
      message: '',
    });
    expect(result.success).toBe(false);
  });

  test('should accept message with context', () => {
    const result = chatMessageSchema.safeParse({
      message: 'Analyze this report',
      context: 'blood_test_results',
    });
    expect(result.success).toBe(true);
  });
});

describe('Patient Profile Schema', () => {
  test('should accept valid patient profile', () => {
    const result = patientProfileSchema.safeParse({
      dateOfBirth: '1990-01-15T00:00:00.000Z',
      gender: 'MALE',
      bloodType: 'A_POSITIVE',
      heightCm: 175,
      weightKg: 72,
      allergies: ['Penicillin'],
    });
    expect(result.success).toBe(true);
  });

  test('should reject unreasonable height', () => {
    const result = patientProfileSchema.safeParse({
      dateOfBirth: '1990-01-15T00:00:00.000Z',
      gender: 'MALE',
      heightCm: 500,
      weightKg: 72,
    });
    expect(result.success).toBe(false);
  });

  test('should reject negative weight', () => {
    const result = patientProfileSchema.safeParse({
      dateOfBirth: '1990-01-15T00:00:00.000Z',
      gender: 'FEMALE',
      heightCm: 165,
      weightKg: -10,
    });
    expect(result.success).toBe(false);
  });
});
