// ============================================================================
// HealthSphere AI — Auth Routes & Controller
// JWT authentication with in-memory storage (no database required)
// ============================================================================

import { Router, Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { config } from '../config/environment';
import { validate } from '../middleware/validation.middleware';
import { authenticate } from '../middleware/auth.middleware';
import { loginSchema, registerSchema, refreshTokenSchema } from '../validators/schemas';
import { AppError } from '../middleware/errorHandler';
import { logger } from '../utils/logger';

const router = Router();

// ── In-Memory User Store ────────────────────────────────────────────────────

interface UserRecord {
  id: string;
  email: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
  role: 'PATIENT' | 'DOCTOR' | 'ADMIN';
  avatar: string | null;
  phone: string | null;
  isActive: boolean;
  lastLoginAt: Date | null;
  createdAt: Date;
}

interface RefreshTokenRecord {
  id: string;
  token: string;
  userId: string;
  expiresAt: Date;
}

const users: Map<string, UserRecord> = new Map();
const refreshTokens: Map<string, RefreshTokenRecord> = new Map();

// ── Seed demo users ─────────────────────────────────────────────────────────

async function seedDemoUsers() {
  const hash = await bcrypt.hash('Password@123', 10);

  const demoUsers: UserRecord[] = [
    {
      id: uuidv4(),
      email: 'patient@healthsphere.ai',
      passwordHash: hash,
      firstName: 'Sarah',
      lastName: 'Mitchell',
      role: 'PATIENT',
      avatar: null,
      phone: '+1-555-0101',
      isActive: true,
      lastLoginAt: null,
      createdAt: new Date(),
    },
    {
      id: uuidv4(),
      email: 'doctor@healthsphere.ai',
      passwordHash: hash,
      firstName: 'Julian',
      lastName: 'Vance',
      role: 'DOCTOR',
      avatar: null,
      phone: '+1-555-0102',
      isActive: true,
      lastLoginAt: null,
      createdAt: new Date(),
    },
    {
      id: uuidv4(),
      email: 'admin@healthsphere.ai',
      passwordHash: hash,
      firstName: 'Aria',
      lastName: 'Blackwood',
      role: 'ADMIN',
      avatar: null,
      phone: '+1-555-0103',
      isActive: true,
      lastLoginAt: null,
      createdAt: new Date(),
    },
  ];

  for (const u of demoUsers) {
    users.set(u.email, u);
  }

  logger.info('Demo users seeded', {
    accounts: demoUsers.map((u) => `${u.email} (${u.role})`),
    password: 'Password@123',
  });
}

seedDemoUsers();

// ── Helper: Generate tokens ─────────────────────────────────────────────────

function generateAccessToken(user: { id: string; email: string; role: string }): string {
  return jwt.sign(
    { userId: user.id, email: user.email, role: user.role },
    config.jwtSecret,
    { expiresIn: '24h' },
  );
}

function generateRefreshToken(userId: string): string {
  const token = uuidv4();
  const id = uuidv4();
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  refreshTokens.set(token, { id, token, userId, expiresAt });
  return token;
}

// ── POST /api/auth/register ─────────────────────────────────────────────────

router.post('/register', validate(registerSchema), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password, firstName, lastName, role, phone } = req.body;

    // Check unique email
    if (users.has(email)) {
      throw new AppError('Email is already registered.', 409, 'EMAIL_EXISTS');
    }

    const passwordHash = await bcrypt.hash(password, config.bcryptSaltRounds);
    const id = uuidv4();

    const newUser: UserRecord = {
      id,
      email,
      passwordHash,
      firstName,
      lastName,
      role,
      avatar: null,
      phone: phone || null,
      isActive: true,
      lastLoginAt: null,
      createdAt: new Date(),
    };

    users.set(email, newUser);

    const accessToken = generateAccessToken(newUser);
    const refreshToken = generateRefreshToken(newUser.id);

    logger.info('User registered', { userId: newUser.id, role });

    res.status(201).json({
      success: true,
      data: {
        user: {
          id: newUser.id,
          email: newUser.email,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          role: newUser.role,
          isActive: newUser.isActive,
        },
        tokens: { accessToken, refreshToken },
      },
    });
  } catch (error) {
    next(error);
  }
});

