// ============================================================================
// HealthSphere AI — Patient Routes
// In-memory mock data (no database required)
// ============================================================================

import { Router, Request, Response, NextFunction } from 'express';
import { authenticate } from '../middleware/auth.middleware';
import { authorize } from '../middleware/rbac.middleware';

const router = Router();

// ── GET /api/patients/health-metrics ────────────────────────────────────────

router.get('/health-metrics', authenticate, authorize('PATIENT', 'DOCTOR', 'ADMIN'), (_req: Request, res: Response) => {
  res.json({
    success: true,
    data: {
      bmi: 22.8,
      bmiCategory: 'Normal',
      bmr: 1420,
      heartRate: 72,
      bloodPressureSystolic: 118,
      bloodPressureDiastolic: 76,
      overallScore: 88,
      oxygenSaturation: 98,
      stepsToday: 7842,
      sleepHours: 7.5,
    },
  });
});

// ── GET /api/patients/medical-history ───────────────────────────────────────

router.get('/medical-history', authenticate, authorize('PATIENT', 'DOCTOR', 'ADMIN'), (_req: Request, res: Response) => {
  res.json({
    success: true,
    data: [
      {
        id: 'rec-1',
        title: 'Annual Physical Examination',
        description: 'Routine checkup. All vitals normal. Blood work ordered.',
        type: 'CONSULTATION',
        createdAt: '2024-10-15T10:00:00Z',
        doctorName: 'Dr. Julian Vance',
        icon: 'monitor_heart',
      },
      {
        id: 'rec-2',
        title: 'Comprehensive Blood Panel',
        description: 'CBC, Metabolic Panel, Lipid Panel. Minor glucose elevation noted (108 mg/dL).',
        type: 'LAB_RESULT',
        createdAt: '2024-10-12T14:30:00Z',
        doctorName: 'Dr. Elena Rodriguez',
        icon: 'biotech',
      },
      {
        id: 'rec-3',
        title: 'COVID-19 Booster (Bivalent)',
        description: 'Pfizer-BioNTech bivalent booster administered. No adverse reactions.',
        type: 'VACCINATION',
        createdAt: '2024-09-20T09:00:00Z',
        doctorName: 'Dr. Michael Chen',
        icon: 'vaccine',
      },
      {
        id: 'rec-4',
        title: 'Chest X-Ray',
        description: 'No abnormalities detected. Lungs clear. Heart size normal.',
        type: 'IMAGING',
        createdAt: '2024-08-05T11:00:00Z',
        doctorName: 'Dr. Julian Vance',
        icon: 'radiology',
      },
    ],
  });
});

// ── GET /api/patients/reports ───────────────────────────────────────────────

router.get('/reports', authenticate, authorize('PATIENT', 'DOCTOR', 'ADMIN'), (_req: Request, res: Response) => {
  res.json({
    success: true,
    data: [
      { id: 'rpt-1', name: 'Blood_Panel_Oct2024.pdf', size: '1.2 MB', date: '2024-10-12', type: 'LAB_RESULT' },
      { id: 'rpt-2', name: 'Chest_XRay_Aug2024.dcm', size: '3.8 MB', date: '2024-08-05', type: 'IMAGING' },
      { id: 'rpt-3', name: 'ECG_Report_Jul2024.pdf', size: '890 KB', date: '2024-07-18', type: 'LAB_RESULT' },
    ],
  });
});

// ── GET /api/patients/reminders ─────────────────────────────────────────────

router.get('/reminders', authenticate, authorize('PATIENT', 'ADMIN'), (_req: Request, res: Response) => {
  const nowHours = new Date().getHours();
  const nowMinutes = new Date().getMinutes();
  const nowTime = `${String(nowHours).padStart(2, '0')}:${String(nowMinutes).padStart(2, '0')}`;

  res.json({
    success: true,
    data: [
      { id: 'rem-1', medicineName: 'Metformin', dosage: '500mg', frequency: 'Twice Daily', isActive: true, takenToday: '08:00' < nowTime },
      { id: 'rem-2', medicineName: 'Vitamin D3', dosage: '2000 IU', frequency: 'Once Daily', isActive: true, takenToday: '09:00' < nowTime },
      { id: 'rem-3', medicineName: 'Omega-3 Fish Oil', dosage: '1000mg', frequency: 'Once Daily', isActive: true, takenToday: '20:00' < nowTime },
    ],
  });
});

// ── GET /api/patients/appointments ──────────────────────────────────────────

router.get('/appointments', authenticate, authorize('PATIENT', 'ADMIN'), (_req: Request, res: Response) => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const nextWeek = new Date();
  nextWeek.setDate(nextWeek.getDate() + 7);
  const nextMonth = new Date();
  nextMonth.setDate(nextMonth.getDate() + 30);

  res.json({
    success: true,
    data: [
      {
        id: 'apt-1',
        doctorName: 'Dr. Julian Vance',
        specialization: 'Neurosurgeon',
        scheduledAt: tomorrow.toISOString(),
        type: 'VIDEO',
        status: 'CONFIRMED',
        duration: 30,
      },
      {
        id: 'apt-2',
        doctorName: 'Dr. Elena Rodriguez',
        specialization: 'Cardiologist',
        scheduledAt: nextWeek.toISOString(),
        type: 'IN_PERSON',
        status: 'SCHEDULED',
        duration: 45,
      },
      {
        id: 'apt-3',
        doctorName: 'Dr. Michael Chen',
        specialization: 'Pediatrician',
        scheduledAt: nextMonth.toISOString(),
        type: 'IN_PERSON',
        status: 'SCHEDULED',
        duration: 30,
      },
    ],
  });
});

// ── GET /api/patients/profile ───────────────────────────────────────────────

router.get('/profile', authenticate, authorize('PATIENT'), (req: Request, res: Response) => {
  res.json({
    success: true,
    data: {
      dateOfBirth: '1994-06-15T00:00:00Z',
      gender: 'FEMALE',
      bloodType: 'A_POSITIVE',
      heightCm: 165,
      weightKg: 62,
      allergies: ['Penicillin'],
      chronicConditions: [],
      emergencyContactName: 'James Mitchell',
      emergencyContactPhone: '+1-555-0199',
      insuranceProvider: 'BlueCross BlueShield',
      insuranceId: 'BCB-2024-88421',
      user: {
        firstName: 'Sarah',
        lastName: 'Mitchell',
        email: 'patient@healthsphere.ai',
        phone: '+1-555-0101',
        avatar: null,
      },
    },
  });
});

export { router as patientRoutes };
