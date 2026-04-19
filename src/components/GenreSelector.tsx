'use client';

import styles from './GenreSelector.module.css';

interface GenreSelectorProps {
  genres: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  max?: number;
}
export default function GenreSelector({ genres, selected, onChange, max = 5 }: GenreSelectorProps) {
  const toggle = (genre: string) => {
    if (selected.includes(genre)) {
      onChange(selected.filter((g) => g !== genre));
    } else if (selected.length < max) {
      onChange([...selected, genre]);
    }
  };

  return (
    <div className={styles.genreSelector}>
      <div className={styles.header}>
        <span className={styles.label}>Géneros</span>
        <span className={styles.cont}>{selected.length}/{max}</span>
      </div>
      <div className={styles.genre}>
        {genres.map((genre) => {
          const isSelected = selected.includes(genre);
          const isDisabled = !isSelected && selected.length >= max;
          return (
            <button
              key={genre}
              className={`${styles.chip} ${isSelected ? styles.selected : ''} ${isDisabled ? styles.disabled : ''}`}
              onClick={() => toggle(genre)}
              disabled={isDisabled}
            >
              {genre}
            </button>
          );
        })}
      </div>
    </div>
  );
}