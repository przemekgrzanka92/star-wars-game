import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerCardComponent } from '../player-card/player-card.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';

import { provideComponentStore } from '@ngrx/component-store';
import { OpponentType } from './game-wrapper.types';
import { GameStore } from './game-wrapper.store';
import { ApiService } from '../../api-flow/services/api.service';

@Component({
  selector: 'app-game-wrapper',
  standalone: true,
  imports: [
    CommonModule,
    PlayerCardComponent,
    MatButtonModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],
  providers: [provideComponentStore(GameStore)],
  templateUrl: './game-wrapper.component.html',
})
export class GameWrapperComponent {
  gameStore = inject(GameStore);
  api = inject(ApiService);

  opponentTypes: { label: string; value: OpponentType }[] = [
    { label: 'People', value: 'PERSON' },
    { label: 'Starships', value: 'STARSHIP' },
  ];

  play() {
    this.gameStore.fetchCards();
  }
}
