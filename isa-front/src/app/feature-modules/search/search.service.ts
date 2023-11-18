import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from 'src/app/shared/model/company.model';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private apiUrl = 'http://localhost:5555/companies'; 

  constructor(private http: HttpClient) { }

  getAllCompanies(): Observable<Company[]>{
    return this.http.get<Company[]>(this.apiUrl);
  }

  getCompanyById(id: number): Observable<Company>{
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Company>(url);
  }

  
}
