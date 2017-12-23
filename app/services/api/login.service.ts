import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

import { LoginUser } from '../../interfaces'

@Injectable()
export class LoginService {
  private loginUrl = 'login';
  private logoutUrl = 'logout';
  loggedIn: boolean = false;

  constructor(private http: Http) { }

  login(user: LoginUser): Observable<boolean> {
    return this.http.post(this.loginUrl, user)
      .map(response => response.json() as boolean)
      .do(res => { if (res) this.loggedIn = true });
  }

  logout() {
    return this.http.get(this.logoutUrl)
      .do(res => this.loggedIn = false);
  }
}
