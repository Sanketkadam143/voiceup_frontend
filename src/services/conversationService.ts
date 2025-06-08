import { apiClient, API_ENDPOINTS } from '../config/api';
import { Conversation, Message } from '../types';
import { mockConversations } from '../data/mockData';

export class ConversationService {
  async getConversations(searchQuery?: string): Promise<Conversation[]> {
    try {
      const params = searchQuery ? `?search=${encodeURIComponent(searchQuery)}` : '';
      const response = await apiClient.get<Conversation[]>(`${API_ENDPOINTS.CONVERSATIONS}${params}`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch conversations:', error);
      // Fallback to mock data for development
      console.warn('Using mock data as fallback');
      
      if (searchQuery) {
        return mockConversations.filter(conversation => 
          conversation.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          conversation.agentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          conversation.messages.some(message => 
            message.content.toLowerCase().includes(searchQuery.toLowerCase())
          ) ||
          conversation.messages.some(message =>
            message?.complianceFlags?.some(flag =>
              flag.ruleName.toLowerCase().includes(searchQuery.toLowerCase()) ||
              flag.description.toLowerCase().includes(searchQuery.toLowerCase())
            )
          )
        );
      }
      
      return mockConversations;
    }
  }

  async getConversation(id: string): Promise<Conversation> {
    try {
      const response = await apiClient.get<Conversation>(`${API_ENDPOINTS.CONVERSATIONS}${id}/`);
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch conversation ${id}:`, error);
      // Fallback to mock data
      const conversation = mockConversations.find(conv => conv.id === id);
      if (!conversation) {
        throw new Error(`Conversation ${id} not found`);
      }
      return conversation;
    }
  }

  async sendMessage(conversationId: string, message: Omit<Message, 'id' | 'timestamp'>): Promise<Message> {
    try {
      const response = await apiClient.post<Message>(
        `${API_ENDPOINTS.CONVERSATIONS}${conversationId}/messages/`,
        message
      );
      return response.data;
    } catch (error) {
      console.error('Failed to send message:', error);
      throw error;
    }
  }

  async updateConversationStatus(id: string, status: 'active' | 'completed' | 'escalated'): Promise<Conversation> {
    try {
      const response = await apiClient.put<Conversation>(
        `${API_ENDPOINTS.CONVERSATIONS}${id}/`,
        { status }
      );
      return response.data;
    } catch (error) {
      console.error(`Failed to update conversation ${id} status:`, error);
      throw error;
    }
  }

  async getConversationAnalytics(id: string): Promise<any> {
    try {
      const response = await apiClient.get(`${API_ENDPOINTS.CONVERSATIONS}${id}/analytics/`);
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch analytics for conversation ${id}:`, error);
      throw error;
    }
  }
}

export const conversationService = new ConversationService();