import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LogOut, Menu, User, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getCurrentUser, type CurrentUser } from '../api/auth';

const NAV_LINKS = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/cv', label: 'CV' },
];

export function AppNav() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getCurrentUser()
      .then(setUser)
      .catch(() => setUser(null));
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setProfileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!profileMenuOpen) return;
    function handleClickOutside(e: MouseEvent) {
      if (profileMenuRef.current && !profileMenuRef.current.contains(e.target as Node)) {
        setProfileMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [profileMenuOpen]);

  function handleLogout() {
    logout();
    navigate('/');
  }

  const initial = user?.email ? user.email.charAt(0).toUpperCase() : '?';

  return (
    <header className="bg-white border-b border-[#E8E5E1] sticky top-0 z-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/dashboard" className="font-heading text-xl text-[#7A5C46]">
            Job Assistant AI
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
          <div className="relative" ref={profileMenuRef}>
            <button
              onClick={() => setProfileMenuOpen((open) => !open)}
              className="w-8 h-8 bg-[#8A6F5A] rounded-full flex items-center justify-center text-white text-sm font-medium shrink-0 hover:brightness-95 transition"
              aria-label="Profile menu"
              aria-expanded={profileMenuOpen}
            >
              {initial}
            </button>

            {profileMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white border border-[#E8E5E1] rounded-md shadow-lg py-1 z-20">
                <div className="px-4 py-3 border-b border-[#E8E5E1]">
                  <p className="text-sm font-medium text-[#1F1F1F] truncate">{user?.fullName || 'Your account'}</p>
                  <p className="text-xs text-[#6B6B6B] truncate">{user?.email}</p>
                </div>
                <Link
                  to="/profile"
                  className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-[#1F1F1F] hover:bg-[#F8F7F4]"
                >
                  <User className="w-4 h-4 text-[#6B6B6B]" /> Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2.5 w-full text-left px-4 py-2.5 text-sm text-[#9C4E38] hover:bg-[#B5654A]/10"
                >
                  <LogOut className="w-4 h-4" /> Log out
                </button>
              </div>
            )}
          </div>

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
