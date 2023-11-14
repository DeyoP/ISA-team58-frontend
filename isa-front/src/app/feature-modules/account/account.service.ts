import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private baseUrl = 'http://localhost:8080'; 

  constructor(private http: HttpClient) { }

  getWelcomeMessage(): Observable<{ message: string }> {
    return this.http.get<{ message: string }>(`${this.baseUrl}/welcome`);
  }
}
