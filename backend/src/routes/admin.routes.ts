// ============================================================================
// HealthSphere AI — Admin Routes
// ============================================================================

import { Router, Request, Response } from 'express';
import { authenticate } from '../middleware/auth.middleware';
import { authorize } from '../middleware/rbac.middleware';

const router = Router();

const mockDashboardAnalytics = {
  totalPatients: 12842,
  activeDoctors: 154,
  dailyAppointments: 412,
  emergencyRate: 4.2,
  admissionTrends: [
    { date: 'Jan', count: 1200 },
    { date: 'Feb', count: 1350 },
    { date: 'Mar', count: 1100 },
    { date: 'Apr', count: 1450 },
    { date: 'May', count: 1600 },
    { date: 'Jun', count: 1400 },
  ],
  diseaseTrends: [
    { name: 'Influenza A', count: 892, trend: 24 },
    { name: 'Asthma Relapse', count: 456, trend: -8 },
    { name: 'Cardio Issues', count: 234, trend: 12 },
  ],
  efficiencyScore: 92,
  bedOccupancyRate: 84,
};

router.get('/analytics', authenticate, authorize('ADMIN'), (_req: Request, res: Response) => {
  res.json({ success: true, data: mockDashboardAnalytics });
});

router.get('/doctors', authenticate, authorize('ADMIN'), (_req: Request, res: Response) => {
  res.json({
    success: true,
    data: [
      { id: '1', name: 'Dr. James Wilson', specialization: 'Neurosurgeon', status: 'OPERATIONAL', patients: 234 },
      { id: '2', name: 'Dr. Elena Rodriguez', specialization: 'Cardiologist', status: 'OPERATIONAL', patients: 312 },
      { id: '3', name: 'Dr. Michael Chen', specialization: 'Pediatrician', status: 'OFF_DUTY', patients: 189 },
    ],
  });
});

export { router as adminRoutes };
