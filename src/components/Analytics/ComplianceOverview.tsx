import React from 'react';
import { TrendingUp, TrendingDown, Shield, AlertTriangle } from 'lucide-react';
import { AnalyticsData } from '../../types';

interface ComplianceOverviewProps {
  data: AnalyticsData['complianceOverview'];
}

export const ComplianceOverview: React.FC<ComplianceOverviewProps> = ({ data }) => {
  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical': return <AlertTriangle className="w-4 h-4 text-danger-600" />;
      case 'high': return <AlertTriangle className="w-4 h-4 text-warning-600" />;
      case 'medium': return <Shield className="w-4 h-4 text-blue-600" />;
      default: return <Shield className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Compliance Overview</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="text-center">
          <div className="text-3xl font-bold text-gray-900">{data.totalConversations}</div>
          <div className="text-sm text-gray-500 mt-1">Total Conversations</div>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2">
            <div className="text-3xl font-bold text-success-600">{data.compliantPercentage}%</div>
            <TrendingUp className="w-5 h-5 text-success-600" />
          </div>
          <div className="text-sm text-gray-500 mt-1">Compliant Rate</div>
        </div>
        
        <div className="text-center">
          <div className="text-3xl font-bold text-primary-600">{data.averageScore}</div>
          <div className="text-sm text-gray-500 mt-1">Average Score</div>
        </div>
      </div>
      
      <div>
        <h4 className="text-md font-semibold text-gray-900 mb-4">Top Compliance Violations</h4>
        <div className="space-y-3">
          {data.topViolations.map((violation, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                {getSeverityIcon(violation.severity)}
                <div>
                  <div className="font-medium text-gray-900">{violation.ruleName}</div>
                  <div className="text-sm text-gray-500 capitalize">{violation.severity} severity</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-semibold text-gray-900">{violation.count}</div>
                <div className="text-sm text-gray-500">violations</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};