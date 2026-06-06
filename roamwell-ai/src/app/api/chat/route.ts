import { regions, zoneHealthData, regionDetails, defaultRegionDetails } from '@/lib/data';

export const maxDuration = 30;

function buildZoneSummary(): string {
  const lines: string[] = [];
  for (const [zoneName, zone] of Object.entries(zoneHealthData)) {
    lines.push(
      `${zone.displayName} (${zone.parentRegion}): ${zone.risks.map(r => r.name).join(', ') || 'None'}`
    );
  }
  return lines.join('\n');
}

function buildEmergencySummary(regionId: string): string {
  const details = regionDetails[regionId] || defaultRegionDetails;
  return details.emergencyContacts
    .map(c => `${c.name}, ${c.city}: ${c.phone} (${c.type})`)
    .join('\n');
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messages } = body;

    if (!Array.isArray(messages)) {
      return new Response('Invalid messages', { status: 400 });
    }

    const activeProfileHeader = req.headers.get('x-active-profile');
    const selectedRegion = req.headers.get('x-selected-region') || null;
    const selectedZone = req.headers.get('x-selected-zone') || null;

    const activeProfile = activeProfileHeader
      ? JSON.parse(activeProfileHeader)
      : null;
    const profileContext = activeProfile
      ? `Name: ${activeProfile.name}, Age: ${activeProfile.age}, Gender: ${activeProfile.gender}, Conditions: ${activeProfile.conditions?.join(', ') || 'None'}, Pregnant: ${activeProfile.isPregnant || false}`
      : 'No profile set';

    // Build a rich offline knowledge summary
    const zoneSummary = buildZoneSummary();
    const emergencyForRegion = selectedRegion
      ? `\nNEARBY HEALTH FACILITIES:\n${buildEmergencySummary(selectedRegion)}`
      : '';
    const zoneInfo = selectedZone
      ? `\nCURRENT ZONE: ${zoneHealthData[selectedZone]?.displayName || selectedZone} – Risks: ${
          zoneHealthData[selectedZone]?.risks.map(r => r.name).join(', ')
        }`
      : '';

    const systemPrompt = `You are the RoamWell AI, an expert health, wellness, and beauty assistant for Ethiopia.
    
CURRENT PERSON BEING ADVISED: ${profileContext}
SELECTED REGION: ${selectedRegion || 'No region selected'}
${zoneInfo}

OFFLINE KNOWLEDGE BASE – All Ethiopian Zones with Risks:
${zoneSummary}
${emergencyForRegion}

RULES:
- Always suggest Ethiopian traditional remedies (honey, teff, moringa, etc.) when relevant.
- Tailor advice to the user's profile, region, and zone.
- Remind users to consult a doctor for serious conditions.
- If asked about medical facilities, provide the available emergency contacts.
- Keep responses concise and friendly.`;

    // Convert UI messages to Groq's format
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
      return new Response(
        JSON.stringify({
          role: 'assistant',
          content:
            "I'm having trouble connecting to the AI service. Please try again in a moment.",
        }),
        { headers: { 'Content-Type': 'application/json' } }
      );
    }

    const reader = groqRes.body?.getReader();
    if (!reader) {
      return new Response(
        JSON.stringify({ role: 'assistant', content: 'No response from AI.' }),
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