import { Injectable } from '@angular/core';
import { FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormsService {

  errors: string[] = [];
  constructor() { }


  getFormValidationErrors(fg: FormGroup) {
    Object.keys(fg.controls).forEach(key => {
      this.errors = [];
      const controlErrors: ValidationErrors = fg.get(key).errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);

          this.errors.push(`${key} ${keyError} `);
        });
        console.log(this.errors);
        return this.errors;

      }
    });
  }

  // Invalid

  isValidField(field: string, form: FormGroup): string {
    const validatedField = form.get(field);
    return (!validatedField.valid && validatedField.touched)
      ? 'is-invalid' : validatedField.touched ? 'is-valid' : '';
  }


  isRequiredField(field: string, form: FormGroup): boolean {
    const validatedField = form.get(field);
    return (!validatedField.valid && validatedField.touched && validatedField.errors.required)
      ? true : validatedField.touched ? false : false;
  }

  isEmailField(field: string, form: FormGroup): boolean {
    const validatedField = form.get(field);
    return (!validatedField.valid && validatedField.touched && validatedField.errors.pattern)
      ? true : validatedField.touched ? false : false;
  }


  isMaxField(field: string, form: FormGroup): boolean {
    const validatedField = form.get(field);
    return (!validatedField.valid && validatedField.touched && validatedField.errors.maxLength)
      ? true : validatedField.touched ? false : false;
  }




}
