import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from '../services/api/login.service'

import { LoginUser } from '../interfaces'

@Component({
  selector: 'login-form',
  templateUrl: 'app/forms/loginForm.component.html'
})

export class LoginFormComponent implements OnInit {
  userForm: LoginUser = new LoginUser();
  failedLogin: boolean;

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
    console.log('Form INIT');
    this.loginService.getUser()
      .subscribe(res => { this.userForm = res })
  }

  login() {
    this.loginService.login(this.userForm)
      .subscribe(res => res?this.onSuccessLogin():this.onFailLogin());
  }

  logout() {
    this.loginService.logout().subscribe(res => this.onLogout());
  }

  onSuccessLogin() {
    this.failedLogin = false;
    this.router.navigateByUrl("/");
  }

  onFailLogin() {
    this.failedLogin = true;
    setTimeout(() => this.failedLogin = false, 1000);
  }

  onLogout() {
    this.router.navigateByUrl("/");
  }

  get loggedIn() {
    return this.loginService.loggedIn;
  }
}
