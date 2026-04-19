'use client';

import { Track } from '@/types';
import styles from './TrackCard.module.css';

interface TrackCardProps {
  track: Track & { artist_name?: string; album_name?: string; cover_url?: string; };
  onAccept: (trackId: number) => void;
  onReject: (trackId: number) => void;
}

function formatDuration(ms: number): string {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

const IconX = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const IconHeart = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
  </svg>
);

export default function TrackCard({ track, onAccept, onReject }: TrackCardProps) {
  return (
    <div className={styles.card}>
      {track.cover_url
        ? <img src={track.cover_url} alt={track.album_name ?? track.name} className={styles.cover} />
        : <div className={styles.coverPlaceholder} />
      }
      <div className={styles.info}>
        <p className={styles.name}>{track.name}</p>
        <p className={styles.meta}>{track.artist_name ?? '—'} · {track.album_name ?? '—'}</p>
      </div>
      <span className={styles.duration}>{formatDuration(track.duration_ms)}</span>
      <div className={styles.actions}>
        <button onClick={() => onReject(track.id)} aria-label="Descartar" className={styles.btn}><IconX /></button>
        <button onClick={() => onAccept(track.id)} aria-label="Favorito" className={styles.btn}><IconHeart /></button>
      </div>
    </div>
  );
}