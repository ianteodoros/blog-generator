import type { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { theme, tone, language } = req.body;
  const prompt = `Scrie un articol de blog în limba ${language} cu tema "${theme}" și un ton ${tone}`;

  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
    });

    res.status(200).json({ content: completion.data.choices[0].message?.content || '' });
  } catch (error) {
    res.status(500).json({ error: 'Eroare la generare conținut' });
  }
}
