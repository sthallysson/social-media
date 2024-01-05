import {
  NextAuthMiddlewareOptions,
  NextRequestWithAuth,
  withAuth,
} from 'next-auth/middleware';
import { NextResponse } from 'next/server';

const middleware = (req: NextRequestWithAuth) => {
  console.log('[MIDDALEWARE_NEXTAUTH_TOKEN]: ', req.nextauth.token);

  const isPrivateRoutes = req.nextUrl.pathname.startsWith('/');
  const isAdminUser = req.nextauth.token?.role === 'admin';

  if (isPrivateRoutes && !isAdminUser) {
    return NextResponse.rewrite(new URL('/acesso-negado', req.url));
  }
};
const callbackOptions: NextAuthMiddlewareOptions = {};

export default withAuth(middleware, callbackOptions);
export const config = {
  matcher: '/',
};
