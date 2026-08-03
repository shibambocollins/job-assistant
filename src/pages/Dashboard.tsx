import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { discoverJobs, getMyApplications } from '../api/jobs';
import { getErrorMessage } from '../api/client';
import type { JobApplicationResponse } from '../types';

export function Dashboard() {
  const [applications, setApplications] = useState<JobApplicationResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [discovering, setDiscovering] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { logout } = useAuth();

  async function loadApplications() {
    setLoading(true);
    setError(null);
    try {
      const data = await getMyApplications();
      setApplications(data);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadApplications();
  }, []);

  async function handleDiscover() {
    setDiscovering(true);
    setError(null);
    try {
      await discoverJobs();
      await loadApplications();
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setDiscovering(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
        <h1 className="text-lg font-semibold text-slate-900">AI Job Assistant</h1>
        <button onClick={logout} className="text-sm text-slate-600 hover:text-slate-900">
          Log out
        </button>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-900">Your applications</h2>
          <button
            onClick={handleDiscover}
            disabled={discovering}
            className="rounded bg-slate-900 px-4 py-2 text-sm text-white hover:bg-slate-800 disabled:opacity-50"
          >
            {discovering ? 'Discovering…' : 'Discover jobs'}
          </button>
        </div>

        {error && <p className="mb-4 rounded bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

        {loading ? (
          <p className="text-slate-600">Loading…</p>
        ) : applications.length === 0 ? (
          <p className="text-slate-600">No applications tracked yet. Try "Discover jobs" once you've uploaded a CV.</p>
        ) : (
          <ul className="space-y-3">
            {applications.map((app) => (
              <li key={app.id} className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-slate-900">{app.jobTitle}</p>
                    <p className="text-sm text-slate-600">
                      {app.company} · {app.location}
                    </p>
                  </div>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                    {app.status}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
