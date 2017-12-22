import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { LoginUser } from '../../interfaces'

@Injectable()
export class LoginService {
  private loginUrl = 'login';
  private logoutUrl = 'logout';
  loggedIn: boolean = false;

  constructor(private http: Http) { }

}
