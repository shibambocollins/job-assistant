import { apiClient } from './client';
import type { AnalysisResponse } from '../types';

export async function analyzeJobApplication(jobApplicationId: number): Promise<AnalysisResponse> {
  const { data } = await apiClient.post<AnalysisResponse>(`/jobs/${jobApplicationId}/analysis`);
  return data;
}

export async function getLatestAnalysis(jobApplicationId: number): Promise<AnalysisResponse> {
  const { data } = await apiClient.get<AnalysisResponse>(`/jobs/${jobApplicationId}/analysis`);
  return data;
}
