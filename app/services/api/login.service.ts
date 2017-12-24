import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { Subject } from 'rxjs/Subject';

import { LoginUser } from '../../interfaces'

@Injectable()
export class LoginService {
  private loginUrl = 'login';
  private logoutUrl = 'logout';
  private userUrl = 'user';
  private userLoginSource = new Subject<LoginUser>();

  userLogin$ = this.userLoginSource.asObservable();
  loggedIn: boolean = false;

  constructor(private http: Http) { }

  login(user: LoginUser): Observable<boolean> {
    return this.http.post(this.loginUrl, user)
      .map(response => response.json() as boolean)
      .do(res => {
        if (res) {
          this.loggedIn = true;
          this.userLoginSource.next(user);
        }
      });
  }

  logout() {
    return this.http.get(this.logoutUrl)
      .do(res => {
        this.loggedIn = false;
        this.userLoginSource.next(null);
      });
  }

  getUser() {
    return this.http.get(this.userUrl)
      .map(response => response? response.json() as LoginUser:null)
      .do(res => this.loggedIn = true);
   }
}
