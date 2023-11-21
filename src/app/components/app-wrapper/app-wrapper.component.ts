import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerCardComponent } from '../player-card/player-card.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AppStore } from './app-wrapper.store';
import { provideComponentStore } from '@ngrx/component-store';

export type OpponentType = 'PERSON' | 'STARSHIP';

@Component({
  selector: 'app-wrapper',
  standalone: true,
  imports: [
    CommonModule,
    PlayerCardComponent,
    MatButtonModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],
  providers: [provideComponentStore(AppStore)],
  templateUrl: './app-wrapper.component.html',
})
export class AppWrapperComponent implements OnInit {
  appStore = inject(AppStore);
  opponentType = new FormControl<OpponentType>('PERSON');

  opponentTypes: { label: string; value: OpponentType }[] = [
    { label: 'People', value: 'PERSON' },
    { label: 'Starships', value: 'STARSHIP' },
  ];

  ngOnInit() {}

  play() {}
}
