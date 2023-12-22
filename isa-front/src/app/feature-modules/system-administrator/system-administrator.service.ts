import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from 'src/app/shared/model/company.model';
import { Complaint } from 'src/app/shared/model/complaint.model';
import { SystemAdministrator } from 'src/app/shared/model/system-administrator.model';

@Injectable({
  providedIn: 'root'
})
export class SystemAdministratorService {

  private apiUrl = 'http://localhost:5555/';

  constructor(private http: HttpClient) { }

  saveCompany(company: Company): Observable<void> {
    return this.http.post<void>('http://localhost:5555/companies', company);
  }

  saveSystemAdministrator(systemAdministrator: SystemAdministrator): Observable<void> {console.log(systemAdministrator.password)
    return this.http.post<void>('http://localhost:5555/systemAdministrators', systemAdministrator);
  }

  updateSystemAdministrator(systemAdministrator: SystemAdministrator): Observable<void> {
    return this.http.put<void>('http://localhost:5555/systemAdministrators', systemAdministrator);
  }

  updatePassword(id: number, newPassword: string): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}systemAdministrators/${id}/updatePassword`, newPassword);
  }

  getComplaints(): Observable<Complaint[]> {
    return this.http.get<Complaint[]>('http://localhost:5555/complaints');
  }

  updateComplaint(complaint: Complaint): Observable<void> {
    return this.http.put<void>('http://localhost:5555/complaints', complaint);
  }
}