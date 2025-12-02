import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Sets} from '../../models/sets';
import {Observable} from 'rxjs';

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

}
