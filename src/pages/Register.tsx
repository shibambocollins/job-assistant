import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getErrorMessage } from '../api/client';
import { getPasswordError, isValidEmail } from '../lib/validation';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { AuthLayout } from '../components/AuthLayout';
import { Button } from '../components/ui/Button';
import { Input, PasswordInput } from '../components/ui/Input';
import { Alert } from '../components/ui/Alert';
import { GoogleAuthButton } from '../components/GoogleAuthButton';

export function Register() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [emailTouched, setEmailTouched] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  useDocumentTitle('Create Account — Job Assistant');

  const emailError = emailTouched && email.length > 0 && !isValidEmail(email) ? 'Enter a valid email address.' : undefined;
  const passwordError = passwordTouched ? getPasswordError(password) : undefined;
  const canSubmit = fullName.trim().length > 0 && isValidEmail(email) && !getPasswordError(password) && !loading;

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
      {error && <Alert className="mb-6">{error}</Alert>}
      <form onSubmit={handleSubmit} noValidate>
        <Input
          label="Full name"
          type="text"
          required
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <Input
          label="Email address"
          type="email"
          required
          value={email}
          error={emailError}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => setEmailTouched(true)}
        />
        <div className="mb-4">
          <PasswordInput
            label="Password"
            placeholder="••••••••"
            required
            minLength={8}
            value={password}
            error={passwordError}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={() => setPasswordTouched(true)}
          />
          {!passwordError && (
            <p className="text-xs text-[#6B6B6B] -mt-3">At least 8 characters. Avoid common passwords.</p>
          )}
        </div>
        <Button className="w-full mt-2" type="submit" disabled={!canSubmit}>
          {loading ? 'Creating account…' : 'Create account'}
        </Button>
      </form>

      <div className="flex items-center gap-3 my-6">
        <div className="flex-1 h-px bg-[#E8E5E1]" />
        <span className="text-xs text-[#6B6B6B]">or</span>
        <div className="flex-1 h-px bg-[#E8E5E1]" />
      </div>
      <GoogleAuthButton onError={setError} />

      <div className="mt-6 text-center text-sm text-[#6B6B6B]">
        Already have an account?{' '}
        <Link to="/login" className="text-[#7A5C46] font-medium hover:underline">
          Log in
        </Link>
      </div>
    </AuthLayout>
  );
}
