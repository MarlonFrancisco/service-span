import { UsersService } from '@/service/users';
import { NextRequest, NextResponse } from 'next/server';

export const middleware = async (req: NextRequest) => {
  try {
    if (!req.url.includes('partner')) {
      return NextResponse.next();
    }

    const accessToken = req.cookies.get('access_token')?.value;

    if (accessToken) {
      UsersService.apiClient.httpClient.defaults.headers['Cookie'] =
        `access_token=${accessToken}`;
    }

    const { data: user } = await UsersService.getUser();

    if (!user.isSubscribed) {
      return NextResponse.redirect(new URL('/pricing', req.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error(error);
    return NextResponse.redirect(new URL('/pricing', req.url));
  }
};
