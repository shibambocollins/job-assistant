import { useEffect, useRef, useState, type FormEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getHistory, sendMessage } from '../api/chat';
import { getErrorMessage } from '../api/client';
import type { ChatResponse } from '../types';
import { Button } from '../components/ui/Button';
import { Alert } from '../components/ui/Alert';

interface JobContext {
  jobTitle: string;
  company: string;
}

export function Chat() {
  const location = useLocation();
  const navigate = useNavigate();
  const jobContext = location.state as JobContext | null;

  const [history, setHistory] = useState<ChatResponse[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getHistory()
      .then(setHistory)
      .catch((err) => setError(getErrorMessage(err)))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history, sending]);

  async function handleSend(e: FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;

    const message = input;
    setInput('');
    setSending(true);
    setError(null);
    try {
      const response = await sendMessage(message);
      setHistory((prev) => [...prev, response]);
    } catch (err) {
      setError(getErrorMessage(err));
      setInput(message);
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] max-w-4xl mx-auto w-full bg-white shadow-sm border-l border-r border-[#E8E5E1]">
      <div className="h-16 border-b border-[#E8E5E1] px-6 flex items-center justify-between shrink-0 bg-[#F8F7F4]">
        <div>
          <h2 className="font-medium text-[#1F1F1F]">Interview Prep Assistant</h2>
          {jobContext && (
            <p className="text-xs text-[#6B6B6B]">
              Context: {jobContext.jobTitle} @ {jobContext.company}
            </p>
          )}
        </div>
        <Button variant="ghost" onClick={() => navigate(-1)} className="text-sm">
          Close chat
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {loading ? (
          <p className="text-sm text-[#6B6B6B]">Loading conversation…</p>
        ) : (
          history.map((entry) => (
            <div key={entry.id} className="space-y-6">
              <div className="flex justify-end">
                <div className="max-w-[80%] rounded-lg px-4 py-3 text-sm whitespace-pre-wrap bg-[#6F8A68]/10 text-[#1F1F1F]">
                  {entry.userMessage}
                </div>
              </div>
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-lg px-4 py-3 text-sm whitespace-pre-wrap bg-white border border-[#E8E5E1] text-[#5E5A56]">
                  {entry.aiResponse}
                </div>
              </div>
            </div>
          ))
        )}

        {sending && (
          <div className="flex justify-start">
            <div className="bg-white border border-[#E8E5E1] rounded-lg px-4 py-3 flex space-x-1.5 items-center h-10">
              <div className="w-1.5 h-1.5 bg-[#A58A76] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-1.5 h-1.5 bg-[#A58A76] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-1.5 h-1.5 bg-[#A58A76] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      {error && <Alert className="mx-4 mb-2">{error}</Alert>}

      <div className="p-4 bg-white border-t border-[#E8E5E1] shrink-0">
        <form onSubmit={handleSend} className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your answer or ask a question..."
            className="flex-1 px-4 py-2 bg-[#F8F7F4] border border-[#E8E5E1] rounded-md focus:outline-none focus:ring-1 focus:ring-[#6F8A68] focus:border-[#6F8A68] text-sm text-[#1F1F1F]"
          />
          <Button type="submit" disabled={!input.trim() || sending}>
            Send
          </Button>
        </form>
      </div>
    </div>
  );
}
