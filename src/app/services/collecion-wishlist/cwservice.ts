import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Collection, CollectionList} from '../../models/collection';
import {Wishlist, WishlistList} from '../../models/wishlist';

@Injectable({
  providedIn: 'root',
})
export class CWService {

  private _baseUrl = environment.baseUrl + 'cw/';

  constructor(private http: HttpClient){}

  getAllCollections(page: number = 1, size: number = 20): Observable<CollectionList>{
    return this.http.get<CollectionList>(this._baseUrl + 'collections');
  }

  getCollectionById(id: string): Observable<Collection> {
    return this.http.get<Collection>(this._baseUrl + 'collections/' + id);
  }

  getAllWishlists(page: number = 1, size: number = 20): Observable<WishlistList>{
    return this.http.get<WishlistList>(this._baseUrl + 'wishlists');
  }

  getWishlistById(id: string): Observable<Wishlist> {
    return this.http.get<Wishlist>(this._baseUrl + 'wishlists/' + id);
  }

  updateCollection (id: string, name: string | null, description: string | null, cover: string | null, isPrivate: boolean | null) : Observable<Collection> {
    return this.http.patch<Collection>(this._baseUrl + 'collections/' + id, {name: name, description: description, isPrivate: isPrivate, cover: cover, type: 'collection'});
  }

  updateWishlist (id: string, name: string | null, description: string | null, cover: string | null) : Observable<Collection> {
    return this.http.patch<Collection>(this._baseUrl + 'wishlists/' + id, {name: name, description: description, isPrivate: false, cover: cover, type: 'wishlist'});
  }

}
