import { inject, Injectable } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { REGEX_PATTERNS } from '../../../../_misc/regexps';

@Injectable()
export class OffboardDialogService {
  private readonly _formBuilder = inject(NonNullableFormBuilder);

  createEmployeeOffboardForm() {
    const builder = this._formBuilder;
    return builder.group({
      address: builder.group({
        streetLine: builder.control('', [
          Validators.required,
          Validators.maxLength(50),
        ]),
        city: builder.control('', [
          Validators.required,
          Validators.maxLength(50),
        ]),
        country: builder.control('', [
          Validators.required,
          Validators.maxLength(20),
        ]),
        postalCode: builder.control('', [
          Validators.required,
          Validators.pattern(REGEX_PATTERNS.postalCode),
        ]),
      }),
      receiver: builder.control('', [
        Validators.required,
        Validators.maxLength(30),
      ]),
      notes: builder.control('', [Validators.maxLength(200)]),
      phone: builder.control('', [
        Validators.required,
        Validators.pattern(REGEX_PATTERNS.phone),
      ]),
      email: builder.control('', [
        Validators.required,
        Validators.pattern(REGEX_PATTERNS.email),
      ]),
    });
  }
}
