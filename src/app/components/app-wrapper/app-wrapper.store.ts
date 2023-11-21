import { computed, inject, Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { ApiService } from '../../api-flow/services/api.service';
import { forkJoin, map, switchMap, tap } from 'rxjs';
import { AppState, GamePlayerKeys, OpponentType } from './app-wrapper.types';
import { appWrapperStoreInitialState } from './app-wrapper.constants';
import { CallState } from '../../api-flow/models/call-state.interface';

const gameApiDecorator = () => {
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
export class AppStore extends ComponentStore<AppState> {
  private starshipCardApi = gameApiDecorator();

  playerOne = computed(() => this.state().playerOne);

  playerOneScore = computed(() => this.state().playerOne.score);
  playerTwoScore = computed(() => this.state().playerTwo.score);
  opponentType = computed(() => this.state().opponentType);
  callState = computed(() => this.state().callState);

  private playerOne$ = this.select((state) => state.playerOne);
  private playerTwo$ = this.select((state) => state.playerTwo);
  private opponentType$ = this.select((state) => state.opponentType);

  readonly vm$ = this.select({
    playerOne: this.playerOne$,
    playerTwo: this.playerTwo$,
    opponentType: this.opponentType$,
  });

  setCallState = this.updater((state, callState: CallState) => ({
    ...state,
    callState,
  }));

  constructor() {
    super(appWrapperStoreInitialState);
  }

  fetchCards = this.effect((trigger$) =>
    trigger$.pipe(
      tap(() => this.setCallState('LOADING')),
      switchMap(() =>
        forkJoin({
          playerCard: this.starshipCardApi.fetchCard(this.opponentType()),
          opponentCard: this.starshipCardApi.fetchCard(this.opponentType()),
        }).pipe(
          tap(({ playerCard, opponentCard }) => {
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
}
