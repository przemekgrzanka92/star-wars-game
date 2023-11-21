import { inject, Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { OpponentType } from './app-wrapper.component';
import { ApiService } from '../../api-flow/services/api.service';
import { Starship } from '../../api-flow/models/starship.interface';
import { Person } from '../../api-flow/models/person.interface';
import { CallState } from '../../api-flow/models/call-state.interface';

interface Player {
  item: Starship | Person | null;
  score: number;
}

export interface AppState {
  opponentType: OpponentType;
  callState: CallState;
  playerOne: Player;
  playerTwo: Player;
}

const initialState: AppState = {
  opponentType: 'PERSON',
  callState: 'INIT',
  playerOne: {
    item: null,
    score: 0,
  },
  playerTwo: {
    item: null,
    score: 0,
  },
};

@Injectable()
export class AppStore extends ComponentStore<AppState> {
  private apiService = inject(ApiService);
  constructor() {
    super(initialState);
  }

  private playerOne$ = this.select((state) => state.playerOne);
  private playerTwo$ = this.select((state) => state.playerTwo);
  private opponentType$ = this.select((state) => state.opponentType);

  readonly vm$ = this.select({
    playerOne: this.playerOne$,
    playerTwo: this.playerTwo$,
    opponentType: this.opponentType$,
  });
}
