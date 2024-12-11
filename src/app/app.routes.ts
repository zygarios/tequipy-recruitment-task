import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'employees',
    loadComponent: () =>
      import('./_pages/employees/employees.component').then(
        (m) => m.EmployeesComponent
      ),
  },
  {
    path: 'employees/:id',
    loadComponent: () =>
      import('./_pages/employee/employee.component').then(
        (m) => m.EmployeeComponent
      ),
  },
  {
    path: '**',
    redirectTo: 'employees',
  },
];
