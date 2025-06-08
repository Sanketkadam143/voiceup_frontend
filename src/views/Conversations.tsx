import React, { useState, useEffect } from 'react';
import { ConversationList } from '../components/Conversations/ConversationList';
import { LiveChat } from '../components/Conversations/LiveChat';
import { CompliancePanel } from '../components/Conversations/CompliancePanel';
import { conversationService } from '../services/conversationService';
import { Conversation } from '../types';
import { LoadingSpinner } from '../components/Common/LoadingSpinner';

export const Conversations: React.FC = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchConversations = async (searchQuery?: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await conversationService.getConversations(searchQuery);
      setConversations(data);
      
      // Auto-select first conversation if none selected or current selection not in results
      if (data.length > 0) {
        if (!selectedConversation || !data.find(conv => conv.id === selectedConversation.id)) {
          setSelectedConversation(data[0]);
        }
      } else {
        setSelectedConversation(null);
      }
    } catch (err) {
      setError('Failed to load conversations');
      console.error('Error fetching conversations:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConversations();
  }, []);

  const handleSearch = (query: string) => {
    fetchConversations(query || undefined);
  };

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 mb-2">Error loading conversations</div>
          <button 
            onClick={() => fetchConversations()}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-80px)] flex">
      {/* Left Panel - Conversation List */}
      <ConversationList
        conversations={conversations}
        onSelectConversation={setSelectedConversation}
        selectedConversation={selectedConversation}
        onSearch={handleSearch}
      />
      
      {/* Center Panel - Live Chat */}
      {selectedConversation && (
        <LiveChat conversation={selectedConversation} />
      )}
      
      {/* Right Panel - Compliance Analysis */}
      {selectedConversation && (
        <CompliancePanel conversation={selectedConversation} />
      )}
      
      {/* No Results Message */}
      {conversations.length === 0 && !loading && (
        <div className="flex-1 flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="text-gray-400 mb-2">
              <svg className="w-12 h-12 mx-auto\" fill="none\" stroke="currentColor\" viewBox="0 0 24 24">
                <path strokeLinecap="round\" strokeLinejoin="round\" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">No conversations found</h3>
            <p className="text-gray-500">Try adjusting your search terms or check back later for new conversations.</p>
          </div>
        </div>
      )}
    </div>
  );
};