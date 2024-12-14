import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { REGEX_PATTERNS } from '../../../../_misc/regexps';
import { EmployeesService } from '../../../../_services/employees.service';

@Component({
  selector: 'app-offboard-dialog',
  imports: [],
  templateUrl: './offboard-dialog.component.html',
  styleUrl: './offboard-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OffboardDialogComponent {
  private readonly _employeesService = inject(EmployeesService);

  private readonly _dialogRef = inject(MatDialogRef<OffboardDialogComponent>);
  private readonly _dialogData: { employeeId: string } =
    inject(MAT_DIALOG_DATA);
  private readonly _formBuilder = inject(FormBuilder);

  employeeOffboardForm = this._formBuilder.group({
    address: this._formBuilder.group({
      streetLine1: ['', [Validators.required, Validators.maxLength(100)]],
      country: ['', [Validators.required, Validators.maxLength(50)]],
      postalCode: [
        '',
        [Validators.required, Validators.pattern(REGEX_PATTERNS.postalCode)],
      ],
      receiver: ['', [Validators.required, Validators.maxLength(100)]],
    }),
    notes: ['', [Validators.maxLength(300)]],
    phone: [
      '',
      [Validators.required, Validators.pattern(REGEX_PATTERNS.phone)],
    ],
    email: [
      '',
      [Validators.required, Validators.pattern(REGEX_PATTERNS.email)],
    ],
  });

  submitForm() {
    this._employeesService
      .offboardUser(this._dialogData.employeeId, {
        address: {
          streetLine1: 'Kocmyrzowska 1',
          country: 'Poland',
          postalCode: '13-231',
          receiver: 'Stefan Batory',
        },
        notes: 'User left the company, all equipment returned.',
        phone: '123456789',
        email: 'john.doe@gmail.com',
      })
      .subscribe(() => this._dialogRef.close());
  }
}
