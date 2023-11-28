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

  getPerson(id?: string | number): Observable<Person> {
    id = id || this.randomIntFromInterval(2, 82);
    return this.httpClient.get<Person>(`${this.apiUrl}/people/${id}`);
  }

  getStarship(id?: string | number): Observable<Starship> {
    id = id || this.randomIntFromInterval(2, 36);
    return this.httpClient.get<Starship>(`${this.apiUrl}/starships/${id}`);
  }

  private randomIntFromInterval(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
