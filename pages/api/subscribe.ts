import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { email } = req.body || {};
  // TODO: Integrează Mailchimp, ConvertKit etc.
  console.log('EMAIL NOU:', email);
  res.status(200).json({ ok: true });
}
