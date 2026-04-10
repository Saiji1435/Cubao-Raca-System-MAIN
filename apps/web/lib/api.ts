export async function apiFetch(endpoint: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include', // CRITICAL: Sends cookies to NestJS
  });
  if (!res.ok) throw new Error('Unauthorized or Network Error');
  return res.json();
}