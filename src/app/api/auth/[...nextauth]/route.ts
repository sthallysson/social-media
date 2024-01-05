/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextAuthOptions } from 'next-auth';
import NextAuth from 'next-auth/next';
import CredentialProvider from 'next-auth/providers/credentials';

import { api } from '@/services/api';
import { User } from '@/types/interfaces';

const authOption: NextAuthOptions = {
  providers: [
    CredentialProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },

      async authorize(credentials): Promise<User | null | undefined> {
        try {
          const response = await api.get('/users');
          const users: Array<User> = response.data;

          const user = users.filter(
            (user) => credentials?.email === user.email,
          );

          const isValidEmail = user[0].email === credentials?.email;
          const isValidPassword = user[0].password === credentials?.password;

          if (!isValidEmail || !isValidPassword) {
            return null;
          }

          return user[0];
        } catch (error) {
          console.log(error);
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      const customUser = user as unknown as any;
      if (user) {
        return { ...token, role: customUser.role };
      }

      return token;
    },
    session: async ({ session, token }) => {
      return {
        ...session,
        user: {
          name: token.name,
          email: token.email,
          role: token.role,
        },
      };
    },
  },
  pages: {
    signIn: '/login',
  },
};
const handler = NextAuth(authOption);

export { handler as GET, handler as POST };
