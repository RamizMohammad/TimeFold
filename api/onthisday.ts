import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  const { month, day } = req.query;

  if (!month || !day) {
    return res.status(400).json({ error: 'Month and day required' });
  }

  const url = `https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/all/${month}/${day}`;

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'TimeFold/1.0 (https://time-fold.vercel.app)',
      },
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: 'Fetch failed' });
  }
}
