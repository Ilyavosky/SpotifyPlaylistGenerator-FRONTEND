'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import styles from './SideBar.module.css';

const links = [
  {
    href: '/dashboard',
    label: 'Inicio',
    icon: <svg viewBox="0 0 24 24" fill="currentColor" width="35" height="35"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>,
  },
  {
    href: '/favorites',
    label: 'Favoritos',
    icon: <svg viewBox="0 0 24 24" fill="currentColor" width="35" height="35"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>,
  },
];

const logoutIcon = <svg viewBox="0 0 24 24" fill="currentColor" width="35" height="35"><path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/></svg>;

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    });
    router.push('/');
  };

  return (
    <aside className={styles.sidebar}>
      <Link href="/dashboard" className={styles.logo}>JOJO'S</Link>

      <nav className={styles.nav}>
        {links.map(({ href, label, icon }) => (
          <Link
            key={href}
            href={href}
            className={`${styles.link} ${pathname === href ? styles.active : ''}`}
            title={label}
          >
            {icon}
          </Link>
        ))}
      </nav>

      <button onClick={handleLogout} className={styles.link} title="Salir">{logoutIcon}</button>
    </aside>
  );
}