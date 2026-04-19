export interface Track {
  id: number;
  spotify_id: string;
  name: string;
  uri: string;
  duration_ms: number;
  valence: number;
  energy: number;
  danceability: number;
}

export interface Session {
  id: number;
  session_uuid: string;
  name: string;
  target_valence: number;
  target_energy: number;
  target_danceability: number;
  is_exported: boolean;
  created_at: string;
}

export interface Favorite {
  id: number;
  session_id: number;
  track_id: number;
  status: string;
  track_name: string;
  track_uri: string;
  duration_ms: number;
  artist_name: string;
  album_name: string;
  cover_url: string;
}

