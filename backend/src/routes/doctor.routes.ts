// ============================================================================
// HealthSphere AI — Doctor Routes
// ============================================================================

import { Router, Request, Response } from 'express';
import { authenticate } from '../middleware/auth.middleware';
import { authorize } from '../middleware/rbac.middleware';

const router = Router();

// ── Mock Doctor Data ────────────────────────────────────────────────────────

const mockPatientQueue = [
  { id: '1', name: 'Arthur Henderson', initials: 'AH', status: 'STABLE', priority: 'normal', waitTime: '12 min' },
  { id: '2', name: 'Clara Thorne', initials: 'CT', avatar: '/avatars/clara.jpg', status: 'CRITICAL', priority: 'high', waitTime: '3 min' },
  { id: '3', name: 'Jameson Wells', initials: 'JW', status: 'STABLE', priority: 'normal', waitTime: '20 min' },
];

const mockDoctorStats = {
  totalPatients: 1489,
  successRate: 96.2,
  avgWaitTime: 14,
  appointmentsToday: 12,
  patientFlowData: [
    { day: 'MON', count: 45 },
    { day: 'TUE', count: 52 },
    { day: 'WED', count: 60 },
    { day: 'THU', count: 38 },
    { day: 'FRI', count: 47 },
  ],
};

const mockDoctorsList = [
  { id: '1', name: 'Dr. James Wilson', specialization: 'Neurosurgeon', avatar: null, isAvailable: true, rating: 4.9 },
  { id: '2', name: 'Dr. Elena Rodriguez', specialization: 'Cardiologist', avatar: null, isAvailable: true, rating: 4.8 },
  { id: '3', name: 'Dr. Michael Chen', specialization: 'Pediatrician', avatar: null, isAvailable: false, rating: 4.7 },
];

// ── GET /api/doctors/queue ──────────────────────────────────────────────────

router.get('/queue', authenticate, authorize('DOCTOR', 'ADMIN'), (_req: Request, res: Response) => {
  res.json({ success: true, data: mockPatientQueue });
});

// ── GET /api/doctors/stats ──────────────────────────────────────────────────

router.get('/stats', authenticate, authorize('DOCTOR', 'ADMIN'), (_req: Request, res: Response) => {
  res.json({ success: true, data: mockDoctorStats });
});

// ── GET /api/doctors/list ───────────────────────────────────────────────────

router.get('/list', authenticate, (_req: Request, res: Response) => {
  res.json({ success: true, data: mockDoctorsList });
});

export { router as doctorRoutes };
