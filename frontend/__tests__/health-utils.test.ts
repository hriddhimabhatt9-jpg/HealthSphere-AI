// ============================================================================
// HealthSphere AI — Health Utility Tests
// ============================================================================

import {
  calculateBMI,
  getBMICategory,
  calculateBMR,
  getHealthScore,
  formatRelativeTime,
  getGreeting,
} from '../src/lib/health-utils';

describe('calculateBMI', () => {
  test('should calculate BMI correctly for normal weight', () => {
    const bmi = calculateBMI(70, 175);
    expect(bmi).toBeCloseTo(22.9, 1);
  });

  test('should calculate BMI correctly for underweight', () => {
    const bmi = calculateBMI(50, 175);
    expect(bmi).toBeCloseTo(16.3, 1);
  });

  test('should calculate BMI correctly for overweight', () => {
    const bmi = calculateBMI(90, 170);
    expect(bmi).toBeCloseTo(31.1, 1);
  });

  test('should return 0 for invalid inputs', () => {
    expect(calculateBMI(0, 175)).toBe(0);
    expect(calculateBMI(70, 0)).toBe(0);
    expect(calculateBMI(-70, 175)).toBe(0);
  });
});

describe('getBMICategory', () => {
  test('should categorize underweight correctly', () => {
    expect(getBMICategory(16)).toBe('Underweight');
    expect(getBMICategory(18.4)).toBe('Underweight');
  });

  test('should categorize normal correctly', () => {
    expect(getBMICategory(18.5)).toBe('Normal');
    expect(getBMICategory(22)).toBe('Normal');
    expect(getBMICategory(24.9)).toBe('Normal');
  });

  test('should categorize overweight correctly', () => {
    expect(getBMICategory(25)).toBe('Overweight');
    expect(getBMICategory(29.9)).toBe('Overweight');
  });

  test('should categorize obese correctly', () => {
    expect(getBMICategory(30)).toBe('Obese');
    expect(getBMICategory(40)).toBe('Obese');
  });
});

describe('calculateBMR', () => {
  test('should calculate BMR for male', () => {
    const bmr = calculateBMR(70, 175, 30, 'male');
    // 10*70 + 6.25*175 - 5*30 + 5 = 700 + 1093.75 - 150 + 5 = 1648.75 → 1649
    expect(bmr).toBeCloseTo(1649, 0);
  });

  test('should calculate BMR for female', () => {
    const bmr = calculateBMR(60, 165, 25, 'female');
    // 10*60 + 6.25*165 - 5*25 - 161 = 600 + 1031.25 - 125 - 161 = 1345.25 → 1345
    expect(bmr).toBeCloseTo(1345, 0);
  });

  test('should return 0 for invalid inputs', () => {
    expect(calculateBMR(0, 175, 30, 'male')).toBe(0);
    expect(calculateBMR(70, 0, 30, 'male')).toBe(0);
    expect(calculateBMR(70, 175, 0, 'male')).toBe(0);
  });
});

describe('getHealthScore', () => {
  test('should return 100 for perfect metrics', () => {
    const score = getHealthScore(22, 70, 120);
    expect(score).toBe(100);
  });

  test('should penalize high BMI', () => {
    const score = getHealthScore(35, 70, 120);
    expect(score).toBeLessThan(100);
  });

  test('should penalize high heart rate', () => {
    const score = getHealthScore(22, 110, 120);
    expect(score).toBeLessThan(100);
  });

  test('should penalize high blood pressure', () => {
    const score = getHealthScore(22, 70, 150);
    expect(score).toBeLessThan(100);
  });

  test('should never go below 0', () => {
    const score = getHealthScore(40, 120, 200);
    expect(score).toBeGreaterThanOrEqual(0);
  });

  test('should never exceed 100', () => {
    const score = getHealthScore(22, 70, 115);
    expect(score).toBeLessThanOrEqual(100);
  });
});

describe('formatRelativeTime', () => {
  test('should return "Just now" for recent times', () => {
    const result = formatRelativeTime(new Date().toISOString());
    expect(result).toBe('Just now');
  });

  test('should return minutes ago for times under an hour', () => {
    const fiveMinAgo = new Date(Date.now() - 5 * 60000).toISOString();
    expect(formatRelativeTime(fiveMinAgo)).toBe('5 min ago');
  });

  test('should return hours for times under a day', () => {
    const threeHoursAgo = new Date(Date.now() - 3 * 3600000).toISOString();
    expect(formatRelativeTime(threeHoursAgo)).toBe('3h ago');
  });

  test('should return days for times under a week', () => {
    const twoDaysAgo = new Date(Date.now() - 2 * 86400000).toISOString();
    expect(formatRelativeTime(twoDaysAgo)).toBe('2d ago');
  });
});

describe('getGreeting', () => {
  test('should return a string', () => {
    const greeting = getGreeting();
    expect(typeof greeting).toBe('string');
    expect(['Good morning', 'Good afternoon', 'Good evening']).toContain(greeting);
  });
});
