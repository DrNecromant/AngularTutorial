import { Directive, Attribute } from '@angular/core';
import { NG_VALIDATORS, AbstractControl } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

@Directive({
  selector: '[validateEqual][ngModel]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: EqualToValidator,
    multi: true,
  }]
})

export class EqualToValidator {
  subscription: Subscription;

  constructor( @Attribute("validateEqual") public validateEqual: string) { }

  validate(c: AbstractControl): {[key: string]: any} {
    let v = c.value;  // Get current element value
    let e = c.root.get(this.validateEqual);  // Find html element to compare
    this.subscription = e.valueChanges.subscribe((val:string)=> {
        if (val != v) c.setErrors({validateEqual: false});
        else c.setErrors(null);
    });
    if (e && v !== e.value) return { validateEqual: false };
    return null;
  }
}
