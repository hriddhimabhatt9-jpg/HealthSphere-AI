// ============================================================================
// HealthSphere AI — Appointment Routes
// ============================================================================

import { Router, Request, Response } from 'express';
import { authenticate } from '../middleware/auth.middleware';
import { validate } from '../middleware/validation.middleware';
import { createAppointmentSchema } from '../validators/schemas';

const router = Router();

router.get('/', authenticate, (_req: Request, res: Response) => {
  res.json({
    success: true,
    data: [
      { id: '1', patientName: 'Aris Patel', doctorName: 'Dr. Robert Chen', scheduledAt: '2024-10-21T10:30:00Z', type: 'VIDEO', status: 'SCHEDULED', duration: 30 },
      { id: '2', patientName: 'Clara Thorne', doctorName: 'Dr. Sarah Miller', scheduledAt: '2024-10-25T12:00:00Z', type: 'IN_PERSON', status: 'CONFIRMED', duration: 45 },
    ],
  });
});

router.post('/', authenticate, validate(createAppointmentSchema), (req: Request, res: Response) => {
  res.status(201).json({
    success: true,
    data: { id: 'new-appt-1', ...req.body, status: 'SCHEDULED', createdAt: new Date().toISOString() },
  });
});

export { router as appointmentRoutes };
