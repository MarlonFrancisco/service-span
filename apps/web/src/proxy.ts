import { NextRequest, NextResponse } from 'next/server';
import { UsersService } from './service/users';
import { IUser } from './types/api';
import { CACHE_QUERY_KEYS, getQueryClient } from './utils/helpers/query.helper';

export const proxy = async (req: NextRequest) => {
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

    const queryClient = getQueryClient();

    const userIdentification = req.cookies.get('user_identification')?.value;

    if (!userIdentification) {
      return NextResponse.redirect(new URL('/pricing', req.url));
    }

    let user = queryClient.getQueryData<IUser>(
      CACHE_QUERY_KEYS.user(userIdentification),
    );

    if (!user) {
      const accessToken = req.cookies.get('access_token')?.value;

      user = await UsersService.getUser({
        headers: { Cookie: `access_token=${accessToken}` },
      });

      if (user?.id) {
        queryClient.setQueryData(
          CACHE_QUERY_KEYS.user(userIdentification),
          user,
        );
      }
    }

    if (!user?.isSubscribed) {
      return NextResponse.redirect(new URL('/pricing', req.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error(error);
    return NextResponse.redirect(new URL('/pricing', req.url));
  }
};
