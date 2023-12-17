import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AvailableTimeSlots } from 'src/app/shared/model/available-time-slots.model';
import { Company } from 'src/app/shared/model/company.model';
import { Equipment } from 'src/app/shared/model/equipment.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private apiUrl = 'http://localhost:5555/companies';

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

  getAllCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>(this.apiUrl);
  }
  
  getCompanyByAdmin(adminId: number): Observable<Company> {
    const url = `${this.apiUrl}/by-admin/${adminId}`;
    return this.http.get<Company>(url);
  }

  getCompanyAvailableTimeSlots(companyId: number): Observable<AvailableTimeSlots[]> {
    const url = `${this.apiUrl}/${companyId}/availableTimeSlots`;
    return this.http.get<AvailableTimeSlots[]>(url);
  }
}
