import { NextRequest, NextResponse } from 'next/server';
import { getGeocode } from '@/utils/geocode';

type Context = {
  params: { address: string };
};

export async function GET(_: Request, context: Context) {
  return getGeocode(context.params.address) //
    .then((data) => NextResponse.json(data))
    .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
}
