import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  inject,
  viewChild,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { GenericFunctionPipe } from '../../_pipes/generic-function.pipe';
import { EmployeesService } from '../../_services/employees.service';
import { Employee } from '../../_types/employee.model';
import { Equipment } from '../../_types/equipment.model';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
  imports: [
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    GenericFunctionPipe,
    MatDividerModule,
    RouterLink,
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeesComponent {
  private _employeesService = inject(EmployeesService);

  readonly displayedColumns: string[] = [
    'name',
    'email',
    'department',
    'equipments',
    'status',
  ];
  readonly dataSource: MatTableDataSource<Employee> =
    new MatTableDataSource<Employee>([]);
  private readonly _paginator = viewChild.required(MatPaginator);
  private readonly _sort = viewChild.required(MatSort);

  constructor() {
    this._getEmployees();
    afterNextRender(() => {
      this._setTableFeatures();
    });
  }

  private _getEmployees() {
    this._employeesService.getAllEmployees().subscribe((employees) => {
      this.dataSource.data = employees;
    });
  }

  private _setTableFeatures() {
    this.dataSource.paginator = this._paginator();
    this.dataSource.sort = this._sort();
    this.dataSource.filterPredicate = (data: Employee, filter: string) => {
      return (
        data.name.toLowerCase().includes(filter) ||
        data.department.toLowerCase().includes(filter)
      );
    };
  }

  filterList(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  arrayToString(equipments: Equipment[]) {
    return equipments.map((equipment) => equipment.name).join(', ');
  }
}
