import { Component, OnInit } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { LoginService } from '../services/api/login.service'

import { User } from '../interfaces';

@Component({
  templateUrl: 'app/forms/userForm.component.html',
  styles: [`
    input.ng-touched.ng-invalid {
      background-color: #ffe8f1;
    }
  `]
})

export class UserFormComponent implements OnInit {
  user: User = new User;
  minAge: string = '18';
  countries$: Observable<string[]>;
  towns$: Observable<string[]>;

  constructor(
    private http: Http,
    private router: Router,
    private loginService: LoginService,
  ) { }

  ngOnInit() {
    this.countries$ = this.getCountries();
    this.countries$.subscribe(countries => {
      if (countries) this.towns$ = this.getTowns(countries[0]);
    });
  }

  changeCountry(country: string) {
    this.towns$ = this.getTowns(country);
  }

  getCountries(): Observable<string[]> {
    return this.http.get('countries')
      .map(response => response.json() as string[]);
  }

  getTowns(country: string): Observable<string[]> {
    let params: URLSearchParams = new URLSearchParams();
    params.set('country', country);
    return this.http.get('towns', { search: params })
      .map(response => response.json() as string[]);
  }

  onSubmit() {
    this.http.post("users", this.user).subscribe(res => {
      let loginUser = { userName: this.user.name, password: this.user.password }
      this.loginService.login(loginUser)
        .subscribe(res=>{if (res) this.router.navigateByUrl("/")});
    });

  }
}
