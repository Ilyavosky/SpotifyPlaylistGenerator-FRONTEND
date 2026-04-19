'use client';

import Sidebar from '@/components/SideBar';
import styles from './page.module.css';

export default function DashboardPage() {
  return (
    <div className={styles.layout}>
      <Sidebar/>
      <main className={styles.layout_main}>
      </main>
    </div>
  );
}