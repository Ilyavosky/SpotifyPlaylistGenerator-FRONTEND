'use client';

import { useState } from 'react';
import { api } from '@/services/api';
import { Track } from '@/types';

interface RecommendationParams {
  session_id: number;
  seed_genres: string[];
  target_valence: number;
  target_energy: number;
  target_danceability: number;
}

export function useRecommendations() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRecommendations = async (params: RecommendationParams) => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.post('/recommendations', params);
      setTracks(data.tracks);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al obtener recomendaciones');
    } finally {
      setLoading(false);
    }
  };

  return { tracks, loading, error, fetchRecommendations };
}