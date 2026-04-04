// ============================================================================
// HealthSphere AI — Video Consultation Routes (WebRTC Signaling)
// ============================================================================

import { Router, Request, Response } from 'express';
import { authenticate } from '../middleware/auth.middleware';
import { v4 as uuidv4 } from 'uuid';

const router = Router();

router.post('/create-room', authenticate, (req: Request, res: Response) => {
  const roomId = uuidv4();
  res.json({
    success: true,
    data: {
      roomId,
      status: 'WAITING',
      createdAt: new Date().toISOString(),
      signalingUrl: `/ws/video/${roomId}`,
    },
  });
});

router.get('/room/:roomId', authenticate, (req: Request, res: Response) => {
  res.json({
    success: true,
    data: {
      roomId: req.params.roomId,
      status: 'ACTIVE',
      participants: [
        { id: '1', name: 'Dr. Julian Vance', role: 'DOCTOR', isConnected: true },
        { id: '2', name: 'Aris Patel', role: 'PATIENT', isConnected: true },
      ],
    },
  });
});

export { router as videoRoutes };
