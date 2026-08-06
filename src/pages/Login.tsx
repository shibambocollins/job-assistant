import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getErrorMessage } from '../api/client';
import { isValidEmail } from '../lib/validation';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { AuthLayout } from '../components/AuthLayout';
import { Button } from '../components/ui/Button';
import { Input, PasswordInput } from '../components/ui/Input';
import { Alert } from '../components/ui/Alert';
import { GoogleAuthButton } from '../components/GoogleAuthButton';

export function Login() {
  const [email, setEmail] = useState('');
  const [emailTouched, setEmailTouched] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  useDocumentTitle('Sign In — Job Assistant');

  const emailError = emailTouched && email.length > 0 && !isValidEmail(email) ? 'Enter a valid email address.' : undefined;
  const canSubmit = isValidEmail(email) && password.length > 0 && !loading;

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
      {error && <Alert className="mb-6">{error}</Alert>}
      <form onSubmit={handleSubmit} noValidate>
        <Input
          label="Email address"
          type="email"
          required
          value={email}
          error={emailError}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => setEmailTouched(true)}
        />
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-sm font-medium text-[#1F1F1F]">Password</label>
          <Link to="/forgot-password" className="text-xs text-[#7A5C46] hover:underline">
            Forgot password?
          </Link>
        </div>
        <PasswordInput
          placeholder="••••••••"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button className="w-full mt-2" type="submit" disabled={!canSubmit}>
          {loading ? 'Logging in…' : 'Log in'}
        </Button>
      </form>

      <div className="flex items-center gap-3 my-6">
        <div className="flex-1 h-px bg-[#E8E5E1]" />
        <span className="text-xs text-[#6B6B6B]">or</span>
        <div className="flex-1 h-px bg-[#E8E5E1]" />
      </div>
      <GoogleAuthButton onError={setError} />

      <div className="mt-6 text-center text-sm text-[#6B6B6B]">
        Don't have an account?{' '}
        <Link to="/register" className="text-[#7A5C46] font-medium hover:underline">
          Create one
        </Link>
      </div>
    </AuthLayout>
  );
}
