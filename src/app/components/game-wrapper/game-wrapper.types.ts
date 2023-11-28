import { CallState } from '../../api-flow/models/call-state.interface';
import { FormControl } from '@angular/forms';

export interface GameCard {
  name: string;
  score: number;
}

interface Player {
  item: GameCard | null;
  score: number;
}

export interface GameState {
  callState: CallState;
  playerOne: Player;
  playerTwo: Player;
  opponentType: FormControl<OpponentType>;
}

export type GamePlayerKeys = Pick<GameState, 'playerOne' | 'playerTwo'>;

export type OpponentType = 'PERSON' | 'STARSHIP';
