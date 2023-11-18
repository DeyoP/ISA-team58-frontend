import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from 'src/app/shared/model/company.model';

@Injectable({
  providedIn: 'root'
})
export class SystemAdministratorService {

  private apiUrl = 'http://localhost:5555/';

  constructor(private http: HttpClient) { }

  saveCompany(company: Company): Observable<void> {
    return this.http.post<void>('http://localhost:5555/companies', company);
  }
}
