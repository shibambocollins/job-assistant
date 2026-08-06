import { Link } from 'react-router-dom';

export function AppFooter() {
  return (
    <footer className="border-t border-[#E8E5E1] py-6 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-[#6B6B6B]">
        <span>Job Assistant AI</span>
        <div className="flex items-center gap-5">
          <Link to="/privacy-policy" className="hover:text-[#1F1F1F]">
            Privacy Policy
          </Link>
          <Link to="/terms-of-service" className="hover:text-[#1F1F1F]">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}
