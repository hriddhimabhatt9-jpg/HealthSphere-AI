// ============================================================================
// HealthSphere AI — Health Utility Functions
// BMI, BMR calculations and health metric helpers
// ============================================================================

/**
 * Calculate Body Mass Index (BMI)
 * Formula: weight(kg) / height(m)²
 */
export function calculateBMI(weightKg: number, heightCm: number): number {
  if (heightCm <= 0 || weightKg <= 0) return 0;
  const heightM = heightCm / 100;
  return Math.round((weightKg / (heightM * heightM)) * 10) / 10;
}

/**
 * Get BMI category based on WHO classification
 */
export function getBMICategory(bmi: number): 'Underweight' | 'Normal' | 'Overweight' | 'Obese' {
  if (bmi < 18.5) return 'Underweight';
  if (bmi < 25) return 'Normal';
  if (bmi < 30) return 'Overweight';
  return 'Obese';
}

/**
 * Calculate Basal Metabolic Rate (BMR)
 * Mifflin-St Jeor Equation — most accurate for most populations
 * Men:   (10 × weight in kg) + (6.25 × height in cm) − (5 × age) + 5
 * Women: (10 × weight in kg) + (6.25 × height in cm) − (5 × age) − 161
 */
export function calculateBMR(
  weightKg: number,
  heightCm: number,
  ageYears: number,
  gender: 'male' | 'female',
): number {
  if (weightKg <= 0 || heightCm <= 0 || ageYears <= 0) return 0;
  const base = 10 * weightKg + 6.25 * heightCm - 5 * ageYears;
  return Math.round(gender === 'male' ? base + 5 : base - 161);
}

/**
 * Get overall health score based on metrics (simplified)
 */
export function getHealthScore(bmi: number, heartRate?: number, bpSystolic?: number): number {
  let score = 100;

  // BMI penalty
  if (bmi < 18.5 || bmi > 30) score -= 20;
  else if (bmi < 20 || bmi > 25) score -= 10;

  // Heart rate
  if (heartRate) {
    if (heartRate < 50 || heartRate > 100) score -= 15;
    else if (heartRate < 60 || heartRate > 90) score -= 5;
  }

  // Blood pressure
  if (bpSystolic) {
    if (bpSystolic > 140 || bpSystolic < 90) score -= 15;
    else if (bpSystolic > 130) score -= 8;
  }

  return Math.max(0, Math.min(100, score));
}

/**
 * Format relative time (e.g., "2 hours ago")
 */
export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins} min ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

/**
 * Get greeting based on time of day
 */
export function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}
