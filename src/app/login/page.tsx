import { Metadata } from 'next';
import React from 'react';

import { SignInForm } from './SignInForm';

export const metadata: Metadata = {
  title: 'Login - Social Media',
};

export default function Login() {
  return (
    <div className="px-4 h-screen w-full flex items-center justify-center bg-zinc-950">
      <SignInForm />
    </div>
  );
}
