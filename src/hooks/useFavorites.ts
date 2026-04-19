'use client';

import { useState, useEffect } from 'react';
import { api } from '@/services/api';
import { Favorite } from '@/types';

export function useFavorites(sessionId: number | null) {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!sessionId) return;
    const fetchFavorites = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await api.get(`/favorites?session_id=${sessionId}`);
        setFavorites(data.favorites);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar favoritos');
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [sessionId]);

  const updateStatus = async (trackId: number, status: 'accepted' | 'rejected') => {
    if (!sessionId) return;
    try {
      await api.patch('/favorites/status', { session_id: sessionId, track_id: trackId, status });
      setFavorites(prev =>
        status === 'rejected'
          ? prev.filter(f => f.track_id !== trackId)
          : prev.map(f => f.track_id === trackId ? { ...f, status } : f)
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al actualizar estado');
    }
  };

  return { favorites, loading, error, updateStatus };
}