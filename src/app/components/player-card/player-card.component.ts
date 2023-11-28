import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { GameCard } from '../game-wrapper/game-wrapper.types';
import { CallState } from '../../api-flow/models/call-state.interface';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-player-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatProgressSpinnerModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './player-card.component.html',
})
export class PlayerCardComponent {
  @Input({ required: true }) playerName!: string;
  @Input() item: GameCard | null = null;
  @Input() callState: CallState = 'INIT';
}
