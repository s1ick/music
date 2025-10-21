import { Component, signal, inject, OnInit, computed, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { TrackTableComponent } from './components/track-table/track-table';
import { AudioPlayerComponent } from './components/audio-player/audio-player';
import { AudioTrack } from './models/audio-track.model';
import { AudioService, TrackFilterService, AppStateService } from './services';
import { DisplayedColumn, TABLE_CONFIG } from './constants/table-config';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    TrackTableComponent,
    AudioPlayerComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  // Services (оставляем приватными)
  private audioService = inject(AudioService);
  private trackFilterService = inject(TrackFilterService);
  private appState = inject(AppStateService);
  private destroyRef = inject(DestroyRef);

  // RxJS
  private searchSubject = new Subject<string>();

  // Local state
  protected readonly title = signal('Music Player');
  protected dataSource = new MatTableDataSource<AudioTrack>([]);

  // Constants
  protected readonly displayedColumns = ['id', 'title', 'fileName'];
  protected readonly pageSizeOptions = TABLE_CONFIG.pageSizeOptions;

  // Делаем свойства публичными через computed signals
  protected isLoading = computed(() => this.appState.isLoading());
  protected selectedTrack = computed(() => this.appState.selectedTrack());
  protected error = computed(() => this.appState.error());

  // Data from services
  protected filteredTracks = computed(() => this.trackFilterService.filteredTracks());
  protected paginatedTracks = computed(() => this.trackFilterService.paginatedTracks());
  protected totalTracks = computed(() => this.trackFilterService.totalTracks());
  protected searchTerm = computed(() => this.trackFilterService.searchTerm());
  protected pageIndex = computed(() => this.trackFilterService.pageIndex());
  protected pageSize = computed(() => this.trackFilterService.pageSize());

  constructor() {
    this.setupSearchDebounce();
  }

  async ngOnInit(): Promise<void> {
    await this.loadTracks();
  }

  private async loadTracks(): Promise<void> {
    this.appState.setLoading(true);
    this.appState.setError(null);

    try {
      const tracks = await this.audioService.getTracks().toPromise();
      if (tracks) {
        this.trackFilterService.setTracks(tracks);
        this.updateDataSource();
      }
    } catch (error) {
      this.appState.setError('Failed to load tracks');
      console.error('Error loading tracks:', error);
    } finally {
      this.appState.setLoading(false);
    }
  }

  private setupSearchDebounce(): void {
    this.searchSubject.pipe(
      debounceTime(TABLE_CONFIG.searchDebounceTime),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(filter => {
      this.trackFilterService.setSearchTerm(filter);
      this.updateDataSource();
    });
  }

  private updateDataSource(): void {
    this.dataSource.data = this.paginatedTracks();
  }

  // Public methods
  protected onSearch(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.searchSubject.next(filterValue);
  }

  protected onPageChange(event: PageEvent): void {
    this.trackFilterService.setPagination(event.pageIndex, event.pageSize);
    this.updateDataSource();
  }

  protected onTrackSelected(track: AudioTrack): void {
    this.appState.setSelectedTrack(track);
  }

  protected clearSearch(): void {
    this.trackFilterService.setSearchTerm('');
    this.updateDataSource();
  }

  protected async reloadTracks(): Promise<void> {
    this.audioService.clearCache();
    await this.loadTracks();
  }

  // Public методы для работы с appState в шаблоне
  protected clearError(): void {
    this.appState.setError(null);
  }
}
