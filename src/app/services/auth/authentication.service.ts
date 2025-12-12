import {computed, Injectable, signal, WritableSignal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LoginResponse} from '../../models/login-response';
import {User} from '../../models/user';
import {MessageService} from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private _token: string | null = null;
  private _baseUrl = 'http://localhost:8080/authentication';
  private _user = signal<User | null>(null);
  public user = computed(() => this._user());

  constructor(private http: HttpClient,
              private messageService: MessageService) {
    this._token = localStorage.getItem('token');
    this.loadUser();
  }

  private loadUser() {
    if (this._token) {
      this.getUser().subscribe({
        next: user => {
          this._user.set(user);
        },
        error: error => {
          this.messageService.add({
            severity: 'warning',
            summary: 'Your token expired, please consider signing in again.'
          });
          this._user.set(null);
        }
      });
    }
  }

  signUp(name: string, accessKey: string, password: string): true {
    console.log(name, accessKey, password);

    this.setToken('asd');
    return true;
  }

  signIn(accessKey: string, password: string) {
    this.http.post<LoginResponse>(this._baseUrl + '/login', {
      username: accessKey,
      password: password
    }).subscribe({
      next: response => {
        if (response.token) {
          this.setToken(response.token)
          this.loadUser();
        } else {
          this.messageService.add({severity: 'error', summary: 'Something went wrong.'});
        }
      },
      error: error => {
        if (error.error.error)
          this.messageService.add({severity: 'error', summary: 'Login failed', detail: error.error.error});
        else
          this.messageService.add({severity: 'error', summary: 'Login failed', detail: error.statusText});
      }
    });
  }

  signOut() {
    this._user.set(null);
    this.clearToken();
  }

  getUser(): Observable<User> {
    return this.http.get<User>(this._baseUrl + '/me');
  }

  setToken(token: string): void {
    this._token = token;
    localStorage.setItem('token', token);
  }

  clearToken(): void {
    this._token = null;
    localStorage.removeItem('token');
  }
}
