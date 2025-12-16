import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CWList, CollectWish} from '../../models/collectWish';
import {CardList, CWCard} from '../../models/card';

@Injectable({
  providedIn: 'root',
})
export class CWService {

  private _baseUrl = environment.baseUrl + 'cw/';

  constructor(private http: HttpClient){}

  getGenericCW(id: string): Observable<CollectWish> {
    return this.http.get<CollectWish>(this._baseUrl + id);
  }

  getAllCollections(): Observable<CWList>{
    return this.http.get<CWList>(this._baseUrl + 'collections');
  }

  getCollectionById(id: string): Observable<CollectWish> {
    return this.http.get<CollectWish>(this._baseUrl + 'collections/' + id);
  }

  getAllWishlists(): Observable<CWList>{
    return this.http.get<CWList>(this._baseUrl + 'wishlists');
  }

  getWishlistById(id: string): Observable<CollectWish> {
    return this.http.get<CollectWish>(this._baseUrl + 'wishlists/' + id);
  }

  updateCollection (id: string, name: string | null, description: string | null, cover: string | null, isPrivate: boolean | null) : Observable<CollectWish> {
    return this.http.patch<CollectWish>(this._baseUrl + 'collections/' + id, {name: name, description: description, isPrivate: isPrivate, cover: cover, type: 'collection'});
  }

  updateWishlist (id: string, name: string | null, description: string | null, cover: string | null) : Observable<CollectWish> {
    return this.http.patch<CollectWish>(this._baseUrl + 'wishlists/' + id, {name: name, description: description, isPrivate: false, cover: cover, type: 'wishlist'});
  }

  loadAllCards (id: string) : Observable<CardList> {
    return this.http.get<CardList>(this._baseUrl + id + '/cards');
  }

  addCardToCW (id: string, type: string, card: CWCard) : Observable<any> {
    return this.http.put(this._baseUrl + id + '/cards/add', card, {params: {type: type}});
  }

}
