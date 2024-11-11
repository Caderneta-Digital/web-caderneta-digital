import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  // Verificar se o usuário está autenticado (por exemplo, via cookies)
  const isAuthenticated = Boolean(req.cookies.get('token'));

  // Se não estiver autenticado e tentar acessar /profile ou /dashboard, redireciona para /login
  if (!isAuthenticated && (req.nextUrl.pathname.startsWith('/profile') || req.nextUrl.pathname.startsWith('/dashboard'))) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

// Configuração para aplicar o middleware nas rotas específicas
export const config = {
  matcher: ['/profile/*', '/dashboard/*'], // Protege as rotas /profile e /dashboard
};
