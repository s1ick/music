import { Injectable, signal } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { AudioTrack } from '../models/audio-track.model';

@Injectable({ providedIn: 'root' })
export class AudioService {
  private readonly TRACKS_COUNT = 17;
  private readonly BASE_URL = 'https://www.soundhelix.com/examples/mp3';

  // Кэширование треков
  private tracksCache = signal<AudioTrack[] | null>(null);

  getTracks(): Observable<AudioTrack[]> {
    // Возвращаем кэш если есть
    const cached = this.tracksCache();
    if (cached) {
      return of(cached);
    }

    // Генерируем и кэшируем
    const tracks = this.generateTracks();
    this.tracksCache.set(tracks);

    return of(tracks).pipe(delay(500)); // Имитация загрузки
  }

  clearCache(): void {
    this.tracksCache.set(null);
  }

  private generateTracks(): AudioTrack[] {
    return Array.from({ length: this.TRACKS_COUNT }, (_, i) =>
      this.createTrack(i + 1)
    );
  }

  private createTrack(id: number): AudioTrack {
    return {
      id,
      title: `SoundHelix Song ${id}`,
      fileName: `${this.BASE_URL}/SoundHelix-Song-${id}.mp3`,
      duration: Math.floor(Math.random() * 240) + 60, // 1-5 минут
      artist: 'SoundHelix'
    };
  }
}
