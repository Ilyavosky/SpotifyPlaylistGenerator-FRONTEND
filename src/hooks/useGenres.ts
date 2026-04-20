'use client';

import { useState, useEffect } from 'react';
import { api } from '@/services/api';

export function useGenres() {
  const [genres, setGenres] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGenres = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await api.get('/genres');
        setGenres(data.genres);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar géneros');
      } finally {
        setLoading(false);
      }
    };

    fetchGenres();
  }, []);

  return { genres, loading, error };
}