import { NextRequest, NextResponse } from 'next/server';

export const proxy = async (req: NextRequest) => {
  try {
    if (req.nextUrl.pathname === '/booking') {
      const query = req.nextUrl.searchParams.get('query');

      if (!query) {
        return NextResponse.redirect(new URL('/', req.url));
      }

      return NextResponse.next();
    }

    return NextResponse.next();
  } catch (error) {
    console.error(error);
    return NextResponse.redirect(new URL('/', req.url));
  }
};
