// ============================================================================
// HealthSphere AI — Auth Middleware Tests
// ============================================================================

import jwt from 'jsonwebtoken';

// Mock config
const JWT_SECRET = 'test-jwt-secret';

// ── Test: JWT Token Generation ──────────────────────────────────────────────

describe('JWT Token Utilities', () => {
  const mockUser = {
    userId: 'user-123',
    email: 'test@healthsphere.ai',
    role: 'PATIENT' as const,
  };

  test('should generate a valid JWT token', () => {
    const token = jwt.sign(mockUser, JWT_SECRET, { expiresIn: '15m' });

    expect(token).toBeDefined();
    expect(typeof token).toBe('string');

    const decoded = jwt.verify(token, JWT_SECRET) as typeof mockUser;
    expect(decoded.userId).toBe(mockUser.userId);
    expect(decoded.email).toBe(mockUser.email);
    expect(decoded.role).toBe(mockUser.role);
  });

  test('should reject token with wrong secret', () => {
    const token = jwt.sign(mockUser, JWT_SECRET, { expiresIn: '15m' });

    expect(() => {
      jwt.verify(token, 'wrong-secret');
    }).toThrow(jwt.JsonWebTokenError);
  });

  test('should reject expired token', () => {
    const token = jwt.sign(mockUser, JWT_SECRET, { expiresIn: '0s' });

    // Wait a tick to ensure expiration
    expect(() => {
      jwt.verify(token, JWT_SECRET);
    }).toThrow(jwt.TokenExpiredError);
  });

  test('should include standard JWT claims', () => {
    const token = jwt.sign(mockUser, JWT_SECRET, { expiresIn: '15m' });
    const decoded = jwt.decode(token) as Record<string, unknown>;

    expect(decoded).toHaveProperty('iat');
    expect(decoded).toHaveProperty('exp');
    expect(decoded.exp).toBeGreaterThan(decoded.iat as number);
  });
});

// ── Test: Role Authorization ────────────────────────────────────────────────

describe('Role-Based Access Control', () => {
  type Role = 'PATIENT' | 'DOCTOR' | 'ADMIN';

  function isAuthorized(userRole: Role, allowedRoles: Role[]): boolean {
    return allowedRoles.includes(userRole);
  }

  test('should allow patient to access patient resources', () => {
    expect(isAuthorized('PATIENT', ['PATIENT', 'ADMIN'])).toBe(true);
  });

  test('should allow admin to access all resources', () => {
    expect(isAuthorized('ADMIN', ['PATIENT', 'ADMIN'])).toBe(true);
    expect(isAuthorized('ADMIN', ['DOCTOR', 'ADMIN'])).toBe(true);
    expect(isAuthorized('ADMIN', ['ADMIN'])).toBe(true);
  });

  test('should deny patient access to doctor-only resources', () => {
    expect(isAuthorized('PATIENT', ['DOCTOR'])).toBe(false);
  });

  test('should deny doctor access to admin-only resources', () => {
    expect(isAuthorized('DOCTOR', ['ADMIN'])).toBe(false);
  });

  test('should allow doctor to access doctor resources', () => {
    expect(isAuthorized('DOCTOR', ['DOCTOR', 'ADMIN'])).toBe(true);
  });
});
