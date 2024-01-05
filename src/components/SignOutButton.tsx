'use client';

import { signOut } from 'next-auth/react';

import { Button } from './ui/button';

export function SignOutButton() {
  return (
    <Button
      variant={'destructive'}
      onClick={() => signOut()}
      className="fixed top-2 right-2"
    >
      Sair
    </Button>
  );
}
