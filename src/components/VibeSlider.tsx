'use client';

import styles from './VibeSlider.module.css';

interface VibeSliderProps {
  label: string;
  description: string;
  value: number;
  onChange: (value: number) => void;
  leftLabel?: string;
  rightLabel?: string;
}

export default function VibeSlider({ label, description, value, onChange, leftLabel = 'Bajo', rightLabel = 'Alto' }: VibeSliderProps) {
  return (
    <div className={styles.vibeSlider}>
      <div className={styles.header}>
        <div>
          <p className={styles.label}>{label}</p>
          <p className={styles.description}>{description}</p>
        </div>
        <span className={styles.value}>{Math.round(value * 100)}%</span>
      </div>
      <div className={styles.track}>
        <input
          type="range"
          min={0}
          max={100}
          value={Math.round(value * 100)}
          onChange={(e) => onChange(Number(e.target.value) / 100)}
          className={styles.input}
          aria-label={label}
        />
        <div className={styles.fill} style={{ width: `${value * 100}%` }} />
      </div>
      <div className={styles.labels}>
        <span>{leftLabel}</span>
        <span>{rightLabel}</span>
      </div>
    </div>
  );
}