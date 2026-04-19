'use client';

import { useState } from 'react';
import Sidebar from '@/components/SideBar';
import GenreSelector from '@/components/GenreSelector';
import VibeSlider from '@/components/VibeSlider';
import TrackCard from '@/components/TrackCard';
import { useGenres } from '@/hooks/useGenres';
import { useRecommendations } from '@/hooks/useRecommendations';
import { api } from '@/services/api';
import styles from './page.module.css';

export default function DashboardPage() {
  const { genres, loading: loadingGenres } = useGenres();
  const { tracks, loading: loadingTracks, error, fetchRecommendations } = useRecommendations();

  const [sessionName, setSessionName] = useState('');
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [valence, setValence] = useState(0.5);
  const [energy, setEnergy] = useState(0.5);
  const [danceability, setDanceability] = useState(0.5);
  const [sessionId, setSessionId] = useState<number | null>(null);
  const [accepted, setAccepted] = useState<Set<number>>(new Set());
  const [rejected, setRejected] = useState<Set<number>>(new Set());
  const [exporting, setExporting] = useState(false);
  const [exportUrl, setExportUrl] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!sessionName || selectedGenres.length === 0) return;
    try {
      const session = await api.post('/sessions', {
        name: sessionName,
        target_valence: valence,
        target_energy: energy,
        target_danceability: danceability,
        seed_genres: selectedGenres,
      });
      setSessionId(session.id);
      setAccepted(new Set());
      setRejected(new Set());
      setExportUrl(null);
      await fetchRecommendations({
        session_id: session.id,
        seed_genres: selectedGenres,
        target_valence: valence,
        target_energy: energy,
        target_danceability: danceability,
      });
    } catch {
    }
  };

  const handleAccept = async (trackId: number) => {
    if (!sessionId) return;
    await api.patch('/favorites/status', { session_id: sessionId, track_id: trackId, status: 'accepted' });
    setAccepted(prev => new Set(prev).add(trackId));
    setRejected(prev => { const s = new Set(prev); s.delete(trackId); return s; });
  };

  const handleReject = async (trackId: number) => {
    if (!sessionId) return;
    await api.patch('/favorites/status', { session_id: sessionId, track_id: trackId, status: 'rejected' });
    setRejected(prev => new Set(prev).add(trackId));
    setAccepted(prev => { const s = new Set(prev); s.delete(trackId); return s; });
  };

  const handleExport = async () => {
    if (!sessionId || accepted.size === 0) return;
    setExporting(true);
    try {
      const result = await api.post('/playlists', { session_id: sessionId, name: sessionName });
      setExportUrl(result.spotify_url);
    } finally {
      setExporting(false);
    }
  };

  const visibleTracks = tracks.filter(t => !rejected.has(t.id));
  const canGenerate = !loadingTracks && sessionName.length > 0 && selectedGenres.length > 0;

  return (
    <div className={styles.layout}>
      <Sidebar />
      <main className={styles.layout_main}>

        <div className={styles.panel}>
          <p className={styles.label}>Playlist</p>

          <div className={styles.field}>
            <p className={styles.fieldLabel}>Nombre</p>
            <input
              type="text"
              value={sessionName}
              onChange={e => setSessionName(e.target.value)}
              placeholder="Playlist..."
              className={styles.input}
            />
          </div>

          {loadingGenres
            ? <p className={styles.muted}>Cargando géneros...</p>
            : <GenreSelector genres={genres} selected={selectedGenres} onChange={setSelectedGenres} />
          }

          <VibeSlider label="Energía" description="Intensidad del ritmo" value={energy} onChange={setEnergy} />
          <VibeSlider label="Positividad" description="Qué tan alegre suena" value={valence} onChange={setValence} />
          <VibeSlider label="Bailabilidad" description="Qué tan bailable es" value={danceability} onChange={setDanceability} />

          <button onClick={handleGenerate} disabled={!canGenerate} className={styles.btnGenerate}>
            {loadingTracks ? 'Generando...' : 'Generar'}
          </button>
        </div>

        <div className={styles.results}>
          <p className={styles.label}>Recomendaciones</p>

          {error && <p className={styles.error}>{error}</p>}
          {loadingTracks && <p className={styles.muted}>Buscando tracks...</p>}
          {!loadingTracks && tracks.length === 0 && (
            <p className={styles.muted}>Configura tu sesión y presiona Generar.</p>
          )}

          <div className={styles.list}>
            {visibleTracks.map(track => (
              <div key={track.id} className={accepted.has(track.id) ? styles.accepted : ''}>
                <TrackCard track={track} onAccept={handleAccept} onReject={handleReject} />
              </div>
            ))}
          </div>

          {accepted.size > 0 && (
            <div className={styles.exportWrapper}>
              {exportUrl ? (
                <a href={exportUrl} target="_blank" rel="noopener noreferrer" className={styles.btnSpotify}>
                  Ver en Spotify 
                </a>
              ) : (
                <button onClick={handleExport} disabled={exporting} className={styles.btnExport}>
                  {exporting ? 'Exportando...' : `Exportar a Spotify (${accepted.size} tracks) `}
                </button>
              )}
            </div>
          )}
        </div>

      </main>
    </div>
  );
}