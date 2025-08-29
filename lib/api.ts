export const API_BASE = 'https://todolist-backend-bjnb.vercel.app';

export async function api(path: string, opts: RequestInit = {}) {
  const token =
    typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(opts.headers || {}),
  };

  const res = await fetch(`${API_BASE}${path}`, { ...opts, headers });
  if (!res.ok) {
    let msg = 'Request failed';
    try {
      const data = await res.json();
      msg = data.message || JSON.stringify(data);
    } catch {}
    throw new Error(msg);
  }
  return res.json();
}
