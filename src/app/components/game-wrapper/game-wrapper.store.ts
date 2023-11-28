import { computed, inject, Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { ApiService } from '../../api-flow/services/api.service';
import { catchError, EMPTY, forkJoin, map, switchMap, tap } from 'rxjs';
import { GameState, GamePlayerKeys, OpponentType } from './game-wrapper.types';
import { gameWrapperStoreInitialState } from './game-wrapper.constants';
import { CallState } from '../../api-flow/models/call-state.interface';
import { MatSnackBar } from '@angular/material/snack-bar';

export const gameApiDecorator = () => {
  const apiService = inject(ApiService);

  return {
    fetchCard: (type: OpponentType) => {
      if (type === 'PERSON') {
        return apiService
          .getPerson()
          .pipe(map((res) => ({ name: res.name, score: Number(res.mass) })));
      }

      return apiService
        .getStarship()
        .pipe(map((res) => ({ name: res.name, score: Number(res.crew) })));
    },
  };
};

@Injectable()
export class GameStore extends ComponentStore<GameState> {
  private starshipCardApi = gameApiDecorator();
  private snackBar = inject(MatSnackBar);

  playerOne = computed(() => this.state().playerOne);
  playerTwo = computed(() => this.state().playerTwo);
  callState = computed(() => this.state().callState);
  opponentTypeFormControl = computed(() => this.state().opponentType);

  setCallState = this.updater((state, callState: CallState) => ({
    ...state,
    callState,
  }));

  constructor() {
    super(gameWrapperStoreInitialState);
  }

  fetchCards = this.effect((trigger$) =>
    trigger$.pipe(
      tap(() => this.setCallState('LOADING')),
      switchMap(() =>
        forkJoin([
          this.starshipCardApi.fetchCard(this.opponentTypeFormControl().value),
          this.starshipCardApi.fetchCard(this.opponentTypeFormControl().value),
        ]).pipe(
          tap(([playerCard, opponentCard]) => {
            this.patchState((state) => ({
              ...state,
              playerOne: { ...state.playerOne, item: playerCard },
              playerTwo: { ...state.playerTwo, item: opponentCard },
            }));
            this.updateGameScore({
              playerOneScore: playerCard.score,
              playerTwoScore: opponentCard.score,
            });
            this.setCallState('LOADED');
          }),
          catchError((err) => {
            this.showErrorMessage();
            this.setCallState('INIT');
            return EMPTY;
          }),
        ),
      ),
    ),
  );

  updateGameScore = this.updater(
    (
      state,
      {
        playerOneScore,
        playerTwoScore,
      }: { playerOneScore: number; playerTwoScore: number },
    ) => {
      if (playerOneScore === playerTwoScore) {
        return state;
      }
      const key: keyof GamePlayerKeys =
        playerOneScore > playerTwoScore ? 'playerOne' : 'playerTwo';

      return {
        ...state,
        [key]: {
          ...state[key],
          score: state[key].score + 1,
        },
      };
    },
  );

  showErrorMessage() {
    this.snackBar.open('Something went wrong, try again.', 'Close', {
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      duration: 2000,
    });
  }
}
