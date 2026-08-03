import { apiClient } from './client';
import type { ChatResponse } from '../types';

export async function sendMessage(message: string): Promise<ChatResponse> {
  const { data } = await apiClient.post<ChatResponse>('/chat', { message });
  return data;
}

export async function getHistory(): Promise<ChatResponse[]> {
  const { data } = await apiClient.get<ChatResponse[]>('/chat/history');
  return data;
}
