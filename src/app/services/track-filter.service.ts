import { Injectable, signal, computed } from '@angular/core';
import { AudioTrack } from '../models/audio-track.model';

export interface FilterState {
  searchTerm: string;
  pageIndex: number;
  pageSize: number;
}

@Injectable({ providedIn: 'root' })
export class TrackFilterService {
  private readonly INITIAL_STATE: FilterState = {
    searchTerm: '',
    pageIndex: 0,
    pageSize: 10
  };

  // Private state
  private allTracks = signal<AudioTrack[]>([]);
  private filterState = signal<FilterState>(this.INITIAL_STATE);

  // Public computed state
  public readonly filteredTracks = computed(() => this.applyFilters());
  public readonly paginatedTracks = computed(() => this.applyPagination());
  public readonly totalTracks = computed(() => this.filteredTracks().length);
  public readonly totalPages = computed(() =>
    Math.ceil(this.totalTracks() / this.filterState().pageSize)
  );

  // State accessors
  public readonly searchTerm = computed(() => this.filterState().searchTerm);
  public readonly pageIndex = computed(() => this.filterState().pageIndex);
  public readonly pageSize = computed(() => this.filterState().pageSize);
  public readonly hasTracks = computed(() => this.allTracks().length > 0);

  // Public API
  setTracks(tracks: AudioTrack[]): void {
    this.allTracks.set(Array.isArray(tracks) ? tracks : []);
    this.resetPagination();
  }

  setSearchTerm(searchTerm: string): void {
    this.filterState.update(state => ({
      ...state,
      searchTerm: searchTerm.trim(),
      pageIndex: 0 // Reset to first page
    }));
  }

  setPagination(pageIndex: number, pageSize: number): void {
    this.filterState.update(state => ({
      ...state,
      pageIndex: Math.max(0, pageIndex),
      pageSize: Math.max(1, pageSize)
    }));
  }

  resetFilters(): void {
    this.filterState.set(this.INITIAL_STATE);
  }

  // Private methods
  private applyFilters(): AudioTrack[] {
    const tracks = this.allTracks();
    const searchTerm = this.filterState().searchTerm.toLowerCase();

    if (!searchTerm) return tracks;

    return tracks.filter(track =>
      track.title.toLowerCase().includes(searchTerm) ||
      track.fileName.toLowerCase().includes(searchTerm) ||
      track.artist?.toLowerCase().includes(searchTerm)
    );
  }

  private applyPagination(): AudioTrack[] {
    const tracks = this.filteredTracks();
    const { pageIndex, pageSize } = this.filterState();
    const startIndex = pageIndex * pageSize;

    return tracks.slice(startIndex, startIndex + pageSize);
  }

  private resetPagination(): void {
    this.filterState.update(state => ({
      ...state,
      pageIndex: 0
    }));
  }
}
