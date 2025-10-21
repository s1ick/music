import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AudioTrack } from '../../models/audio-track.model';

@Component({
  selector: 'app-audio-player',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './audio-player.html',
  styleUrl: './audio-player.scss'
})
export class AudioPlayerComponent {
  track = input<AudioTrack | null>(null);
}
