import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const to = url.searchParams.get('to');

  const twiml = `
    <Response>
      <Say voice="alice">Connecting your call now.</Say>
      <Dial>${to}</Dial>
    </Response>
  `;

  return new NextResponse(twiml, {
    status: 200,
    headers: {
      'Content-Type': 'text/xml',
    },
  });
}
