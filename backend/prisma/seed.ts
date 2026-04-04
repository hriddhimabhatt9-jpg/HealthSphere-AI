// ============================================================================
// HealthSphere AI — Database Seed Script
// Populates PostgreSQL with realistic demo data for all roles
// Run: npm run db:seed
// ============================================================================

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const SALT_ROUNDS = 12;

async function main() {
  console.log('🌱 Seeding HealthSphere AI database...\n');

  // ── Clean existing data (order matters due to FK constraints) ────────────
  await prisma.chatMessage.deleteMany();
  await prisma.physiotherapySession.deleteMany();
  await prisma.videoSession.deleteMany();
  await prisma.medicineReminder.deleteMany();
  await prisma.prescription.deleteMany();
  await prisma.medicalRecord.deleteMany();
  await prisma.appointment.deleteMany();
  await prisma.timeSlot.deleteMany();
  await prisma.refreshToken.deleteMany();
  await prisma.doctorProfile.deleteMany();
  await prisma.patientProfile.deleteMany();
  await prisma.hospital.deleteMany();
  await prisma.user.deleteMany();

  console.log('  ✓ Cleaned existing data');

  // ── Hash password ────────────────────────────────────────────────────────
  const passwordHash = await bcrypt.hash('Password@123', SALT_ROUNDS);

  // ── Create Users ─────────────────────────────────────────────────────────

  const patient = await prisma.user.create({
    data: {
      email: 'patient@healthsphere.ai',
      passwordHash,
      firstName: 'Aris',
      lastName: 'Patel',
      role: 'PATIENT',
      phone: '+1-555-0101',
      avatar: null,
      isActive: true,
      patientProfile: {
        create: {
          dateOfBirth: new Date('1994-06-15'),
          gender: 'MALE',
          bloodType: 'O_POSITIVE',
          heightCm: 178,
          weightKg: 74.5,
          allergies: ['Penicillin', 'Shellfish'],
          chronicConditions: ['Mild Asthma'],
          emergencyContactName: 'Priya Patel',
          emergencyContactPhone: '+1-555-0102',
          insuranceProvider: 'BlueCross BlueShield',
          insuranceId: 'BCB-2024-98765',
        },
      },
    },
  });

  const patient2 = await prisma.user.create({
    data: {
      email: 'clara@healthsphere.ai',
      passwordHash,
      firstName: 'Clara',
      lastName: 'Thorne',
      role: 'PATIENT',
      phone: '+1-555-0201',
      isActive: true,
      patientProfile: {
        create: {
          dateOfBirth: new Date('1988-11-22'),
          gender: 'FEMALE',
          bloodType: 'A_NEGATIVE',
          heightCm: 165,
          weightKg: 62.0,
          allergies: ['Latex'],
          chronicConditions: ['Hypertension Stage 1'],
          emergencyContactName: 'James Thorne',
          emergencyContactPhone: '+1-555-0202',
          insuranceProvider: 'Aetna',
          insuranceId: 'AET-2024-54321',
        },
      },
    },
  });

  const patient3 = await prisma.user.create({
    data: {
      email: 'jameson@healthsphere.ai',
      passwordHash,
      firstName: 'Jameson',
      lastName: 'Wells',
      role: 'PATIENT',
      phone: '+1-555-0301',
      isActive: true,
      patientProfile: {
        create: {
          dateOfBirth: new Date('2001-03-08'),
          gender: 'MALE',
          bloodType: 'B_POSITIVE',
          heightCm: 182,
          weightKg: 81.3,
          allergies: [],
          chronicConditions: [],
          emergencyContactName: 'Rebecca Wells',
          emergencyContactPhone: '+1-555-0302',
          insuranceProvider: 'UnitedHealth',
          insuranceId: 'UH-2024-11223',
        },
      },
    },
  });

  const doctor1 = await prisma.user.create({
    data: {
      email: 'doctor@healthsphere.ai',
      passwordHash,
      firstName: 'Julian',
      lastName: 'Vance',
      role: 'DOCTOR',
      phone: '+1-555-0401',
      isActive: true,
      doctorProfile: {
        create: {
          specialization: 'Cardiology',
          licenseNumber: 'MD-NY-2015-08842',
          yearsOfExperience: 11,
          consultationFee: 250,
          bio: 'Board-certified cardiologist specializing in interventional cardiology and heart failure management. Published researcher with a focus on preventive cardiac care.',
          hospital: 'City General Hospital',
          isAvailable: true,
          rating: 4.9,
          totalPatients: 1489,
          languages: ['English', 'Spanish'],
          availableSlots: {
            create: [
              { dayOfWeek: 1, startTime: '09:00', endTime: '09:30' },
              { dayOfWeek: 1, startTime: '09:30', endTime: '10:00' },
              { dayOfWeek: 1, startTime: '10:00', endTime: '10:30' },
              { dayOfWeek: 1, startTime: '10:30', endTime: '11:00' },
              { dayOfWeek: 3, startTime: '14:00', endTime: '14:30' },
              { dayOfWeek: 3, startTime: '14:30', endTime: '15:00' },
              { dayOfWeek: 5, startTime: '09:00', endTime: '09:30' },
              { dayOfWeek: 5, startTime: '09:30', endTime: '10:00' },
            ],
          },
        },
      },
    },
  });

  const doctor2 = await prisma.user.create({
    data: {
      email: 'elena@healthsphere.ai',
      passwordHash,
      firstName: 'Elena',
      lastName: 'Rodriguez',
      role: 'DOCTOR',
      phone: '+1-555-0501',
      isActive: true,
      doctorProfile: {
        create: {
          specialization: 'Neurosurgery',
          licenseNumber: 'MD-CA-2012-05591',
          yearsOfExperience: 14,
          consultationFee: 350,
          bio: 'Neurosurgeon with expertise in minimally invasive brain and spinal procedures. Pioneering research in neural regeneration therapies.',
          hospital: 'City General Hospital',
          isAvailable: true,
          rating: 4.8,
          totalPatients: 923,
          languages: ['English', 'Portuguese'],
          availableSlots: {
            create: [
              { dayOfWeek: 2, startTime: '10:00', endTime: '10:30' },
              { dayOfWeek: 2, startTime: '10:30', endTime: '11:00' },
              { dayOfWeek: 4, startTime: '13:00', endTime: '13:30' },
              { dayOfWeek: 4, startTime: '13:30', endTime: '14:00' },
            ],
          },
        },
      },
    },
  });

  const doctor3 = await prisma.user.create({
    data: {
      email: 'michael@healthsphere.ai',
      passwordHash,
      firstName: 'Michael',
      lastName: 'Chen',
      role: 'DOCTOR',
      phone: '+1-555-0601',
      isActive: true,
      doctorProfile: {
        create: {
          specialization: 'Pediatrics',
          licenseNumber: 'MD-TX-2018-07739',
          yearsOfExperience: 8,
          consultationFee: 180,
          bio: 'Compassionate pediatrician committed to children\'s wellness. Special interest in developmental pediatrics and adolescent medicine.',
          hospital: 'Sunrise Children\'s Hospital',
          isAvailable: false,
          rating: 4.7,
          totalPatients: 654,
          languages: ['English', 'Mandarin'],
          availableSlots: {
            create: [
              { dayOfWeek: 1, startTime: '08:00', endTime: '08:30' },
              { dayOfWeek: 1, startTime: '08:30', endTime: '09:00' },
              { dayOfWeek: 3, startTime: '08:00', endTime: '08:30' },
            ],
          },
        },
      },
    },
  });

  const admin = await prisma.user.create({
    data: {
      email: 'admin@healthsphere.ai',
      passwordHash,
      firstName: 'Sarah',
      lastName: 'Vance',
      role: 'ADMIN',
      phone: '+1-555-0701',
      isActive: true,
    },
  });

  console.log('  ✓ Created 7 users (3 patients, 3 doctors, 1 admin)');

  // ── Create Appointments ──────────────────────────────────────────────────

  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(now.getDate() + 1);
  const nextWeek = new Date(now);
  nextWeek.setDate(now.getDate() + 7);
  const lastWeek = new Date(now);
  lastWeek.setDate(now.getDate() - 7);

  const appt1 = await prisma.appointment.create({
    data: {
      patientId: patient.id,
      doctorId: doctor1.id,
      type: 'VIDEO',
      status: 'SCHEDULED',
      scheduledAt: tomorrow,
      duration: 30,
      notes: 'Follow-up on recent cholesterol panel results',
    },
  });

  await prisma.appointment.create({
    data: {
      patientId: patient2.id,
      doctorId: doctor2.id,
      type: 'IN_PERSON',
      status: 'CONFIRMED',
      scheduledAt: nextWeek,
      duration: 45,
      notes: 'New patient intake — persistent migraines',
    },
  });

  await prisma.appointment.create({
    data: {
      patientId: patient3.id,
      doctorId: doctor1.id,
      type: 'IN_PERSON',
      status: 'COMPLETED',
      scheduledAt: lastWeek,
      duration: 30,
      notes: 'Routine cardiac screening — cleared',
    },
  });

  await prisma.appointment.create({
    data: {
      patientId: patient.id,
      doctorId: doctor3.id,
      type: 'IN_PERSON',
      status: 'SCHEDULED',
      scheduledAt: new Date(nextWeek.getTime() + 2 * 24 * 60 * 60 * 1000),
      duration: 30,
    },
  });

  console.log('  ✓ Created 4 appointments');

  // ── Create Medical Records ───────────────────────────────────────────────

  await prisma.medicalRecord.createMany({
    data: [
      {
        patientId: patient.id,
        doctorId: doctor1.id,
        title: 'Annual Flu Shot administered',
        description: 'Administered by Dr. Julian Vance at City General. No adverse reactions observed.',
        type: 'VACCINATION',
        attachments: [],
      },
      {
        patientId: patient.id,
        doctorId: doctor1.id,
        title: 'Blood Pressure Check',
        description: 'Reading: 120/80 mmHg [Perfectly normal range]. Advised continued daily exercise.',
        type: 'CONSULTATION',
        attachments: [],
      },
      {
        patientId: patient.id,
        doctorId: doctor1.id,
        title: 'Comprehensive Metabolic Panel',
        description: 'Fasting glucose: 108 mg/dL (slightly elevated). Total cholesterol: 195 mg/dL. LDL: 118 mg/dL. HDL: 52 mg/dL.',
        diagnosis: 'Pre-diabetic markers detected — recommending dietary changes and follow-up in 90 days.',
        type: 'LAB_RESULT',
        attachments: ['Blood_Test_Sept_2024.pdf'],
      },
      {
        patientId: patient2.id,
        doctorId: doctor2.id,
        title: 'MRI Brain Scan',
        description: 'Performed MRI to investigate recurring headaches. No abnormalities detected.',
        type: 'IMAGING',
        attachments: ['MRI_Brain_Scan_Results.zip'],
      },
    ],
  });

  console.log('  ✓ Created 4 medical records');

  // ── Create Prescriptions ─────────────────────────────────────────────────

  await prisma.prescription.create({
    data: {
      patientId: patient.id,
      doctorId: doctor1.id,
      medications: [
        { name: 'Atorvastatin', dosage: '10mg', frequency: 'Once daily after dinner', duration: '90 days', notes: 'Take with food' },
        { name: 'Vitamin D3', dosage: '2000 IU', frequency: 'Once daily with lunch', duration: '180 days' },
      ],
      instructions: 'Take Atorvastatin at the same time every evening. Report any muscle pain immediately. Follow-up blood work in 3 months.',
      isActive: true,
      expiresAt: new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000),
    },
  });

  console.log('  ✓ Created 1 prescription');

  // ── Create Medicine Reminders ────────────────────────────────────────────

  await prisma.medicineReminder.createMany({
    data: [
      {
        userId: patient.id,
        medicineName: 'Atorvastatin',
        dosage: '10mg',
        frequency: 'After dinner',
        times: ['20:00'],
        isActive: true,
      },
      {
        userId: patient.id,
        medicineName: 'Vitamin D3',
        dosage: '2000 IU',
        frequency: 'During lunch',
        times: ['12:30'],
        isActive: true,
      },
      {
        userId: patient.id,
        medicineName: 'Albuterol Inhaler',
        dosage: '2 puffs',
        frequency: 'As needed',
        times: ['08:00'],
        isActive: true,
      },
    ],
  });

  console.log('  ✓ Created 3 medicine reminders');

  // ── Create Chat History ──────────────────────────────────────────────────

  await prisma.chatMessage.createMany({
    data: [
      {
        userId: patient.id,
        role: 'assistant',
        content: "Hello Aris! I've finished syncing your latest laboratory results. Would you like me to analyze the trends in your cholesterol levels or discuss your recent sleep data from your wearable?",
        metadata: { type: 'general' },
      },
      {
        userId: patient.id,
        role: 'user',
        content: "Please analyze my latest blood report. I noticed a few markers were highlighted in red and I'm a bit concerned about the glucose levels.",
        metadata: null,
      },
      {
        userId: patient.id,
        role: 'assistant',
        content: "I've pulled up your Metabolic Panel from September. Here is a summary of the key findings regarding your glucose levels:",
        metadata: {
          type: 'lab_analysis',
          labData: { title: 'Fasting Glucose', value: 108, unit: 'mg/dL', referenceRange: '70-99 mg/dL', status: 'attention' },
        },
      },
    ],
  });

  console.log('  ✓ Created 3 chat messages');

  // ── Create Physiotherapy Sessions ────────────────────────────────────────

  const daysAgo = (n: number) => new Date(now.getTime() - n * 24 * 60 * 60 * 1000);

  await prisma.physiotherapySession.createMany({
    data: [
      { userId: patient.id, exerciseName: 'Neck Tilts', category: 'STRETCHING', duration: 300, reps: 15, sets: 3, painLevel: 2, completedAt: daysAgo(1) },
      { userId: patient.id, exerciseName: 'Wall Push-ups', category: 'STRENGTHENING', duration: 420, reps: 12, sets: 3, painLevel: 3, completedAt: daysAgo(2) },
      { userId: patient.id, exerciseName: 'Single-Leg Stand', category: 'BALANCE', duration: 240, reps: 10, sets: 2, painLevel: 1, completedAt: daysAgo(3) },
      { userId: patient.id, exerciseName: 'Shoulder Circles', category: 'MOBILITY', duration: 180, reps: 20, sets: 2, painLevel: 1, completedAt: daysAgo(4) },
      { userId: patient.id, exerciseName: 'Hamstring Stretch', category: 'STRETCHING', duration: 360, reps: 10, sets: 3, painLevel: 2, completedAt: daysAgo(5) },
    ],
  });

  console.log('  ✓ Created 5 physiotherapy sessions');

  // ── Create Video Session ─────────────────────────────────────────────────

  await prisma.videoSession.create({
    data: {
      appointmentId: appt1.id,
      patientId: patient.id,
      doctorId: doctor1.id,
      roomId: 'room-demo-001',
      status: 'WAITING',
    },
  });

  console.log('  ✓ Created 1 video session');

  // ── Create Hospitals ─────────────────────────────────────────────────────

  await prisma.hospital.createMany({
    data: [
      {
        name: 'City General Hospital',
        address: '450 Medical Center Dr, New York, NY 10016',
        phone: '+1-212-555-0100',
        email: 'info@citygeneralhospital.com',
        latitude: 40.7425,
        longitude: -73.9780,
        totalBeds: 620,
        availableBeds: 98,
        departments: ['Cardiology', 'Neurology', 'Oncology', 'Pediatrics', 'Orthopedics', 'Emergency', 'Radiology'],
        rating: 4.6,
      },
      {
        name: 'Sunrise Children\'s Hospital',
        address: '1200 Pediatric Blvd, New York, NY 10029',
        phone: '+1-212-555-0200',
        email: 'care@sunrisechildrens.com',
        latitude: 40.7900,
        longitude: -73.9520,
        totalBeds: 280,
        availableBeds: 45,
        departments: ['Neonatology', 'Pediatric Surgery', 'Pediatric Oncology', 'Developmental Medicine'],
        rating: 4.8,
      },
      {
        name: 'Harbor View Medical Center',
        address: '800 Waterfront Ave, Brooklyn, NY 11201',
        phone: '+1-718-555-0300',
        email: 'contact@harborviewmc.com',
        latitude: 40.6892,
        longitude: -73.9857,
        totalBeds: 410,
        availableBeds: 72,
        departments: ['Cardiology', 'Gastroenterology', 'Psychiatry', 'Emergency', 'Physical Therapy'],
        rating: 4.4,
      },
    ],
  });

  console.log('  ✓ Created 3 hospitals');

  console.log('\n✅ Database seeded successfully!');
  console.log('\n📋 Demo login credentials (all use password: Password@123):');
  console.log('   Patient : patient@healthsphere.ai');
  console.log('   Doctor  : doctor@healthsphere.ai');
  console.log('   Admin   : admin@healthsphere.ai');
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
