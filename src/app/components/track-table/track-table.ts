import { Component, Input, Output, EventEmitter, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AudioTrack } from '../../models/audio-track.model';
import { Formatters } from '../../utils/formatters';

@Component({
  selector: 'app-track-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatSortModule, MatButtonModule, MatIconModule],
  templateUrl: './track-table.html',
  styleUrl: './track-table.scss',
})
export class TrackTableComponent implements AfterViewInit {
  @Input() dataSource!: MatTableDataSource<AudioTrack>;
  @Input() displayedColumns: string[] = [];
  @Input() selectedTrack: AudioTrack | null = null;
  @Output() trackSelected = new EventEmitter<AudioTrack>();

  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.setupSorting();
  }

  private setupSorting() {
    if (this.dataSource && this.sort) {
      this.dataSource.sort = this.sort;
      this.dataSource.sortingDataAccessor = this.sortingDataAccessor.bind(this);
    }
  }

  private sortingDataAccessor(item: AudioTrack, property: string): string | number {
    switch (property) {
      case 'id':
        return item.id;
      case 'title':
        return item.title.toLowerCase();
      case 'fileName':
        return item.fileName.toLowerCase();
      case 'duration':
        return item.duration || 0;
      default:
        return (item as any)[property];
    }
  }

  protected isTrackSelected(track: AudioTrack): boolean {
    return this.selectedTrack?.id === track.id;
  }

  protected formatDuration = Formatters.formatDuration;
  protected get formatters() {
    return Formatters;
  }
  protected playTrack(track: AudioTrack, event: Event) {
    event.stopPropagation(); // Prevent row click
    this.trackSelected.emit(track);
  }
}
