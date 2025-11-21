import type { CorrelationRequest, CorrelationResponse, BothCorrelationResponse, CorrelationType } from '../types/correlation';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export class CorrelationApiError extends Error {
  constructor(message: string, public statusCode?: number) {
    super(message);
    this.name = 'CorrelationApiError';
  }
}

async function makeRequest<T>(endpoint: string, data: CorrelationRequest): Promise<T> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new CorrelationApiError(error.detail || 'API request failed', response.status);
    }

    return await response.json();
  } catch (error) {
    if (error instanceof CorrelationApiError) {
      throw error;
    }
    throw new CorrelationApiError('Network error or server unavailable');
  }
}

export async function calculateCorrelation(
  type: CorrelationType,
  arrayX: number[],
  arrayY: number[]
): Promise<CorrelationResponse | BothCorrelationResponse> {
  const data: CorrelationRequest = { arrayX, arrayY };

  switch (type) {
    case 'pearson':
      return makeRequest<CorrelationResponse>('/pearson', data);
    case 'spearman':
      return makeRequest<CorrelationResponse>('/spearman', data);
    case 'both':
      return makeRequest<BothCorrelationResponse>('/both', data);
    default:
      throw new Error('Invalid correlation type');
  }
}
