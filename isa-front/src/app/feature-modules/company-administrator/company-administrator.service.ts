import { HttpClient, HttpParams } from '@angular/common/http';
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

  changePassword(id: number, oldPassword: string, newPassword: string): Observable<CompanyAdministrator> {
    const url = `${this.apiUrl}/${id}/changePassword?oldPassword=${oldPassword}&newPassword=${newPassword}`;
    return this.http.put<CompanyAdministrator>(url, {});
  }

  updatePassword(id: number, newPassword: string): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}/updatePassword`, newPassword);
  }

  adminsByCompany(companyId: number): Observable<CompanyAdministrator[]> {
    return this.http.get<CompanyAdministrator[]>(`${this.apiUrl}/adminsByCompany/${companyId}`);
  }
}
