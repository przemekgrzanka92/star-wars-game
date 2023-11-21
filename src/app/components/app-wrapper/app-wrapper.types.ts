import { CallState } from '../../api-flow/models/call-state.interface';

export interface GameCard {
  name: string;
  score: number;
}

interface Player {
  item: GameCard | null;
  score: number;
}

export interface AppState {
  opponentType: OpponentType;
  callState: CallState;
  playerOne: Player;
  playerTwo: Player;
}

export type GamePlayerKeys = Pick<AppState, 'playerOne' | 'playerTwo'>;

export type OpponentType = 'PERSON' | 'STARSHIP';
