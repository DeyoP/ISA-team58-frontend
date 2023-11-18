import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from 'src/app/shared/model/company.model';
import { Equipment } from 'src/app/shared/model/equipment.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private apiUrl = 'http://localhost:5555/company';

  constructor(private http: HttpClient) { }

  getCompanyById(id: number): Observable<Company> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Company>(url);
  }

  getCompanyEquipments(companyId: number): Observable<Equipment[]> {
    const url = `${this.apiUrl}/${companyId}/equipments`;
    return this.http.get<Equipment[]>(url);
  }

  updateCompany(id: number, company: Company): Observable<Company> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Company>(url, company);
  }
  
}
