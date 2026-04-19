'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import styles from './page.module.css';

const ERROR_MESSAGES: Record<string, string> = {
  INVALID_CALLBACK: 'El callback de Spotify no es válido',
  STATE_MISMATCH: 'Error de seguridad en la autenticación',
};

function ErrorContent() {
  const params = useSearchParams();
  const code = params.get('code') ?? 'UNKNOWN';
  const message = ERROR_MESSAGES[code] ?? 'Algo salió mal. Intenta de nuevo';

  return (
    <main className={styles.container}>
      <div className={styles.card}>
        <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="var(--danger)" strokeWidth="2" strokeLinecap="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
        <h1 className={styles.text}>Algo salió mal</h1>
        <p className={styles.mensaje}>{message}</p>
        <Link href="/" className={styles.btn}>Volver al inicio</Link>
      </div>
    </main>
  );
}

export default function ErrorPage() {
  return (
    <Suspense>
      <ErrorContent />
    </Suspense>
  );
}