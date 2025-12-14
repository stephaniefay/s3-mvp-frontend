import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../../models/user';
import {HttpClient} from '@angular/common/http';
import {Collection, CollectionList} from '../../models/collection';
import {Wishlist, WishlistList} from '../../models/wishlist';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private _baseUrl = environment.baseUrl + 'users/';

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

  createUserCollection(name: string, description: string | undefined, isPrivate: boolean, cover: string | undefined): Observable<Collection> {
    return this.http.post<Collection>(this._baseUrl + 'collections', {name: name, description: description, isPrivate: isPrivate, cover: cover, type: 'collection'});
  }

  createUserWishlist(name: string, description: string | undefined, isPrivate: boolean, cover: string | undefined): Observable<Wishlist> {
    return this.http.post<Wishlist>(this._baseUrl + 'wishlists', {name: name, description: description, isPrivate: isPrivate, cover: cover, type: 'wishlist'});
  }

}
