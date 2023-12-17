// authentication.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Account } from 'src/app/shared/model/account.model';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private baseUrl = 'http://localhost:5555/auth';
  private currentUserSubject: BehaviorSubject<any>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(this.getCurrentUser());
  }

  get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string): Observable<any> {
    const credentials = { email, password };
    return this.http.post(`${this.baseUrl}/login`, credentials);
  }

  signup(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/signup`, user);
  }

  activateAccount(token: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/activate/${token}`);
  }

  setCurrentUser(user: any): void {
    // Save the user to local storage or a service
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  getCurrentUser(): Account {
    // Retrieve the user from local storage or provide a default value
    return JSON.parse(localStorage.getItem('currentUser') || '{}');
  }

  logout(): void {
    // Remove the user from local storage or a service
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
