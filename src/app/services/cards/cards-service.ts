import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Sets} from '../../models/sets';
import {Observable} from 'rxjs';
import {Cards} from '../../models/card';
import {Tags} from '../../models/tags';

@Injectable({
  providedIn: 'root',
})
export class CardsService {

  baseUrl: string = '/assets/';

  constructor(private http: HttpClient) {
  }

  getSets (): Observable<Sets[]> {
    return this.http.get<Sets[]>(this.baseUrl + 'sets.json');
  }

  loadCardsFromSet(id: string): Observable<Cards[]> {
    return this.http.get<Cards[]>(this.baseUrl + id + '.json');
  }

  loadTags() {
    return this.http.get<Tags[]>(this.baseUrl + 'tags.json');
  }
}
