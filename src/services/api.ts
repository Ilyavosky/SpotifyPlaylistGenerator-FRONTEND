const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const apiFetch = async (endpoint: string, options?: RequestInit) => {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Error inesperado');
  }

  return res.json();
};

export const api = {
  get: (endpoint: string) => apiFetch(endpoint),
  post: (endpoint: string, body: unknown) =>
    apiFetch(endpoint, { method: 'POST', body: JSON.stringify(body) }),
  patch: (endpoint: string, body: unknown) =>
    apiFetch(endpoint, { method: 'PATCH', body: JSON.stringify(body) }),
};