import { computed, Injectable, signal } from '@angular/core';
import { AudioTrack } from '../models/audio-track.model';

// Переносим интерфейс сюда, если нет отдельного файла
export interface AppState {
  isLoading: boolean;
  selectedTrack: AudioTrack | null;
  error: string | null;
}

@Injectable({ providedIn: 'root' })
export class AppStateService {
  private initialState: AppState = {
    isLoading: false,
    selectedTrack: null,
    error: null
  };

  private state = signal<AppState>(this.initialState);

  // Computed signals
  readonly isLoading = computed(() => this.state().isLoading);
  readonly selectedTrack = computed(() => this.state().selectedTrack);
  readonly error = computed(() => this.state().error);

  // Actions
  setLoading(loading: boolean): void {
    this.state.update(state => ({ ...state, isLoading: loading }));
  }

  setSelectedTrack(track: AudioTrack | null): void {
    this.state.update(state => ({ ...state, selectedTrack: track }));
  }

  setError(error: string | null): void {
    this.state.update(state => ({ ...state, error }));
  }

  reset(): void {
    this.state.set(this.initialState);
  }
}
