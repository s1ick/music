import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AudioTrack } from './models/audio-track.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'title', 'fileName'];
  dataSource: MatTableDataSource<AudioTrack>;
  selectedTrack: AudioTrack | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor() {
    this.dataSource = new MatTableDataSource(this.getSampleTracks());
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  selectTrack(track: AudioTrack): void {
    this.selectedTrack = track;
  }

  private getSampleTracks(): AudioTrack[] {
    return Array.from({ length: 17 }, (_, i) => ({
      id: i + 1,
      title: `SoundHelix Song ${i + 1}`,
      fileName: `https://www.soundhelix.com/examples/mp3/SoundHelix-Song-${i + 1}.mp3`
    }));
  }
}
