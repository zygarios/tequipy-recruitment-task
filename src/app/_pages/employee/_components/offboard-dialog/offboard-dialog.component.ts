import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogClose,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { tap } from 'rxjs';
import { EmployeesService } from '../../../../_services/employees.service';
import { OffboardUser } from '../../../../_types/offboard-user.model';
import { OffboardDialogService } from './offboard-dialog.service';

@Component({
  selector: 'app-offboard-dialog',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatDialogModule,
    MatDialogClose,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './offboard-dialog.component.html',
  styleUrl: './offboard-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [OffboardDialogService],
})
export class OffboardDialogComponent {
  private readonly _employeesService = inject(EmployeesService);
  private readonly _offboardDialogService = inject(OffboardDialogService);
  private readonly _dialogRef = inject(MatDialogRef<OffboardDialogComponent>);
  private _snackBar = inject(MatSnackBar);
  private readonly _dialogData: { employeeId: string } =
    inject(MAT_DIALOG_DATA);

  employeeOffboardForm =
    this._offboardDialogService.createEmployeeOffboardForm();

  submitForm() {
    if (!this.employeeOffboardForm.valid) {
      this.employeeOffboardForm.markAllAsTouched();
    } else {
      this._employeesService
        .offboardUser(
          this._dialogData.employeeId,
          this.employeeOffboardForm.value as OffboardUser,
        )
        .pipe(
          tap((response) =>
            this._snackBar.open(response.message, '', {
              duration: 50000,
            }),
          ),
        )
        .subscribe(() => this._dialogRef.close(true));
    }
  }
}
