'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { Spinner } from '@/components/ui/spinner';

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: any) => void;
          renderButton: (parent: HTMLElement, options: any) => void;
          prompt: (momentListener?: (notification: any) => void) => void;
        };
      };
    };
  }
}

interface GoogleLoginButtonProps {
  mode?: 'signin' | 'signup';
  targetExam?: 'STET_CSE' | 'BPSC_TRE_CSE' | 'BOTH';
  onError?: (msg: string) => void;
  className?: string;
}

export function GoogleLoginButton({
  mode = 'signin',
  targetExam = 'BOTH',
  onError,
  className = '',
}: GoogleLoginButtonProps) {
  const router = useRouter();
  const { loginWithGoogle } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showConfigHelp, setShowConfigHelp] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const googleBtnContainerRef = useRef<HTMLDivElement>(null);

  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  // Handle Google Credential Response
  const handleCredentialResponse = async (response: { credential: string }) => {
    if (!response?.credential) {
      onError?.('Google authentication failed: no credential received.');
      return;
    }

    setLoading(true);
    try {
      const result = await loginWithGoogle(response.credential, targetExam);
      if (result.success) {
        router.push('/dashboard');
      } else {
        onError?.(result.message || 'Google sign-in failed. Please try again.');
      }
    } catch (err: any) {
      onError?.(err?.message || 'Failed to authenticate with Google.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!clientId) return;

    if (!document.getElementById('google-jssdk')) {
      const script = document.createElement('script');
      script.id = 'google-jssdk';
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = () => setScriptLoaded(true);
      document.body.appendChild(script);
    } else {
      setScriptLoaded(true);
    }
  }, [clientId]);

  useEffect(() => {
    if (!scriptLoaded || !clientId || !window.google?.accounts?.id || !googleBtnContainerRef.current) {
      return;
    }

    try {
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: handleCredentialResponse,
        cancel_on_tap_outside: true,
      });

      googleBtnContainerRef.current.innerHTML = '';

      window.google.accounts.id.renderButton(googleBtnContainerRef.current, {
        type: 'standard',
        theme: 'outline',
        size: 'large',
        text: mode === 'signup' ? 'signup_with' : 'signin_with',
        shape: 'rectangular',
        logo_alignment: 'left',
        width: 360,
      });
    } catch (e) {
      console.error('Failed to initialize Google Sign-In button', e);
    }
  }, [scriptLoaded, clientId, mode, targetExam]);

  const handleManualClick = () => {
    if (!clientId) {
      setShowConfigHelp(true);
      return;
    }

    if (window.google?.accounts?.id) {
      window.google.accounts.id.prompt();
    }
  };

  return (
    <div className={`w-full space-y-3 ${className}`}>
      {clientId ? (
        <div className="flex justify-center w-full min-h-[44px]">
          <div ref={googleBtnContainerRef} className="w-full flex justify-center" />
        </div>
      ) : (
        <button
          type="button"
          onClick={handleManualClick}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 px-4 py-2.5 border border-slate-300 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-medium text-sm shadow-xs transition-all hover:border-slate-400 active:scale-[0.99] disabled:opacity-60 cursor-pointer"
        >
          {loading ? (
            <Spinner size="sm" className="text-slate-600" />
          ) : (
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
          )}
          <span>{mode === 'signup' ? 'Sign up with Google' : 'Sign in with Google'}</span>
        </button>
      )}

      {showConfigHelp && (
        <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 space-y-2 text-left">
          <div className="font-semibold flex items-center gap-1.5 text-amber-900">
            <span>Google Client ID Required:</span>
          </div>
          <p>
            Google Sign-In is integrated! To enable live Google account selection, obtain a Client ID from{' '}
            <a
              href="https://console.cloud.google.com/apis/credentials"
              target="_blank"
              rel="noreferrer"
              className="underline font-bold text-amber-900"
            >
              Google Cloud Console
            </a>{' '}
            and add it to your environment:
          </p>
          <code className="block bg-amber-100/80 p-2 rounded font-mono text-[11px] select-all break-all">
            NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
          </code>
          <button
            type="button"
            onClick={() => setShowConfigHelp(false)}
            className="text-[11px] font-bold text-amber-900 hover:underline pt-1 cursor-pointer block"
          >
            ✕ Dismiss
          </button>
        </div>
      )}
    </div>
  );
}
