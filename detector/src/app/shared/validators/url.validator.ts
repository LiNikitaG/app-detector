import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function isUrlValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    var inputElement = document.createElement('input');
    inputElement.type = 'url';
    inputElement.value = control.value;

    if (!inputElement.checkValidity()) {
      return { invalidUrl: { value: control.value } };
    } else {
      return null;
    }
  };
}