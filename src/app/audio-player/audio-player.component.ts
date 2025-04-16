import { Component, Input } from '@angular/core';
import { AudioTrack } from '../models/audio-track.model';

@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.scss']
})
export class AudioPlayerComponent {
  @Input() track: AudioTrack | null = null;
}
