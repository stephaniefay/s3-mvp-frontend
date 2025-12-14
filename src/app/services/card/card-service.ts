import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CardService {

  private _baseUrl = environment.baseUrl + 'cards/';

  constructor(private http: HttpClient){}

}
