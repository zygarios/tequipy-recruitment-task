import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { filter } from 'rxjs';
import { EmployeesService } from '../../_services/employees.service';
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
  private readonly _route = inject(ActivatedRoute);
  private readonly _matDialog = inject(MatDialog);
  private readonly _employeesService = inject(EmployeesService);
  readonly employee = signal<null | Employee>(null);

  constructor() {
    this._getEmployee();
  }
  private _getEmployee() {
    if (this._route.snapshot.params['id']) {
      this._employeesService
        .getEmployeeById(this._route.snapshot.params['id'])
        .subscribe((employee) => {
          this.employee.set(employee);
        });
    }
  }

  offboardUser() {
    this._matDialog
      .open(OffboardDialogComponent, {
        data: { employeeId: this.employee()!.id },
      })
      .afterClosed()
      .pipe(filter((isOffboarded) => !!isOffboarded))
      .subscribe(() => {
        this.employee.update((employee) => ({
          ...(employee as Employee),
          status: 'OFFBOARDED',
        }));
      });
  }
}
