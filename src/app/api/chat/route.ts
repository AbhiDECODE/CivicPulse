import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@insforge/sdk';

const SYSTEM_PROMPT = `
You are the CivicPulse AI, an expert assistant specializing in the election process. 
Your goal is to help users understand election timelines, voting rules, eligibility, and procedures in an interactive and easy-to-follow way.

Guidelines:
1. Be impartial, professional, and encouraging.
2. Provide accurate information based on standard democratic election processes (primarily focused on India but adaptable).
3. If asked about specific dates, refer to official election commission websites for the most current data.
4. Explain complex terms (like "Model Code of Conduct", "EVM", "Affidavit") in simple language.
5. Encourage civic participation and voting.
6. If you don't know something for sure, advise the user to check with their local Election Commission office.

Keep your responses concise and well-structured using bullet points where appropriate.
`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    // Initialize InsForge client inside handler
    const insforge = createClient({
      baseUrl: process.env.INSFORGE_BASE_URL || '',
      anonKey: process.env.INSFORGE_API_KEY || '',
    });

    // Basic validation
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Invalid messages' }, { status: 400 });
    }

    // Call InsForge AI SDK (Gemini)
    const completion = await insforge.ai.chat.completions.create({
      model: 'google/gemini-3-pro-image-preview', // Use an enabled model from metadata
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messages.map((m: any) => ({
          role: m.role,
          content: m.content
        }))
      ],
      temperature: 0.7,
      maxTokens: 500,
    });

    const aiContent = completion.choices[0].message.content;

    return NextResponse.json({ content: aiContent });
  } catch (error: any) {
    console.error('AI Route Error:', error);
    return NextResponse.json({ 
      error: 'Failed to generate response',
      message: error.message 
    }, { status: 500 });
  }
}
