import { Conversation, AnalyticsData, EmotionType } from '../types';

export const mockConversations: Conversation[] = [
  {
    id: '1',
    customerName: 'Sarah Johnson',
    agentName: 'Mike Chen',
    startTime: new Date('2024-01-15T10:30:00'),
    endTime: new Date('2024-01-15T10:45:00'),
    status: 'completed',
    overallComplianceScore: 92,
    primaryEmotion: 'satisfied',
    messages: [
      {
        id: '1',
        content: 'Hi, I need help with my account billing issue.',
        timestamp: new Date('2024-01-15T10:30:00'),
        sender: 'customer',
        emotion: 'concerned',
        emotionConfidence: 0.78,
        complianceFlags: []
      },
      {
        id: '2',
        content: 'Hello Sarah! I\'d be happy to help you with your billing concern. Let me look into your account right away.',
        timestamp: new Date('2024-01-15T10:30:30'),
        sender: 'agent',
        emotion: 'neutral',
        emotionConfidence: 0.85,
        complianceFlags: []
      },
      {
        id: '3',
        content: 'I was charged twice for my subscription this month and I\'m really frustrated about this.',
        timestamp: new Date('2024-01-15T10:31:00'),
        sender: 'customer',
        emotion: 'frustrated',
        emotionConfidence: 0.92,
        complianceFlags: []
      },
      {
        id: '4',
        content: 'I completely understand your frustration, and I sincerely apologize for this billing error. Let me resolve this immediately for you.',
        timestamp: new Date('2024-01-15T10:31:30'),
        sender: 'agent',
        emotion: 'neutral',
        emotionConfidence: 0.88,
        complianceFlags: []
      },
      {
        id: '5',
        content: 'Thank you so much! That was resolved quickly. I really appreciate your help.',
        timestamp: new Date('2024-01-15T10:44:00'),
        sender: 'customer',
        emotion: 'satisfied',
        emotionConfidence: 0.95,
        complianceFlags: []
      }
    ]
  },
  {
    id: '2',
    customerName: 'Robert Davis',
    agentName: 'Emily Rodriguez',
    startTime: new Date('2024-01-15T11:00:00'),
    status: 'active',
    overallComplianceScore: 78,
    primaryEmotion: 'angry',
    messages: [
      {
        id: '6',
        content: 'This is absolutely ridiculous! Your service has been down for 3 hours!',
        timestamp: new Date('2024-01-15T11:00:00'),
        sender: 'customer',
        emotion: 'angry',
        emotionConfidence: 0.97,
        complianceFlags: []
      },
      {
        id: '7',
        content: 'Look, I get that you\'re upset, but there\'s not much I can do about server issues.',
        timestamp: new Date('2024-01-15T11:00:30'),
        sender: 'agent',
        emotion: 'neutral',
        emotionConfidence: 0.65,
        complianceFlags: [
          {
            ruleId: '4',
            ruleName: 'Empathy Requirement',
            severity: 'medium',
            description: 'Agent response lacks empathy and understanding',
            suggestion: 'Acknowledge the customer\'s frustration and show understanding'
          }
        ]
      },
      {
        id: '8',
        content: 'I demand to speak to your manager right now!',
        timestamp: new Date('2024-01-15T11:01:00'),
        sender: 'customer',
        emotion: 'angry',
        emotionConfidence: 0.99,
        complianceFlags: []
      }
    ]
  },
  {
    id: '3',
    customerName: 'Lisa Anderson',
    agentName: 'David Park',
    startTime: new Date('2024-01-15T09:15:00'),
    endTime: new Date('2024-01-15T09:35:00'),
    status: 'completed',
    overallComplianceScore: 96,
    primaryEmotion: 'happy',
    messages: [
      {
        id: '9',
        content: 'Hi! I just wanted to say thank you for the excellent service last week.',
        timestamp: new Date('2024-01-15T09:15:00'),
        sender: 'customer',
        emotion: 'happy',
        emotionConfidence: 0.91,
        complianceFlags: []
      },
      {
        id: '10',
        content: 'That\'s wonderful to hear! Thank you so much for taking the time to share this feedback. Is there anything else I can help you with today?',
        timestamp: new Date('2024-01-15T09:15:30'),
        sender: 'agent',
        emotion: 'happy',
        emotionConfidence: 0.89,
        complianceFlags: []
      }
    ]
  }
];

export const analyticsData: AnalyticsData = {
  complianceOverview: {
    totalConversations: 156,
    compliantPercentage: 87.2,
    averageScore: 89.4,
    topViolations: [
      { ruleName: 'Empathy Requirement', count: 12, severity: 'medium' },
      { ruleName: 'Professional Language', count: 8, severity: 'high' },
      { ruleName: 'Escalation Protocol', count: 5, severity: 'medium' },
      { ruleName: 'Data Privacy', count: 2, severity: 'critical' }
    ]
  },
  emotionBreakdown: {
    neutral: 45,
    satisfied: 28,
    frustrated: 12,
    happy: 8,
    concerned: 4,
    angry: 2,
    confused: 1,
    excited: 0
  },
  trendsData: [
    { date: '2024-01-08', complianceScore: 85, emotionScore: 72 },
    { date: '2024-01-09', complianceScore: 88, emotionScore: 75 },
    { date: '2024-01-10', complianceScore: 87, emotionScore: 78 },
    { date: '2024-01-11', complianceScore: 91, emotionScore: 80 },
    { date: '2024-01-12', complianceScore: 89, emotionScore: 82 },
    { date: '2024-01-13', complianceScore: 92, emotionScore: 79 },
    { date: '2024-01-14', complianceScore: 90, emotionScore: 81 },
    { date: '2024-01-15', complianceScore: 89, emotionScore: 83 }
  ]
};