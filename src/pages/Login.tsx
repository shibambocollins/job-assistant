import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getErrorMessage } from '../api/client';
import { AuthLayout } from '../components/AuthLayout';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout title="Welcome back" subtitle="Enter your details to access your dashboard.">
      {error && (
        <div className="mb-6 p-3 bg-[#B5654A]/10 border border-[#B5654A]/20 text-[#B5654A] text-sm rounded-md flex items-start">
          <X className="w-4 h-4 mr-2 mt-0.5 shrink-0" />
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <Input
          label="Email address"
          type="email"
          placeholder="name@example.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button className="w-full mt-2" type="submit" disabled={loading}>
          {loading ? 'Logging in…' : 'Log in'}
        </Button>
      </form>
      <div className="mt-6 text-center text-sm text-[#6B6B6B]">
        Don't have an account?{' '}
        <Link to="/register" className="text-[#7A5C46] font-medium hover:underline">
          Create one
        </Link>
      </div>
    </AuthLayout>
  );
}
