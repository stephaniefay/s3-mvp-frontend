import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TagList} from '../../models/tag';

@Injectable({
  providedIn: 'root',
})
export class TagService {

  private _baseUrl = environment.baseUrl + 'tags';

  constructor(private http: HttpClient){}

  getTagsForUser(): Observable<TagList> {
    return this.http.get<TagList>(this._baseUrl);
  }

}
