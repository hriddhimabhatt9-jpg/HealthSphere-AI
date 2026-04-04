// ============================================================================
// HealthSphere AI — Backend Server Entry Point
// Express server with full security middleware, WebSocket, and API routing
// ============================================================================

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import { createServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import { config } from './config/environment';
import { logger } from './utils/logger';
import { errorHandler } from './middleware/errorHandler';
import { requestLogger } from './middleware/requestLogger';
import { authRoutes } from './routes/auth.routes';
import { patientRoutes } from './routes/patient.routes';
import { doctorRoutes } from './routes/doctor.routes';
import { appointmentRoutes } from './routes/appointment.routes';
import { adminRoutes } from './routes/admin.routes';
import { aiRoutes } from './routes/ai.routes';
import { videoRoutes } from './routes/video.routes';
import { setupWebSocket } from './websocket/socketHandler';

// ── Express App ─────────────────────────────────────────────────────────────

const app = express();
const httpServer = createServer(app);

// ── Socket.IO Setup ─────────────────────────────────────────────────────────

const io = new SocketIOServer(httpServer, {
  cors: {
    origin: config.corsOrigin,
    methods: ['GET', 'POST'],
    credentials: true,
  },
  pingTimeout: 60000,
  pingInterval: 25000,
});

setupWebSocket(io);

// ── Security Middleware ─────────────────────────────────────────────────────

app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false,
  crossOriginResourcePolicy: { policy: 'cross-origin' },
}));

app.use(cors({
  origin: config.corsOrigin,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-CSRF-Token'],
  exposedHeaders: ['X-Total-Count'],
}));

// ── Rate Limiting ───────────────────────────────────────────────────────────

const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: { 
    success: false, 
    error: { code: 'RATE_LIMIT_EXCEEDED', message: 'Too many requests, please try again later.' },
  },
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: { code: 'AUTH_RATE_LIMIT', message: 'Too many authentication attempts.' },
  },
});

app.use('/api/', globalLimiter);
app.use('/api/auth/', authLimiter);

// ── Body Parsing & Cookies ──────────────────────────────────────────────────

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser(config.cookieSecret));

// ── Request Logging ─────────────────────────────────────────────────────────

app.use(requestLogger);

// ── Health Check ────────────────────────────────────────────────────────────

app.get('/api/health', (_req, res) => {
  res.json({ 
    success: true, 
    data: {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      version: '1.0.0',
      uptime: process.uptime(),
    },
  });
});

// ── API Routes ──────────────────────────────────────────────────────────────

app.use('/api/auth', authRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/video', videoRoutes);

// ── 404 Handler ─────────────────────────────────────────────────────────────

app.use((_req, res) => {
  res.status(404).json({
    success: false,
    error: { code: 'NOT_FOUND', message: 'The requested resource was not found.' },
  });
});

// ── Error Handler ───────────────────────────────────────────────────────────

app.use(errorHandler);

// ── Start Server ────────────────────────────────────────────────────────────

const PORT = config.port;

httpServer.listen(PORT, () => {
  logger.info(`🏥 HealthSphere AI Backend running on port ${PORT}`);
  logger.info(`📡 WebSocket server ready`);
  logger.info(`🔒 Security middleware: Helmet, CORS, Rate Limiting active`);
  logger.info(`🌍 Environment: ${config.nodeEnv}`);
  logger.info(`🧑‍⚕️ Demo Credentials:`);
  logger.info(`   Patient: patient@healthsphere.ai / Password@123`);
  logger.info(`   Doctor:  doctor@healthsphere.ai  / Password@123`);
  logger.info(`   Admin:   admin@healthsphere.ai   / Password@123`);
});

export { app, httpServer, io };
