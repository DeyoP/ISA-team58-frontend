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
  getAccountByEmail(email: string): Observable<Account> {
    const url = `${this.apiUrl}/getByEmail/${email}`;
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

  getUserDetails(): Observable<Account> {
    const url = `${this.apiUrl}/details`;
    return this.http.get<Account>(url);
  }

  hasRole(account: Account | null, role: string): boolean {
    let value = false;
  
    if (account) {
      for (let i = 0; i < account.roles.length; i++) {
        if (account.roles[i].name === role) {
          console.log()
          value = true;
          break; // Exit the loop once a match is found
        }
      }
    }
  
    return value;
  }
  
}
