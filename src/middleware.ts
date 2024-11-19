import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  
  console.log(req.cookies.get("token")?.value)

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/intern', '/concludeProfile/intern'], 
};
