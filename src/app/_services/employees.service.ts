import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, of } from 'rxjs';
import { Employee } from '../_types/employee.model';
import { OffboardUser } from '../_types/offboard-user.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeesService {
  private _httpClient = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3000';

  getAllEmployees() {
    return this._httpClient.get<Employee[]>(`${this.apiUrl}/employees`);
  }

  getEmployeeById(id: string) {
    return this._httpClient.get<Employee>(`${this.apiUrl}/employees/${id}`);
  }

  offboardUser(id: string, offboardData: OffboardUser) {
    return this._httpClient
      .post(`${this.apiUrl}/users/${id}/offboard`, offboardData)
      .pipe(catchError((error) => of(error)));
  }
}
