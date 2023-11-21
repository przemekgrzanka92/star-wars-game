import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Person } from '../models/person.interface';
import { Starship } from '../models/starship.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  protected readonly apiUrl = 'https://swapi.dev/api';
  private httpClient = inject(HttpClient);

  getPerson(): Observable<Person> {
    return this.httpClient.get<Person>(
      `${this.apiUrl}/people/${this.randomIntFromInterval(1, 82)}`,
    );
  }

  getStarship(): Observable<Starship> {
    return this.httpClient.get<Starship>(
      `${this.apiUrl}/people/${this.randomIntFromInterval(1, 36)}`,
    );
  }

  private randomIntFromInterval(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
