export interface Message {
  id: string;
  content: string;
  timestamp: Date;
  sender: 'agent' | 'customer';
  emotion: EmotionType;
  emotionConfidence: number;
  complianceFlags: ComplianceFlag[];
}

export interface Conversation {
  id: string;
  customerName: string;
  agentName: string;
  startTime: Date;
  endTime?: Date;
  status: 'active' | 'completed' | 'escalated';
  messages: Message[];
  overallComplianceScore: number;
  primaryEmotion: EmotionType;
}

export interface ComplianceRule {
  id: string;
  name: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  category: 'language' | 'procedure' | 'data' | 'ethical';
}

export interface ComplianceFlag {
  ruleId: string;
  ruleName: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  suggestion?: string;
}

export type EmotionType = 
  | 'happy' 
  | 'neutral' 
  | 'frustrated' 
  | 'angry' 
  | 'confused' 
  | 'satisfied' 
  | 'concerned'
  | 'excited';

export interface AnalyticsData {
  complianceOverview: {
    totalConversations: number;
    compliantPercentage: number;
    averageScore: number;
    topViolations: Array<{
      ruleName: string;
      count: number;
      severity: string;
    }>;
  };
  emotionBreakdown: {
    [key in EmotionType]: number;
  };
  trendsData: Array<{
    date: string;
    complianceScore: number;
    emotionScore: number;
  }>;
}