import { Link } from 'react-router-dom';
import { Compass } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export function NotFound() {
  const { isAuthenticated } = useAuth();
  const homeHref = isAuthenticated ? '/dashboard' : '/';

  useDocumentTitle('Page Not Found | Job Assistant AI');

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-14 h-14 bg-[#F8F7F4] border border-[#E8E5E1] rounded-full flex items-center justify-center mx-auto mb-6">
          <Compass className="w-6 h-6 text-[#7A5C46]" />
        </div>
        <div className="font-heading text-6xl text-[#7A5C46] mb-3">404</div>
        <h1 className="text-2xl mb-3">Page not found</h1>
        <p className="text-[#6B6B6B] mb-8">
          The page you're looking for doesn't exist, or it may have moved. Let's get you back on track.
        </p>
        <Link to={homeHref}>
          <Button variant="primary" className="px-6 py-3">
            {isAuthenticated ? 'Back to dashboard' : 'Back to home'}
          </Button>
        </Link>
      </div>
    </div>
  );
}
