import React, { useState } from 'react';
import { Clock, User, AlertTriangle, CheckCircle, MessageCircle, Search } from 'lucide-react';
import { Conversation } from '../../types';

interface ConversationListProps {
  conversations: Conversation[];
  onSelectConversation: (conversation: Conversation) => void;
  selectedConversation?: Conversation | null;
  onSearch: (query: string) => void;
}

export const ConversationList: React.FC<ConversationListProps> = ({
  conversations,
  onSelectConversation,
  selectedConversation,
  onSearch
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch(value);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-success-600';
      case 'completed': return 'text-gray-500';
      case 'escalated': return 'text-danger-600';
      default: return 'text-gray-500';
    }
  };

  const getComplianceColor = (score: number) => {
    if (score >= 90) return 'text-success-600';
    if (score >= 75) return 'text-warning-600';
    return 'text-danger-600';
  };

  const getLastMessage = (conversation: Conversation) => {
    const lastMessage = conversation.messages[conversation.messages.length - 1];
    return lastMessage ? lastMessage.content.substring(0, 50) + '...' : 'No messages';
  };

  const getLastMessageTime = (conversation: Conversation) => {
    const lastMessage = conversation.messages[conversation.messages.length - 1];
    if (!lastMessage) return '';
    
    const now = new Date();
    const messageTimestamp = lastMessage?.timestamp;
    const messageTime = messageTimestamp ? new Date(messageTimestamp) : new Date();
    const diffInMinutes = Math.floor((Date.now() - messageTime.getTime()) / (1000 * 60));
    
    
    console.log(selectedConversation)
    if (diffInMinutes < 1) return 'now';
    if (diffInMinutes < 60) return `${diffInMinutes}m`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h`;
    return messageTime.toLocaleDateString();
  };

  return (
    <div className="w-80 bg-white border-r border-gray-200 h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center">
          <MessageCircle className="w-5 h-5 mr-2 text-primary-600" />
          Live Conversations
        </h2>
        <p className="text-sm text-gray-500 mt-1">{conversations.length} conversations</p>
      </div>

      {/* Search */}
      <div className="p-4 border-b border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search conversations..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
          />
        </div>
      </div>
      
      {/* Conversation List */}
      <div className="flex-1 overflow-y-auto">
        {conversations.map((conversation) => (
          <div
            key={conversation.id}
            onClick={() => onSelectConversation(conversation)}
            className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors duration-200 border-b border-gray-100 ${
              selectedConversation?.id === conversation.id ? 'bg-primary-50 border-r-4 border-primary-600' : ''
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                {/* Customer Info */}
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-gray-900 truncate">
                    {conversation.customerName}
                  </h3>
                  <span className="text-xs text-gray-500 ml-2">
                    {getLastMessageTime(conversation)}
                  </span>
                </div>
                
                {/* Agent Info */}
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <User className="w-3 h-3 mr-1" />
                  <span className="truncate">Agent: {conversation.agentName}</span>
                </div>
                
                {/* Last Message */}
                <p className="text-sm text-gray-500 truncate mb-2">
                  {getLastMessage(conversation)}
                </p>
                
                {/* Status and Compliance */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${
                      conversation.status === 'active' ? 'bg-success-500' : 
                      conversation.status === 'escalated' ? 'bg-danger-500' : 'bg-gray-400'
                    }`} />
                    <span className={`text-xs font-medium capitalize ${getStatusColor(conversation.status)}`}>
                      {conversation.status}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    {conversation.overallComplianceScore >= 85 ? (
                      <CheckCircle className="w-3 h-3 text-success-600" />
                    ) : (
                      <AlertTriangle className="w-3 h-3 text-warning-600" />
                    )}
                    <span className={`text-xs font-medium ${getComplianceColor(conversation.overallComplianceScore)}`}>
                      {conversation.overallComplianceScore}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};