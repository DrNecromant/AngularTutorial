import { Directive } from '@angular/core';
import { Validator, NG_ASYNC_VALIDATORS, AbstractControl } from '@angular/forms';
import { Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Directive({
  selector: '[userUniqueValid][ngModel]',
  providers: [{
    provide: NG_ASYNC_VALIDATORS,
    useExisting: UserUniqueValidator,
    multi: true,
  }]
})

export class UserUniqueValidator implements Validator {
  constructor(private http: Http) { }

  validate(c: AbstractControl): Observable<{ [key: string]: any }> {
    const user = c.value;
    const params: URLSearchParams = new URLSearchParams();
    params.set('user', user);

    return this.http.get("checkUserUnique", { search: params })
      .map(response => response.json()? null:{ userUniqueValid: false });
  }
}
