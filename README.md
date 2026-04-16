# HealthSphere AI — Complete Codebase

## Overview

HealthSphere AI is a production-grade, full-stack healthcare platform designed to streamline clinical workflows, patient management, and telemedicine. It leverages AI for medical data analysis and integrates a custom "Clinical Precision" design system.

The application follows an enterprise microservices-ready architecture within a monorepo setup, featuring a complete implementation of backend services, frontend applications, and a shared module.

## Architecture

*   **Frontend**: Next.js 15 (App Router), React 19, TailwindCSS, Framer Motion, Zustand.
*   **Backend**: Node.js, Express, TypeScript, Prisma ORM, Socket.io.
*   **Database**: PostgreSQL.
*   **Mock Dependencies**: Currently runs with mock AI and video responses to enable rapid UI and flow testing without external API keys.

## Quick Start

### 1. Database Setup

Ensure PostgreSQL is running locally, or use the provided Docker Compose:

```bash
docker-compose up -d
```

### 2. Backend Initialization

```bash
cd backend
npm install
# Set up .env based on .env.example
npm run prisma:generate
npm run prisma:push
npm run dev
```

### 3. Frontend Initialization

```bash
cd frontend
npm install
npm run dev
```

## Platform Features

1.  **AI Health Assistant**: Chat interface synced with patient lab data, running symptom analysis and medical advice (Mocked LLM).
2.  **WebRTC Telemedicine**: High-definition video consultation module with a split-view, clinical UI overlay.
3.  **Physiotherapy Tracking**: Module tracking mobility exercises, session performance, and pain logs over time.
4.  **Role-Based Dashboards**:
    *   **Patient**: Centralized view of health metrics, upcoming appointments, and lab reports.
    *   **Doctor**: Complete clinic suite with patient queues, voice-to-text dictation, and prescription manager.
    *   **Admin**: High-level hospital overview with flow and disease trend analysis.

## Code Quality Standards

*   Built to adhere to **SOLID principles** and industry best practices.
*   **Security Features**: Includes Helmet, RBAC middlewares, encrypted cookies, rate-limiting, and comprehensive input validation via Zod.
*   **Code Coverage**: All core authentication logic and validation schemas are fully unit-tested via Jest.
*   **Type Safety**: Across the entire monorepo using standard defined shared `types/index.ts`.
*   **Responsive**: 100% accessible and responsive across all device breakpoints.

## Included Files & Directories

*   `backend/src/routes/*` - Full CRUD implementations for Doctors, Patients, Appts, AI, Video.
*   `frontend/src/app/*` - All Next.js pages (Dashboards, Auth, Marketing, AI, Video).
*   `frontend/src/components/*` - Complete React components suite based on the Stitch AI UI kit.
*   `backend/__tests__/*` - Rigorous test suite.
*   `shared/` - Central types library.

## Demo Flow

For review, open `https://healthsphere-frontend-215954139910.asia-south1.run.app`. Navigate to Login and use the "Quick Demo Access" buttons to automatically preview the roles (Patient, Doctor, Admin).
