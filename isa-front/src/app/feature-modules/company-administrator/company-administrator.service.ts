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
  
  saveCompanyAdministrator(companyAdministrator: CompanyAdministrator): Observable<CompanyAdministrator> {
    return this.http.post<CompanyAdministrator>('http://localhost:5555/companyAdministrator', companyAdministrator);
  }
}
