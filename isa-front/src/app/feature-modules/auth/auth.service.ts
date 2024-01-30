// authentication.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Account } from 'src/app/shared/model/account.model';
import { JwtHelperService } from '@auth0/angular-jwt'; // Import JwtHelperService

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private baseUrl = 'http://localhost:5555/auth';
  private jwtHelper: JwtHelperService = new JwtHelperService(); // Instantiate JwtHelperService
  private _currentUserSubject: BehaviorSubject<Account | null>;

  constructor(private http: HttpClient) {
    this._currentUserSubject = new BehaviorSubject<Account | null>(this.getCurrentUser());
  }

  get currentUserValue(): Account | null {
    return this._currentUserSubject.value;
  }

  set currentUser(user: Account | null) {
    // Save the user to local storage or a service
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('currentUser');
    }
    this._currentUserSubject.next(user);
  }

  login(email: string, password: string): Observable<any> {
    const credentials = { email, password };
    return this.http.post(`${this.baseUrl}/login`, credentials);
  }

  decodeToken(token: string): any {
    // Use JwtHelperService to decode the JWT token
    return this.jwtHelper.decodeToken(token);
  }

  signup(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/signup`, user);
  }

  activateAccount(token: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/activate/${token}`);
  }

  getCurrentUser(): Account | null {
    return JSON.parse(localStorage.getItem('currentUser') || 'null');
  }

  setCurrentUser(updatedUserData: Account): void {
    // Method to set the current user
    this.currentUser = updatedUserData;
    console.log(this.currentUser)
  }

  logout(): void {
    // Remove the user from local storage or a service
    localStorage.removeItem('currentUser');
    this._currentUserSubject.next(null);
  }
}
