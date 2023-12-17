import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject, tap } from 'rxjs';
import { Account } from 'src/app/shared/model/account.model';
import { RegisteredUser } from 'src/app/shared/model/registered-user.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private apiUrl = 'http://localhost:5555/accounts';

  constructor(private http: HttpClient) {
  }

  activateAccount(token: string): Observable<string> {
    const activationUrl = `${this.apiUrl}/activate/${token}`;
    return this.http.get(activationUrl, { responseType: 'text' });
  }

  getAccountById(id: number): Observable<Account> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Account>(url);
  }

  getUserById(id: number): Observable<RegisteredUser> {
    return this.getAccountById(id) as Observable<RegisteredUser>;
  }

  updateRegisteredUser(user: RegisteredUser): Observable<void> {
    return this.http.put<void>(`http://localhost:5555/registeredUsers/` + user.id, user);
  }

  getAllAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(this.apiUrl);
  }

  editRegisteredUser(account: Account): Observable<void> {
    return this.http.put<void>('http://localhost:5555/registeredUsers/' + account.id, account);
  }
  
  getNonAdmins(): Observable<RegisteredUser[]> {
    return this.http.get<RegisteredUser[]>('http://localhost:5555/registeredUsers/getNonAdmins');
  }
}
