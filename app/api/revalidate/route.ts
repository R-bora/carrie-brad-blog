import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret');

  if (process.env.REVALIDATION_SECRET && secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ message: 'Invalid secret token' }, { status: 401 });
  }

  try {
    revalidatePath('/');
    revalidatePath('/blog');
    return NextResponse.json({ revalidated: true, timestamp: Date.now() });
  } catch (err: any) {
    return NextResponse.json(
      { message: 'Error revalidating paths', error: err?.message || 'Unknown error' },
      { status: 500 }
    );
  }
}
