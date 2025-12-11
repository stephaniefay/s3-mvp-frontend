import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private token: string | null = null;

  constructor() {
    this.token = localStorage.getItem('token'); // Retrieve token on service initialization
  }

  signUp (name: string, accessKey: string, password: string): true {
    console.log(name, accessKey, password);

    this.setToken('asd');
    return true;
  }

  signIn (accessKey: string, password: string): boolean {
    //TODO
    console.log(accessKey, password);

    this.setToken('asd');
    return true;
  }

  getUser () {
    return null;
//    return {id: 'teste_id_usuario', email: 'all@all.com', nickname: 'sfay', token: 'asd'}
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
