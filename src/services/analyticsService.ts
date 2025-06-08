import { apiClient, API_ENDPOINTS } from '../config/api';
import { AnalyticsData } from '../types';
import { analyticsData as mockAnalyticsData } from '../data/mockData';

export class AnalyticsService {
  async getAnalytics(dateRange?: { start: string; end: string }): Promise<AnalyticsData> {
    try {
      const params = dateRange ? `?start=${dateRange.start}&end=${dateRange.end}` : '';
      const response = await apiClient.get<AnalyticsData>(`${API_ENDPOINTS.ANALYTICS}${params}`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
      // Fallback to mock data for development
      console.warn('Using mock analytics data as fallback');
      return mockAnalyticsData;
    }
  }

  async getComplianceOverview(): Promise<AnalyticsData['complianceOverview']> {
    try {
      const response = await apiClient.get<AnalyticsData['complianceOverview']>(`${API_ENDPOINTS.ANALYTICS}compliance/`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch compliance overview:', error);
      return mockAnalyticsData.complianceOverview;
    }
  }

  // async getEmotionBreakdown(): Promise<AnalyticsData['emotionBreakdown']> {
  //   try {
  //     const response = await apiClient.get<AnalyticsData['emotionBreakdown']>(`${API_ENDPOINTS.ANALYTICS}emotions/`);
  //     return response.data;
  //   } catch (error) {
  //     console.error('Failed to fetch emotion breakdown:', error);
  //     return mockAnalyticsData.emotionBreakdown;
  //   }
  // }

  // async getTrendsData(period: 'day' | 'week' | 'month' = 'week'): Promise<AnalyticsData['trendsData']> {
  //   try {
  //     const response = await apiClient.get<AnalyticsData['trendsData']>(`${API_ENDPOINTS.ANALYTICS}trends/?period=${period}`);
  //     return response.data;
  //   } catch (error) {
  //     console.error('Failed to fetch trends data:', error);
  //     return mockAnalyticsData.trendsData;
  //   }
  // }
}

export const analyticsService = new AnalyticsService();