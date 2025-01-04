import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

// Set the runtime to edge
export const runtime = 'edge';

// Initialize OpenAI client
const client = openai({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    // Extract the prompt from the request body
    const { prompt } = await req.json();

    // Generate a stream of text
    const { textStream } = streamText({
      client, // Pass the initialized OpenAI client
      model: 'gpt-3.5-turbo', // Model name as a string
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant that generates quiz questions based on lesson notes. Generate thoughtful and challenging questions.',
        },
        {
          role: 'user',
          content: `Generate quiz questions based on the following lesson notes: ${prompt}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    // Create a readable stream
    const encoder = new TextEncoder();
    const readableStream = new ReadableStream({
      async start(controller) {
        for await (const chunk of textStream) {
          controller.enqueue(encoder.encode(chunk));
        }
        controller.close();
      },
    });

    // Return a response with the readable stream
    return new Response(readableStream, {
      headers: { 'Content-Type': 'text/plain' },
    });
  } catch (error) {
    console.error('Error in POST handler:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
