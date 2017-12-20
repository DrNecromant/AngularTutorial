import { Component } from '@angular/core';

import { User } from '../interfaces';

@Component({
  templateUrl: 'app/registration/userForm.component.html',
  styles: [`
    input.ng-touched.ng-invalid {
      background-color: #ffe8f1;
    }
  `]
})

export class UserFormComponent {
  user: User = new User;
}
