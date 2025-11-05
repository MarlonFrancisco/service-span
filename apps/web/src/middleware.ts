import { UsersService } from '@/service/users';
import { NextRequest, NextResponse } from 'next/server';

export const middleware = async (req: NextRequest) => {
  try {
    if (req.nextUrl.pathname === '/booking') {
      const query = req.nextUrl.searchParams.get('query');

      if (!query) {
        return NextResponse.redirect(new URL('/', req.url));
      }

      return NextResponse.next();
    }

    if (!req.url.includes('partner')) {
      return NextResponse.next();
    }

    const accessToken = req.cookies.get('access_token')?.value;

    const user = await UsersService.getUser({
      headers: { Cookie: `access_token=${accessToken}` },
    });

    if (!user.isSubscribed) {
      return NextResponse.redirect(new URL('/pricing', req.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error(error);
    return NextResponse.redirect(new URL('/pricing', req.url));
  }
};
