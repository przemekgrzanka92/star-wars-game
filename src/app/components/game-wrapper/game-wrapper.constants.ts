import { GameState, OpponentType } from './game-wrapper.types';
import { FormControl } from '@angular/forms';

export const gameWrapperStoreInitialState: GameState = {
  callState: 'INIT',
  opponentType: new FormControl<OpponentType>('PERSON', { nonNullable: true }),
  playerOne: {
    item: null,
    score: 0,
  },
  playerTwo: {
    item: null,
    score: 0,
  },
};
