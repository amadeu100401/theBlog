import { Auth } from '@/shared/constants/system_const';
import { NextRequest, NextResponse } from 'next/server';

const privateRoutes = ['/admin', '/dashboard', '/profile'];

export function proxy(reuqest: NextRequest) {
  const token = reuqest.cookies.get(Auth.AUTH_TOKEN)?.value as string;
  const { pathname } = reuqest.nextUrl;

  const isPrivateRoute = privateRoutes.some(route =>
    pathname.startsWith(route),
  );

  if (isPrivateRoute && !token) {
    const loginUrl = new URL('/login', reuqest.url);

    loginUrl.searchParams.set('callbackUrl', pathname);

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  /*
   * Filtra o middleware para NÃO rodar em arquivos estáticos (imagens, favicon)
   * e rodar apenas nas páginas do sistema.
   */
  matcher: ['/((?!_next/static|_next/image|favicon.ico|public|uploads).*)'],
};
