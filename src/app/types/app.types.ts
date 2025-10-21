import { AudioTrack } from '../models/audio-track.model';

export interface AppState {
  isLoading: boolean;
  selectedTrack: AudioTrack | null;
  error: string | null;
}

export interface PaginationState {
  pageIndex: number;
  pageSize: number;
}

export type SortDirection = 'asc' | 'desc' | '';
