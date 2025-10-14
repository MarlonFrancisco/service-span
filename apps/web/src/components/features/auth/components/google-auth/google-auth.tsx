'use client';
import { useAuthActions } from '@/store/auth/auth.hook';
import { useCallback, useEffect } from 'react';

export const GoogleAuth = () => {
  const { googleLoginAction, toggleAuthAction } = useAuthActions();

  const handleAuth = useCallback(
    async (response: { credential: string }) => {
      await googleLoginAction(response.credential);
      toggleAuthAction(false);
    },
    [googleLoginAction, toggleAuthAction],
  );

  useEffect(() => {
    window.google.accounts.id.initialize({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      callback: handleAuth,
    });

    window.google.accounts.id.renderButton(
      document.getElementById('google-sign-in-button')!,
      { theme: 'outline', size: 'large', shape: 'circle' },
    );

    window.google.accounts.id.prompt();
  }, [handleAuth]);

  return <div id="google-sign-in-button" />;
};
