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
  const sessionId = Number(params.get('session_id')) || null;
  const { favorites, loading, error, updateStatus } = useFavorites(sessionId);

  return (
    <main className={styles.main}>
      <p className={styles.label}>Mis favoritos</p>

      {loading && <p className={styles.muted}>Cargando...</p>}
      {error && <p className={styles.error}>{error}</p>}
      {!loading && !sessionId && (
    <p className={styles.muted}>No hay nada seleccionado</p>
      )}

      <div className={styles.list}>
        {favorites.map(fav => (
          <div key={fav.id} className={styles.card}>
            {fav.cover_url ? (
              <img src={fav.cover_url} alt={fav.album_name} className={styles.cover} />
            ) : (
              <div className={styles.coverPlaceholder} />
            )}

            <div className={styles.info}>
              <p className={styles.name}>{fav.track_name}</p>
              <p className={styles.meta}>{fav.artist_name} · {fav.album_name}</p>
            </div>

            <span className={styles.duration}>{formatDuration(fav.duration_ms)}</span>

            <span className={styles.bloq}>aceptado</span>

            <button
              className={styles.btnquitar}
              onClick={() => updateStatus(fav.track_id, 'rejected')}
            >
              quitar
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