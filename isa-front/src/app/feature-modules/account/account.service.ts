import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Account } from 'src/app/shared/model/account.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private apiUrl = 'http://localhost:5555/accounts'; 

  constructor(private http: HttpClient) { }
  
  private loggedInAccountSubject = new Subject<Account | null>();
  loggedInAccount$: Observable<Account | null> = this.loggedInAccountSubject.asObservable();

  activateAccount(token: string): Observable<string> {
    const activationUrl = `${this.apiUrl}/activate/${token}`;
    return this.http.get(activationUrl, { responseType: 'text' });
  }

  getAccountById(id: number): Observable<Account> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Account>(url);
  }

  saveAccount(account: Account): Observable<void> {
    return this.http.post<void>(this.apiUrl, account);
  }

  getAllAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(this.apiUrl);
  }

  setLoggedInAccount(account: Account | null): void {
    this.loggedInAccountSubject.next(account);
  }

  getLoggedInAccount(): Observable<Account | null> {
    return this.loggedInAccount$;
  }
}
