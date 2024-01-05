'use client';

import { useSession } from 'next-auth/react';

import { SignInForm } from './SignInForm';

export default function Login() {
  const { data: session } = useSession();
  return (
    <div className="px-4 h-screen w-full flex items-center justify-center bg-zinc-950">
      <SignInForm />
    </div>
  );
}
