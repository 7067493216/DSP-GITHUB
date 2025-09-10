import { FormGroup, FormControl } from '@angular/forms';

export function emailValidator(control: FormControl): { [key: string]: any } {
  const emailRegexp = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}$/;
  if (control.value && !emailRegexp.test(control.value)) {
    return { emailValidator: true };
  }
}
// Only char Pattern
export function onlycharPattern(control: FormControl): { [key: string]: any } {
  const charRegexp = /[a-zA-Z][a-zA-Z ]*$/;
  if (control.value && !charRegexp.test(control.value)) {
    return { onlycharPattern: true };
  }
}
// Mobile pattern
export function mobPattern(control: FormControl): { [key: string]: any } {
  const mobRegexp = /[6-9][0-9]{9}$/;
  if (control.value && !mobRegexp.test(control.value)) {
    return { mobPattern: true };
  }
}
// AAdhar pattern
export function aadharPattern(control: FormControl): { [key: string]: any } {
  const aadharRegexp = /^[0-9]{12}$/;
  if (control.value && !aadharRegexp.test(control.value)) {
    return { aadharPattern: true };
  }
}
// Pan pattern
export function panCardPattern(control: FormControl): { [key: string]: any } {
  const mobRegexp = /^([a-zA-Z]([a-zA-Z]([a-zA-Z]([a-zA-Z]([a-zA-Z]([0-9]([0-9]([0-9]([0-9]([a-zA-Z])?)?)?)?)?)?)?)?)?)?$/;
  if (control.value && !mobRegexp.test(control.value)) {
    return { panCardPattern: true };
  }
}

// Password Pattern
export function pwdPattern(control: FormControl): { [key: string]: any } {
  const pwdRegexp = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,12}$/;
  if (control.value && !pwdRegexp.test(control.value)) {
    return { pwdPattern: true };
  }
}
// OTP pattern
export function otpPattern(control: FormControl): { [key: string]: any } {
  const otpRegexp = /^[0-9]{5}$/;
  if (control.value && !otpRegexp.test(control.value)) {
    return { otpPattern: true };
  }
}
//  positive integers upto two Decimal
export function positiveintegers(control: FormControl): { [key: string]: any } {
  const positiveintRegexp = /^[0-9]+(\.[0-9]{1,2})?$/;
  if (control.value && !positiveintRegexp.test(control.value)) {
    return { positiveintegers: true };
  }
}
// Employee Number length

export function empnumberlength(control: FormControl): { [key: string]: any } | null {

  if (control.value && !(control.value.length === 6 || control.value.length === 8)) {
    return { empnumberlength: true };
  }
}
// Matching Passwords
export function matchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
  return (group: FormGroup) => {
    const password = group.controls[passwordKey];
    const passwordConfirmation = group.controls[passwordConfirmationKey];
    if (password.value !== passwordConfirmation.value) {
      return passwordConfirmation.setErrors({ mismatchedPasswords: true });
    }
  };
}

export function alphaNumericPattern(control: FormControl): { [key: string]: any } {
  const aphaRegexp = /[*|\":<>[\]{}`\\()';@&$]/;
  if (control.value && !aphaRegexp.test(control.value)) {
    return { alphaNumeric: true };
  }
}
export function positiveNumericPattern(control: FormControl): { [key: string]: any } {
  const positiveRegexp = /^\d{0,2}(\.\d{1,2})?$/;
  if (control.value && !positiveRegexp.test(control.value)) {
    return { positiveNumericPattern: true };
  }
}

// PAN No pattern
export function panNoPattern(control: FormControl): { [key: string]: any } {
  const panNoRegexp = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
  if (control.value && !panNoRegexp.test(control.value)) {
    return { panNoPattern: true };
  }
}