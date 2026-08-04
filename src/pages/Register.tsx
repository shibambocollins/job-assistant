import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getErrorMessage } from '../api/client';
import { AuthLayout } from '../components/AuthLayout';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

export function Register() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await register(email, password, fullName);
      navigate('/dashboard');
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout title="Create an account" subtitle="Start tracking and analyzing your job applications.">
      {error && (
        <div className="mb-6 p-3 bg-[#B5654A]/10 border border-[#B5654A]/20 text-[#B5654A] text-sm rounded-md flex items-start">
          <X className="w-4 h-4 mr-2 mt-0.5 shrink-0" />
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <Input
          label="Full name"
          type="text"
          placeholder="Jane Doe"
          required
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <Input
          label="Email address"
          type="email"
          placeholder="name@example.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="mb-4">
          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className="text-xs text-[#6B6B6B] mt-1">Must be at least 8 characters long.</p>
        </div>
        <Button className="w-full mt-2" type="submit" disabled={loading}>
          {loading ? 'Creating account…' : 'Create account'}
        </Button>
      </form>
      <div className="mt-6 text-center text-sm text-[#6B6B6B]">
        Already have an account?{' '}
        <Link to="/login" className="text-[#7A5C46] font-medium hover:underline">
          Log in
        </Link>
      </div>
    </AuthLayout>
  );
}
