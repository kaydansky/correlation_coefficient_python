export interface CorrelationRequest {
  arrayX: number[];
  arrayY: number[];
}

export interface CorrelationResponse {
  coefficient: number;
  percentage: string;
}

export interface BothCorrelationResponse {
  pearson: CorrelationResponse;
  spearman: CorrelationResponse;
}

export type CorrelationType = 'pearson' | 'spearman' | 'both';
