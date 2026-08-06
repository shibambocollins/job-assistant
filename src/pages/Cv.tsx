import { useEffect, useRef, useState, type ChangeEvent, type DragEvent } from 'react';
import axios from 'axios';
import { FileText, FileUp } from 'lucide-react';
import { getMyCV, replaceCV, uploadCV } from '../api/cv';
import { getErrorMessage } from '../api/client';
import type { CV } from '../types';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { Button } from '../components/ui/Button';
import { Alert } from '../components/ui/Alert';

const ALLOWED_EXTENSIONS = ['.pdf', '.doc', '.docx'];

function parseSkills(skillsJson: string): string[] {
  try {
    const parsed = JSON.parse(skillsJson);
    if (Array.isArray(parsed)) return parsed;
    if (parsed && Array.isArray(parsed.skills)) return parsed.skills;
    return [];
  } catch {
    return [];
  }
}

function hasAllowedExtension(filename: string): boolean {
  const ext = filename.slice(filename.lastIndexOf('.')).toLowerCase();
  return ALLOWED_EXTENSIONS.includes(ext);
}

export function Cv() {
  const [cv, setCv] = useState<CV | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dragCounter = useRef(0);

  useDocumentTitle('Your CV | Job Assistant AI');

  async function load() {
    setLoading(true);
    try {
      const data = await getMyCV();
      setCv(data);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status !== 404) {
        setError(getErrorMessage(err));
      }
      setCv(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function processFile(file: File) {
    if (!hasAllowedExtension(file.name)) {
      setError('Please upload a PDF or Word document (.pdf, .doc, .docx).');
      return;
    }

    setUploading(true);
    setError(null);
    try {
      if (cv) {
        await replaceCV(file);
      } else {
        await uploadCV(file);
      }
      await load();
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setUploading(false);
    }
  }

  function handleFileSelected(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (file) processFile(file);
  }

  function handleDragEnter(e: DragEvent) {
    e.preventDefault();
    if (uploading || !e.dataTransfer.types.includes('Files')) return;
    dragCounter.current += 1;
    setIsDragging(true);
  }

  function handleDragOver(e: DragEvent) {
    e.preventDefault();
  }

  function handleDragLeave(e: DragEvent) {
    e.preventDefault();
    dragCounter.current = Math.max(0, dragCounter.current - 1);
    if (dragCounter.current === 0) setIsDragging(false);
  }

  function handleDrop(e: DragEvent) {
    e.preventDefault();
    dragCounter.current = 0;
    setIsDragging(false);
    if (uploading) return;
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  }

  const skills = cv ? parseSkills(cv.skillsJson) : [];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-2xl mb-2">Your Profile</h1>
      <p className="text-[#6B6B6B] text-sm mb-8">
        Your CV is used to calculate match scores and generate personalized interview questions.
      </p>

      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.doc,.docx"
        className="hidden"
        onChange={handleFileSelected}
      />

      {error && <Alert className="mb-4">{error}</Alert>}

      <div onDragEnter={handleDragEnter} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}>
        {isDragging ? (
          <div className="border-2 border-dashed border-[#6F8A68] bg-[#6F8A68]/5 rounded-lg p-12 text-center">
            <div className="w-12 h-12 bg-[#6F8A68]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileUp className="w-6 h-6 text-[#6F8A68]" />
            </div>
            <h3 className="text-lg font-medium text-[#6F8A68] mb-1">Drop to upload</h3>
            <p className="text-[#6B6B6B] text-sm">Release your PDF or Word document here.</p>
          </div>
        ) : loading ? (
          <div className="border border-[#E8E5E1] rounded-lg p-12 text-center bg-white shadow-sm">
            <p className="text-[#6B6B6B]">Loading…</p>
          </div>
        ) : uploading ? (
          <div className="border border-[#E8E5E1] rounded-lg p-12 text-center bg-white shadow-sm flex flex-col items-center justify-center space-y-4">
            <div className="w-8 h-8 border-4 border-[#E8E5E1] border-t-[#6F8A68] rounded-full animate-spin" />
            <p className="text-[#5E5A56] font-medium">Extracting skills from document...</p>
          </div>
        ) : !cv ? (
          <div className="border-2 border-dashed border-[#E8E5E1] rounded-lg p-12 text-center bg-white hover:border-[#A58A76] transition-colors">
            <div className="w-12 h-12 bg-[#F8F7F4] rounded-full flex items-center justify-center mx-auto mb-4">
              <FileUp className="w-6 h-6 text-[#7A5C46]" />
            </div>
            <h3 className="text-lg font-medium mb-2">Upload your CV</h3>
            <p className="text-[#6B6B6B] text-sm mb-6 max-w-sm mx-auto">
              Drag and drop your PDF or Word document anywhere on this page, or browse to select a file. We'll
              extract your skills automatically.
            </p>
            <Button variant="primary" onClick={() => fileInputRef.current?.click()}>
              Browse files
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-white border border-[#E8E5E1] shadow-sm rounded-lg p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#F8F7F4] rounded-md text-[#7A5C46]">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-medium text-[#1F1F1F]">{cv.originalFilename}</h3>
                  <p className="text-sm text-[#6B6B6B]">
                    Uploaded on {new Date(cv.uploadedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <Button variant="secondary" onClick={() => fileInputRef.current?.click()}>
                Replace CV
              </Button>
            </div>
            <p className="text-xs text-[#6B6B6B] -mt-3">
              Tip: you can also drag a new file anywhere on this page to replace your CV.
            </p>

            <div className="bg-white border border-[#E8E5E1] shadow-sm rounded-lg p-6">
              <h3 className="font-medium text-[#1F1F1F] mb-4">Extracted Core Skills</h3>
              {skills.length === 0 ? (
                <p className="text-sm text-[#6B6B6B]">No skills extracted yet.</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-[#F8F7F4] border border-[#E8E5E1] rounded-full text-sm text-[#1F1F1F]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}
              <p className="text-xs text-[#6B6B6B] mt-4">
                These skills are automatically compared against job descriptions to calculate your match score.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
