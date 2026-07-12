import { HistoryItem } from '../types';

export class ApiService {
  private async callEndpoint(endpoint: string, payload: any, customApiKey?: string, clerkToken?: string): Promise<any> {
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (customApiKey?.trim()) headers['x-google-api-key'] = customApiKey.trim();
    if (clerkToken) headers['Authorization'] = `Bearer ${clerkToken}`;

    const rawUrl = import.meta.env.VITE_API_URL || '';
    const baseUrl = rawUrl.endsWith('/') ? rawUrl.slice(0, -1) : rawUrl;
    const response = await fetch(`${baseUrl}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    if (!response.ok) {
      const error = new Error(data.message || 'An unexpected error occurred.');
      (error as any).code = data.code || 'API_ERROR';
      throw error;
    }
    return data.data;
  }

  public async analyzeCompany(company: string, customApiKey?: string, clerkToken?: string) {
    return this.callEndpoint('/api/analyze/company', { company }, customApiKey, clerkToken);
  }

  public async getQuote(ticker: string, clerkToken?: string): Promise<{price: string, hq: string}> {
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (clerkToken) headers['Authorization'] = `Bearer ${clerkToken}`;
    const rawUrl = import.meta.env.VITE_API_URL || '';
    const baseUrl = rawUrl.endsWith('/') ? rawUrl.slice(0, -1) : rawUrl;
    const response = await fetch(`${baseUrl}/api/quote/${ticker}`, { headers });
    const data = await response.json();
    return data.data;
  }

  public async analyzeFinance(company: string, customApiKey?: string, clerkToken?: string) {
    return this.callEndpoint('/api/analyze/finance', { company }, customApiKey, clerkToken);
  }

  public async analyzeNews(company: string, customApiKey?: string, clerkToken?: string) {
    return this.callEndpoint('/api/analyze/news', { company }, customApiKey, clerkToken);
  }

  public async analyzeSwot(company: string, customApiKey?: string, clerkToken?: string) {
    return this.callEndpoint('/api/analyze/swot', { company }, customApiKey, clerkToken);
  }

  public async analyzeRisk(company: string, customApiKey?: string, clerkToken?: string) {
    return this.callEndpoint('/api/analyze/risk', { company }, customApiKey, clerkToken);
  }

  public async analyzeRecommendation(company: string, context: any, customApiKey?: string, clerkToken?: string) {
    return this.callEndpoint('/api/analyze/recommendation', { company, context }, customApiKey, clerkToken);
  }

  public async saveReport(report: any, customApiKey?: string, clerkToken?: string) {
    return this.callEndpoint('/api/analyze/save', { report }, customApiKey, clerkToken);
  }

  public async getSharedReport(id: string) {
    const rawUrl = import.meta.env.VITE_API_URL || '';
    const baseUrl = rawUrl.endsWith('/') ? rawUrl.slice(0, -1) : rawUrl;
    const response = await fetch(`${baseUrl}/api/shared/${id}`);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Report not found or unavailable.');
    }
    return data.data;
  }

  public async chat(question: string, context: any, customApiKey?: string, clerkToken?: string) {
    return this.callEndpoint('/api/chat', { question, context }, customApiKey, clerkToken);
  }

  // --- User Interactions ---
  public async saveContactMessage(data: { name: string, email: string, subject: string, message: string }, clerkToken?: string) {
    return this.callEndpoint('/api/interactions/contact', data, undefined, clerkToken);
  }

  public async getContactMessages(clerkToken?: string) {
    const response = await fetch('/api/interactions/contact', {
      headers: clerkToken ? { 'Authorization': `Bearer ${clerkToken}` } : {}
    });
    const data = await response.json();
    return data.data;
  }

  public async saveSearchQuery(query: string, clerkToken?: string) {
    return this.callEndpoint('/api/interactions/search', { query }, undefined, clerkToken);
  }

  public async getSearchHistory(clerkToken?: string) {
    const response = await fetch('/api/interactions/search', {
      headers: clerkToken ? { 'Authorization': `Bearer ${clerkToken}` } : {}
    });
    const data = await response.json();
    return data.data;
  }

  public async saveChatMessage(data: { reportId?: string, role: string, content: string }, clerkToken?: string) {
    return this.callEndpoint('/api/interactions/chat', data, undefined, clerkToken);
  }

  public async getChatHistory(reportId: string, clerkToken?: string) {
    const rawUrl = import.meta.env.VITE_API_URL || '';
    const baseUrl = rawUrl.endsWith('/') ? rawUrl.slice(0, -1) : rawUrl;
    const response = await fetch(`${baseUrl}/api/interactions/chat/${reportId}`, {
      headers: clerkToken ? { 'Authorization': `Bearer ${clerkToken}` } : {}
    });
    const data = await response.json();
    return data.data;
  }

  /**
   * Fetch saved analysis records from database for Clerk authenticated session.
   */
  public async createPaymentOrder(clerkToken?: string) {
    const rawUrl = import.meta.env.VITE_API_URL || '';
    const baseUrl = rawUrl.endsWith('/') ? rawUrl.slice(0, -1) : rawUrl;
    const response = await fetch(`${baseUrl}/api/payments/create-order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(clerkToken ? { 'Authorization': `Bearer ${clerkToken}` } : {})
      }
    });
    if (!response.ok) throw new Error('Failed to create order');
    return await response.json();
  }

  public async verifyPayment(paymentData: any, clerkToken?: string) {
    const rawUrl = import.meta.env.VITE_API_URL || '';
    const baseUrl = rawUrl.endsWith('/') ? rawUrl.slice(0, -1) : rawUrl;
    const response = await fetch(`${baseUrl}/api/payments/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(clerkToken ? { 'Authorization': `Bearer ${clerkToken}` } : {})
      },
      body: JSON.stringify(paymentData)
    });
    if (!response.ok) throw new Error('Payment verification failed');
    return await response.json();
  }

  public async getHistory(clerkToken?: string): Promise<HistoryItem[]> {
    try {
      const headers: Record<string, string> = {};
      if (clerkToken) {
        headers['Authorization'] = `Bearer ${clerkToken}`;
      }

      const rawUrl = import.meta.env.VITE_API_URL || '';
      const baseUrl = rawUrl.endsWith('/') ? rawUrl.slice(0, -1) : rawUrl;
      const response = await fetch(`${baseUrl}/api/history`, {
        headers
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.message || 'Failed to retrieve analysis history.');
      }

      return payload.data || [];
    } catch (error) {
      console.error('[API getHistory Error]:', error);
      return [];
    }
  }

  /**
   * Delete specific history record.
   */
  public async deleteHistory(id: string, clerkToken?: string): Promise<void> {
    try {
      const headers: Record<string, string> = {};
      if (clerkToken) {
        headers['Authorization'] = `Bearer ${clerkToken}`;
      }

      const rawUrl = import.meta.env.VITE_API_URL || '';
      const baseUrl = rawUrl.endsWith('/') ? rawUrl.slice(0, -1) : rawUrl;
      const response = await fetch(`${baseUrl}/api/history/${id}`, {
        method: 'DELETE',
        headers
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.message || 'Failed to delete record.');
      }
    } catch (error) {
      console.error('[API deleteHistory Error]:', error);
      throw error;
    }
  }

  /**
   * Sync Clerk user data with backend Postgres database
   */
  public async syncUser(userData: { email?: string; firstName?: string; lastName?: string; imageUrl?: string }, clerkToken?: string): Promise<void> {
    try {
      await this.callEndpoint('/api/users/sync', userData, undefined, clerkToken);
    } catch (error) {
      console.error('[API syncUser Error]:', error);
      // Suppress throwing error for sync since it shouldn't block UI if it fails
    }
  }
}

export const apiService = new ApiService();
