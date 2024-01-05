import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import './globals.css';
import { Toaster } from '@/components/ui/toaster';

import { AuthProvider } from '@/providers/auth-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Social Media',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <html lang="pt-BR">
        <body className={inter.className}>
          {children}
          <Toaster />
        </body>
      </html>
    </AuthProvider>
  );
}
