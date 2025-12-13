import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../../models/user';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private _baseUrl = 'http://localhost:8080/users/';

  constructor(private http: HttpClient){}

  getUser(id :string): Observable<User> {
    return this.http.get<User>(this._baseUrl + id);
  }

}
