import { regions } from '@/lib/data';

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messages } = body;

    if (!Array.isArray(messages)) {
      return new Response('Invalid messages', { status: 400 });
    }

    // Read context from headers
    const activeProfileHeader = req.headers.get('x-active-profile');
    const selectedRegion = req.headers.get('x-selected-region') || null;

    const activeProfile = activeProfileHeader
      ? JSON.parse(activeProfileHeader)
      : null;
    const profileContext = activeProfile
      ? `Name: ${activeProfile.name}, Age: ${activeProfile.age}, Gender: ${activeProfile.gender}, Conditions: ${activeProfile.conditions?.join(', ') || 'None'}, Pregnant: ${activeProfile.isPregnant || false}`
      : 'No profile set';

    const localDataSummary = regions
      .map(
        (r) =>
          `${r.name}: Altitude ${r.altitude}m, Climate ${r.climate}. Risks: ${r.risks.map((risk) => risk.name).join(', ')}.`
      )
      .join('\n');

    const systemPrompt = `You are the RoamWell AI, an expert health, wellness, and beauty assistant for Ethiopia.
    
CURRENT PERSON BEING ADVISED: ${profileContext}
SELECTED REGION: ${selectedRegion || 'No region selected'}

OFFLINE KNOWLEDGE BASE:
${localDataSummary}

RULES:
- Always suggest Ethiopian traditional remedies (honey, teff, moringa, etc.) when relevant.
- Tailor advice to the user's profile and region.
- Remind users to consult a doctor for serious conditions.
- Keep responses concise.`;

    // Convert UI messages to Groq's expected format
    const groqMessages = [
      { role: 'system', content: systemPrompt },
      ...messages.map((m: any) => ({
        role: m.role,
        content:
          m.content ||
          m.parts
            ?.filter((p: any) => p.type === 'text')
            .map((p: any) => p.text)
            .join('') ||
          '',
      })),
    ];

    // Call Groq API directly
    const groqRes = await fetch(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: groqMessages,
          temperature: 0.7,
          max_tokens: 1024,
          stream: true,
        }),
      }
    );

    if (!groqRes.ok) {
      const errText = await groqRes.text();
      console.error('[RoamWell] Groq error:', errText);
      // Fallback to a simple JSON response
      return new Response(
        JSON.stringify({
          role: 'assistant',
          content:
            "I'm having trouble connecting to the AI service. Please try again in a moment.",
        }),
        { headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Transform Groq's SSE stream into the format our client expects (plain JSON)
    const reader = groqRes.body?.getReader();
    if (!reader) {
      return new Response(
        JSON.stringify({
          role: 'assistant',
          content: 'No response from AI.',
        }),
        { headers: { 'Content-Type': 'application/json' } }
      );
    }

    const decoder = new TextDecoder();
    let fullContent = '';

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');
        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed || !trimmed.startsWith('data: ')) continue;
          const data = trimmed.slice(6);
          if (data === '[DONE]') break;
          try {
            const parsed = JSON.parse(data);
            const delta = parsed.choices?.[0]?.delta?.content;
            if (delta) fullContent += delta;
          } catch {}
        }
      }
    } finally {
      reader.releaseLock();
    }

    // Return the complete response as JSON
    return new Response(
      JSON.stringify({ role: 'assistant', content: fullContent }),
      { headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('[RoamWell] Error:', error);
    return new Response(
      JSON.stringify({
        role: 'assistant',
        content: 'Something went wrong. Please try again.',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}