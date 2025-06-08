import React, { useRef, useEffect } from 'react';
import { User, Bot, Send, Paperclip, Smile } from 'lucide-react';
import { Conversation, EmotionType } from '../../types';

interface LiveChatProps {
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
  happy: 'text-success-600 bg-success-50',
  satisfied: 'text-success-500 bg-success-50',
  neutral: 'text-gray-500 bg-gray-50',
  concerned: 'text-warning-600 bg-warning-50',
  frustrated: 'text-warning-700 bg-warning-50',
  confused: 'text-purple-600 bg-purple-50',
  angry: 'text-danger-600 bg-danger-50',
  excited: 'text-primary-600 bg-primary-50'
};

export const LiveChat: React.FC<LiveChatProps> = ({ conversation }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation.messages]);

  const formatTime = (timestamp?: Date | string | null) => {
    if (!timestamp) return '--';
  
    try {
      const date = typeof timestamp === 'string' ? new Date(timestamp) : timestamp;
      return date.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
      });
    } catch (error) {
      return '--';
    }
  };
  

  return (
    <div className="flex-1 bg-gray-50 flex flex-col h-full">
      {/* Chat Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-primary-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{conversation.customerName}</h3>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <span>with {conversation.agentName}</span>
                <span>•</span>
                <div className={`w-2 h-2 rounded-full ${
                  conversation.status === 'active' ? 'bg-success-500' : 'bg-gray-400'
                }`} />
                <span className="capitalize">{conversation.status}</span>
              </div>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-sm font-medium text-gray-900">
            Session: {conversation.startTime ? new Date(conversation.startTime).toLocaleTimeString() : '--'}
            </div>
            <div className="text-xs text-gray-500">
            Duration: {
              conversation.endTime
                ? Math.round((new Date(conversation.endTime).getTime() - new Date(conversation.startTime).getTime()) / 60000) + 'm'
                : Math.round((Date.now() - new Date(conversation.startTime).getTime()) / 60000) + 'm'
            }

            </div>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {conversation.messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === 'agent' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs lg:max-w-md ${message.sender === 'agent' ? 'order-2' : 'order-1'}`}>
              {/* Message Bubble */}
              <div className={`rounded-2xl px-4 py-2 ${
                message.sender === 'agent' 
                  ? 'bg-primary-600 text-white rounded-br-md' 
                  : 'bg-white text-gray-900 rounded-bl-md border border-gray-200'
              }`}>
                <p className="text-sm">{message.content}</p>
              </div>
              
              {/* Message Info */}
              <div className={`flex items-center space-x-2 mt-1 text-xs text-gray-500 ${
                message.sender === 'agent' ? 'justify-end' : 'justify-start'
              }`}>
                <span>{formatTime(message.timestamp)}</span>
                
                {/* Emotion Indicator */}
                <div className={`flex items-center space-x-1 px-2 py-1 rounded-full ${emotionColors[message.emotion]}`}>
                  <span className="text-xs">{emotionEmojis[message.emotion]}</span>
                  <span className="text-xs font-medium capitalize">{message.emotion}</span>
                  <span className="text-xs opacity-75">
                    {Math.round(message.emotionConfidence)}%
                  </span>
                </div>
              </div>
              
              {/* Compliance Flags */}
              {message?.complianceFlags?.length > 0 && (
                <div className="mt-2 space-y-1">
                  {message.complianceFlags.map((flag, index) => (
                    <div key={index} className={`text-xs p-2 rounded border-l-4 ${
                      flag.severity === 'critical' ? 'bg-danger-50 border-danger-400 text-danger-800' :
                      flag.severity === 'high' ? 'bg-warning-50 border-warning-400 text-warning-800' :
                      'bg-blue-50 border-blue-400 text-blue-800'
                    }`}>
                      <div className="font-medium">{flag.ruleName}</div>
                      <div className="mt-1">{flag.description}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Avatar */}
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              message.sender === 'agent' ? 'order-1 ml-2 bg-primary-100' : 'order-2 mr-2 bg-gray-100'
            }`}>
              {message.sender === 'agent' ? (
                <Bot className="w-4 h-4 text-primary-600" />
              ) : (
                <User className="w-4 h-4 text-gray-600" />
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="flex items-center space-x-3">
          <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <Paperclip className="w-5 h-5" />
          </button>
          
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Type a message..."
              className="w-full px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600">
              <Smile className="w-4 h-4" />
            </button>
          </div>
          
          <button className="p-2 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition-colors">
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};