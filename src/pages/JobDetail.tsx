import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Check, ChevronDown, ChevronLeft, MessageSquare, Sparkles } from 'lucide-react';
import { getMyApplications, updateStatus } from '../api/jobs';
import { analyzeJobApplication, getLatestAnalysis } from '../api/analysis';
import { getErrorMessage } from '../api/client';
import type { AnalysisResponse, ApplicationStatus, JobApplicationResponse } from '../types';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { Button } from '../components/ui/Button';
import { STATUS_OPTIONS, StatusBadge, statusLabel } from '../components/ui/StatusBadge';
import { Alert } from '../components/ui/Alert';
import { ScoreRing } from '../components/ScoreRing';

export function JobDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const jobId = Number(id);

  const [job, setJob] = useState<JobApplicationResponse | null>(null);
  const [analysis, setAnalysis] = useState<AnalysisResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [statusMenuOpen, setStatusMenuOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useDocumentTitle(job ? `${job.jobTitle} | Job Assistant AI` : 'Job Details | Job Assistant AI');

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const applications = await getMyApplications();
      const found = applications.find((j) => j.id === jobId) ?? null;
      setJob(found);

      try {
        const latest = await getLatestAnalysis(jobId);
        setAnalysis(latest);
      } catch (err) {
        if (axios.isAxiosError(err) && err.response?.status !== 404) {
          setError(getErrorMessage(err));
        }
        setAnalysis(null);
      }
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jobId]);

  async function handleRunAnalysis() {
    setAnalyzing(true);
    setError(null);
    try {
      const result = await analyzeJobApplication(jobId);
      setAnalysis(result);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setAnalyzing(false);
    }
  }

  async function handleStatusChange(status: ApplicationStatus) {
    setStatusMenuOpen(false);
    if (!job || status === job.status) return;
    try {
      const updated = await updateStatus(job.id, status);
      setJob(updated);
    } catch (err) {
      setError(getErrorMessage(err));
    }
  }

  if (loading) {
    return <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 text-[#6B6B6B]">Loading…</div>;
  }

  if (!job) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <p className="text-[#6B6B6B] mb-4">Couldn't find that application.</p>
        <Button variant="secondary" onClick={() => navigate('/dashboard')}>
          Back to pipeline
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <button
        onClick={() => navigate('/dashboard')}
        className="flex items-center text-[#6B6B6B] hover:text-[#1F1F1F] text-sm mb-6 transition-colors"
      >
        <ChevronLeft className="w-4 h-4 mr-1" /> Back to pipeline
      </button>

      {error && <Alert className="mb-4">{error}</Alert>}

      <div className="bg-white border border-[#E8E5E1] shadow-sm rounded-lg p-6 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-heading mb-1 text-[#1F1F1F]">{job.jobTitle}</h1>
          <div className="flex items-center text-[#6B6B6B] text-sm space-x-3">
            <span>{job.company}</span>
            <span>•</span>
            <span>{job.location}</span>
            <span>•</span>
            <span>Added {new Date(job.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative inline-block text-left">
            <button
              onClick={() => setStatusMenuOpen((open) => !open)}
              className="flex items-center justify-between px-3 py-1.5 border border-[#E8E5E1] rounded-md bg-white text-sm font-medium shadow-sm hover:bg-[#F8F7F4]"
            >
              <StatusBadge status={job.status} />
              <ChevronDown className="w-4 h-4 ml-2 text-[#6B6B6B]" />
            </button>
            {statusMenuOpen && (
              <div className="absolute right-0 mt-1 w-40 bg-white border border-[#E8E5E1] rounded-md shadow-lg z-10">
                {STATUS_OPTIONS.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleStatusChange(option)}
                    className="block w-full text-left px-3 py-2 text-sm text-[#1F1F1F] hover:bg-[#F8F7F4]"
                  >
                    {statusLabel(option)}
                  </button>
                ))}
              </div>
            )}
          </div>
          <Button variant="primary" onClick={() => navigate('/chat', { state: { jobTitle: job.jobTitle, company: job.company } })}>
            <MessageSquare className="w-4 h-4 mr-2" /> Prep for Interview
          </Button>
        </div>
      </div>

      <div className="bg-white border border-[#E8E5E1] shadow-sm rounded-lg p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="font-heading text-lg flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#A58A76]" /> Fit Analysis
            </h2>
            {analysis && (
              <p className="text-xs text-[#6B6B6B] mt-1">
                Last analyzed {new Date(analysis.createdAt).toLocaleString()}
              </p>
            )}
          </div>
          {analysis && (
            <Button variant="ghost" className="text-xs" onClick={handleRunAnalysis} disabled={analyzing}>
              {analyzing ? 'Re-running…' : 'Re-run analysis'}
            </Button>
          )}
        </div>

        {!analysis ? (
          <div className="text-center py-8">
            <p className="text-[#6B6B6B] text-sm mb-4">
              No analysis yet. Run a match against your CV to see your score, strengths, and gaps.
            </p>
            <Button variant="primary" onClick={handleRunAnalysis} disabled={analyzing}>
              {analyzing ? 'Analyzing…' : 'Run match analysis'}
            </Button>
          </div>
        ) : (
          <>
            <div className="flex flex-col sm:flex-row gap-8 mb-8 pb-8 border-b border-[#E8E5E1]">
              <div className="flex flex-col items-center justify-center shrink-0">
                <div className="relative w-24 h-24">
                  <ScoreRing score={analysis.matchScore} size={96} strokeWidth={6} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl font-heading text-[#1F1F1F]">
                      {analysis.matchScore}
                      <span className="text-lg text-[#6B6B6B]">%</span>
                    </span>
                  </div>
                </div>
                <span className="text-sm font-medium mt-3 text-[#6F8A68]">
                  {analysis.matchScore >= 80 ? 'Strong Match' : analysis.matchScore >= 50 ? 'Moderate Match' : 'Weak Match'}
                </span>
              </div>

              <div className="flex-1 space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-[#1F1F1F] mb-3">Matching Strengths</h3>
                  <div className="flex flex-wrap gap-2">
                    {analysis.strengths.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 bg-[#6F8A68]/10 text-[#6F8A68] border border-[#6F8A68]/20 rounded-md text-xs font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-[#1F1F1F] mb-3">Identified Gaps</h3>
                  <div className="flex flex-wrap gap-2">
                    {analysis.missingSkills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 bg-[#B5654A]/10 text-[#B5654A] border border-[#B5654A]/20 rounded-md text-xs font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-[#1F1F1F] mb-4">Actionable Recommendations</h3>
              <ul className="space-y-3 text-sm text-[#5E5A56]">
                {analysis.suggestions.map((suggestion, i) => (
                  <li key={i} className="flex gap-3">
                    <Check className="w-5 h-5 text-[#6F8A68] shrink-0" />
                    <span>{suggestion}</span>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
