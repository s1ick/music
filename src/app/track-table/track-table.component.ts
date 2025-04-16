import { Component, Input, Output, EventEmitter, ViewChild, AfterViewInit } from '@angular/core';
import { AudioTrack } from '../models/audio-track.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-track-table',
  templateUrl: './track-table.component.html',
  styleUrls: ['./track-table.component.scss']
})
export class TrackTableComponent implements AfterViewInit {
  @Input() dataSource!: MatTableDataSource<AudioTrack>;
  @Input() displayedColumns!: string[];
  @Output() trackSelected = new EventEmitter<AudioTrack>();
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'id':
          return item.id;
        case 'title':
          return item.title.toLowerCase();
        case 'fileName':
          return item.fileName.toLowerCase();
        default:
          return (item as any)[property];
      }
    };
  }

  @Output() filterChanged = new EventEmitter<string>();

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filterChanged.emit(filterValue);
  }
}
