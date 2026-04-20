'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Sidebar from '@/components/SideBar';
import { useFavorites } from '@/hooks/useFavorites';
import styles from './page.module.css';

function formatDuration(ms: number): string {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

function FavoritesContent() {
  const params = useSearchParams();
  const sessionIdParam = params.get('session_id');
  const sessionId = sessionIdParam
    ? Number(sessionIdParam)
    : sessionStorage.getItem('current_session_id')
    ? Number(sessionStorage.getItem('current_session_id'))
    : null;

  const { favorites, loading, error, updateStatus } = useFavorites(sessionId);

  return (
    <main className={styles.main}>
      <p className={styles.label}>Mis favoritos</p>

      {loading && <p className={styles.muted}>Cargando...</p>}
      {error && <p className={styles.error}>{error}</p>}
      {!loading && !sessionId && <p className={styles.muted}>No hay favoritos.</p>}
      {!loading && sessionId && favorites.length === 0 && !error && (
        <p className={styles.muted}>No tienes canciones aceptadas aún.</p>
      )}

      <div className={styles.list}>
        {favorites.map(fav => (
          <div key={fav.id} className={styles.card}>
            {fav.cover_url
              ? <img src={fav.cover_url} alt={fav.album_name} className={styles.cover} />
              : <div className={styles.coverPlaceholder} />
            }
            <div className={styles.info}>
              <p className={styles.name}>{fav.track_name}</p>
              <p className={styles.meta}>{fav.artist_name} · {fav.album_name}</p>
            </div>
            <span className={styles.duration}>{formatDuration(fav.duration_ms)}</span>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" className={styles.iconCheck}>
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            </svg>
            <button className={styles.btnTrash} onClick={() => updateStatus(fav.track_id, 'rejected')} aria-label="Quitar">
              <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z"/>
              </svg>
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}

export default function FavoritesPage() {
  return (
    <div className={styles.layout}>
      <Sidebar />
      <Suspense>
        <FavoritesContent />
      </Suspense>
    </div>
  );
}