// ── POST /api/auth/login ────────────────────────────────────────────────────

router.post('/login', validate(loginSchema), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    const user = users.get(email);
    if (!user) {
      throw new AppError('Invalid email or password.', 401, 'INVALID_CREDENTIALS');
    }

    if (!user.isActive) {
      throw new AppError('Account has been deactivated.', 403, 'ACCOUNT_DEACTIVATED');
    }

    const isValidPassword = await bcrypt.compare(password, user.passwordHash);
    if (!isValidPassword) {
      throw new AppError('Invalid email or password.', 401, 'INVALID_CREDENTIALS');
    }

    user.lastLoginAt = new Date();

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user.id);

    logger.info('User logged in', { userId: user.id, role: user.role });

    res.json({
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
          avatar: user.avatar,
          isActive: user.isActive,
        },
        tokens: { accessToken, refreshToken },
      },
    });
  } catch (error) {
    next(error);
  }
});

// ── POST /api/auth/refresh ──────────────────────────────────────────────────

router.post('/refresh', validate(refreshTokenSchema), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { refreshToken: token } = req.body;

    const stored = refreshTokens.get(token);
    if (!stored || stored.expiresAt < new Date()) {
      if (stored) refreshTokens.delete(token);
      throw new AppError('Invalid or expired refresh token.', 401, 'INVALID_REFRESH_TOKEN');
    }

    // Find user by ID
    let foundUser: UserRecord | null = null;
    for (const u of users.values()) {
      if (u.id === stored.userId) { foundUser = u; break; }
    }
    if (!foundUser) {
      throw new AppError('User not found.', 404, 'USER_NOT_FOUND');
    }

    // Rotate
    refreshTokens.delete(token);
    const newAccessToken = generateAccessToken(foundUser);
    const newRefreshToken = generateRefreshToken(foundUser.id);

    res.json({
      success: true,
      data: { tokens: { accessToken: newAccessToken, refreshToken: newRefreshToken } },
    });
  } catch (error) {
    next(error);
  }
});

// ── POST /api/auth/logout ───────────────────────────────────────────────────

router.post('/logout', authenticate, async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Remove all refresh tokens for user
    for (const [key, val] of refreshTokens.entries()) {
      if (val.userId === req.user!.userId) refreshTokens.delete(key);
    }

    logger.info('User logged out', { userId: req.user?.userId });
    res.json({ success: true, data: { message: 'Logged out successfully.' } });
  } catch (error) {
    next(error);
  }
});

// ── GET /api/auth/me ────────────────────────────────────────────────────────

router.get('/me', authenticate, async (req: Request, res: Response, next: NextFunction) => {
  try {
    let foundUser: UserRecord | null = null;
    for (const u of users.values()) {
      if (u.id === req.user!.userId) { foundUser = u; break; }
    }

    if (!foundUser) {
      throw new AppError('User not found.', 404, 'USER_NOT_FOUND');
    }

    res.json({
      success: true,
      data: {
        id: foundUser.id,
        email: foundUser.email,
        firstName: foundUser.firstName,
        lastName: foundUser.lastName,
        role: foundUser.role,
        avatar: foundUser.avatar,
        phone: foundUser.phone,
        isActive: foundUser.isActive,
        createdAt: foundUser.createdAt.toISOString(),
        patientProfile: foundUser.role === 'PATIENT' ? {
          dateOfBirth: '1994-06-15',
          gender: 'FEMALE',
          bloodType: 'A_POSITIVE',
          heightCm: 165,
          weightKg: 62,
          allergies: ['Penicillin'],
          chronicConditions: [],
        } : null,
        doctorProfile: foundUser.role === 'DOCTOR' ? {
          specialization: 'Neurosurgeon',
          licenseNumber: 'MD-2024-0042',
          yearsOfExperience: 14,
          consultationFee: 250,
          bio: 'Board-certified neurosurgeon with 14 years of experience.',
          hospital: 'Global Health Institute',
          isAvailable: true,
          rating: 4.9,
        } : null,
      },
    });
  } catch (error) {
    next(error);
  }
});

export { router as authRoutes };
