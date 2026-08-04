import { GoogleLogin, type CredentialResponse } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getErrorMessage } from '../api/client';

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID as string | undefined;

interface GoogleAuthButtonProps {
  onError: (message: string) => void;
}

export function GoogleAuthButton({ onError }: GoogleAuthButtonProps) {
  const { loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  if (!GOOGLE_CLIENT_ID) {
    return (
      <button
        type="button"
        disabled
        title="Set VITE_GOOGLE_CLIENT_ID in .env to enable Google sign-in"
        className="w-full flex items-center justify-center px-4 py-2 border border-[#E8E5E1] rounded-md text-sm text-[#6B6B6B] bg-[#F8F7F4] cursor-not-allowed"
      >
        Continue with Google (not configured)
      </button>
    );
  }

  async function handleSuccess(credentialResponse: CredentialResponse) {
    if (!credentialResponse.credential) {
      onError('Google sign-in did not return a credential.');
      return;
    }
    try {
      await loginWithGoogle(credentialResponse.credential);
      navigate('/dashboard');
    } catch (err) {
      onError(getErrorMessage(err));
    }
  }

  return (
    <div className="flex justify-center">
      <GoogleLogin onSuccess={handleSuccess} onError={() => onError('Google sign-in failed. Please try again.')} />
    </div>
  );
}
