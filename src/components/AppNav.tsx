import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getCurrentUser } from '../api/auth';

const NAV_LINKS = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/cv', label: 'CV' },
];

export function AppNav() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [initial, setInitial] = useState('?');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    getCurrentUser()
      .then((user) => setInitial(user.email.charAt(0).toUpperCase()))
      .catch(() => setInitial('?'));
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  function handleLogout() {
    logout();
    navigate('/');
  }

  return (
    <header className="bg-white border-b border-[#E8E5E1] sticky top-0 z-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/dashboard" className="font-heading text-xl text-[#7A5C46]">
            Job Assistant
          </Link>
          <nav className="hidden md:flex space-x-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors
                  ${
                    location.pathname.startsWith(link.to)
                      ? 'bg-[#F8F7F4] text-[#1F1F1F]'
                      : 'text-[#6B6B6B] hover:text-[#1F1F1F] hover:bg-[#F8F7F4]/50'
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <div className="w-8 h-8 bg-[#A58A76] rounded-full flex items-center justify-center text-white text-sm font-medium shrink-0">
            {initial}
          </div>
          <button onClick={handleLogout} className="text-[#6B6B6B] hover:text-[#1F1F1F]" title="Log out">
            <LogOut className="w-5 h-5" />
          </button>
          <button
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="md:hidden text-[#6B6B6B] hover:text-[#1F1F1F]"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <nav className="md:hidden border-t border-[#E8E5E1] px-4 py-3 space-y-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors
                ${
                  location.pathname.startsWith(link.to)
                    ? 'bg-[#F8F7F4] text-[#1F1F1F]'
                    : 'text-[#6B6B6B] hover:text-[#1F1F1F] hover:bg-[#F8F7F4]/50'
                }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
