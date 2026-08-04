import { Navigate, Link } from 'react-router-dom';
import { Target, Activity, MessageSquare, FileText } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';

export function Landing() {
  const { isAuthenticated } = useAuth();

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
                Get Started
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="secondary" className="px-6 py-3 text-base">
                Sign In
              </Button>
            </Link>
          </div>
        </div>

        <div className="flex-1 w-full max-w-lg aspect-square relative bg-white border border-[#E8E5E1] shadow-sm rounded-lg p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-[#E8E5E1] pb-4 mb-2">
            <div className="w-32 h-4 bg-[#E8E5E1] rounded" />
            <div className="flex gap-2">
              <div className="w-8 h-8 rounded-full bg-[#F8F7F4]" />
            </div>
          </div>
          <div className="flex gap-6 h-full">
            <div className="flex-1 flex flex-col gap-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className={`p-4 border border-[#E8E5E1] rounded-md ${i === 1 ? 'border-[#6F8A68] bg-[#6F8A68]/5' : ''}`}>
                  <div className="w-3/4 h-3 bg-[#5E5A56] rounded mb-2" />
                  <div className="w-1/2 h-2 bg-[#A58A76] rounded" />
                </div>
              ))}
            </div>
            <div className="w-2/5 flex flex-col items-center pt-8">
              <div className="w-24 h-24 rounded-full border-4 border-[#E8E5E1] flex items-center justify-center relative mb-4">
                <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                  <circle
                    cx="44"
                    cy="44"
                    r="44"
                    fill="none"
                    stroke="#6F8A68"
                    strokeWidth="4"
                    strokeDasharray="276"
                    strokeDashoffset="40"
                    className="translate-x-1 translate-y-1"
                  />
                </svg>
                <span className="font-heading text-2xl text-[#7A5C46]">85</span>
              </div>
              <div className="w-full h-2 bg-[#E8E5E1] rounded mb-2" />
              <div className="w-2/3 h-2 bg-[#E8E5E1] rounded" />
            </div>
          </div>
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

      <footer className="py-8 px-8 border-t border-[#E8E5E1] flex justify-between items-center max-w-7xl mx-auto w-full mt-auto">
        <span className="font-heading text-[#7A5C46]">Job Assistant</span>
        <div className="text-sm text-[#6B6B6B] space-x-6">
          <span>© {new Date().getFullYear()}</span>
        </div>
      </footer>
    </div>
  );
}
