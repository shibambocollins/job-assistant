import { Navigate, Link } from 'react-router-dom';
import { Target, Activity, MessageSquare, FileText, ScanEye, ListFilter, FileWarning } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { ScoreRing } from '../components/ScoreRing';
import { Reveal } from '../components/Reveal';
import { useAuth } from '../context/AuthContext';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export function Landing() {
  const { isAuthenticated } = useAuth();

  useDocumentTitle('Job Assistant AI | Apply with confidence');

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="flex items-center justify-between px-4 sm:px-8 py-6 max-w-7xl w-full mx-auto">
        <div className="font-heading text-2xl tracking-tight">Job Assistant AI</div>
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-[#5E5A56]">
          <a href="#about" className="hover:text-[#1F1F1F]">
            About
          </a>
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

      <section className="flex-1 flex flex-col md:flex-row items-center justify-between px-4 sm:px-8 py-20 max-w-7xl mx-auto w-full gap-16">
        <div className="flex-1 space-y-8 animate-fade-in-up">
          <h1 className="text-4xl sm:text-5xl md:text-6xl leading-tight">Stop guessing why you're not getting responses.</h1>
          <p className="text-lg text-[#6B6B6B] max-w-md">
            Job Assistant AI reads your CV, finds matching positions, and gives you actionable feedback on how to
            improve your fit before you apply.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/register">
              <Button variant="primary" className="w-full sm:w-auto px-6 py-3 text-base">
                Get Started
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="secondary" className="w-full sm:w-auto px-6 py-3 text-base">
                Log In
              </Button>
            </Link>
          </div>
        </div>

        <div
          className="flex-1 w-full max-w-md bg-white border border-[#E8E5E1] shadow-sm rounded-lg p-8 flex flex-col items-center text-center animate-fade-in-up transition-transform duration-300 hover:-translate-y-1 hover:shadow-md"
          style={{ animationDelay: '150ms' }}
        >
          <span className="text-xs font-medium uppercase tracking-wide text-[#6B6B6B] mb-6">Your fit for this role</span>
          <div className="relative w-32 h-32 mb-4">
            <ScoreRing score={85} size={128} strokeWidth={8} />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-heading text-3xl text-[#7A5C46]">85%</span>
            </div>
          </div>
          <p className="text-sm font-medium text-[#6F8A68] mb-1">Strong match</p>
          <p className="text-xs text-[#6B6B6B]">3 skills to highlight · 2 gaps to address</p>
        </div>
      </section>

      <section id="about" className="bg-[#7A5C46] py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <Reveal>
            <div className="max-w-2xl mb-16">
              <span className="text-xs font-medium uppercase tracking-wide text-[#E8E5E1]">Why this exists</span>
              <h2 className="text-3xl text-white mt-2 mb-4">
                Most rejections don't come from a person. They come from software you never see.
              </h2>
              <p className="text-[#E8E5E1] leading-relaxed">
                Before a recruiter ever opens your CV, it usually passes through an{' '}
                <strong className="text-white">Applicant Tracking System (ATS)</strong> — software companies use to
                scan, filter, and rank applications automatically. If your CV doesn't include the right keywords, or
                its formatting confuses the parser, it can be filtered out before a human ever sees it. That's why
                qualified candidates often hear nothing back and never find out why.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Reveal delayMs={0}>
              <div className="bg-white/10 border border-white/15 rounded-lg p-6 h-full">
                <ScanEye className="w-7 h-7 text-[#E8E5E1] mb-4" />
                <h3 className="text-white text-lg font-heading mb-2">It scans before a human does</h3>
                <p className="text-[#E8E5E1] text-sm leading-relaxed">
                  Most mid-size and large companies run every application through an ATS first. Your CV is parsed
                  into data — skills, titles, dates — before anyone reads it as a document.
                </p>
              </div>
            </Reveal>
            <Reveal delayMs={100}>
              <div className="bg-white/10 border border-white/15 rounded-lg p-6 h-full">
                <ListFilter className="w-7 h-7 text-[#E8E5E1] mb-4" />
                <h3 className="text-white text-lg font-heading mb-2">It filters on exact keywords</h3>
                <p className="text-[#E8E5E1] text-sm leading-relaxed">
                  If the job description says "project management" and your CV says "managed projects," some
                  systems won't reliably connect the two. Close isn't always close enough.
                </p>
              </div>
            </Reveal>
            <Reveal delayMs={200}>
              <div className="bg-white/10 border border-white/15 rounded-lg p-6 h-full">
                <FileWarning className="w-7 h-7 text-[#E8E5E1] mb-4" />
                <h3 className="text-white text-lg font-heading mb-2">Formatting can break parsing</h3>
                <p className="text-[#E8E5E1] text-sm leading-relaxed">
                  Tables, columns, text boxes, and graphics that look great to a human can scramble or disappear
                  entirely when a parser reads them — silently costing you a match.
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delayMs={100}>
            <p className="text-[#E8E5E1] leading-relaxed max-w-2xl mt-12">
              Job Assistant AI reads your CV the way these systems do, compares it against a specific job's
              requirements, and shows you exactly which keywords and skills are missing — so you can fix it before
              you apply, not wonder why you never heard back.
            </p>
          </Reveal>
        </div>
      </section>

      <section id="features" className="bg-white border-t border-[#E8E5E1] py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <Reveal>
            <h2 className="text-3xl mb-12">Practical tools for serious job seekers.</h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <Reveal className="md:col-span-8" delayMs={0}>
              <div className="bg-[#F8F7F4] p-8 rounded-lg border border-[#E8E5E1] h-full transition-shadow duration-300 hover:shadow-md">
                <Target className="w-8 h-8 text-[#7A5C46] mb-4" />
                <h3 className="font-heading text-xl mb-2">Precision Job Matching</h3>
                <p className="text-[#6B6B6B] max-w-lg">
                  Upload your CV once. We continuously scan technical requirements across thousands of job boards
                  and highlight positions where you have a tangible advantage based on your actual skills, not just
                  keywords.
                </p>
              </div>
            </Reveal>

            <Reveal className="md:col-span-4" delayMs={100}>
              <div className="bg-[#7A5C46] p-8 rounded-lg text-white h-full transition-shadow duration-300 hover:shadow-md">
                <Activity className="w-8 h-8 text-[#A58A76] mb-4" />
                <h3 className="font-heading text-xl mb-2 text-white">Gap Analysis</h3>
                <p className="text-[#E8E5E1] text-sm">
                  Before you hit apply, see exactly which required skills are missing from your application and get
                  actionable advice on how to address them in your cover letter.
                </p>
              </div>
            </Reveal>

            <Reveal className="md:col-span-6" delayMs={0}>
              <div className="bg-white p-8 rounded-lg border border-[#E8E5E1] shadow-sm h-full transition-shadow duration-300 hover:shadow-md">
                <MessageSquare className="w-8 h-8 text-[#6F8A68] mb-4" />
                <h3 className="font-heading text-xl mb-2">Interview Prep Assistant</h3>
                <p className="text-[#6B6B6B]">
                  Chat about your job search. Ask for likely interview questions based on the intersection of your
                  CV's weak points and the roles you're targeting.
                </p>
              </div>
            </Reveal>

            <Reveal className="md:col-span-6" delayMs={100}>
              <div className="bg-white p-8 rounded-lg border border-[#E8E5E1] shadow-sm h-full transition-shadow duration-300 hover:shadow-md">
                <FileText className="w-8 h-8 text-[#5E5A56] mb-4" />
                <h3 className="font-heading text-xl mb-2">Application Tracking</h3>
                <p className="text-[#6B6B6B]">
                  Move beyond complex spreadsheets. Track where you are in the process for every role, store
                  specific notes, and keep your job search organized in one clean view.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <footer className="py-8 px-4 sm:px-8 border-t border-[#E8E5E1] flex flex-col sm:flex-row justify-between items-center gap-4 max-w-7xl mx-auto w-full mt-auto">
        <span className="font-heading text-[#7A5C46]">Job Assistant AI</span>
        <div className="flex items-center gap-6 text-sm text-[#6B6B6B]">
          <Link to="/privacy-policy" className="hover:text-[#1F1F1F]">
            Privacy Policy
          </Link>
          <Link to="/terms-of-service" className="hover:text-[#1F1F1F]">
            Terms of Service
          </Link>
        </div>
      </footer>
    </div>
  );
}
