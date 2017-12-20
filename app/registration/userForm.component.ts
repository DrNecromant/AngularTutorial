import { Component } from '@angular/core';

import { User } from '../interfaces';

@Component({
    templateUrl: 'app/registration/userForm.component.html',
})

export class UserFormComponent {
  user: User = new User;
}
