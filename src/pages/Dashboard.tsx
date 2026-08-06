import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit2, Plus, Search, Trash2 } from 'lucide-react';
import { deleteApplication, discoverJobs, getMyApplications } from '../api/jobs';
import { getErrorMessage } from '../api/client';
import type { JobApplicationResponse } from '../types';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { Button } from '../components/ui/Button';
import { StatusBadge } from '../components/ui/StatusBadge';
import { Alert } from '../components/ui/Alert';
import { AddJobModal } from '../components/AddJobModal';

export function Dashboard() {
  const [applications, setApplications] = useState<JobApplicationResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [discovering, setDiscovering] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<JobApplicationResponse | null>(null);
  const navigate = useNavigate();

  useDocumentTitle('Dashboard — Job Assistant');

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

  async function handleDelete(id: number, e: React.MouseEvent) {
    e.stopPropagation();
    if (!confirm('Delete this application?')) return;
    try {
      await deleteApplication(id);
      setApplications((prev) => prev.filter((job) => job.id !== id));
    } catch (err) {
      setError(getErrorMessage(err));
    }
  }

  function handleEdit(job: JobApplicationResponse, e: React.MouseEvent) {
    e.stopPropagation();
    setEditingJob(job);
    setIsModalOpen(true);
  }

  function handleSaved(job: JobApplicationResponse) {
    setApplications((prev) => {
      const exists = prev.some((j) => j.id === job.id);
      return exists ? prev.map((j) => (j.id === job.id ? job : j)) : [job, ...prev];
    });
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl mb-1">Your Pipeline</h1>
          <p className="text-[#6B6B6B] text-sm">Manage and analyze your active applications.</p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <Button
            variant="secondary"
            className="flex-1 md:flex-none"
            onClick={() => {
              setEditingJob(null);
              setIsModalOpen(true);
            }}
          >
            <Plus className="w-4 h-4 mr-2" /> Add manually
          </Button>
          <Button variant="primary" className="flex-1 md:flex-none" onClick={handleDiscover} disabled={discovering}>
            <Search className="w-4 h-4 mr-2" /> {discovering ? 'Discovering…' : 'Discover jobs'}
          </Button>
        </div>
      </div>

      {error && <Alert className="mb-4">{error}</Alert>}

      <div className="bg-white border border-[#E8E5E1] rounded-lg shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-6 space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="space-y-2 w-1/3">
                  <div className="h-4 bg-[#E8E5E1] rounded w-full animate-pulse" />
                  <div className="h-3 bg-[#E8E5E1] rounded w-2/3 animate-pulse" />
                </div>
                <div className="h-6 bg-[#E8E5E1] rounded w-20 animate-pulse" />
              </div>
            ))}
          </div>
        ) : applications.length === 0 ? (
          <div className="p-12 text-center text-[#6B6B6B]">
            <p className="mb-4">You haven't tracked any jobs yet.</p>
            <Button variant="primary" onClick={handleDiscover} disabled={discovering}>
              {discovering ? 'Discovering…' : 'Discover your first match'}
            </Button>
          </div>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="bg-[#F8F7F4] border-b border-[#E8E5E1] text-[#5E5A56]">
              <tr>
                <th className="px-6 py-3 font-medium">Role & Company</th>
                <th className="px-6 py-3 font-medium hidden sm:table-cell">Location</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium hidden md:table-cell">Added</th>
                <th className="px-6 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8E5E1]">
              {applications.map((job) => (
                <tr
                  key={job.id}
                  onClick={() => navigate(`/jobs/${job.id}`)}
                  className="hover:bg-[#F8F7F4]/50 cursor-pointer transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div className="font-medium text-[#1F1F1F] mb-0.5">{job.jobTitle}</div>
                    <div className="text-[#6B6B6B]">{job.company}</div>
                  </td>
                  <td className="px-6 py-4 hidden sm:table-cell text-[#6B6B6B]">{job.location}</td>
                  <td className="px-6 py-4">
                    <StatusBadge status={job.status} />
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell text-[#6B6B6B]">
                    {new Date(job.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={(e) => handleEdit(job, e)}
                        className="p-1.5 text-[#6B6B6B] hover:text-[#7A5C46] rounded-md hover:bg-[#E8E5E1]/50"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => handleDelete(job.id, e)}
                        className="p-1.5 text-[#6B6B6B] hover:text-[#B5654A] rounded-md hover:bg-[#B5654A]/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <AddJobModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSaved={handleSaved}
        editingJob={editingJob}
      />
    </div>
  );
}
