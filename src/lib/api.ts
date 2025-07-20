// src/lib/api.ts
const BASE_URL = import.meta.env.VITE_API_URL;

export async function api(path: string, init?: RequestInit) {
  const response = await fetch(`${BASE_URL}${path}`, {
    ...init,
    headers: {
      ...init?.headers,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Erro na requisição');
  }

  return response.json();
}
