import { Directive, Attribute } from '@angular/core';
import { Validator, NG_VALIDATORS, AbstractControl } from '@angular/forms';

@Directive({
  selector: '[validateAge][ngModel]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: UserAgeValidator,
    multi: true,
  }]
})

export class UserAgeValidator implements Validator {

  constructor(@Attribute("validateAge") public validateAge: string) { }

  validate(c: AbstractControl): { [key: string]: any } {
    let v = c.value;
    if (!v) return null;  // Ignore empty date of birth value
    let userYear: number = +v.split('.').pop();  // Get year from dd.mm.yyyy
    if (!userYear) return null;  // Ignore empty or invalid year
    let currentYear: number = (new Date()).getFullYear();
    if (currentYear - userYear >= +this.validateAge) return null;  // Check user age is good
    return { validateAge: false };
  }
}
