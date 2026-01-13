import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { month, day } = req.query;

  if (!month || !day) {
    return res.status(400).json({ error: 'Month and day are required' });
  }

  const url = `https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/all/${month}/${day}`;

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'TimeFold/1.0 (https://time-fold.vercel.app)',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch from Wikimedia');
    }

    const data = await response.json();

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
}
