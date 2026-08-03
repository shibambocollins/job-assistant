import { apiClient } from './client';
import type { CV, CVResponse } from '../types';

export async function uploadCV(file: File): Promise<CVResponse> {
  const formData = new FormData();
  formData.append('file', file);
  const { data } = await apiClient.post<CVResponse>('/cv/upload', formData);
  return data;
}

export async function replaceCV(file: File): Promise<CVResponse> {
  const formData = new FormData();
  formData.append('file', file);
  const { data } = await apiClient.put<CVResponse>('/cv/upload', formData);
  return data;
}

export async function getMyCV(): Promise<CV> {
  const { data } = await apiClient.get<CV>('/cv/my-cv');
  return data;
}
