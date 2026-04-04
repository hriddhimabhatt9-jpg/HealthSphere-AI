// ============================================================================
// HealthSphere AI — AI Health Assistant Routes
// LLM-ready API integration layer with mock responses
// ============================================================================

import { Router, Request, Response, NextFunction } from 'express';
import { authenticate } from '../middleware/auth.middleware';
import { validate } from '../middleware/validation.middleware';
import { chatMessageSchema } from '../validators/schemas';

const router = Router();

// ── Mock AI Responses ───────────────────────────────────────────────────────

const aiResponses: Record<string, string> = {
  default: "I'd be happy to help you with your health questions. Could you provide more details about your concern?",
  glucose: "Based on your recent lab results, your fasting glucose of 108 mg/dL is slightly above the reference range (70-99 mg/dL). This is often categorized as pre-diabetic, but could be influenced by recent diet or stress. I recommend we track your post-meal glucose for the next 3 days. Would you like me to set up a logging schedule for you?",
  headache: "Headaches can have many causes. For occasional headaches, ensure adequate hydration (8 glasses/day), regular sleep schedule, and stress management. If headaches persist for more than a week, occur with visual changes, or are severe, I recommend consulting a Neurologist. Would you like me to find one near you?",
  sleep: "For better sleep quality, I recommend: 1) Maintain a consistent sleep schedule 2) Avoid screens 1 hour before bed 3) Keep your bedroom cool (65-68°F) 4) Limit caffeine after 2 PM. If sleep issues persist beyond 2 weeks, consider consulting a Sleep Medicine specialist.",
};

function getAIResponse(message: string): string {
  const lower = message.toLowerCase();
  if (lower.includes('glucose') || lower.includes('blood') || lower.includes('sugar')) return aiResponses.glucose;
  if (lower.includes('headache') || lower.includes('head') || lower.includes('migraine')) return aiResponses.headache;
  if (lower.includes('sleep') || lower.includes('insomnia') || lower.includes('tired')) return aiResponses.sleep;
  return aiResponses.default;
}

// ── POST /api/ai/chat ───────────────────────────────────────────────────────

router.post('/chat', authenticate, validate(chatMessageSchema), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { message } = req.body;

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    const response = getAIResponse(message);

    res.json({
      success: true,
      data: {
        id: `msg-${Date.now()}`,
        role: 'assistant',
        content: response,
        timestamp: new Date().toISOString(),
        metadata: {
          type: 'general',
          suggestions: ['Set a logging schedule', 'Dietary recommendations', 'Find a specialist'],
        },
      },
    });
  } catch (error) {
    next(error);
  }
});

// ── GET /api/ai/history ─────────────────────────────────────────────────────

router.get('/history', authenticate, (_req: Request, res: Response) => {
  res.json({
    success: true,
    data: [
      {
        id: '1',
        role: 'assistant',
        content: "Hello Sarah! I've finished syncing your latest laboratory results. Would you like me to analyze the trends in your cholesterol levels or discuss your recent sleep data from your wearable?",
        timestamp: '2024-10-24T09:41:00Z',
        metadata: { type: 'general' },
      },
      {
        id: '2',
        role: 'user',
        content: "Please analyze my latest blood report. I noticed a few markers were highlighted in red and I'm a bit concerned about the glucose levels.",
        timestamp: '2024-10-24T09:43:00Z',
      },
      {
        id: '3',
        role: 'assistant',
        content: "I've pulled up your Metabolic Panel from June 12th. Here is a summary of the key findings regarding your glucose levels:",
        timestamp: '2024-10-24T09:43:30Z',
        metadata: {
          type: 'lab_analysis',
          labData: { title: 'Fasting Glucose', value: 108, unit: 'mg/dL', referenceRange: '70-99 mg/dL', status: 'attention' },
        },
      },
    ],
  });
});

export { router as aiRoutes };
