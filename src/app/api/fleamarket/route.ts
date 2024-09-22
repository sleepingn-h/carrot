import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // const geocode = getGeocode(context.params.address);
  // console.log(context.params.address);

  return NextResponse.json('Hello');
}
