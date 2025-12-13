import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../../models/user';
import {HttpClient} from '@angular/common/http';
import {CollectionList} from '../../models/collection';
import {WishlistList} from '../../models/wishlist';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private _baseUrl = 'http://localhost:8080/users/';

  constructor(private http: HttpClient){}

  getUser(id :string): Observable<User> {
    return this.http.get<User>(this._baseUrl + id);
  }

  updateUser(id: string, name: string | null, bio: string | null, avatar: string | null): Observable<User> {
    return this.http.patch<User>(this._baseUrl + id, {name: name, bio: bio, avatar: avatar});
  }

  getUserCollections(id: string): Observable<CollectionList> {
    return this.http.get<CollectionList>(this._baseUrl + id + '/collections');
  }

  getUserWishlists(id: string): Observable<WishlistList> {
    return this.http.get<WishlistList>(this._baseUrl + id + '/wishlists');
  }

}
