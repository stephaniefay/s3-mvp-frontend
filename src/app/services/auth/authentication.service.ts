import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LoginResponse} from '../../models/login-response';
import {User} from '../../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private token: string | null = null;

  private baseUrl = 'http://localhost:8080/authentication';

  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('token'); // Retrieve token on service initialization
  }

  signUp(name: string, accessKey: string, password: string): true {
    console.log(name, accessKey, password);

    this.setToken('asd');
    return true;
  }

  signIn(accessKey: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.baseUrl + '/login', {
      username: accessKey,
      password: password
    });
  }

  getUser(): Observable<User> {
    return this.http.get<User>(this.baseUrl + '/me');
  }

  setToken(token: string): void {
    this.token = token;
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return this.token;
  }

  clearToken(): void {
    this.token = null;
    localStorage.removeItem('token');
  }
}
