import { AppState } from './app-wrapper.types';

export const appWrapperStoreInitialState: AppState = {
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
