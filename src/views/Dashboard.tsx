import React, { useState, useEffect } from 'react';
import { MessageSquare, Shield, TrendingUp, Users } from 'lucide-react';
import { MetricCard } from '../components/Dashboard/MetricCard';
import { ComplianceChart } from '../components/Charts/ComplianceChart';
import { EmotionChart } from '../components/Charts/EmotionChart';
import { analyticsService } from '../services/analyticsService';
import { AnalyticsData } from '../types';
import { LoadingSpinner } from '../components/Common/LoadingSpinner';

export const Dashboard: React.FC = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await analyticsService.getAnalytics();
      setAnalyticsData(data);
    } catch (err) {
      setError('Failed to load analytics data');
      console.error('Error fetching analytics:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[400px]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error || !analyticsData) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="text-red-500 mb-2">Error loading dashboard data</div>
          <button 
            onClick={fetchAnalytics}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Compliance Dashboard</h1>
        <p className="text-gray-600 mt-1">Real-time monitoring and analytics for customer service compliance</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Conversations"
          value={analyticsData.complianceOverview.totalConversations}
          change="+12% from yesterday"
          changeType="positive"
          icon={MessageSquare}
          iconColor="text-primary-600"
        />
        <MetricCard
          title="Compliance Score"
          value={`${analyticsData.complianceOverview.averageScore}%`}
          change="+2.1% from last week"
          changeType="positive"
          icon={Shield}
          iconColor="text-success-600"
        />
        <MetricCard
          title="Compliant Rate"
          value={`${analyticsData.complianceOverview.compliantPercentage}%`}
          change="-0.5% from yesterday"
          changeType="negative"
          icon={Users}
          iconColor="text-blue-600"
        />
        <MetricCard
          title="Customer Satisfaction"
          value="4.7/5"
          change="+0.2 from last month"
          changeType="positive"
          icon={TrendingUp}
          iconColor="text-purple-600"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ComplianceChart data={analyticsData.trendsData} />
        <EmotionChart data={analyticsData.emotionBreakdown} />
      </div>
    </div>
  );
};