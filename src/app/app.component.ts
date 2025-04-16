import { Component, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AudioTrack } from './models/audio-track.model';
import { AudioService } from './audio.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  displayedColumns: string[] = ['id', 'title', 'fileName'];
  dataSource = new MatTableDataSource<AudioTrack>();
  selectedTrack: AudioTrack | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private audioService: AudioService) {}

  ngOnInit(): void {
    this.audioService.getTracks()
      .pipe(finalize(() => this.dataSource.paginator = this.paginator))
      .subscribe(tracks => {
        this.dataSource.data = tracks;
      });
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
}
