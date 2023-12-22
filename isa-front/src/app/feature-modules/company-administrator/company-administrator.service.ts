import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CompanyAdministrator } from 'src/app/shared/model/company-administrator.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyAdministratorService {

  private apiUrl = 'http://localhost:5555/companyAdministrator';

  constructor(private http: HttpClient) { }

  getCompanyAdminById(id: number): Observable<CompanyAdministrator> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<CompanyAdministrator>(url);
  }

  updateCompanyAdmin(id: number, companyAdministrator: CompanyAdministrator): Observable<CompanyAdministrator> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<CompanyAdministrator>(url, companyAdministrator);
  }

  changePassword(id: number, companyAdministrator: CompanyAdministrator): Observable<CompanyAdministrator> {
    const url = `${this.apiUrl}/${id}/changePassword`;
    return this.http.put<CompanyAdministrator>(url, companyAdministrator);
  }

  updatePassword(id: number, newPassword: string): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}/updatePassword`, newPassword);
  }
}
