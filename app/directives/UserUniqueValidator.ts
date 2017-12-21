import { Directive } from '@angular/core';
import { Validator, NG_ASYNC_VALIDATORS, AbstractControl } from '@angular/forms';
import { Http, URLSearchParams } from '@angular/http';

@Directive({
  selector: '[userUniqueValid][ngModel]',
  providers: [{
    provide:NG_ASYNC_VALIDATORS,
    useExisting: UserUniqueValidator,
    multi: true,
  }]
})

export class UserUniqueValidator implements Validator {
  constructor( private http: Http) { }

  validate(c: AbstractControl): Promise<{[key: string]: any}> {
    const user = c.value;
    const params: URLSearchParams = new URLSearchParams();
    params.set('user', user);

    return new Promise(resolve =>
      this.http.get("checkUserUnique", {search:params})
        .map(response => response.json())
        .subscribe(res => res?resolve(null):resolve({userUniqueValid: false})));
  }
}
