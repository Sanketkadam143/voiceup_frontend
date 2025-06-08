import React from 'react';
import { AlertTriangle, User, Bot } from 'lucide-react';
import { Conversation, EmotionType } from '../../types';

interface MessageViewProps {
  conversation: Conversation;
}

const emotionEmojis: { [key in EmotionType]: string } = {
  happy: '😊',
  satisfied: '😌',
  neutral: '😐',
  concerned: '😟',
  frustrated: '😤',
  confused: '😕',
  angry: '😠',
  excited: '🤩'
};

const emotionColors: { [key in EmotionType]: string } = {
  happy: 'text-success-600',
  satisfied: 'text-success-500',
  neutral: 'text-gray-500',
  concerned: 'text-warning-600',
  frustrated: 'text-warning-700',
  confused: 'text-purple-600',
  angry: 'text-danger-600',
  excited: 'text-primary-600'
};

export const MessageView: React.FC<MessageViewProps> = ({ conversation }) => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-danger-100 text-danger-800 border-danger-200';
      case 'high': return 'bg-warning-100 text-warning-800 border-warning-200';
      case 'medium': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'low': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 h-full flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              {conversation.customerName} & {conversation.agentName}
            </h2>
            <p className="text-sm text-gray-500">
              Started at {conversation.startTime.toLocaleString()}
            </p>
          </div>
          <div className="text-right">
            <div className="text-sm font-medium text-gray-900">
              Compliance Score: {conversation.overallComplianceScore}%
            </div>
            <div className="text-sm text-gray-500">
              Primary Emotion: {conversation.primaryEmotion}
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-4">
          {conversation.messages.map((message) => (
            <div key={message.id} className="flex space-x-3">
              <div className="flex-shrink-0">
                {message.sender === 'agent' ? (
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                    <Bot className="w-4 h-4 text-primary-600" />
                  </div>
                ) : (
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-gray-600" />
                  </div>
                )}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-sm font-medium text-gray-900 capitalize">
                    {message.sender}
                  </span>
                  <span className="text-xs text-gray-500">
                  {message.timestamp ? new Date(message.timestamp).toLocaleTimeString() : '--'}

                  </span>
                  <div className="flex items-center space-x-1">
                    <span className="text-sm">{emotionEmojis[message.emotion]}</span>
                    <span className={`text-xs font-medium ${emotionColors[message.emotion]}`}>
                      {message.emotion}
                    </span>
                    <span className="text-xs text-gray-400">
                      ({Math.round(message.emotionConfidence)}%)
                    </span>
                  </div>
                </div>
                
                <div className={`p-3 rounded-lg ${
                  message.sender === 'agent' 
                    ? 'bg-primary-50 border border-primary-100' 
                    : 'bg-gray-50 border border-gray-200'
                }`}>
                  <p className="text-sm text-gray-900">{message.content}</p>
                </div>
                
                {message?.complianceFlags?.length > 0 && (
                  <div className="mt-2 space-y-2">
                    {message.complianceFlags.map((flag, index) => (
                      <div key={index} className={`p-2 rounded border ${getSeverityColor(flag.severity)}`}>
                        <div className="flex items-start space-x-2">
                          <AlertTriangle className="w-4 h-4 mt-0.5" />
                          <div className="flex-1">
                            <div className="text-xs font-medium">{flag.ruleName}</div>
                            <div className="text-xs mt-1">{flag.description}</div>
                            {flag.suggestion && (
                              <div className="text-xs mt-1 italic">
                                Suggestion: {flag.suggestion}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};