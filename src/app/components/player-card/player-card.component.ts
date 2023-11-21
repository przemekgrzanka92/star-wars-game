import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { IsPersonTypePipe } from './is-person-type.pipe';
import { GameCard } from '../app-wrapper/app-wrapper.types';

@Component({
  selector: 'app-player-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, IsPersonTypePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './player-card.component.html',
})
export class PlayerCardComponent {
  @Input({ required: true }) playerName!: string;
  @Input() item: GameCard | null = null;
}
