// ============================================================================
// HealthSphere AI — Environment Configuration
// Centralized, validated configuration with secure defaults
// ============================================================================

import dotenv from 'dotenv';

dotenv.config();

function getEnvVar(key: string, defaultValue?: string): string {
  const value = process.env[key] ?? defaultValue;
  if (value === undefined) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}

function getEnvVarAsInt(key: string, defaultValue: number): number {
  const value = process.env[key];
  return value ? parseInt(value, 10) : defaultValue;
}

export const config = {
  // Server
  nodeEnv: getEnvVar('NODE_ENV', 'development'),
  port: getEnvVarAsInt('PORT', 5000),
  
  // Database
  databaseUrl: getEnvVar('DATABASE_URL', 'postgresql://postgres:postgres@localhost:5432/healthsphere'),
  
  // JWT
  jwtSecret: getEnvVar('JWT_SECRET', 'dev-jwt-secret-change-in-production-healthsphere-2024'),
  jwtExpiresIn: getEnvVar('JWT_EXPIRES_IN', '15m'),
  refreshTokenExpiresIn: getEnvVar('REFRESH_TOKEN_EXPIRES_IN', '7d'),
  
  // CORS
  corsOrigin: getEnvVar('CORS_ORIGIN', 'http://localhost:3000'),
  
  // Cookies
  cookieSecret: getEnvVar('COOKIE_SECRET', 'dev-cookie-secret-change-in-production'),
  
  // Google OAuth
  googleClientId: getEnvVar('GOOGLE_CLIENT_ID', ''),
  googleClientSecret: getEnvVar('GOOGLE_CLIENT_SECRET', ''),
  
  // AI / LLM
  llmApiKey: getEnvVar('LLM_API_KEY', ''),
  llmEndpoint: getEnvVar('LLM_ENDPOINT', 'https://api.openai.com/v1/chat/completions'),
  
  // Rate Limiting
  rateLimitWindowMs: getEnvVarAsInt('RATE_LIMIT_WINDOW_MS', 15 * 60 * 1000),
  rateLimitMax: getEnvVarAsInt('RATE_LIMIT_MAX', 100),
  
  // Bcrypt
  bcryptSaltRounds: getEnvVarAsInt('BCRYPT_SALT_ROUNDS', 12),
} as const;

export type Config = typeof config;
