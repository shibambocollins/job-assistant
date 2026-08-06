import { apiClient } from './client';
import type { ApplicationStatus, JobApplicationResponse } from '../types';

export interface JobPayload {
  title: string;
  company: string;
  description: string;
  location?: string;
  postingUrl?: string;
}

export async function addJob(payload: JobPayload): Promise<JobApplicationResponse> {
  const { data } = await apiClient.post<JobApplicationResponse>('/jobs', payload);
  return data;
}

export async function getMyApplications(): Promise<JobApplicationResponse[]> {
  const { data } = await apiClient.get<JobApplicationResponse[]>('/jobs');
  return data;
}

export async function updateJobDetails(id: number, payload: JobPayload): Promise<JobApplicationResponse> {
  const { data } = await apiClient.put<JobApplicationResponse>(`/jobs/${id}`, payload);
  return data;
}

export async function updateStatus(id: number, status: ApplicationStatus): Promise<JobApplicationResponse> {
  const { data } = await apiClient.patch<JobApplicationResponse>(`/jobs/${id}/status`, { status });
  return data;
}

export async function deleteApplication(id: number): Promise<void> {
  await apiClient.delete(`/jobs/${id}`);
}

export async function discoverJobs(): Promise<JobApplicationResponse[]> {
  const { data } = await apiClient.post<JobApplicationResponse[]>('/jobs/discover');
  return data;
}
