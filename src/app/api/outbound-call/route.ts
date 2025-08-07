import { NextRequest, NextResponse } from 'next/server';
import twilio from 'twilio';

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID!,
  process.env.TWILIO_AUTH_TOKEN!
);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { toPhone } = body;

    const call = await client.calls.create({
      to: toPhone,
      from: process.env.TWILIO_PHONE_NUMBER!,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/api/outbound-voice-handler?to=${encodeURIComponent(toPhone)}`,
    });

    return NextResponse.json({ success: true, callSid: call.sid });
  } catch (error) {
    console.error('Call failed:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
