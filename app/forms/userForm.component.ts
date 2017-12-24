import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

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

export class UserFormComponent {
  user: User = new User;

  constructor(
    private http: Http,
    private router: Router,
    private loginService: LoginService,
  ) { }

  onSubmit() {
    this.http.post("users", this.user).subscribe(res => {
      let loginUser = { userName: this.user.name, password: this.user.password }
      this.loginService.login(loginUser)
        .subscribe(res=>{if (res) this.router.navigateByUrl("/")});
    });

  }
}
