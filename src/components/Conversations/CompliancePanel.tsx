import React from 'react';
import { AlertTriangle, CheckCircle, Shield, TrendingUp, TrendingDown, Clock } from 'lucide-react';
import { Conversation } from '../../types';

interface CompliancePanelProps {
  conversation: Conversation;
}

export const CompliancePanel: React.FC<CompliancePanelProps> = ({ conversation }) => {
  const totalMessages = conversation.messages.length;
  const agentMessages = conversation.messages.filter(m => m.sender === 'agent').length;
  const customerMessages = conversation.messages.filter(m => m.sender === 'customer').length;
  
  const totalFlags = conversation.messages.reduce((total, msg) => total + msg?.complianceFlags?.length, 0);
  const criticalFlags = conversation.messages.reduce((total, msg) => 
    total + msg?.complianceFlags?.filter(flag => flag.severity === 'critical').length, 0
  );
  const highFlags = conversation.messages.reduce((total, msg) => 
    total + msg?.complianceFlags?.filter(flag => flag.severity === 'high').length, 0
  );

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-success-600';
    if (score >= 75) return 'text-warning-600';
    return 'text-danger-600';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 90) return 'bg-success-50 border-success-200';
    if (score >= 75) return 'bg-warning-50 border-warning-200';
    return 'bg-danger-50 border-danger-200';
  };

  const emotionCounts = conversation.messages.reduce((acc, msg) => {
    acc[msg.emotion] = (acc[msg.emotion] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const dominantEmotion = Object.entries(emotionCounts).sort(([,a], [,b]) => b - a)[0];

  return (
    <div className="w-80 bg-white border-l border-gray-200 h-full overflow-y-auto">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <Shield className="w-5 h-5 mr-2 text-primary-600" />
          Compliance Analysis
        </h3>
        <p className="text-sm text-gray-500 mt-1">Real-time monitoring</p>
      </div>

      {/* Overall Score */}
      <div className="p-4 border-b border-gray-200">
        <div className={`p-4 rounded-lg border-2 ${getScoreBgColor(conversation.overallComplianceScore)}`}>
          <div className="text-center">
            <div className={`text-3xl font-bold ${getScoreColor(conversation.overallComplianceScore)}`}>
              {conversation.overallComplianceScore}%
            </div>
            <div className="text-sm text-gray-600 mt-1">Overall Compliance Score</div>
            <div className="flex items-center justify-center mt-2">
              {conversation.overallComplianceScore >= 85 ? (
                <>
                  <CheckCircle className="w-4 h-4 text-success-600 mr-1" />
                  <span className="text-sm text-success-600 font-medium">Compliant</span>
                </>
              ) : (
                <>
                  <AlertTriangle className="w-4 h-4 text-warning-600 mr-1" />
                  <span className="text-sm text-warning-600 font-medium">Needs Attention</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="p-4 border-b border-gray-200">
        <h4 className="font-semibold text-gray-900 mb-3">Session Statistics</h4>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Total Messages</span>
            <span className="font-medium text-gray-900">{totalMessages}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Agent Messages</span>
            <span className="font-medium text-gray-900">{agentMessages}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Customer Messages</span>
            <span className="font-medium text-gray-900">{customerMessages}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Compliance Issues</span>
            <span className={`font-medium ${totalFlags > 0 ? 'text-warning-600' : 'text-success-600'}`}>
              {totalFlags}
            </span>
          </div>
        </div>
      </div>

      {/* Violations Breakdown */}
      {totalFlags > 0 && (
        <div className="p-4 border-b border-gray-200">
          <h4 className="font-semibold text-gray-900 mb-3">Violations Breakdown</h4>
          <div className="space-y-2">
            {criticalFlags > 0 && (
              <div className="flex items-center justify-between p-2 bg-danger-50 rounded">
                <div className="flex items-center">
                  <AlertTriangle className="w-4 h-4 text-danger-600 mr-2" />
                  <span className="text-sm text-danger-800">Critical</span>
                </div>
                <span className="text-sm font-medium text-danger-800">{criticalFlags}</span>
              </div>
            )}
            {highFlags > 0 && (
              <div className="flex items-center justify-between p-2 bg-warning-50 rounded">
                <div className="flex items-center">
                  <AlertTriangle className="w-4 h-4 text-warning-600 mr-2" />
                  <span className="text-sm text-warning-800">High</span>
                </div>
                <span className="text-sm font-medium text-warning-800">{highFlags}</span>
              </div>
            )}
            {(totalFlags - criticalFlags - highFlags) > 0 && (
              <div className="flex items-center justify-between p-2 bg-blue-50 rounded">
                <div className="flex items-center">
                  <Shield className="w-4 h-4 text-blue-600 mr-2" />
                  <span className="text-sm text-blue-800">Medium/Low</span>
                </div>
                <span className="text-sm font-medium text-blue-800">{totalFlags - criticalFlags - highFlags}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Emotion Analysis */}
      <div className="p-4 border-b border-gray-200">
        <h4 className="font-semibold text-gray-900 mb-3">Emotion Analysis</h4>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Primary Emotion</span>
            <span className="font-medium text-gray-900 capitalize">{conversation.primaryEmotion}</span>
          </div>
          {dominantEmotion && (
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Most Frequent</span>
              <span className="font-medium text-gray-900 capitalize">
                {dominantEmotion[0]} ({dominantEmotion[1]})
              </span>
            </div>
          )}
        </div>
        
        <div className="mt-3 space-y-2">
          {Object.entries(emotionCounts).map(([emotion, count]) => (
            <div key={emotion} className="flex justify-between items-center text-sm">
              <span className="text-gray-600 capitalize">{emotion}</span>
              <span className="text-gray-900">{count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Violations */}
      <div className="p-4">
        <h4 className="font-semibold text-gray-900 mb-3">Recent Issues</h4>
        <div className="space-y-3">
          {conversation.messages
            .filter(msg => msg?.complianceFlags?.length > 0)
            .slice(-3)
            .map((message, index) => (
              <div key={index} className="space-y-2">
                {message?.complianceFlags?.map((flag, flagIndex) => (
                  <div key={flagIndex} className={`p-3 rounded-lg border ${
                    flag.severity === 'critical' ? 'bg-danger-50 border-danger-200' :
                    flag.severity === 'high' ? 'bg-warning-50 border-warning-200' :
                    'bg-blue-50 border-blue-200'
                  }`}>
                    <div className="flex items-start space-x-2">
                      <AlertTriangle className={`w-4 h-4 mt-0.5 ${
                        flag.severity === 'critical' ? 'text-danger-600' :
                        flag.severity === 'high' ? 'text-warning-600' :
                        'text-blue-600'
                      }`} />
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-900">{flag.ruleName}</div>
                        <div className="text-xs text-gray-600 mt-1">{flag.description}</div>
                        <div className="flex items-center text-xs text-gray-500 mt-1">
                          <Clock className="w-3 h-3 mr-1" />
                          {message.timestamp ? new Date(message.timestamp).toLocaleTimeString() : '--'}

                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          
          {totalFlags === 0 && (
            <div className="text-center py-6">
              <CheckCircle className="w-8 h-8 text-success-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">No compliance issues detected</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};