import { Navigate, Link } from 'react-router-dom';
import { Target, Activity, MessageSquare, FileText } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export function Landing() {
  const { isAuthenticated } = useAuth();

  useDocumentTitle('Job Assistant — Apply with confidence');

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl w-full mx-auto">
        <div className="font-heading text-2xl tracking-tight">Job Assistant</div>
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-[#5E5A56]">
          <a href="#features" className="hover:text-[#1F1F1F]">
            Features
          </a>
        </div>
        <div className="flex items-center space-x-4">
          <Link to="/login">
            <Button variant="ghost">Sign In</Button>
          </Link>
          <Link to="/register">
            <Button variant="primary">Sign Up</Button>
          </Link>
        </div>
      </nav>

      <section className="flex-1 flex flex-col md:flex-row items-center justify-between px-8 py-20 max-w-7xl mx-auto w-full gap-16">
        <div className="flex-1 space-y-8">
          <h1 className="text-5xl md:text-6xl leading-tight">Stop guessing why you're not getting responses.</h1>
          <p className="text-lg text-[#6B6B6B] max-w-md">
            Job Assistant reads your CV, finds matching positions, and gives you actionable feedback on how to
            improve your fit before you apply.
          </p>
          <div className="flex items-center space-x-4">
            <Link to="/register">
              <Button variant="primary" className="px-6 py-3 text-base">
                Create your account
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="secondary" className="px-6 py-3 text-base">
                I already have one
              </Button>
            </Link>
          </div>
        </div>

        <div className="flex-1 w-full max-w-md bg-white border border-[#E8E5E1] shadow-sm rounded-lg p-8 flex flex-col items-center text-center">
          <span className="text-xs font-medium uppercase tracking-wide text-[#6B6B6B] mb-6">Your fit for this role</span>
          <div className="w-32 h-32 rounded-full border-[8px] border-[#F8F7F4] flex items-center justify-center relative mb-4">
            <svg className="absolute inset-0 w-full h-full transform -rotate-90">
              <circle
                cx="60"
                cy="60"
                r="56"
                fill="none"
                stroke="#6F8A68"
                strokeWidth="8"
                strokeDasharray="352"
                strokeDashoffset="53"
                strokeLinecap="round"
              />
            </svg>
            <span className="font-heading text-3xl text-[#7A5C46]">85%</span>
          </div>
          <p className="text-sm font-medium text-[#6F8A68] mb-1">Strong match</p>
          <p className="text-xs text-[#6B6B6B]">3 skills to highlight · 2 gaps to address</p>
        </div>
      </section>

      <section id="features" className="bg-white border-t border-[#E8E5E1] py-24">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-3xl mb-12">Practical tools for serious job seekers.</h2>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-8 bg-[#F8F7F4] p-8 rounded-lg border border-[#E8E5E1]">
              <Target className="w-8 h-8 text-[#7A5C46] mb-4" />
              <h3 className="font-heading text-xl mb-2">Precision Job Matching</h3>
              <p className="text-[#6B6B6B] max-w-lg">
                Upload your CV once. We continuously scan technical requirements across thousands of job boards and
                highlight positions where you have a tangible advantage based on your actual skills, not just
                keywords.
              </p>
            </div>

            <div className="md:col-span-4 bg-[#7A5C46] p-8 rounded-lg text-white">
              <Activity className="w-8 h-8 text-[#A58A76] mb-4" />
              <h3 className="font-heading text-xl mb-2 text-white">Gap Analysis</h3>
              <p className="text-[#E8E5E1] text-sm">
                Before you hit apply, see exactly which required skills are missing from your application and get
                actionable advice on how to address them in your cover letter.
              </p>
            </div>

            <div className="md:col-span-6 bg-white p-8 rounded-lg border border-[#E8E5E1] shadow-sm">
              <MessageSquare className="w-8 h-8 text-[#6F8A68] mb-4" />
              <h3 className="font-heading text-xl mb-2">Interview Prep Assistant</h3>
              <p className="text-[#6B6B6B]">
                Chat about your job search. Ask for likely interview questions based on the intersection of your
                CV's weak points and the roles you're targeting.
              </p>
            </div>

            <div className="md:col-span-6 bg-white p-8 rounded-lg border border-[#E8E5E1] shadow-sm">
              <FileText className="w-8 h-8 text-[#5E5A56] mb-4" />
              <h3 className="font-heading text-xl mb-2">Application Tracking</h3>
              <p className="text-[#6B6B6B]">
                Move beyond complex spreadsheets. Track where you are in the process for every role, store specific
                notes, and keep your job search organized in one clean view.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-8 px-8 border-t border-[#E8E5E1] flex justify-center items-center max-w-7xl mx-auto w-full mt-auto">
        <span className="font-heading text-[#7A5C46]">Job Assistant</span>
      </footer>
    </div>
  );
}
