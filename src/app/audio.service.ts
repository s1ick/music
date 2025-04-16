import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AudioTrack } from './models/audio-track.model';

@Injectable({ providedIn: 'root' })
export class AudioService {
  getTracks(): Observable<AudioTrack[]> {
    return of(this.generateTracks());
  }

  private generateTracks() {
    return Array.from({ length: 17 }, (_, i) => ({
      id: i + 1,
      title: `SoundHelix Song ${i + 1}`,
      fileName: `https://www.soundhelix.com/examples/mp3/SoundHelix-Song-${i + 1}.mp3`
    }));
  }
}
