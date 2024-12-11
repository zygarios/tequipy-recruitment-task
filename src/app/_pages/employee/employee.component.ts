import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { EMPLOYEES } from '../../_mock-data/employees.data';
import { Employee } from '../../_types/employee.model';
import { OffboardDialogComponent } from './_components/offboard-dialog/offboard-dialog.component';

@Component({
  selector: 'app-employee',
  imports: [
    MatIconModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeComponent {
  private _route = inject(ActivatedRoute);
  employee: Employee = EMPLOYEES[0];
  private _matDialog = inject(MatDialog);

  offboardUser() {
    this._matDialog.open(OffboardDialogComponent);
  }
}
