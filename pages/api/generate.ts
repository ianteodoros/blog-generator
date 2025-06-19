import type { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { theme = '', tone = 'formal', language = 'RO' } = req.body ?? {};

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',            // cel mai ieftin/rapid disponibil
      messages: [
        {
          role: 'user',
          content: `Scrie un articol de blog în limba ${language}
                    cu tema "${theme}" și un ton ${tone}.`,
        },
      ],
    });

    res.status(200).json({ content: completion.choices[0].message.content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Eroare OpenAI' });
  }
}
