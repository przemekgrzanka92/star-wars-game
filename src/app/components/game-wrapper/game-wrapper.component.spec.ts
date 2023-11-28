import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameWrapperComponent } from './game-wrapper.component';
import { PlayerCardComponent } from '../player-card/player-card.component';
import { GameStore } from './game-wrapper.store';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideComponentStore } from '@ngrx/component-store';
import { By } from '@angular/platform-browser';
import { OpponentType } from './game-wrapper.types';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApiService } from '../../api-flow/services/api.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('GameWrapperComponent', () => {
  let component: GameWrapperComponent;
  let fixture: ComponentFixture<GameWrapperComponent>;
  let gameStore: GameStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [
        GameWrapperComponent,
        PlayerCardComponent,
        ReactiveFormsModule,
        MatSelectModule,
        MatButtonModule,
        MatFormFieldModule,
        HttpClientTestingModule,
        NoopAnimationsModule,
      ],
      providers: [provideComponentStore(GameStore), ApiService],
    });

    fixture = TestBed.createComponent(GameWrapperComponent);
    component = fixture.componentInstance;
    gameStore = TestBed.inject(GameStore);

    spyOn(gameStore, 'fetchCards');
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    fixture.detectChanges();

    expect(component.gameStore.opponentTypeFormControl().value).toEqual(
      'PERSON',
    );
  });

  it('should call fetchCards method when play button is clicked', () => {
    fixture.detectChanges();

    const playButton = fixture.debugElement.query(By.css('button'));
    playButton.nativeElement.click();

    expect(gameStore.fetchCards).toHaveBeenCalled();
  });

  it('should update opponentType when selecting a different opponent type', () => {
    fixture.detectChanges();

    const select = fixture.debugElement.query(
      By.directive(MatSelect),
    ).componentInstance;

    select.value = 'STARSHIP';
    select.selectionChange.emit();

    expect(component.gameStore.opponentTypeFormControl().value).toEqual(
      'STARSHIP',
    );
  });

  it('should render player cards and scores correctly', () => {
    gameStore.setState({
      playerOne: { item: { name: 'Player One', score: 8 }, score: 3 },
      playerTwo: { item: { name: 'Player Two', score: 5 }, score: 5 },
      callState: 'LOADED',
      opponentType: new FormControl<OpponentType>('PERSON', {
        nonNullable: true,
      }),
    });

    fixture.detectChanges();

    const playerOneCard = fixture.debugElement.queryAll(
      By.directive(PlayerCardComponent),
    )[0];
    const playerTwoCard = fixture.debugElement.queryAll(
      By.directive(PlayerCardComponent),
    )[1];

    playerOneCard.componentInstance.item = { name: 'Player One', score: 8 };
    playerOneCard.componentInstance.score = 3;

    playerTwoCard.componentInstance.item = { name: 'Player Two', score: 5 };
    playerTwoCard.componentInstance.score = 5;

    expect(playerOneCard.componentInstance.item).toEqual({
      name: 'Player One',
      score: 8,
    });
    expect(playerTwoCard.componentInstance.item).toEqual({
      name: 'Player Two',
      score: 5,
    });

    const scoreText = fixture.nativeElement
      .querySelector('p.text-2xl')
      .textContent.trim();
    expect(scoreText).toBe('3 : 5');
  });
});
