import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { forgotPassword } from '../api/auth';
import { getErrorMessage } from '../api/client';
import { isValidEmail } from '../lib/validation';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { AuthLayout } from '../components/AuthLayout';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Alert } from '../components/ui/Alert';

export function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [emailTouched, setEmailTouched] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  useDocumentTitle('Reset Password | Job Assistant AI');

  const emailError = emailTouched && email.length > 0 && !isValidEmail(email) ? 'Enter a valid email address.' : undefined;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await forgotPassword(email);
      setSent(true);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <AuthLayout title="Check your email">
        <Alert variant="success" className="mb-6">
          If an account exists for {email}, we've sent a link to reset your password. It expires in 30 minutes.
        </Alert>
        <div className="text-center text-sm text-[#6B6B6B]">
          <Link to="/login" className="text-[#7A5C46] font-medium hover:underline">
            Back to login
          </Link>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout title="Reset your password" subtitle="Enter your email and we'll send you a reset link.">
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
        <Button className="w-full mt-2" type="submit" disabled={!isValidEmail(email) || loading}>
          {loading ? 'Sending…' : 'Send reset link'}
        </Button>
      </form>
      <div className="mt-6 text-center text-sm text-[#6B6B6B]">
        <Link to="/login" className="text-[#7A5C46] font-medium hover:underline">
          Back to login
        </Link>
      </div>
    </AuthLayout>
  );
}
