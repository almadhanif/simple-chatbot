// app/api/chat/route.ts

import { streamText } from 'ai';
import { google } from '@ai-sdk/google';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const result = streamText({
      model: google('models/gemini-1.5-flash'),
      messages,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    return new Response(
      JSON.stringify({
        error:
          'Gagal berkomunikasi dengan AI: ' +
          (error instanceof Error ? error.message : String(error)),
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}

export async function GET() {
  return new Response(
    JSON.stringify({ status: 'ok', timestamp: new Date().toISOString() }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
}
